/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LocalStorage', ['$window', LocalStorage]);

function LocalStorage($window) {

    this.set = set;
    this.get = get;
    this.remove = remove;

    function set(key, data) {
        var item = data;
        if (typeof data != 'string') {
            item = JSON.stringify(data);
        }
        $window.localStorage.setItem(key, item);
    }

    function get(key) {
        var item = $window.localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (e) {}
        return item;
    }

    function remove(key) {
        $window.localStorage.removeItem(key);
    }
}