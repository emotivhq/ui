/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp', ['ngRoute', 'ezfb', 'angularPayments']);

GiftStarterApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/friends', {templateUrl: '/templates/angular/friendtable.html'})
            .when('/product', {templateUrl: '/templates/angular/product-link.html'})
            .when('/giftstart', {templateUrl: '/templates/angular/giftstart.html', reloadOnSearch: false})
            .otherwise({redirectTo: '/product'});
    }]);

GiftStarterApp.config(function(ezfbProvider) {
    ezfbProvider.setInitParams({
        appId: '301135316704582'
    });
});
