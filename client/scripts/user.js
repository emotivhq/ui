/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('UserService', [
            '$http','$rootScope','$cookieStore','$window','FacebookService','TwitterService','GooglePlusService',
            'Analytics',
    function($http,  $rootScope,  $cookieStore,  $window,  FacebookService,  TwitterService,  GooglePlusService,
             Analytics) {
        this.uid = -1;
        this.loggedIn = false;
        this.name = '';
        this.profileImageUrl  = '';
        this.isStripeCustomer = false;
        this.loginService = '';
        this.onMailinList = false;

        var self = this;

        this.getUser = function(uid, callback) {
            Analytics.track("user", "user fetch initiated");
            $http({method: 'GET', url: '/userstats?uid=' + uid})
                .success(statFetchSuccess)
                .error(Analytics.track("user", "user fetch failed"));

            function statFetchSuccess(response) {
                Analytics.track("user", "user fetch succeeded");
                callback(response);
            }
        };

        this.registerLogin = function(uid, profileImageUrl, token, onMailingList, name) {
            mixpanel.identify(uid);
            mixpanel.people.set({'$last_login': new Date()});
            Analytics.track('login', uid);
            self.uid = uid;
            self.token = token;
            self.name = name;
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

        $rootScope.$on('facebook-login-success', facebookLoggedIn);
        function facebookLoggedIn () {
            Analytics.track('user', 'logged in with facebook');
            self.loginService = 'facebook';
            self.registerLogin(FacebookService.uid, FacebookService.usr_img, FacebookService.token,
                FacebookService.subscribed, FacebookService.name);
        }
        $rootScope.$on('twitter-login-success', twitterLoggedIn);
        function twitterLoggedIn () {
            Analytics.track('user', 'logged in with twitter');
            self.loginService = 'twitter';
            self.registerLogin(TwitterService.uid, TwitterService.usr_img, TwitterService.token,
                TwitterService.subscribed, TwitterService.name);
        }
        $rootScope.$on('googleplus-login-success', googleplusLoggedIn);
        function googleplusLoggedIn () {
            Analytics.track('user', 'logged in with googleplus');
            self.loginService = 'googleplus';
            self.registerLogin(GooglePlusService.uid, GooglePlusService.usr_img, GooglePlusService.token,
                GooglePlusService.subscribed, GooglePlusService.name);
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

GiftStarterApp.controller('UserController', [
            '$scope','UserService','$location',
    function($scope,  UserService,  $location) {
        $scope.user = {};

        UserService.getUser($location.search()['uid'], function(data) {
            $scope.user = data[Object.keys(data)[0]];
        })
    }
]);

