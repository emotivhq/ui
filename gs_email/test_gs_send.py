__author__ = 'GiftStarter'

# Change execution path to project root
import os
#os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
import json
from uuid import uuid4
from google.appengine.ext import testbed

# UUT
from gs_email import gs_email_api


class SendTestHandlers(unittest.TestCase):

    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        self.testbed.init_taskqueue_stub()

    def test_no_uuid(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string],
        # 'from': string, 'subject': string, 'body':string}
        email_uuid = ''
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'subject': 'GSTEST no_from',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should error on no uuid in path with 400, result code was: " + str(response))

    def test_no_from(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'subject': 'GSTEST no_from',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should error on no from parameter with 400, result code was: " + str(response))

    def test_no_subject(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should error on no subject parameter with 400, result code was: " + str(response))

    def test_no_body(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST no_body',
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should error on no body parameter with 400, result code was: " + str(response))

    def test_invalid_emails(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuartgiftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST test_invalid_email',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should refuse invalid to address with 400, response was: " +
                         str(response))

        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['teamgiftstarter.co'],
            'subject': 'GSTEST test_invalid_email',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should refuse invalid from address with 400, result code was: " +
                         str(response))

        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'cc': ['teamgiftstarter.co'],
            'subject': 'GSTEST test_invalid_email',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should refuse invalid cc address with 400, result code was: " +
                         str(response))

        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'bcc': ['teamgiftstarter.co'],
            'subject': 'GSTEST test_invalid_email',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should refuse invalid bcc address with 400, result code was: " +
                         str(response))

    def test_single_send(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST test_single_send',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should send email with 200, result was: " + str(response))

    def test_send_template(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string,
        #        'template_name': string, 'template_kwargs': {}}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST test_single_send',
            'template_name': 'pitch_in_thank_you',
            'template_kwargs': {}
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should send template email with 200, result was: " + str(response))

    def test_send_bad_template(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string,
        #        'template_name': string, 'template_kwargs': {}}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST test_single_send',
            'template_name': 'akjsoifdjaosidjfoiasfiajsdofij',
            'template_kwargs': {}
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Should refuse bad template with 400, result was: " + str(response))

    def test_send_with_post(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co', 'admin@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_with_post',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'POST'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 405, "Should not allow POST, code should be 405, was: " +
                         str(response))
        self.assertIn('PUT', str(response), "Should mention using PUT in response, response body was: " +
                      str(response))

    def test_send_to_multiple(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co', 'admin@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_to_multiple',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow sending to multiple addresses")

    def test_send_with_cc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'cc': ['admin@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_with_cc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow CC")

    def test_send_multiple_cc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'cc': ['admin@giftstarter.co', 'stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_multiple_cc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow multiple CCs")

    def test_send_only_cc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'cc': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_only_cc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 400, "Shouldn't send an email without the 'to' field")
        self.assertIn('to', str(response), "Should inform sender that the 'to' field is required")

    def test_send_with_bcc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'bcc': ['admin@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_with_bcc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow BCC")

    def test_send_multiple_bcc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'bcc': ['admin@giftstarter.co', 'stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_with_bcc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow multiple BCCs")

    def test_send_cc_and_bcc(self):
        # PUT /send/{email_uuid}
        # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
        email_uuid = str(uuid4())
        email_data = {
            'to': ['stuart@giftstarter.co'],
            'cc': ['admin@giftstarter.co'],
            'bcc': ['stuart@giftstarter.co'],
            'sender': ['giftconcierge@giftstarter.co'],
            'subject': 'GSTEST send_with_bcc',
            'body': 'don\'t you wish your test email was hot like me'
        }

        request = webapp2.Request.blank('/email/send.json')
        request.method = 'PUT'
        request.body = json.dumps(email_data)
        response = request.get_response(gs_email_api.handler)

        self.assertEqual(response.status_code, 200, "Should allow CCs and BCCs at same time")

    # def test_security_headers(self):
    #     # PUT /send/{email_uuid}
    #     # Data: {'to': [string], 'cc': [string], 'bcc': [string], 'from': string, 'subject': string, 'body':string}
    #     email_uuid = str(uuid4())
    #     email_data = {
    #         'to': ['stuart@giftstarter.co'],
    #         'cc': ['admin@giftstarter.co'],
    #         'bcc': ['stuart@giftstarter.co'],
    #         'sender': ['giftconcierge@giftstarter.co'],
    #         'subject': 'GSTEST security_headers',
    #         'body': 'don\'t you wish your test email was hot like me'
    #     }
    #     email_headers = {
    #
    #     }
    #
    #     request = webapp2.Request.blank('/email/send.json')
    #     request.method = 'PUT'
    #     request.body = json.dumps(email_data)
    #     request.headers.update(**email_headers)
    #     response = request.get_response(gs_email_api.handler)
    #
    #     self.assertEqual(response.status_code, 401, "Should not allow send without authentication, response was: " +
    #                      str(response))
