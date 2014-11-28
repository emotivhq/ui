
__author__ = 'stuart'


from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import requests
from datetime import datetime
import json
import yaml
from google.appengine.api import taskqueue
from gs_util import gs_util_link

config = yaml.load(open('config.yaml'))
team_notification_email = config['team_notification_email']


def send_create_notification(giftstart):
    email_kwargs = {
        'campaign_link': config['app_url'] +
                         '/giftstart/' +
                         giftstart.giftstart_url_title,
        'campaign_number': str(giftstart.gsid),
        'gc_email': giftstart.gc_email,
        'frame': 'base_frame',
    }
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "GiftStarter Campaign \"" +
                                giftstart.giftstart_title + "\" Created!",
                     'sender': "team@giftstarter.co",
                     'mime_type': 'html',
                     'to': [team_notification_email],
                     'template_name': "campaign_create_team",
                     'template_kwargs': email_kwargs
                 }))

    email_kwargs = {
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'campaign_name': giftstart.giftstart_title,
        'frame': 'base_frame',
    }
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "GiftStarter Campaign \"" +
                                giftstart.giftstart_title + "\" Created!",
                     'sender': "team@giftstarter.co",
                     'to': [giftstart.gc_email],
                     'mime_type': 'html',
                     'template_name': "campaign_create_user",
                     'template_kwargs': email_kwargs
                 }))


def send_day_left_warning(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    if not giftstart.giftstart_complete:
        # Notify giftstarter
        email_kwargs = {
            'campaign_link': config['app_url'] + '/giftstart/' +
                             giftstart.giftstart_url_title,
            'campaign_name': giftstart.giftstart_title,
            'frame': 'base_frame',
            'product_img_url': giftstart.product_img_url,
        }
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart \"" + giftstart.giftstart_title
                                    + "\" Ending Soon!",
                         'template_name':
                             "campaign_ending_1_day_user",
                         'template_kwargs': email_kwargs,
                         'sender': "team@giftstarter.co",
                         'mime_type': 'html',
                         'to': [giftstart.gc_email],
                     }))

        # Notify all givers
        emails = list(set(map(lambda pi: pi.email, pitch_ins)))
        email_kwargs = {
            'campaign_link': config['app_url'] + '/giftstart/' +
                             giftstart.giftstart_url_title,
            'campaign_name': giftstart.giftstart_title,
            'frame': 'base_frame',
            'product_img_url': giftstart.product_img_url,
            'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
        }
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart \"" + giftstart.giftstart_title
                                    + "\" Ending Soon!",
                         'template_name':
                             "campaign_ending_1_day_giver",
                         'template_kwargs': email_kwargs,
                         'sender': "team@giftstarter.co",
                         'mime_type': 'html',
                         'to': emails,
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
            email_kwargs = {
                'campaign_link': config['app_url'] + '/giftstart/' +
                                 giftstart.giftstart_url_title,
                'campaign_name': giftstart.giftstart_title,
                'frame': 'base_frame',
                'product_img_url': giftstart.product_img_url,
            }
            requests.put(config['email_url'],
                         data=json.dumps({
                             'subject': "GiftStart \"" +
                                        giftstart.giftstart_title +
                                        "\" Complete!",
                             'mime_type': 'html',
                             'template_name': "campaign_complete_user_funded",
                             'template_kwargs': email_kwargs,
                             'sender': "team@giftstarter.co",
                             'to': [giftstart.gc_email]
                         }))

            # And email GiftStarter personnel...
            email_kwargs = {
                'campaign_link': config['app_url'] + '/giftstart/' +
                                 giftstart.giftstart_url_title,
                'campaign_number': str(gsid),
                'gc_email': giftstart.gc_email,
                'frame': 'base_frame',
            }
            requests.put(config['email_url'],
                         data=json.dumps({
                             'subject': "GiftStart \"" +
                                        giftstart.giftstart_title +
                                        "\" Complete!",
                             'mime_type': 'html',
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
                email_kwargs = {
                    'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_name': giftstart.giftstart_title,
                    'frame': 'base_frame',
                    'product_img_url': giftstart.product_img_url,
                }
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart \"" +
                                            giftstart.giftstart_title +
                                            "\" Complete!",
                                 'template_name':
                                     "campaign_complete_user_not_funded",
                                 'template_kwargs': email_kwargs,
                                 'sender': "team@giftstarter.co",
                                 'mime_type': 'html',
                                 'to': [giftstart.gc_email]
                             }))

                # And email GiftStarter personnel...
                email_kwargs = {
                    'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_number': str(gsid),
                    'gc_email': giftstart.gc_email,
                    'frame': 'base_frame',
                }
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': "GiftStart \"" +
                                            giftstart.giftstart_title +
                                            "\" Complete!",
                                 'template_name':
                                     "campaign_complete_team_not_funded",
                                 'template_kwargs': email_kwargs,
                                 'sender': "team@giftstarter.co",
                                 'mime_type': 'html',
                                 'to': [team_notification_email]
                             }))

            else:
                # Send email of regret to gift champion
                email_kwargs = {
                    'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'frame': 'base_frame',
                }
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': 'GiftStart "' +
                                            giftstart.giftstart_title +
                                            '" has ended',
                                 'template_name':
                                     'campaign_complete_user_zero_funding',
                                 'template_kwargs': email_kwargs,
                                 'mime_type': 'html',
                                 'sender': 'team@giftstarter.co',
                                 'to': [giftstart.gc_email],
                             }))


def congratulate_givers(gsid, funded):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    if funded:
        # Send email to all the givers, great job guys!
        email_kwargs = {
            'campaign_link': config['app_url'] + '/giftstart/' +
                             giftstart.giftstart_url_title,
            'campaign_name': giftstart.giftstart_title,
            'frame': 'base_frame',
            'product_img_url': giftstart.product_img_url,
            'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
        }
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart \"" + giftstart.giftstart_title
                                    + "\" Complete!",
                         'template_name': "campaign_complete_giver_funded",
                         'template_kwargs': email_kwargs,
                         'mime_type': 'html',
                         'sender': "team@giftstarter.co",
                         'to': [pi.email for pi in pitch_ins]
                     }))
    else:
        # Send email to all the givers, great job guys!
        email_kwargs = {
            'campaign_link': config['app_url'] + '/giftstart/' +
                             giftstart.giftstart_url_title,
            'campaign_name': giftstart.giftstart_title,
            'frame': 'base_frame',
            'product_img_url': giftstart.product_img_url,
            'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
        }
        requests.put(config['email_url'],
                     data=json.dumps({
                         'subject': "GiftStart \"" + giftstart.giftstart_title
                                    + "\" Complete!",
                         'mime_type': 'html',
                         'template_name': "campaign_complete_giver_not_funded",
                         'template_kwargs': email_kwargs,
                         'sender': "team@giftstarter.co",
                         'to': [pi.email for pi in pitch_ins]
                     }))
