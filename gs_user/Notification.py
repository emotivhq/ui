__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import json
from uuid import uuid4
import time

class Notification(ndb.Model):
    """Notifications inform a User of a message, status change (e.g., a Campaign completing), or another User's actions (e.g., a pitch-in)"""
    target_uid = ndb.StringProperty(required=True)
    # source_uid = ndb.StringProperty(default=None)
    id = ndb.StringProperty(default=str(uuid4()))
    timestamp = ndb.DateTimeProperty(auto_now_add=True)
    seen = ndb.BooleanProperty(default=False)
    link = ndb.StringProperty(default=None)
    acknowledged = ndb.BooleanProperty(default=False)
    title = ndb.StringProperty(required=True)
    message = ndb.StringProperty(required=True)
    image = ndb.StringProperty(default=None)

    def dictify(self):
        return {
            'target_uid': self.target_uid,
            # 'source_uid': self.source_uid,
            'id': self.id,
            'timestamp': int(time.mktime(self.timestamp.utctimetuple()) * 1000),
            'seen': self.seen,
            'link': self.link,
            'acknowledged': self.acknowledged,
            'title': self.title,
            'message': self.message,
            'image': self.image
        }

    def jsonify(self):
        return json.dumps(self.dictify())
