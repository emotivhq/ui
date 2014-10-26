__author__ = 'stuart'

from facebook_core import FacebookTokenSet
import requests
import yaml

APP_ID = yaml.load(open('secret.yaml'))['facebook_auth']['app_id']
APP_SECRET = yaml.load(open('secret.yaml'))['facebook_auth']['app_secret']


def get_extended_key(code, redirect_url):

    response = requests.get("https://graph.facebook.com/oauth/access_token?"
                            "&client_id=" + APP_ID +
                            "&client_secret=" + APP_SECRET +
                            "&redirect_uri=" + redirect_url +
                            "&code=" + code)
    print(redirect_url)
    print(response.content)
    result_dict = {k: v for k, v in [pair.split('=')
                                     for pair in response.content.split('&')]}
    return FacebookTokenSet().populate(result_dict['access_token'],
                                       result_dict['expires'])

