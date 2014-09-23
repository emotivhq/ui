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
                  filter(lambda img: img is not None,
                         get_element_attr(tree, '//img', 'src')))
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
        'rei': ['//*[@id="product"]//li[contains(@class, "originalPrice")]'
                '/span',
                '//*[@id="product"]//li[contains(@class, "price")]',
                '//*[@id="product"]//li[contains(@class, "salePrice")]'],
        'brooksrunning': ['//*[@id="product-content"]'
                          '//span[@class="price-sales"]',
                          '//*[@id="product-content"]'
                          '//span[@class="price-sales"]'],
        'filson': ['//*[@id="prodprice"]', '//*[@id="prodprice"]'
                                           '/span[@class="sale"]'],
        'amazon': ['//div[@id="price"]/table/tr[1]/td[2]',
                   '//*[@id="actualPriceValue"]/b',
                   '//*[@id="priceblock_ourprice"]'],
        'nordstrom': ['//*[@id="price"]'
                      '//span[contains(@class, "after-sale-price")]',
                      '//*[@id="price"]/table/tbody/tr'
                      '/td[contains(@class, "item-price")]/span',
                      '//*[@id="price"]//span[contains(@class, "sale-price")]',
                      '//*[@id="price"]/table/tbody/tr/td[1]/span'],
        'costco': ['//*[@id="price"]/div[3]/span[2]', '//*[@id="price"]/div[3]'
                                                      '/span[2]'],
    }

    price_string = '0'
    for xpath in partner_price_patterns[partner]:
        prices = get_element_text(tree, xpath)
        if prices[0] is not None and '$' in prices[0]:
            price_string = prices[0].split('$')[1]
            break

    price = str(int(float(price_string.replace(',', '').split('-')[0])*100))

    return price


def extract_title(tree, partner):
    partner_title_patterns = {
        'rei': ['//*[@id="product"]/h1'],
        'brooksrunning': ['//*[@id="pdpMain"]/section[1]/div[1]/h1'],
        'filson': ['//*[@id="prodcontent"]/h1'],
        'amazon': ['//*[@id="productTitle"]', '//*[@id="btAsinTitle"]'],
        'nordstrom': ['//*[@id="product-title"]/h1'],
        'costco': ['//*[@id="main_content_wrapper"]/div[2]/div[2]/div[3]/h1'],
    }

    title = []
    for xpath in partner_title_patterns[partner]:
        title = get_element_text(tree, xpath)
        if title[0]:
            break

    return title


def rotate_list_left(l, n):
    n = n % len(l)
    return l[n-len(l):] + l[:n]


DEFAULT_IMAGE = {
    'rei': -1,
    'brooksrunning': 2,
    'filson': 3,
    'amazon': -1,
    'nordstrom': 7,
    'costco': 6
}


def product(url):
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
