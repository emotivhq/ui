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
import giftstart_api

example_giftstart = {
    'gift_champion_uid': 'f1234',
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

        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 403, "Should reject due to invalid user details, expected 403, response "
                                                    "was " + str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Shouldn't have created a campaign, expected 404, response was " +
                         str(response.status_code))

    def test_create_with_valid_user(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': example_giftstart,
        })

        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should have created a campaign, expected 200, response was " +
                         str(response.status_code))

    def test_create_same_campaign_twice(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': example_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))

        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should have created first campaign, expected 200, response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=2'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Shouldn't have created a second campaign, expected 404, response "
                                                    "was " + str(response.status_code))

    def test_get_nonexistent_campaign(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=12341234123'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Campaign should not exist, expected 404, response was " +
                         str(response.status_code))

    def test_update_campaign(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': example_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))

        new_giftstart = {'gsid': '1'}
        new_giftstart['title'] = 'new title whatup'
        new_giftstart['description'] = 'new description yeyah'
        new_giftstart['gift_champion_uid'] = 'f1234'
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'update',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': new_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept campaign updates, expected 200, response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Campaign should still exist, expected 200, response was " +
                         str(response.status_code))
        response_giftstart = json.loads(response.body)['giftstart']
        self.assertEqual(new_giftstart['gsid'], response_giftstart['gsid'], "gsid should be {gsid1}, was {gsid2}"
                         .format(gsid1=new_giftstart['gsid'], gsid2=response_giftstart['gsid']))
        self.assertEqual(new_giftstart['title'], response_giftstart['title'], "title should be {title1}, was {title2}"
                         .format(title1=new_giftstart['title'], title2=response_giftstart['title']))
        self.assertEqual(new_giftstart['description'], response_giftstart['description'],
                         "title should be {description1}, was {description2}"
                         .format(description1=new_giftstart['description'],
                                 description2=response_giftstart['description']))

    def test_update_campaign_disallow(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'create',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': example_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created campaign, expected 200, response was " +
                         str(response.status_code))

        new_giftstart = {'gsid': '1'}
        new_giftstart['title'] = 'new title whatup'
        new_giftstart['description'] = 'new description yeyah'
        new_giftstart['gift_champion_uid'] = 'f1234'
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'update',
            'uid': 'f1234',
            'token': 'x1235',
            'giftstart': new_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 403, "Should reject campaign updates, expected 403, response was " +
                         str(response.status_code))

