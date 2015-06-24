"""sitemap for giftideas"""

__author__ = 'GiftStarter'

import webapp2
import yaml
from giftideas.giftideas_api import get_giftideas_json


config = yaml.load(open('config.yaml'))
app_url = config['app_url']  # .replace("https://","http://")

class GiftideasHandler(webapp2.RequestHandler):
    """dynamically generate a sitemap for giftideas: load JSON files, extract categories and product URLs"""

    def get(self):
        return self.post()
    def post(self):
        category_jsons = get_giftideas_json()
        head = '<?xml version="1.0" encoding="UTF-8"?>' \
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' \
               ''
        body = ''
        for category_json in category_jsons:
            category_slug = category_json['categorySlug'].lower()+'/'
            body += '<url>' \
                    '<loc>{0}/giftideas/{1}</loc>' \
                    '<changefreq>daily</changefreq>' \
                    '<priority>0.80</priority>' \
                    '</url>'.format(app_url,category_slug)
            for product in category_json['productList']:
                body += '<url>' \
                        '<loc>{0}/giftideas/{1}{2}</loc>' \
                        '<changefreq>daily</changefreq>' \
                        '<priority>0.80</priority>' \
                        '</url>'.format(app_url,category_slug,product['productSlug'])
        foot = '' \
               '</urlset>'
        self.response.headers['Content-Type'] = 'text/xml'
        self.response.write(head+body+foot)


handler = webapp2.WSGIApplication([('/sitemap-giftideas.xml', GiftideasHandler)], debug=True)