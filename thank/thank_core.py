""" Helper functions for the thank API
"""

__author__ = 'GiftStarter'

import skip32
from pay.PitchIn import PitchIn
from google.appengine.ext import ndb
import yaml
import json
import requests
from gs_user.Notification import notify

config = yaml.load(open('config.yaml'))


def decode_secret(secret):
    """ decode_secret('moxlamduh') -> 'This-Is-My-Title-1' | None
    Returns the url-title for the thank secret, or None if invalid
    """
    return skip32.decode(secret.lower())


def encode_secret(gsid):
    """ encode_secret('132') -> 'mckdolke'
    Creates a secret for a given campaign
    """
    return skip32.encode(gsid)


def send_emails(key):
    """ send_emails('132') -> None
    Sends emails letting everyone who pitched in know that they were thanked!
    """

    gs = ndb.Key('GiftStart', key).get()
    pis = PitchIn.query(ancestor=ndb.Key('GiftStart', key)).fetch()

    email_kwargs = {
        'campaign_name': gs.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                          gs.giftstart_url_title,
        'frame': 'base_frame',
    }

    if gs.thanks_uid:
        email_kwargs['thanks_img_url'] = ndb.Key('User', gs.thanks_uid).get()\
            .cached_profile_image_url

    url = config['email_url']

    data = json.dumps({'subject': "You Received a Thank You",
                       'mime_type': 'html',
                       'sender': "giftconcierge@giftstarter.co",
                       'to': [pi.email for pi in pis],
                       'template_name': "thank_you_notification",
                       'template_kwargs': email_kwargs})

    requests.put(url, data=data)

    for pi in pis:
        notify(pi.uid,
               'You Received a Thank You for '+ email_kwargs['campaign_name'],
               None,
               email_kwargs['campaign_link'],
               gs.product_img_url)