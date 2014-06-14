__author__ = 'stuart'

import json
from google.appengine.api import taskqueue
from datetime import datetime, timedelta
from GiftStart import GiftStart
import storage.image_cache
import gs_email.comm

GIFTSTART_CAMPAIGN_DAYS = 10
SECONDS_PER_DAY = 24 * 60 * 60


def populate_giftstart(ndbgs, giftstart):
    ndbgs.gift_champion_uid = giftstart['gift_champion_uid']
    ndbgs.giftstart_title = giftstart['title']
    ndbgs.giftstart_description = giftstart['description']
    ndbgs.giftstart_special_notes = giftstart['special_notes']

    ndbgs.product_url = giftstart['product']['product_url']
    ndbgs.product_price = int(giftstart['product']['price'])
    ndbgs.product_img_url = giftstart['product']['img_url']

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

    parts = [{'bought': part['bought'], 'value': part['value'], 'selected': False, 'part_id': part['part_id']}
             for part in giftstart['parts']]
    ndbgs.overlay_parts = json.dumps(parts)
    return ndbgs


def create(giftstart):
    gs = GiftStart()
    gs = populate_giftstart(gs, giftstart)
    gs_count = GiftStart.query().count()
    gs.gsid = str(gs_count + 1) if gs_count else '1'
    gs.deadline = datetime.now() + timedelta(days=GIFTSTART_CAMPAIGN_DAYS)
    gs.product_img_url = storage.image_cache.cache_product_image(giftstart['product']['img_url'], gs.gsid)
    gs.put()

    gs_email.comm.send("Giftstart #{gsid} created!".format(gsid=str(gs.gsid)),
                       "Check it: http://giftstarter.co/giftstart?gs-id={gsid}\n\nJsonified:\n{json}"
                       .format(gsid=str(gs.gsid), json=gs.jsonify()),
                       "giftstartbot", "stuart@giftstarter.co", ["stuart@giftstarter.co"])

    gs_email.comm.send("GiftStart Campaign Created!", "Hey there!\n\nYou've just created a GiftStarter campaign!  Nice!  The next thing to do is invite the people you'd like to contribute, and ask them to write something special!  Here's the link:\n\nhttp://giftstarter.co/giftstart?gs-id={gsid}\n\nThanks!\nStuart @ GiftStarter".format(gsid=gs.gsid), "Stuart @ GiftStarer", "stuart@giftstarter.co", gs.gc_email)

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'one-day-warning', 'gsid': gs.gsid}),
                  countdown=((GIFTSTART_CAMPAIGN_DAYS - 1) * SECONDS_PER_DAY))

    return gs


def get_by_id(giftstart_id):
    results = GiftStart.query(GiftStart.gsid == giftstart_id).fetch(1)
    result = results[0] if len(results) > 0 else None
    return result

