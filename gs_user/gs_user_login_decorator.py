__author__ = 'Stuart'

from functools import wraps
import gs_user_core
import base64
import yaml
import json

config = yaml.load(open('config.yaml'))


def handle_login(method_handler):
    """ Handles authentication for a webapp2 RequestHandler, fulfilling OAuth
    flow and storing uid and token in cookies.
    """
    @wraps(method_handler)
    def wrapper(*args, **kwargs):
        self = args[0]
        query = {pair.split('=')[0]: pair.split('=', 1)[1]
                 for pair in self.request.query_string[2:].split('&')}
        state = json.loads(base64.b64decode(query.get('state', 'e30=')))

        referrer = state.get('referrer', '')
        staging_uuid = state.get('staging_uuid')
        redirect_url = config['app_url']
        if query.get('code'):
            # Handle googleplus login
            user = gs_user_core.login_googleplus_user(query['code'],
                                                      redirect_url, referrer)
            self.request.cookies['uid'] = user.uid
            self.request.cookies['token'] = user.googleplus_token_set\
                .access_token
            if staging_uuid:
                self.request.query_string += '&staging_uuid=' + staging_uuid
        elif self.request.get(''):
            # Handle twitter login
            pass
        elif self.request.get(''):
            # Handle FB login
            pass
        return method_handler(*args, **kwargs)
    return wrapper
