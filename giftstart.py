__author__ = 'stuart'

import webapp2
import json


class GiftStart():

    def __init__(self, product, user):
        # TODO: create ndb class to store GiftStart
        self.product = product
        self.user = user

    def jsonify(self):
        return json.dumps({'product': self.product, 'user': self.user})


class GiftStartHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        product = data['product']
        user = data['user']
        gs = GiftStart(product, user)

        self.response.write(gs.jsonify())

api = webapp2.WSGIApplication([('/giftstart', GiftStartHandler)], debug=True)