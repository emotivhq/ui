__author__ = 'Stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
from mock import MagicMock
from google.appengine.ext import testbed
import requests
from datetime import datetime
import json

# UUT
from feeds import feeds_api, FeedProduct


MOCK_URLS = feeds_api.FEEDS.values()


class BUTTER_FEED_MOCK:
    def __init__(self):
        self.status_code = 200
        self.content = json.dumps({
            u'totalItems': 5,
            u'lastchecked': datetime.now().isoformat().replace('T', ' ').split('.')[0],
            u'products': {
                u'0': {
                    u'description': u'Rock it like royalty in this opaque, holographic'
                                    u' beige nail lacquer.',
                    u'display-name': u'All Hail The Queen Nail Lacquer',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'150.00',
                    u'price': u'150.00',
                    u'qtyavailable': True,
                    u'qtybackorder': False,
                    u'sku': u'2319-AHTQ',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'85184702319',
                    u'url': u'http://www.butterlondon.com/Lacquers/All-Hail-The-Queen-'
                            u'Nail-Lacquer.html'
                },
                u'4411': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'30.00',
                    u'qtyavailable': False,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080',
                    u'upc': u'81732301858',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4412': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'30.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080',
                    u'upc': u'17323018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4410': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'70.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'81723018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4415': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/stylesheets/home.css',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'70.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'8173238588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                }
            }
        })


