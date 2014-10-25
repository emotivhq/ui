__author__ = 'Stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
import requests
from mock import MagicMock
import json
import main
from google.appengine.ext import testbed


class LoginTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()


    def test_login_facebook(self):
        self.assertTrue(False)

    def test_login_twitter(self):
        self.assertTrue(False)

    def test_login_googleplus(self):
        requests.post = MagicMock()
        requests.post.return_value = PostMock('google post')
        requests.Session.get = MagicMock()
        requests.Session.get.return_value = PostMock('google get')

        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        login_kwargs = {'code': 'abcdefg',
                        'state': 'eyJwYXRoIjogIi9naWZ0c3RhcnQvdGVzdCJ9'}
        request.query_string = '?code={code}&state={state}'\
            .format(**login_kwargs)
        response = request.get_response(main.app)
        self.assertEqual(1, requests.post.call_count,
                         "Should have POST'd details to google once")
        for param in ['code', 'client_id', 'client_secret', 'redirect_uri',
                      'grant_type']:
            self.assertIn(param, requests.post.call_args[1]['data'])

        # The login creds should be in the cookies - uid, access_token
        self.assertIsNotNone(response.cookies.get('uid'))
        self.assertIsNotNone(response.cookies.get('access_token'))


class PostMock:

    def __init__(self, type):
        if type == 'google post':
            self.body = json.dumps({
                "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
                "expires_in": 3920,
                "token_type": "Bearer"
            })
        elif type == 'google get':
            self.content = '{"id":"abcd1234","image":{"url":"img-url"}}'
