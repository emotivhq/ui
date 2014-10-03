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
        },
        "email-ask": {
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
                    "replace": "",
                    "flags": ""
                }]
            },
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

        request.remote_addr = '192.168.0.1'
        permutation_two = abtest_core.choose(request, file_name, test_name,
                                             example_tests)
        self.assertEqual(len(permutation_two.values()[0].values()), 1,
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

    def test_choice_distribution(self):
        """
        Choices should be evenly distributed for different inputs
        """
        request = webapp2.Request.blank('/')
        request.method = 'GET'
        file_name = '/templates/angular/home.html'
        test_name = 'steps'

        ips = [str(i) for i in range(20000)]

        choice_counts = {
            "vertical": 0,
            "horizontal": 0,
            "gif": 0
        }

        for ip in ips:
            request.remote_addr = ip
            choice = abtest_core.choose(request, file_name, test_name,
                                        example_tests)
            choice_name = choice.values()[0].keys()[0]
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

        for fn in example_tests:
            def case_generator(spec):
                for tn in spec[fn]:
                    yield spec[fn][tn]

            for case in case_generator(tests):
                self.assertDictContainsSubset(case.values()[0],
                                              example_tests[fn][case.keys()[0]],
                                              "Should contain the chosen test:"
                                              " " + str(case) + "\n"
                                              + str(example_tests[fn]))
