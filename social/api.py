__author__ = 'stuart'

import webapp2
import jinja2

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/jinja2/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class TwitterOauthCallbackHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(JINJA_ENVIRONMENT.get_template('twitter_oauth_callback.html').render())

twitter_oauth_callback = webapp2.WSGIApplication([('/oauth-callback/twitter', TwitterOauthCallbackHandler)], debug=True)