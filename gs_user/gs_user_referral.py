"""a record of how the user was referred (channel,type,id); used as a temp object to populate user.referrer_*"""
__author__ = 'GiftStarter'


class UserReferral:

    def __init__(self, channel, rtype, uid, uuid):
        self.channel = channel
        self.type = rtype
        self.uid = uid
        self.uuid = uuid

    @staticmethod
    def from_dict(referral_dict):
        return UserReferral(referral_dict.get('channel'),
                            referral_dict.get('type'),
                            referral_dict.get('uid'),
                            referral_dict.get('uuid'),)
