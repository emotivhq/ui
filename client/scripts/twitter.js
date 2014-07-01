/**
 * Created by stuart on 6/23/14.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window',
    function($http,  $rootScope,  $window) {

        this.uid = -1;
        this.usr_img = '';
        this.token = '';

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

        this.logout = function() {
            // TODO: actually log out...?
            $rootScope.$broadcast('twitter-logout-success');
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/user', data: {action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    $rootScope.$broadcast('twitter-login-success');
                })
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
