"""Primary entry point for app: handle /.* requests which are not caught by other handlers, plus /giftstart/.*"""
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart
from giftstart.GiftStart import GiftStart
from gs_user.gs_user_login_decorator import handle_login
from giftstart import giftstart_create
import json
import base64
import logging
import urllib
import time


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    """Handle requests to /.* (if a staging UUID is present, extract and redirect to /giftstart/...)"""
    @handle_login
    def get(self):
        if self.request.cookies.get('uid'):
            self.response.set_cookie('uid', urllib.unquote(self.request.cookies['uid'].replace('%22', '')))
        if self.request.cookies.get('token'):
            self.response.set_cookie('token', urllib.unquote(self.request.cookies['token'].replace('%22', '')))

        # Check for create redirect
        if self.request.get('state'):
            logging.info("Found state vairable")
            state = json.loads(base64.b64decode(
                self.request.get('state', 'e30=')))
            staging_uuid = state.get('staging_uuid')
            logging.info("Found staging UUID: {0}".format(staging_uuid))
            if bool(staging_uuid):
                if 'uid' in self.request.cookies and bool(self.request.cookies['uid']):
                    gss = GiftStart.query(GiftStart.staging_uuid == staging_uuid).fetch(1)
                    if(not len(gss)):
                        # eventual consistency: sometimes fails to get an element that was just created
                        logging.info("Failed to fetch giftstart with staging uuid: {0}; retrying...".format(staging_uuid))
                        time.sleep(5)
                        gss = GiftStart.query(GiftStart.staging_uuid == staging_uuid).fetch(1)
                    if(not len(gss)):
                        logging.info("Failed to fetch giftstart with staging uuid: {0}".format(staging_uuid))
                    if len(gss):
                        logging.info("Fetched giftstart with staging uuid:\n{0}".format(staging_uuid))
                        uid = urllib.unquote(self.request.cookies['uid'].replace('%22', ''))
                        giftstart_create.complete_campaign_creation(uid, gss[0])
                        self.redirect('/giftstart/' + gss[0].giftstart_url_title)
                        return
                else:
                    #bad login (usually, user hit Cancel during LinkedIn or Twitter dialog)
                    logging.error("Unable to find uid in request with staging_uuid {0} (likely they cancelled login): {1}".format(staging_uuid, self.request))
                    try:
                        gss = GiftStart.query(GiftStart.staging_uuid == staging_uuid).fetch(1)
                        if not len(gss):
                            time.sleep(5)
                            gss = GiftStart.query(GiftStart.staging_uuid == staging_uuid).fetch(1)
                        if len(gss):
                            gs=gss[0]
                            params = {'product_url': gs.product_url,
                                      'title': gs.product_title,
                                      'price': gs.product_price,
                                      'img_url': gs.product_img_url,
                                      'source': 'login cancellation redirect'}
                            logging.error('REDIRECTING TO /create?'+urllib.urlencode(params))
                            self.redirect('/create?'+urllib.urlencode(params))
                            return
                    except:
                        pass
                    self.redirect('/')

        # Just render the app
        self.response.write(render_app(self.request))


class GiftStartRedirectHandler(webapp2.RequestHandler):
    """handle all requests to /giftstart/.*"""
    def get(self):
        if(self.request.path.startswith('/g/')):
            self.redirect(self.request.url.replace('/g/','/giftstart/',1), permanent=True)
        if(self.request.path.startswith('/i/')):
            self.redirect(self.request.url.replace('/i/','/giftstart?gs-id=',1), permanent=True)

class GiftStartMainHandler(webapp2.RequestHandler):
    """handle all requests to /giftstart/.*"""
    def get(self):
        self.response.write(render_app_with_giftstart(self.request))


app = webapp2.WSGIApplication([
    ('/i/.*', GiftStartRedirectHandler),
    ('/g/.*', GiftStartRedirectHandler),
    ('/giftstart/.*', GiftStartMainHandler),
    ('/giftstart', GiftStartMainHandler),
    ('/create-giftstart', MainHandler),
    ('/.*', MainHandler),
], debug=True)
