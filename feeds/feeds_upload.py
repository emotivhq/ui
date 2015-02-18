__author__ = 'GiftStarter'

import webapp2
from product.product_search import SearchProduct
from product.product_search import delete_from_index
from product.product_search import add_to_index
from product.product_search import get_product_index
from google.appengine.ext import ndb
import logging
from uuid import uuid4
from urlparse import parse_qs
from google.appengine.api import search


class ManualUploadHandler(webapp2.RequestHandler):
    def post(self):
        data = self.request.body

        line_split = '[giftstartersplit]'
        line_end = '[giftstarterendline]'
        lines = [line.split(line_split) for line in data.split(line_end)]

        products = []
        search_docs = []
        for line in lines:
            if len(line) < 5:
                break
            price = int(100*float(line[4].strip()))
            if price > 7498:
                title = line[0].strip()
                img = line[2].strip()
                url = line[3].strip()
                retailer = line[5].strip()
                description = line[1].strip().decode('ascii', 'ignore')
                logging.info("Uploaded: {0} {1} {2} {3} {4} {5}...".format(retailer,title,price,img,url,description[:50]))
                product = SearchProduct(
                    title=title,
                    price=price,
                    img=img,
                    url=url,
                    retailer=retailer,
                    description=description)
                products.append(product)
                search_docs.append(product.to_search_document(str(uuid4())))

        logging.info("Adding {0} manual products".format(len(search_docs)))
        add_to_index(get_product_index(), search_docs)
        logging.info("Indexing {0} manual products".format(len(products)))
        ndb.put_multi(products)

class SturtevantsUploadHandler(webapp2.RequestHandler):
    def post(self):
        data = self.request.body

        line_split = '[giftstartersplit]'
        line_end = '[giftstarterendline]'
        lines = [line.split(line_split) for line in data.split(line_end)]

        products = []
        search_docs = []
        for line in lines:
            if len(line) < 5:
                break
            price = int(100*float(line[4]))
            if price > 7498:
                product = SearchProduct(
                    title=line[0],
                    price=price,
                    img=line[2],
                    url=line[3],
                    retailer='Sturtevant\'s',
                    description=line[1].decode('ascii', 'ignore'))
                products.append(product)
                search_docs.append(product.to_search_document(str(uuid4())))

        logging.info("Adding {0} sturt products".format(len(search_docs)))
        add_to_index(get_product_index(), search_docs)
        logging.info("Indexing {0} sturt products".format(len(products)))
        ndb.put_multi(products)


class ManualDeleteHandler(webapp2.RequestHandler):

    def post(self):
        data = parse_qs(self.request.body)
        retailer = data.get("retailer")[0]
        if len(retailer)>5:
            remaining = 1
            while remaining > 0:
                prods = SearchProduct\
                    .query(SearchProduct.retailer == retailer)\
                    .fetch(100)
                remaining = len(prods)
                logging.info("Unindexing {0} {1} products".format(remaining, retailer))
                delete_from_index(get_product_index(), [prod.doc_id for prod in prods])
                logging.info("Deleting {0} {1} products".format(remaining, retailer))
                ndb.delete_multi([prod.key for prod in prods])

class SturtevantsDeleteHandler(webapp2.RequestHandler):

    def post(self):
        remaining = 1
        while remaining > 0:
            prods = SearchProduct\
                .query(SearchProduct.retailer == "Sturtevant's")\
                .fetch(100)
            remaining = len(prods)
            logging.info("Unindexing {0} sturt products".format(remaining))
            delete_from_index(get_product_index(), [prod.doc_id for prod in prods])
            logging.info("Deleting {0} sturt products".format(remaining))
            ndb.delete_multi([prod.key for prod in prods])
