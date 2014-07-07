__author__ = 'stuart'

from gs_user.User import User
from social import facebook, twitter, googleplus
import storage.image_cache
import json
import requests


def save_email(uid, email):
    user = User.query(User.uid == uid).fetch(1)[0]
    user.email = email
    user.put()
    return user


def subscribe_to_mailing_list(uid, email=None):
    subscribe_list_id = 'c0f44e11c0'
    mailchimp_api_key = '0a6a663ef69cb19532a41a7582c7b5e1-us8'
    if email is None:
        email = User.query(User.uid == uid).fetch(1)[0].email

    mailchimp_url = 'https://us8.api.mailchimp.com/2.0/lists/subscribe.json'

    post_data = json.dumps({
        'apikey': mailchimp_api_key,
        'id': subscribe_list_id,
        'email': {
            'email': email
        }
    })
    response = requests.post(mailchimp_url, post_data)
    if response.status_code != 200:
        if json.loads(response.content)['code'] != 214:
            # Make sure the error is not related to user already being subscribed
            raise Exception("Failed to subscribe user! Dumping mailchimp response:" + response.content)

    user = User.query(User.uid == uid).fetch(1)[0]
    user.subscribed_to_mailing_list = True
    user.put()

    return


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
        # Check for g+ users logging again (refresh tokens are only granted on authorization, not every login)
        if service == 'googleplus':
            if token_set.refresh_token is None:
                return user

    setattr(user, service + '_token_set', token_set)

    user.put()
    return user


token_pointer_map = {
    'f': lambda user: user.facebook_token_set.access_token,
    't': lambda user: user.twitter_token_set.access_token,
    'g': lambda user: user.googleplus_token_set.access_token,
}


def validate(uid, token):
    result = None
    user = User.query(User.uid == uid).fetch(1)
    if user:
        if token_pointer_map[uid[0]](user[0]) == token:
            result = {'uid': uid, 'img_url': user[0].cached_profile_image_url, 'token': token}

    return result
