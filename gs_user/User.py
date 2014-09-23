__author__ = 'stuart'

from google.appengine.ext import ndb
from social.facebook import FacebookTokenSet
from social.twitter import TwitterTokenSet
from social.googleplus import GooglePlusTokenSet
import json


class User(ndb.Model):
    uid = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

    name = ndb.StringProperty()

    logged_in_with = ndb.StringProperty(required=True)

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

    def jsonify(self):
        return json.dumps({
            'uid': self.uid,
            'name': self.name,
            'img_url': self.cached_profile_image_url
        })