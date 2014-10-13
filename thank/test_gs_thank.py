__author__ = 'Stuart'

import os
if 'test_gs_thank.py' in __file__.split('/')[-1]:
    os.chdir('..')

import unittest
import skip32
from giftstart import GiftStart
from google.appengine.ext import testbed, ndb
from datetime import datetime
import webapp2
import json

# UUTs
import thank_core
import thank_api

decode_expectations = {
    '0': 'hglrwzw',
    '1': 'hfilnrs',
    '2': 'moljpej',
    '4632': 'bsaebmf',
    '4633': 'icbhkad',
    '4634': 'nidcrsk',
}


class ThankCoreTestHandler(unittest.TestCase):

    def test_encode_secret(self):
        """ Encoded gsids should match expected values
        """
        for k, v in decode_expectations.items():
            self.assertEqual(v, thank_core.encode_secret(k))

    def test_encode_distribution(self):
        """ The encode function should output a relatively even distribution
        of values - we want to avoid birthday attacks
        """
        inputs = [thank_core.encode_secret(str(i)) for i in range(10000)]
        values = [skip32.from_alpha(s) for s in inputs]
        spread = [0] * 100
        key_val = 2**32 / 100
        for v in values:
            spread[v // key_val] += 1
        self.assertLess(max(spread) / float(min(spread)) - 1, 0.70,
                        "Distribution should be within 70%, was " +
                        str(spread))

    def test_decode_secret(self):
        """ Decoded secrets should match expected values
        """
        for k, v in decode_expectations.items():
            self.assertEqual(k, thank_core.decode_secret(v))


class ThankApiTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

        gs_key = ndb.Key('GiftStart', 'my-title')
        gs = GiftStart(key=gs_key)
        gs.gsid = '1'
        gs.giftstart_title = 'my title'
        gs.giftstart_url_title = 'my-title'
        gs.giftstart_description = 'my description'
        gs.gift_champion_uid = 'f1234'
        gs.deadline = datetime.now()
        gs.timestamp = datetime.now()
        gs.product_url = 'http://abc.com'
        gs.product_img_url = 'http://abc.com/img.jpg'
        gs.product_price = 17000
        gs.sales_tax = 170
        gs.shipping = 171
        gs.service_fee = 172
        gs.total_price = gs.product_price + gs.sales_tax + gs.shipping + \
                         gs.service_fee
        gs.overlay_columns = 4
        gs.overlay_rows = 4
        gs.gc_email = 'test@giftstarter.co'
        gs.shipping_state = 'WA'
        gs.shipping_zip = '98109'
        gs.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_valid_secret(self):
        """ Expect a 302 to /giftstart/my-title for valid secret
        """
        secret = thank_core.encode_secret('1')
        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 302,
                         "Should respond with a 301, got " +
                         str(response.status_code))
        self.assertEqual(response.headers['Location'],
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret,
                         "Should be redirected to proper url - " +
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret + " - was sent to " +
                         response.headers['Location'])

    def test_thanking(self):
        secret = thank_core.encode_secret('1')
        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 302,
                         "Should respond with a 301, got " +
                         str(response.status_code))
        self.assertEqual(response.headers['Location'],
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret,
                         "Should be redirected to proper url - " +
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret + " - was sent to " +
                         response.headers['Location'])

        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'PUT'
        request.body = json.dumps({
            'uid': 'f1234',
            'gsid': '1',
            'message': 'SUCH THANKS, SO GRATITUDE'
        })
        response = request.get_response(thank_api.handler)

        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 302,
                         "Should respond with a 301, got " +
                         str(response.status_code))
        self.assertEqual(response.headers['Location'],
                         "http://localhost/giftstart/my-title",
                         "Should be redirected to non-thank you url - " +
                         "http://localhost/giftstart/my-title - was sent to " +
                         response.headers['Location'])

    def test_edit_thanks(self):
        secret = thank_core.encode_secret('1')
        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 302,
                         "Should respond with a 301, got " +
                         str(response.status_code))
        self.assertEqual(response.headers['Location'],
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret,
                         "Should be redirected to proper url - " +
                         "http://localhost/giftstart/my-title?thanks=" +
                         secret + " - was sent to " +
                         response.headers['Location'])

        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'PUT'
        request.body = json.dumps({
            'uid': 'f1234',
            'gsid': '1',
            'message': 'SUCH THANKS, SO GRATITUDE'
        })
        response = request.get_response(thank_api.handler)

        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 302,
                         "Should respond with a 301, got " +
                         str(response.status_code))
        self.assertEqual(response.headers['Location'],
                         "http://localhost/giftstart/my-title",
                         "Should be redirected to non-thank you url - " +
                         "http://localhost/giftstart/my-title - was sent to " +
                         response.headers['Location'])

        request = webapp2.Request.blank('/thanks')
        request.method = 'PUT'
        request.body = json.dumps({
            'uid': 'f1234',
            'gsid': '1',
            'url_title': 'my-title',
            'message': 'SO THANKS, SUCH GRATITUDE'
        })
        response = request.get_response(thank_api.handler)

        self.assertEqual(response.status_code, 200,
                         "Should receive a 200 status, got " +
                         str(response.status_code))


    def test_invalid_secret(self):
        """ Expect a 403 when an invalid secret is given
        """
        secret = 'abcdefg'
        request = webapp2.Request.blank('/thanks-' + secret)
        request.method = 'GET'
        response = request.get_response(thank_api.handler)
        self.assertEqual(response.status_code, 403,
                         "Should respond with a 403, got " +
                         str(response.status_code))