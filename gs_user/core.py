__author__ = 'stuart'

from gs_user.User import User


def save_email(uid, email):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.email = email
    user.put()
