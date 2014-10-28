__author__ = 'Stuart'


# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
from google.appengine.ext import testbed
import webapp2
import base64
import json
import urllib

# UUT
import analytics


example_event = {
    'domain': 'test domain',
    'path': '/path/',
    'uuid': '1234-1234-1234-1234',
    'productUrl': 'http a url',
    'productTitle': 'this is a title',
    'productPrice': 12999,
    'productImgUrl': 'lot img url',
    'scrollDepth': 190,
    'screenW': 600,
    'screenH': 1200,
    'cookie': 'booookieeee',
    'action': 'create',
    'buttonX': 60,
    'buttonY': 36,
    'buttonW': 40,
    'buttonH': 24,
    'buttonBorder': '1px solid #dd4455',
    'buttonBackground': '#ffffff',
    'buttonImg': 'button test img url'
}


class AnalyticsTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

    def tearDown(self):
        self.testbed.deactivate()

    def test_send_event(self):
        url_path = '/a/' + \
                   urllib.quote(base64.b64encode(json.dumps(example_event)))
        req = webapp2.Request.blank(url_path)
        req.remote_addr = '1.2.3.4'
        req.method = 'GET'
        resp = req.get_response(analytics.handler)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to /a/etc, got: " +
                         str(resp))

        events = analytics.ButtonAnalyticsEvent.query().fetch()
        self.assertEqual(1, len(events),
                         "1 event should be registered, found " +
                         str(len(events)))
        self.assertEqual(example_event['productTitle'],
                         events[0].product_title)

