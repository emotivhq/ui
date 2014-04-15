__author__ = 'stuart'

import webapp2
import yaml
import json
import urlparse
import urllib2

FB_APP_ID = yaml.load(open('secret.yaml'))['fb_auth']['app_id']
FB_APP_SECRET = yaml.load(open('secret.yaml'))['fb_auth']['app_secret']


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

                store_extended_key('fake user id', result['access_token'], result['expires'])
                self.response.write(json.dumps({'access_token': result['access_token'], 'expires': result['expires']}))


def store_extended_key(user_id, token, expires_in):
    print("Store token %s for user %s" % (token, user_id))


auth = webapp2.WSGIApplication([('/auth', AuthHandler)], debug=True)