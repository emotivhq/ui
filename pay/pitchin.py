__author__ = 'stuart'

from google.appengine.ext import ndb
from google.appengine.api import taskqueue
import json
import gs_user
import stripe_utils


class PitchIn(ndb.Model):
    uid = ndb.StringProperty(required=True)
    gsid = ndb.StringProperty(required=True)
    note = ndb.StringProperty(required=True)
    parts = ndb.IntegerProperty(repeated=True)
    timestamp = ndb.DateTimeProperty(auto_now=True)
    stripe_customer = ndb.StringProperty(required=True)
    last_four = ndb.StringProperty(required=True)
    stripe_charge_id = ndb.StringProperty()
    stripe_charge_json = ndb.JsonProperty()
    processed = ndb.BooleanProperty(default=False)
    processed_time = ndb.DateTimeProperty()

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


def pitch_in(data):
    # Record pitch in to be paid upon campaign success
    payment = data['payment']

    gs_user.save_email(data['uid'], data['payment']['emailAddress'])

    # Check if user is an existing stripe customer
    customer = stripe_utils.get_stripe_customer(data['uid'])
    if customer is None:
        # Need to create stripe customer!
        customer = stripe_utils.create_stripe_customer(data['uid'], payment['stripeResponse'])
    else:
        # May need to update if user has submitted a new card
        customer = stripe_utils.update_stripe_customer(data['uid'])

    pi = PitchIn(uid=data['uid'], gsid=payment['gsid'], note=payment['note'], parts=payment['parts'],
                 stripe_customer=customer.stripe_customer_id, last_four=payment['stripeResponse']['card']['last4'])
    pi.put()
    taskqueue.add(url="/pay", method="POST", payload=json.dumps({
        'action': 'check-if-complete', 'gsid': payment['gsid'],
    }), countdown=30)
    return {'result': 'success', 'purchased-parts': payment['parts']}


def send_check_if_complete(gsid):
    pitch_ins = get_pitch_in_dicts(gsid)
    taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps({
        'action': 'check-if-complete',
        'gsid': gsid,
        'pitch_ins': pitch_ins
    }))
