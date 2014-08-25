__author__ = 'stuart'

import webapp2
from datetime import datetime, timedelta
from giftstart import GiftStart
from pay.PitchIn import PitchIn
from gs_user import User


def user_growth():
    now = datetime.now()
    weekago = now - timedelta(days=7)

    new_users_last_week = User.query(User.timestamp > weekago).count()
    now_users = User.query().count()

    percent_user_growth_last_week = float(new_users_last_week) / (now_users - new_users_last_week)

    result = '{percent_growth:.1%} user growth over last week: {new_users} new users, up to {current_users} currently'\
        .format(**{
            'percent_growth': percent_user_growth_last_week,
            'new_users': new_users_last_week,
            'current_users': now_users
        })

    return result


def giftstart_growth():
    now = datetime.now()
    weekago = now - timedelta(days=7)

    new_giftstarts_last_week = GiftStart.query(GiftStart.timestamp > weekago).count()
    now_giftstarts = GiftStart.query().count()

    percent_giftstart_growth_last_week = float(new_giftstarts_last_week) / (now_giftstarts - new_giftstarts_last_week)

    result = '{percent_growth:.1%} GiftStart growth over last week: {new_giftstarts} new GiftStarts, up to ' \
             '{current_giftstarts} currently'.format(**{
            'percent_growth': percent_giftstart_growth_last_week,
            'new_giftstarts': new_giftstarts_last_week,
            'current_giftstarts': now_giftstarts
        })

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

    total_campaigns = float(len(completed_campaigns))

    result = '{full:.1f}% fully funded<br>{part:.1f}% partially funded<br>{no:.1f}% no funding'.format(**{
        'full': 100*num_fully_funded/total_campaigns,
        'part': 100*num_partially_funded/total_campaigns,
        'no': 100*num_no_funding/total_campaigns,
    })

    return result


class ReportsHandler(webapp2.RequestHandler):

    def get(self):
        template = '<div class="metric"><h3>Wk/wk User Growth</h3><h1>{user_growth}</h1></div>' \
                   '<div class="metric"><h3>Wk/wk Active Campaign Growth</h3><h1>{campaign_growth}</h1></div>' \
                   '<div class="metric"><h3>Percent Campaigns Funded Fully</h3><h1>{campaign_success_rate}</h1></div>'

        template_kwargs = {
            'user_growth': user_growth(),
            'campaign_growth': giftstart_growth(),
            'campaign_success_rate': campaign_success_rate(),
        }

        self.response.write(template.format(**template_kwargs))


handler = webapp2.WSGIApplication([('/reports', ReportsHandler)], debug=True)
