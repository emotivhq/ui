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
from Notification import Notification
from Partner import Partner
from google.appengine.ext import ndb
import uuid
import stripe
import yaml
from social.facebook import facebook_share
import urllib
from uuid import uuid4

secrets = yaml.load(open('secret.yaml'))
stripe.api_key = secrets['stripe_auth']['app_secret']


def getUidFromCookies(request):
    return urllib.unquote(request.cookies.get('uid', '').replace('%22', ''))


def getTokenFromCookies(request):
    return urllib.unquote(request.cookies.get('token', '').replace('%22', ''))


def dictify_all(k):
    return map(lambda x: x.dictify(), k)


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

    def post(self):
        """
        sets Notifications for this User as being Seen or Achnowledged; accepts * or ID list: { "set_seen":"*", "set_acknowledged":[1,2,3] }
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        uid_path = self.request.path.split('/')[3][:-5]
        allow_protected_data = uid == uid_path and validate(uid, token, self.request.path)
        data = json.loads(self.request.body)
        set_seen = data['set_seen'] if ('set_seen' in data) else None
        set_acknowledged = data['set_acknowledged'] if ('set_acknowledged' in data) else None
        user = get_user(uid_path)
        if user is None or not allow_protected_data:
            self.response.set_status(400, "Invalid user id")
        else:
            # todo: only modify the right Notifications
            query = Notification.query(Notification.target_uid == user.uid)
            if set_seen is not None:
                seen_query = query.filter(Notification.seen == False)
                if set_seen == '*':
                    notifications = seen_query.fetch()
                else:
                    try:
                        notifications = seen_query.filter(Notification.id.IN([str(s) for s in json.loads(set_seen)])).fetch()
                    except ValueError as x:
                        self.response.write(json.dumps({'error':'invalid value '+str(set_seen)}))
                        return
                for n in notifications:
                    n.seen = True
                ndb.put_multi(notifications)
            if set_acknowledged is not None:
                acknowledged_query = query.filter(Notification.acknowledged == False)
                if set_acknowledged == '*':
                    notifications = acknowledged_query.fetch()
                else:
                    try:
                        notifications = acknowledged_query.filter(Notification.id.IN([str(s) for s in json.loads(set_acknowledged)])).fetch()
                    except ValueError as x:
                        self.response.write(json.dumps({'error':'invalid value '+str(set_acknowledged)}))
                        return
                for n in notifications:
                    n.acknowledged = True
                ndb.put_multi(notifications)
            response_data = {'ok':'Notifications updated'}
            self.response.write(json.dumps(response_data))

    def get(self):
        """
        Gets user notifications as JSON (including protected data if signed in as self)
        """
        # uid = getUidFromCookies(self.request)
        # token = getTokenFromCookies(self.request)
        uid_path = self.request.path.split('/')[3][:-5]
        # allow_protected_data = uid == uid_path and validate(uid, token, self.request.path)
        num = int(self.request.params.get('num').lower()) if ('num' in self.request.params.keys()) else 10
        show_seen = (self.request.params.get('seen').lower().strip() is 'true') if ('seen' in self.request.params.keys()) else True
        show_acknowledged = (self.request.params.get('acknowledged').lower().strip() is 'true') if ('acknowledged' in self.request.params.keys()) else False
        user = get_user(uid_path)
        if user is None:
            self.response.set_status(400, "Invalid user id")
        else:
            query = Notification.query(Notification.target_uid == user.uid)
            if not show_seen:
                query=query.filter(Notification.seen == False)
            if not show_acknowledged:
                query=query.filter(Notification.acknowledged == False)
            notifications = query.order(-Notification.timestamp).fetch(limit=num)
            response_data = {"notifications":dictify_all(notifications)}
            self.response.write(json.dumps(response_data))

class PartnerHandler(webapp2.RequestHandler):
    """JSON-formatted Partner"""
    def get(self):
        """
        Gets Partner as JSON (only if signed in as self)
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        uid_path = self.request.path.split('/')[3][:-5]
        allow_protected_data = uid == uid_path and validate(uid, token, self.request.path)
        if allow_protected_data:
            response_data = {
                'uid': uid_path,
                'company_name': '',
                'company_url': 'http://',
                'phone_number': '',
                'api_key': ''
            }
            partners = Partner.query(Partner.uid == uid_path).fetch(1)
            if(len(partners)):
                response_data = partners[0].dictify()
            self.response.write(json.dumps(response_data))
        else:
            self.response.set_status(400)
            self.response.write("Invalid user id")
    def post(self):
        """
        Sets Partner as JSON (only if signed in as self)
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        uid_path = self.request.path.split('/')[3][:-5]
        allow_protected_data = uid == uid_path and validate(uid, token, self.request.path)
        data = json.loads(self.request.body)
        if allow_protected_data:
            partner_data = data.get('partner')
            if(partner_data['uid']!=uid_path):
                self.response.set_status(400)
                self.response.write("Invalid user id")
                return
            company_name = str(partner_data['company_name']).strip()
            company_url = str(partner_data['company_url']).strip()
            if(company_url.find('http://') != 0 and company_url.find('https://') != 0):
                company_url = 'http://'+company_url
            if(company_url=='http://' or company_url=='https://'):
                company_url=''
            phone_number = str(partner_data['phone_number']).strip()
            if(company_name=='' or company_url=='' or phone_number==''):
                self.response.set_status(400)
                self.response.write("Please fill out all the fields")
                return
            partners = Partner.query(Partner.uid == uid_path).fetch(1)
            if(len(partners)):
                partner = partners[0]
                partner.company_name = company_name
                partner.company_url = company_url
                partner.phone_number = phone_number
            else:
                partner = Partner(
                    uid = partner_data['uid'],
                    company_name = company_name,
                    company_url = company_url,
                    phone_number = phone_number,
                    api_key = str(uuid4())
                )
            partner.put()
            response_data = partner.dictify()
            self.response.write(json.dumps(response_data))
        else:
            self.response.set_status(400)
            self.response.write("Invalid user id")

class UserProfileHandler(webapp2.RequestHandler):
    """JSON-formatted User"""
    def get(self):
        """
        Gets user as JSON (including protected data if signed in as self)
        """
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        uid_path = self.request.path.split('/')[3][:-5]
        allow_protected_data = uid == uid_path and validate(uid, token, self.request.path)
        extended_attribs = self.request.params['ext'] if 'ext' in self.request.params else []
        user = get_user(uid_path)
        if user is None:
            self.response.set_status(400, "Invalid user id")
        else:
            response_data = user.dictify(allow_protected_data)
            if('giftideas' in extended_attribs):
                products = StoredProduct.query(StoredProduct.uid == uid_path).fetch()
                response_data['giftideas'] = dictify_all(products)
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
                               ('/users/partner/.*.json', PartnerHandler),
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
