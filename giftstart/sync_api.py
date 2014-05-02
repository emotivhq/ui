__author__ = 'stuart'

import webapp2
from giftstart import GiftStart
import json


class GiftStartSyncHandler(webapp2.RequestHandler):

    def post(self):
        pass
    # TODO! implement the sync api


sync_api = webapp2.WSGIApplication([('/giftstart/sync', GiftStartSyncHandler)], debug=True)