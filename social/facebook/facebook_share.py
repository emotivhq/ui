"""
API for the giftstart endpoint
"""

__author__ = 'stuart'

import webapp2
from gs_user.gs_user_core import get_user, validate
#import giftstart_comm
#from giftstart import GiftStart
#import giftstart_core
#import json

#check cookies for UID and token
#get FB creds from UserID
#from POST: shareToFbIDs, excludeFromFbIDs, messageText,
#if error, log and respond 400 or 403

class FacebookShareHandler(webapp2.RequestHandler):

    def get(self):


        uid = self.request.path.split('/')[0]
        giftid = self.request.path.split('/')[1]

        sessionUid = self.request.cookies.get('uid', '').replace('%22', '')
        sessionToken = self.request.cookies.get('token', '').replace('%22', '')

        if sessionUid!=uid:
            self.response.set_status(400, "Attempted to use a UID different from Session UID")

        if uid not in ['f', 'g', 't']:
            self.response.set_status(400, "Invalid user id")
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
            #else:
            #    self.response.write(user.jsonify())



        self.response.set_status(400, "Invalid user id")
        self.response.write("reached FacebookShareHandler(webapp2.RequestHandler) with uid="+uid+" sessionUid="+sessionUid+" token="+sessionToken)
        pass
"""
        if not all([bool(thing) for thing in [uid, token]]):
            logging.warning("Invalid data used for stripe token request:"
                            "\n{0}".format(self.request.body))

        try:
            #

        # validate user and token
        if validate(uid, token, self.num_campaigns = int(self.request.get('num_campaigns'))
            #campaigns = giftstart_core.hot_campaigns(num_campaigns)
            #self.response.write(json.dumps(campaigns))
            #
        except Exception as e:
            self.response.set_status(400, 'Invalid request')
            raise e
            """