__author__ = 'Stuart'

from google.appengine.ext import ndb
import json


class FeedProduct(ndb.Model):
    title = ndb.StringProperty(required=True)
    timestamp = ndb.TimeProperty(auto_now_add=True)
    price = ndb.StringProperty(required=True)
    img = ndb.StringProperty(required=True)
    url = ndb.StringProperty(required=True)
    retailer = ndb.StringProperty(required=True)
    description = ndb.TextProperty()
    thumbnail = ndb.StringProperty()
    upc = ndb.StringProperty()
    sku = ndb.StringProperty()

    def dictify(self):
        return {
            'title': self.title, 'price': self.price, 'url': self.url,
            'imgUrl': self.img, 'retailer': self.retailer,
            'description': self.description if self.description
            else self.title
        }

    def jsonify(self):
        return json.dumps(self.dictify())