/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('UserService', [
            '$http','$rootScope','$cookieStore','$window','FacebookService','TwitterService','GooglePlusService',
    function($http,  $rootScope,  $cookieStore,  $window,  FacebookService,  TwitterService,  GooglePlusService) {
        this.uid = -1;
        this.loggedIn = false;
        this.profileImageUrl  = '';
        this.isStripeCustomer = false;
        this.loginService = '';
        this.onMailinList = false;

        var self = this;

        this.registerLogin = function(uid, profileImageUrl, token, onMailingList) {
            mixpanel.identify(uid);
            mixpanel.people.set({'$last_login': new Date()});
            self.uid = uid;
            self.profileImageUrl = profileImageUrl;
            self.loggedIn = true;
            self.onMailingList = onMailingList;

            $cookieStore.put('uid', uid);
            $cookieStore.put('token', token);

            $rootScope.$broadcast('login-success');
        };


        this.logout = function() {
            if (self.loginService === 'facebook') {
                FacebookService.logout();
            } else if (self.loginService === 'twitter') {
                TwitterService.logout();
            } else if (self.loginService === 'googleplus') {
                GooglePlusService.logout();
            }
        };

        this.registerLogout = function() {
            self.loggedIn = false;
            self.uid = -1;
            self.profileImageUrl = '';

            $cookieStore.remove('uid');
            $cookieStore.remove('token');

            $rootScope.$broadcast('logout-success');
        };

        this.checkIfStripeCustomer = function() {
            $http({method: 'POST', url: '/pay', data: {action: 'is-existing-customer', uid: self.uid}})
                .success(function(response) {self.isStripeCustomer = response.isStripeCustomer})
                .error(function() {console.log('Failed to determine if stripe customer.')});
        };

        $rootScope.$on('facebook-login-success', facebookLoggedIn);
        function facebookLoggedIn () {
            mixpanel.track("logged in with facebook");
            ga('send', 'event', 'login success', 'facebook');
            self.loginService = 'facebook';
            self.registerLogin(FacebookService.uid, FacebookService.usr_img, FacebookService.token, FacebookService.subscribed);
        }
        $rootScope.$on('twitter-login-success', twitterLoggedIn);
        function twitterLoggedIn () {
            mixpanel.track("logged in with twitter");
            ga('send', 'event', 'login success', 'twitter');
            self.loginService = 'twitter';
            self.registerLogin(TwitterService.uid, TwitterService.usr_img, TwitterService.token, TwitterService.subscribed);
        }
        $rootScope.$on('googleplus-login-success', googleplusLoggedIn);
        function googleplusLoggedIn () {
            mixpanel.track("logged in with googleplus");
            ga('send', 'event', 'login success', 'googleplus');
            self.loginService = 'googleplus';
            self.registerLogin(GooglePlusService.uid, GooglePlusService.usr_img, GooglePlusService.token, GooglePlusService.subscribed);
        }

        $rootScope.$on('facebook-logout-success', self.registerLogout);
        $rootScope.$on('twitter-logout-success', self.registerLogout);
        $rootScope.$on('googleplus-logout-success', self.registerLogout);

        if ($window.loginDeets) {
            self.registerLogin.apply(this, $window.loginDeets);
            self.loginService = {f: 'facebook', t:'twitter', g:'googleplus'}[$window.loginDeets[0][0]];
        }

    }
]);

