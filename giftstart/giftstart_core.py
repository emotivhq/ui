__author__ = 'stuart'

import json
from google.appengine.api import taskqueue
from datetime import datetime, timedelta
from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import storage.image_cache
import giftstart_comm
import os

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
    ndbgs.product_title = giftstart['product']['title']
    ndbgs.retailer_logo = giftstart['product']['retailer_logo']
    ndbgs.sales_tax = int(giftstart['product']['sales_tax'])
    ndbgs.shipping = int(giftstart['product']['shipping'])
    ndbgs.service_fee = int(giftstart['product']['service_fee'])
    ndbgs.total_price = int(giftstart['product']['total_price'])

    ndbgs.overlay_columns = giftstart['columns']
    ndbgs.overlay_rows = giftstart['rows']

    ndbgs.gc_name = giftstart.get('gc_name')
    ndbgs.gc_phone_number = giftstart.get('gc_phone_number')
    ndbgs.gc_email = giftstart['gc_email']

    ndbgs.shipping_name = giftstart.get('shipping_name')
    ndbgs.shipping_address = giftstart.get('shipping_address')
    ndbgs.shipping_city = giftstart.get('shipping_city')
    ndbgs.shipping_state = giftstart['shipping_state']
    ndbgs.shipping_zip = giftstart['shipping_zip']
    ndbgs.shipping_phone_number = giftstart.get('shipping_phone_number')
    ndbgs.shipping_email = giftstart.get('shipping_email')

    return ndbgs


def create(giftstart):
    gs = GiftStart()
    gs = populate_giftstart(gs, giftstart)
    gs_count = GiftStart.query().count()
    gs.gsid = str(gs_count + 1) if gs_count else '1'
    gs.deadline = datetime.now() + timedelta(days=GIFTSTART_CAMPAIGN_DAYS)
    # Check if running in development env
    if not os.environ['SERVER_SOFTWARE'].startswith('Development'):
        gs.product_img_url = storage.image_cache.cache_product_image(giftstart['product']['img_url'], gs.gsid)
    gs.put()

    giftstart_comm.send_create_notification(gs)

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'one-day-warning', 'gsid': gs.gsid}),
                  countdown=((GIFTSTART_CAMPAIGN_DAYS - 1) * SECONDS_PER_DAY))

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'check-if-complete', 'gsid': gs.gsid}),
                  countdown=(GIFTSTART_CAMPAIGN_DAYS * SECONDS_PER_DAY + 180))

    return gs


def update(gs):
    giftstart = GiftStart.query(GiftStart.gsid == gs['gsid']).fetch(1)[0]

    for k, v in gs.items():
        if k == 'title':
            giftstart.giftstart_title = gs['title']

        elif k == 'description':
            giftstart.giftstart_description = gs['description']

        elif k == 'image':
            content_type = v['data'].split(';')[0].split(':')[1]
            base64data = ','.join(v['data'].split(',')[1:])
            img_data = base64data.decode('base64', 'strict')
            giftstart.product_img_url = storage.image_cache.cache_user_uploaded_image(img_data, v['filename'],
                                                                                      gs['gsid'], content_type)

    giftstart.put()
    return giftstart


def get_by_id(giftstart_id):
    results = GiftStart.query(GiftStart.gsid == giftstart_id).fetch(1)
    result = results[0] if len(results) > 0 else None
    return result


def hot_campaigns(num_campaigns):
    # Criteria for hotness:
    #   1. ends a week ago or later
    #   2. most pitchins

    recent_campaigns = GiftStart.query(GiftStart.deadline > datetime.now() - timedelta(days=7)).fetch()
    campaigns_dict = {c.gsid: c for c in recent_campaigns}

    pitchins_per_campaign = []
    for campaign in recent_campaigns:
        pitchins_per_campaign.append([campaign.gsid, PitchIn.query(PitchIn.gsid == campaign.gsid).count()])

    sorted_campaigns = [campaigns_dict[pair2[0]].dictify() for pair2 in
                        sorted(pitchins_per_campaign, key=lambda pair: -pair[1])]

    return sorted_campaigns[:num_campaigns]

