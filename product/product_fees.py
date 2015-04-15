"""
use Tax Cloud API to find tax percentages by zip code
@undocumented:TAX_CLOUD_API_ID
@undocumented:TAX_CLOUD_API_KEY
"""
__author__ = 'GiftStarter'

import yaml

config = yaml.load(open('config.yaml'))

baseServiceFeeRate = 0.08

def lookup(coupon):
    """
    look up service fee rate based on coupon code (if any)
    @param coupon:
    """
    if coupon == config['couponCode']:
        return 0
    else:
        return config['baseServiceFeeRate']
