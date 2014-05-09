/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp', ['ngRoute', 'ezfb', 'angularPayments']);

GiftStarterApp.config([
            '$routeProvider','$locationProvider',
    function($routeProvider,  $locationProvider) {
        $routeProvider
            .when('/', {templateUrl: '/templates/angular/product-link.html'})
            .when('/create-giftstart', {templateUrl: '/templates/angular/giftstart-create.html'})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);

GiftStarterApp.run(function($http, $templateCache) {
    // Cache templates!
    $http.get('/templates/angular/giftstart.html', {cache: $templateCache});
    $http.get('/templates/angular/giftstart-create.html', {cache: $templateCache});
    $http.get('/templates/angular/invite-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/login-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/note-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/pay-popover.html', {cache: $templateCache});
    $http.get('/templates/angular/overlay.html', {cache: $templateCache});
    $http.get('/templates/angular/popover.html', {cache: $templateCache});
    $http.get('/templates/angular/product-link.html', {cache: $templateCache});
    $http.get('/templates/angular/thanks-popover.html', {cache: $templateCache});
});

GiftStarterApp.config(function(ezfbProvider) {
    ezfbProvider.setInitParams({
        appId: '301135316704582'
    });
});
