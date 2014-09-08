__author__ = 'stuart'

# Change execution path to project root
import os
if 'test_gs_user.py' in __file__.split('/')[-1]:
    os.chdir('..')


import unittest
from google.appengine.ext import testbed
import webapp2
import json
from giftstart import giftstart_api
import stripe
from datetime import datetime, timedelta
from pay import pay_api as pay_api
from gs_user import User
from social.facebook import FacebookTokenSet

# UUT
from gs_user import gs_user_api


example_giftstart = {
    'gift_champion_uid': 'f1234',
    'title': 'test title what up',
    'description': 'for every title there must be an equal and possibly related description.',
    'special_notes': 'make it a race car',
    'product': {
        'product_url': 'http://yo.momma.com',
        'img_url': 'http://yo.momma.com/assets/venus.png',
        'price': 12300,
        'title': '$1.23 venus!',
        'retailer_logo': 'http://yo.momma.com/logo.png',
        'sales_tax': 11,
        'shipping': 23,
        'service_fee': 9,
        'total_price': 12343,
        },
    'columns': 3,
    'rows': 3,
    'gc_name': 'Flombar Omaeliad',
    'gc_phone_number': '1231231234',
    'gc_email': 'test@giftstarter.co',
    'shipping_name': 'Count Fluffshire',
    'shipping_address': '123 candy palace lane',
    'shipping_city': 'seattle',
    'shipping_state': 'wa',
    'shipping_zip': '98109',
    'shipping_phone_number': '1231231234',
}


class UserStatsTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_urlfetch_stub()

        # Insert user
        user = User()
        user.uid = 'f1234'
        user.name = 'flomae'
        user.cached_profile_image_url = 'lol not a url'
        user.logged_in_with = 'facebook'
        user.facebook_token_set = FacebookTokenSet(access_token='x1234', expires=datetime.now() + timedelta(days=90))
        user.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_get_number_of_giftstarts(self):
        test_gs = example_giftstart

        # Create 2 giftstarts
        giftstarts_created = 2
        for i in range(giftstarts_created):
            test_gs['title'] += str(i)
            request = webapp2.Request.blank('/giftstart/api')
            request.method = 'PUT'
            request.body = json.dumps({
                'action': 'create',
                'uid': test_gs['gift_champion_uid'],
                'token': 'x1234',
                'giftstart': test_gs,
            })

            response = request.get_response(giftstart_api.api)
            self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                             str(response.status_code))

        request = webapp2.Request.blank('/userstats')
        request.method = 'GET'
        request.query_string = 'uid=' + test_gs['gift_champion_uid']
        response = request.get_response(gs_user_api.stats)
        self.assertEqual(200, response.status_code, "Should successfully fetch user stats, expected code 200, "
                                                    "response was " + str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that this user has created the right number of giftstarts
        self.assertEqual(giftstarts_created, len(json_response.get(test_gs['gift_champion_uid']).get('giftstarts')),
                         "Should report the right number of giftstarts created, expected " + str(giftstarts_created) +
                         ", reported was " + str(len(json_response.get(test_gs['gift_champion_uid']).get('giftstarts'))))
        self.assertIn('name',
                      json_response[test_gs['gift_champion_uid']].keys(),
                      "Response should contain user's name")
        self.assertIn('img_url',
                      json_response[test_gs['gift_champion_uid']].keys(),
                      "Response should contain user's img url")

    def test_get_number_of_pitchins(self):
        test_gs = example_giftstart

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': test_gs['gift_champion_uid'],
            'token': 'x1234',
            'giftstart': test_gs,
        })

        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))


        num_pitchins = 3
        self.fake_payment('1', 'f1234', [1, 2])
        self.fake_payment('1', 'f1234', [3, 4, 5])
        self.fake_payment('1', 'f1234', [7])

        request = webapp2.Request.blank('/userstats')
        request.method = 'GET'
        request.query_string = 'uid=' + test_gs['gift_champion_uid']
        response = request.get_response(gs_user_api.stats)
        self.assertEqual(200, response.status_code, "Should successfully fetch user stats, expected code 200, "
                                                    "response was " + str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that it reports the right number of pitchins
        self.assertEqual(num_pitchins, len(json_response.get(test_gs['gift_champion_uid']).get('pitchins')),
                         "Should report the right number of giftstarts created, expected " + str(num_pitchins) +
                         ", reported was " + str(len(json_response.get(test_gs['gift_champion_uid']).get('pitchins'))))

    def fake_payment(self, gsid, uid, parts):
        # Create test token
        token = stripe.Token.create(card={
            'number': '4242424242424242',
            'exp_month': str(datetime.today().month),
            'exp_year': str(datetime.today().year + 1),
            'cvc': '123',
            'address_zip': '12345',
            })

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': uid, 'payment': {
                'stripeResponse': token.to_dict(), 'gsid': gsid, 'parts': parts,
                'emailAddress': 'test@giftstarter.co', 'note': 'Test note for my besty!', 'subscribe': False
            }
        })
        request.get_response(pay_api.api)