class BUTTER_FEED_MOCK2:
    def __init__(self):
        self.status_code = 200
        self.content = json.dumps({
            u'totalItems': 6,
            u'lastchecked': datetime.now().isoformat().replace('T', ' ').split('.')[0],
            u'products': {
                u'0': {
                    u'description': u'Rock it like royalty in this opaque, holographic'
                                    u' beige nail lacquer.',
                    u'display-name': u'All Hail The Queen Nail Lacquer',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'150.00',
                    u'price': u'150.00',
                    u'qtyavailable': True,
                    u'qtybackorder': False,
                    u'sku': u'2319-AHTQ',
                    u'thumbnail': u'http://www.butterlondon.com/all_hail_the_queen_new'
                                  u'.jpg',
                    u'upc': u'8518470029',
                    u'url': u'http://www.butterlondon.com/Lacquers/All-Hail-The-Queen-'
                            u'Nail-Lacquer.html'
                },
                u'4411': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'30.00',
                    u'qtyavailable': False,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080',
                    u'upc': u'8173018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4412': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'30.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080',
                    u'upc': u'8173230188',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4410': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'70.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'8173018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4415': {
                    u'description': u'Rock looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Colour Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/stylesheets/home.css',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'70.00',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'7323018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                },
                u'4416': {
                    u'description': u'SWAT looks inspired by the catwalk with the '
                                    u'Colour Hardware Nail Art Tool Kit. '
                                    u'Developedbackstage, this set of six essential '
                                    u'tools contains everything you need to master the'
                                    u' basics andexperiment with colour.',
                    u'display-name': u'Color Hardware Nail Art Tool Kit',
                    u'image': u'http://localhost:8080/assets/blogLink.png',
                    u'lastchecked': u'2014-10-19 15:03:25',
                    u'onlineprice': u'15.00',
                    u'price': u'70.01',
                    u'qtyavailable': True,
                    u'qtybackorder': True,
                    u'sku': u'8588-ASTS',
                    u'thumbnail': u'http://localhost:8080/assets/blogLink.png',
                    u'upc': u'813018588',
                    u'url': u'http://www.butterlondon.com/Gift-Sets/Colour-Hardware-'
                            u'Nail-Art-Tool-Kit.html'
                }
            }
        })


class FeedsTestHandler(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_taskqueue_stub()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()

        # Mock out requests.get
        self.get_store = requests.get

        self.fake_get = MagicMock()
        self.fake_get.return_value = BUTTER_FEED_MOCK()
        requests.get = self.requests_get_mock()

    def requests_get_mock(self):
        def conditional_get(url):
            if url in MOCK_URLS:
                return self.fake_get()
            else:
                return self.get_store(url)

        return conditional_get

    def tearDown(self):
        requests.get = self.get_store
        self.testbed.deactivate()

    def test_valid_method(self):
        """ GET should be allowed
        """
        req = webapp2.Request.blank('/feeds/update')
        req.method = 'GET'
        resp = req.get_response(feeds_api.handler)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to /feeds/update, got: "
                         + str(resp))

    def test_invalid_method(self):
        """ Only GET should be allowed
        """
        def do_req(method):
            req = webapp2.Request.blank('/feeds/update')
            req.method = method
            return req.get_response(feeds_api.handler)

        for method in ['PUT', 'DELETE', 'POST', 'OPTIONS', 'HEAD', 'TRACE']:
            resp = do_req(method)
            self.assertEqual(405, resp.status_code,
                             "Expected 405 Method Not Allowed for method "
                             "{method}, got: {resp}".format(resp=str(resp),
                                                            method=method))

    def test_specific_feed_methods(self):
        """ Feed specific API should only allow GETs
        """

        def do_req(method):
            req = webapp2.Request.blank('/feeds/butterLONDON/update')
            req.method = method
            return req.get_response(feeds_api.handler)

        for method in ['PUT', 'DELETE', 'POST', 'OPTIONS', 'HEAD', 'TRACE']:
            resp = do_req(method)
            self.assertEqual(405, resp.status_code,
                             "Expected 405 Method Not Allowed for method "
                             "{method}, got: {resp}".format(resp=str(resp),
                                                            method=method))
        resp = do_req('GET')
        self.assertEqual(200, resp.status_code,
                         "Expected 200 for GET, got {resp}".format(resp=resp))

    def test_get_butter_feed(self):
        """ GET'ing /feeds/update should get butter feed
        """
        req = webapp2.Request.blank('/feeds/butterLONDON/update')
        req.method = 'GET'
        resp = req.get_response(feeds_api.handler)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to "
                         "/feeds/butterLONDON/update, got: " + str(resp))

        self.assertEqual(1, self.fake_get.call_count,
                         "Expected requests.get call_count to be 1, was {0}"
                         .format(self.fake_get.call_count))

        feed_products = FeedProduct.query().fetch()
        self.assertEqual(2, len(feed_products),
                         "There should be 2 product in the database, but "
                         "found {0}".format(len(feed_products)))

    def test_feed_cleared(self):
        """ Products might disappear from the
        """

        self.fake_get.return_value = BUTTER_FEED_MOCK2()
        requests.get = self.requests_get_mock()

        req = webapp2.Request.blank('/feeds/butterLONDON/update')
        req.method = 'GET'
        resp = req.get_response(feeds_api.handler)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to "
                         "/feeds/butterLONDON/update, got: " + str(resp))

        self.assertEqual(1, self.fake_get.call_count,
                         "Expected requests.get call_count to be 1, was {0}"
                         .format(self.fake_get.call_count))

        feed_products = FeedProduct.query().fetch()
        self.assertEqual(3, len(feed_products),
                         "There should be 3 product in the database, but "
                         "found {0}".format(len(feed_products)))

        self.fake_get.return_value = BUTTER_FEED_MOCK()
        requests.get = self.requests_get_mock()

        req = webapp2.Request.blank('/feeds/butterLONDON/update')
        req.method = 'GET'
        resp = req.get_response(feeds_api.handler)
        self.assertEqual(200, resp.status_code,
                         "Should get a 200 from GET to "
                         "/feeds/butterLONDON/update, got: " + str(resp))

        feed_products = FeedProduct.query().fetch()
        self.assertEqual(2, len(feed_products),
                         "There should be 2 product in the database, but "
                         "found {0}".format(len(feed_products)))

    def test_butter_shipping_cost(self):
        """ Butter has special shipping rules, we should abide by those
        """
        self.assertTrue(False)