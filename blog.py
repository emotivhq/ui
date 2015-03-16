"""pass-through and translate content from external blog"""
__author__ = 'GiftStarter'

from google.appengine.api import urlfetch
import webapp2
import logging
import re

class WeddingHandler(webapp2.RequestHandler):
    """redirect /wedding.* to /blog/weddings"""
    def get(self):
        self.redirect("/blog/weddings")

class BlogRootHandler(webapp2.RequestHandler):
    """pass-through requests to /blog as if they were for /blog/category/blog/"""
    def get(self):
        urlfetch.set_default_fetch_deadline(30)
        self.response.write(urlfetch.fetch(self.request.host_url+"/blog/category/blog/", validate_certificate=False).content)

class PressRootHandler(webapp2.RequestHandler):
    """pass-through requests to /press as if they were for /blog/category/press/"""
    def get(self):
        urlfetch.set_default_fetch_deadline(30)
        self.response.write(urlfetch.fetch(self.request.host_url+"/blog/category/press/", validate_certificate=False).content)

class BlogHandler(webapp2.RequestHandler):
    """
    fetch and translate content from offsite blog:
    replace links with pass-through URLs,
    handle sitemap translation,
    modify headers
    """
    def get(self):
        blog_subdomain="content"
        blog_path_notrail = "/blog"
        blog_path=blog_path_notrail+"/"
        blog_subdomain_url = "http://"+blog_subdomain+".giftstarter.co/"
        blog_path_url = self.request.host_url+blog_path
        blog_path_url_noprotocol = re.sub("https?://","",blog_path_url)
        fetch_url = self.request.path.replace(blog_path_notrail,blog_subdomain_url,1)
        #get remote page
        urlfetch.set_default_fetch_deadline(30)
        fetch_url = fetch_url.replace(blog_subdomain_url+'/',blog_subdomain_url,1)
        fetched = urlfetch.fetch(fetch_url, validate_certificate=False)
        if(fetched.status_code!=200):
            logging.info('ERROR: '+fetched.status_code+' for '+fetch_url)
        content = fetched.content
        #replace all subdomain links
        content = re.sub("(<a|<link rel=\"canonical\"|<link rel=\"alternate\"|<atom:link)( [^>]*href\s*=\s*['\"])(https?://"+blog_subdomain+"\.giftstarter\.co)/?", "\\1\\2"+blog_path_url,content)
        content = re.sub("(<a class=\"ssba[^>]*)"+blog_subdomain+"\.giftstarter\.co/?", "\\1"+blog_path_url_noprotocol,content)
        content = content.replace('<meta property="og:url" content="http://'+blog_subdomain+'.giftstarter.co/','<meta property="og:url" content="'+blog_path_url)
        content = content.replace('<link>http://'+blog_subdomain+'.giftstarter.co','<link>'+blog_path_url)
        content = content.replace('<comments>http://'+blog_subdomain+'.giftstarter.co','<comments>'+blog_path_url)
        content = content.replace('<wfw:commentRss>http://'+blog_subdomain+'.giftstarter.co','<wfw:commentRss>'+blog_path_url)
        content = content.replace(blog_path_url+'/',blog_path_url)
        #sitemap xml files
        if(re.match('.*sitemap.*\.xml',fetch_url)):
            content = content.replace("http://"+blog_subdomain+".giftstarter.co",self.request.host_url+blog_path_notrail)
        #avoid providing non-SSL content in SSL page
        content = content.replace("http://"+blog_subdomain+".giftstarter.co","https://"+blog_subdomain+".giftstarter.co")
        content = content.replace("http://fonts.googleapis.com","https://fonts.googleapis.com")
        logging.info("Headers: {0}".format(fetched.headers))
        #headers['content-type'] = fetched.headers['content-type']
        if('content-type' in fetched.headers):
            self.response.headers['Content-Type']=fetched.headers['content-type']
        if('content-length' in fetched.headers):
            self.response.headers['Content-Length']=fetched.headers['content-length']
        if('date' in fetched.headers):
            self.response.headers['Date']=fetched.headers['date']
        logging.info("Headers: {0}".format(self.response.headers))
        self.response.write(content)

handler = webapp2.WSGIApplication([
    ('/blog', BlogRootHandler),
    ('/blog/', BlogRootHandler),
    ('/blog/.*', BlogHandler),
    ('/press', PressRootHandler),
    ('/press/', PressRootHandler),
    ('/wedding.*', WeddingHandler),
])
