"""primary rendering routines for app homepage and extant giftstarts"""
__author__ = 'GiftStarter'

import yaml
import jinja2
from giftstart import GiftStart
import gs_user
import os
import analytics
import abtest
import urllib

secrets = yaml.load(open('secret.yaml'))
config = yaml.load(open('config.yaml'))
	
"""
   @fedora - This is a WIP Oct 15 to automate deployments to Nth # of environments
             starting with dev & prod. If failing, comment out
   ---
"""

if os.environ['RUNTIME_ENV'].startswith('production'):
	secrets = yaml.load(open('secret.production.yaml'))
	config = yaml.load(open('config.production.yaml'))
elif os.environ['RUNTIME_ENV'].startswith('development'): 
	secrets = yaml.load(open('secret.development.yaml'))
	config = yaml.load(open('config.development.yaml'))


DEPLOYED = not os.environ['SERVER_SOFTWARE'].startswith('Development') if \
    os.environ.get('SERVER_SOFTWARE') else False

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./client/templates/webapp/"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)
frame_template = JINJA_ENVIRONMENT.get_template('index.html')


def render_app(request):
    """render primary page container and content"""
    hide_header = False
    hide_body = request.path == '/header'
    hide_footer = request.path == '/header'

    analytics.store_if_referral(request)
    js_insert = remember_user(request.cookies, request.path + '?' +
                              request.query_string)
    # js_insert += "try{Stripe.setPublishableKey('" + \
    #              secrets['stripe_auth']['app_key'] + "');}catch(err_stripe){console&&console.log&&console.log(err_stripe);}"
    js_insert += "window.fbAppId = '" + \
                 secrets['facebook_auth']['app_id'] + "';"
    js_insert += "window.googlePlusClientId = '" + \
                 secrets['googleplus_auth']['client_id'] + "';"
    js_insert += "window.linkedInClientId = '" + \
                 secrets['linkedin_auth']['client_id'] + "';"
    js_insert += "angular.module('ngAB').value('spec', " + \
                 abtest.get_tests(request) + ");"

    page_titles = {
        '/': 'GiftStarter: GiftStarter, Group Gifting Starts Here',
        '/about': 'Meet the GiftStarter Team and our Mission',
        '/faq': 'GiftStarter: Learn how to easily group gift with friends and family',
        '/giftideas': 'GiftStarter: Find the Perfect Group Gift with our Gift Ideas',
        '/partners': 'GiftStarter: Social Commerce for brands',
        '/concierge': 'Gift Concierge: Your Personal Gift Shopper and Services',
        '/howitworks': 'GiftStarter 101: Gift any Product or service, to anyone, with anyone',
        '/terms': "GiftStarter's Terms of Use",
        '/privacy': "GiftStarter's Privacy Policy",
        '/press': 'GiftStarter in the news: see what the buzz is about'
    }
    page_descriptions = {
        '/': 'Group Gifts: GiftStarter divides the perfect gift into pieces; giving friends and family the ability to purchase 1 or more pieces as they wish.',
        '/about': 'GiftStarter is a Seattle based start-up intent on changing the way people give gifts by making it easy to group gift anything.',
        '/faq': 'Giving group gifts with GiftStarter is easy, but in case you have any questions, find out more here',
        '/giftideas': "Office, Weddings, baby, birthdays, any occasion - find the perfect gift, share it with friends & family so they can pitch in, and we'll take care of shipping it, including a handmade card.",
        '/partners': 'Partner with GiftStarter, the best group gifting service for brands. Our seamless social commerce platform uses patent-pending technology to give your customers a better way to gift, together.',
        '/concierge': 'Gift Concierge provides fast and friendly for all of your gifting needs to make your group gift campaign a success.',
        '/howitworks': "GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it, and we help you with the rest. You don't have to collect the money or chase people down for cash.",
        '/terms': "GiftStarter's mission is to provide the #1 online gifting experience service. GiftStarter.com websites exist for the purpose of providing a personal gifting experience with one or more people together.",
        '/privacy': 'This page sets forth the Privacy Policy for the website at GiftStarter.com - we take the responsibility of having your personal information very seriously.',
        '/press': "GiftStarter has been fortunate enough to be featured by some of the most prestigious media outlets in the world. See what all of the gifting buzz is about."
    }
    try:
        page_title = page_titles[request.path]
    except KeyError:
        page_title = page_titles['/']
    try:
        page_description = page_descriptions[request.path]
    except KeyError:
        page_description = page_descriptions['/']

    response = frame_template.render({
        'facebook_app_id': config['facebook_app_id'],
        'facebook_app': config['facebook_app'],
        'deployed': DEPLOYED,
        'product_api_url': config['product_api_url'],
        'js_insert': js_insert,
        'image_url': request.path_url + '/assets/logo_square.png',
        'page_url': request.path_url,
        'page_title': page_title,
        'page_description': page_description,
        'googleanalytics_key': config['googleanalytics']['key'],
        'mixpanel_key': config['mixpanel']['key'],
        'heap_key': config['heap']['key'],
        'hide_header': hide_header,
        'hide_body': hide_body,
        'hide_footer': hide_footer,
    })

    return response


