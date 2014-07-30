__author__ = 'stuart'

import webapp2
import comm
from giftstart import GiftStart
import core
import json
from gs_user import User


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
        if does_user_exist(data['uid'], data['token']):
            if data['action'] == 'create':
                gs = core.create(data['giftstart'])
                self.response.write(gs.jsonify)
            elif data['action'] == 'update':
                if GiftStart.get_by_id(data['gsid']).gift_champion_uid == data['uid']:
                    gs = core.update(data['giftstart'])
                    self.response.write(gs.jsonify)
                else:
                    self.response.set_status(403, 'Invalid user credentials')
            else:
                self.response.set_status(400, 'Put must create or update campaign.')
        else:
            self.response.set_status(403, 'Invalid user credentials')


def does_user_exist(uid, token):
    login_service_map = {'f': 'facebook', 'g': 'googleplus', 't': 'twitter'}
    if uid[0] not in login_service_map.keys():
        return False
    token_map = {'f': lambda u: u.facebook_token_set.access_token,
                 'g': lambda u: u.googleplus_token_set.access_token,
                 't': lambda u: u.twitter_token_set.access_token}
    users = User.query(User.uid == uid, User.logged_in_with == login_service_map[uid[0]]).fetch(1)
    if len(users) != 1:
        return False
    user_exists = token == token_map[uid[0]](users[0])
    return user_exists

api = webapp2.WSGIApplication([('/giftstart/api', GiftStartHandler)], debug=True)