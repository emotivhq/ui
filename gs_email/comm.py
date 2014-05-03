__author__ = 'stuart'

from google.appengine.api import mail


def send(subject, message, sender_name, sender_email, receivers):
    if isinstance(receivers, list):
        for recipient in receivers:
            email = mail.EmailMessage(sender="%s <%s>" % (sender_name, sender_email), subject=subject, body=message,
                                      to=recipient)
            email.send()
    else:
        email = mail.EmailMessage(sender="%s <%s>" % (sender_name, sender_email), subject=subject, body=message,
                                  to=receivers)
        email.send()

