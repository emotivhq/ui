#pydoc -w ../abtest ../feeds ../giftstart ../gs_email ../gs_user ../gs_util ../login ../pay ../product ../sitemap ../social ../storage ../thank
cd $(dirname $0)
pydoc -w ../
rm _markerlib.*html
rm cloudstorage.*html
rm easy_install.*html
rm lxml.*html
rm manuel.*html
rm mock.*html
rm oauthlib.*html
rm pkg_resources.*html
rm requests.*html
rm requests_oauthlib.*html
rm setuptools.*html
rm six.*html
rm stripe.*html
rm tl.*html