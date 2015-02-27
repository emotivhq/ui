"""a GiftStart (aka Campaign)"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import json


class GiftStart(ndb.Model):
    gsid = ndb.StringProperty(required=True)
    giftstart_title = ndb.StringProperty(required=True)
    giftstart_url_title = ndb.StringProperty()
    giftstart_description = ndb.TextProperty(required=True)
    giftstart_special_notes = ndb.TextProperty()
    gift_champion_uid = ndb.StringProperty()
    staging_uuid = ndb.StringProperty()
    deadline = ndb.DateTimeProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
    giftstart_complete = ndb.BooleanProperty(default=False)

    product_url = ndb.StringProperty(required=True)
    product_img_url = ndb.StringProperty(required=True)
    product_price = ndb.IntegerProperty(required=True)
    product_title = ndb.StringProperty()
    retailer_logo = ndb.StringProperty()
    sales_tax = ndb.IntegerProperty(required=True)
    shipping = ndb.IntegerProperty(required=True)
    service_fee = ndb.IntegerProperty(required=True)
    total_price = ndb.IntegerProperty(required=True)

    overlay_columns = ndb.IntegerProperty(required=True)
    overlay_rows = ndb.IntegerProperty(required=True)

    gc_name = ndb.StringProperty()
    gc_phone_number = ndb.StringProperty()
    gc_email = ndb.StringProperty(required=True)

    shipping_name = ndb.StringProperty()
    shipping_address = ndb.StringProperty()
    shipping_city = ndb.StringProperty()
    shipping_state = ndb.StringProperty(required=True)
    shipping_zip = ndb.StringProperty(required=True)
    shipping_phone_number = ndb.StringProperty()
    shipping_email = ndb.StringProperty()

    thanked = ndb.BooleanProperty(default=False)
    thanks_message = ndb.TextProperty()
    thanks_img_url = ndb.TextProperty()
    thanks_uid = ndb.StringProperty()

    def jsonify(self):
        return json.dumps(self.dictify())

    def dictify(self):
        return {
            'gsid': self.gsid, 'title': self.giftstart_title,
            'giftstart_url_title': self.giftstart_url_title,
            'description': self.giftstart_description,
            'product_img_url': self.product_img_url,
            'price': self.product_price,
            'product_url': self.product_url, 'sales_tax': self.sales_tax,
            'shipping': self.shipping, 'service_fee': self.service_fee,
            'total_price': self.total_price,
            'product_title': self.product_title,
            'retailer_logo': self.retailer_logo,
            'rows': self.overlay_rows, 'columns': self.overlay_columns,
            'gift_champion_uid': self.gift_champion_uid,
            'deadline': self.deadline.strftime("%s"), 'gc_name': self.gc_name,
            'thanks_message': self.thanks_message,
            'thanks_img_url': self.thanks_img_url,
            'thanks_uid': self.thanks_uid,
        }