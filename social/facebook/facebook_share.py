"""
API for the giftstart endpoint
"""

__author__ = 'jon'

#import logging

import webapp2
from gs_user.gs_user_core import get_user, validate
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


#test url: http://localhost:8080/users/f426193/network/facebook/giftstart-invite/Testing-GiftStarter-1.json
class FacebookShareHandler(webapp2.RequestHandler):

    def get(self):

        uid = self.request.path.split('/')[2]
        gift_path = self.request.path.split('/')[6]
        if gift_path.endswith('.json'):
            gift_path = gift_path[:-5]

        user = None
        fb_id = ""
        fb_tokens = None

        if not gift_path:
            self.response.set_status(400, "No gift URI provided")
            print "No gift URI provided"
            return

        sessionUid = self.request.cookies.get('uid', '').replace('%22', '')
        sessionToken = self.request.cookies.get('token', '').replace('%22', '')

        if not validate(sessionUid,sessionToken,self.request.path):
            self.response.set_status(400, "Invalid session token")
            print "Invalid session token"
            return

        if sessionUid!=uid:
            self.response.set_status(400, "Attempted to use a UID("+uid+") different from Session UID("+sessionUid+")")
            print "Attempted to use a UID("+uid+") different from Session UID("+sessionUid+")"
            return

        if uid[0] not in ['f', 'g', 't']:
            self.response.set_status(400, "Invalid user id")
            print "Invalid User id "+uid
            return
        else:
            user = get_user(uid)
            if user is None:
                self.response.set_status(400, "Invalid user id")
                print "Invalid User id "+uid
                return
            fb_tokens = user.facebook_token_set
            if fb_tokens is None:
                self.response.set_status(400, "Invalid FaceBook tokens")
                print "Invalid FaceBook tokens "+uid
                return
            fb_id = user.facebook_uid
            if(fb_id is None):
                #todo: figure out why users don't always get their facebook_uid set when they are created
                fb_id = user.facebook_uid = facebook.facebook_core.get_uid(fb_tokens);
                user.put()

        self.publish_share(fb_tokens.access_token, gift_path, "", "", "");
        return

    @staticmethod
    def publish_share(access_token, gift_path, message, friends_include, friends_exclude):
        gift_url = "https%3A%2F%2Fwww.giftstarter.co%2Fgiftstart%2F"+gift_path
        post_url = "https://graph.facebook.com/me/dev-giftstarter:invite?access_token="+access_token+"&method=POST&gift="+gift_url;
        #todo: add {message="usermessage",message_tags="FBID1,FBID2",privacy{friends="FRIENDS_OF_FRIENDS",deny="FBID1,FBID2"}}
        #  see https://developers.facebook.com/docs/graph-api/reference/v2.2/post

        #todo: actually call this URL
        print post_url;

        return
