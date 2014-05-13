__author__ = 'stuart'

import webapp2
import json
import fetch


class ProductHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        self.response.write(fetch.product(data))

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)