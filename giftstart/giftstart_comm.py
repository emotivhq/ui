"""routines to effect requests (usu from cron) to email and update campaigns"""
__author__ = 'GiftStarter'


from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import requests
from datetime import datetime, timedelta
import json
import yaml
from google.appengine.api import taskqueue
from gs_util import gs_util_link
from thank import thank_core
from gs_user.User import User
from gs_user.Notification import notify
from login import login_core

config = yaml.load(open('config.yaml'))
team_notification_email = config['team_notification_email']


def send_create_notification(giftstart):
    """notify creator that campaign has been created"""
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
                     'sender': "giftconcierge@giftstarter.co",
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
                     'subject': "Let the Pitching In Begin!",
                     'sender': "giftconcierge@giftstarter.co",
                     'to': [giftstart.gc_email],
                     'mime_type': 'html',
                     'template_name': "campaign_create_user",
                     'template_kwargs': email_kwargs
                 }))

    notify(giftstart.gift_champion_uid,'You created a Campaign: '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)


def send_day_left_warning(gsid):
    """notify creator and all givers that campaign has one day left"""
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    check_if_complete(gsid)
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
                         'subject': "One Day Left to Pitch In!",
                         'template_name':
                             "campaign_ending_1_day_user",
                         'template_kwargs': email_kwargs,
                         'sender': "giftconcierge@giftstarter.co",
                         'mime_type': 'html',
                         'to': [giftstart.gc_email],
                     }))

        notify(giftstart.gift_champion_uid,'There is one day left to Pitch In on '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)

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
                         'subject': "One Day Left to Pitch In!",
                         'template_name':
                             "campaign_ending_1_day_giver",
                         'template_kwargs': email_kwargs,
                         'sender': "giftconcierge@giftstarter.co",
                         'mime_type': 'html',
                         'to': emails,
                     }))
        for pi in pitch_ins:
            notify(pi.uid,'There is one day left to Pitch In on '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)


def send_emaillogin_reset(email):
    """send email-login reset code"""
    email_kwargs = {
        'reset_link': config['app_url']+'/reset/'+login_core.generate_reset_code(email)
    }
    requests.put(config['email_url'],
                 data=json.dumps({
                     'subject': "Can't remember your password?",
                     'template_name':
                         "emaillogin_reset",
                     'template_kwargs': email_kwargs,
                     'sender': "giftconcierge@giftstarter.co",
                     'mime_type': 'html',
                     'to': email,
                 }))


