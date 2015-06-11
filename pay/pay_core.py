""" Core functions for pitchins """

__author__ = 'GiftStarter'

from google.appengine.api import taskqueue
from google.appengine.ext import ndb
from google.appengine.api import urlfetch
import json, yaml
from gs_user import gs_user_core
from giftstart.GiftStart import GiftStart
from pay.PitchIn import PitchIn
from gs_user.Notification import notify
import requests
import logging
from stripe.error import CardError, InvalidRequestError, AuthenticationError, \
    APIConnectionError, StripeError
from gs_util import gs_util_link
import stripe
import paypalrestsdk
import paypalapi
import uuid
import re
from txn_lock.txn_lock_core import obtain_lock, release_lock

config = yaml.load(open('config.yaml'))

AMEX_CC_RE = re.compile(r"^3[47][0-9]{13}$")
VISA_CC_RE = re.compile(r"^4[0-9]{12}(?:[0-9]{3})?$")
MASTERCARD_CC_RE = re.compile(r"^5[1-5][0-9]{14}$")
DISCOVER_CC_RE = re.compile(r"^6(?:011|5[0-9]{2})[0-9]{12}$")

CC_MAP = {"amex": AMEX_CC_RE, "visa": VISA_CC_RE, "mastercard": MASTERCARD_CC_RE, "discover": DISCOVER_CC_RE}

def set_note_for_pitchin(uid,gsid,parts,note,name=None,img_url=None):
    """set note for the given parts"""
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid, PitchIn.uid == uid).fetch()
    for pitchin in pitch_ins:
        if pitchin.parts==parts:
            pitchin.note=note
            if name is not None:
                pitchin.name=name
            if img_url is not None:
                pitchin.img_url=img_url
            pitchin.put()
            return pitchin
    logging.error("No pitch-in with gsid={0}, uid={1}, parts={2}".format(gsid,uid,parts))
    return None

def set_img_for_pitchin(uid,gsid,parts,imgUrl):
    """set image for the given parts"""
    if not imgUrl:
        logging.error("Empty imgUrl set for pitch-in with gsid={0}, uid={1}, parts={2}".format(gsid,uid,parts))
        return None
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid, PitchIn.uid == uid).fetch()
    for pitchin in pitch_ins:
        if pitchin.parts==parts:
            pitchin.img_url=imgUrl
            pitchin.put()
            return pitchin
    logging.error("No pitch-in with gsid={0}, uid={1}, parts={2}".format(gsid,uid,parts))
    return None

def add_name_to_pitchin(pitchin):
    """set pitchin's name, if empty, to that of the User who pitched in"""
    if pitchin['name'] == '':
        user = gs_user_core.get_user(pitchin['uid'])
        if user is not None:
            if user.name is None or user.name is '':
                gs_user_core.get_user_info(user)
                user.put()
            pitchin['name'] = user.name
    return pitchin


def get_pitch_in_dicts(gsid):
    """get pitch-in data: [{parts,note,gsid,timestamp,giftstart_url_title,name,img,uid}]"""
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).fetch(use_cache=False)
    pitch_in_dicts = [pi.ext_dictify() for pi in pitch_ins]

    named_pitch_ins = map(add_name_to_pitchin, pitch_in_dicts)

    return named_pitch_ins


def parts_available(parts, gsid):
    """
    Verify that none of these parts have been bought yet
    @param parts: parts of the giftstart
    @param gsid: giftstart ID
    @rtype: bool
    """
    pitchins = PitchIn.query(PitchIn.gsid == gsid).fetch()
    bought_parts = {part for pitchin in pitchins for part in pitchin.parts}
    return not any([part in bought_parts for part in parts])


