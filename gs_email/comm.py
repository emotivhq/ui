__author__ = 'stuart'

from email.mime.text import MIMEText
import base64
from requests_oauthlib import OAuth2Session
import yaml
import json
from gs_user import User
import jinja2
import HTMLParser

CLIENT_ID = yaml.load(open('secret.yaml'))['googleplus_auth']['client_id']
CLIENT_SECRET = yaml.load(open('secret.yaml'))['googleplus_auth']['client_secret']
REDIRECT_URI = 'postmessage'

OAUTH_SCOPE = 'https://www.googleapis.com/auth/gmail.modify'
TEAM_EMAIL_UID = '109778157391058071254'
BASE_URL = 'https://www.googleapis.com/gmail/v1/users/{uid}/messages/send'.format(uid='me')

REFRESH_URL = 'https://accounts.google.com/o/oauth2/token'
REFRESH_EXTRAS = {'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET}

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./gs_email/templates/email/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
email_templates = {
    'pitch_in_thank_you': JINJA_ENVIRONMENT.get_template("pitch_in_thank_you.html"),
    'campaign_complete_user_not_funded': JINJA_ENVIRONMENT.get_template("campaign_complete_user_not_funded.html"),
    'campaign_complete_user_funded': JINJA_ENVIRONMENT.get_template("campaign_complete_user_funded.html"),
    'campaign_complete_team_not_funded': JINJA_ENVIRONMENT.get_template("campaign_complete_team_not_funded.html"),
    'campaign_complete_team_funded': JINJA_ENVIRONMENT.get_template("campaign_complete_team_funded.html"),
    'campaign_create_team': JINJA_ENVIRONMENT.get_template("campaign_create_team.html"),
    'campaign_create_user': JINJA_ENVIRONMENT.get_template("campaign_create_user.html"),
}


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
    team_user = User.query(User.uid == 'g'+TEAM_EMAIL_UID).fetch(1)[0]
    team_token_set = team_user.googleplus_token_set
    response = _post_with_refresh(BASE_URL, team_token_set, data=str_params)
    print(response.content)


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
    msg = HTMLParser.HTMLParser().unescape(message_text).encode('utf-8', 'ignore')
    print(msg)
    message = MIMEText(msg, 'plain')
    message['to'] = to
    message['from'] = 'team@giftstarter.co'
    message['subject'] = subject
    return {'raw': base64.b64encode(message.as_string()).replace('+', '-').replace('/', '_')}


def send(subject, message, sender_email, receivers):
    if isinstance(receivers, list):
        messages = [create_message(sender_email, recipient, subject, message) for recipient in receivers]
    else:
        messages = [create_message(sender_email, receivers, subject, message)]
    map(send_gmail, messages)


def send_from_template(subject, template_name, template_kwargs, sender, to):
    if template_name not in email_templates:
        raise Exception("Ivalid template name: {tname}\nValid template names:\n{valid_names}".format(**{
            'tname': template_name,
            'valid_names': '\n'.join(email_templates.keys())
        }))

    if not isinstance(template_kwargs, dict):
        e = "template_kwargs should be an instance of dict, was type {etype}".format(etype=str(type(template_kwargs)))
        raise Exception(e)

    message_text = email_templates[template_name].render(template_kwargs)
    send(subject, message_text, sender, to)