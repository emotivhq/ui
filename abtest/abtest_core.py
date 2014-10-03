"""
Used for managing AB tests.  Allows pseudo-random generation of AB test
permutations based on user parameters.

Test spec format:
{
    'file1': {
        'test1': {
            'case1': {
                'weight': 1,
                'changes': [{
                    'find': '<h4>',
                    'replace': '<h3>',
                    'flags': 'g'
                }, ...]
            },
            'case2': {...}
        },
        'test2': {...}
    },
    'file2': {...} ...
}
"""

__author__ = 'Stuart'

import hashlib
import json


abtests = json.load(open('spec.json'))


def rand_percent(request, file_name, test_name):
    """ rand_percent(webapp2.Request, 'mobile_steps') ->  0.784392
    Returns a pseudo-random value based on request params
    """
    hashed_ip = int(hashlib.md5(request.remote_addr + file_name + test_name)
                    .hexdigest()[-3:], 16)
    return float(hashed_ip) / int('fff', 16)


def choose(request, file_name, test_name, test_spec):
    """ choose(webapp2.Request, '/a.html', 'steps', {test_spec}) -> {test}
    """
    choice_float = rand_percent(request, test_name)



def choose_tests(request):
    """ choose_tests(webapp2.Request) -> {tests}
    Returns a chosen permutation of tests for a given client
    """
    pass

