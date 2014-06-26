__author__ = 'stuart'

from gs_user.User import User
from social import facebook, twitter, googleplus
import storage.image_cache


def save_email(uid, email):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.email = email
    user.put()


cache_fns = {'facebook': lambda uid, tok: storage.image_cache.cache_facebook_user_image(uid, tok),
             'twitter': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid, twitter.get_img_url(tok)),
             'googleplus': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid,
                                                                                          googleplus.get_img_url(tok))}


def cache_profile_image(uid, service, token_set):
    return cache_fns[service](uid, token_set)


uid_fns = {'facebook': lambda tok: facebook.get_uid(tok),
           'twitter': lambda tok: twitter.get_uid(tok),
           'googleplus': lambda tok: googleplus.get_uid(tok)}


def update_or_create(service, token_set):
    if service not in uid_fns:
        raise ValueError("Invalid service!  Must be facebook, googleplus, or twitter.")

    uid = service[0] + uid_fns[service](token_set)
    users = User.query(User.uid == uid).fetch()

    if len(users) == 0:
        img_url = cache_profile_image(uid, service, token_set)
        user = User(uid=uid, logged_in_with=service, cached_profile_image_url=img_url)
    else:
        user = users[0]

    setattr(user, service + '_token_set', token_set)

    user.put()
    return user
