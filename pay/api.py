__author__ = 'stuart'


import webapp2
from stripedb import StripeCard, StripeCustomer
from google.appengine.ext import ndb
from datetime import datetime
from pitchin import PitchIn
from pay import giftstart_complete
from google.appengine.api import taskqueue
from giftstart import GiftStart
import gs_email
import json
import yaml
import stripe


stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['api_key']


class PayHandler(webapp2.RequestHandler):

    @ndb.toplevel
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-existing-customer':
            self._check_if_customer(data)

        elif data['action'] == 'pitch-in':
            self._pitch_in(data)

        elif data['action'] == 'process-payments':
            self._process_payments(data['gsid'])

        elif data['action'] == 'check-if-complete':
            giftstart_complete(data['gsid'])

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
            customer = self._create_stripe_customer(data['uid'], payment['stripeResponse'])
        else:
            # May need to update if user has submitted a new card
            customer = self._update_stripe_customer(data['uid'])

        pitch_in = PitchIn(uid=data['uid'], gsid=payment['gsid'], note=payment['note'], parts=payment['parts'],
                           stripe_customer=customer, last_four=payment['stripeResponse']['card']['last4'])
        pitch_in.put()
        taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps({
            'action': 'register-purchases', 'gsid': payment['gsid'], 'parts': payment['parts'], 'uid': data['uid']
        }))
        self.response.write(json.dumps({'result': 'success', 'purchased-parts': payment['parts']}))

    @staticmethod
    def _process_payments(gsid):
        giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
        pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
        for pitch_in in pitch_ins:
            if not pitch_in.processed:
                price = giftstart.product_price * len(pitch_in.parts) / giftstart.overlay_rows / giftstart.overlay_columns
                stripe_customer = StripeCustomer.query(StripeCustomer.uid == pitch_in.uid).fetch()[0]
                cards = json.loads(stripe_customer.stripe_response)['cards']['data']
                used_card = filter(lambda card: card['last4'] == pitch_in.last_four, cards)[0]
                try:
                    charge = stripe.Charge.create(amount=price, currency="usd", card=used_card['id'],
                                                  description="GiftStarter campaign %s parts %s"
                                                              % (str(gsid), ", ".join(pitch_in.parts)))
                    pitch_in.processed = True
                    pitch_in.processed_time = datetime.now()
                    pitch_in.stripe_charge_id = charge['id']
                    pitch_in.stripe_charge_json = json.dumps(charge)
                    pitch_in.put_async()

                except Exception, e:
                    gs_email.send("Stripe Error!", "This error occurred when attempting to charge user %s for GS#%s:\n\n%s"
                                  % (pitch_in.uid, str(gsid), e.message), "errorbot", "stuart@giftstarter.co",
                                  ["stuart@giftstarter.co"])

    @staticmethod
    def _update_stripe_customer(uid):
        db_customer = StripeCustomer.query(StripeCustomer.uid == uid).fetch(1)[0]
        db_customer.stripe_response = stripe.Customer.retrieve(db_customer.stripe_customer_id)
        db_customer.put_async()
        return db_customer

    @staticmethod
    def _create_stripe_customer(uid, stripe_response):
        customer = stripe.Customer.create(card=stripe_response['id'], description=uid)
        db_customer = StripeCustomer(uid=uid, stripe_customer_id=customer['id'], stripe_response=stripe_response)
        db_customer.put_async()
        return customer

    @staticmethod
    def _get_stripe_customer(uid):
        customer = StripeCustomer.query(StripeCustomer.uid == uid).fetch()
        if len(customer) < 1:
            return None
        else:
            return customer[0]


api = webapp2.WSGIApplication([('/pay', PayHandler)], debug=True)