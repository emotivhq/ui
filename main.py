
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart
from giftstart.GiftStart import GiftStart


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        if self.request.get('uuid'):
            if self.request.cookies['uid']:
                gss = GiftStart.query(GiftStart.staging_uuid ==
                                      self.request.get('uuid')).fetch(1)
                if len(gss):
                    gss[0].gift_champion_uid = self.request.cookies['uid']
                    gss[0].put()
        self.response.write(render_app(self.request))


class GiftStartMainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_app_with_giftstart(self.request))


app = webapp2.WSGIApplication([
    ('/giftstart/.*', GiftStartMainHandler),
    ('/giftstart', GiftStartMainHandler),
    ('/create-giftstart', MainHandler),
    ('/.*', MainHandler),
], debug=True)
