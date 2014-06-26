__author__ = 'stuart'

from google.appengine.ext import ndb
from social.facebook import FacebookTokenSet
from social.twitter import TwitterTokenSet
from social.googleplus import GooglePlusTokenSet


class User(ndb.Model):
    uid = ndb.StringProperty(required=True)

    logged_in_with = ndb.StringProperty(required=True)

    twitter_uid = ndb.StringProperty()
    twitter_token_set = ndb.StructuredProperty(TwitterTokenSet)

    facebook_uid = ndb.StringProperty()
    facebook_token_set = ndb.StructuredProperty(FacebookTokenSet)

    googleplus_id = ndb.StringProperty()
    googleplus_token_set = ndb.StructuredProperty(GooglePlusTokenSet)

    cached_profile_image_url = ndb.StringProperty()
    email = ndb.StringProperty()
    phone_number = ndb.StringProperty()
