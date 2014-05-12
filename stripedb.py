__author__ = 'stuart'

from google.appengine.ext import ndb


class StripeCustomer(ndb.Model):
    uid = ndb.StringProperty(required=True)
    stripe_customer_id = ndb.StringProperty(required=True)
    stripe_response = ndb.JsonProperty()


class StripeCard(ndb.Model):
    uid = ndb.StringProperty(required=True)
    stripe_cards = ndb.JsonProperty(repeated=True)
