__author__ = 'Stuart'

import unittest

# UUTs
import thank_core

decode_expectations = {
    '0': 'hglrwzw',
    '1': 'hfilnrs',
    '2': 'moljpej',
    '4632': 'bsaebmf',
    '4633': 'icbhkad',
    '4634': 'nidcrsk',
}


class ThankCoreTestHandler(unittest.TestCase):

    def test_encode_secret(self):
        """ Encoded gsids should match expected values
        """
        for k, v in decode_expectations.items():
            self.assertEqual(v, thank_core.encode_secret(k))

    def test_encode_distribution(self):
        """ The encode function should output a relatively even distribution
        of values - we want to avoid birthday attacks
        """
        inputs = [str(i) for i in range(10000)]
        self.assertEqual(True, False)

    def test_decode_secret(self):
        """ Decoded secrets should match expected values
        """
        for k, v in decode_expectations.items():
            self.assertEqual(k, thank_core.decode_secret(v))