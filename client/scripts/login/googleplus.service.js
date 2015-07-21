/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location', '$q', 'AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q, AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            self.authResponse = authResponse;
            self.submitOneTimeCode();
        };

        this.submitOneTimeCode = function() {
            // Get app state data from auth response
            self.gplus_code_request = {method: 'POST', url: '/users',
                data: {service: 'googleplus', action: 'submit-one-time-code',
                    auth_response: self.authResponse,
                    location: $location.path() + $window.location.search,
                    redirect_url: $window.location.protocol + '//' +
                        $window.location.host + '/',
                    referrer: AppStateService.referrer}};
            $http(self.gplus_code_request)
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console && console.log && console.log(data)});
            self.loginRequested = false;
        };

        this.login = function() {
            AppStateService.set('login_service', 'googleplus');
            self.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
                '?scope=' + encodeURIComponent(
                'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email') +
                '&client_id=' +
                encodeURIComponent($window.googlePlusClientId) +
                '&redirect_uri=' +
                encodeURIComponent($window.location.protocol + '//' +
                    $window.location.host + '/') +
                '&response_type=code' +
                '&state=' + AppStateService.base64State() +
                '&access_type=offline';
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        //this.checkSharePermission = function() {
        //        var deferred = $q.defer();
        //        var doDeferred = function() {
        //            $http({method: 'POST', url: '/users', data: {
        //                action: 'has-share-auth', service: 'googleplus'}})
        //                .success(function(data) {
        //                    deferred.resolve(data);
        //                })
        //                .error(function(data) {
        //                    console && console.log && console.log(data);
        //                    deferred.reject(data);
        //                });
        //            return deferred.promise
        //        };
        //        return doDeferred();
        //    };

        //this.getSharePermissionUrl = function() {
        //    AppStateService.set('login_service', 'googleplus');
        //    url = 'https://accounts.google.com/o/oauth2/auth' +
        //        '?scope=' + encodeURIComponent(
        //        'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.stream.write') +
        //        '&client_id=' +
        //        encodeURIComponent($window.googlePlusClientId) +
        //        '&redirect_uri=' +
        //        encodeURIComponent($window.location.protocol + '//' +
        //            $window.location.host + '/') +
        //        '&response_type=code' +
        //        '&state=' + AppStateService.base64StateForSharing() +
        //        '&access_type=offline';
        //    return url;
        //};

        //this.doShare = function(message) {
        //    var deferred = $q.defer();
        //    var doDeferred = function() {
        //        $http({method: 'POST', url: '/users', data: {
        //            action: 'do-share', service: 'googleplus',
        //            message: message}})
        //            .success(function(data) {
        //                deferred.resolve(data);
        //            })
        //            .error(function(data) {
        //                console && console.log && console.log(data);
        //                deferred.reject(data);
        //            });
        //        return deferred.promise
        //    };
        //    return doDeferred();
        //};

        this.logout = function() {
            $rootScope.$broadcast('googleplus-logout-success');
        };

        this.share = function(uid) {
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'googleplus',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            })));
            var parameters = '?url=' + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.open(shareUrl + parameters);
            $location.search('re', null);
        };

        if (AppStateService.gplusAuthResponse) {
            self.loginCallback(AppStateService.gplusAuthResponse);
        }

    }
]);
