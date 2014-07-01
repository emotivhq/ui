__author__ = 'stuart'

import webapp2
from social import twitter, googleplus, facebook
import json
from . import update_or_create


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
                token_set = twitter.submit_verifier(data['oauth_token'], data['verifier'])
                user = update_or_create('twitter', token_set)
                if user is not None:
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.twitter_token_set.access_token}))

        elif data['action'] == 'submit-one-time-code':
            if data['service'] == 'googleplus':
                token_set = googleplus.submit_code(data['auth_response'])
                user = update_or_create('googleplus', token_set)
                if user is not None:
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.googleplus_token_set.access_token}))

        elif data['action'] == 'get-long-term-token':
            if data['service'] == 'facebook':
                token_set = facebook.get_extended_key(data['auth_token'])
                user = update_or_create('facebook', token_set)

                user.facebook_token_set = token_set
                user.put()
                if user is not None:
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.facebook_token_set.access_token}))

        elif data['action'] == 'team-email-authorize':
            token_set = googleplus.submit_code(data['auth_response'])
            user = update_or_create('googleplus', token_set)
            user.put()

        else:
            print(data)
            self.response.status_int = 400


api = webapp2.WSGIApplication([('/user', UserHandler)], debug=True)
