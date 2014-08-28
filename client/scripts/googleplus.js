/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location',
    function($http,  $rootScope,  $window,  $location) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        this.loginRequested = false;

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            if (self.loginRequested) {
                self.authResponse = authResponse;
                self.submitOneTimeCode();
            }
        };

        this.submitOneTimeCode = function() {
            // Get app state data from auth response
            var encodedAppState = self.authResponse.split()
            self.gplus_code_request = {method: 'POST', url: '/user',
                data: {service: 'googleplus', action: 'submit-one-time-code',
                    auth_response: self.authResponse, location: $location.path() + $window.location.search,
                    encoded_app_state: encodedAppState}};
            $http(self.gplus_code_request)
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console.log(data)});
            self.loginRequested = false;
        };

        this.login = function(encodedAppState) {
            self.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
                '?scope=' + encodeURIComponent('https://www.googleapis.com/auth/plus.login') +
                '&client_id=' + encodeURIComponent($window.googlePlusClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host +
                '/oauth-callback/googleplus?appstate=' + encodedAppState) +
                '&response_type=' + encodeURIComponent('code') +
                '&access_type=' + encodeURIComponent('offline');
            self.auth_window = $window.open(self.auth_url, 'Google Authorization');
            self.loginRequested = true;
        };

        this.logout = function() {
            $rootScope.$broadcast('googleplus-logout-success');
        };

        this.share = function() {
            mixpanel.track("share campaign googleplus");
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            var parameters = '?url=' + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.open(shareUrl + parameters);
        };

        window.googlePlusCallback = self.loginCallback;

    }
]);
