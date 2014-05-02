__author__ = 'stuart'

import webapp2
from giftstart import GiftStart
import json


class GiftStartHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        action = data['action']
        if action == 'create':
            giftstart = data['giftstart']
            gs = GiftStart.create(giftstart)
            self.response.write(gs.jsonify())

        elif action == 'update':
            giftstart = data['giftstart']
            gs = GiftStart.update(giftstart)
            self.response.write(gs.jsonify())

        elif action == 'get':
            giftstart_id = data['giftstart_id']
            self.response.write(GiftStart.get_by_id(giftstart_id).jsonify())

api = webapp2.WSGIApplication([('/giftstart', GiftStartHandler)], debug=True)