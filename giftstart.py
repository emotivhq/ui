__author__ = 'stuart'

import webapp2
import json
from google.appengine.ext import ndb


class GiftStart(ndb.Model):
    giftstart_id = ndb.StringProperty()
    giftstart_title = ndb.StringProperty()
    giftstart_description = ndb.StringProperty()
    gift_champion_uid = ndb.StringProperty()

    product_price = ndb.IntegerProperty()
    product_img_url = ndb.StringProperty()
    product_img_height = ndb.IntegerProperty()
    overlay_columns = ndb.IntegerProperty()
    overlay_rows = ndb.IntegerProperty()
    overlay_parts = ndb.JsonProperty()

    def jsonify(self):
        return json.dumps({'giftstart': {
            'gsid': self.giftstart_id, 'title': self.giftstart_title, 'description': self.giftstart_description,
            'product': {'img_url': self.product_img_url, 'price': self.product_price,
                        'img_height': self.product_img_height},
            'rows': self.overlay_rows, 'columns': self.overlay_columns, 'parts': json.loads(self.overlay_parts),
            'gift_champion_uid': self.gift_champion_uid
        }})

    @staticmethod
    def populate_giftstart(ndbgs, giftstart):
        ndbgs.gift_champion_uid = giftstart['gift_champion_uid']
        ndbgs.giftstart_title = giftstart['title']
        ndbgs.giftstart_description = giftstart['description']
        ndbgs.product_price = giftstart['product']['price']
        ndbgs.product_img_url = giftstart['product']['img_url']
        ndbgs.product_img_height = giftstart['product']['img_height']
        ndbgs.overlay_columns = giftstart['columns']
        ndbgs.overlay_rows = giftstart['rows']
        parts = [[{'bought': part['bought'], 'value': part['value']} for part in row] for row in giftstart['parts']]
        ndbgs.overlay_parts = json.dumps(parts)
        return ndbgs

    @staticmethod
    def create(giftstart):
        gs = GiftStart()
        gs = GiftStart.populate_giftstart(gs, giftstart)
        gs.giftstart_id = str(GiftStart.query().count() + 1)
        gs.put()
        return gs

    @staticmethod
    def update(giftstart):
        gs = GiftStart.query(GiftStart.giftstart_id == giftstart['gsid']).fetch(1)[0]
        gs = GiftStart.populate_giftstart(gs, giftstart)
        gs.put()
        return gs

    @staticmethod
    def get_by_id(giftstart_id):
        results = GiftStart.query(GiftStart.giftstart_id == giftstart_id).fetch(1)
        result = results[0] if len(results) > 0 else None
        return result


class GiftStartHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        action = data['action']
        print(data)
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