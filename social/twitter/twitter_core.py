__author__ = 'stuart'

import json

import requests
from google.appengine.ext import ndb
import logging
from requests_oauthlib import OAuth1
import yaml

APP_KEY = yaml.load(open('secret.yaml'))['twitter_auth']['app_key']
APP_SECRET = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret']

APP_URL = yaml.load(open('config.yaml'))['app_url']


class TwitterTokenSet(ndb.Model):
    access_token = ndb.StringProperty()
    access_secret = ndb.StringProperty()

    def populate(self, access_token, access_secret):
        self.access_token = access_token
        self.access_secret = access_secret
        return self


def get_uid(token_set):
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth)
    twitter_uid = json.loads(response.content)['id']

    return str(twitter_uid)


def get_img_url(token_set):
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth)
    img_url = json.loads(response.content)['profile_image_url'].replace("_normal.", ".")

    return str(img_url)


def get_user_info(user):
    try:
        auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=user.twitter_token_set.access_token,
                      resource_owner_secret=user.twitter_token_set.access_secret)
        response = requests.get("https://api.twitter.com/1.1/users/show.json?user_id=" + user.uid[1:],
                                auth=auth)
        twitter_user = json.loads(response.content)
        user.name = twitter_user['name']
    except:
        logging.error("Daaaamn failed to get twitter user info for {uid}."
                      .format(uid=user.uid))
    return user
