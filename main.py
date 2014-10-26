
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart
from giftstart.GiftStart import GiftStart
from gs_user.gs_user_login_decorator import handle_login
from google.appengine.ext import ndb
import json
import base64


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    @handle_login
    def get(self):
        # Check for create redirect
        if self.request.get('state'):
            state = json.loads(base64.b64decode(self.request.get('state',
                                                                 'e30=')))
            staging_uuid = state.get('staging_uuid')
            if bool(staging_uuid) and bool(self.request.cookies['uid']):
                gss = GiftStart.query(GiftStart.staging_uuid ==
                                      self.request.get('staging_uuid')).fetch(1)

                if len(gss):
                    uid = self.request.cookies['uid']
                    user = ndb.Key('User', uid).get()
                    gss[0].gift_champion_uid = uid
                    gss[0].gc_name = user.name
                    gss[0].put()
                    self.redirect('/giftstart/' + gss[0].giftstart_url_title)
                    return

        # JK! Just render the app
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
