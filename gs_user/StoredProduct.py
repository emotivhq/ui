"""a Product which the User has saved for later use"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import json


class StoredProduct(ndb.Model):
    """a Product which the User has saved for later use"""
    timestamp = ndb.TimeProperty(auto_now_add=True)
    uid = ndb.StringProperty(required=True)
    url = ndb.StringProperty(required=True)
    retailer = ndb.StringProperty(required=True)
    price = ndb.IntegerProperty(required=True)
    title = ndb.StringProperty(required=True)
    description = ndb.TextProperty()
    img = ndb.StringProperty(required=True)

    def jsonify(self):
        return json.dumps({
                'timestamp': self.timestamp,
                'uid': self.uid,
                'url': self.url,
                'retailer': self.retailer,
                'price': self.price,
                'title': self.title,
                'description': self.description,
                'img': self.img
        })