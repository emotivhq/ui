__author__ = 'stuart'

from google.appengine.ext import ndb
from gs_user.User import User
from social import facebook, twitter, googleplus
import storage.image_cache
import json
import requests
from UserLogin import UserLogin
import base64
import stripe


def save_email(uid, email):
    user = ndb.Key('User', uid).get()
    if user is not None:
        user.email = email
        user.put()
    return user


def subscribe_user_to_mailing_list(uid, email=None, double_opt_in=True):
    if email is None:
        email = User.query(User.uid == uid).fetch(1)[0].email

    subscribe_to_mailing_list(email, double_opt_in)

    user = User.query(User.uid == uid).fetch(1)[0]
    user.subscribed_to_mailing_list = True
    user.put()

    return


def subscribe_to_mailing_list(email, double_opt_in=True):
    subscribe_list_id = 'c0f44e11c0'
    mailchimp_api_key = '0a6a663ef69cb19532a41a7582c7b5e1-us8'
    mailchimp_url = 'https://us8.api.mailchimp.com/2.0/lists/subscribe.json'

    post_data = json.dumps({
        'apikey': mailchimp_api_key,
        'id': subscribe_list_id,
        'email': {
            'email': email
        },
        'double_optin': double_opt_in,
    })

    response = requests.post(mailchimp_url, post_data)
    if response.status_code != 200:
        if json.loads(response.content)['code'] != 214:
            # Make sure the error is not related to user already being
            # subscribed
            raise Exception("Failed to subscribe user! Dumping mailchimp "
                            "response:" + response.content)


def fetch_fb_image(uid, tok):
    # Fetch facebook image
    graph = facebook.GraphAPI(tok.access_token)
    img = graph.get_object('me/picture', type='square', height=400, width=400,
                           redirect=1)['data']
    return storage.image_cache.save_picture_to_gcs(uid + '.jpg', 'u/', img)

cache_fns = {'facebook': lambda uid, tok: fetch_fb_image(uid, tok),
             'twitter': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid, twitter.get_img_url(tok)),
             'googleplus': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid,googleplus.get_img_url(tok))}


def cache_profile_image(uid, service, token_set):
    return cache_fns[service](uid, token_set)


uid_fns = {'facebook': lambda tok: facebook.get_uid(tok),
           'twitter': lambda tok: twitter.get_uid(tok),
           'googleplus': lambda tok: googleplus.get_uid(tok)}


def update_or_create(service, token_set, referral):
    if service not in uid_fns:
        raise ValueError("Invalid service!  Must be facebook, googleplus, or twitter.")

    uid = service[0] + uid_fns[service](token_set)
    user_key = ndb.Key('User', uid)
    user = user_key.get()

    if not user:
        img_url = cache_profile_image(uid, service, token_set)
        user = User(key=user_key, uid=uid, logged_in_with=service,
                    cached_profile_image_url=img_url)
        user.referrer_channel = referral.channel
        user.referrer_type = referral.type
        user.referrer_uid = str(referral.uid)
        user.referrer_uuid = referral.uuid
    else:
        # Check for g+ users logging again (refresh tokens are only granted on authorization, not every login)
        if service == 'googleplus':
            if token_set.refresh_token is None:
                return user

    setattr(user, service + '_token_set', token_set)

    get_user_info(user)

    user.put()
    return user


info_map = {'f': lambda u: facebook.get_user_info(u),
            't': lambda u: twitter.get_user_info(u),
            'g': lambda u: googleplus.get_user_info(u)}


def get_user_info(user):
    return info_map[user.uid[0]](user)


def get_user(uid):
    return ndb.Key('User', uid).get()


token_pointer_map = {
    'f': lambda user: user.facebook_token_set.access_token,
    't': lambda user: user.twitter_token_set.access_token,
    'g': lambda user: user.googleplus_token_set.access_token,
}


def validate(uid, token, path):
    result = None
    user = ndb.Key('User', uid).get()
    if user:
        if user.name is None:
            user.name = ''
        if token_pointer_map[uid[0]](user) == token:
            UserLogin.register_login(uid, path)
            result = {
                'uid': uid, 'img_url': user.cached_profile_image_url,
                'token': token,
                'on_mailing_list': user.subscribed_to_mailing_list,
                'name': base64.b64encode(user.name.encode('utf-8')),
                'has_pitched_in': user.has_pitched_in,
            }

    return result


def login_googleplus_user(code, redirect_url, referrer):
    token_set = googleplus.submit_code(code, redirect_url)
    return update_or_create('googleplus', token_set, referrer)


def login_facebook_user(code, redirect_url, referrer):
    token_set = facebook.get_extended_key(code, redirect_url)
    return update_or_create('facebook', token_set, referrer)


def login_twitter_user(oauth_token, oauth_verifier, referrer):
    token_set = twitter.submit_verifier(oauth_token, oauth_verifier)
    return update_or_create('twitter', token_set, referrer)


def get_card_tokens(customer_id):
    cards = stripe.Customer.retrieve(customer_id).cards.all()
    return [{'last_four': card.get('last4'), 'brand': card.get('brand')}
            for card in cards]