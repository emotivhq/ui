__author__ = 'stuart'

import json
from google.appengine.ext import ndb
from pay import PitchIn
import gs_email
from gs_user import User
from google.appengine.api import taskqueue
from datetime import datetime, timedelta

GIFTSTART_CAMPAIGN_DAYS = 7


class GiftStart(ndb.Model):
    gsid = ndb.StringProperty(required=True)
    giftstart_title = ndb.StringProperty(required=True)
    giftstart_description = ndb.StringProperty(required=True)
    gift_champion_uid = ndb.StringProperty(required=True)
    deadline = ndb.DateTimeProperty(required=True)

    product_url = ndb.StringProperty(required=True)
    product_price = ndb.IntegerProperty(required=True)
    product_img_url = ndb.StringProperty(required=True)
    product_img_height = ndb.IntegerProperty(required=True)

    overlay_columns = ndb.IntegerProperty(required=True)
    overlay_rows = ndb.IntegerProperty(required=True)
    overlay_parts = ndb.JsonProperty(required=True)

    gc_phone_number = ndb.StringProperty(required=True)
    gc_email = ndb.StringProperty(required=True)

    shipping_name = ndb.StringProperty(required=True)
    shipping_address = ndb.StringProperty(required=True)
    shipping_city = ndb.StringProperty(required=True)
    shipping_state = ndb.StringProperty(required=True)
    shipping_zip = ndb.StringProperty(required=True)
    shipping_phone_number = ndb.StringProperty(required=True)

    def jsonify(self):
        return json.dumps({'giftstart': {
            'gsid': self.gsid, 'title': self.giftstart_title, 'description': self.giftstart_description,
            'product': {'img_url': self.product_img_url, 'price': self.product_price,
                        'img_height': self.product_img_height},
            'rows': self.overlay_rows, 'columns': self.overlay_columns, 'parts': json.loads(self.overlay_parts),
            'gift_champion_uid': self.gift_champion_uid, 'deadline': self.deadline.strftime("%s")
        }})

    @staticmethod
    def populate_giftstart(ndbgs, giftstart):
        ndbgs.gift_champion_uid = giftstart['gift_champion_uid']
        ndbgs.giftstart_title = giftstart['title']
        ndbgs.giftstart_description = giftstart['description']

        ndbgs.product_url = giftstart['product']['product_url']
        ndbgs.product_price = int(giftstart['product']['price']*100)
        ndbgs.product_img_url = giftstart['product']['img_url']
        ndbgs.product_img_height = giftstart['product']['img_height']

        ndbgs.overlay_columns = giftstart['columns']
        ndbgs.overlay_rows = giftstart['rows']

        ndbgs.gc_phone_number = giftstart['gc_phone_number']
        ndbgs.gc_email = giftstart['gc_email']

        ndbgs.shipping_name = giftstart['shipping_name']
        ndbgs.shipping_address = giftstart['shipping_address']
        ndbgs.shipping_city = giftstart['shipping_city']
        ndbgs.shipping_state = giftstart['shipping_state']
        ndbgs.shipping_zip = giftstart['shipping_zip']
        ndbgs.shipping_phone_number = giftstart['shipping_phone_number']

        parts = [[{'bought': part['bought'], 'value': part['value'], 'selected': False, 'part_id': part['part_id']}
                  for part in row] for row in giftstart['parts']]
        ndbgs.overlay_parts = json.dumps(parts)
        return ndbgs

    @staticmethod
    def create(giftstart):
        gs = GiftStart()
        gs = GiftStart.populate_giftstart(gs, giftstart)
        gs_count = GiftStart.query().count()
        gs.gsid = str(gs_count + 1) if gs_count else '1'
        gs.deadline = datetime.now() + timedelta(days=GIFTSTART_CAMPAIGN_DAYS)
        gs.put()
        return gs

    @staticmethod
    def update(giftstart):
        gs = GiftStart.query(GiftStart.gsid == giftstart['gsid']).fetch(1)[0]
        gs = GiftStart.populate_giftstart(gs, giftstart)
        gs.put()
        return gs

    @staticmethod
    def get_by_id(giftstart_id):
        results = GiftStart.query(GiftStart.gsid == giftstart_id).fetch(1)
        result = results[0] if len(results) > 0 else None
        return result


def register_purchased_parts(gsid, purchased_parts, uid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
    parts = json.loads(giftstart.overlay_parts)
    for part_id in purchased_parts:
        if part_id < giftstart.overlay_rows*giftstart.overlay_columns:
            parts[int(part_id/giftstart.overlay_columns)][part_id % giftstart.overlay_columns]['bought'] = True
            parts[int(part_id/giftstart.overlay_columns)][part_id % giftstart.overlay_columns]['img'] = \
                'http://storage.googleapis.com/giftstarter-pictures/u/' + str(uid) + '.jpg'
    giftstart.overlay_parts = json.dumps(parts)
    giftstart.put()
    taskqueue.add(url="/giftstart", method="POST", payload=json.dumps({'action': 'check-if-complete', 'gsid': gsid}),
                  countdown=60)


def get_purchased_parts(gsid):
    return GiftStart.query(gsid).fetch()[0].overlay_parts


def giftstart_complete(gsid):
    print("Checking if giftstart %s is complete!" % gsid)
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
    # Check if all parts have been bought
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    gift_champion = User.query(User.uid == giftstart.gift_champion_uid)
    num_pitch_ins = sum([len(pitch_in.parts) for pitch_in in pitch_ins])
    available_parts = giftstart.overlay_rows * giftstart.overlay_columns

    if num_pitch_ins > available_parts:
        # Something has gone wrong, notify GS
        gs_email.send("GiftStart Error!!!", "Too many parts have been sold for GS#%s!" % giftstart.gsid,
                      "Stuart Robot", "stuart@giftstarter.co", ["stuart@giftstarter.co", "arry@giftstarter.co"])
    if num_pitch_ins >= available_parts:
        # All parts have been bought!  Send notifications to givers...
        # TODO: woops, only canvas apps can send notifications :/
        # for pitch_in in pitch_ins:
        #     user = User.query(User.uid == pitch_in.uid).fetch()[0]
        #     access_token = user.lt_access_token if user.lt_access_token else user.access_token
        #     facebook.send_notification(access_token, "GiftStart #%s has been completed! Nice work!" % gsid,
        #                                "")#"#/giftstart?gs-id=%s" % gsid)

        # Send email congratulating the gift champion, too!
        gs_email.send("GiftStart Complete!", "GiftStart #%s has been completed! Nice work!" % giftstart.gsid,
                      "Stuart at GiftStarter", "stuart@giftstarter.co", [gift_champion.email])

        # And email GiftStarter personnel...
        gs_email.send("GiftStart Complete!", "GiftStart #%s has been completed! Nice work!" % giftstart.gsid,
                      "Stuart Robot", "stuart@giftstarter.co", ["stuart@giftstarter.co", "arry@giftstarter.co"])

