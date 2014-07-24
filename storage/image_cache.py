__author__ = 'stuart'

from social import facebook
import cloudstorage
import requests
import yaml

config = yaml.load(open('config.yaml'))


def cache_facebook_user_image(uid, token_set):
    # Fetch facebook image
    graph = facebook.GraphAPI(token_set.access_token)
    img = graph.get_object('me/picture', type='square', height=400, width=400, redirect=1)['data']
    return _save_picture_to_gcs(uid + '.jpg', 'u/', img)


def cache_user_image_from_url(uid, img_url):
    img = requests.get(img_url).content
    extension = '.' + img_url.split('.')[-1].split('?')[0]
    return _save_picture_to_gcs(uid + extension, 'u/', img)


def cache_product_image(img_url, gsid):
    img = requests.get(img_url).content
    extension = '.' + img_url.split('.')[-1].split('?')[0]
    return _save_picture_to_gcs(gsid + extension, 'p/', img)


def _save_picture_to_gcs(filename, folder, data):
    # Open cloud storage file for writing
    file_url = config['storage_url'] + folder + filename
    cs_file = cloudstorage.open(file_url, 'w', options={'x-goog-acl': 'public-read'})
    cs_file.write(data)
    cs_file.close()
    return 'https://storage.googleapis.com' + file_url
