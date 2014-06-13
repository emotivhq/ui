__author__ = 'stuart'

import webapp2
import json
import fetch


class ProductHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        if data['action'] == 'get':
            self.response.write(json.dumps(fetch.product(data)))

        elif data['action'] == 'get-sales-and-shipping':
            product_url = data['product_url']
            shipping_address = data['shipping_address']
            shipping_city = data['shipping_city']
            shipping_state = data['shipping_state']
            shipping_zip = data['shipping_zip']
            tax_and_shipping = fetch.sales_tax_and_shipping(product_url, shipping_address, shipping_city,
                                                            shipping_state, shipping_zip)
            self.response.write(json.dumps(tax_and_shipping))

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)