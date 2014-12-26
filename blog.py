__author__ = 'GiftStarter'

from google.appengine.api import urlfetch
import webapp2
import logging
import re

class BlogRootHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(urlfetch.fetch(self.request.host_url+"/blog/category/blog/", validate_certificate=False).content)

class PressRootHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(urlfetch.fetch(self.request.host_url+"/blog/category/press/", validate_certificate=False).content)

class BlogHandler(webapp2.RequestHandler):
    def get(self):
        blog_subdomain="content"
        blog_path="/blog/"
        blog_subdomain_url = "http://"+blog_subdomain+".giftstarter.co/"
        blog_path_url = self.request.host_url+blog_path
        logging.info('GET to BlogHandler '+self.request.path)
        fetch_url = self.request.path.replace('/blog',blog_subdomain_url,1)
        fetch_url = fetch_url.replace(blog_subdomain_url+'/',blog_subdomain_url,1)
        logging.info('...fetching '+fetch_url)
        fetched = urlfetch.fetch(fetch_url, validate_certificate=False)
        if(fetched.status_code!=200):
            logging.info('ERROR: '+fetched.status_code+' for '+fetch_url)
        content = fetched.content
        #content = content.replace(blog_subdomain+'.giftstarter.co',self.request.host+'/blog')
        content = re.sub("(<a|<link rel=\"canonical\"|<link rel=\"alternate\"|<atom:link)( [^>]*href\s*=\s*['\"])(https?://"+blog_subdomain+"\.giftstarter\.co)/?", "\\1\\2"+blog_path_url,content)
        content = content.replace('<meta property="og:url" content="http://'+blog_subdomain+'.giftstarter.co/','<meta property="og:url" content="'+blog_path_url)
        content = content.replace('<link>http://'+blog_subdomain+'.giftstarter.co','<link>'+blog_path_url)
        content = content.replace('<comments>http://'+blog_subdomain+'.giftstarter.co','<comments>'+blog_path_url)
        content = content.replace('<wfw:commentRss>http://'+blog_subdomain+'.giftstarter.co','<wfw:commentRss>'+blog_path_url)
        content = content.replace(blog_path_url+'/',blog_path_url)
        self.response.write(content)

handler = webapp2.WSGIApplication([
    ('/blog', BlogRootHandler),
    ('/blog/', BlogRootHandler),
    ('/blog/.*', BlogHandler),
    ('/press', PressRootHandler),
    ('/press/', PressRootHandler),
])
