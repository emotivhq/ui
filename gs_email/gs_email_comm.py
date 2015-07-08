"""send raw emails, and emails from jinja2 templates, using mandrill"""
__author__ = 'GiftStarter'

import requests
import json
import yaml
import jinja2
import os
import logging

secrets = yaml.load(open('secret.yaml'))


ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(ROOT_DIR + "/templates/email/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
EMAIL_TEMPLATES = {
    'welcome_user': JINJA_ENVIRONMENT.get_template(
        "welcome_user.html"),
    'welcome_user_nudge1': JINJA_ENVIRONMENT.get_template(
        "welcome_user_nudge1.html"),
    'pitch_in_thank_you': JINJA_ENVIRONMENT.get_template(
        "pitch_in_thank_you.html"),
    'campaign_complete_user_not_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_user_not_funded.html"),
    'campaign_complete_user_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_user_funded.html"),
    'campaign_complete_giver_not_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_giver_not_funded.html"),
    'campaign_complete_giver_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_giver_funded.html"),
    'campaign_complete_team_not_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_team_not_funded.html"),
    'campaign_complete_team_funded': JINJA_ENVIRONMENT.get_template(
        "campaign_complete_team_funded.html"),
    'campaign_create_team': JINJA_ENVIRONMENT.get_template(
        "campaign_create_team.html"),
    'campaign_create_user': JINJA_ENVIRONMENT.get_template(
        "campaign_create_user.html"),
    'campaign_share_email': JINJA_ENVIRONMENT.get_template(
        "campaign_share_email.html"),
    'contact_us': JINJA_ENVIRONMENT.get_template(
        "contact_us.html"),
    'thank_you_notification': JINJA_ENVIRONMENT.get_template(
        "thank_you_notification.html"),
    "gc_pitchin_notification": JINJA_ENVIRONMENT.get_template(
        "gc_pitchin_notification.html"),
    "emaillogin_reset": JINJA_ENVIRONMENT.get_template(
        "emaillogin_reset.html"),
    "base_frame": JINJA_ENVIRONMENT.get_template(
        "base_frame.html"),
    "campaign_ending_1_day_giver": JINJA_ENVIRONMENT.get_template(
        "campaign_ending_1_day_giver.html"),
    "campaign_ending_1_day_user": JINJA_ENVIRONMENT.get_template(
        "campaign_ending_1_day_user.html"),
    "campaign_complete_user_zero_funding": JINJA_ENVIRONMENT.get_template(
        "campaign_complete_user_zero_funding.html"),
    "recipient_thankyou_notification": JINJA_ENVIRONMENT.get_template(
        "recipient_thankyou_notification.html"),
}
"""map of all named templates to their html files"""


def send(subject, body, sender, to, cc=None, bcc=None, mime_type='plain',
         img_url=None):
    """ send('subject', 'message', 'bob@ex.com', 'joe@y.com') -> None
    Sends an email from giftstarter to someone with a reply-to to someone else
    """
    if isinstance(to, list):
        for recip in to:
            send_mandrill(sender, recip, subject, body, cc, bcc, mime_type, img_url)
    else:
        send_mandrill(sender, to, subject, body, cc, bcc, mime_type, img_url)


def send_mandrill(sender, to, subject, message_text, cc=None, bcc=None,
                  mime_type='plain', img_url=None):
    """send_mandrill('subject', 'message', 'bob@ex.com', 'joe@y.com') -> None
    Sends an email from giftstarter to someone with a reply-to to someone else
    ... With mandrill
    """
    url = 'https://mandrillapp.com/api/1.0/messages/send.json'
    message_data = {
        'key': secrets['mandrill_auth']['key'],
        'message': {
            'subject': subject,
            'from_name': 'GiftStarter Concierge',
            'from_email': 'giftconcierge@giftstarter.com',
            'to': [
                {'email': to, 'type': 'to'},
            ],
            'signing_domain': 'giftstarter.com',
            'track_opens': True,
            'images': [],
            'headers': {
                'Reply-To': sender,
            },
        }
    }
    if cc:
        for addr in cc:
            message_data['message']['to'].append({'email': addr, 'type': 'cc'})
    if bcc:
        for addr in bcc:
            message_data['message']['to'].append({'email': addr,
                                                  'type': 'bcc'})
    if mime_type.lower() == "html":
        message_data['message']['html'] = message_text
    else:
        message_data['message']['text'] = message_text

    requests.post(url, data=json.dumps(message_data))


def send_from_template(subject, template_name, template_kwargs, sender, to,
                       cc=None, bcc=None, mime_type='plain', img_url=None):
    """
    fill in the specified template with a set of params, and send it as an email
    @param subject: email subject
    @param template_name: name of template from EMAIL_TEMPLATES
    @param template_kwargs: map of params to fill in template
    @param sender: email REPLYTO
    @param to: email TO
    @param cc: email CC
    @param bcc: email BCC
    @param mime_type: plain or html
    """
    if template_name not in EMAIL_TEMPLATES:
        raise Exception("Ivalid template name: {tname}\n"
                        "Valid template names:\n{valid_names}".format(**{
            'tname': template_name,
            'valid_names': '\n'.join(EMAIL_TEMPLATES.keys())
        }))

    if not isinstance(template_kwargs, dict):
        e = "template_kwargs should be an instance of dict, " \
            "was type {etype}".format(etype=str(type(template_kwargs)))
        raise Exception(e)

    message_text = EMAIL_TEMPLATES[template_name].render(template_kwargs)

    if 'frame' in template_kwargs.keys():
        try:
            frame_template = EMAIL_TEMPLATES[template_kwargs['frame']]
            message_text = frame_template.render({'body': message_text})
        except:
            logging.error("Failed when framing email")

    send(subject, message_text, sender, to, cc=cc, bcc=bcc,
         mime_type=mime_type, img_url=img_url)
