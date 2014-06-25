__author__ = 'stuart'

import secret
import requests
from requests_oauthlib import OAuth1
import json


def get_uid(oauth_token, oauth_secret):

    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(secret.APP_KEY, secret.APP_SECRET, resource_owner_key=oauth_token,
                  resource_owner_secret=oauth_secret)
    response = requests.get(url=url, auth=auth)
    twitter_uid = json.loads(response.content)['id']

    return str(twitter_uid)


def get_img_url(oauth_token, oauth_secret):

    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(secret.APP_KEY, secret.APP_SECRET, resource_owner_key=oauth_token,
                  resource_owner_secret=oauth_secret)
    response = requests.get(url=url, auth=auth)
    img_url = json.loads(response.content)['profile_image_url']

    return str(img_url)