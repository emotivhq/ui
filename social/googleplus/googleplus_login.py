__author__ = 'GiftStarter'

import requests
import yaml
import json
from googleplus_core import GooglePlusTokenSet
import logging


config = yaml.load(open('config.yaml'))
secret = yaml.load(open('secret.yaml'))

REDIRECT_URI = config['app_url'] + '/oauth-callback/googleplus?appstate='


def submit_code(code, redirect_url):
    base_url = 'https://accounts.google.com/o/oauth2/token'
    params = {
        'code': code,
        'client_id': secret['googleplus_auth']['client_id'],
        'client_secret': secret['googleplus_auth']['client_secret'],
        'redirect_uri': redirect_url,
        'grant_type': 'authorization_code'
    }
    str_params = '&'.join(['='.join(pair) for pair in params.items()])
    response = requests.post(base_url, data=str_params)
    logging.info("Logging in with googleplus - {0}".format(response))
    if response.status_code != 200:
        logging.warning(response.content)
    token = json.loads(response.content)
    refresh_token = None if 'refresh_token' not in token \
        else token['refresh_token']

    return GooglePlusTokenSet().populate(token['access_token'], refresh_token,
                                         token['expires_in'],
                                         token['token_type'])