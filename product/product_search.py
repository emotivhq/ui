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
import re
import math
from feeds import FeedProduct


class SearchProduct(FeedProduct):

    def to_search_document(self, id):
        """ self.to_search_document(12) -> search.Document
        Creates a search document for indexing

        :type id int
        """
        return search.Document(
            doc_id=str(id),
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

    @staticmethod
    def from_amazon(tree):
        """ parse_amazon_item(<Element Item ...>) -> {'title': 'xbox 1', ...}
        Parses an lxml element into a product

        :type tree etree
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
        price = xfind('.//{ns}ItemAttributes/{ns}ListPrice/{ns}Amount')
        if price is None:
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
                             price=int(100*float(prod.get('price'))),
                             img=prod.get('image_url'),
                             url=prod.get('affiliate_url'),
                             retailer=prod.get('merchant'),
                             keywords=str(prod.get('category')).replace('>',
                                                                        ' '))

    @staticmethod
    def from_feed_product(prod):
        return SearchProduct(title=prod.title, description=prod.description,
                             price=prod.price, img=prod.img, url=prod.url,
                             retailer=prod.retailer,
                             extended_description=prod.extended_description,
                             keywords=prod.keywords)

    @staticmethod
    def from_search_result(search_result):
        """
        :type search_result: search.Document
        :rtype SearchProduct
        """
        fields = {field.name: field.value for field in search_result.fields}
        fields['price'] = int(fields['price'])
        return SearchProduct(**fields)

    @staticmethod
    def jsonify_product_list(product_list):
        """
        Returns a json object for the list of SearchProducts passed in
        :type product_list [SearchProduct]
        :rtype str
        """
        dict_list = [product.dictify() for product in product_list]
        return json.dumps(dict_list)


def price_filter(product):
    if product.retailer == 'butter LONDON':
        return product.price > 3998
    else:
        return product.price > 7498


def product_search(query):
    """ search('xbox 1') -> [SearchProduct...]
    Search for specified keywords, returning a list of products from all
    partners, sorted by relevance
    """
    escaped_query = re.sub(r'[^a-zA-Z\d\s]+', ' ', query)

    """ :type products [SearchProduct] """
    products = []
    logging.info("Searching amazon...\t" + datetime.utcnow().isoformat())
    products += [product for product in search_amazon(query)
                 if price_filter(product)]
    logging.info("Searching prosperent...\t" + datetime.utcnow().isoformat())
    products += [product for product in search_prosperent(query)
                 if price_filter(product)]
    logging.info("Adding feed products...\t" + datetime.utcnow().isoformat())
    products += [SearchProduct.from_feed_product(prod)
                 for prod in FeedProduct.query().fetch()
                 if price_filter(prod)]
    logging.info("Sorting products...\t" + datetime.utcnow().isoformat())
    sorted_products = sort_by_relevance(escaped_query, products)
    logging.info("Returning...\t" + datetime.utcnow().isoformat())
    return SearchProduct.jsonify_product_list(sorted_products)


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

    # Remove products missing data
    return products


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
        products = [SearchProduct.from_prosperent(prosp_prod)
                    for prosp_prod in response.get('data')]

    return products


def make_prosperent_url(query):
    """ make_prosperent_url('xbox 1') -> 'http://api.prosperent.com/a...' """
    return "http://api.prosperent.com/api/search" \
           "?api_key=0ea6828d486ddb94138d277e9007790b" \
           "&query=" + urllib.quote(query) + \
           "&filterMerchantId=" + "|".join(PROSPERENT_RETAILERS.values()) + \
           "&imageSize=500x500" \
           "&limit=90" \
           "&filterPrice=74.99,"


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
    index = search.Index(name='product-search-0')
    docs = [prod.to_search_document(str(i))
            for i, prod in enumerate(products)]
    ids = [str(i) for i in range(len(docs))]
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    doc_sets = [docs[k*i:k*(i+1)] for i in range(len(docs)/k+1)]
    for doc_set in doc_sets:
        if len(doc_set) > 0:
            index.put(doc_set)
    return index, ids


def cleanup_search(index, ids):
    """ cleanup_search([Id...]) -> None
    Removes all the added documents from the search index after completion
    """
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    id_sets = [ids[k*i:k*(i+1)] for i in range(len(ids)/k+1)]
    for id_set in id_sets:
        if len(id_set) > 0:
            index.delete(id_set)


def search_products(index, keywords):
    """ search_products(Index, 'xbox 1') -> [Product...]
    Searches the passed in index for the supplied keywords, with scoring

    :type index search.Index
    :type keywords str
    :rtype list of [SearchProduct]
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
    :type scored_results search.SearchResults
    :return:
    """
    for i in range(len(scored_results.results)):
        scored_results.results[i] = apply_preference(scored_results.results[i])

    return sorted(scored_results.results,
                  key=(lambda res: -res.sort_scores[0]))


def score_price(price):
    """ Calculates the search score for a given price - don't want too much
    expensive stuff clogging the first results!
    :type price: int
    :rtype: float
    """
    if price < 40000:
        return 1
    elif price > 320000:
        return 0.25
    else:
        return 1 - 0.25 * math.log(price / 40000.0, 2)


def apply_preference(scored_result):
    """
    :type scored_result search.ScoredDocument
    :rtype: search.ScoredDocument
    """
    for field in scored_result.fields:
        """ :type field search.Field """
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
