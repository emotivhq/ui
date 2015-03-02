"""unit tests for pitch-ins / payments"""
import stripe

__author__ = 'GiftStarter'

# Change execution path to project root
import os
#os.chdir('/Users/Stuart/Projects/GiftStarter/app')

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
from gs_user import gs_user_api
from gs_user import gs_user_core

# UUT
from pay import pay_api, PitchIn, pay_core

# Dependencies
from giftstart import giftstart_api
from gs_user import User
from social.facebook import FacebookTokenSet


class StripeCustomerMock():
    def __init__(self, num_cards):
        self.id = 'customer_id'
        self.cards = MagicMock()
        self.cards.all.return_value = {'data': [{'last4': '1111',
                                                 'id': 'card_id',
                                                 'fingerprint': 'abcd1',
                                                 'brand': 'Visx'}] * num_cards}


class StripeCustomerRetrieveMock():
    def __init__(self, num_cards):
        self.cards = MagicMock()
        self.cards.all.return_value = {'data': [{'last4': '3124',
                                                 'id': 'card_id',
                                                 'fingerprint': 'abcd1',
                                                 'brand': 'MasterCarx'}] * num_cards}

# Mock stripe
pay_core.stripe = MagicMock()
pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                    str(time()),
                                              'amount': 1234,
                                              'cards': {'data': [{'last4': '3124',
                                                                  'brand': 'Visx'}]}}
pay_core.stripe.Customer.create.return_value = {'id': 'stripe_id_123' +
                                                      str(time()),
                                                'amount': 1234,
                                                'cards': {'data': [{'last4': '3124',
                                                                    'brand': 'Visx'}]}}
pay_core.stripe.Customer.retrieve.return_value = StripeCustomerRetrieveMock(0)
gs_user_core.stripe = MagicMock()
gs_user_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                    str(time()),
                                                  'amount': 1234}
gs_user_core.stripe.Customer.create.return_value = {'id': 'stripe_id_123' +
                                                          str(time()),
                                                    'amount': 1234,
                                                    'cards': {'data': [{'last4': '3124',
                                                                        'brand': 'Visx'}]}}
