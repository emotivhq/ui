__author__ = 'stuart'

# Change execution path to project root
import os
os.chdir('..')

import unittest
import webapp2
import json
from google.appengine.ext import testbed
from gs_user import User
from social.facebook import FacebookTokenSet
from datetime import datetime, timedelta

# UUT
import api

example_giftstart = {
    'gift_champion_uid': '12',
    'title': 'test title what up',
    'description': 'for every title there must be an equal and possibly related description.',
    'special_notes': 'make it a race car',
    'product': {
        'product_url': 'http://yo.momma.com',
        'img_url': 'http://yo.momma.com/assets/venus.png',
        'price': 123,
        'title': '$1.23 venus!',
        'retailer_logo': 'http://yo.momma.com/logo.png',
        'sales_tax': 11,
        'shipping': 23,
        'service_fee': 9,
        'total_price': 166,
    },
    'columns': 3,
    'rows': 3,
    'gc_name': 'Flombar Omaeliad',
    'gc_phone_number': '1231231234',
    'gc_email': 'flomae@notreal.com',
    'shipping_name': 'Count Fluffshire',
    'shipping_address': '123 candy palace lane',
    'shipping_city': 'seattle',
    'shipping_state': 'wa',
    'shipping_zip': '98109',
    'shipping_phone_number': '1231231234',
}


class GiftstartTestHandler(unittest.TestCase):

    def setUp(self):
        # Should be able to create a campaign
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()

        # Insert user
        user = User()
        user.uid = 'f1234'
        user.logged_in_with = 'facebook'
        user.facebook_token_set = FacebookTokenSet(access_token='x1234', expires=datetime.now() + timedelta(days=90))
        user.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_create_with_invalid_user(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f123',
            'token': 'x123',
            'giftstart': example_giftstart,
        })
        response = request.get_response(api.api)

        self.assertEqual(response.status_code, 403, 'Should reject due to invalid user details')

    def test_create_with_valid_user(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': example_giftstart,
        })
        response = request.get_response(api.api)

        self.assertEqual(response.status_code, 200, 'Should accept created campaign')
