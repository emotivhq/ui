__author__ = 'Stuart'

import webapp2
from feeds.FeedProduct import FeedProduct
from google.appengine.ext import ndb
import logging


class SturtevantsUploadHandler(webapp2.RequestHandler):
    def post(self):
        data = self.request.body

        line_split = '[giftstartersplit]'
        line_end = '[giftstarterendline]'
        lines = [line.split(line_split) for line in data.split(line_end)]

        products = []
        for line in lines:
            if len(line) < 5:
                break
            price = int(100*float(line[4]))
            if price > 7498:
                product = FeedProduct(
                    title=line[0],
                    price=price,
                    img=line[2],
                    url=line[3],
                    retailer='Sturtevant\'s',
                    description=line[1].decode('ascii', 'ignore'))
                products.append(product)

        logging.debug(products[0])
        ndb.put_multi(products)
