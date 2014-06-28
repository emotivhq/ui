__author__ = 'stuart'

from . import GraphAPI
from datetime import datetime, timedelta
from google.appengine.ext import ndb


class FacebookTokenSet(ndb.Model):
    access_token = ndb.StringProperty()
    expires = ndb.DateTimeProperty()

    def populate(self, access_token, expires_in):
        self.access_token = access_token
        self.expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
        return self


def get_uid(token_set):
    graph = GraphAPI(token_set.access_token)
    fb_usr = graph.get_object('me')
    return fb_usr['id']