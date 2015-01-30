"""
API for the giftstart endpoint
"""

__author__ = 'stuart'

import webapp2
import json
import os
import yaml

class GiftideasHandler(webapp2.RequestHandler):

    def get(self):
        return self.post()
    def post(self):
        config = yaml.load(open('config.yaml'))
        app_url = config['app_url']#.replace("https://","http://")
        # categories = ['baby','wedding','forhim','forher']
        json_path = '../client/assets/giftideas/'
        json_dir = os.path.join(os.path.dirname(__file__), json_path)
        category_files = []
        for json_file in os.listdir(json_dir):
            if json_file.endswith(".json"):
                category_files.append(os.path.join(json_dir, json_file))

        head = '<?xml version="1.0" encoding="UTF-8"?>' \
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' \
               ''
        body = ''
        for category_file in category_files:
            category_json = json.load(file(category_file))
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