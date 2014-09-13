""" Renders card for convenient printing!
"""

__author__ = 'stuart'

import webapp2
import jinja2
from giftstart import GiftStart
from pay.PitchIn import PitchIn
from gs_user import User


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/jinja2/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
card_template = JINJA_ENVIRONMENT.get_template('card.html')


def make_givers(pitchins):
    givers = []
    for pi in pitchins:
        givers.append({
            'uid': pi.uid,
            'img_url': pi.img_url,
            'comment': pi.note,
            'name': pi.name,
            'no_comment': not bool(pi.note),
        })
    return givers


def make_gc(giftstart):
    gc_user = User.query(User.uid == giftstart.gift_champion_uid).fetch(1)[0]

    return {
        'uid': giftstart.gift_champion_uid,
        'img_url': gc_user.cached_profile_image_url,
        'comment': '',
        'name': giftstart.gc_name,
        'no_comment': True,
    }


def make_parts(giftstart, pitchins):

    def get_pitchin_img(pis, partno):
        """ Returns img url for purchased part or '' for non purchased """
        for pi in pis:
            if partno in pi.parts:
                return pi.img_url
        return ''

    parts = []
    for i in range(giftstart.overlay_rows * giftstart.overlay_columns):
        img = get_pitchin_img(pitchins, i)
        parts.append(img)
    return parts


class CardHandler(webapp2.RequestHandler):

    def get(self):
        gsid = self.request.get('gs-id')
        giftstart = GiftStart.query(GiftStart.gsid == gsid).fetch(1)[0]
        pitchins = PitchIn.query(PitchIn.gsid == gsid).fetch()

        gc = make_gc(giftstart)
        givers = make_givers(pitchins)
        parts = make_parts(giftstart, pitchins)

        for giver in givers:
            if giver['uid'] == gc['uid']:
                gc['comment'] = giver['comment']
                gc['no_comment'] = not bool(gc['comment'])
                givers.remove(giver)
                break

        part_height = str(100.0 / giftstart.overlay_rows) + '%'
        part_width = str(100.0 / giftstart.overlay_columns) + '%'

        self.response.write(card_template.render({
            'givers': givers,
            'gc': gc,
            'part_height': part_height,
            'part_width': part_width,
            'parts': parts,
            'product_name': giftstart.product_title,
            'product_img_url': giftstart.product_img_url,
            'giftstart_url': self.request.host_url + '/giftstart?gs-id=' + gsid
        }))

handler = webapp2.WSGIApplication([('/card', CardHandler)], debug=True)