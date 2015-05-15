"""endpoints and user-facing pages for user metadata, login and subscription handlers, and credit-card tokens"""
__author__ = 'GiftStarter'

import webapp2
from social import twitter, googleplus, facebook
import json
from gs_user_core import update_or_create, get_user, \
    subscribe_to_mailing_list, subscribe_to_sweepstakes, validate, get_card_tokens, send_welcome_email
from gs_user_stats import get_stats
from StoredProduct import StoredProduct
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

secrets = yaml.load(open('secret.yaml'))
stripe.api_key = secrets['stripe_auth']['app_secret']


def getUidFromCookies(request):
    return urllib.unquote(request.cookies.get('uid', '').replace('%22', ''))

def getTokenFromCookies(request):
    return urllib.unquote(request.cookies.get('token', '').replace('%22', ''))

class StatsHandler(webapp2.RequestHandler):
    """JSON-formatted metadata about User (list of giftstarts and pitchins)"""
    def get(self):
        """
        Gets stats for passed in user.
        """
        uid = self.request.path[7:-5]
        self.response.write(json.dumps(get_stats(uid)))

class UserNotifyHandler(webapp2.RequestHandler):
    """JSON-formatted User"""

    def get(self):
        """
        Gets user notifications as JSON (including protected data if signed in as self)
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        allow_protected_data = validate(uid, token, self.request.path)
        uid = self.request.path.split('/')[3][:-5]
        if uid[0] not in ['f', 'g', 't', 'e']:
            self.response.set_status(400, "Invalid user id")
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
            else:
                response_data = {"notifications":[
                    {"id":1, "title":"title one", "message":"test one", "image":"https://storage.googleapis.com/giftstarter-pictures/u/g113973637227780697952.jpg"},
                    {"id":2, "title":"title two", "message":"test two", "image":"https://storage.googleapis.com/giftstarter-pictures/u/g116794909651143246507.jpg"}
                ]}
                self.response.write(json.dumps(response_data))

class UserProfileHandler(webapp2.RequestHandler):
    """JSON-formatted User"""
    def get(self):
        """
        Gets user as JSON (including protected data if signed in as self)
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        allow_protected_data = validate(uid, token, self.request.path)
        extended_attribs = self.request.params['ext'] if 'ext' in self.request.params else []
        uid = self.request.path.split('/')[3][:-5]
        if uid[0] not in ['f', 'g', 't', 'e']:
            self.response.set_status(400, "Invalid user id")
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
            else:
                response_data = user.dictify(allow_protected_data)
                if('giftideas' in extended_attribs):
                    products = StoredProduct.query(StoredProduct.uid == uid).fetch()
                    response_data['giftideas'] = map(lambda x: x.dictify(), products)
                self.response.write(json.dumps(response_data))


class UserPageHandler(webapp2.RequestHandler):
    """user-facing page for User metadata"""
    def get(self):
        """ A request for data about a specific user
        """
        self.response.write(render_app(self.request))

class SweepstakesSubscribeHandler(webapp2.RequestHandler):
    """handle requests to subscribe to sweepstakes list"""
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
    """handle requests to subscribe to mailing lists"""
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
    """provide User JSON data, and handle POSTs for login services"""
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
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        is_validated_self = validate(uid, token, self.request.path) and 'uid' in data and uid == data['uid']

        if data['action'] == 'update-profile':
            if(is_validated_self):
                user = ndb.Key('User', uid).get()
                was_email_empty = user.email is None or len(user.email) == 0
                try:
                    user.name=data['name']
                    user.link_facebook=data['link_facebook']
                    user.link_twitter=data['link_twitter']
                    user.link_linkedin=data['link_linkedin']
                    user.link_googleplus=data['link_googleplus']
                    user.link_website=data['link_website']
                    user.email=data['email']
                    user.phone_number=data['phone']
                    user.birth_day=data['birth_day']
                    user.birth_month=data['birth_month']
                    user.shipping_address=data['shipping_address']
                    user.shipping_city=data['shipping_city']
                    user.shipping_state=data['shipping_state']
                    user.shipping_zip=data['shipping_zip']
                    user.put()
                    self.response.write(json.dumps({
                        'ok': 'User updated'
                    }))
                except KeyError as x:
                    self.response.set_status(400, "Invalid user id")
                    self.response.write(json.dumps({
                        'error': 'Please fill in your '+x.message
                    }))
                if was_email_empty and user.email is not None and len(user.email) > 0:
                    send_welcome_email(user.email)
            else:
                self.response.set_status(400, "Invalid user id")
                self.response.write(json.dumps({
                    'error': 'It looks like you\'re trying to edit someone else\'s profile.'
                }))
        elif data['action'] == 'delete-save-for-later':
            if is_validated_self:
                try:
                    s = StoredProduct.query(
                        StoredProduct.uid == uid,
                        StoredProduct.url == data['url'],
                        StoredProduct.retailer == data['retailer'],
                        StoredProduct.price == data['price'],
                        StoredProduct.title == data['title'],
                        StoredProduct.img == data['imgUrl']
                    ).fetch(1)
                    if len(s)>0:
                        s[0].key.delete()
                    self.response.write(json.dumps({
                        'ok': 'List updated'
                    }))
                except KeyError as x:
                    self.response.set_status(400, "Invalid user id")
                    self.response.write(json.dumps({
                        'error': 'Please fill in the '+x.message
                    }))
            else:
                self.response.set_status(400, "Invalid user id")
                self.response.write(json.dumps({
                    'error': 'It looks like you\'re trying to edit someone else\'s list.'
                }))
        elif data['action'] == 'save-for-later':
            if is_validated_self:
                try:
                    product = StoredProduct(
                        uid=uid,
                        url=data['url'],
                        retailer=data['retailer'],
                        price=data['price'],
                        title=data['title'],
                        description=data['description'],
                        img=data['imgUrl'])
                    product.put()
                    self.response.write(json.dumps({
                        'ok': 'List updated'
                    }))
                except KeyError as x:
                    self.response.set_status(400, "Invalid user id")
                    self.response.write(json.dumps({
                        'error': 'Please fill in the '+x.message
                    }))
            else:
                self.response.set_status(400, "Invalid user id")
                self.response.write(json.dumps({
                    'error': 'It looks like you\'re trying to edit someone else\'s list.'
                }))
        elif data['action'] == 'is-logged-in':
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
    """puts an uploaded image into the datastore and associates it with the provided UID"""

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


class PaymentCardsHandler(webapp2.RequestHandler):
    """ Handles requests for payment tokens """

    def get(self):
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)

        if not all([bool(thing) for thing in [uid, token]]):
            logging.warning("Invalid data used for payment cards request:"
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

        charge_tokens = get_card_tokens(user)
        self.response.write(json.dumps(charge_tokens))


api = webapp2.WSGIApplication([('/users/subscribe.json', SubscribeHandler),
                               ('/users/sweepstakes.json', SweepstakesSubscribeHandler),
                               ('/users/profile/.*.json', UserProfileHandler),
                               ('/users/notify/.*.json', UserNotifyHandler),
                               ('/users/.*/network/facebook/giftstart-invite/.*.json', facebook_share.FacebookShareHandler),
                               ('/users/.*/img/new.json', ImageUploadHandler),
                               ('/users/.*/cards.json', PaymentCardsHandler),
                               ('/users/.*.json', StatsHandler),
                               ('/users/.*', UserPageHandler),
                               ('/users.*', UserHandler),
                               ], debug=True)
user_page = webapp2.WSGIApplication([('/u', UserPageHandler)], debug=True)
