"""
PUT endpoints for triggering raw emails, or templated emails, with supplied params
"""

__author__ = 'GiftStarter'


import webapp2
import gs_email_comm
import json
from google.appengine.ext import ndb
from google.appengine.api import taskqueue
import logging
from gs_email.gs_email_preview import EmailPreviewHandler
import requests
import yaml
import re
from share import email_share
from gs_user.gs_user_api import getUidFromCookies, getTokenFromCookies, validate

REQUIRED_PARAMS = ['to', 'sender', 'subject', 'body']
REQUIRED_PARAMS_TEMPLATE = ['to', 'sender', 'subject', 'template_name',
                            'template_kwargs']
SEND_PARAMS = ['to', 'sender', 'cc', 'bcc', 'subject', 'body', 'mime_type',
               'img_url']
TEMPLATE_PARAMS = ['to', 'sender', 'cc', 'bcc', 'subject', 'template_name',
                   'template_kwargs', 'mime_type', 'img_url', 'user_name',
                   'giftstart_it_url', 'thank_you_link']
EMAIL_PARAMS = ['to', 'sender', 'cc', 'bcc']

config = yaml.load(open('config.yaml'))

validEmailRegex = re.compile( "^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$", re.IGNORECASE)

class SentEmail(ndb.Model):
    uuid = ndb.StringProperty(required=True)


class SendHandler(webapp2.RequestHandler):
    """PUT handler to send an abstract email; see EMAIL_PARAMS"""
    def get(self):
        self.response.set_status(405, "GET not allowed, only PUT is valid.")

    def post(self):
        self.response.set_status(405, "POST not allowed, only PUT is valid.")

    def put(self):
        logging.debug("Request body:\n" + self.request.body)
        params = json.loads(self.request.body)
        email_addresses = [v for k, v in params.items() if k in EMAIL_PARAMS]

        def email_invalid(addr):
            test = lambda a: ('@' not in a) | ('.' not in a)
            if isinstance(addr, list):
                return any(map(test, addr))
            return test(addr)

        # Check for request errors
        if set(REQUIRED_PARAMS).union(set(params.keys())) != set(params.keys()) and \
                        set(REQUIRED_PARAMS_TEMPLATE).union(set(params.keys())) != set(params.keys()):
            logging.debug("Doesn't contain all required params.")
            self.response.set_status(400, "Doesn't contain all required params.  Required params are: " +
                                     ", ".join(REQUIRED_PARAMS))

        # Check for valid emails
        elif any(map(email_invalid, email_addresses)):
            logging.debug("Invalid email address sent.")
            self.response.set_status(400, "Invalid email address sent.")

        elif 'template_name' in params and params.get('template_name') not in gs_email_comm.EMAIL_TEMPLATES.keys():
            logging.debug("Invalid template name.")
            self.response.set_status(400, "Invalid template name")

        # Looks good, ship'em!
        else:
            logging.log(20, "params look good, sending...")
            taskqueue.add(url="/email/sendfromqueue", method="PUT",
                          payload=json.dumps(dict(params.items())))


class FromQueueHandler(webapp2.RequestHandler):
    """PUT handler to send an email for a specific template; see TEMPLATE_PARAMS"""
    def put(self):
        params = json.loads(self.request.body)
        if 'template_name' in params:
            gs_email_comm.send_from_template(**{k: v
                                                for k, v in params.items()
                                                if k in TEMPLATE_PARAMS})
        else:
            gs_email_comm.send(**{k: v for k, v in params.items() if k in SEND_PARAMS})

class ShareCampaignHandler(webapp2.RedirectHandler):
    """PUT handler to send an email for a specific template; see TEMPLATE_PARAMS"""
    def put(self):
        uid = getUidFromCookies(self.request)
        token = getTokenFromCookies(self.request)
        if not validate(uid, token, self.request.path):
            raise Exception("You must be logged in to send email")
        user = ndb.Key('User', uid).get()
        params = json.loads(self.request.body)
        to = params["to"]
        message = "<br />".join(params["message"].split("\n"))
        share_url = params["share_url"]
        gsid = params["gsid"]
        try:
            # if from_email == None or not validEmailRegex.match(from_email):
            #     raise Exception("A valid email address is required.")
            email_share(to, user.email if user.email is not None else "giftconcierge@giftstarter.com", message, gsid, user.name, share_url, user.uid)
            self.response.write(json.dumps({"ok": "Success!"}))
        except Exception as e:
            self.response.set_status(403)
            self.response.write(json.dumps({"error": e.message}))

class ContactUsHandler(webapp2.RedirectHandler):
    """PUT handler to send an email for a specific template; see TEMPLATE_PARAMS"""
    def put(self):
        params = json.loads(self.request.body)
        from_email = params["from_email"]
        try:
            if from_email == None or not validEmailRegex.match(from_email):
                raise Exception("A valid email address is required.")
            msg = ""
            for name in params:
                if name != "from_email":
                    msg += "{0}: {1} \n".format(name, params[name])

            requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "Contact Us Message",
                     'sender': "giftconcierge@giftstarter.com",
                     'mime_type': 'html',
                     'to': "giftconcierge@giftstarter.com",
                     'template_name': "contact_us",
                     'template_kwargs': { "from_email" : from_email,
                                          "msg" : msg }
                 }))
            self.response.write(json.dumps({"ok": "Success!"}))
        except Exception as e:
            self.response.set_status(403)
            self.response.write(json.dumps({"error": e.message}))


handler = webapp2.WSGIApplication([
    ('/email/send.json', SendHandler),
    ('/email/sendfromqueue', FromQueueHandler),
    ('/email/preview/.*', EmailPreviewHandler),
    ('/email/contactus.json', ContactUsHandler),
    ('/email/sharecampaign.json', ShareCampaignHandler)
], debug=True)
