__author__ = 'stuart'

import requests
import config
import json
from googleplus_core import GooglePlusTokenSet

REDIRECT_URI = config.APP_URL + '/oauth-callback/googleplus?appstate='


def submit_code(auth_response, current_url):
    base_url = 'https://accounts.google.com/o/oauth2/token'
    params = {
        'code': auth_response['code'],
        'client_id': config.CLIENT_ID,
        'client_secret': config.CLIENT_SECRET,
        'redirect_uri': current_url,
        'grant_type': 'authorization_code'
    }
    str_params = '&'.join(['='.join(pair) for pair in params.items()])
    response = requests.post(base_url, data=str_params)
    print(response.content)
    token = json.loads(response.content)
    refresh_token = None if 'refresh_token' not in token else token['refresh_token']
    return GooglePlusTokenSet().populate(token['access_token'], refresh_token, token['expires_in'], token['token_type'])