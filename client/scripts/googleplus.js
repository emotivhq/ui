/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location',
    function($http,  $rootScope,  $window,  $location) {

        this.uid = -1;
        this.usr_img = '';
        this.token = '';

        this.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
            '?scope=' + encodeURIComponent('https://www.googleapis.com/auth/plus.login') +
            '&client_id=' + encodeURIComponent('26242969111.apps.googleusercontent.com') +
            '&redirect_uri=' + encodeURIComponent('https://6-dot-gift-starter.appspot.com/oauth-callback/googleplus') +
            '&response_type=' + encodeURIComponent('code') +
            '&access_type=' + encodeURIComponent('offline');

        this.loginRequested = false;

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            if (self.loginRequested) {
                submitOneTimeCode(authResponse);
            }
        };

        function submitOneTimeCode(authResponse) {
            $http({method: 'POST', url: '/user',
                data: {service: 'googleplus', action: 'submit-one-time-code', auth_response: authResponse}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console.log(data)});
            self.loginRequested = false;
        }

        this.login = function() {
            self.auth_window = $window.open(self.auth_url, 'Twitter Authorization');

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
