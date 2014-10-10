__author__ = 'Stuart'

import unittest

# UUTs
import thank_core

decode_expectations = {
    '132': '',
    '1': '',
    '52': '',
}


class ThankCoreTestHandler(unittest.TestCase):

    def test_encode_secret(self):
        """ Encoded gsids should match expected values
        """
        self.assertEqual(True, False)

    def test_encode_distribution(self):
        """ The encode function should output a relatively even distribution
        of values - we want to avoid birthday attacks
        """
        inputs = [str(i) for i in range(10000)]
        self.assertEqual(True, False)

    def test_decode_secret(self):
        """ Decoded secrets should match expected values
        """
        self.assertEqual(True, False)