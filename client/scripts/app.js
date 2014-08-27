/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch', 'ngSanitize']);
console.log("ver28");

GiftStarterApp.config([
            '$routeProvider','$locationProvider','$httpProvider',
    function($routeProvider,  $locationProvider,  $httpProvider) {
        $routeProvider
            .when('/', {templateUrl: '/templates/angular/home.html'})
            .when('/shipping-contact', {templateUrl: '/templates/angular/giftstart-create-shipping.html'})
            .when('/campaign-create', {templateUrl: 'templates/angular/giftstart-create-campaign.html'})
            .when('/create-giftstart', {templateUrl: '/templates/angular/giftstart-create.html'})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .when('/faq', {templateUrl: '/templates/angular/faq.html'})
            .when('/terms', {templateUrl: '/templates/angular/terms.html'})
            .when('/privacy', {templateUrl: '/templates/angular/privacy.html'})
            .when('/team-email-authorize', {templateUrl: '/templates/angular/team_email_authorize.html'})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/templates/angular/faq.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-campaign.html', {cache: $templateCache});
    $http.get('/templates/angular/login-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/note-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/pay-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/overlay.html', {cache: $templateCache});
    $http.get('/templates/angular/popover.html', {cache: $templateCache});
    $http.get('/templates/angular/thanks-popover.html', {cache: $templateCache});
});

GiftStarterApp.config(
    function(ezfbProvider, $httpProvider) {
        ezfbProvider.setInitParams({appId: window.fbAppId});
        $httpProvider.defaults.useXDomain = true;
    }
);
