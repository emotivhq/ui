"""provide redirection URLs and verification for Twitter login service"""
__author__ = 'GiftStarter'

import json

import requests

from linkedin_core import LinkedinTokenSet
import yaml


config = yaml.load(open('config.yaml'))
secret = yaml.load(open('secret.yaml'))

CLIENT_ID = secret['linkedin_auth']['client_id']
CLIENT_SECRET = secret['linkedin_auth']['client_secret']


def submit_code(code, redirect_url):
    """
    exchange a linkedin code for a login token, as per https://developer.linkedin.com/docs/oauth2
    @param code: auth code provided by https://www.linkedin.com/uas/oauth2/authorization
    @param redirect_url: may need to be registered in https://www.linkedin.com/developer/apps
    @rtype: LinkedinTokenSet
    """
    url = 'https://www.linkedin.com/uas/oauth2/accessToken'
    redirect_url = redirect_url.rstrip('/') #no trailing slashes for linkedin
    params = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_url,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }
    response = requests.post(url=url, params=params)
    result_dict = json.loads(response.content)
    return LinkedinTokenSet().populate(result_dict['access_token'],result_dict['expires_in'])