def check_if_complete(gsid):
    """check if given campaign is complete; if so, update gs, email creator & givers, and enqueue later cron tasks such as congrats emails"""
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    pitch_in_parts = []
    for p in pitch_ins:
        pitch_in_parts += p.parts

    if not giftstart.giftstart_complete:

        if len(pitch_in_parts) >= giftstart.overlay_columns * giftstart.overlay_rows:
            # Giftstart is complete!

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
                             'subject': "Your GiftStarter Campaign was a Success!",
                             'mime_type': 'html',
                             'template_name': "campaign_complete_user_funded",
                             'template_kwargs': email_kwargs,
                             'sender': "giftconcierge@giftstarter.co",
                             'to': [giftstart.gc_email]
                         }))

            notify(giftstart.gift_champion_uid,'Your Campaign was a success: '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)

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
                             'subject': "GiftStarter Campaign \"" +
                                        giftstart.giftstart_title +
                                        "\" Complete!",
                             'mime_type': 'html',
                             'template_name': "campaign_complete_team_funded",
                             'template_kwargs': email_kwargs,
                             'sender': "giftconcierge@giftstarter.co",
                             'to': [team_notification_email]
                         }))

            if giftstart.shipping_email:
                gc_pi = first_pitchin_by_gc(giftstart, pitch_ins)
                email_kwargs = {
                    'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_number': str(gsid),
                    'gc_email': giftstart.gc_email,
                    'frame': 'base_frame',
                    'giftstart_it_url':
                        gs_util_link.make_giftstart_it_url(giftstart),
                    'user_name': giftstart.gc_name,
                    'note': gc_pi.note if gc_pi else '',
                    'user_img': get_gc_img(giftstart),
                    'thank_you_link': config['app_url'] + '/thanks-' +
                                      thank_core.encode_secret(gsid),
                    }
                email_url = config['email_url']
                # send_path = email_url[email_url.find('/', 8):]
                # payload = json.dumps({
                #     'subject': "You've Received a GiftStarter Gift!",
                #     'mime_type': 'html',
                #     'template_name': "recipient_thankyou_notification",
                #     'template_kwargs': email_kwargs,
                #     'sender': "giftconcierge@giftstarter.co",
                #     'to': [giftstart.shipping_email]
                # })
                # taskqueue.add(url=send_path, method='PUT',
                #               eta=datetime.now() + timedelta(days=10),
                #               payload=payload)
                # recipients = User.query(User.email == giftstart.shipping_email).fetch()
                # TBD: IF WE RE-ENABLE AUTOMATIC NOTIFICATION OF GIFT RECEIPT, DELAY THIS BY 10 DAYS
                # for user in recipients:
                #     notify(user.uid,"You've received a Gift: "+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)

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
                                 'subject': "Your GiftStarter Campaign has Ended",
                                 'template_name':
                                     "campaign_complete_user_not_funded",
                                 'template_kwargs': email_kwargs,
                                 'sender': "giftconcierge@giftstarter.co",
                                 'mime_type': 'html',
                                 'to': [giftstart.gc_email]
                             }))

                notify(giftstart.gift_champion_uid, 'Your GiftStarter Campaign has Ended: '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)

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
                                 'subject': "GiftStarter Campaign \"" +
                                            giftstart.giftstart_title +
                                            "\" Complete!",
                                 'template_name':
                                     "campaign_complete_team_not_funded",
                                 'template_kwargs': email_kwargs,
                                 'sender': "giftconcierge@giftstarter.co",
                                 'mime_type': 'html',
                                 'to': [team_notification_email]
                             }))

                if giftstart.shipping_email:
                    gc_pi = first_pitchin_by_gc(giftstart, pitch_ins)
                    email_kwargs = {
                        'campaign_link': config['app_url'] + '/giftstart/' +
                                         giftstart.giftstart_url_title,
                        'campaign_number': str(gsid),
                        'gc_email': giftstart.gc_email,
                        'frame': 'base_frame',
                        'giftstart_it_url':
                            gs_util_link.make_giftstart_it_url(giftstart),
                        'user_name': giftstart.gc_name,
                        'note': gc_pi.note if gc_pi else '',
                        'user_img': get_gc_img(giftstart),
                        'thank_you_link': config['app_url'] + '/thanks-' +
                                          thank_core.encode_secret(gsid),
                    }
                    email_url = config['email_url']
                    # send_path = email_url[email_url.find('/', 8):]
                    # payload = json.dumps({
                    #     'subject': "You've Received a GiftStarter Gift!",
                    #     'mime_type': 'html',
                    #     'template_name': "recipient_thankyou_notification",
                    #     'template_kwargs': email_kwargs,
                    #     'sender': "giftconcierge@giftstarter.co",
                    #     'to': [giftstart.shipping_email]
                    # })
                    # taskqueue.add(url=send_path, method='PUT',
                    #               eta=datetime.now() + timedelta(days=10),
                    #               payload=payload)
                    # recipients = User.query(User.email == giftstart.shipping_email).fetch()
                    # TBD: IF WE RE-ENABLE AUTOMATIC NOTIFICATION OF GIFT RECEIPT, DELAY THIS BY 10 DAYS
                    # for user in recipients:
                    #     notify(user.uid,"You've received a Gift: "+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)



            else:
                # Send email of regret to gift champion
                email_kwargs = {
                    'campaign_link': config['app_url'] + '/giftstart/' +
                                     giftstart.giftstart_url_title,
                    'campaign_name': giftstart.giftstart_title,
                    'frame': 'base_frame',
                }
                requests.put(config['email_url'],
                             data=json.dumps({
                                 'subject': 'Your GiftStarter Campaign has Ended',
                                 'template_name':
                                     'campaign_complete_user_zero_funding',
                                 'template_kwargs': email_kwargs,
                                 'mime_type': 'html',
                                 'sender': 'giftconcierge@giftstarter.co',
                                 'to': [giftstart.gc_email],
                             }))
                notify(giftstart.gift_champion_uid,"Your GiftStarter Campaign has Ended: "+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)


def pitchins_by_gc(giftstart, pitchins):
    uid = giftstart.gift_champion_uid
    return filter(lambda pi: pi.uid == uid, pitchins)


def first_pitchin_by_gc(giftstart, pitchins):
    gc_pis = pitchins_by_gc(giftstart, pitchins)
    return gc_pis[0] if len(gc_pis) > 0 else None


def get_gc_img(giftstart):
    user = User.query(User.uid == giftstart.gift_champion_uid).fetch(1)[0]
    return user.cached_profile_image_url


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
                         'subject': "Your GiftStarter Campaign has Ended",
                         'template_name': "campaign_complete_giver_funded",
                         'template_kwargs': email_kwargs,
                         'mime_type': 'html',
                         'sender': "giftconcierge@giftstarter.co",
                         'to': [pi.email for pi in pitch_ins]
                     }))
        for pi in pitch_ins:
            notify(pi.uid,"Your GiftStarter Campaign has Ended: "+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)
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
                         'subject': "Your GiftStarter Campaign has Ended",
                         'mime_type': 'html',
                         'template_name': "campaign_complete_giver_not_funded",
                         'template_kwargs': email_kwargs,
                         'sender': "giftconcierge@giftstarter.co",
                         'to': [pi.email for pi in pitch_ins]
                     }))
        for pi in pitch_ins:
            notify(pi.uid,"Your GiftStarter Campaign has Ended: "+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)
