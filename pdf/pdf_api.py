"""generate PDF version of provided path"""

__author__ = 'GiftStarter'

import webapp2
from google.appengine.api import urlfetch
import yaml

api_key=yaml.load(open('secret.yaml'))['html2pdfrocket']['key']
pdf_service_url = 'http://api.html2pdfrocket.com/pdf'

class PdfHandler(webapp2.RequestHandler):
    """dynamically generate a PDF for a provided path"""

    def get(self):
        return self.post()
    def post(self):
        try:
            page = self.request.get('page').strip()
            if (len(page)==0):
                raise Exception("Please specify a page")
            baseurl =  self.request.host_url+'/'
            if(baseurl.find("localhost")>=0 or baseurl.find("127.0.0.1")>=0):
                raise Exception("Cannot be used for localhost")
            urlfetch.set_default_fetch_deadline(90)
            pdf_data = urlfetch.fetch(pdf_service_url+'?apikey='+api_key+'&value='+baseurl+page, validate_certificate=False).content
            self.response.headers['Content-Type'] = 'application/pdf'
            self.response.out.write(pdf_data)
        except Exception as x:
            self.response.headers['Content-Type'] = 'text/plain'
            self.response.out.write(x.message)

handler = webapp2.WSGIApplication([('/pdfify', PdfHandler)], debug=True)