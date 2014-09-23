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
from google.appengine.api import search


def product_search(query):
    """ search('xbox 1') -> [Product...]
    Search for specified keywords, returning a list of products from all
    partners, sorted by relevance
    """
    products = []
    logging.info("Searching amazon...\t" + datetime.utcnow().isoformat())
    products += search_amazon(query)
    logging.info("Searching prosperent...\t" + datetime.utcnow().isoformat())
    products += search_prosperent(query)
    logging.info("Sorting products...\t" + datetime.utcnow().isoformat())
    sorted_products = sort_by_relevance(query, products)
    logging.info("Returning...\t" + datetime.utcnow().isoformat())

    return products


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
        return result[0].text if result else None

    description = xfind('.//{ns}EditorialReviews/{ns}EditorialReview/{ns}Content')
    return {
        'title': xfind('.//{ns}ItemAttributes/{ns}Title'),
        'price': xfind('.//{ns}ItemAttributes/{ns}ListPrice/{ns}Amount'),
        'url': xfind('.//{ns}DetailPageURL'),
        'imgUrl': xfind('.//{ns}LargeImage/{ns}URL'),
        'retailer': 'Amazon',
        'description': description if description
        else xfind('.//{ns}ItemAttributes/{ns}Title'),
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
            'price': str(100 * float(prosp_prod.get('price'))),
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
           "&filterMerchantId=" + "|".join(PROSPERENT_RETAILERS.values()) + \
           "&imageSize=500x500" \
           "&limit=90" \
           "&filterPrice=49.99,"


def sort_by_relevance(keywords, products):
    """ sort_by_relavence('xbox 1', [Product...]) -> [Product...]
    Sorts a list of products by relevance to the supplied keywords
    """
    logging.info("Building index...\t" + datetime.utcnow().isoformat())
    index, ids = put_search_products(products)
    logging.info("Searching products...\t" + datetime.utcnow().isoformat())
    sorted_products = search_products(index, keywords)
    logging.info("Cleaning up...\t" + datetime.utcnow().isoformat())
    cleanup_search(index, ids)

    return sorted_products


def put_search_products(products):
    """ put_documents([Product...]) -> (Index, [Id...])
    Puts an array of documents and returns the index and ids of the put docs
    """
    def make_doc(prod, id):
        return search.Document(
            doc_id=str(id),
            fields=[
                search.TextField(name='title', value=prod['title']),
                search.HtmlField(name='description',
                                 value=prod['description']),
                search.TextField(name='url', value=prod['url']),
                search.TextField(name='imgUrl', value=prod['imgUrl']),
                search.TextField(name='price', value=prod['price']),
                search.TextField(name='retailer', value=prod['retailer']),
            ])

    index = search.Index(name='product-search-0')
    docs = [make_doc(prod, str(i)) for i, prod in enumerate(products)]
    ids = [str(i) for i in range(len(docs))]
    index.put(docs)
    return index, ids


def cleanup_search(index, ids):
    """ cleanup_search([Id...]) -> None
    Removes all the added documents from the search index after completion
    """
    index.delete(ids)


def search_products(index, keywords):
    """ search_products(Index, 'xbox 1') -> [Product...]
    Searches the passed in index for the supplied keywords, with scoring
    """
    def make_product(search_result):
        return {field.name: field.value for field in search_result.fields}
    sort_opts = search.SortOptions(match_scorer=search.MatchScorer())
    query_options = search.QueryOptions(
        limit=100,
        sort_options=sort_opts)
    query = search.Query(query_string=keywords, options=query_options)

    results = index.search(query)
    return [make_product(result) for result in results]


PROSPERENT_RETAILERS = {
    "rei": "123729",
    "nordstrom": "127294",
    "1800flowers": "127214",
    "zappos": "123473",
    "kohls": "126799",
    "lowes": "124810",
    "bestbuy": "126728",
    "worldmarket": "125441",
    "surlatable": "125427",
    "sunglasshut": "125471",
    "evo": "125646",
    "redenvelope": "125512",
    "2modern": "125037",
    "advanceautoparts": "124411",
    "anntaylor": "125175",
    "anneklein": "128076",
    "autozone": "124137",
    "backcountry": "123472",
    "barneysnewyork": "127429",
    "brooksbrothers": "123775",
    "brookstone": "123721",
    "capitollighting": "124449",
    "carhartt": "123996",
    "competitivecyclist": "124822",
    "cooking": "123736",
    "countryoutfitter": "127239",
    "cymax": "124230",
    "easyspirit": "124481",
    "efaucets": "123991",
    "eyeglasses": "125174",
    "guitarcenter": "123887",
    "hammacherschlemmer": "123712",
    "kayjewelers": "124968",
    "lacrosse": "124487",
    "lordtaylor": "125096",
    "mightyleaftea": "124167",
    "militaryuniformsupply": "126947",
    "moosejaw": "123917",
    "modernbathroom": "124140",
    "motorcyclesuperstore": "123992",
    "motosport": "124443",
    "newbalance": "124265",
    "oakley": "123705",
    "officemax": "124083",
    "petco": "123839",
    "saksfifthaveneue": "127419",
    "skis": "123901",
    "soccer": "124115",
    "sportsmemorabilia": "124378",
    "themicrosoftstore": "127528",
    "uggaustralia": "124396",
    "vitaminworld": "126739",
}
