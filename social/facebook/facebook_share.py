"""OBVIATED: use facebook_core.publish_to_wall
 (handle requests to share a giftstart on FaceBook)"""

__author__ = 'jon'

#import logging

import webapp2
import requests
import json
import logging
from gs_user.gs_user_core import get_user, validate, is_valid_uid_pattern
from social import facebook
import urllib
#import giftstart_comm
import giftstart
#import giftstart_core
#import json

#check cookies for UID and token
#get FB creds from UserID
#from POST: shareToFbIDs, excludeFromFbIDs, messageText,
#if error, log and respond 400 or 403

class FacebookShareHandler(webapp2.RequestHandler):
    """share a specific giftstart on Facebook"""

    def post(self):
        """share a specific giftstart on Facebook"""

        uid = self.request.path.split('/')[2]
        gift_path = self.request.path.split('/')[6]
        if gift_path.endswith('.json'):
            gift_path = gift_path[:-5]
        message = self.request.POST.get("message")
        tags = self.request.POST.get("tags")
        deny = self.request.POST.get("deny")

        if not gift_path:
            self.response.set_status(400, "No gift URI provided")
            print "No gift URI provided"
            return

        sessionUid = self.request.cookies.get('uid', '').replace('%22', '')
        sessionToken = urllib.unquote(self.request.cookies.get('token', '').replace('%22', ''))

        if not validate(sessionUid,sessionToken,self.request.path):
            self.response.set_status(400, "Invalid session token")
            logging.error("facebook_share: Invalid session token")
            return

        if sessionUid != uid:
            self.response.set_status(400, "Attempted to use a UID("+uid+") different from Session UID("+sessionUid+")")
            logging.error("facebook_share: Attempted to use a UID("+uid+") different from Session UID("+sessionUid+")")
            return

        user = get_user(uid)
        if user is None:
            self.response.set_status(400, "Invalid user id")
            logging.error("facebook_share: Invalid User id "+uid)
            return
        fb_tokens = user.facebook_token_set
        if fb_tokens is None:
            self.response.set_status(400, "Invalid FaceBook tokens")
            logging.error("facebook_share: Invalid FaceBook tokens "+uid)
            return
        fb_id = user.facebook_uid
        try:
            if(fb_id is None):
                fb_id = user.facebook_uid = facebook.facebook_core.get_uid(fb_tokens)
                user.fb_id = fb_id
                user.put()
        except Exception as e:
            logging.error("facebook_share: Unable to set current user's FB ID: "+str(e))
        self.response.write(text=self.publish_share(fb_tokens.access_token, gift_path, message, tags, deny).content)

    @staticmethod
    def publish_share(access_token, gift_path, message, tags=None, deny=None):
        """
        publish a message on FaceBook
        @param access_token: FB access token
        @param gift_path: URI under /giftstart/ of giftstart
        @param message: message for Post
        @param tags: FB tags
        @param deny: FB privacy['deny'] (IDs of users who cannot see the message)
        :return:
        """
        gift_url = "https://www.giftstarter.com/giftstart/"+gift_path
        post_url = "https://graph.facebook.com/me/dev-giftstarter:invite"
        privacy = {'value': 'CUSTOM', 'friends': 'FRIENDS_OF_FRIENDS'}
        if(deny):
            privacy['deny']=deny
        req_params = {'access_token': access_token, 'gift': gift_url, 'message': message, 'privacy': json.dumps(privacy)}
        if(tags):
            req_params['tags']=tags
        print json.dumps(req_params)
        return requests.post(post_url,params=req_params)
