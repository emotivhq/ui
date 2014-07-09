__author__ = 'stuart'

from google.appengine.api import taskqueue
import json
import gs_user.core
import stripe
import gs_email.comm
from giftstart import GiftStart
from PitchIn import PitchIn
from datetime import datetime


def get_pitch_in_dicts(gsid):
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    pitch_in_dicts = [pi.ext_dictify() for pi in pitch_ins]
    return pitch_in_dicts


def pitch_in(uid, gsid, parts, email_address, note, stripe_response, subscribe_to_mailing_lits):
    user = gs_user.core.save_email(uid, email_address)
    usr_img = user.cached_profile_image_url

    if subscribe_to_mailing_lits:
        gs_user.core.subscribe_to_mailing_list(uid, email=email_address)

    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    total_charge = giftstart.total_price * len(parts) / giftstart.overlay_rows / giftstart.overlay_columns
    charge_description_values = {'gsid': gsid, 'parts': str(parts)}
    charge = stripe.Charge.create(amount=total_charge, currency='usd', card=stripe_response['id'],
                                  description="GiftStarter #{gsid} parts {parts}".format(**charge_description_values))

    pi = PitchIn(uid=uid, gsid=gsid, note=note, parts=parts, stripe_charge_id=charge['id'], email=email_address,
                 stripe_charge_json=json.dumps(charge), last_four=stripe_response['card']['last4'], img_url=usr_img)
    pi.put()
    taskqueue.add(url="/pay", method="POST", payload=json.dumps(
        {'action': 'check-if-complete', 'gsid': gsid}), countdown=30)

    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': 'https://www.giftstarter.co/giftstart?gs-id=' + str(gsid),
        'pitchin_charge': '$' + str(total_charge/100.0),
        'pitchin_id': charge['id'],
        'pitchin_last_four': stripe_response['card']['last4']
    }
    gs_email.comm.send_from_template("Pitch In Received!", "pitch_in_thank_you", email_kwargs,
                                     "team@giftstarter.co", email_address)

    return {'result': 'success', 'purchased-parts': parts}


def check_if_complete(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    pitch_in_parts = []
    for p in pitch_ins:
        pitch_in_parts += p.parts

    if not giftstart.giftstart_complete:
        if len(pitch_in_parts) == giftstart.overlay_columns * giftstart.overlay_rows:
            giftstart.giftstart_complete = True
            giftstart.put()

            # Send email congratulating the gift champion!
            email_kwargs = {'campaign_link': 'https://www.giftstarter.co/giftstart?gs-id=' + str(gsid),
                            'campaign_name': giftstart.giftstart_title}
            gs_email.comm.send_from_template("GiftStarter Campaign Complete!", "campaign_complete_user_funded",
                                             email_kwargs, "team@giftstarter.co", [giftstart.gc_email])

            # And email GiftStarter personnel...
            email_kwargs = {'campaign_link': 'https://www.giftstarter.co/giftstart?gs-id=' + str(gsid),
                            'campaign_number': str(gsid)}
            gs_email.comm.send_from_template("GiftStarter Campaign Complete!", "campaign_complete_team_funded",
                                             email_kwargs, "team@giftstarter.co", 'team@giftstarter.co')

        elif giftstart.deadline < datetime.now():
            giftstart.giftstart_complete = True
            giftstart.put()

            # Send email congratulating the gift champion!
            email_kwargs = {'campaign_link': 'https://www.giftstarter.co/giftstart?gs-id=' + str(gsid),
                            'campaign_name': giftstart.giftstart_title}
            gs_email.comm.send_from_template("GiftStarter Campaign Complete!", "campaign_complete_user_not_funded",
                                             email_kwargs, "team@giftstarter.co", [giftstart.gc_email])

            # And email GiftStarter personnel...
            email_kwargs = {'campaign_link': 'https://www.giftstarter.co/giftstart?gs-id=' + str(gsid),
                            'campaign_number': str(gsid)}
            gs_email.comm.send_from_template("GiftStarter Campaign Complete!", "campaign_complete_team_not_funded",
                                             email_kwargs, "team@giftstarter.co", 'team@giftstarter.co')
