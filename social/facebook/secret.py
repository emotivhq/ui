__author__ = 'stuart'

import yaml

APP_ID = yaml.load(open('secret.yaml'))['facebook_auth']['app_id']
APP_SECRET = yaml.load(open('secret.yaml'))['facebook_auth']['app_secret']