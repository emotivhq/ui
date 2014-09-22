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
            shipping_address = data['shipping_address']
            shipping_city = data['shipping_city']
            shipping_state = data['shipping_state']
            shipping_zip = data['shipping_zip']
            tax_percent = product_tax.lookup(shipping_address, shipping_city,
                                             shipping_state, shipping_zip)
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
        query = self.request.path.lstrip('/products/').rstrip('.json')
        self.response.write(json.dumps(product_search.search(query)))


handler = webapp2.WSGIApplication([
    ('/products/urls/.*.json', ProductUrlHandler),
    ('/products/.*.json', ProductSearchHandler),
    ('/product', ProductHandler),
], debug=True)
