__author__ = 'Stuart'

import webapp2
import json
from giftstart.GiftStart import GiftStart


class GiftStartQueryHandler(webapp2.RequestHandler):

    def get(self):
        giftstarts = self.query_giftstarts()
        self.response.write(json.dumps(giftstarts))

    def query_giftstarts(self):
        num = int(self.request.get('num', 1))

        if self.request.get('thanked'):
            giftstarts = GiftStart.query(GiftStart.thanked == True)\
                .order(-GiftStart.deadline)\
                .fetch(num)
        else:
            giftstarts = GiftStart.query().fetch(num)

        return [gs.dictify() for gs in giftstarts]