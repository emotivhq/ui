
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart
from giftstart.GiftStart import GiftStart
from gs_user.gs_user_login_decorator import handle_login


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    @handle_login
    def get(self):
        # Check for create redirect
        if self.request.get('staging_uuid'):
            if self.request.cookies['uid']:
                gss = GiftStart.query(GiftStart.staging_uuid ==
                                      self.request.get('staging_uuid')).fetch(1)

                if len(gss):
                    gss[0].gift_champion_uid = self.request.cookies['uid']
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
