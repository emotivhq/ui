/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp', ['ngRoute', 'ezfb', 'angularPayments']);

GiftStarterApp.config([
            '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {templateUrl: '/templates/angular/product-link.html'})
            .when('/create-giftstart', {templateUrl: '/templates/angular/giftstart-create.html'})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .otherwise({redirectTo: '/home'});
    }]);

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
    console.log("templates loaded!");

});

GiftStarterApp.config(function(ezfbProvider) {
    ezfbProvider.setInitParams({
        appId: '301135316704582'
    });
});
