"""
API for the giftstart endpoint
"""

__author__ = 'stuart'

import webapp2
import giftstart_comm
from giftstart import GiftStart
import giftstart_core
import json
from gs_user import User
from google.appengine.ext import ndb


class GiftStartHandler(webapp2.RequestHandler):

    def get(self):
        gsid = self.request.get('gs-id')
        campaigns = GiftStart.query(GiftStart.gsid == gsid).fetch()
        if len(campaigns) == 1:
            self.response.write(campaigns[0].jsonify())
        else:
            self.response.set_status(404, "That campaign doesn't exist.")

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'create':
            giftstart = data['giftstart']
            gs = giftstart_core.create(giftstart)
            self.response.write(gs.jsonify())

        elif data['action'] == 'one-day-warning':
            giftstart_comm.send_day_left_warning(data['gsid'])

        elif data['action'] == 'check-if-complete':
            giftstart_comm.check_if_complete(data['gsid'])

        elif data['action'] == 'thank-givers':
            giftstart_comm.congratulate_givers(data.get('gsid'),
                                               data.get('funded'))

    def put(self):
        data = json.loads(self.request.body)
        # Check if they have permissions!
        if does_user_exist(data['uid'], data['token']):
            if data['action'] == 'create':
                campaign = find_campaign(data['giftstart'])
                if campaign is not None:
                    self.response.write(campaign.jsonify())
                else:
                    gs = giftstart_core.create(data['giftstart'])
                    self.response.write(gs.jsonify())
            elif data['action'] == 'update':
                campaign = get_campaign_by_id(data['giftstart']['gsid'])
                if campaign is not None:
                    if campaign.gift_champion_uid == data['uid']:
                        gs = giftstart_core.update(data['giftstart'])
                        self.response.write(gs.jsonify())
                    else:
                        self.response.set_status(403,
                                                 'Invalid user credentials')
                else:
                    self.response.set_status(400, 'Invalid campaign')
            else:
                self.response.set_status(400,
                                         'Put must create or update campaign.')
        else:
            self.response.set_status(403, 'Invalid user credentials')


class HotCampaignsHandler(webapp2.RequestHandler):

    def get(self):
        try:
            num_campaigns = int(self.request.get('num_campaigns'))
            campaigns = giftstart_core.hot_campaigns(num_campaigns)
            self.response.write(json.dumps(campaigns))
        except Exception as e:
            self.response.set_status(400, 'Invalid request')
            raise e


def does_user_exist(uid, token):
    login_service_map = {'f': 'facebook', 'g': 'googleplus', 't': 'twitter'}
    if uid[0] not in login_service_map.keys():
        return False
    token_map = {'f': lambda u: u.facebook_token_set.access_token,
                 'g': lambda u: u.googleplus_token_set.access_token,
                 't': lambda u: u.twitter_token_set.access_token}
    login_service = login_service_map[uid[0]]
    users = User.query(User.uid == uid,
                       User.logged_in_with == login_service).fetch(1)
    if len(users) != 1:
        return False
    user_exists = token == token_map[uid[0]](users[0])
    return user_exists


def get_campaign_by_id(gsid):
    campaigns = GiftStart.query(GiftStart.gsid == gsid).fetch()
    if len(campaigns) > 0:
        return campaigns[0]
    else:
        return None


def find_campaign(campaign):
    # Returns 0 for nonexistent campaign, returns campaign for existing
    gs = GiftStart()
    gs = giftstart_core.populate_giftstart(gs, campaign)
    giftstart = GiftStart.query(GiftStart.giftstart_title == gs.giftstart_title,
                                GiftStart.gift_champion_uid == gs.gift_champion_uid,
                                GiftStart.overlay_columns == gs.overlay_columns,
                                GiftStart.overlay_rows == gs.overlay_rows).fetch(1)
    if len(giftstart) > 0:
        if gs.giftstart_description == giftstart[0].giftstart_description:
            return giftstart[0]

    return None


class GiftStartJsonHandler(webapp2.RequestHandler):
    def get(self):
        print(self.request.path)
        url_title = self.request.path[11:-5]
        gs = ndb.Key('GiftStart', url_title).get()
        self.response.write(gs.jsonify())


handler = webapp2.WSGIApplication([('/giftstart/.*.json', GiftStartJsonHandler)],debug=True)
api = webapp2.WSGIApplication([('/giftstart/api',
                                GiftStartHandler)],
                              debug=True)
hot_campaigns = webapp2.WSGIApplication([('/giftstart/api/hot-campaigns',
                                          HotCampaignsHandler)],
                                        debug=True)