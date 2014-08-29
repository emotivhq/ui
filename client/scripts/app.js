/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch']);
console.log("ver28");

GiftStarterApp.config([
            '$routeProvider','$locationProvider',//'$location',
    function($routeProvider,  $locationProvider) {
        $routeProvider
            .when('/', {templateUrl: '/templates/angular/home.html', reloadOnSearch: false})
            .when('/shipping-contact', {templateUrl: '/templates/angular/giftstart-create-shipping.html',
                reloadOnSearch: false})
            .when('/campaign-create', {templateUrl: 'templates/angular/giftstart-create-campaign.html',
                reloadOnSearch: false})
            .when('/create-giftstart', {templateUrl: '/templates/angular/giftstart-create.html', reloadOnSearch: false})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .when('/faq', {templateUrl: '/templates/angular/faq.html', reloadOnSearch: false})
            .when('/terms', {templateUrl: '/templates/angular/terms.html', reloadOnSearch: false})
            .when('/privacy', {templateUrl: '/templates/angular/privacy.html', reloadOnSearch: false})
            .when('/team-email-authorize', {templateUrl: '/templates/angular/team_email_authorize.html',
                reloadOnSearch: false})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/templates/angular/faq.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-campaign.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-shipping.html', {cache: $templateCache});
    $http.get('/templates/angular/login-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/note-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/pay-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/overlay.html', {cache: $templateCache});
    $http.get('/templates/angular/popover.html', {cache: $templateCache});
    $http.get('/templates/angular/product-link.html', {cache: $templateCache});
    $http.get('/templates/angular/thanks-popover.html', {cache: $templateCache});
});

GiftStarterApp.config(
    function(ezfbProvider, $httpProvider) {
        ezfbProvider.setInitParams({appId: window.fbAppId});
        $httpProvider.defaults.useXDomain = true;
    }
);


GiftStarterApp.service('AppStateService', [
            '$location','$window',
    function($location,  $window) {

        var self = this;

        this.getTwitterRedirectUrl = function() {
            $location.search('state', self.base64State());
            var url = $location.absUrl();
            $location.search('state', null);
            return url;
        };

        this.base64State = function() {
            var state = {};
            if ($location.path() == '/giftstart') {state.gsid = $location.search()['gs-id']}
            if (self.selectedParts) {state.selectedParts = self.selectedParts}
            if (self.popover) {state.popover = self.popover}
            if (self.contributing != null) {state.contributing = self.contributing}

            return btoa(JSON.stringify(state));
        };

        this.overlayState = function(selectedParts) {self.selectedParts = selectedParts};

        this.popoverState = function(popoverName) {self.popover = popoverName};

        this.contributeLogin = function(bool) {
            self.contributing = bool
        };

        this.giftstartCreateState = function(createSession) {

        };

        function getAndClear(search) {
            var val = $location.search()[search];
            $location.search(search, null);
            return val;
        }

        if ($location.search()['state']) {
            this.state = JSON.parse($window.atob($location.search()['state']));
            $location.search('state', null);
        }

        if ($location.search().oauth_token && $location.search().oauth_verifier) {
            self.oauthToken = getAndClear('oauth_token');
            self.oauthVerifier = getAndClear('oauth_verifier');
        }

        if ($location.search().code && $location.search().session_state && $location.search().authuser) {
            self.authResponse = (function(a) {
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
        }

        console.log(self);
    }
]);