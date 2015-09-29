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
        .when('/yourvillage',
        {templateUrl: '/views/yourvillage/yourvillage.html', reloadOnSearch: false})
        .when('/test',
        {templateUrl: '/views/home/home.html', reloadOnSearch: false})
        .when('/create',
        {templateUrl: '/scripts/giftstart/create/giftstart-create.html', reloadOnSearch: false})
        .when('/giftstart',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/:object/:attr',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/print',
        {templateUrl: '/scripts/giftstart/print/print.html', reloadOnSearch: false})
        .when('/login',
        {templateUrl: '/views/login/login.html', reloadOnSearch: false})
        .when('/join:uid',
        {templateUrl: '/views/join/join.html', reloadOnSearch: false})
        .when('/users/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/user/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/about',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/concierge',
        {templateUrl: '/scripts/static-pages/concierge/concierge.html', reloadOnSearch: false})
        .when('/faq',
        {templateUrl: '/scripts/static-pages/faq/faq.html', reloadOnSearch: false})
        .when('/howitworks',
        {templateUrl: '/scripts/static-pages/howitworks/howitworks.html', reloadOnSearch: false})
        .when('/oldbrowser',
        {templateUrl: '/scripts/static-pages/oldbrowser/oldbrowser.html', reloadOnSearch: false})
        .when('/partners',
        {templateUrl: '/scripts/static-pages/partners/partners.html', reloadOnSearch: false})
        .when('/portal',
        {templateUrl: '/scripts/partnerportal/partnerportal.html', reloadOnSearch: false})
        .when('/press',
        {templateUrl: '/scripts/static-pages/press/press.html', reloadOnSearch: false})
        .when('/terms',
        {templateUrl: '/scripts/static-pages/terms/terms.html', reloadOnSearch: false})
        .when('/privacy',
        {templateUrl: '/scripts/static-pages/privacy/privacy.html', reloadOnSearch: false})
        .when('/what-is-it',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/add-the-button',
        {templateUrl: '/scripts/partnerportal/partnerportal.html'})
        .when('/reset/:resetCode',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/:searchTerm',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas/:term*',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
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
//    $scope.templateUrl = '';
//    var baseUrl = '/blog/'; //content.giftstarter.com/';
    function onRouteUpdate() {
//        $scope.templateUrl = baseUrl + $routeParams.path;
//        $scope.error = false;
//        $http.get($scope.templateUrl).success(function(response) {
//            $scope.content = $sce.trustAsHtml(extractMain(response));
//            $scope.error = false;
//        }).error(function(){
            $scope.content = '';
            $scope.error = true;
//        });
    }

//    var re = new RegExp('content.giftstarter.com', 'g');
//    function replaceLink(ele) {
//        ele.host = ele.host.replace(re, $window.location.host);
//    }

//    function replaceAnchorLinks(ele) {
//        var anchors = ele.querySelectorAll('a');
//        Array.prototype.slice.call(anchors).forEach(replaceLink);
//        return ele;
//    }

    function extractMain(html) {
        return $(html).find('.site-inner').html()+'<link rel="stylesheet" id="open-sans-css" href="//fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&amp;subset=latin%2Clatin-ext&amp;ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="dashicons-css" href="http://content.giftstarter.com/wp-includes/css/dashicons.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="admin-bar-css" href="http://content.giftstarter.com/wp-includes/css/admin-bar.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="menu-image-css" href="http://content.giftstarter.com/wp-content/plugins/menu-image/menu-image.css?ver=1.1" type="text/css" media="all"><!--link rel="stylesheet" id="googlefonts-css" href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400&amp;subset=latin" type="text/css" media="all"--><link rel="stylesheet" id="omega-style-css" href="http://content.giftstarter.com/wp-content/themes/omega/style.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="footer-credits-css" href="http://content.giftstarter.com/wp-content/plugins/footer-putter/styles/footer-credits.css?ver=1.11" type="text/css" media="all">';
        /*
        var container = document.createElement('div'),
            bodyTags,
            result;
        container.innerHTML = html;
        bodyTags = container.querySelector('main');
        //console && console.log && console.log(replaceAnchorLinks(bodyTags));
        if (bodyTags == null) {
            result = html;
            console && console.log && console.log('html: ',html);
        } else if (bodyTags.length > 0) {
            result = bodyTags.innerHTML;
        } else if (bodyTags.hasOwnProperty('innerHTML')) {
            result = bodyTags.innerHTML;
        } else {
            result = html;
        }
        container = null;
        return result;
        */
    }
    $scope.$on('$routeChangeSuccess', onRouteUpdate);
    onRouteUpdate();
}
