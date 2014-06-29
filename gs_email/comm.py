__author__ = 'stuart'

from email.mime.text import MIMEText
import base64
from requests_oauthlib import OAuth2Session
import yaml
import json
from gs_user import User

CLIENT_ID = yaml.load(open('secret.yaml'))['googleplus_auth']['client_id']
CLIENT_SECRET = yaml.load(open('secret.yaml'))['googleplus_auth']['client_secret']
REDIRECT_URI = 'postmessage'

OAUTH_SCOPE = 'https://www.googleapis.com/auth/gmail.modify'
TEAM_EMAIL_UID = '109778157391058071254'
BASE_URL = 'https://www.googleapis.com/gmail/v1/users/{uid}/messages/send'.format(uid='me')

REFRESH_URL = 'https://accounts.google.com/o/oauth2/token'
REFRESH_EXTRAS = {'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET}

TEAM_USER = User.query(User.uid == 'g'+TEAM_EMAIL_UID).fetch(1)[0]
TEAM_TOKEN_SET = TEAM_USER.googleplus_token_set


def _post_with_refresh(url, token_set, data):
    headers = {'Content-Type': 'application/json'}
    if token_set.refresh_token:
        oauth = OAuth2Session(CLIENT_ID, token=token_set.to_token(), auto_refresh_url=REFRESH_URL,
                              auto_refresh_kwargs=REFRESH_EXTRAS, token_updater=token_saver)
    else:
        oauth = OAuth2Session(CLIENT_ID, token=token_set.to_token())
    return oauth.post(url, data=data, headers=headers)


def token_saver(token):
    pass


def send_gmail(message):
    params = {'raw': message['raw']}
    str_params = json.dumps(params)
    response = _post_with_refresh(BASE_URL, TEAM_TOKEN_SET, data=str_params)


def create_message(sender, to, subject, message_text):
    """Create a message for an email.

    Args:
      sender: Email address of the sender.
      to: Email address of the receiver.
      subject: The subject of the email message.
      message_text: The text of the email message.

    Returns:
      An object containing a base64 encoded email object.
    """
    message = MIMEText(message_text)
    message['to'] = to
    message['from'] = 'team@giftstarter.co'
    message['subject'] = subject
    print(message.as_string())
    print(message.as_string())
    return {'raw': base64.b64encode(message.as_string())}


def send(subject, message, sender_name, sender_email, receivers):
    if isinstance(receivers, list):
        messages = [create_message(sender_email, recipient, subject, message) for recipient in receivers]
    else:
        messages = [create_message(sender_email, receivers, subject, message)]
    map(send_gmail, messages)

