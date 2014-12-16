/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.config(['$routeProvider','$locationProvider','$httpProvider',
    appConfig]);
GiftStarterApp.config(['ezfbProvider', '$httpProvider', facebookConfig]);

function appConfig($routeProvider,  $locationProvider,  $httpProvider) {
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
        .when('/about',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/concierge',
        {templateUrl: '/scripts/static-pages/concierge/concierge.html', reloadOnSearch: false})
        .when('/faq',
        {templateUrl: '/scripts/static-pages/faq/faq.html', reloadOnSearch: false})
        .when('/partners',
        {templateUrl: '/scripts/static-pages/partners/partners.html', reloadOnSearch: false})
        .when('/terms',
        {templateUrl: '/scripts/static-pages/terms/terms.html', reloadOnSearch: false})
        .when('/privacy',
        {templateUrl: '/scripts/static-pages/privacy/privacy.html', reloadOnSearch: false})
        .when('/what-is-it',
        {templateUrl: '/scripts/static-pages/what-is-it/what-is-it.html'})
        .when('/add-the-button',
        {templateUrl: '/scripts/static-pages/add-the-button/add-the-button.html'})
        .when('/:path*', {
            controller: 'ContentRouteController',
            reloadOnSearch: false,
            template: '<ng-include ng-show="error" src="\'/scripts/four-oh-four.ng.html\'"></ng-include><div id="wp-content" ng-bind-html="content"></div>'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!').html5Mode({enabled: true});

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

function facebookConfig(ezfbProvider, $httpProvider) {
    ezfbProvider.setInitParams({appId: window.fbAppId});
}

GiftStarterApp.controller('ContentRouteController', contentRouteController);

function contentRouteController($scope, $routeParams, $http, $sce, $window) {
    $scope.templateUrl = '';
    var baseUrl = '//content.giftstarter.co/';
    function onRouteUpdate() {
        $scope.templateUrl = baseUrl + $routeParams.path;
        $scope.error = false;

        $http.get($scope.templateUrl).success(function(response) {
            $scope.content = $sce.trustAsHtml(extractMain(response));
            $scope.error = false;
        }).error(function(){
            $scope.content = '';
            $scope.error = true;
        });
    }

    var re = new RegExp('content.giftstarter.co', 'g');
    function replaceLink(ele) {
        ele.host = ele.host.replace(re, $window.location.host);
    }

    function replaceAnchorLinks(ele) {
        var anchors = ele.querySelectorAll('a');
        Array.prototype.slice.call(anchors).forEach(replaceLink);
        return ele;
    }

    function extractMain(html) {
        var container = document.createElement('div'),
            bodyTags,
            result;
        container.innerHTML = html;
        bodyTags = container.querySelector('main');
        console.log(replaceAnchorLinks(bodyTags));
        if (bodyTags == null) {
            result = html;
            console.log('html: ',html);
        } else if (bodyTags.length > 0) {
            result = bodyTags.innerHTML;
        } else if (bodyTags.hasOwnProperty('innerHTML')) {
            result = bodyTags.innerHTML;
        } else {
            result = html;
        }
        container = null;
        return result;
    }
    $scope.$on('$routeChangeSuccess', onRouteUpdate);
    onRouteUpdate();
}
