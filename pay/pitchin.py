__author__ = 'stuart'

from google.appengine.ext import ndb


class PitchIn(ndb.Model):
    uid = ndb.StringProperty(required=True)
    gsid = ndb.StringProperty(required=True)
    note = ndb.StringProperty(required=True)
    parts = ndb.IntegerProperty(repeated=True)
    timestamp = ndb.DateTimeProperty(auto_now=True)
    stripe_customer = ndb.StringProperty(required=True)
    last_four = ndb.StringProperty(required=True)
    stripe_charge_id = ndb.StringProperty()
    stripe_charge_json = ndb.JsonProperty()
    processed = ndb.BooleanProperty(default=False)
    processed_time = ndb.DateTimeProperty()