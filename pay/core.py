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
    return [pi.ext_dictify() for pi in pitch_ins]


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

    receipt_values = {'uid': uid, 'charge_id': charge['id'], 'total_charge': str(total_charge/100.0)}
    template_values = {'gsid': str(gsid),
                       'receipt_text': "Customer ID:\t\t{uid}\n"
                                       "Charge ID:\t\t{charge_id}\n"
                                       "Total Charge:\t\t${total_charge}".format(**receipt_values)}
    gs_email.comm.send("Pitch In Received!",
                       "Awesomesauce!  Along with that tender and warm sense of togetherness you got from pitching in "
                       "to GiftStarter campaign #{gsid}, you also get a receipt for your charge!  Isn't that great?\n"
                       "\n{receipt_text}\n\nThanks!\nTeam GiftStarter".format(**template_values),
                       "Team GiftStarter", "stuart@giftstarter.co", email_address)

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

            # Send email congratulating the gift champion, too!
            gs_email.comm.send("GiftStart Complete!",
                               "GiftStart #{gsid} has been completed! Nice work!".format(gsid=giftstart.gsid),
                               "Stuart at GiftStarter", "stuart@giftstarter.co", [giftstart.gc_email])

            # And email GiftStarter personnel...
            gs_email.comm.send("GiftStart #{gsid} Complete!".format(gsid=giftstart.gsid),
                               "GiftStart #{gsid} has been completed! Nice work!".format(gsid=giftstart.gsid),
                               "Team GiftStarter", "team@giftstarter.co", ["stuart@giftstarter.co",
                                                                           "arry@giftstarter.co",
                                                                           "christie@giftstarter.co"])

        elif giftstart.deadline < datetime.now():
            giftstart.giftstart_complete = True
            giftstart.put()

            # Send email congratulating the gift champion, too!
            gs_email.comm.send("GiftStart Complete!",
                               "GiftStart #{gsid} has ended, but wasn't fully funded.  We'll send a gift card with the raised amount to the recipient.\n\nThanks for being so awesome!\nTeam GiftStarter".format(gsid=giftstart.gsid),
                               "Stuart at GiftStarter", "stuart@giftstarter.co", [giftstart.gc_email])

            # And email GiftStarter personnel...
            gs_email.comm.send("GiftStart #{gsid} Complete!".format(gsid=giftstart.gsid),
                               "GiftStart #{gsid} has ended, but did not raise the full amount.".format(gsid=giftstart.gsid),
                               "Stuart Robot", "stuart@giftstarter.co", ["stuart@giftstarter.co",
                                                                         "arry@giftstarter.co"])
