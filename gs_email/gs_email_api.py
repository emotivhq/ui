"""
API for email sending service.
"""

__author__ = 'Stuart'


import webapp2
import gs_email_comm
import json
from google.appengine.ext import ndb
from google.appengine.api import taskqueue
import logging

REQUIRED_PARAMS = ['to', 'sender', 'subject', 'body']
REQUIRED_PARAMS_TEMPLATE = ['to', 'sender', 'subject', 'template_name',
                            'template_kwargs']
SEND_PARAMS = ['to', 'sender', 'cc', 'bcc', 'subject', 'body', 'mime_type',
               'img_url']
TEMPLATE_PARAMS = ['to', 'sender', 'cc', 'bcc', 'subject', 'template_name',
                   'template_kwargs', 'mime_type', 'img_url']
EMAIL_PARAMS = ['to', 'sender', 'cc', 'bcc']


class SentEmail(ndb.Model):
    uuid = ndb.StringProperty(required=True)


class SendHandler(webapp2.RequestHandler):
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
            logging.debug("Invalid tempalte name.")
            self.response.set_status(400, "Invalid template name")

        # Looks good, ship'em!
        else:
            logging.log(20, "params look good, sending...")
            taskqueue.add(url="/email/sendfromqueue", method="PUT",
                          payload=json.dumps(dict(params.items())))


class FromQueueHandler(webapp2.RequestHandler):

    def put(self):
        params = json.loads(self.request.body)
        if 'template_name' in params:
            gs_email_comm.send_from_template(**{k: v
                                                for k, v in params.items()
                                                if k in TEMPLATE_PARAMS})
        else:
            gs_email_comm.send(**{k: v for k, v in params.items() if k in SEND_PARAMS})


handler = webapp2.WSGIApplication([
    ('/email/send.json', SendHandler),
    ('/email/sendfromqueue', FromQueueHandler)
], debug=True)
