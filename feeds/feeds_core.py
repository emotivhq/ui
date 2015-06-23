"""ingest products from automatic feeds; filter based on price"""

__author__ = 'GiftStarter'

import requests
from feeds import FeedProduct
from product.product_search import SearchProduct
from product.product_search import delete_from_index
from product.product_search import add_to_index
from product.product_search import get_static_product_index
from product.product_search import price_filter
import json
from google.appengine.ext import ndb
import csv
from lxml import html
import logging


def cache(partner, url):
    """
    Downloads a feed at a given url and caches all valid products, removing all prior products
    @param partner: the known name of the retailer
    @param url: the URL of the feed to parse
    """
    feed_resp = requests.get(url)
    clear_feed(partner)
    products = normalize_products(partner, feed_resp.content)
    products = [SearchProduct.from_feed_product(prod) for prod in products]
    search_docs = []
    #products = [product for product in static_products if price_filter(product)]
    for product in products:
        search_docs.append(product.to_search_document())
    logging.info("Put {0} products from {1}".format(len(products), partner))
    ndb.put_multi(products)
    logging.info("Indexed {0} products from {1}".format(len(products), partner))
    add_to_index(get_static_product_index(), search_docs)


def clear_feed(partner):
    """
    Removes all products for this retailer from the feed and the Index
    @param partner: the known name of the retailer
    """
    partner_key = ndb.Key('Partner', partner)
    logging.info("Found partner_key {0} for {1}".format(partner_key, partner))
    remaining = 1
    while remaining > 0:
        prods = SearchProduct\
            .query(ancestor=partner_key)\
            .fetch(100)
        remaining = len(prods)
        logging.info("Unindexing {0} {1} products".format(remaining, partner))
        delete_from_index(get_static_product_index(), [prod.doc_id for prod in prods])
        logging.info("Deleting {0} {1} products".format(remaining, partner))
        ndb.delete_multi([prod.key for prod in prods])


def normalize_products(partner, response_content):
    """
    parses feeds into products
    @param partnet: the known name of the retailer
    @param content: a response from the feed
    @rtype: an unfiltered list of FeedProducts
    """
    if partner == 'butter-LONDON':
        products = normalize_butter_products(response_content)
    elif partner == 'B-and-H':
        products = normalize_b_and_h_products(response_content)
    else:
        products = []
    return filter_products(partner, products)


def normalize_b_and_h_products(content):
    """
    parses the B&H feed into products
    @param content: a response from the B&H feed
    @rtype: an unfiltered list of FeedProducts
    """
    feed_file = csv.reader(content.splitlines())
    headers = feed_file.next()
    products = [make_b_and_h_product(feed_line=line, headers=headers)
                for line in feed_file]
    return [product for product in products if product]


def make_b_and_h_product(feed_line, headers):
    """ make_b_and_h_product({...}) -> FeedProduct
    @type bh_product: dict
    @rtype: FeedProduct
    """
    def make_img_url(thumbnail_url):
        """
        @type thumbnail_url: str
        @rtype: str
        """
        id_num = thumbnail_url.split('/')[-1]
        return 'http://static.bhphoto.com/images/images500x500/{id_num}'\
            .format(id_num=id_num)

    def scrape_product_description(product_url):
        """
        @type product_url: str
        @rtype: str
        """
        try:
            page = requests.get(product_url)
            tree = html.fromstring(page.text)
            for elem in tree.xpath('//div[@data-selenium="promoBannerZone"]'):
                elem.getparent().remove(elem)
            for elem in tree.xpath('//div[@data-selenium="sectionHeaders"]'):
                elem.getparent().remove(elem)
            desc = tree.xpath('//div[@id="Overview"]')
            return html.tostring(desc[0]).strip()
        except Exception as e:
            logging.error("Unable to scrape description for {0}: {1}".format(product_url, e))
            return ""

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
                description=scrape_product_description(bh_product['Item URL']),
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
    """
    parses the butter feed into products
    @param content: a response from the butter feed
    @rtype: an unfiltered list of FeedProducts
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
