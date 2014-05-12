__author__ = 'stuart'

from google.appengine.ext import ndb
import stripe


class StripeCustomer(ndb.Model):
    uid = ndb.StringProperty(required=True)
    stripe_customer_id = ndb.StringProperty(required=True)
    stripe_response = ndb.JsonProperty()


class StripeCard(ndb.Model):
    uid = ndb.StringProperty(required=True)
    stripe_cards = ndb.JsonProperty(repeated=True)


def update_stripe_customer(uid):
    db_customer = StripeCustomer.query(StripeCustomer.uid == uid).fetch(1)[0]
    db_customer.stripe_response = stripe.Customer.retrieve(db_customer.stripe_customer_id)
    db_customer.put_async()
    return db_customer


def create_stripe_customer(uid, stripe_response):
    customer = stripe.Customer.create(card=stripe_response['id'], description=uid)
    db_customer = StripeCustomer(uid=uid, stripe_customer_id=customer['id'], stripe_response=stripe_response)
    db_customer.put_async()
    return customer


def get_stripe_customer(uid):
    customer = StripeCustomer.query(StripeCustomer.uid == uid).fetch()
    if len(customer) < 1:
        return None
    else:
        return customer[0]