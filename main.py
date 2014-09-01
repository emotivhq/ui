
import webapp2
import yaml
from render_app import render_app, render_app_with_giftstart


secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_app(self.request))
        # js_insert = remember_user(self.request.cookies, self.request.path + '?' + self.request.query_string)
        # js_insert += "Stripe.setPublishableKey('" + secrets['stripe_auth']['app_key'] + "');"
        # js_insert += "window.fbAppId = '" + secrets['facebook_auth']['app_id'] + "';"
        # js_insert += "window.googlePlusClientId = '" + secrets['googleplus_auth']['client_id'] + "';"
        # self.response.write(frame_template.render({
        #     'js_insert': js_insert,
        #     'image_url': self.request.path_url + '/assets/logo_square.png',
        #     'page_url': self.request.path_url,
        #     'googleanalytics_key': config['googleanalytics']['key'],
        #     'mixpanel_key': config['mixpanel']['key'],
        #     'heap_key': config['heap']['key'],
        # }))


class GiftStartMainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(render_app_with_giftstart(self.request))
        # js_insert = remember_user(self.request.cookies, self.request.path + '?' + self.request.query_string)
        # js_insert += "Stripe.setPublishableKey('" + secrets['stripe_auth']['app_key'] + "');"
        # js_insert += "window.fbAppId = '" + secrets['facebook_auth']['app_id'] + "';"
        # js_insert += "window.googlePlusClientId = '" + secrets['googleplus_auth']['client_id'] + "';"
        # gsid = self.request.get('gs-id')
        # gss = GiftStart.query(GiftStart.gsid == gsid).fetch()
        #
        # if len(gss) > 0:
        #     gs = gss[0]
        #     render_values = {
        #         'js_insert': js_insert + 'var GIFTSTART = ' + gs.jsonify() + ';',
        #         'page_title': gs.giftstart_title,
        #         'page_url': self.request.path_url + "?gs-id=" + str(gsid),
        #         'page_description': gs.giftstart_description,
        #         'image_url': 'http://storage.googleapis.com/giftstarter-pictures/p/' + str(gsid) + '.jpg',
        #         'googleanalytics_key': config['googleanalytics']['key'],
        #         'mixpanel_key': config['mixpanel']['key'],
        #         'heap_key': config['heap']['key'],
        #     }
        #     self.response.write(frame_template.render(render_values))
        # else:
        #     self.response.write('Error: 404<br>Resource not found!  Go to GiftStarter homepage via <a href="http://giftstarter.co">this link</a>.')
        #     self.response.status_int = 404


app_gs = webapp2.WSGIApplication([('/giftstart', GiftStartMainHandler)], debug=True)
app_gsc = webapp2.WSGIApplication([('/create-giftstart', MainHandler)], debug=True)
app = webapp2.WSGIApplication([('/.*', MainHandler)], debug=True)
