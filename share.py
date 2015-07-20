"""send emails to share a GiftStart"""
__author__ = 'GiftStarter'

import webapp2
import requests
import yaml
import json
from giftstart import GiftStart
from gs_user import User

config = yaml.load(open('config.yaml'))


class EmailShareHandler(webapp2.RequestHandler):
    """handle JSON requests to share a GiftStart"""

    def put(self):
        """accept JSON {to,sender,message,gsid,sender_name,share_url,sender_uid} and send a sharing email"""
        json_body = json.loads(self.request.body)
        to = json_body['to']
        sender = json_body['from']
        message = json_body['message']
        gsid = json_body['gsid']
        sender_name = json_body['sender_name']
        share_url = json_body['share_url']
        sender_uid = json_body.get('sender_uid')
        email_share(to, sender, message, gsid, sender_name, share_url,
                    sender_uid)


def email_share(to, sender, message, gsid, sender_name, share_url, sender_uid):
    """
    enqueue an email to share the specified giftstart with someone
    @param to:
    @param sender:
    @param message:
    @param gsid:
    @param sender_name:
    @param share_url:
    @param sender_uid:
    """
    gs = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "Join us on a gift together",
                     'sender': sender, 'to': to,
                     'template_name': "campaign_share_email",
                     'mime_type': 'html',
                     'img_url': gs.product_img_url,
                     'template_kwargs': {
                         'message': message,
                         'sender_name': sender_name,
                         'sender_email': sender,
                         'campaign_name': gs.giftstart_title,
                         'campaign_link': share_url,
                         'frame': 'base_frame'
                     }
                 }))


email_share_handler = webapp2.WSGIApplication([('/giftstart/share', EmailShareHandler)],
                                              debug=True)
