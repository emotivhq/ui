"""routines to handle user creation/update, logins (including social), mailing-list subscription, and credit-card fingerprint retrieval"""
__author__ = 'GiftStarter'

from google.appengine.ext import ndb
from google.appengine.api import taskqueue
from gs_user.User import User
from social import facebook, linkedin, twitter, googleplus
import login.login_core
import storage.image_cache
import json
import requests
from UserLogin import UserLogin
import base64
import yaml
import stripe
from pay import paypalapi
import logging


config = yaml.load(open('config.yaml'))

def send_welcome_email(email_address):
    """email a welcome message to the user; FAILS SILENTLY if cannot contact PUT target to DEV compatibility"""
    data = json.dumps({'subject': "Welcome to GiftStarter",
                       'sender': "receipt@giftstarter.com", 'to': [email_address],
                       'template_name': "welcome_user",
                       'mime_type': 'html',
                       'template_kwargs': {}})
    try:
        requests.put(config['email_url'], data=data)
    except Exception:
        logging.error("Unable to send welcome email: {0}".format(data))

    #email a welcome nudge 5 days later
    data = json.dumps({'subject': "Arry from GiftStarter",
                       'sender': "receipt@giftstarter.com", 'to': [email_address],
                       'template_name': "welcome_user_nudge1",
                       'mime_type': 'html',
                       'template_kwargs': {}})
    try:

        taskqueue.add(url="/email/sendfromqueue", method="PUT",
                      payload=data)
        requests.put(config['email_url'], data=data, countdown=60) #60*60*24*5)
    except Exception:
        logging.error("Unable to send welcome 5-day nudge email: {0}".format(data))

def save_email(uid, email):
    """
    update email address for the given User
    @param uid: user ID
    @param email: email address
    @rtype: User
    """
    user = ndb.Key('User', uid).get()
    if user is not None:
        was_email_empty = user.email is None or len(user.email) == 0
        user.email = email
        user.put()
        if was_email_empty and user.email is not None and len(user.email) > 0:
            send_welcome_email(user.email)
    return user


def subscribe_user_to_mailing_list(uid, email=None, double_opt_in=True):
    """
    subscribe user (or provided override email address) to the general mailing list
    @param uid: user ID
    :param email: override email address (None)
    :param double_opt_in: do a double opt-in (True)
    """
    if email is None:
        email = User.query(User.uid == uid).fetch(1)[0].email

    subscribe_to_mailing_list(email, double_opt_in)

    user = User.query(User.uid == uid).fetch(1)[0]
    user.subscribed_to_mailing_list = True
    user.put()

    return


def subscribe_to_sweepstakes(email, firstname, lastname):
    """subscribe user to the sweepstakes mailing list"""
    sweepstakes_list_id = 'b9314c9150'
    return subscribe_mailchimp_h(sweepstakes_list_id, email, firstname=firstname, lastname=lastname, double_opt_in=False)

def subscribe_to_mailing_list(email, double_opt_in=True):
    """subscribe user to the general mailing list"""
    subscribe_list_id = 'c0f44e11c0'
    return subscribe_mailchimp_h(subscribe_list_id, email)

def subscribe_mailchimp_h(list_id, email, firstname='', lastname='', double_opt_in=True):
    """add user to given MailChimp list"""
    if list_id is None:
            raise Exception("Failed to subscribe user! No List ID provided")
    mailchimp_api_key = '59ebc76ea5b3707e6439a35c3b41251f-us8'#'0a6a663ef69cb19532a41a7582c7b5e1-us8'
    mailchimp_url = 'https://us8.api.mailchimp.com/2.0/lists/subscribe.json'

    post_data = json.dumps({
        'apikey': mailchimp_api_key,
        'id': list_id,
        'email': {
            'email': email
        },
        'merge_vars': {
            'FNAME': firstname,
            'LNAME': lastname
        },
        'double_optin': double_opt_in,
    })

    response = requests.post(mailchimp_url, post_data)
    print post_data
    print response.content
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

