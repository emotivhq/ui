__author__ = 'stuart'

import facebook
import cloudstorage


def cache_user_image(uid, access_token):
    # Fetch facebook image
    graph = facebook.GraphAPI(access_token)
    img = graph.get_object('me/picture', type='square', height=200, width=200, redirect=1)
    _save_picture_to_gcs(uid + '.jpg', 'u/', img)


def cache_product_image(img_url):
    # TODO: implement product image fetch
    pass


def _save_picture_to_gcs(filename, folder, data):
    # Open cloud storage file for writing
    cs_file = cloudstorage.open('/giftstarter-pictures/' + folder + filename, 'w',
                                options={'x-goog-acl': 'public-read'})
    cs_file.write(data)
    cs_file.close()
