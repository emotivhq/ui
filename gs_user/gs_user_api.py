__author__ = 'stuart'

import webapp2
from social import twitter, googleplus, facebook
import json
from gs_user_core import update_or_create, get_user
from gs_user_stats import get_stats
from UserLogin import UserLogin
from render_app import render_app


class StatsHandler(webapp2.RequestHandler):
    def get(self):
        """
        Gets stats for all passed in users.
        """
        uids = self.request.get('uid')
        if len(uids) > 0:
            self.response.write(json.dumps(get_stats(uids)))
        else:
            self.response.set_status(400, "Expected list of UIDs")


class UserPageHandler(webapp2.RequestHandler):
    def get(self):
        """ A request for data about a specific user
        """
        self.response.write(render_app(self.request))


class UserHandler(webapp2.RequestHandler):
    def get(self):
        uid = self.request.path.split('/')[-1]
        if uid[0] not in ['f', 'g', 't']:
            self.response.set_status(400, "Invalid user id")
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
            else:
                self.response.write(user.jsonify())

    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'is-logged-in':
            if data['service'] == 'twitter':
                self.response.write(twitter.is_logged_in(data['uid']))

        elif data['action'] == 'get-auth-url':
            if data['service'] == 'twitter':
                self.response.write(twitter.get_auth_url(data['redirect_url']))

        elif data['action'] == 'submit-verifier':
            if data['service'] == 'twitter':
                referrer = data.get('referrer', {})
                token_set = twitter.submit_verifier(data['oauth_token'], data['verifier'])
                user = update_or_create('twitter', token_set, referrer)
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.twitter_token_set.access_token,
                                                    'name': user.name}))

        elif data['action'] == 'submit-one-time-code':
            if data['service'] == 'googleplus':
                referrer = data.get('referrer', {})
                token_set = googleplus.submit_code(data['auth_response'], data['redirect_url'])
                user = update_or_create('googleplus', token_set, referrer)
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.googleplus_token_set.access_token,
                                                    'name': user.name}))

        elif data['action'] == 'get-long-term-token':
            if data['service'] == 'facebook':
                referrer = data.get('referrer', {})
                token_set = facebook.get_extended_key(data['auth_token'])
                user = update_or_create('facebook', token_set, referrer)

                user.facebook_token_set = token_set
                user.put()
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({'status': 'logged-in', 'uid': user.uid,
                                                    'usr_img': user.cached_profile_image_url,
                                                    'on_mailing_list': user.subscribed_to_mailing_list,
                                                    'token': user.facebook_token_set.access_token,
                                                    'name': user.name}))

        elif data['action'] == 'team-email-authorize':
            token_set = googleplus.submit_code(data['auth_response'])
            user = update_or_create('googleplus', token_set)
            user.put()

        else:
            print(data)
            self.response.status_int = 400


api = webapp2.WSGIApplication([('/user.*', UserHandler)], debug=True)
stats = webapp2.WSGIApplication([('/userstats', StatsHandler)], debug=True)
user_page = webapp2.WSGIApplication([('/u', UserPageHandler)], debug=True)
