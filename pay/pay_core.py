""" Core functions for pitchins
"""
import stripe

__author__ = 'stuart'

from google.appengine.api import taskqueue
import json, yaml
from gs_user import gs_user_core
from giftstart import GiftStart
from pay.PitchIn import PitchIn
import requests

config = yaml.load(open('config.yaml'))


def add_name_to_pitchin(pitchin):
    if pitchin['name'] == '':
        user = gs_user_core.get_user(pitchin['uid'])
        if user is not None:
            if user.name is None or user.name is '':
                gs_user_core.get_user_info(user)
                user.put()
            pitchin['name'] = user.name
    return pitchin


def get_pitch_in_dicts(gsid):
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch(use_cache=False)
    pitch_in_dicts = [pi.ext_dictify() for pi in pitch_ins]

    named_pitch_ins = map(add_name_to_pitchin, pitch_in_dicts)

    return named_pitch_ins


def pitch_in(uid, gsid, parts, email_address, note, stripe_response,
             subscribe_to_mailing_lits):
    user = gs_user_core.save_email(uid, email_address)
    usr_img = user.cached_profile_image_url

    if subscribe_to_mailing_lits:
        gs_user_core.subscribe_user_to_mailing_list(uid, email=email_address)

    # Verify that none of these parts have been bought yet
    pitchins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    bought_parts = {part for pitchin in pitchins for part in pitchin.parts}
    if any([part in bought_parts for part in parts]):
        # One or more parts have already been bought, don't let the purchase
        # happen!
        return {'result': 'error', 'error': 'One or more requested parts have '
                                            'already been bought.'}


    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    total_charge = giftstart.total_price * len(parts) / \
                   giftstart.overlay_rows / giftstart.overlay_columns
    try:

        desc = "GiftStarter #{0} parts {1}".format(gsid, str(parts))
        charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                      card=stripe_response['id'],
                                      description=desc)
    except (stripe.error.CardError, stripe.error.InvalidRequestError,
            stripe.error.AuthenticationError, stripe.error.APIConnectionError,
            stripe.error.StripeError) as e:
        return {'result': 'error', 'stripe-error': e.json_body}

    pi = PitchIn(uid=uid, gsid=gsid, note=note, parts=parts,
                 giftstart_url_title=giftstart.giftstart_url_title,
                 stripe_charge_id=charge['id'], email=email_address,
                 stripe_charge_json=json.dumps(charge),
                 last_four=stripe_response['card']['last4'], img_url=usr_img,
                 name=user.name if user.name else '')
    pi.put()

    if not user.has_pitched_in:
        user.has_pitched_in = True
        user.put()

    taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps(
        {'action': 'check-if-complete', 'gsid': gsid}), countdown=30)

    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'pitchin_charge': '$' + str(total_charge/100.0),
        'pitchin_id': charge['id'],
        'pitchin_last_four': stripe_response['card']['last4']
    }

    url = config['email_url']

    data = json.dumps({'subject': "Pitch In Received!",
                       'sender': "team@giftstarter.co", 'to': [email_address],
                       'template_name': "pitch_in_thank_you",
                       'template_kwargs': email_kwargs})

    requests.put(url, data=data)

    return {'result': 'success', 'purchased-parts': parts}

