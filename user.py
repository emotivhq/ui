__author__ = 'stuart'

import webapp2
import yaml
import json
import urllib2
from google.appengine.ext import ndb
import facebook
import cloudstorage
from google.appengine.api import app_identity
from datetime import datetime, timedelta


FB_APP_ID = yaml.load(open('secret.yaml'))['fb_auth']['app_id']
FB_APP_SECRET = yaml.load(open('secret.yaml'))['fb_auth']['app_secret']

# TODO: make user class scaffolding
# class User(ndb.model):
#     email = ndb.StringProperty()
#     facebook_id = ndb.IntegerProperty()


class AuthHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['type'] == 'facebook':
            if data['action'] == 'get-long-term-token':
                response = urllib2.urlopen("https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token"
                                           "&client_id=" + FB_APP_ID +
                                           "&client_secret=" + FB_APP_SECRET +
                                           "&fb_exchange_token=" + data['token'])
                response_str = response.read()
                result = {}
                for pair in response_str.split('&'):
                    k, v = pair.split('=')
                    result[k] = v

                store_extended_key(data['uid'], data['token'], result['access_token'], result['expires'])
                save_picture_to_gcs(data['uid'], result['access_token'])
                self.response.write(json.dumps({'access_token': result['access_token'], 'expires': result['expires']}))


def store_extended_key(uid, token, lt_token, expires_in):
    user = User.query(User.uid == uid).fetch()
    # If user does not exist yet, create
    user = user[0] if len(user) > 0 else User()
    user.uid = uid
    user.access_token = token
    user.lt_access_token = lt_token
    user.lt_token_expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
    user.put()


class User(ndb.Model):
    uid = ndb.StringProperty(required=True)
    access_token = ndb.StringProperty(required=True)
    lt_access_token = ndb.StringProperty()
    lt_token_expires = ndb.DateTimeProperty()
    cached_profile_image_url = ndb.StringProperty()


def save_picture_to_gcs(uid, access_token):
    # Get user facebook access info
    # user = User.query(User.uid == uid).fetch(1)[0]
    # token = user.lt_access_token if user.lt_access_token else user.access_token

    # Fetch facebook image
    graph = facebook.GraphAPI(access_token)
    img = graph.get_object('me/picture', type='square', height=200, width=200, redirect=1)#, 'picture?type=square&height=200&width=200&redirect=1')

    # Open cloud storage file for writing
    cs_file = cloudstorage.open('/giftstarter-pictures/u/' + str(uid) + '.jpg', 'w')
    cs_file.write(img['data'])
    cs_file.close()

auth = webapp2.WSGIApplication([('/auth', AuthHandler)], debug=True)