""" Finds the campaign for supplied thanks secret, and redirects user to
 that page with the secret attached in query params
"""

__author__ = 'Stuart'

import webapp2
import thank_core
from giftstart import GiftStart
import json
from storage import image_cache


class ThankHandler(webapp2.RequestHandler):

    def get(self):
        gsid = thank_core.decode_secret(self.request.path.split('-')[-1])
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch(1)
        if len(gss) > 0:
            gs = gss[0]
            if not gs.thanked:
                self.redirect('/giftstart/' + gs.giftstart_url_title +
                              '?thanks=' + self.request.path.split('-')[-1])
            else:
                self.redirect('/giftstart/' + gs.giftstart_url_title)
        else:
            self.response.set_status(403, "Not Allowed")

    def put(self):
        data = json.loads(self.request.body)
        gsid = thank_core.decode_secret(self.request.path.split('-')[-1])
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch(1)
        if gsid == data.get('gsid') and len(gss) > 0:
            gs = gss[0]
            if 'message' not in data:
                self.response.set_status(400, "Expected message")
            else:
                img_url = image_cache.cache_thanks_image(gsid, data.get('img'))
                gs.thanked = True
                gs.thanks_message = data['message']
                gs.thanks_img_url = img_url
                gs.put()
        else:
            self.response.set_status(403, "Not Allowed")


def store_thanks_img(img_data):
    pass


handler = webapp2.WSGIApplication([('/thanks-.*', ThankHandler)], debug=True)
