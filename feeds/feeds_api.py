__author__ = 'Stuart'

import webapp2
import feeds_core
from google.appengine.api import taskqueue
from google.appengine.ext import ndb
from feeds.feeds_upload import SturtevantsUploadHandler, \
    SturtevantsDeleteHandler, ManualUploadHandler


FEEDS = {
    'butter-LONDON': 'http://feed.butterlondon.com/products/acf63017/5394GHbgn'
                     'WnPaSx',
    'B-and-H': 'http://74.113.190.28/dataaf/giftstart_19923.csv',
}


class CronHandler(webapp2.RequestHandler):

    def get(self):
        for name, url in FEEDS.items():
            taskqueue.add(url='/feeds/{name}/update'.format(name=name),
                          method='POST')


class FeedsHandler(webapp2.RequestHandler):
    def post(self):
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
                                   ('/feeds/delete/sturtevants',
                                    SturtevantsDeleteHandler)],
                                  debug=True)
