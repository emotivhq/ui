
import webapp2
import jinja2
from giftstart.core import GiftStart
import gs_user


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/jinja2/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
frame_template = JINJA_ENVIRONMENT.get_template('frame.html')


def remember_user(cookies):
    js_insert = ''
    if 'uid' in cookies:
        # Strip url encoded double quotes
        args = [val.replace('%22', '') for val in [cookies['uid'], cookies['token']]]
        user_deets = gs_user.validate(*args)
        if user_deets:
            js_insert = "window.loginDeets = ['{uid}', '{img_url}', '{token}'];".format(**user_deets)
    return js_insert


class MainHandler(webapp2.RequestHandler):
    def get(self):
        js_insert = remember_user(self.request.cookies)
        self.response.write(frame_template.render({'js_insert': js_insert}))


class GiftStartMainHandler(webapp2.RequestHandler):
    def get(self):
        js_insert = remember_user(self.request.cookies)
        gsid = self.request.get('gs-id')
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch()
        if len(gss) > 0:
            gs = gss[0]
            render_values = {
                'js_insert': js_insert + 'var GIFTSTART = ' + gs.jsonify() + ';',
                'page_title': gs.giftstart_title,
                'page_url': self.request.path_url,
                'page_description': gs.giftstart_description,
                'image_url': 'http://storage.googleapis.com/giftstarter-pictures/p/' + str(gsid)
            }
            self.response.write(frame_template.render(render_values))
        else:
            self.response.write('Error: 404<br>Resource not found!  Go to GiftStarter homepage via <a href="http://giftstarter.co">this link</a>.')
            self.response.status_int = 404


app_gs = webapp2.WSGIApplication([('/giftstart', GiftStartMainHandler)], debug=True)
app_gsc = webapp2.WSGIApplication([('/create-giftstart', MainHandler)], debug=True)
app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)
app_faq = webapp2.WSGIApplication([('/faq', MainHandler)], debug=True)
