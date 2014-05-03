__author__ = 'stuart'

import webapp2
import json
from fetch import fetch_product


class ProductHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        self.response.write(fetch_product(data))

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)