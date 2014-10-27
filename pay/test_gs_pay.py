import stripe

__author__ = 'stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
import json
from google.appengine.ext import testbed, ndb
from datetime import datetime, timedelta
import yaml
import Queue
import threading
from tl.testing.thread import ThreadJoiner
from mock import MagicMock
from time import time
import base64

# UUT
from pay import pay_api, PitchIn, pay_core

# Dependencies
from giftstart import giftstart_api
from gs_user import User
from social.facebook import FacebookTokenSet


# Mock stripe
pay_core.stripe = MagicMock()
pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                    str(time())}

# Mock request to email
pay_core.requests.put = MagicMock()

secret = yaml.load(open('secret.yaml'))
stripe.api_key = secret['stripe_auth']['app_secret']

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


class PayTestHandlers(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_urlfetch_stub()

        # Insert user
        self.user = User(key=ndb.Key('User', 'f1234'))
        self.user.uid = 'f1234'
        self.user.name = 'macklemore'
        self.user.logged_in_with = 'facebook'
        self.user.facebook_token_set = FacebookTokenSet(access_token='x1234', expires=datetime.now() + timedelta(days=90))
        self.user.cached_profile_image_url = 'fakeurl'
        self.user.put()

        # Create campaign
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f1234'
        request.cookies['token'] = 'x1234'
        request.body = json.dumps(example_giftstart)
        response = request.get_response(giftstart_api.handler)

        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))

    def tearDown(self):
        self.testbed.deactivate()

    def test_proper_payment(self):
        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid, 'parts': parts,
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

    def test_no_name_purchase(self):
        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        # Insert user
        self.unnamed_user = User(key=ndb.Key('User', 'f1236'))
        self.unnamed_user.uid = 'f1236'
        self.unnamed_user.name = None
        self.unnamed_user.logged_in_with = 'facebook'
        self.unnamed_user.facebook_token_set = FacebookTokenSet(
            access_token='x1236', expires=datetime.now() + timedelta(days=90))
        self.unnamed_user.cached_profile_image_url = 'fakeurl2'
        self.unnamed_user.put()

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.unnamed_user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid, 'parts': parts,
                'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        print(response)
        self.assertEqual(response.status_code, 200,
                         "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json,
                         "Should accept payment, expected 'stripe-error' not "
                         "to be in response, response was " +
                         str(response.json))

        # Verify pitchin
        pitchin = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).fetch()[0]
        self.assertListEqual(parts, pitchin.parts, "Should buy proper parts, "
                                                   "expected {in_parts}, got "
                                                   "{out_parts}"
                             .format(in_parts=parts, out_parts=pitchin.parts))
        self.assertEqual(gsid, pitchin.gsid, "Should pitchin for the right "
                                             "campaign, expected {in_gsid}, "
                                             "got {out_gsid}"
                         .format(in_gsid=parts, out_gsid=pitchin.parts))
        pi_count = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count()
        self.assertEqual(1, pi_count, "Should only have 1 pitchin")

    def test_double_purchase(self):
        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
            'stripeResponse': stripe_response, 'gsid': gsid, 'parts': parts,
            'emailAddress': 'test@giftstarter.co',
            'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200,
                         "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json,
                         "Should accept payment, expected 'stripe-error' not to"
                         " be in response, response was " + str(response.json))

        # Verify pitchin
        pitchin = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).fetch()[0]
        self.assertListEqual(parts, pitchin.parts,
                             "Should buy proper parts, expected {in_parts}, "
                             "got {out_parts}"
                             .format(in_parts=parts, out_parts=pitchin.parts))
        self.assertEqual(gsid, pitchin.gsid,
                         "Should pitchin for the right campaign, expected "
                         "{in_gsid}, got {out_gsid}"
                         .format(in_gsid=parts, out_gsid=pitchin.parts))

        pi_count = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count()
        self.assertEqual(1, pi_count, "Should have 1 pitchin")

        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [2, 3]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)

        self.assertEqual(response.status_code, 400,
                         "Shouldn't allow purchase of already bought piece, "
                         "expected 400, response was " +
                         str(response.status_code))

        # Verify pitchin isn't there
        self.assertEqual(1,
                         PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid)
                         .count(),
                         "Should only have 1 pitchin")

    def test_concurrent_purchase(self):
        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        gsid = '1'
        parts = [1, 2]

        # Submit token to API
        request1 = webapp2.Request.blank('/pay')
        request1.method = 'POST'
        request1.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        request2 = webapp2.Request.blank('/pay')
        request2.method = 'POST'
        request2.body = request1.body

        def run_request(q, req):
            q.put(req.get_response(pay_api.api))

        with ThreadJoiner(5):
            queue = Queue.Queue()
            t1 = threading.Thread(target=run_request, args=(queue, request1))
            t2 = threading.Thread(target=run_request, args=(queue, request2))
            t1.daemon = True
            t2.daemon = True
            t1.start()
            t2.start()

        results = [queue.get().status_code for i in range(queue.qsize())]

        self.assertIn(200, results,
                      "One response should be 200, they were " + str(results))
        self.assertIn(400, results,
                      "One response should be 400, they were " + str(results))