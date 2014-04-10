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
        url = json.loads(self.request.body)['url']
        self.response.write(self.fetch_product(url))

    @staticmethod
    def fetch_product(url):
        useragent = "facebookexternalhit/1.0 (+http://www.facebook.com/externalhit_uatext.php)"
        request = urllib2.Request(url)
        request.add_header('User-Agent', useragent)
        opener = urllib2.build_opener()
        page = opener.open(request).read()

        tree = html.fromstring(page)
        title = get_element_attr(tree, '//meta[@property="og:title"]', 'content')[0]
        desc = get_element_attr(tree, '//meta[@property="og:description"]', 'content')[0]
        img = get_element_attr(tree, '//meta[@property="og:image"]', 'content')[0]

        return json.dumps({'product': {
                           'link': url,
                           'img': img,
                           'title': title,
                           'price': desc,
                           }})

api = webapp2.WSGIApplication([('/product', ProductHandler)], debug=True)