"""provide a set of reports showing the last several weeks of data (#giftstarts, #transactions, $, etc)"""

__author__ = 'GiftStarter'

import webapp2
from datetime import datetime, timedelta
from giftstart.GiftStart import GiftStart
from pay.PitchIn import PitchIn
from gs_user import User
from gs_user.UserLogin import UserLogin
from pay import pay_core

LAST_WK_START = datetime.now() - timedelta(days=datetime.now().weekday(),
                                           hours=datetime.now().hour,
                                           minutes=datetime.now().minute,
                                           seconds=datetime.now().second)

def build_row(row):
    return "<tr><td>" + "</td><td>".join([str(v) for v in row]) + "</td></tr>"


def build_hdr(row):
    return "<tr><th>" + "</th><th>".join([str(v) for v in row]) + "</th></tr>"



def show_dates(NUM_WEEKS, DATES):
    def format_date(date):
        return str(date.year)+"-"+str(date.month)+"-"+str(date.day)

    day_fmt = [format_date(d) for d in DATES]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS for i in range(len(day_fmt))])
    result += build_row(['Ends'] + day_fmt)
    result += "</table>"

    return result

def user_growth(NUM_WEEKS, DATES):
    base_users = User.query().count() - User.query(User.timestamp < LAST_WK_START).count()

    def num_users_by(date):
        """ num_users_by(datetime) -> 207
        Returns number of users that have signed up by date
        """
        return base_users + User.query(User.timestamp < date).count()

    total_users = [num_users_by(d) for d in DATES]
    new_users = [0] + [total_users[wk] - total_users[wk-1]
                       for wk in range(1, NUM_WEEKS)]
    users_growth = [1] + [new_users[i] / float(new_users[i-1])
                          if new_users[i-1] > 0 else 1
                          for i in range(1, NUM_WEEKS)]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS
                                    for i in range(len(total_users))])
    result += build_row(['Total'] + total_users)
    result += build_row(['New'] + new_users)
    result += build_row(['% Growth'] + ["{0:.1%}".format(v-1)
                                        for v in users_growth])
    result += "</table>"

    return result


def mau_growth(NUM_WEEKS, DATES):
    def num_logins_between(start_date, end_date):
        """ num_logins_by(datetime, datetime) -> 124
        Returns the number unique users that have logged in in a specd period
        """
        logins = UserLogin.query(UserLogin.timestamp > start_date,
                                 UserLogin.timestamp < end_date).fetch()
        unique_logins = {login.uid for login in logins}
        return len(unique_logins)

    mau = [num_logins_between(week-timedelta(days=30), week) for week in DATES]
    mau_delta = [0] + [mau[i] - mau[i-1] for i in range(1, NUM_WEEKS)]
    mau_growth_values = [1] + [mau[i] / float(mau[i-1])
                               if mau[i-1] > 0 else 1
                               for i in range(1, NUM_WEEKS)]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS for i in range(len(DATES))])
    result += build_row(['MAU'] + mau)
    result += build_row(['Delta'] + mau_delta)
    result += build_row(['% Growth'] + ["{0:.1%}".format(v-1) for v in mau_growth_values])
    result += "</table>"

    return result


def giftstart_growth(NUM_WEEKS, DATES):
    base_giftstarts = GiftStart.query().count() - \
                      GiftStart.query(GiftStart.timestamp < LAST_WK_START)\
                          .count()

    def num_giftstarts_by(date):
        return base_giftstarts + GiftStart.query(GiftStart.timestamp < date).count()

    total_giftstarts = [num_giftstarts_by(d) for d in DATES]
    new_giftstarts = [0] + [total_giftstarts[wk] - total_giftstarts[wk-1]
                            for wk in range(1, NUM_WEEKS)]
    giftstarts_growth = [1] + [new_giftstarts[i] / float(new_giftstarts[i-1])
                               if new_giftstarts[i-1] > 0 else 1
                               for i in range(1, NUM_WEEKS)]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS
                                    for i in range(len(total_giftstarts))])
    result += build_row(['Total'] + total_giftstarts)
    result += build_row(['New'] + new_giftstarts)
    result += build_row(['% Growth'] + ["{0:.1%}".format(v-1)
                                        for v in giftstarts_growth])
    result += "</table>"

    return result


