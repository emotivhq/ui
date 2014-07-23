__author__ = 'stuart'

import yaml

APP_KEY = yaml.load(open('secret.yaml'))['twitter_auth']['app_key']
APP_SECRET = yaml.load(open('secret.yaml'))['twitter_auth']['app_secret']

APP_URL = yaml.load(open('config.yaml'))['app_url']
