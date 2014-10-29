__author__ = 'stuart'

from google.appengine.ext import ndb
import base64
import json
import webapp2
import re
import urllib
import logging


class ShareClick(ndb.Model):
    type = ndb.StringProperty()
    uid = ndb.StringProperty()
    channel = ndb.StringProperty()
    referer_url = ndb.StringProperty(required=True)
    uuid = ndb.StringProperty(required=True)


def store_if_referral(request):
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
    """ Determine if the request is coming from a scraper (like fb or g+)
    """
    useragent = request.headers.get('User-Agent')

    if 'facebookexternalhit' in useragent:
        return True

    if 'Google (+https://developers.google.com/+/web/snippet/)' in useragent:
        return True

    return False


class ButtonAnalyticsEvent(ndb.Model):
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
            s1['product_price'] = int(float(s1['product_price'])*100)
            return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

        return ButtonAnalyticsEvent(**{convert(k): v for k, v in d.items()})


class ButtonAnalyticsHandler(webapp2.RequestHandler):

    def get(self):
        logging.info('Received button analytics event')
        data = urllib.unquote(self.request.path.split('/')[-1])
        logging.info('Creating event dict')
        event_dict = dict(json.loads(base64.b64decode(data)).items() +
                          [('ip_address', self.request.remote_addr)])
        logging.info('Create event')
        event = ButtonAnalyticsEvent.from_dict(event_dict)
        logging.info('Putting event')
        event.put()
        logging.info('Event tracking complete')
        self.response.content_type = 'text/javascript'


handler = webapp2.WSGIApplication([('/a/.*', ButtonAnalyticsHandler)])
