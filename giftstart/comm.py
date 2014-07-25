
__author__ = 'stuart'


from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import uuid
import requests
from datetime import datetime
import json, yaml

config = yaml.load(open('config.yaml'))


def send_create_notification(giftstart):
    email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(giftstart.gsid),
                    'campaign_number': str(giftstart.gsid)}
    requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                 data=json.dumps({
                     'subject': "GiftStarter Campaign Created!", 'sender': "team@giftstarter.co",
                     'to': ["team@giftstarter.co"], 'template_name': "campaign_create_team",
                     'template_kwargs': email_kwargs
                 }))

    email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(giftstart.gsid),
                    'campaign_name': str(giftstart.giftstart_title)}
    requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                 data=json.dumps({
                     'subject': "GiftStarter Campaign Created!", 'sender': "team@giftstarter.co",
                     'to': [giftstart.gc_email], 'template_name': "campaign_create_user",
                     'template_kwargs': email_kwargs
                 }))


def send_day_left_warning(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    if not giftstart.giftstart_complete:
        email_uuid = str(uuid.uuid4()).replace('-', '')
        subject = "GiftStarter Campaign Ending Soon!"
        gc_template = "Oh noes!  Your campaign only has one day left!  Go back and spread the word to drive it to " \
                      "completion!  Here's the link to it!\n\n" + config['app_url'] + "/giftstart?gs-id={gsid}\n\n" \
                      "Thanks!\nTeam GiftStarter"
        contributor_template = "Oh noes!  The GiftStarter campaign you gave to only has one day left!  Go back and " \
                               "spread the word to drive it to completion!  Here's the link to " \
                               "it!\n\n" + config['app_url'] + "/giftstart?gs-id={gsid}\n\nThanks!\nTeam GiftStarter"
        gc_message = gc_template.format(gsid=gsid)
        contributor_message = contributor_template.format(gsid=gsid)
        requests.put(config['email_url'] + "/send/" + email_uuid,
                     data=json.dumps({
                         'to': [giftstart.gc_email], 'sender': 'team@giftstarter.co', 'body': gc_message,
                         'subject': subject
                     }))

        email_set = set(map(lambda pi: pi.email, pitch_ins))
        for email in email_set:
            email_uuid = str(uuid.uuid4()).replace('-', '')
            requests.put(config['email_url'] + "/send/" + email_uuid,
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

            # Send email congratulating the gift champion!
            email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(gsid),
                            'campaign_name': giftstart.giftstart_title}
            requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                         data=json.dumps({
                             'subject': "GiftStarter Campaign Complete!",
                             'template_name': "campaign_complete_user_funded", 'template_kwargs': email_kwargs,
                             'sender': "team@giftstarter.co", 'to': [giftstart.gc_email]
                         }))

            # And email GiftStarter personnel...
            email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(gsid),
                            'campaign_number': str(gsid)}
            requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                         data=json.dumps({
                             'subject': "GiftStarter Campaign Complete!",
                             'template_name': "campaign_complete_team_funded", 'template_kwargs': email_kwargs,
                             'sender': "team@giftstarter.co", 'to': ['team@giftstarter.co']
                         }))

        elif giftstart.deadline < datetime.now():
            giftstart.giftstart_complete = True
            giftstart.put()
            if len(pitch_in_parts) > 0:
                # Send email congratulating the gift champion!
                email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(gsid),
                                'campaign_name': giftstart.giftstart_title}
                requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                             data=json.dumps({
                                 'subject': "GiftStarter Campaign Complete!",
                                 'template_name': "campaign_complete_user_not_funded",
                                 'template_kwargs': email_kwargs, 'sender': "team@giftstarter.co",
                                 'to': [giftstart.gc_email]
                             }))

                # And email GiftStarter personnel...
                email_kwargs = {'campaign_link': config['app_url'] + '/giftstart?gs-id=' + str(gsid),
                                'campaign_number': str(gsid)}
                requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                             data=json.dumps({
                                 'subject': "GiftStarter Campaign Complete!",
                                 'template_name': "campaign_complete_team_not_funded",
                                 'template_kwargs': email_kwargs, 'sender': "team@giftstarter.co",
                                 'to': ['team@giftstarter.co']
                             }))

            else:
                # Send email of regret to gift champion
                requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                             data=json.dumps({
                                 'subject': "GiftStarter Campaign Has Ended", 'sender': "team@giftstarter.co",
                                 'to': [giftstart.gc_email], 'body': "Bummer! Looks like your campaign didn't get any love.  That's okay, we know it was it's own special snowflake.  We hope you try it again, and please feel free to get in touch with us at team@giftstarter.co for tips on getting people involved in your next campaign!\n\nHere's a link to your campaign:\n" + config['app_url'] + "/giftstart?gs-id=" + str(gsid) + "\n\nHugs,\nTeam Giftstarter"
                             }))

                # And email GiftStarter personnel...
                requests.put(config['email_url'] + '/send/' + str(uuid.uuid4()).replace("-", ''),
                             data=json.dumps({
                                 'subject': "GiftStarter Campaign Has Ended", 'sender': "team@giftstarter.co",
                                 'to': ['team@giftstarter.co'],
                                 'body': "Campaign #" + str(gsid) +
                                         " failed to get any pitch ins, and has ended.  Bummer!"
                             }))
