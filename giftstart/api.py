__author__ = 'stuart'

import webapp2
import comm
from giftstart import GiftStart
import core
import json


class GiftStartHandler(webapp2.RequestHandler):

    def get(self):
        gsid = self.request.get('gsid')
        self.response.write(GiftStart.get_by_id(gsid).jsonify())

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'create':
            giftstart = data['giftstart']
            gs = core.create(giftstart)
            self.response.write(gs.jsonify())

        elif data['action'] == 'one-day-warning':
            comm.send_day_left_warning(data['gsid'])

        elif data['action'] == 'check-if-complete':
            comm.check_if_complete(data['gsid'])

    def put(self):
        data = json.loads(self.request.body)
        # Check if they have permissions!
        user = get_user(data['uid'], data['token'])
        if user is not None:
            if data['action'] == 'create':
                gs = core.create(data['giftstart'])
                self.response.write(gs.jsonify)
            elif data['action'] == 'update':
                if GiftStart.get_by_id(data['gsid']).gift_champion_uid == user.uid:
                    gs = core.update(data['giftstart'])
                    self.response.write(gs.jsonify)
                else:
                    self.response.set_status(403, 'Invalid user credentials')
            else:
                self.response.set_status(400, 'Put must create or update campaign.')
        else:
            self.response.set_status(403, 'Invalid user credentials')


api = webapp2.WSGIApplication([('/giftstart/api', GiftStartHandler)], debug=True)