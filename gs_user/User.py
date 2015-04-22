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

    link_facebook = ndb.StringProperty()
    link_twitter = ndb.StringProperty()
    link_linkedin = ndb.StringProperty()
    link_googleplus = ndb.StringProperty()
    link_website = ndb.StringProperty()

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

    def dictify(self, include_protected_data=False):
        json_data = {
                'uid': self.uid,
                'name': self.name,
                'img_url': self.cached_profile_image_url,
                'link_facebook': self.link_facebook,
                'link_twitter': self.link_twitter,
                'link_linkedin': self.link_linkedin,
                'link_googleplus': self.link_googleplus,
                'link_website': self.link_website
            }
        if include_protected_data:
            json_data['email'] = self.email
            json_data['phone'] = self.phone_number
            json_data['birth_day'] = self.birth_day
            json_data['birth_month'] = self.birth_month
            json_data['shipping_address'] = self.shipping_address
            json_data['shipping_city'] = self.shipping_city
            json_data['shipping_state'] = self.shipping_state
            json_data['shipping_zip'] = self.shipping_zip
        return json_data

    def jsonify(self, include_protected_data=False):
        return json.dumps(self.dictify(include_protected_data))