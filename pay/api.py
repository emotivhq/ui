__author__ = 'stuart'

import webapp2
from google.appengine.ext import ndb
import core
import stripe_utils
import json
import yaml
import stripe


stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['api_key']


class PayHandler(webapp2.RequestHandler):

    @ndb.toplevel
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-existing-customer':
            self.response.write(json.dumps(self._check_if_customer(data)))

        elif data['action'] == 'pitch-in':
            payment = data['payment']
            result = core.pitch_in(data['uid'], payment['gsid'], payment['parts'], payment['emailAddress'],
                                   payment['note'], payment['stripeResponse'], payment['subscribe'])
            self.response.write(json.dumps(result))

        # elif data['action'] == 'process-payments':
        #     process_payments(data['gsid'], data['giftstart_price'], data['num_parts'])

        elif data['action'] == 'get-pitch-ins':
            self.response.write(json.dumps(core.get_pitch_in_dicts(data['gsid'])))

    @staticmethod
    def _check_if_customer(data):
        # Check if user has a stripe customer object in the db
        customer = stripe_utils.get_stripe_customer(data['uid'])
        if customer:
            # Get customer cards
            cards = stripe_utils.StripeCard.query(stripe_utils.StripeCard.uid == data['uid']).fetch()
            return {'stripe_id': customer.stripe_customer_id, 'cards': cards}
        else:
            return {'error': 'No stripe customer for this uid exists'}


api = webapp2.WSGIApplication([('/pay', PayHandler)], debug=True)