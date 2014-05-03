__author__ = 'stuart'

from gs_user import User
from datetime import datetime, timedelta


def store_extended_key(uid, token, lt_token, expires_in):
    user = User.query(User.uid == uid).fetch()
    # If user does not exist yet, create
    user = user[0] if len(user) > 0 else User()
    user.uid = uid
    user.access_token = token
    user.lt_access_token = lt_token
    user.lt_token_expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
    user.put()