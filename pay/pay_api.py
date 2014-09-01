""" API for payment endpoint.
"""

__author__ = 'stuart'

import webapp2
from google.appengine.ext import ndb
from pay import pay_core
import json
import yaml
import stripe


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
                                       payment['subscribe'])
            if 'error' in result.keys():
                self.response.set_status(400)
            self.response.write(json.dumps(result))

        elif data['action'] == 'get-pitch-ins':
            pitchin_dicts = pay_core.get_pitch_in_dicts(data['gsid'])
            self.response.write(json.dumps(pitchin_dicts))


API = webapp2.WSGIApplication([('/pay', PayHandler)], debug=True)
