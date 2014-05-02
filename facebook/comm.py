__author__ = 'stuart'

from . import GraphAPI


def send_notification(token, message, href):
    graph = GraphAPI(token)
    graph.put_object('me', 'notifications', {'href': href, 'template': message})

