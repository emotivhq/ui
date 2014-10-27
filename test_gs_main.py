__author__ = 'Stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
from google.appengine.ext import testbed
import webapp2
import main


class FeedsTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_main(self):
        """ Should get a 200 response from accessing /
        """
        req = webapp2.Request.blank('/')
        req.remote_addr = '1.1.1.1'
        req.method = 'GET'
        resp = req.get_response(main.app)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to /, got: " + str(resp))

    def test_main_gs_button_referral(self):

        """ Should get a 200 response from accessing /create from a gs button
        link
        """
        req = webapp2.Request.blank('/create')
        req.query_string = 'product_url=http%3A%2F%2Fstore.icpooch.com%2Ficpooch-internet-pet-treat-dispenser-u-s-canada-model-includes-6oz-of-icpooch-cookies%2F&title=ICPOOCH%20-%20INTERNET%20PET%20TREAT%20DISPENSER%20-%20U.S.%20%26%20CANADA%20MODEL%20-%20INCLUDES%206OZ%20OF%20ICPOOCH%20COOKIES&price=12999&img_url=http%3A%2F%2Fcdn3.bigcommerce.com%2Fs-al2q69%2Fproducts%2F76%2Fimages%2F275%2FMain_tablet_cookies__02336.1403226511.1280.1280__70484.1403226960.1280.1280.jpg%3Fc%3D2&source=icpooch'
        req.remote_addr = '1.1.1.1'
        req.method = 'GET'
        resp = req.get_response(main.app)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to /, got: " + str(resp))