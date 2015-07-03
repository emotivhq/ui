"""Token Set representing a FB login, and routines to get user info"""
__author__ = 'GiftStarter'

from . import GraphAPI
from datetime import datetime, timedelta
from google.appengine.ext import ndb
import logging


class FacebookTokenSet(ndb.Model):
    """googleplus token set: (access_token, expires)"""
    access_token = ndb.StringProperty()
    expires = ndb.DateTimeProperty()

    def populate(self, access_token, expires_in):
        self.access_token = access_token
        self.expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
        return self


def get_uid(token_set):
    """get FB ID for User"""
    graph = GraphAPI(token_set.access_token)
    fb_user = graph.get_object('me')
    return fb_user['id']


def update_user_info(user):
    """attempt to retrieve user info (name) from Facebook; update User"""
    try:
        graph = GraphAPI(user.facebook_token_set.access_token)
        social_json = graph.get_object(user.uid[1:])
        if user.name is None:
            user.name = social_json['name']
        if user.email is None and 'email' in social_json:
            user.email = social_json['email']
        if user.gender is None and 'gender' in social_json:
            user.gender = social_json['gender']
        if user.language is None and 'locale' in social_json:
            locale = social_json['locale'].split('_')
            if len(locale)>1:
                user.language = locale[0]
                user.location = locale[1]
        if user.timezone is None and 'timezone' in social_json:
            user.timezone = str(social_json['timezone'])
        if user.birth_month is None and 'birthday' in social_json:
            bday = social_json['birthday'].split('/')
            if(len(bday)>1):
                user.birth_month = int(bday[0])
                user.birth_day = int(bday[1])
    except Exception as x:
        logging.error("Failed to get facebook user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user
