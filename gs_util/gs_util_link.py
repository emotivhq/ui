__author__ = 'Stuart'

import yaml
import urllib

config = yaml.load(open('config.yaml'))


def make_giftstart_it_url(giftstart):
    """ Creates a link pointing to /create with all product details
    :type giftstart: giftstart.GiftStart.GiftStart
    :rtype: str
    """
    return '{app_url}/create?{query}'.format(**{
        'app_url': config['app_url'],
        'query': urllib.urlencode({
            'product_url': giftstart.product_url,
            'title': giftstart.product_title,
            'price': giftstart.product_price/float(100),
            'img_url': giftstart.product_img_url,
            'source': 'GiftStarter Email',
        }),
    })
