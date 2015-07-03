"""Token Set representing a Google Plus login, and routines to get user info"""
__author__ = 'GiftStarter'

import json
from datetime import datetime, timedelta
from google.appengine.ext import ndb
from requests_oauthlib import OAuth2Session
import yaml
import logging

secret = yaml.load(open('secret.yaml'))


class GooglePlusTokenSet(ndb.Model):
    """googleplus token set: (access_token, refresh_token, expires, token_type)"""
    access_token = ndb.StringProperty()
    refresh_token = ndb.StringProperty()
    expires = ndb.DateTimeProperty()
    token_type = ndb.StringProperty()

    def populate(self, access_token, refresh_token, expires_in, token_type):
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
        self.token_type = token_type
        return self

    def to_token(self):
        return {
            'refresh_token': self.refresh_token,
            'access_token': self.access_token,
            'token_type': self.token_type,
            'expires_in': str(int((self.expires -
                                   datetime.now()).total_seconds()))
        }


REFRESH_URL = 'https://accounts.google.com/o/oauth2/token'
REFRESH_EXTRAS = {'client_id': secret['googleplus_auth']['client_id'],
                  'client_secret': secret['googleplus_auth']['client_secret']}
IMG_QRY_URL = 'https://www.googleapis.com/plus/v1/people/me?fields=image'
UID_QRY_URL = 'https://www.googleapis.com/plus/v1/people/me'


def _request_with_refresh(url, token_set):
    """access provided googleplus URL with provided token; attempt to refresh token in the process"""
    if token_set.refresh_token:
        oauth = OAuth2Session(secret['googleplus_auth']['client_id'],
                              token=token_set.to_token(),
                              auto_refresh_url=REFRESH_URL,
                              auto_refresh_kwargs=REFRESH_EXTRAS,
                              token_updater=token_saver)
    else:
        oauth = OAuth2Session(secret['googleplus_auth']['client_id'],
                              token=token_set.to_token())
    return oauth.get(url)


def get_uid(token_set):
    """get googleplus ID for user"""
    response = json.loads(_request_with_refresh(UID_QRY_URL,
                                                token_set).content)
    return response['id']


def get_email(uid, token_set):
    """
    get email address for user from GooglePlus
    :param token_set:
    :return: email address, or None if unavailable
    """
    try:
        response = _request_with_refresh("https://www.googleapis.com/userinfo/email?alt=json", token_set)
        content = json.loads(response.content)
        return content['data']['email']
    except:
        logging.info("Unable to refresh email address via googleplus for {0}".format(uid))
        return None



def get_img_url(token_set):
    """get URL of avatar for user"""
    response = _request_with_refresh(IMG_QRY_URL, token_set)
    # Strip default image sizing, add our own
    img_url = json.loads(response.content)['image']['url'].split('?')[0] + \
              '?sz=400'
    return img_url


def token_saver(token):
    pass


def update_user_info(user):
    """attempt to retrieve user info (name) from googleplus; update User"""
    try:
        response = _request_with_refresh("https://www.googleapis.com/plus/v1/people/" + user.uid[1:],
                                         user.googleplus_token_set)
        social_json = json.loads(response.content)
        if user.name is None:
            user.name = social_json['displayName']
        if user.gender is None and 'gender' in social_json:
            user.gender = social_json['gender']
        if user.language is None and 'language' in social_json:
            user.language = social_json['language']
        if user.location is None and 'placesLived' in social_json:
            try:
                for place in social_json['placesLived']:
                    if place['primary']:
                        user.location = place['value']
            except:
                pass
        if user.link_googleplus is None and 'url' in social_json:
            user.link_googleplus = social_json['url']
        if user.email is None:
            user.email = get_email(user.uid, user.googleplus_token_set)
    except Exception as x:
        logging.error("Failed to get google user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user
