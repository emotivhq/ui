__author__ = 'GiftStarter'

# Change execution path to project root
import os
#os.chdir('/Users/Stuart/Projects/GiftStarter/app')

import unittest
import webapp2
from abtest import abtest_core

example_tests = [{
    "name": "home-steps",
    "cases": [{
        "name": "vertical",
        "weight": 1,
        "changes": [{
            "file": "/templates/angular/home.html"
        }]
    }, {
        "name": "horizontal",
        "weight": 1,
        "changes": [{
            "file": "/templates/angular/home.html",
            "css": "#steps {width: 270%; text-align: left;} div.process {overflow: auto} div.landing-page div.process div.step {width: 31%; margin: 0.5em;}"
        }]
    }, {
        "name": "gif",
        "weight": 1,
        "changes": [{
            "file": "/templates/angular/home.html"
        }]
    }]
}, {
    "name": "home-email",
    "cases": [{
        "name": "bottom",
        "weight": 1,
    }, {
        "name": "top",
        "weight": 1,
        "changes": [{
            "file": "/templates/angular/home.html",
            "findEle": "div.email",
            "replaceEle": "span.email"
        }]
    }]
}]


class ABTestHandler(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_choose(self):
        """
        Choose should return a permutation of a test as a JSON object
        """
        request = webapp2.Request.blank('/')
        request.remote_addr = '192.168.0.0'
        request.method = 'GET'
        file_name = '/templates/angular/home.html'
        test_name = 'home-steps'

        permutation = abtest_core.choose(request, test_name, example_tests)
        self.assertEqual(len(permutation['cases']), 1,
                         "Permutation should have only one test case, "
                         "but had " + str(permutation))

        request.remote_addr = '192.168.0.3'
        permutation_two = abtest_core.choose(request, test_name, example_tests)
        self.assertEqual(len(permutation['cases']), 1,
                         "Permutation should have only one test case, "
                         "but had " + str(permutation_two))
        self.assertNotEquals(permutation, permutation_two,
                             "Permutations should not be the same for "
                             "different IP for certain cases, but were the "
                             "same: " + str(permutation) +
                             "\n" + str(permutation_two))

    def test_choice_consistency(self):
        """
        Choices should be consistent for the same IP and test
        """
        paths = ['/', '/giftstart/', '/faq', '/users/abcdefg', '/what-is-it']
        requests = [webapp2.Request.blank(path) for path in paths]
        file_name = '/templates/angular/home.html'
        test_name = 'home-steps'

        for request in requests:
            request.method = 'GET'
            request.remote_addr = '192.168.0.0'

        choices = [abtest_core.rand_percent(request, test_name)
                   for request in requests]

        choices_equal = all([choice == choices[0] for choice in choices])
        self.assertTrue(choices_equal, "Expect all choices to be equal, but "
                                       "they where " + str(choices))

        other_test_choice = abtest_core.rand_percent(requests[0], 'b')
        self.assertNotEquals(choices[0], other_test_choice,
                             "Expected choices to be different, but they were:"
                             " " + str(choices[0]) + " " +
                             str(other_test_choice))

        requests[0].remote_addr = '1.1.1.1'
        other_ip_choice = abtest_core.rand_percent(requests[0], test_name)
        self.assertNotEquals(choices[0], other_ip_choice,
                             "Expected choices to be different, but they were:"
                             " " + str(choices[0]) + " " +
                             str(other_test_choice))

    def test_choice_distribution(self):
        """
        Choices should be evenly distributed for different inputs
        """
        request = webapp2.Request.blank('/')
        request.method = 'GET'
        file_name = '/templates/angular/home.html'
        test_name = 'home-steps'

        ips = [str(i) for i in range(20000)]

        choice_counts = {
            "vertical": 0,
            "horizontal": 0,
            "gif": 0
        }

        for ip in ips:
            request.remote_addr = ip
            choice = abtest_core.choose(request, test_name, example_tests)
            choice_name = choice['cases'][0]['name']
            choice_counts[choice_name] += 1

        difference = float(max(choice_counts.values())) / \
            min(choice_counts.values()) - 1
        self.assertLess(difference, 0.02, "Difference between most prominent "
                                          "and least prominent choice should "
                                          "be less than 2%, was " +
                                          str(difference))

    def test_choose_tests(self):
        """
        Should choose a set of tests to run
        """
        request = webapp2.Request.blank('/')
        request.remote_addr = '192.168.0.0'
        request.method = 'GET'
        tests = abtest_core.choose_tests(request, example_tests)

        for test in tests:
            self.assertEqual(len(test['cases']), 1,
                             "Should have only selected one case for each, "
                             "selected: " + str(test['cases']))
