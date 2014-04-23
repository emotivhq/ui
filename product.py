__author__ = 'stuart'

import webapp2
import json
import urllib2
from lxml import html


def get_element_text(element, xpath):
    tree = element.xpath(xpath)
    if len(tree) > 0:
        result = [leaf.text.strip() for leaf in tree]
    else:
        result = [None]

    return result


def get_element_attr(element, xpath, attr):
    tree = element.xpath(xpath)
    if len(tree) > 0:
        result = [leaf.get(attr) for leaf in tree]
    else:
        result = [None]

    return result


class ProductHandler(webapp2.RequestHandler):

    def post(self):
        data = json.loads(self.request.body)
        self.response.write(self.fetch_product(data))

    @staticmethod
    def fetch_product(data):
        url = data['url']
        price = data['price']
        useragent = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"
        request = urllib2.Request(url)
        request.add_header('User-Agent', useragent)
        opener = urllib2.build_opener()
        result = opener.open(request)
        page = result.read()
        tree = html.fromstring(page)

        canonical_url = get_element_attr(tree, '//link[@rel="canonical"]', 'href')
        if len(canonical_url) > 0:
            print(canonical_url)
            if canonical_url[:4] == 'http':
                request = urllib2.Request(canonical_url[0])
                request.add_header('User-Agent', useragent)
                opener = urllib2.build_opener()
                result = opener.open(request)
                page = result.read()
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

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)