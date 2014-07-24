__author__ = 'stuart'

import json
from google.appengine.api import taskqueue
from datetime import datetime, timedelta
from GiftStart import GiftStart
import storage.image_cache
import comm

GIFTSTART_CAMPAIGN_DAYS = 10
SECONDS_PER_DAY = 24 * 60 * 60


def populate_giftstart(ndbgs, giftstart):
    ndbgs.gift_champion_uid = giftstart['gift_champion_uid']
    ndbgs.giftstart_title = giftstart['title']
    ndbgs.giftstart_description = giftstart['description']
    ndbgs.giftstart_special_notes = giftstart['special_notes']

    ndbgs.product_url = giftstart['product']['product_url']
    ndbgs.product_img_url = giftstart['product']['img_url']
    ndbgs.product_price = int(giftstart['product']['price'])
    ndbgs.sales_tax = int(giftstart['product']['sales_tax'])
    ndbgs.shipping = int(giftstart['product']['shipping'])
    ndbgs.service_fee = int(giftstart['product']['service_fee'])
    ndbgs.total_price = int(giftstart['product']['total_price'])

    ndbgs.overlay_columns = giftstart['columns']
    ndbgs.overlay_rows = giftstart['rows']

    ndbgs.gc_name = giftstart['gc_name']
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

    comm.send_create_notification(gs)

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'one-day-warning', 'gsid': gs.gsid}),
                  countdown=((GIFTSTART_CAMPAIGN_DAYS - 1) * SECONDS_PER_DAY))

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'check-if-complete', 'gsid': gs.gsid}),
                  countdown=(GIFTSTART_CAMPAIGN_DAYS * SECONDS_PER_DAY + 180))

    return gs


def get_by_id(giftstart_id):
    results = GiftStart.query(GiftStart.gsid == giftstart_id).fetch(1)
    result = results[0] if len(results) > 0 else None
    return result

