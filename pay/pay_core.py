""" Core functions for pitchins
"""
import stripe

__author__ = 'stuart'

from google.appengine.api import taskqueue
from google.appengine.ext import ndb
import json, yaml
from gs_user import gs_user_core
from giftstart.GiftStart import GiftStart
from pay.PitchIn import PitchIn
import requests
import logging
from stripe.error import CardError, InvalidRequestError, AuthenticationError, \
    APIConnectionError, StripeError
from gs_util import gs_util_link

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


def parts_available(parts, gsid):
    # Verify that none of these parts have been bought yet
    pitchins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    bought_parts = {part for pitchin in pitchins for part in pitchin.parts}
    return not any([part in bought_parts for part in parts])


def pitch_in(uid, gsid, parts, email_address, note, stripe_response,
             subscribe_to_mailing_lits, save_this_card):
    user = gs_user_core.save_email(uid, email_address)
    usr_img = user.cached_profile_image_url

    if subscribe_to_mailing_lits:
        gs_user_core.subscribe_user_to_mailing_list(uid, email=email_address)

    if not parts_available(parts, gsid):
        return {'result': 'error', 'error': 'One or more requested parts have '
                                            'already been bought.'}

    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    total_charge = giftstart.total_price * len(parts) / \
                   giftstart.overlay_rows / giftstart.overlay_columns

    desc = "GiftStarter #{0} parts {1}".format(gsid, str(parts))
    try:
        if save_this_card:
            customer, card = save_card(user, stripe_response)
            charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                          customer=customer['id'],
                                          card=card['id'], description=desc)
        else:
            charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                          card=stripe_response['id'],
                                          description=desc)
    except (CardError, InvalidRequestError, AuthenticationError,
            APIConnectionError, StripeError) as e:
        logging.error(e)
        return {'result': 'error', 'stripe-error': e.json_body}

    # Make pitch in
    pi_key = ndb.Key('GiftStart', giftstart.giftstart_url_title,
                     'PitchIn', charge['id'])
    pi = PitchIn(key=pi_key, uid=uid, gsid=gsid, note=note, parts=parts,
                 giftstart_url_title=giftstart.giftstart_url_title,
                 stripe_charge_id=charge['id'], email=email_address,
                 stripe_charge_json=json.dumps(charge),
                 last_four=stripe_response['card']['last4'], img_url=usr_img,
                 name=user.name if user.name else '')
    pi.put()

    set_user_pitched_in(user)
    send_pitchin_notification(giftstart, charge,
                              stripe_response['card']['last4'], email_address,
                              note, user.name, usr_img)

    return {'result': 'success', 'purchased-parts': parts}


def set_user_pitched_in(user):
    if not user.has_pitched_in:
        user.has_pitched_in = True
        user.put()


def send_pitchin_notification(giftstart, charge, last_four, email, note, name,
                              usr_img):
    taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps(
        {'action': 'check-if-complete', 'gsid': giftstart.gsid}), countdown=30)

    # Send receipt
    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'pitchin_charge': '$' + str(charge['amount']/100.0),
        'pitchin_id': charge['id'],
        'pitchin_last_four': last_four,
        'frame': 'base_frame',
        'product_img_url': giftstart.product_img_url,
        'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
    }

    data = json.dumps({'subject': "Pitch In Received for \"" +
                                  giftstart.giftstart_title + "\"!",
                       'sender': "giftconcierge@giftstarter.co", 'to': [email],
                       'template_name': "pitch_in_thank_you",
                       'mime_type': 'html',
                       'template_kwargs': email_kwargs})

    requests.put(config['email_url'], data=data)

    # Notify giftstarter
    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'note': note,
        'user_name': name if name else '',
        'user_img': usr_img,
        'frame': 'base_frame',
        'product_img_url': giftstart.product_img_url,
        'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
    }

    data = json.dumps({'subject': "Someone Pitched In on \"" +
                                  giftstart.giftstart_title + "\"!",
                       'sender': "giftconcierge@giftstarter.co",
                       'to': [giftstart.gc_email],
                       'template_name': "gc_pitchin_notification",
                       'mime_type': 'html',
                       'template_kwargs': email_kwargs})

    requests.put(config['email_url'], data=data)


def save_card(user, stripe_response):
    if user.stripe_id is None:
        # User does not have a stripe customer yet
        customer = stripe.Customer.create(
            card=stripe_response['id'],
            description="user {0}".format(user.uid)
        )
        user.stripe_id = customer['id']
        user.put()
        card = customer['cards']['data'][0]
    else:
        # User has a stripe customer, add a card to it
        customer = stripe.Customer.retrieve(user.stripe_id)
        card = customer.cards.create(card=stripe_response['id'])

    return customer, card


def get_card_by_fingerprint(fingerprint, user):
    result = None
    customer = stripe.Customer.retrieve(user.stripe_id)
    cards = customer.cards.all()
    for card in cards['data']:
        if card['fingerprint'] == fingerprint:
            result = card
            break
    return customer, result


def pay_with_fingerprint(fingerprint, uid, gsid, parts, note, subscribe):
    user = ndb.Key('User', uid).get()

    if not parts_available(parts, gsid):
        return {'result': 'error', 'error': 'One or more requested parts have '
                                            'already been bought.'}

    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    total_charge = giftstart.total_price * len(parts) / \
                   giftstart.overlay_rows / giftstart.overlay_columns

    customer, card = get_card_by_fingerprint(fingerprint, user)
    desc = "GiftStarter #{0} parts {1}".format(gsid, str(parts))
    try:
        charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                      card=card['id'], customer=customer,
                                      description=desc)
    except (CardError, InvalidRequestError, AuthenticationError,
            APIConnectionError, StripeError) as e:
        logging.error(e)
        return {'result': 'error', 'stripe-error': e.json_body}


    # Make pitch in
    pi_key = ndb.Key('GiftStart', giftstart.giftstart_url_title,
                     'PitchIn', charge['id'])
    pi = PitchIn(key=pi_key, uid=uid, gsid=gsid, note=note, parts=parts,
                 giftstart_url_title=giftstart.giftstart_url_title,
                 stripe_charge_id=charge['id'], email=user.email,
                 stripe_charge_json=json.dumps(charge),
                 last_four=card['last4'],
                 img_url=user.cached_profile_image_url,
                 name=user.name if user.name else '')
    pi.put()

    send_pitchin_notification(giftstart, charge,
                              card['last4'], user.email, note, user.name,
                              user.cached_profile_image_url)
