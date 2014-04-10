/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp', ['ngRoute', 'ezfb']);

GiftStarterApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/friends', {
            templateUrl: '/templates/angular/friendtable.html',
            controller: 'FriendsController'
        }).when('/product', {
            templateUrl: '/templates/angular/product-link.html',
            controller: 'ProductLinkController'
        }).otherwise({
                redirectTo: '/product'
        });
    }]);

GiftStarterApp.config(function(ezfbProvider) {
    console.log("setting api key");
    ezfbProvider.setInitParams({
        appId: '301135316704582'
    });
});
