__author__ = 'stuart'

import requests
from lxml import html

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


def verify_partner(url):
    partner_domains = {
        'rei': 'rei.com',
        'brooksrunning': 'brooksrunning.com/',
        'filson': 'filson.com/',
        'amazon': 'amazon.com/',
        'nordstrom': 'nordstrom.com/',
        'costco': 'costco.com/'
    }

    partner = None
    for name, domain in partner_domains.items():
        if domain in url:
            partner = name
            break

    return partner


def extract_price(tree, partner):
    partner_price_patterns = {
        'rei': {'normal': '//*[@id="product"]//li[@class="price"]',
                          'sale': '//*[@id="product"]//li[contains(@class, "salePrice")]'},
        'brooksrunning': {'normal': '//*[@id="product-content"]//span[@class="price-sales"]',
                          'sale': '//*[@id="product-content"]//span[@class="price-sales"]'},
        'filson': {'normal': '//*[@id="prodprice"]', 'sale': '//*[@id="prodprice"]/span[@class="sale"]'},
        'amazon': {'normal': '//*[@id="priceblock_ourprice"]', 'sale': '//*[@id="priceblock_ourprice"]'},
        'nordstrom': {'normal': '//*[@id="price"]/table/tbody/tr/td[1]/span',
                      'sale': '//*[@id="price"]/table/tbody/tr/td[1]/span[2]'},
        'costco': {'normal': '//*[@id="price"]/div[3]/span[2]', 'sale': '//*[@id="price"]/div[3]/span[2]'},
    }

    sale_prices = get_element_text(tree, partner_price_patterns[partner]['sale'])
    normal_prices = get_element_text(tree, partner_price_patterns[partner]['normal'])
    if sale_prices[0] is not None and '$' in sale_prices[0]:
        price_string = sale_prices[0].split('$')[1]
    elif normal_prices[0] is not None and '$' in normal_prices[0]:
        price_string = normal_prices[0].split('$')[1]
    else:
        price_string = '0'
    price = str(int(float(price_string.replace(',', ''))*100))

    return price


def extract_title(tree, partner):
    partner_title_patterns = {
        'rei': '//*[@id="product"]/h1',
        'brooksrunning': '//*[@id="pdpMain"]/section[1]/div[1]/h1',
        'filson': '//*[@id="prodcontent"]/h1',
        'amazon': '//*[@id="productTitle"]',
        'nordstrom': '//*[@id="product-title"]/h1',
        'costco': '//*[@id="main_content_wrapper"]/div[2]/div[2]/div[3]/h1',
    }

    return get_element_text(tree, partner_title_patterns[partner])


def rotate_list_left(l, n):
    n = n % len(l)
    return l[n-len(l):] + l[:n]


DEFAULT_IMAGE = {
    'rei': -1,
    'brooksrunning': 2,
    'filson': 3,
    'amazon': -1,
    'nordstrom': 9,
    'costco': 6
}


def product(data):

    url = data['product_url']
    partner = verify_partner(url)
    if partner is not None:
        headers = {'User-agent': "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"}
        page = requests.get(url, headers=headers).text
        tree = html.fromstring(page)

        canonical_url = get_element_attr(tree, '//link[@rel="canonical"]', 'href')
        if len(canonical_url) > 0:
            if canonical_url[:4] == 'http':
                page = requests.get(canonical_url, headers=headers).text
                tree = html.fromstring(page)

        imgs = get_all_imgs(tree, get_base_url(url))
        imgs.append(get_element_attr(tree, '//meta[@property="og:image"]', 'content')[0])
        imgs = rotate_list_left(imgs, DEFAULT_IMAGE[partner])
        price = extract_price(tree, partner)
        title = extract_title(tree, partner)[0]
        logo = "/assets/{partner}.png".format(partner=partner)

        result = {'product': {'imgs': imgs, 'price': price, 'title': title, 'logo': logo}}

    else:
        result = {'error': 'Non-launch partner'}

    return result
