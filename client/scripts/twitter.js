/**
 * Created by stuart on 6/23/14.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window','UserService',
    function($http,  $rootScope,  $window,  UserService) {

        this.verifier = '';
        this.auth_url = '';
        this.oauth_token = '';

        var self = this;

        this.login = function() {
            self.auth_window = $window.open(self.auth_url, 'Twitter Authorization');

            // Fetch new login URL in case they want to login after cancelling
            $http({method: 'POST', url: '/user', data: {action: 'get-auth-url', service: 'twitter'}})
                .success(function(data) {self.auth_url = data['url'];})
                .error(function(data) {console.log(data);});
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/user', data: {action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token}})
                .success(function(data) {UserService.registerLogin(data['uid'], data['usr_img'])})
                .error(function(data) {console.log(data);});
        };

        window.twitterOauthCallback = function(oauthToken, oauthVerifier) {
            self.oauth_token = oauthToken;
            self.verfier = oauthVerifier;
            self.submitVerifier();
        };

        $http({method: 'POST', url: '/user', data: {action: 'get-auth-url', service: 'twitter'}})
            .success(function(data) {self.auth_url = data['url'];})
            .error(function(data) {console.log(data);});
    }
]);
