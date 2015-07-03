"""unit tests for login"""
__author__ = 'GiftStarter'

# Change execution path to project root
import os
#os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
import requests
from mock import MagicMock
import json
import main
from google.appengine.ext import testbed
import base64
import uuid
from giftstart import giftstart_api
from social import OAuthTokenPair

example_giftstart = {
    'title': 'Gonna put ' + base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw==') +
             ' in the title also',
    'description': 'I will just say this is in honor of ' +
                   base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw=='),
    'product_url': 'http://yo.momma.com',
    'product_img_url': 'http://yo.momma.com/assets/venus.png',
    'product_price': 12300,
    'product_title': '$1.23 venus!',
    'sales_tax': 11,
    'shipping': 23,
    'service_fee': 9,
    'total_price': 12343,
    'campaign_length': 10,
    'columns': 3,
    'rows': 3,
    'shipping_state': 'WA',
    'shipping_zip': '98109',
    'gc_email': 'test@giftstarter.com',
}

# MOCKS 4DAYZ
from storage import image_cache
image_cache.cache_user_image_from_url = MagicMock()
image_cache.cache_user_image_from_url.return_value = 'lolurl'

from gs_user import gs_user_core
gs_user_core.fetch_fb_image = MagicMock()
gs_user_core.fetch_fb_image.return_value = "lol an image url"
gs_user_core.uid_fns = {'facebook': lambda u: '1',
                        'twitter': lambda u: '1',
                        'googleplus': lambda u: '1'}
gs_user_core.update_user_info_fns = {'f': lambda u: '1',
                         't': lambda u: '1',
                         'g': lambda u: '1'}
gs_user_core.cache_profile_image_fns = {'facebook': lambda u, a: '1',
                          'twitter': lambda u, a: '1',
                          'googleplus': lambda u, a: '1'}


fake_referrer = {
    'type': 'partner',
    'channel': 'test_channel',
    'uuid': str(uuid.uuid4())
}


class LoginTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_login_facebook(self):
        # Create campaign
        this_uuid = str(uuid.uuid4())
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(dict(
            example_giftstart.items() +
            {'staging_uuid': this_uuid}.items()))
        response = request.get_response(giftstart_api.handler)
        url_title = json.loads(response.body)['giftstart_url_title']

        requests.get = MagicMock()
        requests.get.return_value = FbGetMock()
        app_state = base64.urlsafe_b64encode(json.dumps({
            "path": "/giftstart/create",
            "staging_uuid": this_uuid,
            "referrer": fake_referrer,
            "login_service": "facebook"
        }))

        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        login_kwargs = {'code': 'abcdefg',
                        'expires': 1234,
                        'state': app_state}
        request.query_string = 'code={code}' \
                               '&expires={expires}' \
                               '&state={state}'.format(**login_kwargs)
        response = request.get_response(main.app)
        self.assertEqual(1, requests.get.call_count,
                         "Should have GET'd details to facebook once, number "
                         "of calls was {0}".format(requests.get.call_count))

        self.assertEqual(302, response.status_code,
                         "Should have gotten 302 redirect, response was {0}"
                         .format(str(response)))
        self.assertIn(url_title, response.headers['Location'],
                      "Should have been redirected to {0}, was"
                      " redirected to {1}"
                      .format(url_title, response.headers['Location']))

    def test_login_twitter(self):
        otp = OAuthTokenPair()
        otp.oauth_secret = 'abcd'
        otp.oauth_token = '1234'
        otp.put()

        # Create campaign
        this_uuid = str(uuid.uuid4())
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(dict(
            example_giftstart.items() +
            {'staging_uuid': this_uuid}.items()))
        response = request.get_response(giftstart_api.handler)
        url_title = json.loads(response.body)['giftstart_url_title']

        requests.post = MagicMock()
        requests.post.return_value = TwPostMock()
        app_state = base64.urlsafe_b64encode(json.dumps({
            "path": "/giftstart/create",
            "staging_uuid": this_uuid,
            "referrer": fake_referrer,
            "login_service": "twitter"
        }))

        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        login_kwargs = {'oauth_token': '1234',
                        'oauth_verifier': 'abadfsdfgs',
                        'state': app_state}
        request.query_string = 'oauth_token={oauth_token}' \
                               '&oauth_verifier={oauth_verifier}' \
                               '&state={state}'.format(**login_kwargs)
        response = request.get_response(main.app)
        self.assertEqual(1, requests.post.call_count,
                         "Should have GET'd details to facebppl once, number "
                         "of calls was {0}".format(requests.post.call_count))

        self.assertEqual(302, response.status_code,
                         "Should have gotten 302 redirect, response was {0}"
                         .format(str(response)))
        self.assertIn(url_title, response.headers['Location'],
                      "Should have been redirected to {0}, was"
                      " redirected to {1}"
                      .format(url_title, response.headers['Location']))

    def test_login_googleplus(self):
        # Create campaign
        this_uuid = str(uuid.uuid4())
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(dict(
            example_giftstart.items() +
            {'staging_uuid': this_uuid}.items()))
        response = request.get_response(giftstart_api.handler)
        url_title = json.loads(response.body)['giftstart_url_title']

        requests.post = MagicMock()
        requests.post.return_value = GplusPostMock()
        requests.Session.get = MagicMock()
        requests.Session.get.return_value = GplusPostMock()
        app_state = base64.urlsafe_b64encode(json.dumps({
            "path": "/giftstart/create",
            "staging_uuid": this_uuid,
            "referrer": fake_referrer,
            "login_service": "googleplus"
        }))

        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        login_kwargs = {'code': 'abcdefg',
                        'state': app_state}
        request.query_string = 'code={code}&state={state}'\
            .format(**login_kwargs)
        response = request.get_response(main.app)
        self.assertEqual(1, requests.post.call_count,
                         "Should have POST'd details to google once")
        for param in ['code', 'client_id', 'client_secret', 'redirect_uri',
                      'grant_type']:
            self.assertIn(param, requests.post.call_args[1]['data'])

        self.assertEqual(302, response.status_code,
                         "Should have gotten 302 redirect, response was {0}"
                         .format(str(response)))
        self.assertIn(url_title, response.headers['Location'],
                      "Should have been redirected to {0}, was redirected to "
                      "{1}".format(url_title, response.headers['Location']))


class GplusPostMock:
    def __init__(self):
        self.status_code = 200
        self.body = json.dumps({
            "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
            "expires_in": 3920,
            "token_type": "Bearer"
        })
        self.content = json.dumps({
            "id": "abcd1234",
            "image": {"url": "img-url"},
            "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
            "expires_in": 3920,
            "token_type": "Bearer"
        })


class FbGetMock:
    def __init__(self):
        self.content = 'access_token=abcd1234&expires=12345'


class TwPostMock:
    def __init__(self):
        self.content = 'oauth_token=abcd1234&oauth_token_secret=nbmvnfj'
