"""Token Set representing a Google Plus login, and routines to get user info"""
__author__ = 'GiftStarter'

import json
from datetime import datetime, timedelta
from google.appengine.ext import ndb
from requests_oauthlib import OAuth2Session
import yaml
import logging
import requests
import uuid

secret = yaml.load(open('secret.yaml'))

CLIENT_ID = secret['linkedin_auth']['client_id']
CLIENT_SECRET = secret['linkedin_auth']['client_secret']

PROFILE_QRY_URL = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,formatted-name,location,picture-url,picture-urls::(original),public-profile-url,email-address)?format=json'

SHARE_URL = "https://api.linkedin.com/v1/people/~/shares?format=json"


class LinkedinTokenSet(ndb.Model):
    """linkedIn token set: (access_token, expires)"""
    access_token = ndb.StringProperty()
    expires = ndb.DateTimeProperty()

    def populate(self, access_token, expires_in):
        self.access_token = access_token
        self.expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
        return self

    def to_token(self):
        return {
            'access_token': self.access_token,
            'expires_in': str(int((self.expires - datetime.now()).total_seconds()))
        }

def _request(url, token_set):
    """access provided googleplus URL with provided token; attempt to refresh token in the process"""
    oauth = OAuth2Session(CLIENT_ID,token=token_set.to_token())
    return oauth.get(url)

def get_uid(token_set):
    """get linkedin ID for user"""
    content = json.loads(_request(PROFILE_QRY_URL,token_set).content)
    return content['id']


def get_img_url(token_set):
    """get URL of avatar for user"""
    content = json.loads(_request(PROFILE_QRY_URL,token_set).content)
    try:
        return content['pictureUrls']['values'][0]
    except:
        return content['pictureUrl']


def update_user_info(user):
    """attempt to retrieve user info (name) from googleplus; update User"""
    try:
        social_json = json.loads(_request(PROFILE_QRY_URL,user.linkedin_token_set).content)
        if user.linkedin_id is None:
            user.linkedin_id = social_json['id']
        if user.name is None:
            try:
                user.name = social_json['formattedName']
            except:
                user.name = social_json['firstName']+' '+social_json['lastName']
        if user.location is None and 'location' in social_json:
            location = None
            country = None
            try:
                location = social_json['location']['name']
            except:
                pass
            try:
                country = social_json['location']['country']['code'].upper()
            except:
                pass
            if location is not None:
                user.location = location
            if country is not None:
                user.location = country if location is None else location+', '+country
        if user.link_linkedin is None and 'publicProfileUrl' in social_json:
            user.link_linkedin = social_json['publicProfileUrl']
        if user.email is None:
            try:
                user.email = social_json['emailAddress']
            except:
                logging.info("Unable to refresh email address via linkedin for {0}".format(user.uid))
    except Exception as x:
        logging.error("Failed to get google user info for {uid}: {err}."
                      .format(uid=user.uid,err=x))
    return user

def has_permission_to_publish(user):
    return True

def add_sharing_tokens(user, token_set):
    user.linkedin_token_set = token_set
    user.put()

def publish_comment(user, message, link=None, link_title=None):
    """
    publish a message via LinkedIn feed, as per https://developers.facebook.com/docs/graph-api/reference/v2.4/user/feed
    :param user: user for whom has_permission_to_publish() is known to be true
    :param message: message body
    :return: True if publish succeeded, False if it failed
    """
    try:
        if link is None:
            data = {
                "comment": message,
                "visibility": {"code": "anyone"}
            }
        else:
            #linkedin prevents repeated sharing of same link even if prior was deleted!
            link += '&' if '?' in link else '?'
            link += 'rand='+str(uuid.uuid4())
            content = {"title": link_title} if link_title is None else {"title": link_title, "submitted-url": link}
            data = {
                "comment": message,
                "content": content,
                "visibility": {"code": "anyone"}
            }
        response = requests.post(
            SHARE_URL+'&oauth2_access_token='+user.linkedin_token_set.access_token,
            data=json.dumps(data),
            headers={'content-type': 'application/json'}
        ).content
        if "errors" in response:
            return False
        return "updateKey" in response
    except Exception as x:
        logging.error("Unable to post to linkedin for {0}: {1}".format(user.uid, x))
        return False
