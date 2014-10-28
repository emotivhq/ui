__author__ = 'Stuart'

import webapp2
from google.appengine.ext import ndb
import json
import giftstart_core


class GiftStartJsonHandler(webapp2.RequestHandler):
    def get(self):
        url_title = self.request.path[11:-5]
        if url_title != 'undefined':
            gs = ndb.Key('GiftStart', url_title).get()
            if gs is None:
                self.response.set_status(404)
            elif gs.gift_champion_uid:
                self.response.write(gs.jsonify())
            else:
                self.response.set_status(404)
        else:
            self.response.set_status(404)

    def post(self):
        gs = json.loads(self.request.body)
        url_title = self.request.path.split('/')[2][:-5]
        # Check if they have permissions!
        if giftstart_core.does_user_exist(self.request.cookies['uid'],
                                          self.request.cookies['token']):
            ndbgs = ndb.Key('GiftStart', url_title).get()
            if ndbgs is not None:
                if ndbgs.gift_champion_uid == self.request.cookies['uid']:
                    gs = giftstart_core.update(gs)
                    self.response.write(gs.jsonify())
                else:
                    self.response.set_status(403,
                                             'Invalid user credentials')
            else:
                self.response.set_status(400, 'Invalid campaign')
        else:
            self.response.set_status(403, 'Invalid user credentials')

