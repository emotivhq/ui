"""
@undocumented:emaillogin_salt
"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
import hashlib

emaillogin_salt = 'KDqRL|~[|+QEV)~-aJ}5;|.Xz^B)H%w&$7*8rA:<@*F&_?Vm51|s<H{LdcIOHT.^'

class EmailLoginPair(ndb.Model):
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)

    def populate(self, email, password):
        self.email = email
        self.password = hashlib.md5(password+emaillogin_salt).hexdigest()
        return self