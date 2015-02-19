"""A product extracted from a feed: includes name, price, image, etc"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import json


class FeedProduct(ndb.Model):
    """A product extracted from a feed: includes name, price, image, etc"""
    title = ndb.StringProperty(required=True)
    timestamp = ndb.TimeProperty(auto_now_add=True)
    price = ndb.IntegerProperty(required=True)
    img = ndb.StringProperty(required=True)
    url = ndb.StringProperty(required=True)
    retailer = ndb.StringProperty(required=True)
    description = ndb.TextProperty()
    extended_description = ndb.TextProperty()
    keywords = ndb.TextProperty()
    thumbnail = ndb.StringProperty()
    upc = ndb.StringProperty()
    sku = ndb.StringProperty()
    is_gift_card = ndb.BooleanProperty(default=False)

    def dictify(self):
        return {
            'title': self.title, 'price': self.price, 'url': self.url,
            'imgUrl': self.img, 'retailer': self.retailer,
            'description': self.description if self.description
            else self.title
        }

    def jsonify(self):
        return json.dumps(self.dictify())