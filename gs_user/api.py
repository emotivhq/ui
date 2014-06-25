__author__ = 'stuart'

import webapp2
from social import twitter
import json
from social.facebook.login import get_extended_key
from . import update_or_create, User
from datetime import datetime, timedelta


class UserHandler(webapp2.RequestHandler):
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-logged-in':
            if data['service'] == 'twitter':
                self.response.write(twitter.is_logged_in(data['uid']))

        elif data['action'] == 'get-auth-url':
            if data['service'] == 'twitter':
                self.response.write(twitter.get_auth_url())

        elif data['action'] == 'submit-verifier':
            if data['service'] == 'twitter':
                access_tokens = twitter.submit_verifier(data['oauth_token'], data['verifier'])
                user = update_or_create('twitter', access_tokens['access_token'], access_tokens['access_secret'])
                if user is not None:
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url}))

        elif data['action'] == 'get-long-term-token':
            if data['service'] == 'facebook':
                user = update_or_create('facebook', data['auth_token'])
                extended_keys = get_extended_key(data['auth_token'])

                expiry = datetime.now() + timedelta(int(extended_keys['expires']) / 86400, int(extended_keys['expires']) % 86400)
                user.facebook_lt_access_token = extended_keys['access_token']
                user.facebook_lt_token_expires = expiry
                user.put()
                if user is not None:
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url}))

        else:
            self.response.status_code(400)


api = webapp2.WSGIApplication([('/user', UserHandler)], debug=True)
