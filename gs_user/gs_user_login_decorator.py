""" Handles authentication for a webapp2 RequestHandler, fulfilling OAuth
flow and storing uid and token in cookies."""
__author__ = 'GiftStarter'

from functools import wraps
import gs_user_core
import base64
import yaml
import json
import urllib
from gs_user.gs_user_referral import UserReferral
import logging

config = yaml.load(open('config.yaml'))


def handle_login(method_handler):
    """ Handles authentication for a webapp2 RequestHandler, fulfilling OAuth
    flow and storing uid and token in cookies.
    """
    @wraps(method_handler)
    def wrapper(*args, **kwargs):
        self = args[0]
        query = {} if len(self.request.query_string) < 2 else \
            {urllib.unquote(pair).split('=')[0]: pair.split('=', 1)[-1]
             for pair in self.request.query_string.split('&')}
        state = json.loads(
            base64.b64decode(
                urllib.unquote(
                    query.get('state', 'e30='))))

        # TODO If im redirecting them, I shouldn't have path in state!!!
        login_service = state.get('login_service')
        referrer = UserReferral.from_dict(state.get('referrer', {}))
        staging_uuid = state.get('staging_uuid')
        is_sharing_login = state.get('is_sharing_login') == 1
        prior_uid = state.get('prior_uid')
        prior_token = state.get('prior_token')
        if prior_uid == -1 or not gs_user_core.validate(prior_uid, prior_token):
            prior_uid = None
            prior_token = None
        # else:
        #     prior_login_service = gs_user_core.get_social_service(prior_uid)
        if state.get('app_url'):
            redirect_url = state.get('app_url')
        else:
            redirect_url = ''

        try:
            if is_sharing_login:
                if prior_uid:
                    if login_service == 'twitter':
                        # twitter requires a separate set of access tokens (or a separate App) to allow read-access sometimes, read-write other times
                        gs_user_core.add_twitter_sharing_tokens(prior_uid,query['oauth_token'], query['oauth_verifier'])
                    if login_service == 'facebook':
                        gs_user_core.add_facebook_login_tokens(prior_uid,query['code'], redirect_url)
                    #resume prior login
                    self.request.cookies['uid'] = prior_uid
                    self.request.cookies['token'] = prior_token
                else:
                    logging.error("Received a sharing login, but no valid prior_uid to attach: {0} {1}".format(self.request,state))
            else:
                if login_service == 'facebook':
                    # Handle FB login
                    user = gs_user_core.login_facebook_user(query['code'], redirect_url, referrer)
                    self.request.cookies['uid'] = user.uid
                    self.request.cookies['token'] = user.facebook_token_set.access_token
                    if staging_uuid:
                        self.request.query_string += '&staging_uuid=' + staging_uuid
                elif login_service == 'googleplus':
                    # Handle googleplus login
                    user = gs_user_core.login_googleplus_user(query['code'], redirect_url, referrer)
                    self.request.cookies['uid'] = user.uid
                    self.request.cookies['token'] = user.googleplus_token_set.access_token
                    if staging_uuid:
                        self.request.query_string += '&staging_uuid=' + staging_uuid
                elif login_service == 'linkedin':
                    # Handle linkedin login
                    user = gs_user_core.login_linkedin_user(query['code'], redirect_url, referrer)
                    self.request.cookies['uid'] = user.uid
                    self.request.cookies['token'] = user.linkedin_token_set.access_token
                    if staging_uuid:
                        self.request.query_string += '&staging_uuid=' + staging_uuid
                elif query.get('oauth_token'):
                    # Handle twitter login
                    user = gs_user_core.login_twitter_user(query['oauth_token'], query['oauth_verifier'], referrer)
                    self.request.cookies['uid'] = user.uid
                    self.request.cookies['token'] = user.twitter_token_set.access_token
                    if staging_uuid:
                        self.request.query_string += '&staging_uuid=' + staging_uuid
        except Exception as x:
            logging.error("Unable to authenticate user (likely they cancelled login): {0} ; {1}".format(x, self.request))

        return method_handler(*args, **kwargs)
    return wrapper