def pitch_in(uid, gsid, parts, email_address, firstname, lastname, note, stripe_response, card_data,
             subscribe_to_mailing_list, save_this_card):
    """
    Process a pitch-in, charge & save card, send notifications
    @param uid: User ID
    @param gsid: relevant giftstart
    @param parts: parts of the giftstart that are covered by this pitchin
    @param email_address: email address of person pitching in
    @param note: public-facing note to put on card
    @param stripe_response: response from Stripe call
    @param card_data: credit card data (e.g., if using PayPal)
    @param subscribe_to_mailing_list: should the User be subscribed to the mailing list?
    @param save_this_card: should the Stripe card be saved for this User?
    @return: {result, purchased-parts|error|payment-error}
    """
    if(firstname == None or str(firstname).strip()==''):
        raise KeyError('firstname')
    if(lastname == None or str(lastname).strip()==''):
        raise KeyError('lastname')
    user = gs_user_core.save_email(uid, email_address)
    card_name = str(firstname).strip()+' '+str(lastname).strip()
    if user.name is None or str(user.name).strip() == '':
        user.name = card_name
        user.put()
    usr_img = user.cached_profile_image_url

    try:
        if subscribe_to_mailing_list:
            gs_user_core.subscribe_user_to_mailing_list(uid, email=email_address)
    except Exception, e:
        logging.error(e.message)

    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]

    lock = None

    try:

        lock = obtain_lock(giftstart, 15)

        if len(parts) < 1 or not parts_available(parts, gsid):
            return {'result': 'error', 'payment-error': 'One or more requested parts have '
                                                'already been bought.'}
        total_charge = calculate_total_price(giftstart, parts)

        desc = "GiftStarter #{0} parts {1}".format(gsid, str(parts))

        is_stripe = paypalapi.is_stripe()
        try:
            if is_stripe:
                if save_this_card:
                    customer, card = save_card_stripe(user, stripe_response['id'])
                    charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                                  customer=customer['id'],
                                                  card=card['id'], description=desc)
                else:
                    charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                                  card=stripe_response['id'],
                                                  description=desc)
            else:
                card_token = save_card_paypal_vault(user,card_data)
                try:
                    urlfetch.set_default_fetch_deadline(30)
                    payment = charge_card_paypal(user, total_charge, 'USD', card_token, desc)
                    if(not save_this_card):
                        delete_card_paypal_vault(card_token)
                except Exception as ex:
                    delete_card_paypal_vault(card_token)
                    raise ex
                finally:
                    urlfetch.set_default_fetch_deadline(None)

        except (CardError, InvalidRequestError, AuthenticationError,
                APIConnectionError, StripeError) as e:
            logging.error(e)
            return {'result': 'error', 'payment-error': e.json_body.error.message if e.json_body else e.message}

        # Make pitch in
        charge_id = charge['id'] if is_stripe else payment.id
        charge_amount = charge['amount'] if is_stripe else total_charge
        pi_key = ndb.Key('GiftStart', giftstart.giftstart_url_title,
                         'PitchIn', charge_id)
        card_last_four = stripe_response['card']['last4'] if is_stripe else payment.payer.funding_instruments[0].credit_card_token.last4
        charge_json = json.dumps(charge if is_stripe else payment.to_dict())
        pi = PitchIn(key=pi_key, uid=uid, gsid=gsid, note=note, parts=parts,
                     giftstart_url_title=giftstart.giftstart_url_title,
                     stripe_charge_id=charge_id if is_stripe else "",
                     paypal_charge_id="" if is_stripe else charge_id,
                     email=email_address,
                     stripe_charge_json=charge_json if is_stripe else "",
                     paypal_charge_json="" if is_stripe else charge_json,
                     last_four=card_last_four, img_url=usr_img,
                     name=card_name)
        pi.put()

        set_user_pitched_in(user)
        send_pitchin_notification(giftstart, charge_id, charge_amount,
                                  card_last_four, email_address,
                                  note, user.name, usr_img, uid)

        return {'result': 'success', 'purchased-parts': parts}

    except IOError as x:
        logging.error("IOError at pitch_in: {0}".format(x))
        return {'result': 'error', 'payment-error': "The payment timed out; please try again."}

    finally:
        if lock is not None:
            release_lock(lock)


