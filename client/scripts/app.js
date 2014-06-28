/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp', ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies']);

GiftStarterApp.config([
            '$routeProvider','$locationProvider',
    function($routeProvider,  $locationProvider) {
        $routeProvider
            .when('/', {templateUrl: '/templates/angular/home.html'})
            .when('/shipping-contact', {templateUrl: '/templates/angular/giftstart-create-shipping.html'})
            .when('/campaign-create', {templateUrl: 'templates/angular/giftstart-create-campaign.html'})
            .when('/create-giftstart', {templateUrl: '/templates/angular/giftstart-create.html'})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .when('/faq', {templateUrl: '/templates/angular/faq.html'})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');

        mixpanel.track("App loaded");
        ga('send', 'event', 'app', 'loaded');
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/templates/angular/faq.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-campaign.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create-shipping.html', {cache: $templateCache});
    $http.get('/templates/angular/invite-popover.html', {cache: $templateCache});
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
        ezfbProvider.setInitParams({appId: '301135316704582'});
        $httpProvider.defaults.useXDomain = true;
    }
);
