__author__ = 'stuart'

from google.appengine.ext import ndb


def save_email(uid, email):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.email = email
    user.put()


class User(ndb.Model):
    uid = ndb.StringProperty(required=True)
    access_token = ndb.StringProperty(required=True)
    lt_access_token = ndb.StringProperty()
    lt_token_expires = ndb.DateTimeProperty()
    cached_profile_image_url = ndb.StringProperty()
    email = ndb.StringProperty()
    phone_number = ndb.StringProperty()

