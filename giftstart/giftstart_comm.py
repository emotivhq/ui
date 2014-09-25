
__author__ = 'stuart'


from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import requests
from datetime import datetime
import json
import yaml
from google.appengine.api import taskqueue

config = yaml.load(open('config.yaml'))
team_notification_email = config['team_notification_email']


def send_create_notification(giftstart):
    email_kwargs = {'campaign_link': config['app_url'] +
                                     '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_number': str(giftstart.gsid),
                    'gc_email': giftstart.gc_email}
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "GiftStarter Campaign Created!",
                     'sender': "team@giftstarter.co",
                     'to': [team_notification_email],
                     'template_name': "campaign_create_team",
                     'template_kwargs': email_kwargs
                 }))

    email_kwargs = {'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_name': giftstart.giftstart_title}
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "GiftStarter Campaign Created!",
                     'sender': "team@giftstarter.co",
                     'to': [giftstart.gc_email],
                     'template_name': "campaign_create_user",
                     'template_kwargs': email_kwargs
                 }))


def send_day_left_warning(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    if not giftstart.giftstart_complete:
        subject = "GiftStarter Campaign Ending Soon!"
        gc_template = "Oh noes!  Your campaign only has one day left!  Go back and spread the word to drive it to " \
                      "completion!  Here's the link to it!\n\n" + config['app_url'] + "/giftstart/{title_url}\n\n" \
                      "Thanks!\nTeam GiftStarter"
        contributor_template = "Oh noes!  The GiftStarter campaign you gave to only has one day left!  Go back and " \
                               "spread the word to drive it to completion!  Here's the link to " \
                               "it!\n\n" + config['app_url'] + "/giftstart/{title_url}\n\nThanks!\nTeam GiftStarter"
        gc_message = gc_template.format(gsid=gsid)
        contributor_message = contributor_template.format(gsid=gsid)
        requests.put(config['email_url'],
                     data=json.dumps({
                         'to': [giftstart.gc_email], 'sender': 'team@giftstarter.co', 'body': gc_message,
                         'subject': subject
                     }))

        email_set = set(map(lambda pi: pi.email, pitch_ins))
        for email in email_set:
            requests.put(config['email_url'],
                         data=json.dumps({
                             'to': [email], 'sender': 'team@giftstarter.co', 'body': contributor_message,
                             'subject': subject
                         }))


def check_if_complete(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    pitch_in_parts = []
    for p in pitch_ins:
        pitch_in_parts += p.parts

    if not giftstart.giftstart_complete:

        if len(pitch_in_parts) == giftstart.overlay_columns * giftstart.overlay_rows:
            giftstart.giftstart_complete = True
            giftstart.put()

            # Queue up task for congratulating givers in 3 days
            taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps(
                {'action': 'thank-givers', 'gsid': gsid, 'funded': True}), countdown=60*60*24*3)

            # Send email congratulating the gift champion!
            email_kwargs = {'campaign_link': config['app_url'] +
                                             '/giftstart/' +
                                             giftstart.giftstart_url_title,
                            'campaign_name': giftstart.giftstart_title}
            requests.put(config['email_url'],
                         data=json.dumps({
                             'subject': "GiftStart Complete!",
                             'template_name': "campaign_complete_user_funded",
                             'template_kwargs': email_kwargs,
                             'sender': "team@giftstarter.co",
                             'to': [giftstart.gc_email]
                         }))

            # And email GiftStarter personnel...
            email_kwargs = {'campaign_link': config['app_url'] +
                                             '/giftstart/' +
                                             giftstart.giftstart_url_title,
                            'campaign_number': str(gsid),
                            'gc_email': giftstart.gc_email}
            requests.put(config['email_url'],
                         data=json.dumps({
                             'subject': "GiftStart Complete!",
                             'template_name': "campaign_complete_team_funded",
                             'template_kwargs': email_kwargs,
                             'sender': "team@giftstarter.co",
                             'to': [team_notification_email]
                         }))

        elif giftstart.deadline < datetime.now():
            giftstart.giftstart_complete = True
            giftstart.put()
            if len(pitch_in_parts) > 0:
                # Queue up task for congratulating givers in 3 days
                taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps(
                    {'action': 'thank-givers', 'gsid': gsid, 'funded': False}), countdown=60*60*24*3)

                # Send email congratulating the gift champion!
                email_kwargs = {'campaign_link': config['app_url'] +
                                                 '/giftstart/' +
                                                 giftstart.giftstart_url_title,
                                'campaign_name': giftstart.giftstart_title}
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart Complete!",
                                 'template_name': "campaign_complete_user_not_funded",
                                 'template_kwargs': email_kwargs,
                                 'sender': "team@giftstarter.co",
                                 'to': [giftstart.gc_email]
                             }))

                # And email GiftStarter personnel...
                email_kwargs = {'campaign_link': config['app_url'] +
                                                 '/giftstart/' +
                                                 giftstart.giftstart_url_title,
                                'campaign_number': str(gsid),
                                'gc_email': giftstart.gc_email}
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart Complete!",
                                 'template_name': "campaign_complete_team_not_funded",
                                 'template_kwargs': email_kwargs, 'sender': "team@giftstarter.co",
                                 'to': [team_notification_email]
                             }))

            else:
                # Send email of regret to gift champion
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart Has Ended", 'sender': "team@giftstarter.co",
                                 'to': [giftstart.gc_email], 'body': "Bummer! Looks like your GiftStart didn't get any love.  That's okay, we know it was it's own special snowflake.  We hope you try it again, and please feel free to get in touch with us at team@giftstarter.co for tips on getting people involved in your next GiftStart!\n\nHere's a link to yours:\n" + config['app_url'] + "/giftstart/" + giftstart.giftstart_url_title + "\n\nHugs,\nTeam Giftstarter"
                             }))

                # And email GiftStarter personnel...
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart Has Ended", 'sender': "team@giftstarter.co",
                                 'to': [team_notification_email],
                                 'body': "GiftStart #" + str(gsid) +
                                         " failed to get any pitch ins, and has ended.  Bummer!"
                             }))


def congratulate_givers(gsid, funded):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    if funded:
        # Send email to all the givers, great job guys!
        email_kwargs = {'campaign_link': config['app_url'] + '/giftstart/' +
                                         giftstart.giftstart_url_title,
                        'campaign_name': giftstart.giftstart_title}
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart Complete!",
                         'template_name': "campaign_complete_giver_funded", 'template_kwargs': email_kwargs,
                         'sender': "team@giftstarter.co", 'to': [pi.email for pi in pitch_ins]
                     }))
    else:
        # Send email to all the givers, great job guys!
        email_kwargs = {'campaign_link': config['app_url'] + '/giftstart/' +
                                         giftstart.giftstart_url_title,
                        'campaign_name': giftstart.giftstart_title}
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart Complete!",
                         'template_name': "campaign_complete_giver_not_funded",
                         'template_kwargs': email_kwargs, 'sender': "team@giftstarter.co",
                         'to': [pi.email for pi in pitch_ins]
                     }))
