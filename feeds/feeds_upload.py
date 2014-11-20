__author__ = 'Stuart'

import webapp2
from product.product_search import SearchProduct
from google.appengine.ext import ndb
import logging
from uuid import uuid4
from google.appengine.api import search


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

        put_search_docs(search_docs)
        ndb.put_multi(products)


class SturtevantsDeleteHandler(webapp2.RequestHandler):

    @ndb.toplevel
    def post(self):
        offset = 0
        remaining = 1
        while remaining > 0:
            prods = SearchProduct\
                .query(SearchProduct.retailer == "Sturtevant's")\
                .fetch(100, offset=offset)
            offset += 100
            remaining = len(prods)
            logging.info("Deleting {0} sturt products".format(remaining))
            delete_search_docs([prod.doc_id for prod in prods])
            ndb.delete_multi_async([prod.key for prod in prods])


def put_search_docs(docs):
    index = search.Index(name='product-search-0')
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    doc_sets = [docs[k*i:k*(i+1)] for i in range(len(docs)/k+1)]
    for doc_set in doc_sets:
        if len(doc_set) > 0:
            index.put(doc_set)


def delete_search_docs(doc_ids):
    index = search.Index(name='product-search-0')
    k = search.MAXIMUM_DOCUMENTS_PER_PUT_REQUEST
    id_sets = [doc_ids[k*i:k*(i+1)] for i in range(len(doc_ids)/k+1)]
    for id_set in id_sets:
        if len(id_set) > 0:
            index.delete(id_set)