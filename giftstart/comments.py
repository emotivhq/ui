__author__ = 'stuart'

from pay import PitchIn


def get_comments(gsid):
    pitch_ins = PitchIn.query(PitchIn.gsid == gsid).order(-PitchIn.timestamp).fetch()
    comments = [{'message': pi.note, 'uid': pi.uid, 'timestamp': pi.timestamp.strftime("%s"),
                 'img': 'http://storage.googleapis.com/giftstarter-pictures/u/' + pi.uid + '.jpg'} for pi in pitch_ins]
    return comments