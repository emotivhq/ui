__author__ = 'GiftStarter'

import webapp2
from social import twitter, googleplus, facebook
import json
from gs_user_core import update_or_create, get_user, \
    subscribe_to_mailing_list, subscribe_to_sweepstakes, validate, get_card_tokens
from gs_user_stats import get_stats
from UserLogin import UserLogin
from render_app import render_app
import re
from gs_user.gs_user_referral import UserReferral
from storage import image_cache
import base64
import logging
from gs_user.User import User
from google.appengine.ext import ndb
import uuid
import stripe
import yaml
from social.facebook import facebook_share
import urllib

stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['app_secret']


class StatsHandler(webapp2.RequestHandler):
    def get(self):
        """
        Gets stats for passed in user.
        """
        uid = self.request.path[7:-5]
        self.response.write(json.dumps(get_stats(uid)))


class UserPageHandler(webapp2.RequestHandler):
    def get(self):
        """ A request for data about a specific user
        """
        self.response.write(render_app(self.request))

class SweepstakesSubscribeHandler(webapp2.RequestHandler):
    def post(self):
        self.put()
    def put(self):
        data = json.loads(self.request.body)
        email = data.get('email')
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        if email is None:
            self.response.write(json.dumps({
                'error': 'Please provide an email address'
            }))
            return
        try:
            subscribe_to_sweepstakes(email, firstname, lastname)
            self.response.write(json.dumps({
                'ok': "Your entry has been recorded. Thank you! (click here to close)"
            }))
        except Exception:
            self.response.write(json.dumps({
                'error': "We can't seem to process your entry (perhaps your email is mistyped?).  If you continue to"
                         " receive this error, please contact the Gift Concierge."
            }))

class SubscribeHandler(webapp2.RequestHandler):
    def put(self):
        data = json.loads(self.request.body)
        email = data.get('email')
        double_opt_in = data.get('double_opt_in')
        if email is None:
            self.response.set_status(400, 'Expected email address')
        elif double_opt_in is None:
            self.response.set_status(400, 'Expected double_opt_in')
        elif (not isinstance(email, str)) and \
                (not isinstance(email, type(u''))):
            self.response.set_status(400, 'Expected email to be string')
        elif not isinstance(double_opt_in, bool):
            self.response.set_status(400, 'Expected double_opt_in to be bool')
        elif not bool(re.search('', email)):
            self.response.set_status(400, 'Email not valid')
        else:
            subscribe_to_mailing_list(email, double_opt_in)


class UserHandler(webapp2.RequestHandler):
    def get(self):
        uid = self.request.path.split('/')[-1]
        if uid[0] not in ['f', 'g', 't', 'e']:
            self.response.set_status(400, "Invalid user id")
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
            else:
                self.response.write(user.jsonify())

    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-logged-in':
            if data['service'] == 'twitter':
                self.response.write(twitter.is_logged_in(data['uid']))

        elif data['action'] == 'get-auth-url':
            if data['service'] == 'twitter':
                self.response.write(twitter.get_auth_url(data['redirect_url']))

        elif data['action'] == 'submit-verifier':
            if data['service'] == 'twitter':
                referrer = UserReferral.from_dict(data.get('referrer', {}))
                token_set = twitter.submit_verifier(data['oauth_token'], data['verifier'])
                user = update_or_create('twitter', token_set, referrer)
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({
                        'status': 'logged-in', 'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.twitter_token_set.access_token,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }))

        elif data['action'] == 'get-long-term-token':
            if data['service'] == 'facebook':
                referrer = UserReferral.from_dict(data.get('referrer', {}))
                token_set = facebook.get_extended_key(data['auth_token'])
                user = update_or_create('facebook', token_set, referrer)

                user.facebook_token_set = token_set
                user.put()
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({
                        'status': 'logged-in', 'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.facebook_token_set.access_token,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }))

        else:
            self.response.status_int = 400


class ImageUploadHandler(webapp2.RequestHandler):

    def put(self):
        uid = self.request.path.split('/')[2]
        json_body = json.loads(self.request.body)
        content_type = self.request.headers.get('Content-Type').split('/')
        hdr_uid = urllib.unquote(str(self.request.cookies.get('uid')).replace('%22', ''))
        token = urllib.unquote(str(self.request.cookies.get('token')).replace('%22', ''))

        if uid != hdr_uid:
            logging.warning("Received profile image upload for wrong uid")
            self.response.set_status(403)
        elif not validate(hdr_uid, token, self.request.path):
            logging.warning("Invalid credentials passed for profile image "
                            "upload")
            self.response.set_status(403)
        elif content_type[0] != 'image':
            logging.warning("Received profile image upload that was not image")
            self.response.set_status(400, 'Invalid content-type, must be '
                                          'image')
        elif content_type[1] != 'jpeg' and \
                        content_type[1] != 'jpg' and \
                        content_type[1] != 'png':
            logging.warning("Received profile image upload with invalid "
                            "content type")
            self.response.set_status(400, 'Invalid image encoding, only jpg '
                                          'and png are acceptable')
        else:
            try:
                image_data = json_body.get('data').split('base64,')[1]
                extension = image_cache.extract_extension_from_content(
                    base64.b64decode(image_data))
                base64data = ','.join(json_body.get('data').split(',')[1:])
                img_data = base64data.decode('base64', 'strict')
                fname = str(uuid.uuid4())
                updated = image_cache.save_picture_to_gcs(fname + extension,
                                                          'u/', img_data)
                user = ndb.Key('User', uid).get()
                user.cached_profile_image_url = updated
                user.put()
                self.response.write(updated)
            except TypeError as e:
                logging.error(e)
                logging.warning("Received profile image with invalid data")
                self.response.set_status(400, "Invalid image data")


class StripeCardsHandler(webapp2.RequestHandler):
    """ Handles requests for stripe tokens """

    def get(self):
        uid = urllib.unquote(self.request.cookies.get('uid', '').replace('%22', ''))
        token = urllib.unquote(self.request.cookies.get('token', '').replace('%22', ''))

        if not all([bool(thing) for thing in [uid, token]]):
            logging.warning("Invalid data used for stripe token request:"
                            "\n{0}".format(self.request.body))
            self.response.set_status(400, "Invalid data")
            return

        # validate user and token
        if validate(uid, token, self.request.path):
            user = ndb.Key('User', uid).get()

        else:
            logging.warning("Invalid user credentials:\n{0}"
                            .format(self.request.cookies))
            self.response.set_status(403)
            return

        charge_tokens = get_card_tokens(user.stripe_id)
        self.response.write(json.dumps(charge_tokens))


api = webapp2.WSGIApplication([('/users/subscribe.json', SubscribeHandler),
                               ('/users/sweepstakes.json', SweepstakesSubscribeHandler),
                               ('/users/.*/network/facebook/giftstart-invite/.*.json', facebook_share.FacebookShareHandler),
                               ('/users/.*/img/new.json', ImageUploadHandler),
                               ('/users/.*/cards.json', StripeCardsHandler),
                               ('/users/.*.json', StatsHandler),
                               ('/users/.*', UserPageHandler),
                               ('/users.*', UserHandler),
                               ], debug=True)
user_page = webapp2.WSGIApplication([('/u', UserPageHandler)], debug=True)
