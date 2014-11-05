import stripe

__author__ = 'stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')


import unittest
from mock import MagicMock
from google.appengine.ext import testbed
import webapp2
import json
from giftstart import giftstart_api
from datetime import datetime, timedelta
from pay import pay_api as pay_api
from gs_user import User
from social.facebook import FacebookTokenSet
from social.twitter import TwitterTokenSet
import requests
from social import OAuthTokenPair
from google.appengine.ext import ndb
from time import time
from giftstart import giftstart_core, giftstart_create
from pay import pay_core
import base64

# UUT
from gs_user import gs_user_api

# Mock stripe
pay_core.stripe = MagicMock()

# Mock request to email
pay_core.requests.put = MagicMock()
giftstart_create.giftstart_comm.send_create_notification = MagicMock()

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
    'columns': 3,
    'rows': 3,
    'shipping_state': 'WA',
    'shipping_zip': '98109',
    'gc_email': 'test@giftstarter.co',
}

jpeg_file = open('client/assets/stuart_square_s.jpg')
JPEG_DATA = "data:image/jpg;base64," + base64.b64encode(jpeg_file.read())
png_file = open('client/assets/share_google.png')
PNG_DATA = "data:image/png;base64," + base64.b64encode(png_file.read())


class UserStatsTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_urlfetch_stub()
        self.testbed.init_app_identity_stub()
        self.testbed.init_blobstore_stub()

        # Insert user
        user = User(key=ndb.Key('User', 'f1234'))
        user.uid = 'f1234'
        user.name = 'flomae'
        user.cached_profile_image_url = 'lol not a url'
        user.logged_in_with = 'facebook'
        user.facebook_token_set = FacebookTokenSet(access_token='x1234',
                                                   expires=datetime.now() +
                                                           timedelta(days=90))
        user.put()

        user = User(key=ndb.Key('User', 't123'))
        user.uid = 't123'
        user.name = 'tristan'
        user.cached_profile_image_url = 'lol not a url'
        user.logged_in_with = 'twitter'
        user.twitter_token_set = TwitterTokenSet(access_token='x1234',
                                                 access_secret='s1234')
        user.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_get_number_of_giftstarts(self):
        test_gs = example_giftstart

        # Create 2 giftstarts
        giftstarts_created = 2
        for i in range(giftstarts_created):
            test_gs['title'] += str(i)
            request = webapp2.Request.blank('/giftstart/create.json')
            request.method = 'POST'
            request.cookies['uid'] = 'f1234'
            request.cookies['token'] = 'x1234'
            request.body = json.dumps(test_gs)

            response = request.get_response(giftstart_api.handler)
            self.assertEqual(response.status_code, 200,
                             "Should accept created campaign, expected 200, "
                             "response was " + str(response.status_code))

        request = webapp2.Request.blank('/users/f1234.json')
        request.method = 'GET'
        response = request.get_response(gs_user_api.stats)
        self.assertEqual(200, response.status_code,
                         "Should successfully fetch user stats, expected code "
                         "200, response was " + str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that this user has created the right number of giftstarts
        self.assertEqual(giftstarts_created,
                         len(json_response
                             .get('f1234')
                             .get('giftstarts')),
                         "Should report the right number of giftstarts created"
                         ", expected " + str(giftstarts_created) +
                         ", reported was " +
                         str(len(json_response
                                 .get('f1234')
                                 .get('giftstarts'))))
        self.assertIn('name', json_response['f1234'].keys(),
                      "Response should contain user's name")
        self.assertIn('img_url', json_response['f1234'].keys(),
                      "Response should contain user's img url")

    def test_get_number_of_pitchins(self):
        test_gs = example_giftstart

        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f1234'
        request.cookies['token'] = 'x1234'
        request.body = json.dumps(test_gs)

        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))

        num_pitchins = 3
        self.fake_payment('1', 'f1234', [1, 2])
        self.fake_payment('1', 'f1234', [3, 4, 5])
        self.fake_payment('1', 'f1234', [7])

        request = webapp2.Request.blank('/users/f1234.json')
        request.method = 'GET'
        response = request.get_response(gs_user_api.stats)
        self.assertEqual(200, response.status_code,
                         "Should successfully fetch user stats, expected code"
                         " 200, response was " + str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that it reports the right number of pitchins
        self.assertEqual(num_pitchins,
                         len(json_response.get('f1234')
                             .get('pitchins')),
                         "Should report the right number of giftstarts "
                         "created, expected " + str(num_pitchins) +
                         ", reported was " +
                         str(len(json_response.get('f1234').get('pitchins'))))

    def test_has_ever_pitched_in(self):
        """ Tests to make sure that the system properly tracks if users have
         ever pitched in before.
        """
        # Create giftstart
        test_gs = example_giftstart

        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f1234'
        request.cookies['token'] = 'x1234'
        request.body = json.dumps(test_gs)

        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))

        # Put in oauth pair to prepare for login
        oauth_pair = OAuthTokenPair(oauth_token='token', oauth_secret='secret')
        oauth_pair.put()

        # Set up mock for login
        class ResponseMock:
            def __init__(self, content):
                self.content = content
        response = ResponseMock('oauth_token=token&oauth_token_secret=secret')
        requests.post = MagicMock(return_value=response)
        requests.get = MagicMock(return_value=ResponseMock(
            json.dumps({'id': 't1', 'profile_image_url': 'http://c',
                        'name': 'bob'})))

        request = webapp2.Request.blank('/users')
        request.body = json.dumps({'action': 'submit-verifier',
                                   'service': 'twitter',
                                   'oauth_token': 'token',
                                   'verifier': 'verifier',
                                   'location': '/'})
        request.method = 'POST'
        response = request.get_response(gs_user_api.api)
        self.assertEqual(200, response.status_code,
                         "Should submit verifier successfully, expected 200, "
                         "got " + str(response.status_code))
        self.assertEqual(False, json.loads(response.body)['has_pitched_in'])

        self.fake_payment('1', 't1', [1, 2])

        response = request.get_response(gs_user_api.api)
        self.assertEqual(True, json.loads(response.body)['has_pitched_in'])

    def fake_payment(self, gsid, uid, parts):
        pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                            str(time())}
        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid, 'parts': parts,
                'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })
        request.get_response(pay_api.api)

    def put_image(self, uid, data, extension, tok=None):
        """ Puts image and returns handler response
        :type uid: string
        :type data: string
        :rtype: webapp2.Response
        """
        request = webapp2.Request.blank('/users/{0}/img/new.json'.format(uid))
        request.method = 'PUT'
        request.headers['Content-Type'] = 'image/' + extension
        request.cookies['uid'] = uid
        request.cookies['token'] = str(tok)
        request.body = json.dumps({'data': data})
        return request.get_response(gs_user_api.handler)

    def test_image_upload(self):
        """ Should be able to upload a valid image """
        resp = self.put_image('f1234', JPEG_DATA, 'jpg', 'x1234')
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 response, response was {0}"
                         .format(str(resp)))

    def test_image_upload_nocreds(self):
        """ Shouldn't be able to upload an image without credentials """
        resp = self.put_image('f1234', JPEG_DATA, 'jpg')
        self.assertEqual(403, resp.status_code,
                         "Should get a 403 response, response was {0}"
                         .format(str(resp)))

    def test_image_content_type(self):
        """ Should require content-type header, and only accept the right ones
        """
        resp = self.put_image('f1234', JPEG_DATA, 'jpg', 'x1234')
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 response, response was {0}"
                         .format(str(resp)))

        resp = self.put_image('f1234', PNG_DATA, 'png', 'x1234')
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 response, response was {0}"
                         .format(str(resp)))

        resp = self.put_image('f1234', JPEG_DATA, 'xml', 'x1234')
        self.assertEqual(400, resp.status_code,
                         "Should get a 400 response, response was {0}"
                         .format(str(resp)))

        resp = self.put_image('f1234', JPEG_DATA, 'gif', 'x1234')
        self.assertEqual(400, resp.status_code,
                         "Should get a 400 response, response was {0}"
                         .format(str(resp)))

    def test_invalid_image_data(self):
        """ Should send error when image data is invalid
        """
        resp = self.put_image('f1234', "data:image/jpg;base64," +
                              base64.b64encode("abcdefg"), 'jpg', 'x1234')
        self.assertEqual(400, resp.status_code,
                         "Should get a 400 response, response was {0}"
                         .format(str(resp)))
