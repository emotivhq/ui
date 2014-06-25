__author__ = 'stuart'

import requests
from requests_oauthlib import OAuth1
import secret
import json
from .. import OAuthTokenPair


def get_auth_url():
    url = 'https://api.twitter.com/oauth/request_token'
    auth = OAuth1(secret.APP_KEY, secret.APP_SECRET,
                  callback_uri='http://6.gift-starter.appspot.com/oauth-callback/twitter')
    response = requests.post(url=url, auth=auth)
    result_dict = {k: v for k, v in [pair.split('=') for pair in response.content.split('&')]}

    if result_dict['oauth_callback_confirmed']:
        oauth_token_pair = OAuthTokenPair(oauth_token=result_dict['oauth_token'],
                                          oauth_secret=result_dict['oauth_token_secret'])
        oauth_token_pair.put()
        return json.dumps({'url': 'https://api.twitter.com/oauth/authenticate?oauth_token=' +
                                  result_dict['oauth_token']})
    else:
        return None


def submit_verifier(oauth_token, oauth_verifier):
    url = 'https://api.twitter.com/oauth/access_token'
    oauth_secret = OAuthTokenPair.query(OAuthTokenPair.oauth_token == oauth_token).fetch(1)[0].oauth_secret
    auth = OAuth1(secret.APP_KEY, secret.APP_SECRET, resource_owner_key=oauth_token, resource_owner_secret=oauth_secret,
                  verifier=oauth_verifier)
    response = requests.post(url=url, auth=auth)
    result_dict = {k: v for k, v in [pair.split('=') for pair in response.content.split('&')]}
    access_token = result_dict['oauth_token']
    access_secret = result_dict['oauth_token_secret']
    return {'access_token': access_token, 'access_secret': access_secret}


def is_logged_in(twitter_access_token, twitter_access_secret):
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(secret.APP_KEY, secret.APP_SECRET, resource_owner_key=twitter_access_token,
                  resource_owner_secret=twitter_access_secret)
    response = requests.get(url=url, auth=auth)
    print(response)
    return response.status_code == 200

