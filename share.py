__author__ = 'stuart'

import webapp2
import requests
import yaml
import uuid
import json
from giftstart import GiftStart

config = yaml.load(open('config.yaml'))


class EmailShareHandler(webapp2.RequestHandler):

    def put(self):
        json_body = json.loads(self.request.body)
        to = json_body['to']
        sender = json_body['from']
        message = json_body['message']
        gsid = json_body['gsid']
        sender_name = json_body['sender_name']
        email_share(to, sender, message, gsid, sender_name)


def email_share(to, sender, message, gsid, sender_name):
    gs = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    requests.put(config['email_url'] + '/send/' +
                 str(uuid.uuid4()).replace("-", ''),
                 data=json.dumps({
                     'subject': "Check Out This Awesome GiftStart!",
                     'sender': sender, 'to': to,
                     'template_name': "campaign_share_email",
                     'mime_type': 'HTML',
                     'template_kwargs': {
                         'message': message,
                         'sender_name': sender_name,
                         'sender_email': sender,
                         'gs_title': gs.giftstart_title,
                         'gs_image': gs.product_img_url,
                         'gs_description': gs.giftstart_description,
                         'gs_link': config['app_url'] + '/giftstart?gs-id=' +
                                    gsid
                     }
                 }))


email_share_handler = webapp2.WSGIApplication([('/share', EmailShareHandler)],
                                              debug=True)