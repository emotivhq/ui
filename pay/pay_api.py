""" API for payment endpoint.
"""

__author__ = 'stuart'

import webapp2
from google.appengine.ext import ndb
from pay import pay_core
import json
import yaml
import stripe
import logging
from gs_user import gs_user_core
from gs_user.User import User


stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['app_secret']


class PayHandler(webapp2.RequestHandler):
    """ Handles payment requests and serves pitchin data for giftstarts.
    """

    @ndb.toplevel
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'pitch-in':
            payment = data['payment']
            result = pay_core.pitch_in(data['uid'], payment['gsid'],
                                       payment['parts'],
                                       payment['emailAddress'],
                                       payment['note'],
                                       payment['stripeResponse'],
                                       payment['subscribe'],
                                       payment.get('save_card', False))
            if 'error' in result.keys():
                self.response.set_status(400)
            self.response.write(json.dumps(result))

        elif data['action'] == 'get-pitch-ins':
            pitchin_dicts = pay_core.get_pitch_in_dicts(data['gsid'])
            self.response.write(json.dumps(pitchin_dicts))


class StripeTokenHandler(webapp2.RequestHandler):
    """ Handles requests for stripe tokens """

    def post(self):
        gs_url_title = self.request.path.split('/')[2]
        req_json = json.loads(self.request.body)
        uid = req_json.get('uid')
        token = req_json.get('token')
        parts = req_json.get('parts')

        if not all([bool(thing) for thing in [uid, token, parts]]):
            logging.warning("Invalid data used for stripe token request:"
                            "\n{0}".format(self.request.body))
            self.response.set_status(400, "Invalid data")
            return

        # validate user and token
        if gs_user_core.validate(uid, token, self.request.path):
            user = ndb.Key('User', uid).get()

        else:
            logging.warning("Invalid user credentials:\n{0}"
                            .format(self.request.body))
            self.response.set_status(403)
            return

        charge_tokens = pay_core.get_card_tokens(user.stripe_id)
        self.response.write(json.dumps(charge_tokens))


api = webapp2.WSGIApplication(
    [('/pay/.*/tokens/create.json', StripeTokenHandler),
     ('/pay', PayHandler),
     ], debug=True)
