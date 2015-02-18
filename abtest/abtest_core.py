"""
Used for managing AB tests.  Allows pseudo-random generation of AB test
permutations based on user parameters.

Test spec format:

[{
    'name': 'test1',
    'cases': [{
        'name': 'vertical',
        'weight': 0.666,
        'changes': [{
            'file': 'file1',
            'find': '<h4>',
            'replace': '<h3>',
        }...]
    }, {
        'name': 'gif',
        'weight': 0.333,
        'changes': [{
            'file': 'file1',
            'findEle': 'div.steps',
            'replaceEle': 'span.steps',
            'css': 'span.steps {color: #d45}'
        },...]
    }]
}...]
"""

__author__ = 'GiftStarter'

import hashlib
import json


abspec = json.load(open('abtest/spec.json'))


def rand_percent(request, test_name):
    """ rand_percent(webapp2.Request, 'mobile_steps') ->  0.784392
    Returns a pseudo-random value based on request params
    """
    hashed_ip = int(hashlib.md5(request.remote_addr + test_name)
                    .hexdigest()[-3:], 16)
    return float(hashed_ip) / int('fff', 16)


def choose(request, test_name, test_spec):
    """ choose(webapp2.Request, '/a.html', 'steps', {test_spec}) -> {test}
    Chooses a test case for a specific test
    """
    choice_float = rand_percent(request, test_name)
    this_test = [test for test in test_spec if test['name'] == test_name][0]
    total_weight = sum([case['weight'] for case in this_test['cases']])
    for case in this_test['cases']:
        adjusted_weight = float(case['weight'])/total_weight
        choice_float -= adjusted_weight
        if choice_float <= 0:
            return {"name": this_test['name'], "cases": [case]}
    else:
        return {"name": this_test['name'], "cases": [case]}


def choose_tests(request, spec):
    """ choose_tests(webapp2.Request) -> {tests}
    Returns a chosen permutation of tests for a given client
    """
    return [choose(request, test['name'], spec) for test in spec]


def get_tests(request):
    return json.dumps(choose_tests(request, abspec))