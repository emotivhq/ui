__author__ = 'stuart'

from requests_oauthlib import OAuth2Session
import config
import json
from datetime import datetime, timedelta
from google.appengine.ext import ndb
import requests


class GooglePlusTokenSet(ndb.Model):
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
            'expires_in': str(int((self.expires - datetime.now()).total_seconds()))
        }


REFRESH_URL = 'https://accounts.google.com/o/oauth2/token'
REFRESH_EXTRAS = {'client_id': config.CLIENT_ID, 'client_secret': config.CLIENT_SECRET}
IMG_QRY_URL = 'https://www.googleapis.com/plus/v1/people/me?fields=image'
UID_QRY_URL = 'https://www.googleapis.com/plus/v1/people/me'


def _request_with_refresh(url, token_set):
    if token_set.refresh_token:
        oauth = OAuth2Session(config.CLIENT_ID, token=token_set.to_token(), auto_refresh_url=REFRESH_URL,
                              auto_refresh_kwargs=REFRESH_EXTRAS, token_updater=token_saver)
    else:
        oauth = OAuth2Session(config.CLIENT_ID, token=token_set.to_token())
    return oauth.get(url)


def get_uid(token_set):
    response = json.loads(_request_with_refresh(UID_QRY_URL, token_set).content)
    return response['id']


def get_img_url(token_set):
    response = _request_with_refresh(IMG_QRY_URL, token_set)
    # Strip default image sizing, add our own
    img_url = json.loads(response.content)['image']['url'].split('?')[0] + '?sz=400'
    return img_url


def token_saver(token):
    print(token)


def get_user_info(user):
    response = _request_with_refresh("https://www.googleapis.com/plus/v1/people/", user.googleplus_token_set)
    gplus_user = json.loads(response.content)
    print(gplus_user)
    user.name = gplus_user['displayName']
    return user
