"""log analytics events on Brand Buttons and Share links; provide CSV dumps of GiftStart, User, and PitchIn data"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import base64
import json
import webapp2
import re
import logging
import csv
from giftstart.GiftStart import GiftStart
from gs_user.User import User
from gs_user.UserLogin import UserLogin
from pay.PitchIn import PitchIn
from feeds.FeedProduct import FeedProduct
from social.OAuthTokenPair import OAuthTokenPair
from product.product_search import SearchProduct


class ShareClick(ndb.Model):
    """record of a clickthrough on a social or email share link"""
    type = ndb.StringProperty()
    uid = ndb.StringProperty()
    channel = ndb.StringProperty()
    referer_url = ndb.StringProperty(required=True)
    uuid = ndb.StringProperty(required=True)


def store_if_referral(request):
    """if request contains a JSON-encoded 're' object (created by a social or email share link), record a ShareClick"""
    referral = json.loads(base64.b64decode(request.get('re')))\
        if request.get('re') else {}
    referer_url = request.headers.get('referer')

    if referral == {} and not bool(referer_url) or is_scraper(request):
        return

    shareclick = ShareClick()
    shareclick.type = referral.get('type')
    shareclick.uid = referral.get('uid') if \
        isinstance(referral.get('uid'), str) else None
    shareclick.channel = referral.get('channel')
    shareclick.referer_url = referer_url[:500] if referer_url else 'direct'
    shareclick.uuid = referral.get('uuid')

    if shareclick.uuid:
        shareclick.put()


def is_scraper(request):
    """Determine if the request is coming from a scraper (like fb or g+)"""
    useragent = request.headers.get('User-Agent')

    if 'facebookexternalhit' in useragent:
        return True

    if 'Google (+https://developers.google.com/+/web/snippet/)' in useragent:
        return True

    return False


class ButtonAnalyticsEvent(ndb.Model):
    """record of an event on a Button (usually from a brand site)"""
    domain = ndb.StringProperty()
    path = ndb.StringProperty()
    uuid = ndb.StringProperty()
    product_url = ndb.StringProperty()
    product_price = ndb.IntegerProperty() # cents
    product_img_url = ndb.StringProperty()
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
    product_title = ndb.StringProperty()
    ip_address = ndb.StringProperty()
    scroll_depth = ndb.IntegerProperty() # px
    screen_w = ndb.IntegerProperty() # px
    screen_h = ndb.IntegerProperty() # px
    cookie = ndb.StringProperty()
    action = ndb.StringProperty()
    button_x = ndb.IntegerProperty() # px
    button_y = ndb.IntegerProperty() # px
    button_w = ndb.IntegerProperty() # px
    button_h = ndb.IntegerProperty() # px
    button_border = ndb.StringProperty()
    button_background = ndb.StringProperty()
    button_img = ndb.StringProperty()

    @staticmethod
    def from_dict(d):
        def convert(name):
            s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
            return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

        analytics_dict = {convert(k): v for k, v in d.items()}
        analytics_dict['product_price'] = int(float(
            analytics_dict['product_price'])*100)
        return ButtonAnalyticsEvent(**analytics_dict)


class ButtonAnalyticsHandler(webapp2.RequestHandler):
    """record ButtonAnalyticsEvents for calls to /a/* (usu by Buttons on a brand site via /client/scripts/button scripts)"""

    def get(self):
        logging.info('Received button analytics event')
        data = self.request.path.split('/')[-1]\
            .replace('-', '/').replace('_', '/').replace('.', '=')
        logging.info('Creating event dict')
        event_dict = dict(json.loads(base64.b64decode(data)).items() +
                          [('ip_address', self.request.remote_addr)])
        logging.info('Create event')
        event = ButtonAnalyticsEvent.from_dict(event_dict)
        logging.info('Putting event')
        event.put()
        logging.info('Event tracking complete')
        self.response.content_type = 'text/javascript'


class GiftStartCsvHandler(webapp2.RequestHandler):
    """provide a dump of all GiftStart objects"""
    def get(self):
        logging.info("Received request for giftstart data dump")
        gss = GiftStart.query().fetch()
        write_ds_items_csv(gss, self.response)


class UserCsvHandler(webapp2.RequestHandler):
    """provide a dump of all User objects"""
    def get(self):
        logging.info("Received request for users data dump")
        users = User.query().fetch()
        write_ds_items_csv(users, self.response)


class PitchInCsvHandler(webapp2.RequestHandler):
    """provide a dump of all PitchIn objects"""
    def get(self):
        logging.info("Received request for pitchins data dump")
        pis = PitchIn.query().fetch()
        write_ds_items_csv(pis, self.response)


class DataModelHandler(webapp2.RequestHandler):
    """provide crude HTML diagram of all DataTypes used by the app"""
    def get(self):
        types=[ButtonAnalyticsEvent,FeedProduct,GiftStart,OAuthTokenPair,PitchIn,SearchProduct,ShareClick,User,UserLogin]
        logging.info("Received request for DataModel dump")
        self.response.headers['Content-Type'] = 'text/html'
        # pis = PitchIn.query().fetch(limit=1)
        for t in sorted(types):
            write_ds_type_fields_html(t, self.response)

def write_ds_type_fields_html(ds_type, response):
    """
    convert a datastore type's fields to HTML, write them to response
    @param ds_type: Objects from cloud datastore
    @param response: response into which HTML should be written
    """
    response.write('<table style="float:left; margin:10px;"><tr><th colspan="2" style="border-bottom:1px solid black"><b>'+ds_type.__name__+'</b></th></tr>')
    for p in sorted(ds_type._properties):
        attr=getattr(ds_type,p)
        response.write('<tr><td>'+p+"</td><td>"+type(attr).__name__.split('Property')[0]+('[]' if attr._repeated else '')+('*' if attr._required else '')+(' = '+str(attr._default) if attr._default!=None else '')+'</td></tr>')
    response.write('</table>')

def write_ds_items_csv(ds_items, response):
    """
    convert a set of datastore objects to CSV, write them to response with Content-Type=application/csv
    @param ds_items: Objects from cloud datastore
    @param response: response into which CSV should be written
    """
    response.headers['Content-Type'] = 'application/csv'

    header = set()
    for item in ds_items:
        map(lambda k: header.add(k), item.to_dict().keys())
    header.add('first name')
    header.add('last name')

    writer = csv.DictWriter(response.out, header)
    writer.writeheader()

    for item in ds_items:
        names = []
        if 'gc_name' in item.to_dict().keys():
            name_split = (item.gc_name if item.gc_name is not None else '')\
                .strip().split(' ')
            first_name = name_split[0]
            last_name = name_split[-1] if len(name_split) > 1 else ''
            names = [['first name', first_name],
                     ['last name', last_name]]
        elif 'name' in item.to_dict().keys():
            name_split = (item.name if item.name is not None else '') \
                .strip().split(' ')
            first_name = name_split[0]
            last_name = name_split[-1] if len(name_split) > 1 else ''
            names = [['first name', first_name],
                     ['last name', last_name]]
        writer.writerow({k: v.encode("utf-8", "ignore")
                            if isinstance(v, type(u'')) else v
                         for k, v in item.to_dict().items() + names})


handler = webapp2.WSGIApplication([
    ('/a/.*', ButtonAnalyticsHandler),
    ('/dump/giftstarts.csv', GiftStartCsvHandler),
    ('/dump/users.csv', UserCsvHandler),
    ('/dump/pitchins.csv', PitchInCsvHandler),
    ('/dump/datamodel', DataModelHandler),
])
