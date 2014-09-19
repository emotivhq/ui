/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location','AppStateService',
    function($http,  $rootScope,  $window,  $location,  AppStateService) {

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
            self.gplus_code_request = {method: 'POST', url: '/user',
                data: {service: 'googleplus', action: 'submit-one-time-code',
                    auth_response: self.authResponse, location: $location.path() + $window.location.search,
                    redirect_url: $window.location.protocol + '//' + $window.location.host + '/',
                    referrer: AppStateService.referrer}};
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

        this.login = function() {
            self.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
                '?scope=' + encodeURIComponent('https://www.googleapis.com/auth/plus.login') +
                '&client_id=' + encodeURIComponent($window.googlePlusClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host + '/') +
                '&response_type=code' +
                '&state=' + AppStateService.base64State() +
                '&access_type=offline';
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        this.logout = function() {
            $rootScope.$broadcast('googleplus-logout-success');
        };

        this.share = function(uid) {
            mixpanel.track("share campaign googleplus");
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'googleplus',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                })
            })));
            var parameters = '?url=' + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.open(shareUrl + parameters);
            $location.search('re', null);
        };

        if (AppStateService.authResponse) {
            self.loginCallback(AppStateService.authResponse);
        }

    }
]);
