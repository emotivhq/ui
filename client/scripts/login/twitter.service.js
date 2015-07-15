/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window','$location','$q','AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q,  AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        this.verifier = '';
        this.auth_url = '';
        this.oauth_token = '';

        var self = this;

        this.login = function() {
            $window.open(self.auth_url, '_self');
        };

        this.logout = function() {
            // TODO: actually log out...?
            $rootScope.$broadcast('twitter-logout-success');
        };

        this.share = function() {
            ga('send', 'event', 'share campaign', 'twitter');
            var shareUrl = 'https://twitter.com/share';
            var parameters = "?url=" + encodeURIComponent($location.absUrl().split('#')[0]) +
                "&text="+encodeURIComponent("Help us gift #together on @GiftStarter! It's easy! Simply purchase 1 or more tiles on the #gift. #GiftsMatter");
            $window.open(shareUrl + parameters);
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/users', data: {
                action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('twitter-login-success');
                })
                .error(function(data) {console && console.log && console.log(data);});
        };


        this.getAuthUrl = function(successCallback, failureCallback) {
            var deferred = $q.defer();
            AppStateService.set('login_service', 'twitter');
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-auth-url', service: 'twitter',
                    redirect_url: AppStateService.getOauthRedirectUrl()}})
                    .success(function(data) {
                        self.auth_url = data['url'];
                        deferred.resolve(self.auth_url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                    return deferred.promise
                };
            AppStateService.remove('login_service');
            return doDeferred()
        };

        this.getSharePermissionUrl = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-auth-url', service: 'twitter',
                    requirePermissionToPost: 1,
                    redirect_url: AppStateService.getOauthRedirectUrl()}})
                    .success(function(data) {
                        deferred.resolve(data.url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

        function twitterOauthCallback(oauthToken, oauthVerifier) {
            self.oauth_token = oauthToken;
            self.verfier = oauthVerifier;
            self.submitVerifier();
        }

        if (AppStateService.oauthToken) {
            twitterOauthCallback(AppStateService.oauthToken,
                AppStateService.oauthVerifier);
        }
    }
]);
