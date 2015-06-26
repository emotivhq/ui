"""
Product search - searches partner product feeds for user queries, sorting
by relevance.
"""

__author__ = 'GiftStarter'

import requests
from requests.exceptions import ConnectionError
import urllib
import json
import logging
import base64
import hmac
import hashlib
from datetime import datetime
from lxml import etree
from google.appengine.api import search
import re
import math
from feeds import FeedProduct
from uuid import uuid4
import HTMLParser
from google.appengine.ext import ndb
from giftideas.giftideas_api import get_giftideas_json


class SearchProduct(FeedProduct):
    """a searchable representation of a product, usually extracted from a FeedProduct"""
    doc_id = ndb.StringProperty(required=True)

    def to_search_document(self):
        """ self.to_search_document() -> search.Document
        Creates a search document for indexing
        """
        self.doc_id = hashlib.md5(self.url.encode('ascii', 'replace')+':'+self.title.encode('ascii', 'replace')).hexdigest()
        doc = search.Document(
            doc_id=self.doc_id,
            fields=[
                search.TextField(name='title', value=self.title),
                search.HtmlField(name='description',
                                 value=self.description),
                search.TextField(name='url', value=self.url),
                search.TextField(name='img', value=self.img),
                search.NumberField(name='price', value=self.price),
                search.TextField(name='retailer', value=self.retailer),
                search.TextField(name='extended_description',
                                 value=self.extended_description),
                search.TextField(name='keywords', value=self.keywords),
            ])
        return doc

    @staticmethod
    def from_amazon(tree):
        """ parse_amazon_item(<Element Item ...>) -> {'title': 'xbox 1', ...}
        Parses an lxml element into a product

        @type tree: etree
        """
        def xfind(path):
            """ xfind('.//{ns}Tag/{ns}ChildTag') -> 'first child text' | None
            """
            xml_ns = '{http://webservices.amazon.com/AWSECommerceService/' \
                     '2011-08-01}'
            result = etree.ETXPath(path.format(ns=xml_ns))(tree)
            return result[0].text if result else None

        title = xfind('.//{ns}ItemAttributes/{ns}Title')
        title = title[:499] if title is not None else None
        description = xfind('.//{ns}EditorialReviews/{ns}EditorialReview/'
                            '{ns}Content')
        #price = xfind('.//{ns}ItemAttributes/{ns}ListPrice/{ns}Amount')
        #if price is None:
        price = xfind('.//{ns}Offers/{ns}Offer/{ns}OfferListing/'
                          '{ns}Price/{ns}Amount')
        img = xfind('.//{ns}LargeImage/{ns}URL')
        url = xfind('.//{ns}DetailPageURL')
        retailer = 'Amazon'
        # TODO: lots of amazon prices are None - why?
        price = int(price) if price else 0

        return SearchProduct(title=title, description=description, price=price,
                             img=img, url=url, retailer=retailer)

    @staticmethod
    def from_prosperent(prod):
        return SearchProduct(title=prod.get('keyword'),
                             description=prod.get('description'),
                             price=(int(100*float(prod.get('price_sale'))) if prod.get('price_sale').isdigit() else int(100*float(prod.get('price')))),
                             img=prod.get('image_url'),
                             url=prod.get('affiliate_url'),
                             retailer=prod.get('merchant'),
                             keywords=str(prod.get('category')).replace('>',
                                                                        ' '))

    @staticmethod
    def from_feed_product(prod):
        return SearchProduct(key=ndb.Key(pairs=prod.key.pairs()+ndb.Key("SearchProduct",str(uuid4())).pairs()), title=prod.title, description=prod.description,
                             price=prod.price, img=prod.img, url=prod.url,
                             retailer=prod.retailer,
                             extended_description=prod.extended_description,
                             keywords=prod.keywords)

    @staticmethod
    def from_search_result(search_result):
        """
        @type search_result: search.Document
        @rtype: SearchProduct
        """
        fields = {field.name: field.value for field in search_result.fields}
        fields['price'] = int(fields['price'])
        return SearchProduct(**fields)

    @staticmethod
    def jsonify_product_list(product_list):
        """
        Returns a json object for the list of SearchProducts passed in
        @type product_list: [SearchProduct]
        @rtype: str
        """
        dict_list = [product.dictify() for product in product_list]
        return json.dumps(dict_list)

