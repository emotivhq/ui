__author__ = 'stuart'

import webapp2
from giftstart import GiftStart
import json


def sync_gs_parts(gsid, client_parts):
    """
    :param parts: this version of client's parts
    :return: response string - empty array if no update, array of updated parts if updated
    """

    gs = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
    gs_parts = json.loads(gs.overlay_parts)

    def is_part_bought(part_id):
        return client_parts[part_id]['bought']

    for part in gs_parts:
        if part['bought']:
            if not is_part_bought(int(part['part_id'])):
                return gs.overlay_parts

    return "[]"


class GiftStartSyncHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'sync':
            self.response.write(sync_gs_parts(data['gsid'], data['parts']))


sync_api = webapp2.WSGIApplication([('/giftstart/sync', GiftStartSyncHandler)], debug=True)