cache_profile_image_fns = {'facebook': lambda uid, tok: fetch_fb_image(uid, tok),
             'twitter': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid, twitter.get_img_url(tok)),
             'googleplus': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid,googleplus.get_img_url(tok)),
             'linkedin': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid,linkedin.get_img_url(tok)),
             'emaillogin': lambda uid, tok: storage.image_cache.cache_user_image_from_url(uid,login.login_core.get_img_url(tok))}


def cache_profile_image(uid, service, token_set):
    """
    obtain avatar image from service and cache in datastore
    @param uid: user ID
    @param service: valid service name from cache_profile_image_fns
    @param token_set: login token
    @return: URL of stored image
    """
    return cache_profile_image_fns[service](uid, token_set)

service_prefix = {'facebook':'f',
                  'twitter':'t',
                  'googleplus':'g',
                  'linkedin':'k',
                  'emaillogin':'e'}

valid_uid_prefixes = service_prefix.values()

update_user_info_fns = {'f': lambda u: facebook.update_user_info(u),
            't': lambda u: twitter.update_user_info(u),
            'g': lambda u: googleplus.update_user_info(u),
            'k': lambda u: linkedin.update_user_info(u),
            'e': lambda u: login.login_core.update_user_info(u)}

token_pointer_map = {
    'f': lambda user: user.facebook_token_set.access_token,
    't': lambda user: user.twitter_token_set.access_token,
    'g': lambda user: user.googleplus_token_set.access_token,
    'k': lambda user: user.linkedin_token_set.access_token,
    'e': lambda user: user.emaillogin_token_set.email,
}

uid_fns = {'facebook': lambda tok: facebook.get_uid(tok),
           'twitter': lambda tok: twitter.get_uid(tok),
           'googleplus': lambda tok: googleplus.get_uid(tok),
           'linkedin': lambda tok: linkedin.get_uid(tok),
           'emaillogin': lambda tok: login.login_core.get_uid(tok,create=True)}

set_uid_fns = {'facebook': lambda user, id: user.set_facebook_uid(id),
           'twitter': lambda user, id: user.set_twitter_uid(id),
           'googleplus': lambda user, id: user.set_googleplus_id(id),
           'linkedin': lambda user, id: user.set_linkedin_id(id),
           'emaillogin': lambda user, id: user.set_emaillogin_uid(id)}


def is_valid_uid_pattern(uid):
    return len(uid) > 0 and uid[0] in valid_uid_prefixes


def update_or_create(service, token_set, referral):
    """
    create user for given login service and pull their avatar image & name; if user exists, update tokens
    @param service: a valid service from uid_fns
    @param token_set: service-specific login tokens
    @param referral: how was this user referred here?
    @rtype: User
    """
    if service not in uid_fns:
        raise ValueError("Invalid service!  Must be one of: {0}".format(', '.join(uid_fns.keys())))

    uid_unprefixed = uid_fns[service](token_set)
    uid = service_prefix[service] + uid_unprefixed
    user_key = ndb.Key('User', uid)
    user = user_key.get()

    if not user:
        img_url = cache_profile_image(uid, service, token_set)
        user = User(key=user_key, uid=uid, logged_in_with=service,
                    cached_profile_image_url=img_url, is_system_default_profile_image=(service=='emaillogin'))
        set_uid_fns[service](user, uid_unprefixed)
        if referral is not None:
            user.referrer_channel = referral.channel
            user.referrer_type = referral.type
            user.referrer_uid = str(referral.uid)
            user.referrer_uuid = referral.uuid
    else:
        #Check for g+ users logging again (refresh tokens are only granted on authorization, not every login)
        if service == 'googleplus':
            if token_set.refresh_token is None and user.googleplus_token_set is not None:
                token_set.refresh_token = user.googleplus_token_set.refresh_token

    setattr(user, service + '_token_set', token_set)
    update_user_info(user)
    user.put()
    return user


def update_user_info(user):
    """attempt to inject user info provided by service (eg, Google+ displayName) into User"""
    return update_user_info_fns[user.uid[0]](user)


