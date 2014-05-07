#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import jinja2
from giftstart import GiftStart

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/jinja2/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('frame.html')

        self.response.write(template.render())


class GiftStartMainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('frame.html')
        gsid = self.request.get('gs-id')
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch()
        if len(gss) > 0:
            gs = gss[0]
            render_values = {
                'page_title': gs.giftstart_title,
                'page_url': self.request.path_url,
                'page_description': gs.giftstart_description,
                'image_url': 'http://storage.googleapis.com/giftstarter-pictures/p/' + str(gsid)
            }
            self.response.write(template.render(render_values))
        else:
            self.error(404)
            self.response.write('Error: 404<br>Resource not found!  Go to GiftStarter homepage via <a href="http://giftstarter.co">this link</a>.')


app = webapp2.WSGIApplication([('/', MainHandler)], debug=True)
app_gs = webapp2.WSGIApplication([('/giftstart', GiftStartMainHandler)], debug=True)
app_gsc = webapp2.WSGIApplication([('/create-giftstart', MainHandler)], debug=True)
