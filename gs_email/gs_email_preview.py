__author__ = 'GiftStarter'

import webapp2
import jinja2
import os


class EmailPreviewHandler(webapp2.RequestHandler):

    def get(self):
        template_name = self.request.path.split('/')[-1]
        jinja2_env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(
                os.path.abspath(os.path.dirname(__file__) +
                                "/templates/email/")),
            extensions=['jinja2.ext.autoescape'],
            autoescape=True)
        template = jinja2_env.get_template(template_name)
        body = template.render(self.request.params)
        frame_template = jinja2_env.get_template('base_frame.html')
        email_rendered = frame_template.render({'body': body})
        self.response.write(email_rendered)
