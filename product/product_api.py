"""provide JSON-encoded product data (from keyword search or from a known provider's URL), and tax percentage data lookups"""
__author__ = 'GiftStarter'

import webapp2
import json
import product_fetch
import product_tax
import product_fees
import product_search
import urllib
import logging
from datetime import datetime
import yaml
from google.appengine.api import taskqueue

config = yaml.load(open('config.yaml'))

class ProductHandler(webapp2.RequestHandler):

    """provide JSON-encoded data for a specific product, or provide tax percentage for given zip code"""

    def post(self):
        data = json.loads(self.request.body)
        if data.get('action') == 'get':
            self.response.write(
                json.dumps(
                    product_fetch.product(
                        data['product_url'])))

        elif data.get('action') == 'get-tax-and-shipping':
            title = str(data.get('title').lower())
            shipping_address = data['shipping_address']
            shipping_city = data['shipping_city']
            shipping_state = data['shipping_state']
            shipping_zip = data['shipping_zip']
            is_gift_card = 'gift' in title and 'card' in title
            is_gift_card |= 'ghostruck' in title.lower()
            tax_percent = product_tax.lookup(shipping_address, shipping_city,
                                             shipping_state, shipping_zip,
                                             is_gift_card)
            self.response.write(json.dumps({'tax': tax_percent}))

        elif data.get('action') == 'get-service-fee':
            coupon = data['coupon'] if 'coupon' in data else ''
            self.response.write(json.dumps({'fee': product_fees.lookup(coupon)}))



class ProductUrlHandler(webapp2.RequestHandler):
    """extract product info from known provider's website and return as JSON [product{price,title,logo,imgs,title}]"""

    def get(self):
        url = urllib.unquote(
            urllib.unquote(
                self.request.path
                    .lstrip('/products/urls/')
                    .rstrip('.json')))
        self.response.write(json.dumps(product_fetch.product(url)))


class ProductAdminHandler(webapp2.RequestHandler):
    """perform a keyword search and return as JSON [{price,retailer,imgUrl,description,title,url}]"""

    def get(self):
        #only allow use by local devs, or by AppEngine cron
        if self.request.headers.get('X-AppEngine-Cron') is None and not self.request.host.startswith('localhost'):
            logging.warn('Unauthorized attempt to access {0}'.format(self.request.path_url))
            return
        logging.warn("Clearing all search keywords...\t{0}".format(datetime.utcnow().isoformat()))
        product_search.clear_all_search_keywords()
        static_product_index = product_search.get_static_product_index()
        dynamic_product_index = product_search.get_dynamic_product_index()
        logging.warn("Copying from {0} to {1}...\t{2}".format(static_product_index.name,dynamic_product_index.name,datetime.utcnow().isoformat()))
        n_static_products = product_search.copy_index(static_product_index, dynamic_product_index)
        logging.warn("Completed copy of {0} products...\t{1}".format(n_static_products,datetime.utcnow().isoformat()))
        logging.warn("Inserting GiftIdeas into {0}...\t{1}".format(dynamic_product_index.name,datetime.utcnow().isoformat()))
        n_giftideas = product_search.insert_giftideas_into_index(dynamic_product_index)
        logging.warn("Completed copy of {0} giftideas...\t{1}".format(n_giftideas,datetime.utcnow().isoformat()))
        self.response.write("OK: {0}, {1}".format(n_static_products,n_giftideas))
        # pre-cache common search terms
        keywords = config['commonSearchWords']
        for keyword in keywords:
            logging.warn('precaching keyword: {0}'.format(keyword))
            taskqueue.add(url='/products/{0}.json'.format(keyword),method='GET')


class ProductSearchHandler(webapp2.RequestHandler):
    """perform a keyword search and return as JSON [{price,retailer,imgUrl,description,title,url}]"""

    def get(self):
        query = urllib.unquote(self.request.path[10:-5])
        prods = product_search.product_search(query)
        self.response.write(prods)


handler = webapp2.WSGIApplication([
    ('/products/urls/.*.json', ProductUrlHandler),
    ('/products/.*.json', ProductSearchHandler),
    ('/products/admin', ProductAdminHandler),
    ('/product', ProductHandler),
], debug=True)
