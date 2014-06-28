/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope',
    function($http,  $rootScope) {

        this.uid = -1;
        this.usr_img = '';
        this.token = '';

        this.loginRequested = false;

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
//            if (authResponse.refresh_token) {
//                // Ensure this is not the call made by default by google on page load when user is already logged in
            if (self.loginRequested) {
                submitOneTimeCode(authResponse);
            }
//            }
        };

        function submitOneTimeCode(authResponse) {
            $http({method: 'POST', url: '/user',
                data: {service: 'googleplus', action: 'submit-one-time-code', auth_response: authResponse}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console.log(data)});
            self.loginRequested = false;
        }

        this.login = function() {
            gapi.auth.signIn({accesstype: 'offline'});
            self.loginRequested = true;
        };

        this.logout = function() {
            gapi.auth.signOut();
            $rootScope.$broadcast('googleplus-logout-success');
        };

        window.googlePlusCallback = self.loginCallback;

    }
]);
