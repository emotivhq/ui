"""Token Set representing a Twitter login, and routines to get user info"""
__author__ = 'GiftStarter'

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
    """Twitter token set: (access_token, access_secret)"""
    access_token = ndb.StringProperty()
    access_secret = ndb.StringProperty()

    def populate(self, access_token, access_secret):
        self.access_token = access_token
        self.access_secret = access_secret
        return self


def get_uid(token_set):
    """get Twitter ID for user"""
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth) #, params={'include_email':'true'})
    twitter_uid = json.loads(response.content)['id']

    return str(twitter_uid)

def get_email(token_set):
    """
    get email address for user from Twitter
    :param token_set:
    :return: email address, or None if unavailable
    """
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
    auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth) #, params={'include_email':'true'})
    content = json.loads(response.content)
    return content['email'] if 'email' in content else None


def get_img_url(token_set):
    """get URL of avatar for user"""
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=token_set.access_token,
                  resource_owner_secret=token_set.access_secret)
    response = requests.get(url=url, auth=auth)
    img_url = json.loads(response.content)['profile_image_url'].replace("_normal.", ".")

    return str(img_url)


def update_user_info(user):
    """attempt to retrieve user info (name) from Twitter; update User"""
    try:
        auth = OAuth1(APP_KEY, APP_SECRET, resource_owner_key=user.twitter_token_set.access_token,
                      resource_owner_secret=user.twitter_token_set.access_secret)
        response = requests.get("https://api.twitter.com/1.1/users/show.json?include_email=true&user_id=" + user.uid[1:],
                                auth=auth)
        social_json = json.loads(response.content)
        if user.name is None:
            user.name = social_json['name']
        if user.timezone is None and 'utc_offset' in social_json:
            try:
                user.timezone = str(int(social_json['utc_offset'])/3600)
            except:
                pass
        if user.location is None and 'location' in social_json:
            user.location = social_json['location']
        if user.email is None:
            user.email = get_email(user.twitter_token_set)
    except Exception as x:
        logging.error("Failed to get twitter user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user
