"""enqueue, ingest, and delete product feeds"""
__author__ = 'GiftStarter'

import webapp2
import feeds_core
from google.appengine.api import taskqueue
from feeds.feeds_upload import SturtevantsUploadHandler, \
    SturtevantsDeleteHandler, ManualUploadHandler, ManualDeleteHandler


FEEDS = {
    'butter-LONDON': 'http://feed.butterlondon.com/products/acf63017/5394GHbgn'
                     'WnPaSx',
    'B-and-H': 'http://74.113.190.28/dataaf/giftstart_19923.csv',
}
"""known named feeds"""


class CronHandler(webapp2.RequestHandler):
    """handle cron requests to enqueue feed updates"""
    def get(self):
        """enqueue all feeds for update"""
        for name, url in FEEDS.items():
            taskqueue.add(url='/feeds/{name}/update'.format(name=name),
                          method='POST')


class FeedsHandler(webapp2.RequestHandler):
    """handle requests to parse named feeds"""
    def post(self):
        """
        handle requests to parse a named feed
        return status 400 if feed name is invalid
        """
        try:
            feed_name = self.request.path.split('/')[2]
            feeds_core.cache(feed_name, FEEDS[feed_name])
        except IndexError:
            self.response.set_status(400, "Invalid feed name")

handler = webapp2.WSGIApplication([('/feeds/update', CronHandler),
                                   ('/feeds/.*/update', FeedsHandler),
                                   ('/feeds/upload/manual',
                                    ManualUploadHandler),
                                   ('/feeds/upload/sturtevants',
                                    SturtevantsUploadHandler),
                                   ('/feeds/delete/manual',
                                    ManualDeleteHandler),
                                   ('/feeds/delete/sturtevants',
                                    SturtevantsDeleteHandler)],
                                  debug=True)
"""handle requests to update specific automatic feeds (/feeds/.*/update),
        or to upload a feed file (/feeds/upload/.*),
        or to delete specific feed data (/feeds/delete/.*)"""
