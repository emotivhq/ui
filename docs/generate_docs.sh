#requires epydoc: http://epydoc.sourceforge.net/manual-install.html
cd $(dirname $0)
#export PATH=$PATH:/usr/local/google_appengine/lib/webapp2-2.5.2/webapp2.py
epydoc -v -n GiftStarter -u http://giftstarter.co --show-imports --include-log \
../analytics.py \
../appengine_config.py \
../blog.py \
../main.py \
../render_app.py \
../reports.py  \
../share.py  \
../test_gs_analytics.py  \
../test_gs_main.py  \
../abtest/  \
../feeds/  \
../giftstart/  \
../gs_email/  \
../gs_user/  \
../gs_util/  \
../login/  \
../pay/  \
../product/  \
../sitemap/  \
../social/  \
../storage/  \
../thank/