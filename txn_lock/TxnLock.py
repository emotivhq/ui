"""
Lock: a database entry used for enforcing atomic transactions across all instances
"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb


class TxnLock(ndb.Model):
    """
    a Lock on a specific type of entity (etype) known by a unique identifier (eid)
    """
    timestamp = ndb.DateTimeProperty(auto_now_add=True)