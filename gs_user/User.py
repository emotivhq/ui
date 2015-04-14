"""a User of the application"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
from social.facebook import FacebookTokenSet
from social.twitter import TwitterTokenSet
from social.googleplus import GooglePlusTokenSet
from login import EmailLoginPair
import json


class User(ndb.Model):
    """a User of the application: UID, name, login tokens, avatar, email, phone, referrer, CC processor ids, etc"""
    uid = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

    name = ndb.StringProperty()

    logged_in_with = ndb.StringProperty(required=True)

    emaillogin_uid = ndb.StringProperty()
    emaillogin_token_set = ndb.StructuredProperty(EmailLoginPair.EmailLoginPair)

    twitter_uid = ndb.StringProperty()
    twitter_token_set = ndb.StructuredProperty(TwitterTokenSet)

    facebook_uid = ndb.StringProperty()
    facebook_token_set = ndb.StructuredProperty(FacebookTokenSet)

    googleplus_id = ndb.StringProperty()
    googleplus_token_set = ndb.StructuredProperty(GooglePlusTokenSet)

    cached_profile_image_url = ndb.StringProperty()
    email = ndb.StringProperty()
    subscribed_to_mailing_list = ndb.BooleanProperty(default=False)
    phone_number = ndb.StringProperty()

    referrer_type = ndb.StringProperty()
    referrer_channel = ndb.StringProperty()
    referrer_uid = ndb.StringProperty()
    referrer_uuid = ndb.StringProperty()

    shipping_address = ndb.StringProperty()
    shipping_city = ndb.StringProperty()
    shipping_state = ndb.StringProperty()
    shipping_zip = ndb.StringProperty()

    birth_day = ndb.IntegerProperty()
    birth_month = ndb.IntegerProperty()

    has_pitched_in = ndb.BooleanProperty(default=False)

    stripe_id = ndb.StringProperty()

    paypal_vault_payer_id = ndb.StringProperty()

    def jsonify(self, include_protected_data=False):
        if(include_protected_data):
            return json.dumps({
                'uid': self.uid,
                'name': self.name,
                'img_url': self.cached_profile_image_url,
                'email': self.email,
                'phone': self.phone_number,
                'birth_day': self.birth_day,
                'birth_month': self.birth_month,
                'shipping_address': self.shipping_address,
                'shipping_city': self.shipping_city,
                'shipping_state': self.shipping_state,
                'shipping_zip': self.shipping_zip,
            })
        else :
            return json.dumps({
                'uid': self.uid,
                'name': self.name,
                'img_url': self.cached_profile_image_url
            })