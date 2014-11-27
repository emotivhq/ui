__author__ = 'Stuart'

import requests
from feeds import FeedProduct
from product.product_search import price_filter
import json
from google.appengine.ext import ndb
import csv
import logging
import time


def cache(partner, url):
    """ cache('B-and-H', 'http://bhphotovideo.com/feed') -> None
    Downloads a feed at a given url and caches all valid products, removing
    all prior products
    """
    feed_resp = requests.get(url)
    clear_feed(partner)
    products = normalize_products(partner, feed_resp.content)
    ndb.put_multi(products)


def clear_feed(partner):
    """ clear_feed('B&H') -> None
    Removes all products for this retailer from the feed
    """
    partner_key = ndb.Key('Partner', partner)
    partner_products = FeedProduct.query(ancestor=partner_key).fetch()
    ndb.delete_multi([prod.key for prod in partner_products])


def normalize_products(partner, response_content):
    """ normalize_products('B&H', '{...}') -> [FeedProduct, ...]
    Normalizes and filters a given feed response
    """
    if partner == 'butter-LONDON':
        products = normalize_butter_products(response_content)
    elif partner == 'B-and-H':
        products = normalize_b_and_h_products(response_content)
    else:
        products = []
    return filter_products(partner, products)


def normalize_b_and_h_products(content):
    feed_file = csv.reader(content.splitlines())
    headers = feed_file.next()
    products = [make_b_and_h_product(feed_line=line, headers=headers)
                for line in feed_file]
    return [product for product in products if product]


def make_b_and_h_product(feed_line, headers):
    """ make_b_and_h_product({...}) -> FeedProduct
    :type bh_product: dict
    :rtype: FeedProduct
    """
    def make_img_url(thumbnail_url):
        """
        :type thumbnail_url: str
        :rtype: str
        """
        id_num = thumbnail_url.split('/')[-1]
        return 'http://static.bhphoto.com/images/images500x500/{id_num}'\
            .format(id_num=id_num)

    bh_product = {k: v for k, v in zip(headers, feed_line)}
    try:
        if 'Y' in bh_product.get('Stock'):
            key = ndb.Key('Partner', 'B-and-H', 'FeedProduct',
                          bh_product.get('MPN'))
            return FeedProduct(
                key=key,
                title=bh_product['Item Name'],
                price=int(float(bh_product['Price'].replace(',', ''))*100),
                img=make_img_url(bh_product['image URL']),
                thumbnail=bh_product['image URL'],
                url=bh_product['Item URL'],
                retailer='B&H Photo Video',
                description=bh_product['Item Name'],
                keywords='camera, photo, video',
                sku='BH SKU',
            )
    except KeyError as e:
        logging.error(e.message)
        logging.error('Key missing from B&H product: {0}'.format(feed_line))


def make_butter_product(bl_product):
    """ make_butter_product({...}) -> FeedProduct
    Parses a singular butterLONDON product and produces a FeedProduct
    """
    key = ndb.Key('Partner', 'butter-LONDON', 'FeedProduct',
                  bl_product.get('url'))
    return FeedProduct(
        key=key,
        title=bl_product.get('display-name'),
        price=int(float(bl_product.get('price'))*100),
        img=bl_product.get('image'),
        url=bl_product.get('url'),
        retailer='butter LONDON',
        description=bl_product.get('description'),
        extended_description=bl_product.get('full-description'),
        keywords=bl_product.get('search'),
        thumbnail=bl_product.get('thumbnail'),
        upc=bl_product.get('upc') if isinstance(bl_product.get('upc'), str)
            else '',
        sku=bl_product.get('sku') if isinstance(bl_product.get('sku'), str)
            else ''
    )


def normalize_butter_products(response_content):
    """ normalize_butter_products([{...}, ...]) -> [FeedProduct, ...]
    Parses a response from the butter feed and produces an unfiltered list of
    FeedProducts
    """
    feed = json.loads(response_content)
    products = feed.get('products')
    for key, bl_product in products.items():
        yield make_butter_product(bl_product)


validity_tests = [
    lambda product: price_filter(product),
    lambda product: len(product.title) > 5,
    lambda product: 'http://' in product.img,
    lambda product: 'http://' in product.url,
    lambda product: len(product.retailer) > 0,
    lambda product: 'image' in
                    requests.get(product.img).headers.get('content-type')
]


def test_valid(test, product):
    try:
        return test(product)
    except:
        return False


def filter_products(partner, products):
    """ filter_products([FeedProduct, ...] -> [FeedProduct, ...]
    Returns a list of valid products, removing those without prices, images,
    etc.
    """

    def valid_product(product):
        valid = True
        for test in validity_tests:
            if not valid:
                break
            valid &= test_valid(test, product)
        return valid

    return filter(valid_product, products)
