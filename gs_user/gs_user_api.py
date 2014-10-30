__author__ = 'stuart'

import webapp2
from social import twitter, googleplus, facebook
import json
from gs_user_core import update_or_create, get_user, subscribe_to_mailing_list
from gs_user_stats import get_stats
from UserLogin import UserLogin
from render_app import render_app
import re
from gs_user.gs_user_referral import UserReferral


class StatsHandler(webapp2.RequestHandler):
    def get(self):
        """
        Gets stats for passed in user.
        """
        uid = self.request.path[7:-5]
        self.response.write(json.dumps(get_stats(uid)))


class UserPageHandler(webapp2.RequestHandler):
    def get(self):
        """ A request for data about a specific user
        """
        self.response.write(render_app(self.request))


class SubscribeHandler(webapp2.RequestHandler):
    def put(self):
        data = json.loads(self.request.body)
        email = data.get('email')
        double_opt_in = data.get('double_opt_in')
        if email is None:
            self.response.set_status(400, 'Expected email address')
        elif double_opt_in is None:
            self.response.set_status(400, 'Expected double_opt_in')
        elif (not isinstance(email, str)) and \
                (not isinstance(email, type(u''))):
            self.response.set_status(400, 'Expected email to be string')
        elif not isinstance(double_opt_in, bool):
            self.response.set_status(400, 'Expected double_opt_in to be bool')
        elif not bool(re.search('', email)):
            self.response.set_status(400, 'Email not valid')
        else:
            subscribe_to_mailing_list(email, double_opt_in)


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
                referrer = UserReferral.from_dict(data.get('referrer', {}))
                token_set = twitter.submit_verifier(data['oauth_token'], data['verifier'])
                user = update_or_create('twitter', token_set, referrer)
                print(user)
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({
                        'status': 'logged-in', 'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.twitter_token_set.access_token,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }))

        elif data['action'] == 'get-long-term-token':
            if data['service'] == 'facebook':
                referrer = UserReferral.from_dict(data.get('referrer', {}))
                token_set = facebook.get_extended_key(data['auth_token'])
                user = update_or_create('facebook', token_set, referrer)

                user.facebook_token_set = token_set
                user.put()
                if user is not None:
                    UserLogin.register_login(user.uid, data['location'])
                    self.response.write(json.dumps({
                        'status': 'logged-in', 'uid': user.uid,
                        'usr_img': user.cached_profile_image_url,
                        'on_mailing_list': user.subscribed_to_mailing_list,
                        'token': user.facebook_token_set.access_token,
                        'name': user.name,
                        'has_pitched_in': user.has_pitched_in,
                    }))

        else:
            print(data)
            self.response.status_int = 400


handler = webapp2.WSGIApplication([('/users/subscribe.json', SubscribeHandler),
                                   ('/users/.*', UserPageHandler),], debug=True)
api = webapp2.WSGIApplication([('/users.*', UserHandler)], debug=True)
stats = webapp2.WSGIApplication([('/users/.*.json', StatsHandler)], debug=True)
user_page = webapp2.WSGIApplication([('/u', UserPageHandler)], debug=True)
