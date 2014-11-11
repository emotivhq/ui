__author__ = 'stuart'

import yaml
import jinja2
from giftstart import GiftStart
import gs_user
import os
import analytics
import abtest

secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))

DEPLOYED = not os.environ['SERVER_SOFTWARE'].startswith('Development') if \
    os.environ.get('SERVER_SOFTWARE') else False

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/jinja2/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
frame_template = JINJA_ENVIRONMENT.get_template('frame.html')


def render_app(request):
    analytics.store_if_referral(request)
    js_insert = remember_user(request.cookies, request.path + '?' +
                              request.query_string)
    js_insert += "Stripe.setPublishableKey('" + \
                 secrets['stripe_auth']['app_key'] + "');"
    js_insert += "window.fbAppId = '" + \
                 secrets['facebook_auth']['app_id'] + "';"
    js_insert += "window.googlePlusClientId = '" + \
                 secrets['googleplus_auth']['client_id'] + "';"
    js_insert += "angular.module('ngAB').value('spec', " + \
                 abtest.get_tests(request) + ");"

    response = frame_template.render({
        'facebook_app_id': config['facebook_app_id'],
        'facebook_app': config['facebook_app'],
        'deployed': DEPLOYED,
        'product_api_url': config['product_api_url'],
        'js_insert': js_insert,
        'image_url': request.path_url + '/assets/logo_square.png',
        'page_url': request.path_url,
        'googleanalytics_key': config['googleanalytics']['key'],
        'mixpanel_key': config['mixpanel']['key'],
        'heap_key': config['heap']['key'],
    })

    return response


def render_app_with_giftstart(request):
    analytics.store_if_referral(request)
    js_insert = remember_user(request.cookies, request.path + '?' +
                              request.query_string)
    js_insert += "Stripe.setPublishableKey('" + \
                 secrets['stripe_auth']['app_key'] + "');"
    js_insert += "window.fbAppId = '" + \
                 secrets['facebook_auth']['app_id'] + "';"
    js_insert += "window.googlePlusClientId = '" + \
                 secrets['googleplus_auth']['client_id'] + "';"
    js_insert += "angular.module('ngAB').value('spec', " + \
                 abtest.get_tests(request) + ");"

    if len(request.path.split('/')) > 2:
        title_url = request.path.split('/')[2]
        gss = GiftStart.query(GiftStart.giftstart_url_title == title_url) \
            .fetch()
        page_url = request.path_url + "/" + title_url
        if not gss[0].gift_champion_uid:
            gss = []
    else:
        gsid = request.get('gs-id')
        gss = GiftStart.query(GiftStart.gsid == gsid).fetch()
        page_url = request.path_url + "?gs-id=" + str(gsid)

    if len(gss) > 0:
        gs = gss[0]
        render_values = {
            'facebook_app_id': config['facebook_app_id'],
            'facebook_app': config['facebook_app'],
            'deployed': DEPLOYED,
            'product_api_url': config['product_api_url'],
            'js_insert': js_insert + 'var GIFTSTART = ' + gs.jsonify() + ';',
            'page_title': gs.giftstart_title,
            'page_url': page_url,
            'page_description': gs.giftstart_description,
            'image_url': gs.product_img_url.replace('https://', 'http://'),
            'secure_image_url': gs.product_img_url,
            'googleanalytics_key': config['googleanalytics']['key'],
            'mixpanel_key': config['mixpanel']['key'],
            'heap_key': config['heap']['key'],
        }
        response = frame_template.render(render_values)
    else:
        response = 'Error: 404<br>Resource not found!  Go to GiftStarter ' \
                   'homepage via ' \
                   '<a href="http://giftstarter.co">this link</a>.'

    return response


def remember_user(cookies, path):
    js_insert = ''
    if 'uid' in cookies:
        # Strip url encoded double quotes
        uid = cookies['uid'].replace('%22', '')
        token = cookies['token'].replace('%22', '')
        user_deets = gs_user.validate(uid, token, path)
        if user_deets:
            js_insert = "window.loginDeets = ['{uid}', '{img_url}', " \
                        "'{token}', '{on_mailing_list}', '{name}', " \
                        "'{has_pitched_in}'];".format(**user_deets)
    return js_insert
