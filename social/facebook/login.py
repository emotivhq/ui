"""exchange one-time code and redirect_uri for FaceBook access token"""

__author__ = 'GiftStarter'

from facebook_core import FacebookTokenSet
import requests
import yaml

APP_ID = yaml.load(open('secret.yaml'))['facebook_auth']['app_id']
APP_SECRET = yaml.load(open('secret.yaml'))['facebook_auth']['app_secret']


def get_extended_key(code, redirect_url):
    """
    exchange one-time code and redirect_uri for an access token
    as per https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/v2.2
    @param code: code obtained by prior call to https://www.facebook.com/dialog/oauth
    @param redirect_url: redirect_uri from prior call to https://www.facebook.com/dialog/oauth (must match)
    @rtype: FacebookTokenSet
    """
    """
    """

    response = requests.get("https://graph.facebook.com/oauth/access_token?"
                            "&client_id=" + APP_ID +
                            "&client_secret=" + APP_SECRET +
                            "&redirect_uri=" + redirect_url +
                            "&code=" + code)
    result_dict = {k: v for k, v in [pair.split('=')
                                     for pair in response.content.split('&')]}
    return FacebookTokenSet().populate(result_dict['access_token'],
                                       result_dict['expires'])

