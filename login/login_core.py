__author__ = 'GiftStarter'

from gs_user import User
import EmailLoginPair
from uuid import uuid4
import hashlib
import yaml

config = yaml.load(open('config.yaml'))
noUserImgUrl = config['app_url'] + "/assets/noUserImage.png"

def get_uid(token_set, create=False):
    """

    :rtype : EmailLoginPair
    :raises : ValueError
    """
    users = User.query(User.emaillogin_token_set == token_set).fetch(1)
    if len(users) > 0:
        return users[0].uid
    elif len(User.query(User.emaillogin_token_set.email == token_set.email).fetch(1)) > 0:
        #email exists but password mismatch
        raise ValueError('incorrect password')
    else:
        if create:
            u = User()
            u.uid = str(uuid4().get_hex())
            return u.uid
        else:
            return False


def get_email_token_set(email, password):
    return EmailLoginPair.EmailLoginPair().populate(email=email, password=password)


def get_img_url(token_set):
    # gravatar_hash = hashlib.md5(token_set.email.strip().lower()).hexdigest()
    # return "http://www.gravatar.com/avatar/"+gravatar_hash
    return noUserImgUrl


def get_user_info(user):
    #no automatic names for users yet
    return user


email_reset_salt = '5_MEA@ott@dVx>9m+z!dY;|+>*G!!5:kTT&>K|LKbs3c(XKe|bc.W~`=|mn6C.;J'

def generate_reset_code(email):
    return hashlib.sha256(email+email_reset_salt).hexdigest()