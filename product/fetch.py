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


def get_all_imgs(tree, siteurl):
    imgs = filter(lambda img: img[-3:] != 'gif',
                  filter(lambda img: img != None, get_element_attr(tree, '//img', 'src')))
    for i in range(len(imgs)):
        if imgs[i][:4].lower() != 'http':
            imgs[i] = siteurl + imgs[i]

    return imgs


def get_base_url(url):
    out = ""
    slash_count = 0
    for char in url:
        if char == '/':
            slash_count += 1
        out += char
        if slash_count >= 3:
            break
    return out


def fetch_product(data):
    url = data['url']

    headers = {'User-agent': "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"}
    page = requests.get(url, headers=headers).text

    tree = html.fromstring(page)

    canonical_url = get_element_attr(tree, '//link[@rel="canonical"]', 'href')
    if len(canonical_url) > 0:
        print(canonical_url)
        if canonical_url[:4] == 'http':
            page = requests.get(canonical_url, headers=headers).text
            tree = html.fromstring(page)

    imgs = [get_element_attr(tree, '//meta[@property="og:image"]', 'content')[0]] + \
        get_all_imgs(tree, get_base_url(url))
    print(imgs)
    print(len(imgs))

    return json.dumps({'product': {'imgs': imgs}})