"""Handle requests to create, reset, or login with email-based credentials"""

__author__ = 'GiftStarter'

import webapp2
import time
from login import login_core
import gs_user.gs_user_core
from gs_user import User
from giftstart import giftstart_comm
import EmailLoginPair
import json
import re

def validate_password_complexity(password):
    #return re.search('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\!@#$&+=]).*$',password)
    return re.search('^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$',password)

class CreateHandler(webapp2.RequestHandler):
    """handle creation of a new email-based User identity; validate uniqueness of Email; check password complexity"""
    def get(self):
        self.post()
    def post(self):
        time.sleep(.5)  # crude anti-hacking
        params = json.loads(self.request.body)
        name = params['emailname'].strip()
        email = params['email'].strip().lower()
        password = params['password'].strip()
        if len(name) is 0:
            self.response.write(json.dumps({'error': 'Name cannot be blank'}))
            return
        if len(email) is 0:
            self.response.write(json.dumps({'error': 'Email cannot be blank'}))
            return
        if len(password) is 0:
            self.response.write(json.dumps({'error': 'Password cannot be blank'}))
            return
        if not validate_password_complexity(password):
            self.response.write(json.dumps({'error': 'Password does not meet minimum requirements. Please try again.'}))
            return
        token_set = login_core.get_email_token_set(email=email, password=password)
        try:
            uid = login_core.get_uid(token_set)
        except ValueError:
            uid = True
        if uid:
            self.response.write(json.dumps({
                'error': 'It appears you\'ve already set a password... please go back and click "login" instead!'
            }))
        else:
            referrer = None #UserReferral.from_dict(data.get('referrer', {}))
            user = gs_user.gs_user_core.login_emaillogin_user(email, password, referrer)
            user.name = name
            user.put()
            self.response.write(json.dumps({
                'ok': {
                        'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.emaillogin_token_set.email,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }
            }))


class LoginHandler(webapp2.RequestHandler):
    """handle an email-login request: validate email/password combo, return token"""
    def get(self):
        self.post()
    def post(self):
        time.sleep(.5)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip().lower()
        password = params['password'].strip()
        if len(email) is 0:
            self.response.write(json.dumps({'error':'Email cannot be blank'}))
            return
        if len(password) is 0:
            self.response.write(json.dumps({'error':'password cannot be blank'}))
            return
        token_set = login_core.get_email_token_set(email=email, password=password)
        try:
            uid = login_core.get_uid(token_set)
        except ValueError:
            uid = False
        if uid:
            user = User.query(User.uid == uid).fetch(1)[0]
            #UserLogin.register_login(user.uid, data['location'])
            self.response.write(json.dumps({
                'ok': {
                        'status': 'logged-in', 'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.emaillogin_token_set.email,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }
            }))
        else:
            self.response.write(json.dumps({
                'error': 'We couldn\'t find that email address and password combination; please try again.'
            }))

class RequestResetHandler(webapp2.RequestHandler):
    """handle requests to send a password-reset code to an email address"""
    def get(self):
        self.post()
    def post(self):
        time.sleep(.5)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip().lower()
        if len(email) is 0:
            self.response.write(json.dumps({'error':'Email cannot be blank'}))
            return
        if len(User.query(User.emaillogin_token_set.email == email).fetch(1)) > 0:
            giftstart_comm.send_emaillogin_reset(email)
            self.response.write(json.dumps({
                'ok': 'An email has been sent.  If you do not receive it, double-check that you are using the correct email'
                      ' address, and that the message is not in "spam" or "junk."'
            }))
        else:
            self.response.write(json.dumps({
                'error': 'It looks like you\'ve never logged in with that email address; perhaps you were using'
                         ' Facebook, Twitter, or Google Plus?'
            }))


class ResetHandler(webapp2.RequestHandler):
    """handle password-reset requests: validate reset code and store new password"""
    def get(self):
        self.post()
    def post(self):
        time.sleep(.5)  # crude anti-hacking
        params = json.loads(self.request.body)
        email = params['email'].strip().lower()
        password = params['password'].strip()
        code = params['code'].strip()
        if len(email) is 0:
            self.response.write(json.dumps({'error':'Email cannot be blank'}))
            return
        if len(password) is 0:
            self.response.write(json.dumps({'error':'Password cannot be blank'}))
            return
        if not validate_password_complexity(password):
            self.response.write(json.dumps({'error': 'Password does not meet minimum requirements. Please try again.'}))
            return
        if len(code) is 0:
            self.response.write(json.dumps({'error':'reset code not provided'}))
            return
        users = User.query(User.emaillogin_token_set.email == email).fetch(1)
        if len(users) > 0:
            if code != login_core.generate_reset_code(email):
                self.response.write(json.dumps({
                    'error': 'Unable to reset your password (it looks like you\'re using the wrong email address for'
                             ' that reset link!).  If you continue to have problems, please contact the Gift Concierge.'
                }))
            else:
                user = users[0]
                user.emaillogin_token_set = EmailLoginPair.EmailLoginPair().populate(email=email, password=password)
                user.put()
                self.response.write(json.dumps({
                    'ok': 'Your password has been changed.'
                }))
        else:
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
