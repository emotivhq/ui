__author__ = 'Stuart'

import unittest
import webapp2

import abtest_core

example_tests = {
    "/templates/angular/home.html": {
        "steps": {
            "vertical": {
                "weight": 1,
                "changes": [{
                    "find": "",
                    "replace": "",
                    "flags": ""
                }]
            },
            "horizontal": {
                "weight": 1,
                "changes": [{
                    "find": "",
                    "replace": "<style>#steps {width: 270%; text-align: left;} div.process {overflow: auto} div.landing-page div.process div.step {width: 31%; margin: 0.5em;}</style>",
                    "flags": ""
                }]
            },
            "gif": {
                "weight": 1,
                "changes": [{
                    "find": "",
                    "replace": "<style></style>",
                    "flags": ""
                }, {
                    "find": "",
                    "replace": "<style></style>",
                    "flags": ""
                }]
            }
        }
    }
}


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
        test_name = example_tests[file_name].keys()[0]
        test = example_tests[file_name][test_name]

        permutation = abtest_core.choose(request, file_name, test_name,
                                         example_tests)
        self.assertEqual(len(permutation.values()[0].values()), 1,
                         "Permutation should have only one test case, "
                         "but had " + str(permutation))


    def test_choice_consistency(self):
        """
        Choices should be consistent for the same IP and test
        """
        paths = ['/', '/giftstart/', '/faq', '/users/abcdefg', '/what-is-it']
        requests = [webapp2.Request.blank(path) for path in paths]
        file_name = '/templates/angular/home.html'
        test_name = example_tests[file_name].keys()[0]

        for request in requests:
            request.method = 'GET'
            request.remote_addr = '192.168.0.0'

        choices = [abtest_core.rand_percent(request, file_name, test_name)
                   for request in requests]

        choices_equal = all([choice == choices[0] for choice in choices])
        self.assertTrue(choices_equal, "Expect all choices to be equal, but "
                                       "they where " + str(choices))

        other_test_choice = abtest_core.rand_percent(requests[0], 'a', 'b')
        self.assertNotEquals(choices[0], other_test_choice,
                             "Expected choices to be different, but they were:"
                             " " + str(choices[0]) + " " +
                             str(other_test_choice))

        requests[0].remote_addr = '1.1.1.1'
        other_ip_choice = abtest_core.rand_percent(requests[0], file_name,
                                                   test_name)
        self.assertNotEquals(choices[0], other_ip_choice,
                             "Expected choices to be different, but they were:"
                             " " + str(choices[0]) + " " +
                             str(other_test_choice))