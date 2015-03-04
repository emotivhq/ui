"""
use Tax Cloud API to find tax percentages by zip code
@undocumented:TAX_CLOUD_API_ID
@undocumented:TAX_CLOUD_API_KEY
"""
__author__ = 'GiftStarter'

import jinja2
import requests
import re
import logging

JINJA_ENVIRONMENT = jinja2.Environment()

TAX_CLOUD_SOAP_TEMPLATE = JINJA_ENVIRONMENT.from_string("""<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <Lookup xmlns="http://taxcloud.net">
      <apiLoginID>{{ api_id }}</apiLoginID>
      <apiKey>{{ api_key }}</apiKey>
      <customerID>0</customerID>
      <cartID>0</cartID>
      <cartItems>
        <CartItem>
          <Index>0</Index>
          <ItemID>0</ItemID>
          <TIC>0</TIC>
          <Price>{{ price }}</Price>
          <Qty>1</Qty>
        </CartItem>
      </cartItems>
      <origin>
        <Address1>6555 Seward Park Ave S</Address1>
        <Address2></Address2>
        <City>Seattle</City>
        <State>WA</State>
        <Zip5>98118</Zip5>
        <Zip4>3447</Zip4>
      </origin>
      <destination>
        <Address1>{{ address }}</Address1>
        <Address2></Address2>
        <City>{{ city }}</City>
        <State>{{ state }}</State>
        <Zip5>{{ zip }}</Zip5>
        <Zip4></Zip4>
      </destination>
      <deliveredBySeller>false</deliveredBySeller>
    </Lookup>
  </soap12:Body>
</soap12:Envelope>
""")

TAX_CLOUD_API_ID = 'E95D360'
TAX_CLOUD_API_KEY = '80807DAF-22F1-487A-B0B8-3E103C855637'


def lookup(address, city, state, zipcode, is_gift_card):
    """
    look up zip code in Tax Cloud and return tax percentage
    @param address:
    @param city:
    @param state:
    @param zipcode:
    @param is_gift_card:
    @return: tax percentage (0 if not found or is gift card)
    @rtype: float
    """
    if is_gift_card:
        return 0
    if not state:
        state=" "

    request = TAX_CLOUD_SOAP_TEMPLATE.render({
        'api_id': TAX_CLOUD_API_ID,
        'api_key': TAX_CLOUD_API_KEY,
        'price': 100,
        'address': address,
        'city': city,
        'state': state,
        'zip': zipcode
    }).encode('utf-8')
    headers = {"Content-Type": "text/xml; charset=UTF-8"}

    response = requests.post(url='https://api.taxcloud.net/1.0/', headers=headers, data=request)
    tax_amount = 0
    try:
        tax_amount = float(re.findall('<TaxAmount>(.+)</TaxAmount>', response.content)[0]) / 100.0
        logging.info("Found tax {4} for {0}, {1}, {2}, {3}".format(address,city,state,zipcode,tax_amount))
    except IndexError:
        logging.error("Bad response from TaxCloud for {0}, {1}, {2}, {3}: {4}".format(address,city,state,zipcode,response.content))
    return tax_amount
