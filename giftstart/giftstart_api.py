"""
API for the giftstart endpoint
"""

__author__ = 'GiftStarter'

import webapp2
import giftstart_comm
from giftstart import GiftStart
import giftstart_core
import json
from gs_user import User
from giftstart.giftstart_create import GiftStartCreateHandler
from giftstart.giftsart_json import GiftStartJsonHandler
from giftstart.giftstart_query import GiftStartQueryHandler


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
            try:
                giftstart = data['giftstart']
                gs = giftstart_core.create(giftstart)
                self.response.write(gs.jsonify())
            except:
                self.response.set_status(400, 'Invalid giftstart submitted')

        elif data['action'] == 'one-day-warning':
            giftstart_comm.send_day_left_warning(data['gsid'])

        elif data['action'] == 'check-if-complete':
            giftstart_comm.check_if_complete(data['gsid'])

        elif data['action'] == 'thank-givers':
            giftstart_comm.congratulate_givers(data.get('gsid'),
                                               data.get('funded'))


class HotCampaignsHandler(webapp2.RequestHandler):

    def get(self):
        try:
            num_campaigns = int(self.request.get('num_campaigns'))
            campaigns = giftstart_core.hot_campaigns(num_campaigns)
            self.response.write(json.dumps(campaigns))
        except Exception as e:
            self.response.set_status(400, 'Invalid request')
            raise e



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


handler = webapp2.WSGIApplication(
    [('/giftstart/create.json', GiftStartCreateHandler),
     ('/giftstart/.*.json', GiftStartJsonHandler),
     ('/giftstarts.json', GiftStartQueryHandler),
     ], debug=True)
api = webapp2.WSGIApplication([('/giftstart/api',
                                GiftStartHandler)],
                              debug=True)
hot_campaigns = webapp2.WSGIApplication([('/giftstart/api/hot-campaigns',
                                          HotCampaignsHandler)],
                                        debug=True)