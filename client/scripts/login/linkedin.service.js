/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LinkedInService', [
            '$http','$rootScope','$window','$location','AppStateService',
    function($http,  $rootScope,  $window,  $location,  AppStateService) {
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

    }
]);
