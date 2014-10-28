__author__ = 'stuart'

import time
from datetime import datetime, timedelta
from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import storage.image_cache
from google.appengine.ext import ndb
import logging


def update(new_gs, url_title):
    # giftstart = GiftStart.query(GiftStart.gsid == new_gs['gsid']).fetch(1)[0]
    giftstart = ndb.Key('GiftStart', url_title).get()

    if new_gs.get('title'):
        giftstart.giftstart_title = new_gs.get('title')

    if new_gs.get('description'):
        giftstart.giftstart_description = new_gs.get('description')

    if new_gs.get('gc_name'):
        giftstart.gc_name = new_gs.get('gc_name')

    if new_gs.get('image'):
        image = new_gs.get('image')
        content_type = image['data'].split(';')[0].split(':')[1]
        base64data = ','.join(image['data'].split(',')[1:])
        img_data = base64data.decode('base64', 'strict')
        filename = image['filename'] + '?' + "?{0:.0f}".format(time.time()*1000)
        giftstart.product_img_url = \
            storage.image_cache.cache_user_uploaded_image(img_data, filename,
                                                          new_gs['gsid'],
                                                          content_type)

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

    pitchins_dict = {}
    pitchins_per_campaign = []
    for campaign in recent_campaigns:
        these_pitchins = PitchIn.query(PitchIn.gsid == campaign.gsid).fetch()
        pitchins_dict[campaign.gsid] = these_pitchins
        pitchins_per_campaign.append([campaign.gsid, len(these_pitchins)])


    sorted_gsids = map(lambda p: p[0], sorted(pitchins_per_campaign, key=lambda pair: -pair[1]))[:num_campaigns]
    result_campaigns = [campaigns_dict[gsid].dictify() for gsid in sorted_gsids]
    result_pitchins = [[p.ext_dictify() for p in pitchins_dict[gsid]] for gsid in sorted_gsids]

    return {
        'pitchins': result_pitchins,
        'campaigns': result_campaigns,
    }


def does_user_exist(uid, token):
    print(uid)
    print(token)
    login_service_map = {'f': 'facebook', 'g': 'googleplus', 't': 'twitter'}
    if uid[0] not in login_service_map.keys():
        return False
    token_map = {'f': lambda u: u.facebook_token_set.access_token,
                 'g': lambda u: u.googleplus_token_set.access_token,
                 't': lambda u: u.twitter_token_set.access_token}

    user = ndb.Key('User', uid).get()

    logging.info('Checking if user exists')
    if user is None:
        logging.info("User does not exist")
        return False

    user_exists = token == token_map[uid[0]](user)
    logging.info('User existence: {0}'.format(user_exists))
    return user_exists