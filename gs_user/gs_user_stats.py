"""provide stats about User: list their campaigns and pitchins"""
__author__ = 'GiftStarter'

from giftstart import GiftStart
from pay.PitchIn import PitchIn
from google.appengine.ext import ndb
import logging


def filter_giftstarts(uid, giftstarts):
    """ Returns a dict with giftstart dicts the user has created
    @param uid: user's uid
    @param giftstarts: giftstarts to be filtered
    @return: list of [{gs}, {gs}, ...]
    """
    return [gs.dictify() for gs in giftstarts if gs.gift_champion_uid == uid]


def filter_pitchins(uid, pitchins):
    """ Returns a dict wit pitchin dicts the user has created
    @param uid: user's uid
    @param pitchins: pitchins to be filtered
    @return: list of [{pi}, {pi}, ...]
    """
    return [pi.ext_dictify() for pi in pitchins if pi.uid == uid]


def pitchin_attach_title_and_img(pitchin_dict, giftstarts):
    gsid = pitchin_dict.get('gsid')
    found_gs = filter(lambda g: g is not None and g.gsid == gsid, giftstarts)
    if(len(found_gs)==0):
        logging.error("No matching GS found for GSID {0} at pitchin_attach_title_and_img".format(gsid))
        title = '(campaign title missing)'
        img = ''
    else:
        title = found_gs[0].giftstart_title
        img = found_gs[0].product_img_url.replace('https://', 'http://')
    return dict(pitchin_dict.items() + [('gs_title', title)] + [('gs_img', img)])


def get_stats(uids):
    """
    @param uids: List of uids for which to fetch stats
    @return: dicts of stats of the following structure

    {'f1234': {'giftstarts': [{giftstart_data}, ...],
               'pitchins': [{pitchin_data}, ...],
               'name': 'flomae'},
     't1234': {...}
    }
    """
    # Handle singular uid also
    uids = uids if type(uids) == list else [uids]

    users = ndb.get_multi([ndb.Key('User', uid) for uid in uids])
    pitchins = PitchIn.query(PitchIn.uid.IN(uids)).order(-PitchIn.timestamp).fetch()

    parent_giftstarts = ndb.get_multi([pi.key.parent()
                                       for pi in pitchins
                                       if pi.key.parent()])
    giftstarts = GiftStart.query(GiftStart.gift_champion_uid.IN(uids)).order(-GiftStart.deadline).fetch()

    stats = {user.uid: {'name': user.name,
                        'img_url': user.cached_profile_image_url,
                        'email': user.email,
                        'pitchins':
                            [pitchin_attach_title_and_img(pi, parent_giftstarts)
                             for pi in filter_pitchins(user.uid, pitchins)],
                        'giftstarts': filter_giftstarts(user.uid, giftstarts)}
             for user in users}

    return stats
