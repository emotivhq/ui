/**
 * Created by stuart on 6/23/14.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window','$location',
    function($http,  $rootScope,  $window,  $location) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        this.verifier = '';
        this.auth_url = '';
        this.oauth_token = '';

        var self = this;

        this.login = function(encodedAppState) {
            self.auth_window = $window.open(self.auth_url, 'Twitter Authorization');

            // Fetch new login URL in case they want to login after cancelling
            $http({method: 'POST', url: '/user', data: {action: 'get-auth-url', service: 'twitter',
                encoded_app_state: encodedAppState}})
                .success(function(data) {self.auth_url = data['url'];})
                .error(function(data) {console.log(data);});
        };

        this.logout = function() {
            // TODO: actually log out...?
            $rootScope.$broadcast('twitter-logout-success');
        };

        this.share = function() {
            mixpanel.track("share campaign twitter");
            ga('send', 'event', 'share campaign', 'twitter');
            var shareUrl = 'https://twitter.com/share';
            var parameters = "?url=" + encodeURIComponent($location.absUrl().split('#')[0]) +
                "&text=Check out this GiftStarter campaign!  It's the bees knees! #GiftStarter cc @GiftChampion";
            $window.open(shareUrl + parameters);
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/user', data: {action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token,
                location: $location.path() + $window.location.search}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    $rootScope.$broadcast('twitter-login-success');
                })
                .error(function(data) {console.log(data);});
        };

        this.getAuthUrl = function() {
            $http({method: 'POST', url: '/user', data: {action: 'get-auth-url', service: 'twitter', app_state: ''}})
                .success(function(data) {self.auth_url = data['url'];})
                .error(function(data) {console.log(data);});
        };

        window.twitterOauthCallback = function(oauthToken, oauthVerifier) {
            self.oauth_token = oauthToken;
            self.verfier = oauthVerifier;
            self.submitVerifier();
        };
    }
]);
