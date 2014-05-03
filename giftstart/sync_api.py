__author__ = 'stuart'

import webapp2
from giftstart import GiftStart
import json


def sync_gs_parts(gsid, client_parts):
    """
    :param parts: this version of client's parts
    :return: response string - empty array if no update, array of updated parts if updated
    """

    # Collapse part lists
    gs = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
    gs_parts = []
    map(gs_parts.extend, json.loads(gs.overlay_parts))

    parts = []
    map(parts.extend, client_parts)

    def is_part_bought(part_id):
        for p in parts:
            if p['part_id'] == part_id:
                return p['bought']
        raise ValueError("Part ID %d was not found in client parts!" % part_id)

    for part in gs_parts:
        if part['bought']:
            if ~is_part_bought(int(part['part_id'])):
                return gs.overlay_parts

    return "[]"


class GiftStartSyncHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'sync':
            self.response.write(sync_gs_parts(data['gsid'], data['parts']))


sync_api = webapp2.WSGIApplication([('/giftstart/sync', GiftStartSyncHandler)], debug=True)