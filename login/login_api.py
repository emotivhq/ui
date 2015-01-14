""" Finds the campaign for supplied thanks secret, and redirects user to
 that page with the secret attached in query params
"""

__author__ = 'GiftStarter'

import webapp2
import time
import login.login_core
import gs_user.gs_user_core
from gs_user import User
from giftstart import giftstart_comm
from gs_user.gs_user_referral import UserReferral
from google.appengine.ext import ndb
import json
from storage import image_cache
from uuid import uuid4
import logging


class CreateHandler(webapp2.RequestHandler):
    def get(self):
        self.post()
    def post(self):
        time.sleep(1)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip()
        password = params['password'].strip()
        if email is "":
            self.response.write(json.dumps({'error':'Email cannot be blank'}))
            return
        if password is "":
            self.response.write(json.dumps({'error':'password cannot be blank'}))
            return
        token_set = login.login_core.get_email_token_set(email=email, password=password)
        try:
            uid = login.login_core.get_uid(token_set)
        except ValueError:
            uid = True
        if uid:
            self.response.write(json.dumps({
                'error': 'It appears you\'ve already set a password... please go back and click "login" instead!'
            }))
        else:
            referrer = None #UserReferral.from_dict(data.get('referrer', {}))
            user = gs_user.gs_user_core.login_emaillogin_user(email, password, referrer)
            self.response.write(json.dumps({
                'ok': user.jsonify()
            }))


class LoginHandler(webapp2.RequestHandler):
    def get(self):
        self.post()
    def post(self):
        time.sleep(1)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip()
        password = params['password'].strip()
        if email is "":
            self.response.write(json.dumps({'error':'Email cannot be blank'}))
            return
        if password is "":
            self.response.write(json.dumps({'error':'password cannot be blank'}))
            return
        token_set = login.login_core.get_email_token_set(email=email, password=password)
        try:
            uid = login.login_core.get_uid(token_set)
        except ValueError:
            uid = False
        if uid:
            self.response.write(json.dumps({
                'ok': User.query(User.uid == uid).fetch(1)[0].jsonify()
            }))
        else:
            self.response.write(json.dumps({
                'error': 'We couldn\'t find that email address and password combination; please try again.'
            }))

class RequestResetHandler(webapp2.RequestHandler):
    def get(self):
        self.post()
    def post(self):
        time.sleep(1)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip()
        giftstart_comm.send_emaillogin_reset(email)
        self.response.write(json.dumps({
            'ok': 'An email has been sent.  If you do not receive it, double-check that you are using the correct email'
                  ' address, and that the message is not in "spam" or "junk".'
        }))

class ResetHandler(webapp2.RequestHandler):
    def get(self):
        self.post()
    def post(self):
        time.sleep(1)  # crude anti-hacking
        self.response.write(json.dumps({
            'error': 'Unable to reset your password (perhaps you are using the wrong code or email address?).  If you'
                    ' continue to have problems, please contact the Gift Concierge.'
        }))

handler = webapp2.WSGIApplication([
                                      ('/login/email/create', CreateHandler),
                                      ('/login/email/login', LoginHandler),
                                      ('/login/email/requestreset', RequestResetHandler),
                                      ('/login/email/reset', ResetHandler),
                                  ], debug=True)
