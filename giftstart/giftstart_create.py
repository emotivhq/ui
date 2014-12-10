__author__ = 'Stuart'

import webapp2
import json
from google.appengine.ext import ndb
from google.appengine.api import taskqueue
from giftstart.GiftStart import GiftStart
import re
from datetime import datetime, timedelta
import os
from giftstart import giftstart_comm, giftstart_core
import storage.image_cache
import math
import logging

MIN_GIFTSTART_CAMPAIGN_DAYS = 2
MAX_GIFTSTART_CAMPAIGN_DAYS = 30 #no more than 1 month
SECONDS_PER_DAY = 24 * 60 * 60


class AuthError(Exception):
    pass


class GiftStartCreateHandler(webapp2.RequestHandler):

    def post(self):
        self.request.giftstart = json.loads(self.request.body)
        broken_param = self.find_invalid_param()
        if broken_param:
            logging.error("Invalid or missing param {0}".format(broken_param))
            self.response.set_status(400, "Invalid or missing param {0}"
                                     .format(broken_param))
        else:
            try:
                self.create_giftstart()
            except ValueError as e:
                logging.error("Expected valid UUID or uid")
                self.response.set_status(400, "Expected valid UUID or uid")
            except AuthError as e:
                self.response.set_status(403, "Invalid credentials")

    def str_param_valid(self, param):
        """ Check if the parameter in the received json object is a non ''
        string
        :param param: name of parameter to check
        :type param: str
        :rtype: bool
        """
        value = self.request.giftstart.get(param)
        valid = value is not None
        if isinstance(value, str) or isinstance(value, unicode):
            valid &= len(value) > 0
        valid &= value != 'None'
        return valid

    def coerce_int_param(self, param):
        """ Tries to make numeric params ints, reports first non-intable param
        :param param: name of parameter to check
        :type param: str
        :rtype: bool
        """
        return int(self.request.giftstart.get(param))

    def find_invalid_param(self):
        """ Finds and returns the name of the first invalid parameter
        :return: name of first invalid parameter
        :rtype: str
        """
        str_params = ['title', 'description', 'gc_email', 'product_url',
                      'product_img_url', 'product_title', 'shipping_zip',
                      'shipping_state']
        int_params = ['product_price', 'sales_tax', 'shipping',
                      'service_fee', 'total_price', 'campaign_length', 'columns', 'rows']
        for param in str_params:
            if not self.str_param_valid(param):
                return param
        for param in int_params:
            try:
                self.request.giftstart[param] = self.coerce_int_param(param)
            except:
                return param

        campaign_length = self.coerce_int_param('campaign_length')
        if campaign_length<MIN_GIFTSTART_CAMPAIGN_DAYS:
            logging.info('Corrected the campaign_length from {0} to {1} days'.format(campaign_length,MIN_GIFTSTART_CAMPAIGN_DAYS))
            self.request.giftstart['campaign_length'] = MIN_GIFTSTART_CAMPAIGN_DAYS
        if campaign_length>MAX_GIFTSTART_CAMPAIGN_DAYS:
            logging.info('Corrected the campaign_length from {0} to {1} days'.format(campaign_length,MAX_GIFTSTART_CAMPAIGN_DAYS))
            self.request.giftstart['campaign_length'] = MAX_GIFTSTART_CAMPAIGN_DAYS
        if self.request.cookies.get('uid') is None and \
                        self.request.giftstart.get('staging_uuid') is None:
            return 'staging_uuid'

        return ''

    def create_giftstart(self):
        """ Create giftstart """
        giftstart = self.request.giftstart

        uid = self.request.cookies.get('uid', 'none').replace('%22', '')
        token = self.request.cookies.get('token', 'none').replace('%22', '')
        if (giftstart.get('staging_uuid')) is None:
            # Then there must be valid uid/token sent
            if uid is not None:
                if not giftstart_core.does_user_exist(uid, token):
                    raise AuthError('Invalid uid/token')
            else:
                raise ValueError('No staging uuid supplied in absence of uid')

        gs_url_title = self.create_title_url(giftstart)
        gs_key = ndb.Key('GiftStart', gs_url_title)
        gs = GiftStart(key=gs_key)
        gs = self.populate_giftstart(gs, giftstart, uid,
                                     giftstart.get('staging_uuid'))
        gs.giftstart_url_title = gs_url_title
        gs_count = GiftStart.query().count()
        gs.gsid = str(gs_count + 1) if gs_count else '1'
        # Check if running in development env
        if not os.environ['SERVER_SOFTWARE'].startswith('Development'):
            gs.product_img_url = storage.image_cache.cache_product_image(
                giftstart['product_img_url'], gs.gsid)

        if giftstart_core.does_user_exist(uid, token):
            logging.info("Found user, completing campaign creation")
            complete_campaign_creation(uid, gs)
        else:
            logging.info("No user found, stashing campaign")
            gs.put()

        self.response.write(gs.jsonify())

    @staticmethod
    def create_title_url(giftstart):
        def name_ok(name):
            gs = ndb.Key(GiftStart, name).get()
            return gs is None
        hyphen_title = giftstart['title'].replace(' ', '-')
        url_title = re.sub(r'[^a-zA-Z0-9-]', '', hyphen_title)
        if not name_ok(url_title):
            i = 1
            while not name_ok(url_title + '-' + str(i)):
                i += 1
            url_title += '-' + str(i)

        return url_title

    @staticmethod
    def populate_giftstart(ndbgs, giftstart, uid='none', uuid='none'):
        if uid != 'none':
            ndbgs.gift_champion_uid = uid
        elif uuid != 'none':
            ndbgs.staging_uuid = uuid
        else:
            raise ValueError('Either uid or uuid must be supplied')
        ndbgs.giftstart_title = giftstart['title']
        ndbgs.giftstart_description = giftstart['description']

        ndbgs.product_url = giftstart['product_url']
        ndbgs.product_img_url = giftstart['product_img_url']
        ndbgs.product_price = int(giftstart['product_price'])
        ndbgs.product_title = giftstart['product_title']
        ndbgs.retailer_logo = giftstart.get('retailer_logo')
        ndbgs.sales_tax = int(giftstart['sales_tax'])
        ndbgs.shipping = int(giftstart['shipping'])
        ndbgs.service_fee = int(giftstart['service_fee'])
        ndbgs.total_price = int(giftstart['total_price'])

        ndbgs.overlay_columns = giftstart['columns']
        ndbgs.overlay_rows = giftstart['rows']

        ndbgs.gc_name = giftstart.get('gc_name')
        ndbgs.gc_phone_number = giftstart.get('gc_phone_number')
        ndbgs.gc_email = giftstart['gc_email']

        campaign_length = giftstart['campaign_length']
        ndbgs.deadline = datetime.now() + timedelta(days=campaign_length)

        ndbgs.shipping_name = giftstart.get('shipping_name')
        ndbgs.shipping_email = giftstart.get('shipping_email')
        ndbgs.shipping_address = giftstart.get('shipping_address')
        ndbgs.shipping_city = giftstart.get('shipping_city')
        ndbgs.shipping_state = giftstart['shipping_state']
        ndbgs.shipping_zip = giftstart['shipping_zip']
        ndbgs.shipping_phone_number = giftstart.get('shipping_phone_number')
        ndbgs.shipping_email = giftstart.get('shipping_email')

        return ndbgs


def complete_campaign_creation(uid, gs):
    user = ndb.Key('User', uid).get()
    gs.gc_name = user.name
    gs.gift_champion_uid = uid
    gs.put()

    giftstart_comm.send_create_notification(gs)

    campaign_length=gs.deadline - datetime.now()
    campaign_seconds = (campaign_length.days*SECONDS_PER_DAY) + campaign_length.seconds
    countdown_warning = campaign_seconds - SECONDS_PER_DAY
    countdown_complete = (campaign_seconds + 180)

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'one-day-warning',
                                      'gsid': gs.gsid}),
                  countdown=(countdown_warning))

    taskqueue.add(url="/giftstart/api", method="POST",
                  payload=json.dumps({'action': 'check-if-complete',
                                      'gsid': gs.gsid}),
                  countdown=countdown_complete)