class IndexedUid(ndb.Model):
    """dummy type so we can enforce uniques; get_or_insert this with a unique Key and uid, then see if uid of returned item matches the provided one """
    uid = ndb.StringProperty(required=True)

def add_search_keyword(index, keyword):
    """
    uniquely associate a given keyword with the provided index; if returns False, do not add search results
    :param index: a SearchIndex
    :param keyword: unique keyword
    :return: True if a new association was formed, False if one already exists
    """
    uid = str(uuid4())
    extant = IndexedUid.get_or_insert(index.name + ':' + keyword, uid=uid)
    return uid == extant.uid

def clear_all_search_keywords():
    remaining = 1
    while remaining > 0:
        x = IndexedUid.query().fetch(100)
        remaining = len(x)
        ndb.delete_multi([y.key for y in x])

def get_static_product_index():
    return search.Index(name='product-search-0')

def get_dynamic_product_index():
    return search.Index(name='product-search-1')

def copy_index(source_index,target_index):
    """
    clears target_index, then copies all documents from source_index to target_index
    :param source_index: index from which to acquire documents; unmodified
    :param target_index: index to which documents should be copied; cleared before copy
    :return: number of documents copied
    """
    logging.info('copy_index: clearing {0}'.format(target_index.name))
    delete_all_from_index(target_index)
    cursor = search.Cursor()
    total_retrieved = 0
    if len(source_index.search(search.Query(query_string='')).results) > 0:
        try:
            while cursor is not None:
                options = search.QueryOptions(cursor=cursor, limit=1000)
                query = search.Query(query_string='', options=options)
                result = source_index.search(query)
                number_retrieved = len(result.results)
                total_retrieved += number_retrieved
                if number_retrieved > 0:
                    logging.info('copy_index: {0} from {1} to {2}'.format(number_retrieved, source_index.name, target_index.name))
                    cursor = result.cursor
                    add_to_index(target_index,result.results)
        except search.Error as x:
            logging.exception('copy_index failed: {0}'.format(x.message))
            return x.message
    return total_retrieved

def insert_giftideas_into_index(target_index):
    category_jsons = get_giftideas_json()
    giftideas_docs = []
    html_parser = HTMLParser.HTMLParser()
    for category_json in category_jsons:
        category_slug = category_json['categorySlug'].strip()
        keywords = category_slug
        for product in category_json['productList']:
            url = product['giftStartLink'].strip()
            price = product['productPrice'].strip()
            if len(url)>0 and price.replace('.','').isnumeric():
                price = float(price)*100
                title = html_parser.unescape(product['productName']).encode('utf8', 'replace').strip()
                img = product['productImage'].strip()
                img = img if img.startswith('http') else ('/assets/giftideas/category'+img)
                description = product['productDescription'].encode('utf8', 'replace').strip()
                extended_description = description
                retailer = 'giftideas'
                # logging.error("{2}: {1} {0} {3} {4}".format(title,price,url,img,description))
                doc = search.Document(
                    doc_id=hashlib.md5(url.encode('utf8', 'replace')+':'+title).hexdigest(),
                    fields=[
                        search.TextField(name='title', value=title),
                        search.HtmlField(name='description',
                                         value=description),
                        search.TextField(name='url', value=url),
                        search.TextField(name='img', value=img),
                        search.NumberField(name='price', value=price),
                        search.TextField(name='retailer', value=retailer),
                        search.TextField(name='extended_description',
                                         value=extended_description),
                        search.TextField(name='keywords', value=keywords),
                    ])
                # logging.error("{0}".format(doc))
                giftideas_docs.append(doc)
    return add_to_index(target_index,giftideas_docs,True)

