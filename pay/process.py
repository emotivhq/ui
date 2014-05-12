__author__ = 'stuart'

from datetime import datetime
from pitchin import PitchIn
import gs_email
import stripe_utils
import stripe
import json
import requests
import math


def process_payments(gsid):
    response = requests.post('/giftstart/api', json.dumps({'gsid': gsid}))
    giftstart = json.loads(response.content)
    print(giftstart)
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    for pitch_in in pitch_ins:
        if not pitch_in.processed:
            pricefloat = float(giftstart['product']['price']) * len(pitch_in.parts) / giftstart['rows'] / \
                giftstart['columns']
            # round up to the nearest cent
            price = math.ceil(pricefloat)
            stripe_customer = stripe_utils.StripeCustomer.query(stripe_utils.StripeCustomer.uid ==
                                                                pitch_in.uid).fetch()[0]
            cards = json.loads(stripe_customer.stripe_response)['cards']['data']
            used_card = filter(lambda card: card['last4'] == pitch_in.last_four, cards)[0]
            try:
                charge = stripe.Charge.create(amount=price, currency="usd", card=used_card['id'],
                                              description="GiftStarter campaign %s parts %s"
                                                          % (str(gsid), ", ".join(pitch_in.parts)))
                pitch_in.processed = True
                pitch_in.processed_time = datetime.now()
                pitch_in.stripe_charge_id = charge['id']
                pitch_in.stripe_charge_json = json.dumps(charge)
                pitch_in.put_async()

            except Exception, e:
                gs_email.send("Stripe Error!", "This error occurred when attempting to charge user %s for GS#%s:\n\n%s"
                              % (pitch_in.uid, str(gsid), e.message), "errorbot", "stuart@giftstarter.co",
                              ["stuart@giftstarter.co"])
