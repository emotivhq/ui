__author__ = 'stuart'

from google.appengine.ext import ndb


class UserLogin(ndb.Model):
    uid = ndb.StringProperty(required=True)
    path = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now=True)

    @staticmethod
    def register_login(uid, path):
        login = UserLogin(uid=uid, path=path)
        login.put()
