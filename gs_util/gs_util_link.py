""" Creates a link pointing to /create with all product details"""
__author__ = 'GiftStarter'

import yaml
import urllib
import logging

config = yaml.load(open('config.yaml'))


def make_giftstart_it_url(giftstart):
    """ Creates a link pointing to /create with all product details; make sure to use target='_self' for local links
    @type giftstart: giftstart.GiftStart.GiftStart
    @rtype: str
    """
    try:
        return '{app_url}/create?{query}'.format(**{
            'app_url': config['app_url'],
            'query': urllib.urlencode({
                'product_url': giftstart.product_url,
                'title': giftstart.product_title,
                'price': giftstart.product_price,
                'img_url': giftstart.product_img_url,
                'source': 'GiftStarter Email',
            }),
        })
    except UnicodeEncodeError:
        logging.warning("UnicodeEncodeError during make_giftstart_it_url for "+giftstart.jsonify())
        return '{app_url}/create?{query}'.format(**{
            'app_url': config['app_url'],
            'query': urllib.urlencode({
                'product_url': giftstart.product_url,
                'title': giftstart.product_title.decode('utf-8', 'ignore'),
                'price': giftstart.product_price.decode('utf-8', 'ignore'),
                'img_url': giftstart.product_img_url,
                'source': 'GiftStarter Email',
            }),
        })