def set_user_pitched_in(user):
    """update user.pitched_in"""
    if not user.has_pitched_in:
        user.has_pitched_in = True
        user.put()


def send_pitchin_notification(giftstart, charge_id, charge_amount_cents, last_four, email, note, name, usr_img, uid):
    """email a receipt to the user who pitched in, and a notification to the gift champion"""
    taskqueue.add(url="/giftstart/api", method="POST", payload=json.dumps(
        {'action': 'check-if-complete', 'gsid': giftstart.gsid}), countdown=30)

    # Send receipt
    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'pitchin_charge': '$' + str(charge_amount_cents/100.0),
        'pitchin_id': charge_id,
        'pitchin_last_four': last_four,
        'frame': 'base_frame',
        'product_img_url': giftstart.product_img_url,
        'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
    }

    data = json.dumps({'subject': "Thank You for Pitching In!",
                       'sender': "receipt@giftstarter.co", 'to': [email],
                       'template_name': "pitch_in_thank_you",
                       'mime_type': 'html',
                       'template_kwargs': email_kwargs})

    requests.put(config['email_url'], data=data)

    notify(uid,'Thank You for Pitching In on '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)

    # Notify giftstarter
    email_kwargs = {
        'campaign_name': giftstart.giftstart_title,
        'campaign_link': config['app_url'] + '/giftstart/' +
                         giftstart.giftstart_url_title,
        'note': note,
        'user_name': name if name else '',
        'user_img': usr_img,
        'frame': 'base_frame',
        'product_img_url': giftstart.product_img_url,
        'giftstart_it_url': gs_util_link.make_giftstart_it_url(giftstart),
    }

    if(uid!=giftstart.gift_champion_uid):

        data = json.dumps({'subject': "Someone Pitched In!",
                           'sender': "giftconcierge@giftstarter.co",
                           'to': [giftstart.gc_email],
                           'template_name': "gc_pitchin_notification",
                           'mime_type': 'html',
                           'template_kwargs': email_kwargs})

        requests.put(config['email_url'], data=data)

        notify(giftstart.gift_champion_uid,'Someone Pitched In on '+giftstart.giftstart_title, None, '/giftstart/'+giftstart.giftstart_url_title, giftstart.product_img_url)


def ensure_paypal_vault_id(user):
    if user.paypal_vault_payer_id is None:
        user.paypal_vault_payer_id = str(uuid.uuid1())
        user.put()

def delete_card_paypal_vault(card_token):
    try:
        paypalrestsdk.CreditCard.find(card_token).delete()
    except Exception:
        return

def save_card_paypal_vault(user, card_data):
    """
    attach the provided Credit Card to the given User, setting their Stripe ID if needed
    :param user: User
    :param card_data: Credit Card with number,cvc,expiry,zip
    @return: credit_card_id
    """
    ensure_paypal_vault_id(user)
    card_number = card_data['number']
    if(card_number==""):
        raise KeyError("number")
    card_expiry = card_data['expiry']
    if(card_expiry==""):
        raise KeyError("expiry")
    card_cvc = card_data['cvc']
    if(card_cvc==""):
        raise KeyError("cvc")
    card_struct = {"type": get_card_type(card_number), "number": card_number,
           "expire_month": str(int(card_expiry[:2])), "expire_year": card_expiry[-4:],
           "cvv2": card_cvc, "external_customer_id": user.paypal_vault_payer_id}
    credit_card = paypalrestsdk.CreditCard(card_struct)
    if credit_card.create():
        print("CreditCard[%s] created successfully" % (credit_card.id))
        return credit_card.id
    else:
        raise StripeError("{0} {1}".format(credit_card.error['details'][0]['field'],str(credit_card.error['details'][0]['issue']).lower()))

