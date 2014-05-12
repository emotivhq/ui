__author__ = 'stuart'

import json
from pitchin import PitchIn
from google.appengine.api import taskqueue
from giftstart import GiftStart
import gs_email


def giftstart_complete(gsid):
    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch()[0]
    # Check if all parts have been bought
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    num_pitch_ins = sum([len(pitch_in.parts) for pitch_in in pitch_ins])
    available_parts = giftstart.overlay_rows * giftstart.overlay_columns

    if num_pitch_ins > available_parts:
        # Something has gone wrong, notify GS
        gs_email.send("GiftStart Error!!!", "Too many parts have been sold for GS#%s!" % giftstart.gsid,
                      "Stuart Robot", "stuart@giftstarter.co", ["stuart@giftstarter.co", "arry@giftstarter.co"])
    if num_pitch_ins >= available_parts:
        # All parts have been bought!  Send notifications to givers...
        # TODO: woops, only canvas apps can send notifications :/
        # for pitch_in in pitch_ins:
        #     user = User.query(User.uid == pitch_in.uid).fetch()[0]
        #     access_token = user.lt_access_token if user.lt_access_token else user.access_token
        #     facebook.send_notification(access_token, "GiftStart #%s has been completed! Nice work!" % gsid,
        #                                "")#"#/giftstart?gs-id=%s" % gsid)

        # Send email congratulating the gift champion, too!
        gs_email.send("GiftStart Complete!", "GiftStart #%s has been completed! Nice work!" % giftstart.gsid,
                      "Stuart at GiftStarter", "stuart@giftstarter.co", [giftstart.gc_email])

        # And email GiftStarter personnel...
        gs_email.send("GiftStart Complete!", "GiftStart #%s has been completed! Nice work!" % giftstart.gsid,
                      "Stuart Robot", "stuart@giftstarter.co", ["stuart@giftstarter.co", "arry@giftstarter.co"])

        taskqueue.add(url="/pay", method="POST", payload=json.dumps({'action': 'process-payments', 'gsid': gsid}))