def get_user(uid):
    """get User for ID"""
    if not is_valid_uid_pattern(uid):
        return None
    return ndb.Key('User', uid).get()


def validate(uid, token, path=None):
    """
    validate user token and record login
    @param uid: user ID
    @param token:
    @param path: URI by which the initiated login (for tracking)
    @return: {uid,img_url,token,on_mailing_list,name,has_pitched_in}
    """
    result = None
    if uid and token:
        user = ndb.Key('User', uid).get()
        if user:
            if user.name is None:
                user.name = ''
            if token_pointer_map[uid[0]](user) == token:
                if path:
                    UserLogin.register_login(uid, path)
                result = {
                    'uid': uid, 'img_url': user.cached_profile_image_url,
                    'token': token,
                    'on_mailing_list': user.subscribed_to_mailing_list,
                    'name': base64.b64encode(user.name.encode('utf-8')),
                    'has_pitched_in': user.has_pitched_in,
                }
    return result


def login_emaillogin_user(email, password, referrer):
    """
    turn authenticated email/password pair into a token to match oauth pattern; create/update and return User
    @param email: user's email address
    @param password: user's password
    @param referrer: how were they referred here (for tracking)?
    @rtype: User
    """
    token_set = login.login_core.get_email_token_set(email,password)
    return update_or_create('emaillogin', token_set, referrer)

def login_linkedin_user(code, redirect_url, referrer):
    """
    exchange one-time code and redirect_uri for an access token; create/update and return User
    @param code: one-time code from oauth service
    @param redirect_url: redirect_uri from call to obtain code (must match)
    @param referrer: how were they referred here (for tracking)?
    @rtype: User
    """
    token_set = linkedin.submit_code(code, redirect_url)
    return update_or_create('linkedin', token_set, referrer)

def login_googleplus_user(code, redirect_url, referrer):
    """
    exchange one-time code and redirect_uri for an access token; create/update and return User
    @param code: one-time code from oauth service
    @param redirect_url: redirect_uri from call to obtain code (must match)
    @param referrer: how were they referred here (for tracking)?
    @rtype: User
    """
    token_set = googleplus.submit_code(code, redirect_url)
    return update_or_create('googleplus', token_set, referrer)


def login_facebook_user(code, redirect_url, referrer):
    """
    exchange one-time code and redirect_uri for an access token; create/update and return User
    @param code: one-time code from oauth service
    @param redirect_url: redirect_uri from call to obtain code (must match)
    @param referrer: how were they referred here (for tracking)?
    @rtype: User
    """
    token_set = facebook.get_extended_key(code, redirect_url)
    return update_or_create('facebook', token_set, referrer)


def login_twitter_user(oauth_token, oauth_verifier, referrer):
    """
    exchange an OAuth Request Token for an OAuth Access Token; create/update and return User
    @param oauth_token: OAuth Request Token
    @param oauth_verifier: from the OAuth web-flow
    @param referrer: how were they referred here (for tracking)?
    @rtype: User
    """
    token_set = twitter.submit_verifier(oauth_token, oauth_verifier)
    return update_or_create('twitter', token_set, referrer)


def get_card_tokens(user):
    """
    get card fingerprints from Stripe or PayPal
    @param customer: User
    @return:[{last_four,brand,fingerprint}]
    """

    results = []
    is_stripe = paypalapi.is_stripe()
    customer_id = user.stripe_id if is_stripe else user.paypal_vault_payer_id
    if customer_id is not None:
        cards = stripe.Customer.retrieve(customer_id).cards.all() if is_stripe else paypalapi.getCards(customer_id)

        card_set = set()
        for card in cards['data' if is_stripe else 'items']:
            if card['fingerprint' if is_stripe else 'id'] not in card_set:
                results.append({'last_four': card.get('last4') if is_stripe else card.get('number')[-4:],
                                'brand': card.get('brand' if is_stripe else 'type'),
                                'fingerprint': card.get('fingerprint' if is_stripe else 'id')})
                card_set.add(card['fingerprint' if is_stripe else 'id'])
    return results
