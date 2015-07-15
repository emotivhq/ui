"""provide redirection URLs and verification for Twitter login service"""
__author__ = 'GiftStarter'

import json

import requests

from requests_oauthlib import OAuth1
from .. import OAuthTokenPair
from twitter_core import TwitterTokenSet, get_uid
import yaml

APP_KEY = yaml.load(open('secret.yaml'))['twitter_auth']['app_key']
APP_KEY_SHARING = yaml.load(open('secret.yaml'))['twitter_auth']['app_key_sharing']
APP_SECRET = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret']
APP_SECRET_SHARING = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret_sharing']

APP_URL = yaml.load(open('config.yaml'))['app_url']


def get_auth_url(current_url, is_sharing_auth=False):
    """gets redirection URL for Twitter login"""
    url = 'https://api.twitter.com/oauth/request_token'
    if is_sharing_auth:
        # url += '?x_auth_access_type=write'
        key = APP_KEY_SHARING
        secret = APP_SECRET_SHARING
    else:
        key = APP_KEY
        secret = APP_SECRET
    auth = OAuth1(client_key=key, client_secret=secret, callback_uri=current_url)
    response = requests.post(url=url, auth=auth)
    result_dict = {k: v for k, v in [pair.split('=') for pair in
                                     response.content.split('&')]}

    if result_dict['oauth_callback_confirmed']:
        oauth_token_pair = OAuthTokenPair(oauth_token=result_dict['oauth_token'],
                                          oauth_secret=result_dict['oauth_token_secret'])
        oauth_token_pair.put()
        return json.dumps({
            'url': 'https://api.twitter.com/oauth/authenticate?oauth_token=' +
                   result_dict['oauth_token']})
    else:
        return None


def submit_verifier(oauth_token, oauth_verifier, is_sharing_auth=False):
    """
    exchange an OAuth Request Token for an OAuth Access Token
    as per https://dev.twitter.com/oauth/reference/post/oauth/access_token
    """
    url = 'https://api.twitter.com/oauth/access_token'
    oauth_secret = OAuthTokenPair.query(OAuthTokenPair.oauth_token == oauth_token).fetch(1)[0].oauth_secret
    if is_sharing_auth:
        key = APP_KEY_SHARING
        secret = APP_SECRET_SHARING
    else:
        key = APP_KEY
        secret = APP_SECRET
    auth = OAuth1(key, secret, resource_owner_key=oauth_token,
                  resource_owner_secret=oauth_secret,
                  verifier=oauth_verifier)
    response = requests.post(url=url, auth=auth)
    result_dict = {k: v for k, v in [pair.split('=') for pair in response.content.split('&')]}
    return TwitterTokenSet().populate(result_dict['oauth_token'], result_dict['oauth_token_secret'])


def is_logged_in(token_set):
    """verifies that current user is logged in with Twitter"""
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(APP_KEY, APP_SECRET,
                  resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth)
    return response.status_code == 200

