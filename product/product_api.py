__author__ = 'stuart'

import webapp2
import json
import product_fetch
import product_tax


class ProductHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'get':
            self.response.write(json.dumps(product_fetch.product(data)))

        elif data['action'] == 'get-tax-and-shipping':
            shipping_address = data['shipping_address']
            shipping_city = data['shipping_city']
            shipping_state = data['shipping_state']
            shipping_zip = data['shipping_zip']
            tax_percent = product_tax.lookup(shipping_address, shipping_city,
                                             shipping_state, shipping_zip)
            self.response.write(json.dumps({'tax': tax_percent}))

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)