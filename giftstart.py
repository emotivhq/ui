__author__ = 'stuart'

import webapp2
import json


class GiftStart():

    def __init__(self, product, user):
        # TODO: create ndb class to store GiftStart
        self.product = product
        self.user = user
        self.id = -1
        self.parts = [[{'bought': False, 'value': 25} for i in range(5)] for j in range(4)]
        self.parts[2][2]['bought'] = True
        self.parts[2][3]['bought'] = True
        self.parts[3][3]['bought'] = True

    def jsonify(self):
        return json.dumps({'giftstart': {'product': self.product, 'user': self.user, 'id': self.id,
                                         'parts': self.parts}})


class GiftStartHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        product = data['product']
        user = data['user']
        gs = GiftStart(product, user)
        gs.id = 1

        self.response.write(gs.jsonify())

api = webapp2.WSGIApplication([('/giftstart', GiftStartHandler)], debug=True)