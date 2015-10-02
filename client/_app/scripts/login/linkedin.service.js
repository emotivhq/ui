/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LinkedInService', [
            '$http','$rootScope','$window','$location','AppStateService', '$q',
    function($http,  $rootScope,  $window,  $location,  AppStateService, $q) {
        var self = this;

        this.login = function() {
            AppStateService.set('login_service', 'linkedin');
            self.auth_url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64State();
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        this.logout = function() {
            $rootScope.$broadcast('linkedin-logout-success');
        };

        this.checkSharePermission = function() {
                var deferred = $q.defer();
                var doDeferred = function() {
                    $http({method: 'POST', url: '/users', data: {
                        action: 'has-share-auth', service: 'linkedin'}})
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(data) {
                            console && console.log && console.log(data);
                            deferred.reject(data);
                        });
                    return deferred.promise
                };
                return doDeferred();
            };

        this.getSharePermissionUrl = function() {
            AppStateService.set('login_service', 'linkedin');
            var url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress w_share') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64StateForSharing();
            return url
        };

        this.doShare = function(message, link, linkName) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'linkedin',
                    message: message, link: link, link_name: linkName}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    }
]);
