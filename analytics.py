__author__ = 'stuart'

from google.appengine.ext import ndb
import base64
import json


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