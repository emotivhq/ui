__author__ = 'stuart'

from requests_oauthlib import OAuth2Session, OAuth2
import requests
import secret
import json
from core import GooglePlusTokenSet

REDIRECT_URI = 'postmessage' #'https://6-dot-gift-starter.appspot.com/oauth-callback/googleplus'


def submit_code(auth_response):
    base_url = 'https://accounts.google.com/o/oauth2/token'
    params = {
        'code': auth_response['code'],
        'client_id': secret.CLIENT_ID,
        'client_secret': secret.CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
        'grant_type': 'authorization_code'
    }
    str_params = '&'.join(['='.join(pair) for pair in params.items()])
    response = requests.post(base_url, data=str_params)
    token = json.loads(response.content)
    refresh_token = None if 'refresh_token' not in token else token['refresh_token']
    return GooglePlusTokenSet().populate(token['access_token'], refresh_token, token['expires_in'], token['token_type'])