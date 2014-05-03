__author__ = 'stuart'

from gs_user import User
from facebook import send_notification


def fb_notify_campaign_complete(recipient_uid, gift_receiver_uid, gsid):
    user = User.query(User.uid == recipient_uid).fetch()[0]
    user_token = user.lt_access_token if user.lt_access_token else user.access_token
    message = "The Giftstarter campaign for @[%s] you gave to just completed!  Check it out what every one else said!" \
              % gift_receiver_uid
    href = "#/giftstart?gs-id=%s" % gsid
    send_notification(user_token, message, href)

