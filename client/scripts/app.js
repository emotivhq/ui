/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch',
        'ngSanitize', 'ngAB']);
console.log("ver53");

GiftStarterApp.config([
            '$routeProvider','$locationProvider','$httpProvider',
    function($routeProvider,  $locationProvider,  $httpProvider) {
        $routeProvider
            .when('/',
            {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
            .when('/create',
            {templateUrl: '/scripts/giftstart/create/giftstart-create.html', reloadOnSearch: false})
            .when('/giftstart',
            {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
            .when('/giftstart/:title',
            {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
            .when('/giftstart/:title/:object/:attr',
            {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
            .when('/users/:uid',
            {templateUrl: '/scripts/user/profile.html', reloadOnSearch: false})
            .when('/faq',
            {templateUrl: '/scripts/faq/faq.html', reloadOnSearch: false})
            .when('/terms',
            {templateUrl: '/templates/angular/terms.html', reloadOnSearch: false})
            .when('/privacy',
            {templateUrl: '/templates/angular/privacy.html', reloadOnSearch: false})
            .when('/what-is-it',
            {templateUrl: '/templates/angular/what-is-it.html'})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/scripts/home/home.html', {cache: $templateCache});
    $http.get('/scripts/giftstart/create/giftstart-create.html', {cache: $templateCache});
    $http.get('/scripts/giftstart/giftstart.html', {cache: $templateCache});
    $http.get('/scripts/user/profile.html', {cache: $templateCache});
    $http.get('/scripts/popover/popover.html', {cache: $templateCache});
    $http.get('/scripts/popover/email-share/email-share-popover.html', {cache: $templateCache});
    $http.get('/scripts/popover/login/login-popover.html', {cache: $templateCache});
    $http.get('/scripts/popover/note/note-popover.html', {cache: $templateCache});
    $http.get('/scripts/popover/pay/pay-popover.html', {cache: $templateCache});
    $http.get('/scripts/popover/thanks/thanks-popover.html', {cache: $templateCache});
    $http.get('/scripts/giftstart/overlay/overlay.html', {cache: $templateCache});
});

GiftStarterApp.config(
    function(ezfbProvider, $httpProvider) {
        ezfbProvider.setInitParams({appId: window.fbAppId});
    }
);


GiftStarterApp.service('AppStateService', [
            '$location','$window',
    function($location,  $window) {

        var self = this;

        this.getOauthRedirectUrl = function() {
            $location.search('state', self.base64State());
            var url = $location.absUrl();
            $location.search('state', null);
            return url;
        };

        // Returns encoded app state for persisting across OAuth transitions
        this.base64State = function() {
            var state = {};
            if ($location.path() == '/giftstart') {state.gsid = $location.search()['gs-id']}
            if (/\/giftstart\/[a-zA-Z0-9]/.test($location.path())) {state.title_url = $location.path().split('/')[$location.path().split('/').length - 1]}
            if (self.selectedParts) {state.selectedParts = self.selectedParts}
            if (self.contributing != null) {state.contributing = self.contributing}
            if (self.popover) {
                state.popover = self.popover;
                $location.hash(self.popover);
            }
            if (self.thanks) {state.thanks = self.thanks}
            if (self.createSession != null) {state.createSession = self.createSession}

            return btoa(JSON.stringify(state));
        };

        this.overlayState = function(selectedParts) {
            self.selectedParts = selectedParts;
        };

        this.popoverState = function(popoverName) {
            self.popover = popoverName;
        };

        this.contributeLogin = function(bool) {
            self.contributing = bool;
        };

        this.giftstartCreateState = function(createSession) {
            self.createSession = createSession;
        };

        this.thanksState = function(thanksData) {
            self.thanks = thanksData;
        };

        function getAndClear(search) {
            var val = $location.search()[search];
            $location.search(search, null);
            return val;
        }

        if ($location.search().state) {
            this.state = JSON.parse($window.atob($location.search()['state']));
            $location.search('state', null);
            if (this.state.title_url) {
                $location.path('/giftstart/' + this.state.title_url);
            }
        }

        if ($location.search().oauth_token && $location.search().oauth_verifier) {
            this.oauthToken = getAndClear('oauth_token');
            this.oauthVerifier = getAndClear('oauth_verifier');
        }

        if ($location.search().code && $location.search().session_state && $location.search().authuser) {
            // Handle non-FB oauth
            // Make object for authResponse
            self.gplusAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($window.location.search.substr(1).split('&'));
            $location.search('code', null);
            $location.search('session_state', null);
            $location.search('authuser', null);
            $location.search('num_sessions', null);
            $location.search('prompt', null);
        } else if (/access_token/.test($location.hash())) {
            // Handle FB oauth
            self.fbAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($location.hash().split('&'));
        }

        // Delete tracking url as soon as it is seen
        if ($location.search().re) {
            self.referrer = JSON.parse(atob($location.search().re));
            $location.search('re', null);
        }

        if ($location.search().source && $location.search().title &&
            $location.search().product_url) {
            this.referrer = {
                type: 'partner',
                channel: $location.search().source.replace("shopify/", ""),
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            };
            this.giftstartReferralData = $location.search();
            $location.search('title', null);
            $location.search('product_url', null);
        }
    }
]);


GiftStarterApp.controller('whatIsItController', [
            '$scope','$location','ToastService','$http','Analytics',
            '$window',
    function($scope,  $location,  ToastService,  $http,  Analytics,
             $window) {
        $scope.hideVideo = Boolean($location.search().hv);
        $scope.videoWidth = '100%';

        $scope.remindMe = function() {
            $http({
                method: 'PUT', url: '/users/subscribe.json', data: {
                    email: $scope.email,
                    double_opt_in: false
                }
            });
            Analytics.track('client', 'remind me subscribe');
            ToastService.setToast("Awesome!  We'll keep you posted!", 7000);
        };

        // Load YouTube player asynch
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }
]);


// Create youtube iframe on load
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'tA2gcLIJYBU',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        ga('send', 'event', 'client', 'intro-video', 'play');
    } else if (event.data == YT.PlayerState.PAUSED) {
        ga('send', 'event', 'client', 'intro-video', 'pause');
    } else if (event.data == YT.PlayerState.ENDED) {
        ga('send', 'event', 'client', 'intro-video', 'complete');
    }
}
function stopVideo() {
    player.stopVideo();
}