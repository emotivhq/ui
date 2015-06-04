"""a User of the application"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import json


class Partner(ndb.Model):
    """a Partner: UID of releated User, company name, company URL, phone, and API Key"""
    uid = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
    company_name = ndb.StringProperty(required=True)
    company_url = ndb.StringProperty(required=True)
    phone_number = ndb.StringProperty(required=True)
    api_key = ndb.StringProperty(required=True)

    def dictify(self):
        json_data = {
                'uid': self.uid,
                'company_name': self.company_nameame,
                'company_url': self.company_url,
                'phone_number': self.phone_number,
                'api_key': self.api_key
            }
        return json_data

    def jsonify(self):
        return json.dumps(self.dictify())