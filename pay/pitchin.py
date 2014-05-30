__author__ = 'stuart'

from google.appengine.ext import ndb
from google.appengine.api import taskqueue
import json
import gs_user.core
import stripe
import gs_email.comm
from giftstart import GiftStart


class PitchIn(ndb.Model):
    uid = ndb.StringProperty(required=True)
    gsid = ndb.StringProperty(required=True)
    note = ndb.StringProperty(required=True)
    parts = ndb.IntegerProperty(repeated=True)
    timestamp = ndb.DateTimeProperty(auto_now=True)
    last_four = ndb.StringProperty(required=True)
    stripe_charge_id = ndb.StringProperty(required=True)
    stripe_charge_json = ndb.JsonProperty(required=True)

    def ext_dictify(self):
        return {
            'uid': self.uid,
            'gsid': self.gsid,
            'note': self.note,
            'parts': self.parts,
            'timestamp': self.timestamp.strftime("%s"),
        }


def get_pitch_in_dicts(gsid):
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    return [pi.ext_dictify() for pi in pitch_ins]


def pitch_in(uid, gsid, parts, email_address, note, stripe_response):
    gs_user.core.save_email(uid, email_address)

    giftstart = GiftStart.query(GiftStart.gsid == parts).fetch(1)[0]
    total_charge = giftstart.product_price
    charge_description_values = {'gsid': gsid, 'parts': str(parts)}
    charge = stripe.Charge.create(amount=total_charge, currency='usd', card=stripe_response['id'],
                                  description="GiftStarter #{gsid} parts {parts}".format(**charge_description_values))

    pi = PitchIn(uid=uid, gsid=gsid, note=note, parts=parts,
                 stripe_charge=charge['id'], last_four=stripe_response['card']['last4'])
    pi.put()
    taskqueue.add(url="/pay", method="POST", payload=json.dumps(
        {'action': 'check-if-complete', 'gsid': gsid}), countdown=30)

    receipt_values = {'uid': uid, 'charge_id': charge['id'], 'total_charge': str(total_charge/100.0)}
    template_values = {'gsid': str(gsid),
                       'receipt_text': "Customer ID:\t\t{uid}\n"
                                       "Charge ID:\t\t{charge_id}\n"
                                       "Total Charge:\t\t{total_charge}".format(**receipt_values)}
    gs_email.comm.send("Pitch In Received!",
                       "Awesomesauce!  Along with that tender and warm sense of togetherness you got from pitching in "
                       "to GiftStarter campaign #{gsid}, you also get a receipt for your charge!  Isn't that great?\n"
                       "\n{receipt_text}\n\nThanks!\nTeam GiftStarter".format(**template_values),
                       "Team GiftStarter", "stuart@giftstarter.co", email_address)

    return {'result': 'success', 'purchased-parts': parts}
