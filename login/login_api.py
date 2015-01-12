""" Finds the campaign for supplied thanks secret, and redirects user to
 that page with the secret attached in query params
"""

__author__ = 'GiftStarter'

import webapp2
import time
from giftstart import GiftStart
from google.appengine.ext import ndb
import json
from storage import image_cache
from uuid import uuid4
import logging


class CreateHandler(webapp2.RequestHandler):
    def get(self):
        self.put()
    def put(self):
        time.sleep(1)  # crude anti-hacking
        self.response.write({
            'error': 'Not implemented.'
        })


class LoginHandler(webapp2.RequestHandler):
    def get(self):
        self.put()
    def put(self):
        time.sleep(1)  # crude anti-hacking
        self.response.write({
            'error': 'Not implemented.'
            #'error': 'Your name and password do not match; please try again.'
        })

class RequestResetHandler(webapp2.RequestHandler):
    def get(self):
        self.put()
    def put(self):
        time.sleep(1)  # crude anti-hacking
        self.response.write({
            'error': 'Not implemented.'
            #'ok': 'An email has been sent.  If you do not receive it, double-check that you are using the correct email'
            #      ' address, and that it is not in "spam" or "junk".'
        })

class ResetHandler(webapp2.RequestHandler):
    def get(self):
        self.put()
    def put(self):
        time.sleep(1)  # crude anti-hacking
        self.response.write({
            'error': 'Not implemented.'
            #'error': 'Unable to reset your password (perhaps you are using the wrong code or email address?).  If you'
            #        ' continue to have problems, please contact the Gift Concierge.'
        })

handler = webapp2.WSGIApplication([
                                      ('/login/email/create', CreateHandler),
                                      ('/login/email/login', LoginHandler),
                                      ('/login/email/requestreset', RequestResetHandler),
                                      ('/login/email/reset', ResetHandler),
                                  ], debug=True)
