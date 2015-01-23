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
        categories = ['baby','forhim']

        head = '<?xml version="1.0" encoding="UTF-8"?>' \
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">' \
               ''
        body = ''
        for category_path in categories:
            path = os.path.join(os.path.dirname(__file__), '../client/assets/giftideas/'+category_path+'.json')
            category_json = json.load(file(path))
            category_slug = category_json['categorySlug']+'/'
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