def product_search(query):
    """ search('xbox 1') -> [SearchProduct...]
    Search for specified keywords, returning a list of products from all
    partners, sorted by relevance
    """
    query = re.sub(r'\bgift(s)*\b', ' ', query.lower()).strip()
    escaped_query = re.sub(r'[^a-zA-Z\d\s]+', ' ', query)
    index = get_dynamic_product_index()
    logging.info("Beginning query for {0}...\t{1}".format(escaped_query,datetime.utcnow().isoformat()))
    #if we've never searched for this keyword before, run the search and add results
    if add_search_keyword(get_dynamic_product_index(),escaped_query):
        dynamic_products = []
        logging.info("Searching amazon...\t" + datetime.utcnow().isoformat())
        dynamic_products += [product for product in search_amazon(query)]
        logging.info("Searching prosperent...\t" + datetime.utcnow().isoformat())
        dynamic_products += [product for product in search_prosperent(query)]
        logging.info("Adding products to index...\t" + datetime.utcnow().isoformat())
        add_to_index(index, docs = [prod.to_search_document() for prod in dynamic_products])
    # sorted_products = sort_by_relevance(index, escaped_query, dynamic_products)
    sorted_products = search_products(index, escaped_query)
    logging.info("Returning {0} results...\t{1}".format(len(sorted_products),datetime.utcnow().isoformat()))
    return SearchProduct.jsonify_product_list(sorted_products)


def search_amazon(query):
    """ search_amazon('xbox 1') -> [Product...]
    Search for specified keywords on amazon, returning a list of products
    """
    try:
        response = requests.get(make_amazon_url(query)).text
        return parse_amazon_products(response)
    except ConnectionError as x:
        logging.error("ConnectionError in product_search: "+str(x.message))
        return []


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
             "&ResponseGroup=ItemAttributes%2CImages%2CEditorialReview%2COfferFull" \
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
    products = [SearchProduct.from_amazon(element)
                for element in root.iter()
                if element.tag.split('}')[-1] == 'Item']
    products = [product for product in products if price_filter(product)]

    # Remove products missing data
    return products


def search_prosperent(query):
    """ search_prosperent('xbox 1') -> [Product...]
    Search for specified keywords on prosperent, returning a list of products
    """
    products = []

    try:
        response = json.loads(requests.get(make_prosperent_url(query)).text)
        if response.get('errors'):
            logging.error(
                'Prosperent error during search:\t' +
                json.dumps(response['errors']))
        else:
            products = [SearchProduct.from_prosperent(prosp_prod)
                        for prosp_prod in response.get('data')]
            products = [product for product in products if price_filter(product)]
        return products
    except ConnectionError as x:
        logging.error("ConnectionError in product_search: "+str(x.message))
        return []


def make_prosperent_url(query):
    """ make_prosperent_url('xbox 1') -> 'http://api.prosperent.com/a...' """
    return "http://api.prosperent.com/api/search" \
           "?api_key=0ea6828d486ddb94138d277e9007790b" \
           "&query=" + urllib.quote(query) + \
           "&filterMerchantId=" + "|".join(PROSPERENT_RETAILERS.values()) + \
           "&imageSize=500x500" \
           "&limit=90" \
           "&filterPrice=74.99,"


# def sort_by_relevance(index, keywords, dynamic_products):
#     """ sort_by_relavence('xbox 1', [Product...]) -> [Product...]
#     Sorts a list of products by relevance to the supplied keywords
#     """
#     logging.info("Building dynamic index...\t" + datetime.utcnow().isoformat())
#     dynamic_ids = put_search_products(index, dynamic_products)
#     logging.info("Searching products...\t" + datetime.utcnow().isoformat())
#     sorted_products = search_products(index, keywords)
#     logging.info("Found: "+str(len(sorted_products)))
#     logging.info("Cleaning up...\t" + datetime.utcnow().isoformat())
#     delete_from_index(index, dynamic_ids)
#     return sorted_products
#
#
# def put_search_products(index, products):
#     """ put_documents([Product...]) -> (Index, [Id...])
#     Puts an array of documents and returns the index and ids of the put docs
#     """
#
#     docs = [prod.to_search_document(str(i))
#             for i, prod in enumerate(products)]
#     ids = [str(i) for i in range(len(docs))]
#     add_to_index(index, docs)
#     return ids


