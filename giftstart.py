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
    def build(giftstart):
        gs = GiftStart()
        gs.gift_champion_uid = giftstart['gift_champion_uid']
        gs.giftstart_title = giftstart['title']
        gs.giftstart_description = giftstart['description']
        gs.product_price = giftstart['product']['price']
        gs.product_img_url = giftstart['product']['img_url']
        gs.product_img_height = giftstart['product']['img_height']
        gs.overlay_columns = giftstart['columns']
        gs.overlay_rows = giftstart['rows']
        gs.overlay_parts = json.dumps(giftstart['parts'])
        gs.giftstart_id = str(GiftStart.query().count() + 1)
        return gs

    @staticmethod
    def get_by_id(giftstart_id):
        results = GiftStart.query(GiftStart.giftstart_id == giftstart_id).fetch(1)
        result = results[0] if len(results) > 0 else None
        return result


class GiftStartHandler(webapp2.RequestHandler):

    # def get(self):
    #     data = json.loads(self.request.body)
    #     action = data['action']
    #     if action == 'get':
    #         giftstart_id = data['giftstart_id']
    #         self.response.write(GiftStart.get_by_id(giftstart_id).jsonify())

    def post(self):
        data = json.loads(self.request.body)
        action = data['action']
        print(data)
        if action == 'create':
            giftstart = data['giftstart']
            gs = GiftStart.build(giftstart)
            gs.put()

            self.response.write(gs.jsonify())
        elif action == 'get':
            giftstart_id = data['giftstart_id']
            self.response.write(GiftStart.get_by_id(giftstart_id).jsonify())

api = webapp2.WSGIApplication([('/giftstart', GiftStartHandler)], debug=True)