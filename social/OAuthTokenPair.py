__author__ = 'GiftStarter'

from google.appengine.ext import ndb


class OAuthTokenPair(ndb.Model):
    oauth_token = ndb.StringProperty(required=True)
    oauth_secret = ndb.StringProperty(required=True)
