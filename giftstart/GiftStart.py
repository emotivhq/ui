__author__ = 'stuart'

from google.appengine.ext import ndb
import json


class GiftStart(ndb.Model):
    gsid = ndb.StringProperty(required=True)
    giftstart_title = ndb.StringProperty(required=True)
    giftstart_description = ndb.TextProperty(required=True)
    giftstart_special_notes = ndb.TextProperty()
    gift_champion_uid = ndb.StringProperty(required=True)
    deadline = ndb.DateTimeProperty(required=True)
    giftstart_complete = ndb.BooleanProperty(default=False)

    product_url = ndb.StringProperty(required=True)
    product_img_url = ndb.StringProperty(required=True)
    product_price = ndb.IntegerProperty(required=True)
    product_title = ndb.StringProperty(required=True)
    retailer_logo = ndb.StringProperty(required=True)
    sales_tax = ndb.IntegerProperty(required=True)
    shipping = ndb.IntegerProperty(required=True)
    service_fee = ndb.IntegerProperty(required=True)
    total_price = ndb.IntegerProperty(required=True)

    overlay_columns = ndb.IntegerProperty(required=True)
    overlay_rows = ndb.IntegerProperty(required=True)

    gc_name = ndb.StringProperty(required=True)
    gc_phone_number = ndb.StringProperty(required=True)
    gc_email = ndb.StringProperty(required=True)

    shipping_name = ndb.StringProperty(required=True)
    shipping_address = ndb.StringProperty(required=True)
    shipping_city = ndb.StringProperty(required=True)
    shipping_state = ndb.StringProperty(required=True)
    shipping_zip = ndb.StringProperty(required=True)
    shipping_phone_number = ndb.StringProperty(required=True)

    def jsonify(self):
        return json.dumps({'giftstart': {
            'gsid': self.gsid, 'title': self.giftstart_title, 'description': self.giftstart_description,
            'product': {'img_url': self.product_img_url, 'price': self.product_price, 'product_url': self.product_url,
                        'sales_tax': self.sales_tax, 'shipping': self.shipping, 'service_fee': self.service_fee,
                        'total_price': self.total_price, 'title': self.product_title,
                        'retailer_logo': self.retailer_logo},
            'rows': self.overlay_rows, 'columns': self.overlay_columns, 'gift_champion_uid': self.gift_champion_uid,
            'deadline': self.deadline.strftime("%s"), 'gc_name': self.gc_name
        }})