def transactions_per_week(NUM_WEEKS, DATES):
    base_pitchins = PitchIn.query().count() - PitchIn.query(PitchIn.timestamp < LAST_WK_START).count()

    def num_pitchins_by(date):
        return base_pitchins + PitchIn.query(PitchIn.timestamp < date).count()

    total_pitchins = [num_pitchins_by(d) for d in DATES]
    new_pitchins = [0] + [total_pitchins[wk] - total_pitchins[wk-1]
                          for wk in range(1, NUM_WEEKS)]
    pitchins_growth = [1] + [new_pitchins[i] / float(new_pitchins[i-1])
                             if new_pitchins[i-1] > 0 else 1
                             for i in range(1, NUM_WEEKS)]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS for i in range(len(total_pitchins))])
    result += build_row(['Total'] + total_pitchins)
    result += build_row(['New'] + new_pitchins)
    result += build_row(['% Growth'] + ["{0:.1%}".format(v-1) for v in pitchins_growth])
    result += "</table>"

    return result


def dollars_per_week(NUM_WEEKS, DATES):
    def amt_pitchins_by(date):
        pis = PitchIn.query(PitchIn.timestamp < date).fetch()
        get_amt = lambda pi: pay_core.get_charge_amount_for_pitchin(pi)/100.0
        return sum([get_amt(p) for p in pis])

    total_dollars = [amt_pitchins_by(d) for d in DATES]
    new_dollars = [0] + [total_dollars[wk] - total_dollars[wk-1]
                         for wk in range(1, NUM_WEEKS)]
    dollars_growth = [1] + [new_dollars[i] / float(new_dollars[i-1])
                            if new_dollars[i-1] > 0 else 1
                            for i in range(1, NUM_WEEKS)]

    result = "<table border=\"2\">"
    result += build_hdr(['Week'] + [i-NUM_WEEKS for i in range(len(total_dollars))])
    result += build_row(['Total'] + total_dollars)
    result += build_row(['New'] + new_dollars)
    result += build_row(['% Growth'] + ["{0:.1%}".format(v-1) for v in dollars_growth])
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
    """provide an HTML view of all reports"""

    def get(self):
        """
        show a simple set of HTML tables for historic data:
        User Growth,
        Monthly Active Users,
        New Giftstart Growth,
        Percent Campaigns Funded Fully,
        Transactions Growth,
        $ Transacted Growth
        """

        if not 'num_weeks' in self.request.params.keys():
            self.response.write('<form action="">Number of weeks: <input type="text" name="num_weeks" value="2" /><input type="submit" /></form>')
            return

        num_weeks = int(self.request.params['num_weeks'])
        dates = [LAST_WK_START - timedelta(days=7)*wk for wk in range(num_weeks-1, -1, -1)]

        template = '<div class="metric"><h3>Dates</h3><p>{show_dates}</p></div>' \
                   '<div class="metric"><h3>Wk/wk User Growth</h3><p>{user_growth}</p></div>' \
                   '<div class="metric"><h3>Wk/wk Monthly Active Users Growth</h3><p>{mau_growth}</p></div>' \
                   '<div class="metric"><h3>Wk/wk New GiftStart Growth</h3><p>{campaign_growth}</p></div>' \
                   '<div class="metric"><h3>Percent Campaigns Funded Fully</h3><p>{campaign_success_rate}</p></div>' \
                   '<div class="metric"><h3>Wk/wk Transactions Growth</h3><p>{transactions_per_week}</p></div>' \
                   '<div class="metric"><h3>Wk/wk $ Transacted Growth</h3><p>{dollars_per_week}</p></div>'


        template_kwargs = {
            'show_dates': show_dates(num_weeks, dates),
            'user_growth': user_growth(num_weeks, dates),
            'mau_growth': mau_growth(num_weeks, dates),
            'campaign_growth': giftstart_growth(num_weeks, dates),
            'campaign_success_rate': campaign_success_rate(),
            'transactions_per_week': transactions_per_week(num_weeks, dates),
            'dollars_per_week': dollars_per_week(num_weeks, dates),
        }

        self.response.write(template.format(**template_kwargs))


handler = webapp2.WSGIApplication([('/reports', ReportsHandler)], debug=True)
