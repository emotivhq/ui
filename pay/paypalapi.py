""" singleton for PayPal API calls """
import paypalrestsdk
import yaml

get_cards_url = 'https://api.sandbox.paypal.com/v1/vault/credit-cards?external_customer_id='

is_stripe_cardprocessor = yaml.load(open('config.yaml'))['cardprocessor'] == 'stripe'

secrets = yaml.load(open('secret.yaml'))
paypalapi = paypalrestsdk.configure({
  "mode": secrets['paypal_auth']['mode'],
  "client_id": secrets['paypal_auth']['client_id'],
  "client_secret": secrets['paypal_auth']['client_secret']})

def get_api():
    return paypalapi

def is_stripe():
    return is_stripe_cardprocessor

def getCards(customer_id):
    return get_api().request(get_cards_url+customer_id, "GET", "{}", {} )