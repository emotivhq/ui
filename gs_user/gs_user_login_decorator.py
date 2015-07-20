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
from gs_user.User import User
from social import twitter, facebook, googleplus, linkedin

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
        prior_user = User.get_by_id(prior_uid) if prior_uid != -1 and gs_user_core.validate(prior_uid, prior_token) else None
        #     prior_login_service = gs_user_core.get_social_service(prior_uid)
        if state.get('app_url'):
            redirect_url = state.get('app_url')
        else:
            redirect_url = ''

        try:
            if is_sharing_login:
                if prior_user:
                    #resume prior login
                    # self.request.cookies['uid'] = prior_uid
                    # self.request.cookies['token'] = prior_token
                    # callback_uid = ''
                    # callback_token = ''
                    # tokens might change, so send them back to the caller for refresh
                    # if login_service == gs_user_core.get_social_service(prior_uid):
                    #     callback_uid = prior_uid
                    #     callback_token = new_token
                    #     # handlePopupClosed("'+callback_uid+'","'+callback_token+'")
                    closejs = '<script>function closeme(){top.opener.handlePopupClosed();window.close();}</script>'
                    try:
                        if login_service == 'twitter':
                            if not twitter.twitter_core.has_permission_to_publish(prior_user):
                                # twitter requires a separate set of access tokens (or a separate App) to allow read-access sometimes, read-write other times
                                gs_user_core.add_twitter_sharing_tokens(prior_user.uid, query['oauth_token'], query['oauth_verifier'])
                        if login_service == 'facebook':
                            if not facebook.facebook_core.has_permission_to_publish(prior_user):
                                gs_user_core.add_facebook_sharing_tokens(prior_user.uid, query['code'], redirect_url)
                        if login_service == 'linkedin':
                            if not linkedin.linkedin_core.has_permission_to_publish(prior_user):
                                gs_user_core.add_linkedin_sharing_tokens(prior_user.uid, query['code'], redirect_url)
                        # if login_service == 'googleplus':
                        #     if not googleplus.googleplus_core.has_permission_to_publish(prior_user):
                        #         gs_user_core.add_googleplus_sharing_tokens(prior_user.uid, query['code'], redirect_url)
                    except Exception as x:
                        logging.error("Unable to authenticate user for sharing: {0} {1}".format(self.request,state))
                        self.response.write(closejs+'An error has occurred.  Please <a onclick="closeme()" href="#">close</a> this window and try again.')
                        return
                    self.response.write(closejs+'<script>closeme()</script>You are now able to post on {0}.  Please <a onclick="closeme()" href="#">close</a> this window and continue.'.format(login_service))
                    return
                else:
                    logging.error("Received a sharing login, but no valid prior_user {0} to attach: {1} {2}".format(prior_uid,self.request,state))
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
