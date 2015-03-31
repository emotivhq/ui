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
    return '{app_url}/create?{query}'.format(**{
        'app_url': config['app_url'],
        'query': urllib.urlencode({
            'product_url': giftstart.product_url.encode('ascii', 'ignore'),
            'title': giftstart.product_title.encode('ascii', 'ignore'),
            'price': giftstart.product_price,
            'img_url': giftstart.product_img_url.encode('ascii', 'ignore'),
            'source': 'GiftStarter Email',
        }),
    })