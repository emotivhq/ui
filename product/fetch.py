__author__ = 'stuart'

import requests
from lxml import html
import json


def get_element_text(element, xpath):
    tree = element.xpath(xpath)
    result = [leaf.text.strip() for leaf in tree] if len(tree) > 0 else [None]
    return result


def get_element_attr(element, xpath, attr):
    tree = element.xpath(xpath)
    result = [leaf.get(attr) for leaf in tree] if len(tree) > 0 else [None]
    return result


def fetch_product(data):
    url = data['url']
    price = data['price']

    headers = {'User-agent': "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"}
    page = requests.get(url, headers=headers).text

    tree = html.fromstring(page)

    canonical_url = get_element_attr(tree, '//link[@rel="canonical"]', 'href')
    if len(canonical_url) > 0:
        print(canonical_url)
        if canonical_url[:4] == 'http':
            page = requests.get(canonical_url, headers=headers).text
            tree = html.fromstring(page)

    title = get_element_attr(tree, '//meta[@property="og:title"]', 'content')[0]
    desc = get_element_attr(tree, '//meta[@property="og:description"]', 'content')[0]
    img = get_element_attr(tree, '//meta[@property="og:image"]', 'content')[0]

    return json.dumps({'product': {
        'link': url,
        'img': img,
        'title': title,
        'price': price,
        'description': desc,
        }})