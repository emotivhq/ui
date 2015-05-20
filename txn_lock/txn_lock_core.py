"""
routines to obtain or release a db-based Lock
"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb

from time import sleep
from TxnLock import TxnLock

@ndb.toplevel
def obtain_lock(ancestor, max_wait_seconds):
    """
    :param ancestor: ancestor to lock on
    :param max_wait_seconds: raise IOError if cannot obtain Lock after this many seconds
    :return: Lock
    """
    if ancestor is None:
        raise IOError("Unable to obtain lock: no ancestor provided")
    slept = 0
    while TxnLock.query(ancestor=ancestor.key).count() > 0:
        if slept > max_wait_seconds:
            raise IOError("Unable to obtain a lock after {0} seconds".format(max_wait_seconds))
        sleep(1)
        slept += 1
    lock=TxnLock(parent=ancestor.key)
    lock.put()
    ndb.get_context().clear_cache()
    return lock

@ndb.toplevel
def release_lock(lock):
    lock.key.delete()
    ndb.get_context().clear_cache()
