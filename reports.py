__author__ = 'stuart'

import webapp2


class ReportsHandler(webapp2.RequestHandler):

    def get(self):
        template = '<div class="metric"><h3>Wk/wk User Growth</h3><h1>{user_growth}</h1></div>' \
                   '<div class="metric"><h3>Wk/wk Active Campaign Growth</h3><h1>{campaign_growth}</h1></div>' \
                   '<div class="metric"><h3>Percent Campaigns Funded Fully</h3><h1>{campaign_success_rate}</h1></div>'

        template_kwargs = {
            'user_growth': '1',
            'campaign_growth': '2',
            'campaign_success_rate': '3',
        }

        self.response.write(template.format(**template_kwargs))


handler = webapp2.WSGIApplication([('/reports', ReportsHandler)], debug=True)
