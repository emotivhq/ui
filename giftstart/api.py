__author__ = 'stuart'

import webapp2
import comm
from giftstart import GiftStart
import core
import json


class GiftStartHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'create':
            giftstart = data['giftstart']
            gs = core.create(giftstart)
            self.response.write(gs.jsonify())

        elif data['action'] == 'get':
            giftstart_id = data['gsid']
            self.response.write(GiftStart.get_by_id(giftstart_id).jsonify())

        elif data['action'] == 'one-day-warning':
            comm.send_day_left_warning(data['gsid'])

        elif data['action'] == 'check-if-complete':
            comm.check_if_complete(data['gsid'])


api = webapp2.WSGIApplication([('/giftstart/api', GiftStartHandler)], debug=True)