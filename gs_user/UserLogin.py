"""a record of a user having logged in"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb


class UserLogin(ndb.Model):
    """a record of a user having logged in: their ID, URI, and timestamp"""
    uid = ndb.StringProperty(required=True)
    path = ndb.TextProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)

    @staticmethod
    def register_login(uid, path):
        login = UserLogin(uid=uid, path=path)
        login.put()
