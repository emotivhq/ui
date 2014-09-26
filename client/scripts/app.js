/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch', 'ngSanitize']);
console.log("ver53");

GiftStarterApp.config([
            '$routeProvider','$locationProvider','$httpProvider',
    function($routeProvider,  $locationProvider,  $httpProvider) {
        $routeProvider
            .when('/', {templateUrl: '/templates/angular/home.html', reloadOnSearch: false})
            .when('/create', {templateUrl: 'templates/angular/giftstart-create-campaign.html',
                reloadOnSearch: false})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .when('/giftstart/:title', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .when('/users/:uid', {templateUrl: '/templates/angular/user.html', reloadOnSearch: false})
            .when('/faq', {templateUrl: '/templates/angular/faq.html', reloadOnSearch: false})
            .when('/terms', {templateUrl: '/templates/angular/terms.html', reloadOnSearch: false})
            .when('/privacy', {templateUrl: '/templates/angular/privacy.html', reloadOnSearch: false})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/templates/angular/faq.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart.html', {cache: $templateCache});
    $http.get('/templates/angular/user.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-campaign.html', {cache: $templateCache});
    $http.get('/templates/angular/login-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/note-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/pay-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/overlay.html', {cache: $templateCache});
    $http.get('/templates/angular/popover.html', {cache: $templateCache});
    $http.get('/templates/angular/thanks-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/email-share-popover.html', {cache: $templateCache});
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
            if (self.popover) {state.popover = self.popover}
            if (self.contributing != null) {state.contributing = self.contributing}
            if (self.createSession != null) {state.createSession = self.createSession}

            return btoa(JSON.stringify(state));
        };

        this.overlayState = function(selectedParts) {self.selectedParts = selectedParts};

        this.popoverState = function(popoverName) {self.popover = popoverName};

        this.contributeLogin = function(bool) {
            self.contributing = bool
        };

        this.giftstartCreateState = function(createSession) {
            self.createSession = createSession;
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
            $location.search('');
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
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                })
            };
            this.giftstartReferralData = $location.search();
            $location.search('');
        }
    }
]);