def charge_card_paypal(user, charge_amount_cents, currency, card_token, description):
    truncated_desc = False
    if len(description)>127:
        truncated_desc = description
        description = description[:126]
    ensure_paypal_vault_id(user)
    payment_struct = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card_token": {
                    "credit_card_id": card_token,
                    "payer_id":user.paypal_vault_payer_id}}]},
        "transactions": [{
            "amount": {
                "total": format(charge_amount_cents/100.0, '.2f'),
                "currency": currency},
            "description": description}]}
    payment = paypalrestsdk.Payment(payment_struct)
    if payment.create():
        if truncated_desc:
            logging.warn("Truncated description for payment [{0}] from: {1}".format(payment.id, truncated_desc))
        print("Payment[%s] created successfully" % (payment.id))
        return payment
    else:
        try:
            raise StripeError(str(payment.error['details'][0]['issue']))
        except KeyError:
            logging.error("payment.error at pay_core:charge_card_paypal {0}".format(payment.error))
            raise StripeError("Unable to complete your payment; your card might be invalid or expired.  Please try another card.")


def get_payment_data_for_transaction(transaction_id):
    return paypalrestsdk.Payment.find(transaction_id)

def get_card_type(cc_number):
    for type, regexp in CC_MAP.items():
        if regexp.match(str(cc_number)):
            return type
    raise StripeError("Unable to determine card type")

def save_card_stripe(user, stripe_response_id):
    """
    attach the provided Stripe Card to the given User, setting their Stripe ID if needed
    :param user: User
    :param stripe_response_id: id from response from Stripe call
    @return: (Stripe Customer, Card)
    """
    if user.stripe_id is None:
        # User does not have a stripe customer yet
        customer = stripe.Customer.create(
            card=stripe_response_id,
            description="user {0}".format(user.uid)
        )
        user.stripe_id = customer['id']
        user.put()
        card = customer['cards']['data'][0]
        card.refresh()
    else:
        # User has a stripe customer, add a card to it
        customer = stripe.Customer.retrieve(user.stripe_id)
        card = customer.cards.create(card=stripe_response_id)
        card.refresh()

    return customer, card


def get_card_by_fingerprint(fingerprint, user):
    """
    get the Stripe Customer & Card for a given User and Fingerprint
    @param fingerprint:Stripe card  fingerprint
    @param user: User
    @return: (Stripe Customer, Card)
    """
    result = None
    customer = stripe.Customer.retrieve(user.stripe_id)
    cards = customer.cards.all()
    for card in cards['data']:
        if card['fingerprint'] == fingerprint:
            result = card
            break
    return customer, result


def calculate_total_price(giftstart, parts):
    """
    find total cost of the selected parts, round down individual parts to the whole cent before summing (will result in total being a few pennies short, but unsurprised customers)
    :param giftstart:
    :param parts: array of parts numbers being purchased
    :return:
    """
    return len(parts) * int(giftstart.total_price / giftstart.overlay_rows / giftstart.overlay_columns)