gs_user_core.stripe.Customer.retrieve.return_value = StripeCustomerRetrieveMock(0)

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
    'campaign_length': 10,
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
        self.user.facebook_token_set = FacebookTokenSet(access_token='x1234',
            expires=datetime.now() + timedelta(days=90))
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

        # Stripe mocks
        pay_core.stripe.Charge.create.side_effect = None

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
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200,
                         "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json,
                         "Should accept payment, expected 'stripe-error' not "
                         "to be in response, response was " +
                         str(response.json))

        # Verify pitchin
        pitchin = PitchIn.PitchIn.query(
            PitchIn.PitchIn.gsid == gsid).fetch()[0]
        self.assertListEqual(parts, pitchin.parts,
                             "Should buy proper parts, expected {in_parts}, "
                             "got {out_parts}".format(in_parts=parts,
                                                      out_parts=pitchin.parts))
        self.assertEqual(gsid, pitchin.gsid,
                         "Should pitchin for the right campaign, expected "
                         "{in_gsid}, got {out_gsid}"
                         .format(in_gsid=parts, out_gsid=pitchin.parts))
        pi_count = PitchIn.PitchIn.query(PitchIn.PitchIn.gsid == gsid).count()
        self.assertEqual(1, pi_count, "Should only have 1 pitchin")

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
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
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

    def test_existing_card_token_grant(self):
        """ Should grant a stripe token for a user with a pre-existing card """

        # Create test token
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}
        gs_user_core.stripe.Customer.retrieve.\
            return_value = StripeCustomerRetrieveMock(1)

        gsid = '1'
        parts = [1, 2]

        # Submit token to API
        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False,
                'saveCreditCard': True
            },
        })
        request.get_response(pay_api.api)

        stripe_last_four = StripeCustomerRetrieveMock(1).cards.all()['data'][0]['last4']
        stripe_brand = StripeCustomerRetrieveMock(1).cards.all()['data'][0]['brand']

        req = webapp2.Request.blank('/users/{0}/cards.json'.format('f1234'))
        req.method = 'GET'
        req.cookies['uid'] = 'f1234'
        req.cookies['token'] = 'x1234'

        resp = req.get_response(gs_user_api.api)
        json_resp = json.loads(resp.body)
        print(resp)
        print(json_resp)
        first_card = json_resp[0]

        self.assertEqual(200, resp.status_code,
                         "Response should be 200, was {0}".format(resp))
        self.assertEqual(first_card['last_four'], stripe_last_four,
                         "Should have gotten {1} in token get, got {0}"
                         .format(first_card['last_four'],
                                 stripe_last_four))
        self.assertEqual(first_card['brand'], stripe_brand,
                         "Should have gotten {1} in token get, got {0}"
                         .format(first_card['brand'], stripe_brand))
        self.assertEqual(1, len(json_resp),
                         "Should have received 1 card, received {0}"
                         .format(len(json_resp)))

    def test_existing_card_invalid_user(self):
        """ Shouldn't grant a token for invalid uid or token """
        req = webapp2.Request.blank('/users/{0}/cards.json'
                                    .format(self.user.uid))
        req.method = 'GET'
        req.cookies['uid'] = 'f1232'
        req.cookies['token'] = 'x1231'
        resp = req.get_response(gs_user_api.api)

        self.assertEqual(403, resp.status_code,
                         "Expected response of 403, response was {0}"
                         .format(resp))

    def test_stripe_token_request_no_card(self):
        """ Should not grant token to user who has to cards saved """
        gs_user_core.stripe.Customer.retrieve.\
            return_value = StripeCustomerRetrieveMock(0)
        req = webapp2.Request.blank('/users/{0}/cards.json'
                                    .format(self.user.uid))
        req.method = 'GET'
        req.cookies['uid'] = 'f1234'
        req.cookies['token'] = 'x1234'
        resp = req.get_response(gs_user_api.api)

        self.assertEqual(200, resp.status_code,
                         "Expected response of 200, response was {0}"
                         .format(resp))
        self.assertEqual([], json.loads(resp.body),
                         "Expected to get an empty array, got {0}"
                         .format(resp.body))

    def test_use_saved_card_to_pay(self):
        """ Users should be able to use a saved card to complete a purchase """
        self.user.stripe_id = 'user_stripe_id'
        self.user.put()
        gs_user_core.stripe.Customer.retrieve.\
            return_value = StripeCustomerRetrieveMock(1)

        # Make payment!
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200,
                         "Should accept payment, expected 200, response was " +
                         str(response.status_code))
        self.assertNotIn('stripe-error', response.json,
                         "Should accept payment, expected 'stripe-error' not "
                         "to be in response, response was " +
                         str(response.json))

    def test_stripe_display_charge_error_message(self):
        """ Should respond with the error message if a charge fails for a
        remembered card """
        pay_core.stripe.Charge.create.side_effect = stripe.error.CardError(
            "card is actually a bicycle", None, 400)

        self.user.stripe_id = 'user_stripe_id'
        self.user.put()
        gs_user_core.stripe.Customer.retrieve.\
            return_value = StripeCustomerRetrieveMock(1)

        # Make payment!
        stripe_response = {'id': 'abc_stripe' + str(time()),
                           'card': {'last4': '8767'}}

        request = webapp2.Request.blank('/pay')
        request.method = 'POST'
        gsid = '1'
        parts = [1, 2]
        request.body = json.dumps({
            'action': 'pitch-in', 'uid': self.user.uid, 'payment': {
                'stripeResponse': stripe_response, 'gsid': gsid,
                'parts': parts, 'emailAddress': 'test@giftstarter.co',
                'note': 'Test note for my besty!', 'subscribe': False
            }
        })

        response = request.get_response(pay_api.api)
        self.assertEqual(response.status_code, 200,
                         "Should refuse payment and send 200, response was " +
                         str(response.status_code))
        self.assertIn('stripe-error', response.json,
                      "Should refuse payment, expected 'stripe-error' "
                      "to be in response, response was " +
                      str(response.json))
