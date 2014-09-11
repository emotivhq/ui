
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_app(self.request))


class GiftStartMainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_app_with_giftstart(self.request))


app_gs = webapp2.WSGIApplication([('/giftstart', GiftStartMainHandler)], debug=True)
app_gsc = webapp2.WSGIApplication([('/create-giftstart', MainHandler)], debug=True)
app = webapp2.WSGIApplication([('/.*', MainHandler)], debug=True)
