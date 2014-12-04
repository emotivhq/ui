/**
 * Created by Stuart on 10/19/14.
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
        .when('/faq',
        {templateUrl: '/scripts/static-pages/faq/faq.html', reloadOnSearch: false})
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
            template: '<div ng-bind-html="content"></div>'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!').html5Mode({enabled: true});

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

function facebookConfig(ezfbProvider, $httpProvider) {
    ezfbProvider.setInitParams({appId: window.fbAppId});
}

GiftStarterApp.controller('ContentRouteController', contentRouteController);

function contentRouteController($scope, $routeParams, $http, $sce) {
    $scope.templateUrl = '';
    var baseUrl = '//content.giftstarter.co/';
    function onRouteUpdate() {
        $scope.templateUrl = baseUrl + $routeParams.path;

        $http.get($scope.templateUrl).then(function(response) {
            $scope.content = $sce.trustAsHtml(extractMain(response.data));
        });
    }

    function extractMain(html) {
        var container = document.createElement('div'),
            bodyTags,
            result;
        container.innerHTML = html;
        bodyTags = container.querySelector('main');
        if (bodyTags.length > 0) {
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
