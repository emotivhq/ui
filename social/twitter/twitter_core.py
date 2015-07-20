"""Token Set representing a Twitter login, and routines to get user info"""
__author__ = 'GiftStarter'

import json

import requests
from google.appengine.ext import ndb
import logging
from requests_oauthlib import OAuth1
import yaml

APP_KEY = yaml.load(open('secret.yaml'))['twitter_auth']['app_key']
APP_KEY_SHARING = yaml.load(open('secret.yaml'))['twitter_auth']['app_key_sharing']
APP_SECRET = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret']
APP_SECRET_SHARING = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret_sharing']

APP_URL = yaml.load(open('config.yaml'))['app_url']


class TwitterTokenSet(ndb.Model):
    """Twitter token set: (access_token, access_secret)"""
    access_token = ndb.StringProperty()
    access_secret = ndb.StringProperty()

    def populate(self, access_token, access_secret):
        self.access_token = access_token
        self.access_secret = access_secret
        return self


def add_sharing_tokens(user, token_set):
    # twitter requires a separate set of access tokens (or a separate App) to allow read-access sometimes, read-write other times
    user.twitter_sharing_token_set = token_set
    user.put()
    return user


def get_uid(token_set, is_sharing_auth=False):
    if is_sharing_auth:
        key = APP_KEY_SHARING
        secret = APP_SECRET_SHARING
    else:
        key = APP_KEY
        secret = APP_SECRET
    """get Twitter ID for user"""
    url = 'https://api.twitter.com/1.1/account/verify_credentials.json'
    auth = OAuth1(key, secret, resource_owner_key=token_set.access_token,
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
        if user.twitter_uid is None:
            user.twitter_uid = social_json['id']
        if user.name is None:
            user.name = social_json['name']
        if user.timezone is None and 'utc_offset' in social_json:
            try:
                user.timezone = str(int(social_json['utc_offset'])/3600)
            except:
                pass
        if user.location is None and 'location' in social_json:
            user.location = social_json['location']
        print "TWITTER EMAIL: "+get_email(user.twitter_token_set)
        if user.email is None:
            user.email = get_email(user.twitter_token_set)
        if user.link_twitter is None and 'screen_name' in social_json:
            user.link_twitter = "http://twitter.com/"+social_json['screen_name']
    except Exception as x:
        logging.error("Failed to get twitter user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user


def has_permission_to_publish(user):
    """
    do we have permission to publish to this user's feed?
    :param user:
    :return: True if we are allowed to publish on this user's feed
    """
    if user.twitter_sharing_token_set is not None:
        try:
            twitter_id = get_uid(user.twitter_sharing_token_set, True)
            if(user.twitter_uid is None):
                user.twitter_uid = 't'+twitter_id
                user.put()
            return True
        except Exception as x:
            pass
    return False


def publish_to_status(user, message):
    """
    update the user's Twitter status (eg "tweet"), as per https://dev.twitter.com/rest/reference/post/statuses/update
    :param user: user for whom has_permission_to_publish() is known to be true
    :param message: message body
    :return: True if publish succeeded, False if it failed
    """
    # TODO: deal with visibility problem http://stackoverflow.com/a/28152591 (check visibility, if SELF or NO_FRIENDS, force re-auth?)
    try:
        auth = OAuth1(APP_KEY_SHARING, APP_SECRET_SHARING, resource_owner_key=user.twitter_sharing_token_set.access_token,
                      resource_owner_secret=user.twitter_sharing_token_set.access_secret)
        data = {'status': message}
        response = requests.post("https://api.twitter.com/1.1/statuses/update.json", auth=auth, data=data)
        if "errors" in json.loads(response.content):
            return False
        return True
    except Exception as x:
        logging.error("Unable to post to twitter for {0}: {1}".format(user.uid, x))
        return False