def add_to_index(index, docs, suppress_duplicates_warning=False):
    """ add_to_index(Index, [Doc...]) -> None
    Adds all the provided documents to the given index
    :param index: SearchIndex to which items should be added
    :param docs: docs to add
    :param suppress_duplicates_warning: don't show a warning if a duplicate doc_id is found (False)
    :return: number added after deduplication
    """
    docs_deduplicated = []
    doc_ids = []
    for doc in docs:
        if doc.doc_id in doc_ids:
            if not suppress_duplicates_warning:
                logging.error("Duplicate doc_id; unable to add_to_index: {0}".format(doc))
        else:
            doc_ids.append(doc.doc_id)
            docs_deduplicated.append(doc)
    docs=docs_deduplicated
    logging.info("Adding {0} docs to {1}".format(len(docs), index.name))
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    doc_sets = [docs[k*i:k*(i+1)] for i in range(len(docs)/k+1)]
    for doc_set in doc_sets:
        if len(doc_set) > 0:
            index.put(doc_set)
    return len(docs)


def delete_from_index(index, ids):
    """ delete_from_index(Index, [Id...]) -> None
    Removes all the provided ids from the given index
    """
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    id_sets = [ids[k*i:k*(i+1)] for i in range(len(ids)/k+1)]
    for id_set in id_sets:
        if len(id_set) > 0:
            index.delete(id_set)


def delete_all_from_index(index):
    """Delete all the docs in the given index."""
    # looping because get_range by default returns up to 100 documents at a time
    while True:
        # Get a list of documents populating only the doc_id field and extract the ids.
        document_ids = [document.doc_id
                        for document in index.get_range(ids_only=True)]
        if not document_ids:
            break
        # Delete the documents for the given ids from the Index.
        index.delete(document_ids)


def search_products(index, keywords):
    """ search_products(Index, 'xbox 1') -> [Product...]
    Searches the passed in index for the supplied keywords, with scoring

    @type index: search.Index
    @type keywords: str
    @rtype: list of [SearchProduct]
    """
    sort_opts = search.SortOptions(
        match_scorer=search.MatchScorer(),)
        # expressions=[partner_target])
    query_options = search.QueryOptions(
        limit=100,
        sort_options=sort_opts)
    query = search.Query(query_string=keywords, options=query_options)

    search_result = index.search(query)
    preferred_results = get_preferred_products(search_result)
    return [SearchProduct.from_search_result(search_result)
            for search_result in preferred_results]


def get_preferred_products(scored_results):
    """
    @type scored_results: search.SearchResults
    @return:
    """
    for i in range(len(scored_results.results)):
        scored_results.results[i] = apply_preference(scored_results.results[i])

    return sorted(scored_results.results,
                  key=(lambda res: -res.sort_scores[0]))


def price_filter(product):
    """return True only for products over $99.98 ($39.98 for butter LONDON) """
    if product.retailer == 'butter LONDON':
        return product.price > 3998
    else:
        return product.price > 9998


def score_price(price):
    """ Calculates the search score for a given price - don't want too much
    expensive stuff clogging the first results!
    @type price: int
    @rtype: float
    """
    if price < 40000:
        return 1
    elif price > 320000:
        return 0.25
    else:
        return 1 - 0.25 * math.log(price / 40000.0, 2)


def apply_preference(scored_result):
    """
    @type scored_result: search.ScoredDocument
    @rtype: search.ScoredDocument
    """
    for field in scored_result.fields:
        """ @type field: search.Field """
        if field.name == 'retailer':
            if field.value in PARTNERS:
                scored_result.sort_scores[0] *= 2
        if field.name == 'price':
            scored_result.sort_scores[0] *= score_price(field.value)
    return scored_result

PARTNERS = [
    'butter LONDON',
    'B&H Photo Video',
    'Sturtevant\'s',
]

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