def pay_with_fingerprint(fingerprint, uid, gsid, parts, note, subscribe_to_mailing_list):
    """
    Pay for a set of parts of a giftstart via a Stripe card fingerprint
    @param fingerprint: Stripe card fingerprint
    @param uid: user ID
    @param gsid: ID of giftstart
    @param parts: which parts of giftstart does this payment cover?
    @param note: user-facing note for pitch-in
    @param subscribe: (ignored)
    """
    user = ndb.Key('User', uid).get()
    card_name = user.name if user.name else ''

    giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]

    lock = None

    try:
        lock = obtain_lock(giftstart, 15)

        if len(parts) < 1 or not parts_available(parts, gsid):
            return {'result': 'error', 'payment-error': 'It looks like someone just bought that tile!  Please select another and try again.'}

        total_charge = calculate_total_price(giftstart, parts)
        desc = "GiftStarter #{0} parts {1}".format(gsid, ",".join(str(x) for x in parts))

        is_stripe = paypalapi.is_stripe()

        try:
            if is_stripe:
                customer, card = get_card_by_fingerprint(fingerprint, user)
                charge = stripe.Charge.create(amount=total_charge, currency='usd',
                                              card=card['id'], customer=customer,
                                              description=desc)
            else:
                card_token = fingerprint
                try:
                    urlfetch.set_default_fetch_deadline(30)
                    payment = charge_card_paypal(user, total_charge, 'USD', card_token, desc)
                finally:
                    urlfetch.set_default_fetch_deadline(None)
        except (CardError, InvalidRequestError, AuthenticationError,
                APIConnectionError, StripeError) as e:
            logging.error(e)
            return {'result': 'error', 'payment-error': e.json_body.error.message if e.json_body else e.message}


        # Make pitch in
        charge_id = charge['id'] if is_stripe else payment.id
        charge_amount = charge['amount'] if is_stripe else total_charge
        pi_key = ndb.Key('GiftStart', giftstart.giftstart_url_title,
                         'PitchIn', charge_id)
        card_last_four = card['last4'] if is_stripe else payment.payer.funding_instruments[0].credit_card_token.last4
        charge_json = json.dumps(charge if is_stripe else payment.to_dict())
        pi = PitchIn(key=pi_key, uid=uid, gsid=gsid, note=note, parts=parts,
                     giftstart_url_title=giftstart.giftstart_url_title,
                     stripe_charge_id=charge_id if is_stripe else "",
                     paypal_charge_id="" if is_stripe else charge_id,
                     email=user.email,
                     stripe_charge_json=charge_json if is_stripe else "",
                     paypal_charge_json="" if is_stripe else charge_json,
                     last_four=card_last_four,
                     img_url=user.cached_profile_image_url,
                     name=card_name)
        pi.put()

        set_user_pitched_in(user)

        send_pitchin_notification(giftstart, charge_id, charge_amount,
                                  card_last_four, user.email, note, user.name,
                                  user.cached_profile_image_url, uid)

        return {'result': 'success', 'purchased-parts': parts}

    except IOError as x:
        logging.error("IOError at pay_with_fingerprint: {0}".format(x))
        return {'result': 'error', 'payment-error': "The payment timed out; please try again."}

    finally:
        if lock is not None:
            release_lock(lock)

def extract_payment_amount_from_paypal_payment(payment):
    return int(float(payment['transactions'][0]['amount']['total']) * 100)


def get_charge_amount_for_pitchin(pitchin):
    """
    get the charge amount for a PitchIn
    :param pitchin: the PitchIn
    :return: amount transacted, in cents
    """
    if pitchin.paypal_charge_json and pitchin.paypal_charge_json!=None:
        try:
            return extract_payment_amount_from_paypal_payment(json.loads(pitchin.paypal_charge_json))
        except KeyError as x:
            logging.error("Unable to PitchIn.getChargeAmount for PayPal transaction: {0} {1} {2}".format(pitchin.giftstart_url_title, pitchin.parts, pitchin.paypal_charge_json))
            if pitchin.paypal_charge_json==pitchin.paypal_charge_id:
                logging.error("Repairing {0} {1}".format(pitchin.giftstart_url_title, pitchin.parts))
                try:
                    paypal_charge =  get_payment_data_for_transaction(pitchin.paypal_charge_id)
                    amount = extract_payment_amount_from_paypal_payment(paypal_charge)
                    pitchin.paypal_charge_json = json.dumps(paypal_charge.to_dict())
                    pitchin.put()
                    return amount
                except Exception as y:
                    logging.error("Unable to repair {0} {1}: {2}".format(pitchin.giftstart_url_title, pitchin.parts,y.message))
            return 0
    elif pitchin.stripe_charge_json and pitchin.stripe_charge_json!=None:
        try:
            return json.loads(pitchin.stripe_charge_json)['amount']
        except Exception as x:
            logging.error("Unable to PitchIn.getChargeAmount for Stripe transaction: {0} {1} {2}".format(pitchin.giftstart_url_title, pitchin.parts, pitchin.stripe_charge_json))
            return 0
    else:
        logging.error("Unable to PitchIn.getChargeAmount for unknown transaction: {0} {1}".format(pitchin.giftstart_url_title, pitchin.parts))
        return 0