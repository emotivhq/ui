"""routines for managing Twitter logins"""
__author__ = 'GiftStarter'

from twitter_login import get_auth_url, submit_verifier, is_logged_in
from twitter_core import get_uid, get_img_url, TwitterTokenSet, update_user_info