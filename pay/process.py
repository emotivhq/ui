__author__ = 'stuart'

import traceback
from datetime import datetime
from pitchin import PitchIn
import gs_email
import stripe_utils
import stripe
import json
import math


# TODO how do I do this properly?  Should I send the total price with the post?
def process_payments(gsid, giftstart_price, num_parts):
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    for pitch_in in pitch_ins:
        if not pitch_in.processed:
            pricefloat = float(giftstart_price) * len(pitch_in.parts) / num_parts
            # round up to the nearest cent
            price = int(math.ceil(pricefloat))
            stripe_customer_id = stripe_utils.StripeCustomer.query(stripe_utils.StripeCustomer.uid ==
                                                                   pitch_in.uid).fetch(1)[0].stripe_customer_id
            try:
                charge = stripe.Charge.create(amount=price, currency="usd", customer=stripe_customer_id,
                                              description="GiftStarter campaign %s parts %s"
                                                          % (str(gsid), ", ".join([str(p) for p in pitch_in.parts])))
                pitch_in.processed = True
                pitch_in.processed_time = datetime.now()
                pitch_in.stripe_charge_id = charge['id']
                pitch_in.stripe_charge_json = json.dumps(charge)
                pitch_in.put_async()

            except:
                gs_email.send("Stripe Error!", "This error occurred when attempting to charge user %s for GS#%s:\n\n%s"
                              % (pitch_in.uid, str(gsid), traceback.format_exc()), "errorbot", "stuart@giftstarter.co",
                              ["stuart@giftstarter.co"])
