__author__ = 'stuart'

import webapp2
from datetime import datetime, timedelta, date
from giftstart import GiftStart
from pay.PitchIn import PitchIn
from gs_user import User


LAST_WK_START = datetime.now() - timedelta(days=datetime.now().weekday(),
                                           hours=datetime.now().hour,
                                           minutes=datetime.now().minute,
                                           seconds=datetime.now().second)


def user_growth():
    def num_users_by(date):
        """ num_users_by(datetime) -> 207
        Returns number of users that have signed up by date
        """
        return User.query(User.timestamp < date).count()

    dates = [LAST_WK_START - timedelta(days=7)*wk for wk in range(7, -1, -1)]
    total_users = [num_users_by(d) for d in dates]
    new_users = [0] + [total_users[wk] - total_users[wk-1]
                       for wk in range(1, 8)]
    users_growth = [1] + [total_users[i] / float(total_users[i-1])
                          if total_users[i-1] > 0 else 1
                          for i in range(1, 8)]

    def build_row(row):
        return "<tr><td>" + "</td><td>".join([str(v) for v in row]) + "</td></tr>"

    result = "<table border=\"2\">"
    result += build_row(["wk " + str(i-7) for i in range(len(total_users))])
    result += build_row(total_users)
    result += build_row(new_users)
    result += build_row(["{0:.1%}".format(v-1) for v in users_growth])
    result += "</table>"

    return result


def giftstart_growth():

    def num_giftstarts_by(date):
        """ num_users_by(datetime) -> 207
        Returns number of users that have signed up by date
        """
        return GiftStart.query(GiftStart.timestamp < date).count()

    dates = [LAST_WK_START - timedelta(days=7)*wk for wk in range(7, -1, -1)]
    total_giftstarts = [num_giftstarts_by(d) for d in dates]
    new_giftstarts = [0] + [total_giftstarts[wk] - total_giftstarts[wk-1]
                       for wk in range(1, 8)]
    giftstarts_growth = [1] + [total_giftstarts[i] / float(total_giftstarts[i-1])
                          if total_giftstarts[i-1] > 0 else 1
                          for i in range(1, 8)]

    def build_row(row):
        return "<tr><td>" + "</td><td>".join([str(v) for v in row]) + "</td></tr>"

    result = "<table border=\"2\">"
    result += build_row(["wk " + str(i-7) for i in range(len(total_giftstarts))])
    result += build_row(total_giftstarts)
    result += build_row(new_giftstarts)
    result += build_row(["{0:.1%}".format(v-1) for v in giftstarts_growth])
    result += "</table>"

    return result


def campaign_success_rate():
    completed_campaigns = GiftStart.query(GiftStart.giftstart_complete == True).fetch()
    pitchins = PitchIn.query().fetch()

    def parts_bought_from_campaign(gsid):
        these_pitchins = filter(lambda pi: pi.gsid == gsid, pitchins)
        return [part for pitchin in these_pitchins for part in pitchin.parts]

    num_overfunded = 0
    num_fully_funded = 0
    num_partially_funded = 0
    num_no_funding = 0

    for campaign in completed_campaigns:
        bought_parts = parts_bought_from_campaign(campaign.gsid)
        total_parts = campaign.overlay_rows * campaign.overlay_columns
        num_overfunded += len(bought_parts) > total_parts
        num_fully_funded += len(bought_parts) == total_parts
        num_partially_funded += 0 < len(bought_parts) < total_parts
        num_no_funding += 0 == len(bought_parts)

    total_campaigns = float(len(completed_campaigns)) if float(len(completed_campaigns)) else 1

    result = '{full:.1f}% fully funded<br>{part:.1f}% partially funded<br>{no:.1f}% no funding'.format(**{
        'full': 100*num_fully_funded/total_campaigns,
        'part': 100*num_partially_funded/total_campaigns,
        'no':  100*num_no_funding/total_campaigns,
    })

    return result


class ReportsHandler(webapp2.RequestHandler):

    def get(self):
        template = '<div class="metric"><h3>Wk/wk User Growth</h3><h1>{user_growth}</h1></div>' \
                   '<div class="metric"><h3>Wk/wk Active GiftStart Growth</h3><h1>{campaign_growth}</h1></div>' \
                   '<div class="metric"><h3>Percent Campaigns Funded Fully</h3><h1>{campaign_success_rate}</h1></div>'

        template_kwargs = {
            'user_growth': user_growth(),
            'campaign_growth': giftstart_growth(),
            'campaign_success_rate': campaign_success_rate(),
        }

        self.response.write(template.format(**template_kwargs))


handler = webapp2.WSGIApplication([('/reports', ReportsHandler)], debug=True)
