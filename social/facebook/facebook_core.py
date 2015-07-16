"""Token Set representing a FB login, and routines to get user info"""
__author__ = 'GiftStarter'

from . import GraphAPI
from datetime import datetime, timedelta
from google.appengine.ext import ndb
import logging
import requests
import json


fb_api_url_permissions = "https://graph.facebook.com/me/permissions"


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


def add_login_tokens(user, token_set):
    user.facebook_token_set = token_set
    user.put()


def update_user_info(user):
    """attempt to retrieve user info (name) from Facebook; update User"""
    try:
        graph = GraphAPI(user.facebook_token_set.access_token)
        social_json = graph.get_object(user.uid[1:])
        if user.facebook_uid is None:
            user.facebook_uid = social_json['id']
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
        if user.link_facebook is None and 'link' in social_json:
            user.link_facebook = social_json['link']
    except Exception as x:
        logging.error("Failed to get facebook user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user

def has_permission_to_publish(user):
    """
    do we have permission to publish to this user's wall?
    :param user:
    :return: True if we are allowed to publish on this user's wall
    """
    try:
        return 'publish_actions' in get_permissions(user)
    except:
        return False

def get_permissions(user):
    """https://developers.facebook.com/docs/graph-api/reference/user/permissions"""
    permissions = []
    if user.facebook_token_set is None or user.facebook_token_set.access_token is None:
        return permissions
    req_params = {'access_token': user.facebook_token_set.access_token}
    data = json.loads(requests.get(fb_api_url_permissions,params=req_params).content)['data']
    for item in data:
        if item['status'] == 'granted':
            permissions.append(item['permission'])
    return permissions

def publish_to_feed(user, message, link=None, link_name=None):
    """
    publish a message on the user's Facebook feed, as per https://developers.facebook.com/docs/graph-api/reference/v2.4/user/feed
    :param user: user for whom has_permission_to_publish() is known to be true
    :param message: message body
    :param link: link to add to message (None)
    :param link_name: text to label the link (None)
    :return: True if publish succeeded, False if it failed
    """
    # TODO: deal with visibility problem http://stackoverflow.com/a/28152591 (check visibility, if SELF or NO_FRIENDS, force re-auth?)
    try:
        graph = GraphAPI(user.facebook_token_set.access_token)
        if link:
            graph.put_wall_post(message=message, attachment={"name": link_name, "link": link})
        else:
            graph.put_wall_post(message=message)
        return True
    except Exception as x:
        logging.error("Unable to post to wall for {0}: {1}".format(user.uid, x))
        return False

