/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    '$location', '$window', 'AppStateService', '$q', FacebookService]);

function FacebookService(ezfb,  $http,  $rootScope,  $location,  $window,
                         AppStateService, $q) {
    var self = this;

    this.uid = -1;
    this.usr_img = '';
    this.name = '';
    this.token = '';
    this.taggableFriends = [];

    this.getTaggableFriends = getTaggableFriends;

    this.loginCallback = function(response) {
        if (response.status === 'connected') {
            self.getLongTermToken(response.authResponse.accessToken,
                response.authResponse.userID);
        }
    };

    this.login = function() {
        AppStateService.set('login_service', 'facebook');
        var url = 'https://www.facebook.com/dialog/oauth' +
            '?client_id=' + window.fbAppId +
            '&response_type=code' +
            '&redirect_uri=' + $window.location.protocol + '//' +
            $window.location.host +
            '&state=' + AppStateService.base64State() +
            '&scope=public_profile,basic_info,email,user_birthday,user_friends,friends_birthday';
        $window.open(url, '_self');
    };

    this.getLongTermToken = function(token) {
        $http({method: 'POST', url: '/users',
            data: {service: 'facebook', action: 'get-long-term-token',
                auth_token: token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}
        })
            .success(function(data) {
                self.uid = data['uid'];
                self.name = data['name'];
                self.usr_img = data['usr_img'];
                self.token = data['token'];
                self.subscribed = data['on_mailing_list'];
                self.has_pitched_in = data['has_pitched_in'];
                $rootScope.$broadcast('facebook-login-success');
            })
    };

    this.logout = function() {
        // TODO: logout doesn't work due to X FRAME restriction...
        // Facebook is trying to go to facebook.com/home.php?
        $rootScope.$broadcast('facebook-logout-success');
    };

    this.inviteFriends = function(uid) {
        ga('send', 'event', 'share campaign', 'facebook');

        if (!device.mobile()) {
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'facebook',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
            })));
            ezfb.ui({method: 'send', link: $location.absUrl(),
                app_id: ezfb.app_id});
            $location.search('re', null);
        } else {
            var shareUrl = 'https://www.facebook.com/sharer/sharer.php';
            var parameters = "?u=" + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.location.href = shareUrl + parameters;
        }
    };

    function getTaggableFriends() {
        return $q(function(resolve, reject) {
            if (self.taggableFriends.length) {
                resolve(self.taggableFriends);
            } else {
                fetchTaggableFriends(resolve, reject);
            }
        });
    }

    function fetchTaggableFriends(resolve, reject) {
        var uid = 'me';
        // TODO: use better abstraction than direct access of inserted token
        return $http({method: 'GET', url: 'https://graph.facebook.com/v2.2/' +
            uid + '/taggable_friends' + '?access_token=' +
            window.loginDeets[2]})
            .success(function(response) {
                self.taggableFriends = response.data;
                resolve(response.data);
            })
            .error(reject);
    }

    if (AppStateService.fbAuthResponse) {
        self.getLongTermToken(AppStateService.fbAuthResponse.access_token);
    }
}
