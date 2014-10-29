__author__ = 'stuart'

import webapp2
import json
import product_fetch
import product_tax
import product_search
import urllib


class ProductHandler(webapp2.RequestHandler):

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
            tax_percent = product_tax.lookup(shipping_address, shipping_city,
                                             shipping_state, shipping_zip,
                                             is_gift_card)
            self.response.write(json.dumps({'tax': tax_percent}))


class ProductUrlHandler(webapp2.RequestHandler):

    def get(self):
        url = urllib.unquote(
            urllib.unquote(
                self.request.path
                    .lstrip('/products/urls/')
                    .rstrip('.json')))
        self.response.write(json.dumps(product_fetch.product(url)))


class ProductSearchHandler(webapp2.RequestHandler):

    def get(self):
        query = urllib.unquote(self.request.path[10:-5])
        prods = product_search.product_search(query)
        self.response.write(prods)


handler = webapp2.WSGIApplication([
    ('/products/urls/.*.json', ProductUrlHandler),
    ('/products/.*.json', ProductSearchHandler),
    ('/product', ProductHandler),
], debug=True)
