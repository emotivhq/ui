import stripe

__author__ = 'stuart'

# Change execution path to project root
import os
if 'test_gs_giftstart.py' in __file__.split('/')[-1]:
    os.chdir('..')

import unittest
import webapp2
import json
import yaml
from google.appengine.ext import testbed
from gs_user import User
from social.facebook import FacebookTokenSet
from datetime import datetime, timedelta
from time import time
import base64
from pay import pay_api, pay_core
from mock import MagicMock
import giftstart_core

secret = yaml.load(open('secret.yaml'))

# UUT
from giftstart import giftstart_api


# Mock stripe
pay_core.stripe = MagicMock()
pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                    str(time())}

# Mock request to email
pay_core.requests.put = MagicMock()
giftstart_core.giftstart_comm.send_create_notification = MagicMock()

example_giftstart = {
    'gift_champion_uid': 'f1234',
    'title': 'Gonna put ' + base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw==') +
             ' in the title also',
    'description': 'I will just say this is in honor of ' +
                   base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw=='),
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


class GiftstartTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_urlfetch_stub()
        self.testbed.init_blobstore_stub()
        self.testbed.init_app_identity_stub()

        # Insert user
        user = User()
        user.uid = 'f1234'
        user.name = base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw==')
        user.cached_profile_image_url = 'lol not a url'
        user.logged_in_with = 'facebook'
        user.facebook_token_set = FacebookTokenSet(access_token='x1234',
                                                   expires=datetime.now() +
                                                           timedelta(days=90))
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
        self.assertEqual(response.status_code, 403, "Should reject due to "
                                                    "invalid user details, "
                                                    "expected 403, response "
                                                    "was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Shouldn't have created a "
                                                    "campaign, expected 404, "
                                                    "response was " +
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
        self.assertEqual(response.status_code, 200, "Should accept created "
                                                    "campaign, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should have created a "
                                                    "campaign, expected 200, "
                                                    "response was " +
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
        self.assertEqual(response.status_code, 200, "Should accept created "
                                                    "campaign, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept created "
                                                    "campaign, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should have created first "
                                                    "campaign, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=2'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Shouldn't have created a "
                                                    "second campaign, expected "
                                                    "404, response was " +
                         str(response.status_code))

    def test_get_nonexistent_campaign(self):
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=12341234123'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 404, "Campaign should not exist,"
                                                    " expected 404, response "
                                                    "was " +
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
        self.assertEqual(response.status_code, 200, "Should accept created "
                                                    "campaign, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        new_giftstart = {'gsid': '1'}
        new_giftstart['title'] = 'new title whatup'
        new_giftstart['description'] = 'new description yeyah'
        new_giftstart['gift_champion_uid'] = 'f1234'
        new_giftstart['image'] = {'data': ':image/jpg;,/9j/4AAQSkZJRgABAQEASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAgMCAgICAgMCAwIDBAMEBAQDBAQEBQYFBAUGBQQEBQcGBgYHBwcHBAUICAgHCAYHBwf/2wBDAQEBAQIBAgMCAgMHBQQFBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwf/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==',
                                  'filename': 'new.jpg'}
        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'PUT'
        request.body = json.dumps({
            'action': 'update',
            'uid': 'f1234',
            'token': 'x1234',
            'giftstart': new_giftstart,
        })
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Should accept campaign "
                                                    "updates, expected 200, "
                                                    "response was " +
                         str(response.status_code))

        request = webapp2.Request.blank('/giftstart/api')
        request.method = 'GET'
        request.query_string = 'gs-id=1'
        response = request.get_response(giftstart_api.api)
        self.assertEqual(response.status_code, 200, "Campaign should still "
                                                    "exist, expected 200, "
                                                    "response was " +
                         str(response.status_code))
        response_giftstart = json.loads(response.body)
        self.assertEqual(new_giftstart['gsid'], response_giftstart['gsid'],
                         "gsid should be {gsid1}, was {gsid2}"
                         .format(gsid1=new_giftstart['gsid'],
                                 gsid2=response_giftstart['gsid']))
        self.assertEqual(new_giftstart['title'], response_giftstart['title'],
                         "title should be {title1}, was {title2}"
                         .format(title1=new_giftstart['title'],
                                 title2=response_giftstart['title']))
        self.assertEqual(new_giftstart['description'],
                         response_giftstart['description'],
                         "title should be {description1}, was {description2}"
                         .format(description1=new_giftstart['description'],
                                 description2=response_giftstart['description']))
        self.assertNotEquals(example_giftstart['product']['img_url'],
                             response_giftstart['product']['img_url'],
                             "Expected response img url not to be " +
                             example_giftstart['product']['img_url'])

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
        self.assertEqual(response.status_code, 200, "Should accept created "
                                                    "campaign, expected 200, "
                                                    "response was " +
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
        self.assertEqual(response.status_code, 403, "Should reject campaign "
                                                    "updates, expected 403, "
                                                    "response was " +
                         str(response.status_code))

    def fake_payment(self, gsid, uid, parts):
        pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                            str(time())}
        # Submit token to API
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}
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

    def test_get_hot_campaigns(self):
        test_gs = example_giftstart

        # Create 3 campaigns
        for i in range(3):
            test_gs['title'] += str(i)
            request = webapp2.Request.blank('/giftstart/api')
            request.method = 'PUT'
            request.body = json.dumps({
                'action': 'create',
                'uid': 'f1234',
                'token': 'x1234',
                'giftstart': test_gs,
            })

            response = request.get_response(giftstart_api.api)
            self.assertEqual(response.status_code, 200, "Should accept created "
                                                        "campaign, expected 200"
                                                        ", response was " +
                             str(response.status_code))

        # Pitch in on 2 campaigns
        hottest_gsid = '1'
        contrib_campaigns = ['2', hottest_gsid]
        num_pitchins = 0
        for gsid in contrib_campaigns:
            self.fake_payment(gsid, 'f1234', [1, 2])
            num_pitchins += 1
        self.fake_payment(hottest_gsid, 'f1234', [5])
        num_pitchins += 1

        # Request hot campaigns
        request = webapp2.Request.blank('/giftstart/api/hot-campaigns')
        request.method = 'GET'
        request.query_string = 'num_campaigns=5'
        response = request.get_response(giftstart_api.hot_campaigns)
        self.assertEqual(200, response.status_code, "Should successfully fetch "
                                                    "hot campaigns, expected "
                                                    "code 200, "
                                                    "response was " +
                         str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that all pitchin'd campaigns are returned
        campaign_ids = map(lambda resp: resp.get('gsid'),
                           json_response.get('campaigns'))
        for gsid in contrib_campaigns:
            self.assertIn(gsid, campaign_ids, "Should contain pitchin'd "
                                              "campaigns, expected GSID " +
                          gsid + ", list was " + str(campaign_ids))

        # Verify that most pitchin'd campaign is first
        self.assertEqual(hottest_gsid,
                         json_response['campaigns'][0]['gsid'],
                         "Most pitchin'd campaign should be first in reply, "
                         "first was actually " +
                         json_response['campaigns'][0]['gsid'])

        # Verify that the pitchins were sent with it
        self.assertEqual(num_pitchins, len(json_response['pitchins']),
                         "It should return the same number of pitchins " +
                         "made, expected " + str(num_pitchins) +
                         ", received " + str(len(json_response['pitchins'])))

        # Verify that pitchins have names
        self.assertIn('name', json_response['pitchins'][0][0].keys(),
                      "Pitchins should have a 'name' field, but do not.")

