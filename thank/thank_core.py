""" Helper functions for the thank API
"""

__author__ = 'Stuart'

import skip32


def decode_secret(secret):
    """ decode_secret('moxlamduh') -> 'This-Is-My-Title-1' | None
    Returns the url-title for the thank secret, or None if invalid
    """
    return skip32.decode(secret)


def encode_secret(gsid):
    """ encode_secret('132') -> 'mckdolke'
    Creates a secret for a given campaign
    """
    return skip32.encode(gsid)

