from social import facebook

__author__ = 'stuart'

from gs_user import User
from GiftStart import GiftStart
from pay.PitchIn import PitchIn
import gs_email


def fb_notify_campaign_complete(recipient_uid, gift_receiver_uid, gsid):
    user = User.query(User.uid == recipient_uid).fetch()[0]
    user_token = user.lt_access_token if user.lt_access_token else user.access_token
    message = "The Giftstarter campaign for @[{uid}] you gave to just completed!  " \
              "Check it out what every one else said!".format(uid=gift_receiver_uid)
    href = "#/giftstart?gs-id={gsid}".format(gsid=gsid)
    facebook.send_notification(user_token, message, href)


def send_day_left_warning(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
    pitch_ins = PitchIn.query()
    if not giftstart.giftstart_complete:
        subject = "GiftStarter Campaign Ending Soon!"
        gc_template = "Oh noes!  Your campaign only has one day left!  Go back and spread the word to drive it to " \
                      "completion!  Here's the link to it!\n\nhttps://www.giftstarter.co/giftstart?gs-id={gsid}\n\n" \
                      "Thanks!\nTeam GiftStarter"
        contributor_template = "Oh noes!  Your campaign only has one day left!  Go back and spread the word to drive" \
                               " it to completion!  Here's the link to " \
                               "it!\n\nhttps://www.giftstarter.co/giftstart?gs-id={gsid}\n\nThanks!\nTeam GiftStarter"
        gc_message = gc_template.format(gsid=gsid)
        contributor_message = contributor_template.format(gsid=gsid)
        gs_email.send(subject, gc_message, "Stuart at GiftStarter", "stuart@giftstarter.co", giftstart.gc_email)
        email_set = set(map(lambda pi: pi.email, pitch_ins))
        for email in email_set:
            gs_email.send(subject, contributor_message, "Stuart at GiftStarter", "stuart@giftstarter.co", email)
