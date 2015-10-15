/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.service('UserService', ['$http', '$rootScope', '$cookieStore',
    '$window', '$timeout', 'FacebookService', 'TwitterService', 'GooglePlusService', 'emailLoginService',
    'Analytics', UserService]);

function UserService($http, $rootScope, $cookieStore, $window, $timeout, FacebookService, TwitterService, GooglePlusService, emailLoginService, Analytics) {
    this.uid = -1;
    this.loggedIn = false;
    this.name = '';
    this.profileImageUrl = '';
    this.isStripeCustomer = false;
    this.loginService = '';
    this.onMailingList = false;
    this.email = '';
    this.referrer = {};
    this.hasPitchedIn = false;
    var self = this;
    this.uploadProfileImage = uploadProfileImage;
    this.getUser = function (uid, callback) {
        Analytics.track("user", "user fetch initiated");
        $http({
            method: 'GET',
            url: '/users/' + uid + '.json'
        }).success(statFetchSuccess).error(Analytics.track("user", "user fetch failed"));

        function statFetchSuccess(response) {
            Analytics.track("user", "user fetch succeeded");
            callback(response);
        }
    };
    this.isSystemDefaultProfileImage = function (uid, callback) {
        $http({
            method: 'GET',
            url: '/users/' + uid + '.json'
        }).success(function (data) {
            var u = data[Object.keys(data)[0]];
            callback(u.is_system_default_profile_image);
        });
    };
    this.registerLogin = function (uid, profileImageUrl, token, onMailingList, name, has_pitched_in) {
        Analytics.track('login', uid);
        Analytics.userid(uid);
        Analytics.identify(uid, {
            name: name
        });
        self.uid = uid;
        self.token = token;
        self.name = name;
        self.profileImageUrl = profileImageUrl;
        self.loggedIn = true;
        self.onMailingList = onMailingList;
        self.hasPitchedIn = has_pitched_in;
        $rootScope.uid = uid;
        $rootScope.token = token;
        $cookieStore.put('uid', uid);
        $cookieStore.put('token', token);
        //cookies take time to propagate
        $timeout(function () {
            $rootScope.$broadcast('login-success');
        }, 500);
        if(uid[0] == 'f') {
            FacebookService.getTaggableFriends()
        }
    };
    this.logout = function () {
        if(self.loginService === 'facebook') {
            FacebookService.logout();
        } else if(self.loginService === 'twitter') {
            TwitterService.logout();
        } else if(self.loginService === 'googleplus') {
            GooglePlusService.logout();
        } else if(self.loginService === 'emaillogin') {
            emailLoginService.logout();
        }
        self.registerLogout();
    };
    this.registerLogout = function () {
        self.loggedIn = false;
        self.uid = -1;
        self.profileImageUrl = '';
        $rootScope.uid = -1;
        $rootScope.token = -1;
        $cookieStore.remove('uid');
        $cookieStore.remove('token');
        $rootScope.$broadcast('logout-success');
    };
    this.isUserEmailLogin = function () {
        return self.loggedIn && self.uid.substring(0, 1).toLowerCase() == 'e';
    };

    function uploadProfileImage(imageData) {
        console && console.log && console.log(imageData);
        var contentType = imageData.split(';')[0].replace('data:', '');
        return $http({
            method: 'PUT',
            headers: {
                'Content-Type': contentType
            },
            url: '/users/' + self.uid + '/img/new.json',
            data: {
                data: imageData
            }
        });
    }
    $rootScope.$on('facebook-login-success', facebookLoggedIn);

    function facebookLoggedIn() {
        Analytics.track('user', 'logged in with facebook');
        self.loginService = 'facebook';
        self.registerLogin(FacebookService.uid, FacebookService.usr_img, FacebookService.token, FacebookService.subscribed, FacebookService.name, FacebookService.has_pitched_in);
    }
    $rootScope.$on('twitter-login-success', twitterLoggedIn);

    function twitterLoggedIn() {
        Analytics.track('user', 'logged in with twitter');
        self.loginService = 'twitter';
        self.registerLogin(TwitterService.uid, TwitterService.usr_img, TwitterService.token, TwitterService.subscribed, TwitterService.name, TwitterService.has_pitched_in);
    }
    $rootScope.$on('googleplus-login-success', googleplusLoggedIn);

    function googleplusLoggedIn() {
        Analytics.track('user', 'logged in with googleplus');
        self.loginService = 'googleplus';
        self.registerLogin(GooglePlusService.uid, GooglePlusService.usr_img, GooglePlusService.token, GooglePlusService.subscribed, GooglePlusService.name, GooglePlusService.has_pitched_in);
    }
    $rootScope.$on('email-login-success', emailLoggedIn);

    function emailLoggedIn() {
        Analytics.track('user', 'logged in with email');
        self.loginService = 'emaillogin';
        self.registerLogin(emailLoginService.uid, emailLoginService.usr_img, emailLoginService.token, emailLoginService.subscribed, emailLoginService.name, emailLoginService.has_pitched_in);
    }
    $rootScope.$on('facebook-logout-success', self.registerLogout);
    $rootScope.$on('twitter-logout-success', self.registerLogout);
    $rootScope.$on('googleplus-logout-success', self.registerLogout);
    $rootScope.$on('linkedin-logout-success', self.registerLogout);
    $rootScope.$on('email-logout-success', self.registerLogout);
    if($window.loginDeets) {
        // base64 decode the name - for unicode chars in names
        $window.loginDeets[4] = decodeURIComponent(escape(atob($window.loginDeets[4])));
        self.registerLogin.apply(this, $window.loginDeets);
        self.loginService = {
            f: 'facebook',
            t: 'twitter',
            g: 'googleplus',
            e: 'emaillogin'
        }[$window.loginDeets[0][0]];
    }
}