def render_app_with_giftstart(request):
    """retrieve campaign data and render campaign page"""
    analytics.store_if_referral(request)
    js_insert = remember_user(request.cookies, request.path + '?' +
                              request.query_string)
    # js_insert += "try{Stripe.setPublishableKey('" + \
    #              secrets['stripe_auth']['app_key'] + "');}catch(err_stripe){console&&console.log&&console.log(err_stripe);}"
    js_insert += "window.fbAppId = '" + \
                 secrets['facebook_auth']['app_id'] + "';"
    js_insert += "window.googlePlusClientId = '" + \
                 secrets['googleplus_auth']['client_id'] + "';"
    js_insert += "window.linkedInClientId = '" + \
                 secrets['linkedin_auth']['client_id'] + "';"
    js_insert += "angular.module('ngAB').value('spec', " + \
                 abtest.get_tests(request) + ");"

    if len(request.path.split('/')) > 2:
        title_url = request.path.split('/')[2]
        gss = GiftStart.query(GiftStart.giftstart_url_title == title_url) \
            .fetch()
        page_url = request.path_url + "/" + title_url
        if len(gss) > 0:
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
            'page_title': gs.giftstart_title + ' - GiftStarter',
            'page_url': page_url,
            'page_description': gs.giftstart_description,
            'image_url': gs.product_img_url.replace('https://', 'http://'),
            'secure_image_url': gs.product_img_url,
            'googleanalytics_key': config['googleanalytics']['key'],
            'mixpanel_key': config['mixpanel']['key'],
            'heap_key': config['heap']['key'],
            'hide_header': False,
            'hide_body': False,
            'hide_footer': False,
        }
        response = frame_template.render(render_values)
    else:
        response = 'Error: 404<br>Resource not found!  Go to GiftStarter ' \
                   'homepage via ' \
                   '<a href="http://giftstarter.com">this link</a>.'

    return response


def remember_user(cookies, path):
    """extract user id from cookie, provide javascript to inject user info (loginDeets) into page"""
    js_insert = ''
    if 'uid' in cookies and 'token' in cookies:
        # Strip url encoded double quotes
        uid = urllib.unquote(cookies['uid'].replace('%22', ''))
        token = urllib.unquote(cookies['token'].replace('%22', ''))
        if len(uid)>0:
            user_deets = gs_user.validate(uid, token, path)
            if user_deets:
                js_insert = "window.loginDeets = ['{uid}', '{img_url}', " \
                            "'{token}', '{on_mailing_list}', '{name}', " \
                            "'{has_pitched_in}'];".format(**user_deets)
                js_insert += " analytics.identify('{uid}', {{" \
							 "name: '{name}', " \
							 "email: '{token}'" \
							 "}});".format(**user_deets)
                # Disabled for now since GA is injected with GTM, this throws an error
                # js_insert += " ga('set', '&uid', '{uid}');".format(**user_deets)
    return js_insert
