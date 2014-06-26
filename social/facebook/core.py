__author__ = 'stuart'

from . import GraphAPI
from datetime import datetime, timedelta
from google.appengine.ext import ndb


class FacebookTokenSet(ndb.Model):
    access_token = ndb.StringProperty()
    expires = ndb.DateTimeProperty()
    machine_id = ndb.StringProperty()

    def populate(self, access_token, expires_in, machine_id):
        self.access_token = access_token
        self.expires = datetime.now() + timedelta(int(expires_in) / 86400, int(expires_in) % 86400)
        self.machine_id = machine_id
        return self


def get_uid(token_set):
    graph = GraphAPI(token_set.lt_access_token)
    fb_usr = graph.get_object('me')
    return fb_usr['id']