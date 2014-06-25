__author__ = 'stuart'

from . import GraphAPI


def get_uid(auth_token):
    graph = GraphAPI(auth_token)
    fb_usr = graph.get_object('me')
    print(fb_usr)
    return fb_usr['id']