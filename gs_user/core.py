__author__ = 'stuart'

from gs_user.User import User
from social import facebook, twitter
import storage.image_cache


def save_email(uid, email):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.email = email
    user.put()


def update_or_create(service, oauth_token, oauth_secret=None):
    if service == 'facebook':
        uid = service[0] + facebook.get_uid(oauth_token)
        users = User.query(User.uid == uid).fetch()
        if len(users) == 0:
            user = User(uid=uid, logged_in_with='facebook', facebook_access_token=oauth_token)
            img_url = storage.image_cache.cache_facebook_user_image(user.uid, oauth_token)
            user.cached_profile_image_url = img_url
            user.put()
            result = user

        else:
            user = users[0]
            user.facebook_access_token = oauth_token
            user.put()
            result = user

    elif service == 'twitter':
        uid = service[0] + twitter.get_uid(oauth_token, oauth_secret)
        users = User.query(User.uid == uid).fetch()

        if len(users) == 0:
            user = User(uid=uid, logged_in_with='twitter', twitter_access_token=oauth_token,
                        twitter_access_secret=oauth_secret)
            img_url = storage.image_cache.cache_twitter_user_image(user.uid,
                                                                   twitter.get_img_url(oauth_token, oauth_secret))
            user.cached_profile_image_url = img_url
            user.put()
            result = user

        else:
            user = users[0]
            user.facebook_access_token = oauth_token
            user.put()
            result = user

    else:
        raise ValueError("Ivalid service.  Service must be twitter or facebook.")

    return result


def add_facebook_extended_token(uid, extended_token, token_expiry):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.facebook_lt_access_token = extended_token
    user.facebook_lt_token_expires = token_expiry
    user.put()

