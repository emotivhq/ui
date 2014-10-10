__author__ = 'Stuart'

import unittest
import skip32

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
        inputs = [thank_core.encode_secret(str(i)) for i in range(10000)]
        values = [skip32.from_alpha(s) for s in inputs]
        spread = [0] * 100
        key_val = 2**32 / 100
        for v in values:
            spread[v // key_val] += 1
        self.assertLess(max(spread) / float(min(spread)) - 1, 0.70,
                        "Distribution should be within 70%, was " +
                        str(spread))

    def test_decode_secret(self):
        """ Decoded secrets should match expected values
        """
        for k, v in decode_expectations.items():
            self.assertEqual(k, thank_core.decode_secret(v))