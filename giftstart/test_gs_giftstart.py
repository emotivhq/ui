import stripe

__author__ = 'stuart'

# Change execution path to project root
import os
os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
import json
import yaml
from google.appengine.ext import testbed, ndb
from gs_user import User
from social.facebook import FacebookTokenSet
from datetime import datetime, timedelta
from time import time
import base64
import uuid
from pay import pay_api, pay_core
from mock import MagicMock
import main
from giftstart.GiftStart import GiftStart

secret = yaml.load(open('secret.yaml'))

# UUT
from giftstart import giftstart_api, giftstart_core, giftstart_create


# Mock stripe
pay_core.stripe = MagicMock()
pay_core.stripe.Charge.create.return_value = {'id': 'stripe_id_123' +
                                                    str(time())}

# Mock request to email
pay_core.requests.put = MagicMock()
giftstart_create.giftstart_comm.send_create_notification = MagicMock()

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
        user = User(key=ndb.Key('User', 'f123'))
        user.uid = 'f123'
        user.name = base64.b64decode('TWFyaW9uIERlc21hemnDqHJlcw==')
        user.cached_profile_image_url = 'lol not a url'
        user.logged_in_with = 'facebook'
        user.facebook_token_set = FacebookTokenSet(access_token='x123',
                                                   expires=datetime.now() +
                                                           timedelta(days=90))
        user.put()

    def tearDown(self):
        self.testbed.deactivate()

    def test_create_without_user(self):
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(example_giftstart)

        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 400,
                         "Should reject due to no user or uuid, expected "
                         "400, response was " + str(response.status_code))

    def test_create_with_invalid_user(self):
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f1234'
        request.cookies['token'] = 'x1234'
        request.body = json.dumps(example_giftstart)

        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 403,
                         "Should reject due to invalid user details, expected "
                         "403, response was " + str(response.status_code))

    def test_create_with_valid_user(self):
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f123'
        request.cookies['token'] = 'x123'
        request.body = json.dumps(example_giftstart)

        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))

        url_title = json.loads(response.body)['giftstart_url_title']
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should have created a campaign, expected 200, "
                         "response was " + str(response.status_code))

    def test_get_nonexistent_campaign(self):
        request = webapp2.Request.blank('/giftstart/not-here.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 404,
                         "Campaign should not exist, expected 404, response "
                         "was " + str(response.status_code))

    def test_update_campaign(self):
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(example_giftstart)
        request.cookies['uid'] = 'f123'
        request.cookies['token'] = 'x123'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))
        url_title = json.loads(response.body)['giftstart_url_title']

        new_giftstart = {'gsid': '1'}
        new_giftstart['title'] = 'new title whatup'
        new_giftstart['description'] = 'new description yeyah'
        new_giftstart['gift_champion_uid'] = 'f123'
        new_giftstart['image'] = {'data': ':image/jpg;,/9j/4AAQSkZJRgABAQEASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAAaADAAQAAAABAAAAAQAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAgMCAgICAgMCAwIDBAMEBAQDBAQEBQYFBAUGBQQEBQcGBgYHBwcHBAUICAgHCAYHBwf/2wBDAQEBAQIBAgMCAgMHBQQFBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwf/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==',
                                  'filename': 'new.jpg'}
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'POST'
        request.cookies['uid'] = 'f123'
        request.cookies['token'] = 'x123'
        request.body = json.dumps(new_giftstart)
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept campaign updates, expected 200, "
                         "response was " + str(response.status_code))

        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Campaign should still exist, expected 200, "
                         "response was " + str(response.status_code))
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
        self.assertNotEquals(example_giftstart['product_img_url'],
                             response_giftstart['product_img_url'],
                             "Expected response img url not to be " +
                             example_giftstart['product_img_url'])

    def test_update_campaign_disallow(self):
        request = webapp2.Request.blank('/giftstart/create.json')
        request.method = 'POST'
        request.body = json.dumps(example_giftstart)
        request.cookies['uid'] = 'f123'
        request.cookies['token'] = 'x123'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Should accept created campaign, expected 200, "
                         "response was " + str(response.status_code))
        url_title = json.loads(response.body)['giftstart_url_title']

        new_giftstart = {'gsid': '1'}
        new_giftstart['title'] = 'new title whatup'
        new_giftstart['description'] = 'new description yeyah'
        new_giftstart['gift_champion_uid'] = 'f123'
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'POST'
        request.cookies['uid'] = 'abc2'
        request.cookies['token'] = 'tok2'
        request.body = json.dumps(new_giftstart)
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 403,
                         "Should reject campaign updates, expected 403, "
                         "response was " + str(response.status_code))

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
            request = webapp2.Request.blank('/giftstart/create.json')
            request.method = 'POST'
            request.cookies['uid'] = 'f123'
            request.cookies['token'] = 'x123'
            request.body = json.dumps(test_gs)

            response = request.get_response(giftstart_api.handler)
            self.assertEqual(response.status_code, 200,
                             "Should accept created campaign, expected 200"
                             ", response was " + str(response.status_code))

        # Pitch in on 2 campaigns
        hottest_gsid = '1'
        contrib_campaigns = ['2', hottest_gsid]
        num_pitchins = 0
        for gsid in contrib_campaigns:
            self.fake_payment(gsid, 'f123', [1, 2])
            num_pitchins += 1
        self.fake_payment(hottest_gsid, 'f123', [5])
        num_pitchins += 1

        # Request hot campaigns
        request = webapp2.Request.blank('/giftstart/api/hot-campaigns')
        request.method = 'GET'
        request.query_string = 'num_campaigns=5'
        response = request.get_response(giftstart_api.hot_campaigns)
        self.assertEqual(200, response.status_code,
                         "Should successfully fetch hot campaigns, expected "
                         "code 200, response was " + str(response.status_code))
        json_response = json.loads(response.body)

        # Verify that all pitchin'd campaigns are returned
        campaign_ids = map(lambda resp: resp.get('gsid'),
                           json_response.get('campaigns'))
        for gsid in contrib_campaigns:
            self.assertIn(gsid, campaign_ids,
                          "Should contain pitchin'd campaigns, expected GSID"
                          " " + gsid + ", list was " + str(campaign_ids))

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

    def test_missing_giftstart_details(self):
        base_gs = example_giftstart

        def create_bad_campaign(base, expected_code, strip_key):
            campaign = {k: v for k, v in base.items() if k != strip_key}
            request = webapp2.Request.blank('/giftstart/create.json')
            request.method = 'POST'
            request.body = json.dumps(campaign)

            response = request.get_response(giftstart_api.handler)
            self.assertEqual(response.status_code, expected_code,
                             "Should refuse invalid campaign, expected {0}, "
                             "response was {1} for {2}"
                             .format(expected_code, str(response), strip_key))

        for key in example_giftstart.keys():
            create_bad_campaign(base_gs, 400, key)

    def test_uuid_instead_of_uid(self):
        this_uuid = str(uuid.uuid4())

        def create_campaign(campaign):
            """ :type campaign: dict """
            req = webapp2.Request.blank('/giftstart/create.json')
            req.method = 'POST'
            req.body = json.dumps(dict({'staging_uuid': this_uuid}.items() +
                                       campaign.items()))
            return req.get_response(giftstart_api.handler)

        # Create campaign with UUID instead of uid
        test_gs = {k: v for k, v in example_giftstart.items()}
        response = create_campaign(test_gs)
        self.assertEqual(response.status_code, 200,
                         "Should accept creation with UUID instead of uid with"
                         " response of 200, response was {0}"
                         .format(str(response)))

        # Campaign shouldn't be accessible yet
        url_title = json.loads(response.body)['giftstart_url_title']
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 404,
                         "Staged campaign shouldn't be accessible, expected "
                         "404, response was {0}"
                         .format(str(response.status_code)))

        # Send OAuth login deets, expect redirect to created campaign
        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        request.cookies['uid'] = 'f123'
        request.cookies['token'] = 'x123'
        request.query_string = 'staging_uuid={uuid}'.format(uuid=this_uuid)
        request.method = 'GET'
        response = request.get_response(main.app)
        self.assertEqual(response.status_code, 302,
                         "Should have been redirected to campaign with 302,"
                         " but response was {0}".format(str(response)))

        # Campaign should now be accessible
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 200,
                         "Campaign should be accessible, expected 200, "
                         "response was {0}".format(str(response.status_code)))

    def test_wrong_uuid(self):
        this_uuid = str(uuid.uuid4())

        def create_campaign(campaign):
            """ :type campaign: dict """
            req = webapp2.Request.blank('/giftstart/create.json')
            req.method = 'POST'
            req.body = json.dumps(dict({'staging_uuid': this_uuid}.items() +
                                       campaign.items()))
            return req.get_response(giftstart_api.handler)

        # Create campaign with UUID instead of uid
        test_gs = {k: v for k, v in example_giftstart.items()}
        response = create_campaign(test_gs)
        self.assertEqual(response.status_code, 200,
                         "Should accept creation with UUID instead of uid with"
                         " response of 200, response was {0}"
                         .format(str(response)))

        # Campaign shouldn't be accessible yet
        url_title = json.loads(response.body)['giftstart_url_title']
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 404,
                         "Staged campaign shouldn't be accessible, expected "
                         "404, response was {0}"
                         .format(str(response.status_code)))

        # Send OAuth login deets, expect redirect to created campaign
        request = webapp2.Request.blank('/')
        request.remote_addr = '1.1.1.1'
        request.cookies['uid'] = 'abc123'
        request.cookies['token'] = 'my_access_token'
        request.query_string = 'staging_uuid={uuid}'.format(uuid='abc123')
        request.method = 'GET'
        response = request.get_response(main.app)
        # TODO make this redirect to the proper path on the server
        self.assertEqual(response.status_code, 200,
                         "Should have been redirected to campaign with 200,"
                         " but response was {0}".format(str(response)))

        # Campaign should now be accessible
        request = webapp2.Request.blank('/giftstart/' + url_title + '.json')
        request.method = 'GET'
        response = request.get_response(giftstart_api.handler)
        self.assertEqual(response.status_code, 404,
                         "Campaign should not be accessible, expected 404, "
                         "response was {0}".format(str(response.status_code)))

    def test_query_giftstarts(self):
        ndbgs = GiftStart()
        """ :type ndbgs GiftStart """
        ndbgs = giftstart_create.GiftStartCreateHandler\
            .populate_giftstart(ndbgs, example_giftstart, uid="f1234")
        ndbgs.thanked = True
        ndbgs.gsid = '1'
        ndbgs.deadline = datetime.now()
        ndbgs.thanks_img_url = "http123"
        ndbgs.thanks_message = "abc you know me"
        ndbgs.put()

        request = webapp2.Request.blank('/giftstarts.json')
        request.method = 'GET'
        request.query_string = 'thanked=true&num=1'
        response = request.get_response(giftstart_api.handler)
        giftstarts = json.loads(response.body)
        self.assertEqual(1, len(giftstarts),
                         "Should have fetched 1 giftstart(s), got " +
                         str(len(giftstarts)))
        self.assertIn('thanks_img_url', giftstarts[0].keys(),
                      "Expected thanks image to be in giftstart")
        self.assertIn('thanks_message', giftstarts[0].keys(),
                      "Expected thanks message to be in giftstart")
