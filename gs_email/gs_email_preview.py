"""
provide a preview of any email template specified in URL, along with specified GET params
example URL: /email/preview/campaign_complete_user_not_funded.html?&campaign_name=A+Scanner+for+Katherine&campaign_link=https%3A%2F%2Fwww.giftstarter.com%2Fgiftstart%2FA-scanner-for-Katherine
"""
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
