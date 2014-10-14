import cloudstorage

__author__ = 'stuart'

import requests
import yaml
import imghdr

config = yaml.load(open('config.yaml'))

key = {
    "private_key_id": "50fa75fa3331b9992543562ba968fd9c900b0db5",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAK++i8IinbTlUj3F\nVESomjAmpTICnCcS83VFD222VLhjRa0oL0NL0nLYG1H1R3l+Jgb4XQzbSHHOD95e\nFQvRT0OEqh3KL0Zw+YLTmK/eTGkcn08Bz5XciRafQYWUKgGyKJxunghw9KCvdmUe\npoets34XcJ3Gm89A6k6D1B/4mYufAgMBAAECgYBL5b+XvLldGThWQvUsnZ/RMa9g\nFK55VX7c41FRcU/PPdgmetdGeeVOAbRyxbnzZx5nHjWZSs5Tj8lcoEb4jpFrARGd\nry9rwAhfU5+jgKQpGvSZFcioZ87nwocqwyE7KvI+81EQDcAzf8LJ9vBeIpQkkHHE\nFQAsyHnhkYnXtZUEqQJBANepoGczemmhP04uGdoYDIRFLcBGFW7lQCXp0PUus5zA\nSXcMvlZzz4NK9Qvx9L+0Tg2wKETvXvIWB8J5Co4JVssCQQDQnYyMPu3s14X5gkqv\n9CBmVgXrK0BU06mZErLkB/TMjjblOWVk13BGJz5PYEYqWfiGFMDhZO5aVBKNjS55\n3q/9AkBeD7XOTT2O5K1fw+uym9qZtjKGMgsXGxYncxuYVI4ySAvCyOQbgNd5RDAs\nzZMaKeIBRlvJ9T1MCR/JSlG4MYqRAkEApNCkFrUtAh4wUbTXTvX/lvpFiMtN8vaa\nmj4EqVWD2QxOYIEdEzOGF1avysRUCue0CjJhRHGaQjEDy2OMIWqG/QJBALE/UtXj\nVJokcrl8cbtgwUvpATbOBLsOBPb3d9qsKRCwkX18DQeIcW4E7ZxAd/dbS5PP1wRD\noSfSeP1cvTk6NfU\u003d\n-----END PRIVATE KEY-----\n",
    "client_email": "474804009321-0tudt43eg2qqpp3vl4m592evibil2ii3@developer.gserviceaccount.com",
    "client_id": "474804009321-0tudt43eg2qqpp3vl4m592evibil2ii3.apps.googleusercontent.com",
    "type": "service_account"
}


def cache_user_image_from_url(uid, img_url):
    img = requests.get(img_url).content
    extension = '.' + img_url.split('.')[-1].split('?')[0]
    return save_picture_to_gcs(uid + extension, 'u/', img)


def cache_product_image(img_url, gsid):
    request = requests.get(img_url)
    img = request.content
    return save_picture_to_gcs(gsid + extract_extension_from_content(img), 'p/', img)


def cache_thanks_image(img, filename, gsid,
                       content_type='binary/octet-stream'):
    extension = extract_extension_from_content(img)
    if extension:
        content_type = 'image/' + extension[1:]
    return save_picture_to_gcs(filename + extension, 'thanks/', img,
                               content_type)


def cache_user_uploaded_image(img, filename, gsid,
                              content_type='binary/octet-stream'):
    extension = extract_extension_from_content(img)
    if extension:
        content_type = 'image/' + extension[1:]
    return save_picture_to_gcs(gsid + extension, 'p/', img, content_type)


def _save_picture_to_gcs_http(filename, folder, data):
    file_url = 'https://storage.googleapis.com' + config['storage_url']
    response = requests.post(file_url + '?key=' + config['storage_key'] + '&uploadType=media&name=' + folder + filename,
                             data=data)
    print(response.content)
    return file_url


def save_picture_to_gcs(filename, folder, data,
                         content_type='binary/octet-stream'):
    # Open cloud storage file for writing
    file_url = config['storage_url'] + folder + filename
    cs_file = cloudstorage.open(file_url, mode='w', content_type=content_type,
                                options={'x-goog-acl': 'public-read'})
    cs_file.write(data)
    cs_file.close()
    return 'https://storage.googleapis.com' + file_url


def extract_extension_from_content(img_data):
    extension = '.' + imghdr.what('', img_data)
    return extension