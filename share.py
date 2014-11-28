__author__ = 'stuart'

import webapp2
import requests
import yaml
import json
from giftstart import GiftStart
from gs_user import User

config = yaml.load(open('config.yaml'))


class EmailShareHandler(webapp2.RequestHandler):

    def put(self):
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
    gs = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    if sender_uid != -1 and sender_uid:
        sender_img = User.query(User.uid == sender_uid).fetch()[0].cached_profile_image_url
    else:
        sender_img = None
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "Check Out This Awesome GiftStart!",
                     'sender': sender, 'to': to,
                     'template_name': "campaign_share_email",
                     'mime_type': 'html',
                     'img_url': gs.product_img_url,
                     'template_kwargs': {
                         'message': message,
                         'sender_name': sender_name,
                         'sender_email': sender,
                         'sender_img': sender_img,
                         'gs_title': gs.giftstart_title,
                         'gs_image': gs.product_img_url,
                         'gs_description': gs.giftstart_description,
                         'gs_link': share_url,
                         'campaign_link': share_url,
                         'frame': 'base_frame',
                         'product_img_url': gs.product_img_url,
                     }
                 }))


email_share_handler = webapp2.WSGIApplication([('/giftstart/share', EmailShareHandler)],
                                              debug=True)
