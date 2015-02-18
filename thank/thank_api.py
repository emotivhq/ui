""" Finds the campaign for supplied thanks secret, and redirects user to
 that page with the secret attached in query params
"""

__author__ = 'GiftStarter'

import webapp2
import thank_core
from giftstart import GiftStart
from google.appengine.ext import ndb
import json
from storage import image_cache
from uuid import uuid4
import logging


class ThankHandler(webapp2.RequestHandler):

    def get(self):
        gsid = thank_core.decode_secret(self.request.path.split('-')[-1])
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch(1)
        if len(gss) > 0:
            gs = gss[0]
            self.redirect('/giftstart/' + gs.giftstart_url_title +
                          '/thanks/edit?thanks=' +
                          self.request.path.split('-')[-1])
        else:
            logging.warning("Invalid thanks code used in get")
            self.response.set_status(403, "Not Allowed")

    def put(self):
        data = json.loads(self.request.body)
        if len(self.request.path.split('-')) > 1:
            gsid = thank_core.decode_secret(self.request.path.split('-')[-1])
            gss = GiftStart.query(GiftStart.gsid == gsid).fetch(1)
            if gsid == data.get('gsid') and len(gss) > 0:
                gs = gss[0]
                if 'message' not in data:
                    logging.warning("No message found in thanks")
                    self.response.set_status(400, "Expected message")
                else:
                    thanked_yet = gs.thanked
                    img_url = cache_thanks_img(gsid, data.get('img'))
                    gs.thanked = True
                    gs.thanks_message = data['message']
                    gs.thanks_img_url = img_url
                    gs.thanks_uid = data.get('uid')
                    gs.put()

                    if not thanked_yet:
                        thank_core.send_emails(gs.giftstart_url_title)

                    self.response.write(gs.jsonify())
            else:
                logging.warning("Decode for code failed or no campaign found")
                self.response.set_status(403, "Not Allowed")
        else:
            # Not thanks from card, may be editing
            gs_key = ndb.Key('GiftStart', data['url_title'])
            gs = gs_key.get()
            if gs:
                if gs.thanks_uid == data['uid']:
                    img_url = cache_thanks_img(gs.gsid, data.get('img'))
                    gs.thanks_message = data.get('message') if \
                        data.get('message') else gs.thanks_message
                    gs.thanks_img_url = img_url if img_url \
                        else gs.thanks_img_url
                    if data.get('message') or img_url:
                        gs.put()
                    self.response.write(gs.jsonify())
                else:
                    logging.warning("Invalid user details for editing thanks")
                    self.response.set_status(403, "Invalid user")
            else:
                logging.warning("Invalid campaign url title for thanks")
                self.response.set_status(400, "Invalid campaign")


def cache_thanks_img(gsid, image):
    if image is None:
        return None
    content_type = image.split(';')[0].split(':')[1]
    base64data = ','.join(image.split(',')[1:])
    img_data = base64data.decode('base64', 'strict')
    filename = str(uuid4())
    return image_cache.cache_thanks_image(img_data, filename, gsid, content_type)



handler = webapp2.WSGIApplication([('/thanks.*', ThankHandler)], debug=True)
