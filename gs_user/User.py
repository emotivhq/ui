__author__ = 'stuart'

from google.appengine.ext import ndb


class User(ndb.Model):
    uid = ndb.StringProperty(required=True)

    logged_in_with = ndb.StringProperty(required=True)

    twitter_access_token = ndb.StringProperty()
    twitter_access_secret = ndb.StringProperty()

    facebook_uid = ndb.StringProperty()
    facebook_access_token = ndb.StringProperty()
    facebook_lt_access_token = ndb.StringProperty()
    facebook_lt_token_expires = ndb.DateTimeProperty()

    gplus_id = ndb.StringProperty()
    gplus_access_token = ndb.StringProperty()

    cached_profile_image_url = ndb.StringProperty()
    email = ndb.StringProperty()
    phone_number = ndb.StringProperty()
