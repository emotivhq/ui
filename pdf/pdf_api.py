"""generate PDF version of provided relative 'path' or 'html'; uses html2pdfrocket"""

__author__ = 'GiftStarter'

import webapp2
import urllib
from google.appengine.api import urlfetch
import yaml
import re
import logging

api_key = yaml.load(open('secret.yaml'))['html2pdfrocket']['key']
app_url = yaml.load(open('config.yaml'))['app_url']
pdf_service_url = 'http://api.html2pdfrocket.com/pdf'

class PdfHandler(webapp2.RequestHandler):
    """dynamically generate a PDF for a provided relative 'path' or 'html'; uses html2pdfrocket"""

    def get(self):
        return self.post()
    def post(self):
        try:
            page = self.request.get('page').strip()
            html = self.request.get('html').strip()
            if (len(page)==0 and len(html)==0):
                raise Exception("Please specify a page")
            baseurl =  self.request.host_url+'/'
            if(baseurl.find("localhost")>=0 or baseurl.find("127.0.0.1")>=0):
                logging.warn("pdfify cannot be used for localhost; substituting base URL "+app_url)
                baseurl = app_url+'/'
            if(html):
                if(html.find('<base ')>=0):
                    html=re.sub('<base ([^>]*)href=[\'\"].*?[\'\"]','<base \\1href="'+baseurl+'"',html)
                else:
                    html='<base href="'+baseurl+'">'+html
            form_fields = {
              "apikey": api_key,
              "value": (baseurl+page) if page else html
            }
            form_data = urllib.urlencode(form_fields)
            urlfetch.set_default_fetch_deadline(90)
            try:
                pdf_data = urlfetch.fetch(pdf_service_url,payload=form_data,method=urlfetch.POST, validate_certificate=False).content
            except Exception as x:
                logging.warn("Exception generating PDF: {0} {1}".format(x.message, x))
                pdf_data = urlfetch.fetch(pdf_service_url,payload=form_data,method=urlfetch.POST, validate_certificate=False).content
            self.response.headers['Content-Type'] = 'application/pdf'
            self.response.out.write(pdf_data)
        except Exception as x:
            self.response.headers['Content-Type'] = 'text/plain'
            self.response.out.write(x.message)

handler = webapp2.WSGIApplication([('/pdfify', PdfHandler)], debug=True)