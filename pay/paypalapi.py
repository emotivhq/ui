""" singleton for PayPal API calls """
import paypalrestsdk
import yaml


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))

is_stripe_cardprocessor = config['cardprocessor'] == 'stripe'

get_cards_url = 'https://api'+('.sandbox' if secrets['paypal_auth']['mode']=='sandbox' else '')+'.paypal.com/v1/vault/credit-cards?external_customer_id='

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