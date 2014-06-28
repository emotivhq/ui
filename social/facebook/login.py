__author__ = 'stuart'

import secret
import requests
from core import FacebookTokenSet


def get_extended_key(auth_token):
    response = requests.get("https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token"
                            "&client_id=" + secret.APP_ID +
                            "&client_secret=" + secret.APP_SECRET +
                            "&fb_exchange_token=" + auth_token)
    result_dict = {k: v for k, v in [pair.split('=') for pair in response.content.split('&')]}
    return FacebookTokenSet().populate(result_dict['access_token'], result_dict['expires'])

# def logout():
