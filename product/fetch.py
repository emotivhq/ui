__author__ = 'stuart'

import requests
from lxml import html
import tax

LAUNCH_PARTNERS = ['http://www.rei.com/', 'http://www.brooksrunning.com/']


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
                  filter(lambda img: img is not None, get_element_attr(tree, '//img', 'src')))
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


def extract_price(tree, partner):
    partner_price_patterns = {
        'http://www.rei.com/': {'normal': '//*[@id="product"]//li[@class="price"]',
                                'sale': '//*[@id="product"]//li[contains(@class, "salePrice")]'},
        'http://www.brooksrunning.com/': '',
    }

    if partner == 'http://www.rei.com/':
        sale_prices = get_element_text(tree, partner_price_patterns[partner]['sale'])
        print(sale_prices)
        if sale_prices[0] is not None:
            price_string = sale_prices[0]
        else:
            price_string = get_element_text(tree, partner_price_patterns[partner]['normal'])[0]
        price = str(int(float(price_string[1:])*100))

    elif partner == 'http://www.brooksrunning.com/':
        price = '1'

    else:
        price = '-1'

    return price


def product(data):

    url = data['product_url']
    partner_url_matches = [partner in url for partner in LAUNCH_PARTNERS]
    if any(partner_url_matches):
        partner = LAUNCH_PARTNERS[partner_url_matches.index(True)]

        headers = {'User-agent': "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"}
        page = requests.get(url, headers=headers).text

        tree = html.fromstring(page)

        canonical_url = get_element_attr(tree, '//link[@rel="canonical"]', 'href')
        if len(canonical_url) > 0:
            if canonical_url[:4] == 'http':
                page = requests.get(canonical_url, headers=headers).text
                tree = html.fromstring(page)

        imgs = [get_element_attr(tree, '//meta[@property="og:image"]', 'content')[0]] + \
            get_all_imgs(tree, get_base_url(url))

        price = extract_price(tree, partner)

        result = {'product': {'imgs': imgs, 'price': price}}
        print(result)

    else:
        result = {'error': 'Non-launch partner'}

    return result
