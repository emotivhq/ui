__author__ = 'stuart'

from giftstart import GiftStart
from pay.PitchIn import PitchIn
from gs_user import User


def filter_giftstarts(uid, giftstarts):
    """ Returns a dict with giftstart dicts the user has created
    :param uid: user's uid
    :param giftstarts: giftstarts to be filtered
    :return: list of [{gs}, {gs}, ...]
    """
    return [gs.dictify() for gs in giftstarts if gs.gift_champion_uid == uid]


def filter_pitchins(uid, pitchins):
    """ Returns a dict wit pitchin dicts the user has created
    :param uid: user's uid
    :param pitchins: pitchins to be filtered
    :return: list of [{pi}, {pi}, ...]
    """
    return [pi.ext_dictify() for pi in pitchins if pi.uid == uid]


def get_stats(uids):
    """
    :param uids: List of uids for which to fetch stats
    :return: dicts of stats of the following structure

    {'f1234': {'giftstarts': [{giftstart_data}, ...],
               'pitchins': [{pitchin_data}, ...],
               'name': 'flomae'},
     't1234': {...}
    }
    """
    # Handle singular uid also
    uids = uids if type(uids) == list else [uids]

    users = User.query(User.uid.IN(uids)).fetch()
    pitchins = PitchIn.query(PitchIn.uid.IN(uids)).fetch()
    giftstarts = GiftStart.query(GiftStart.gift_champion_uid.IN(uids)).fetch()

    return {user.uid: {'name': user.name,
                       'pitchins': filter_pitchins(user.uid, pitchins),
                       'giftstarts': filter_giftstarts(user.uid, giftstarts)}
            for user in users}
