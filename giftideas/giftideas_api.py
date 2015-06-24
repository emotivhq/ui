import os
import json

__author__ = 'GiftStarter'

def get_giftideas_json():
    """list of Categories of GaiftIdeas (JSON); this needs to be refined and moved from the old JSON-based files to an actual datastore
    :return: list of JSON files, one for each Category of GiftIdeas
    """
    json_path = '../client/assets/giftideas/'
    json_dir = os.path.join(os.path.dirname(__file__), json_path)
    category_jsons = []
    for json_file in sorted(os.listdir(json_dir)):
        if json_file.endswith(".json"):
            category_file = os.path.join(json_dir, json_file)
            category_jsons.append(json.load(file(category_file)))
    return category_jsons