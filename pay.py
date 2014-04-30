__author__ = 'stuart'

import webapp2
import json
import stripe
import giftstart
from stripedb import StripeCard, StripeCharge, StripeCustomer
from google.appengine.ext import ndb
import yaml

stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['api_key']


class PayHandler(webapp2.RequestHandler):

    @ndb.toplevel
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-existing-customer':
            self._check_if_customer(data)

        elif data['action'] == 'pitch-in':
            self._pitch_in(data)

    def _check_if_customer(self, data):
        # Check if user has a stripe customer object in the db
        customer = self._get_stripe_customer(data['uid'])
        if customer:
            # Get customer cards
            cards = StripeCard.query(StripeCard.uid == data['uid']).fetch()
            self.response.write(json.dumps({'stripe_id': customer.stripe_customer_id, 'cards': cards}))
        else:
            self.response.write(json.dumps({'error': 'No stripe customer for this uid exists'}))

    def _pitch_in(self, data):
        # Record pitch in to be paid upon campaign success
        payment = data['payment']

        # Check if user is an existing stripe customer
        customer = self._get_stripe_customer(data['uid'])
        if customer is None:
            # Need to create stripe customer!
            self._create_stripe_customer(data['uid'], payment['stripeResponse'])

        pitch_in = PitchIn(uid=data['uid'], gsid=payment['gsid'], note=payment['note'],
                           parts=payment['parts'])
        pitch_in.put_async()
        giftstart.register_purchased_parts(payment['gsid'], payment['parts'], data['uid'])
        self.response.write(json.dumps({'result': 'success', 'purchased-parts': payment['parts']}))

    @staticmethod
    def _check_if_giftstart_complete(gsid):
        giftstart_pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
        gs = giftstart.GiftStart.query(giftstart.GiftStart.gsid == gsid).fetch()[0]
        pitch_in_count = 0
        for pitch_in in giftstart_pitch_ins:
            pitch_in_count += len(pitch_in.parts)

        if pitch_in_count == gs.overlay_rows * gs.overlay_columns:
            # All pieces purchased!  Do something.
            print("Woah!  Giftstart #%d is funded!" % gsid)

        return pitch_in_count == gs.overlay_rows * gs.overlay_columns

    @staticmethod
    def _create_stripe_customer(uid, stripe_response):
        customer = stripe.Customer.create(card=stripe_response['id'], description=uid)
        new_customer = StripeCustomer(uid=uid, stripe_customer_id=stripe_response['id'],
                                      stripe_response=stripe_response)
        new_customer.put_async()

    @staticmethod
    def _get_stripe_customer(uid):
        customer = StripeCustomer.query(StripeCustomer.uid == uid).fetch()
        if len(customer) < 1:
            return None
        else:
            return customer[0]


class PitchIn(ndb.Model):
    uid = ndb.StringProperty(required=True)
    gsid = ndb.StringProperty(required=True)
    note = ndb.StringProperty(required=True)
    parts = ndb.IntegerProperty(repeated=True)
    timestamp = ndb.DateTimeProperty(auto_now=True)

api = webapp2.WSGIApplication([('/pay', PayHandler)], debug=True)