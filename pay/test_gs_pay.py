import stripe

__author__ = 'stuart'

# Change execution path to project root
import os
if 'test_gs_pay.py' in __file__.split('/')[-1]:
    os.chdir('..')

import unittest
import webapp2
import json
from google.appengine.ext import testbed
from datetime import datetime, timedelta
import yaml

# UUT
from pay import pay_api, PitchIn

# Dependencies
from giftstart import giftstart_api
from gs_user import User
from social.facebook import FacebookTokenSet

secret = yaml.load(open('secret.yaml'))
stripe.api_key = secret['stripe_auth']['app_secret']

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
        'total_price': 12334,
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


class PayTestHandlers(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_urlfetch_stub()

        # Insert user
        self.user = User()
        self.user.uid = 'f1234'
        self.user.name = 'macklemore'
        self.user.logged_in_with = 'facebook'
        self.user.facebook_token_set = FacebookTokenSet(access_token='x1234', expires=datetime.now() + timedelta(days=90))
        self.user.cached_profile_image_url = 'fakeurl'
        self.user.put()

        # Create campaign
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

    def tearDown(self):
        self.testbed.deactivate()

    def test_proper_payment(self):
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
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': token.to_dict(), 'gsid': gsid, 'parts': parts,
                'emailAddress': 'test@giftstarter.co', 'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200, "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json, "Should accept payment, expected 'stripe-error' not to be in "
                                                        "response, response was " + str(response.json))

        # Verify pitchin
        pitchin = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).fetch()[0]
        self.assertListEqual(parts, pitchin.parts, "Should buy proper parts, expected {in_parts}, got {out_parts}"
                             .format(in_parts=parts, out_parts=pitchin.parts))
        self.assertEqual(gsid, pitchin.gsid, "Should pitchin for the right campaign, expected {in_gsid}, got {out_gsid}"
                         .format(in_gsid=parts, out_gsid=pitchin.parts))
        self.assertEqual(1, PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count(), "Should only have 1 pitchin")

    def test_double_purchase(self):
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
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
            'stripeResponse': token.to_dict(), 'gsid': gsid, 'parts': parts,
            'emailAddress': 'test@giftstarter.co', 'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200, "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json, "Should accept payment, expected 'stripe-error' not to be in "
                                                        "response, response was " + str(response.json))

        # Verify pitchin
        pitchin = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).fetch()[0]
        self.assertListEqual(parts, pitchin.parts, "Should buy proper parts, expected {in_parts}, got {out_parts}"
                             .format(in_parts=parts, out_parts=pitchin.parts))
        self.assertEqual(gsid, pitchin.gsid, "Should pitchin for the right campaign, expected {in_gsid}, got {out_gsid}"
                         .format(in_gsid=parts, out_gsid=pitchin.parts))
        self.assertEqual(1, PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count(), "Should have 1 pitchin")


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
        gsid = '1'
        parts = [2, 3]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
            'stripeResponse': token.to_dict(), 'gsid': gsid, 'parts': parts,
            'emailAddress': 'test@giftstarter.co', 'note': 'Test note for my besty!', 'subscribe': False
        }
        })

        response = request.get_response(pay_api.api)

        self.assertEqual(response.status_code, 400, "Shouldn't allow purchase of already bought piece, expected 400, "
                                                    "response was " + str(response.status_code))

        # Verify pitchin isn't there
        self.assertEqual(1, PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count(), "Should only have 1 pitchin")
