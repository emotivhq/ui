""" Handle payment requests and serve pitchin data for giftstarts via JSON POST"""
__author__ = 'GiftStarter'

import webapp2
from google.appengine.ext import ndb
from pay import pay_core
import json
import yaml
import stripe
import logging
from storage import image_cache
import base64
import uuid


stripe.api_key = yaml.load(open('secret.yaml'))['stripe_auth']['app_secret']


class PayHandler(webapp2.RequestHandler):
    """ Handle payment requests and serve pitchin data for giftstarts via JSON POST"""

    @ndb.toplevel
    def post(self):
        data = json.loads(self.request.body)

        if data['action'] == 'pitch-in':
            payment = data['payment']
            if data.get('fingerprint'):
                result = pay_core.pay_with_fingerprint(data.get('fingerprint'),
                                                       data['uid'],
                                                       payment['gsid'],
                                                       payment['parts'],
                                                       payment['note'],
                                                       payment['subscribe'],)
            else:
                result = pay_core.pitch_in(data['uid'], payment['gsid'],
                                           payment['parts'],
                                           payment['emailAddress'],
                                           payment['note'],
                                           payment['stripeResponse'],
                                           payment['subscribe'],
                                           payment.get('saveCreditCard', False))
                if 'error' in result.keys():
                    self.response.set_status(400)
            self.response.write(json.dumps(result))

        elif data['action'] == 'pitch-in-note-update':
            payment = data['payment']
            logging.info("setting note for "+payment['gsid'])
            result = pay_core.set_note_for_pitchin(data['uid'], payment['gsid'],
                                       payment['parts'], payment['note'])
            self.response.write(json.dumps(result if result is None else result))

        elif data['action'] == 'pitch-in-img-update':
            payment = data['payment']
            imgUrl = data['imgurl']
            logging.info("setting image for "+payment['gsid'])
            result = pay_core.set_img_for_pitchin(data['uid'], payment['gsid'],
                                       payment['parts'], imgUrl)
            self.response.write(json.dumps(result if result is None else result.ext_dictify()))

        elif data['action'] == 'pitch-in-img-upload':
            content_type = data['contenttype'].split('/')
            if content_type[0] != 'image':
                logging.warning("Received image upload that was not image")
                self.response.set_status(400, 'Invalid content-type {0}, must be '
                                              'image'.format(content_type[0]))
            elif content_type[1] != 'jpeg' and \
                            content_type[1] != 'jpg' and \
                            content_type[1] != 'png':
                logging.warning("Received profile image upload with invalid "
                                "content type")
                self.response.set_status(400, 'Invalid image encoding, only jpg '
                                              'and png are acceptable')
            else:
                try:
                    image_data = data['imgdata'].split('base64,')[1]
                    extension = image_cache.extract_extension_from_content(
                        base64.b64decode(image_data))
                    base64data = ','.join(data['imgdata'].split(',')[1:])
                    img_data = base64data.decode('base64', 'strict')
                    fname = str(uuid.uuid4())
                    updated = image_cache.save_picture_to_gcs(fname + extension,
                                                              'u/', img_data)
                    logging.info("saved image to "+updated)
                    self.response.write(updated)
                except TypeError as e:
                    logging.error(e)
                    logging.warning("Received profile image with invalid data")
                    self.response.set_status(400, "Invalid image data")

        elif data['action'] == 'get-pitch-ins':
            pitchin_dicts = pay_core.get_pitch_in_dicts(data['gsid'])
            self.response.write(json.dumps(pitchin_dicts))


api = webapp2.WSGIApplication(
    [('/pay', PayHandler),
     ], debug=True)
