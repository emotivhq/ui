"""routines for managing LinkedIn logins"""
__author__ = 'GiftStarter'

from linkedin_login import get_auth_url, submit_verifier, is_logged_in
from linkedin_core import get_uid, get_img_url, LinkedinTokenSet, update_user_info