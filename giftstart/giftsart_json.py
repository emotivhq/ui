"""endpoints to retrieve and update campaign data as JSON"""
__author__ = 'GiftStarter'

import webapp2
from google.appengine.ext import ndb
import json
import giftstart_core
import logging
import urllib


class GiftStartJsonHandler(webapp2.RequestHandler):
    def get(self):
        """retrieve a campaign's JSON by title"""
        url_title = self.request.path[11:-5]
        if url_title != 'undefined':
            logging.info("Checking for campaign with url_title {0}"
                         .format(url_title))
            gs = ndb.Key('GiftStart', url_title).get()
            if gs is None:
                logging.warning("Didn't find any giftstarts for this title.")
                self.response.set_status(404)
            elif gs.gift_champion_uid:
                self.response.write(gs.jsonify())
            else:
                logging.warning("Campaign didn't have any uid")
                self.response.set_status(404)
        else:
            logging.warning("No giftstart title supplied")
            self.response.set_status(404)

    def post(self):
        """retrieve a campaign's JSON by title, validate user privvs, and update its info"""
        gs = json.loads(self.request.body)
        url_title = self.request.path.split('/')[2][:-5]
        # Check if they have permissions!
        if giftstart_core.does_user_exist(
                urllib.unquote(self.request.cookies['uid'].replace('%22', '')),
                urllib.unquote(self.request.cookies['token'].replace('%22', ''))):
            ndbgs = ndb.Key('GiftStart', url_title).get()
            if ndbgs is not None:
                if ndbgs.gift_champion_uid == urllib.unquote(self.request.cookies['uid'].replace('%22', '')):
                    gs = giftstart_core.update(gs, url_title)
                    self.response.write(gs.jsonify())
                else:
                    self.response.set_status(403,
                                             'Invalid user credentials')
            else:
                self.response.set_status(400, 'Invalid campaign')
        else:
            self.response.set_status(403, 'Invalid user credentials')

