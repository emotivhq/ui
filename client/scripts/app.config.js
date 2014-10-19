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
        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!').html5Mode({enabled: true});

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

function facebookConfig(ezfbProvider, $httpProvider) {
    ezfbProvider.setInitParams({appId: window.fbAppId});
}