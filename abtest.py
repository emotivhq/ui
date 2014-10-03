"""
Used for managing AB tests.  Allows pseudo-random generation of AB test
permutations based on user parameters.
"""

__author__ = 'Stuart'

import hashlib
import yaml


abtests = yaml.load(open('abtests.yaml'))


def rand_percent(request, test_name):
    """ choose(webapp2.Request, 'mobile_steps') ->  0.784392
    Returns a pseudo-random value based on request params
    """
    hashed_ip = int(hashlib.md5(request.remote_addr + test_name)
                    .hexdigest()[-3:], 16)
    return float(hashed_ip) / int('fff', 16)

    # total_weight = sum(options.values())
    #
    # current_weight = 0
    # for k, v in options:
    #     current_weight += v
    #     if current_weight / total_weight > ip_percent:
    #         return k
    # else:
    #     return options.keys()[-1]



