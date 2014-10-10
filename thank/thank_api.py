""" Finds the campaign for supplied thanks secret, and redirects user to
 that page with the secret attached in query params
"""

__author__ = 'Stuart'

import webapp2
import thank_core
from giftstart import GiftStart


class ThankHandler(webapp2.RequestHandler):

    def get(self):
        gsid = thank_core.decode_secret(self.request.path.split('-')[-1])
        gs = GiftStart.query(GiftStart.gsid == gsid).fetch(1)
        if len(gs) > 0:
            gs = gs[0]
            if not gs.thanked:
                self.redirect('/giftstart/' + gs.giftstart_url_title +
                              '?thanks=' + self.request.path.split('-')[-1])
            else:
                self.redirect('/giftstart/' + gs.giftstart_url_title)
        else:
            self.response.set_status(403, "Not Allowed")

handler = webapp2.WSGIApplication([('/thanks-.*', ThankHandler)], debug=True)
