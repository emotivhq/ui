"""
Product search - searches partner product feeds for user queries, sorting
by relevance.
"""

__author__ = 'Stuart'

import requests
import urllib
import json
import logging
import base64
import hmac
import hashlib
from datetime import datetime
from lxml import etree


def search(query):
    """ search('xbox 1') -> [Product...]
    Search for specified keywords, returning a list of products from all
    partners, sorted by relevance
    """
    products = []
    products += search_amazon(query)
    products += search_prosperent(query)
    sorted_products = sort_by_relevance(query, products)

    return sorted_products


def search_amazon(query):
    """ search_amazon('xbox 1') -> [Product...]
    Search for specified keywords on amazon, returning a list of products
    """
    response = requests.get(make_amazon_url(query)).text
    products = parse_amazon_products(response)

    return products


def make_amazon_url(query):
    """ make_amazon_url('xbox 1') -> 'http://webservices.amazon.com/...'
    Creates a properly signed URL for querying amazon for specified keywords
    """
    params = "AWSAccessKeyId=AKIAICZYLXN6GNBDQDGA" \
             "&AssociateTag=gifts01c-20" \
             "&Availability=Available" \
             "&ItemId=0679722769" \
             "&Keywords=" + urllib.quote(query.replace(' ', '_')) + \
             "&Operation=ItemSearch" \
             "&ResponseGroup=ItemAttributes%2CImages%2CEditorialReview" \
             "&SearchIndex=Blended" \
             "&Service=AWSECommerceService" \
             "&Timestamp=" + urllib.quote(datetime.utcnow().isoformat())

    escaped_request = "GET\nwebservices.amazon.com\n/onca/xml\n" + params

    signature = base64.b64encode(
        amazon_sign(
            '1akF5yuNxcZiaytkFAkQfgIU5oMpizNXmE44RPtq',
            escaped_request))
    return 'http://webservices.amazon.com/onca/xml?' + params + '&Signature=' \
           + urllib.quote(signature)


def amazon_sign(key, message):
    """ amazon_sign('ASDFasdfASDF', 'GET\nwebservices.ama...') -> 'signed msg'
    Returns a signed version of the message
    """
    return hmac.new(key, msg=message, digestmod=hashlib.sha256).digest()


def parse_amazon_products(response):
    """ parse_amazon_products('<xml ...>') -> [Product...]
    Parses a response string from Amazon into a list of products
    """
    root = etree.fromstring(response)
    products = [parse_amazon_item(element)
                for element in root.iter()
                if element.tag.split('}')[-1] == 'Item']
    # Remove products missing data
    return [product for product in products if all(product.values())]


def parse_amazon_item(item):
    """ parse_amazon_item(<Element Item ...>) -> {'title': 'xbox 1', ...}
    Parses an lxml element into a product
    """
    def xfind(path):
        """ xfind('.//{ns}Tag/{ns}ChildTag') -> 'first child text' | None """
        xml_ns = \
            '{http://webservices.amazon.com/AWSECommerceService/2011-08-01}'
        result = etree.ETXPath(path.format(ns=xml_ns))(item)
        return result[0].text if result else ''

    return {
        'title': xfind('.//{ns}ItemAttributes/{ns}Title'),
        'price': xfind('.//{ns}ItemAttributes/{ns}ListPrice/{ns}Amount'),
        'url': xfind('.//{ns}DetailPageURL'),
        'imgUrl': xfind('.//{ns}LargeImage/{ns}URL'),
        'retailer': 'Amazon',
        'description': xfind('.//{ns}ItemAttributes/{ns}Title'),

    }


def search_prosperent(query):
    """ search_prosperent('xbox 1') -> [Product...]
    Search for specified keywords on prosperent, returning a list of products
    """
    products = []

    response = json.loads(requests.get(make_prosperent_url(query)).text)
    if response.get('errors'):
        logging.error(
            'Prosperent error during search:\t' +
            json.dumps(response['errors']))
    else:
        products = [{
            'title': prosp_prod.get('keyword'),
            'price': prosp_prod.get('price'),
            'url': prosp_prod.get('affiliate_url'),
            'imgUrl': prosp_prod.get('image_url'),
            'retailer': prosp_prod.get('merchant'),
            'description': prosp_prod.get('description'),
        } for prosp_prod in response.get('data')]

    return products


def make_prosperent_url(query):
    """ make_prosperent_url('xbox 1') -> 'http://api.prosperent.com/a...' """
    return "http://api.prosperent.com/api/search" \
           "?api_key=0ea6828d486ddb94138d277e9007790b" \
           "&query=" + urllib.quote(query) + \
           "&imageSize=500x500" \
           "&limit=75"


def sort_by_relevance(keywords, products):
    """ sort_by_relavence('xbox 1', [Product...]) -> [Product...]
    Sorts a list of products by relevance to the supplied keywords
    """
    return products
