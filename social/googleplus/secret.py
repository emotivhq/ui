__author__ = 'stuart'

import yaml

CLIENT_ID = yaml.load(open('secret.yaml'))['googleplus_auth']['client_id']
CLIENT_SECRET = yaml.load(open('secret.yaml'))['googleplus_auth']['client_secret']