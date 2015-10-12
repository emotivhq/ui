/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var FooterController = function ($scope, $location, UserService) {
        $scope.location = $location;
		$scope.loggedIn = UserService.loggedIn;
		this.loggedIn = UserService.loggedIn;		
    }

    app.controller('FooterController', [
        '$scope',
        '$location',
		'UserService',
        FooterController]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function (app) {
    var SearchController = function ($scope, $location) {
        var self = this;        
        this.thisRoute = $location.path().toString();
        $scope.isProvidence = self.thisRoute == '/yourvillage';
    };
    app.controller('SearchController', [
        '$scope',
        '$location',
        SearchController
        ]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

	var ViewController = function ($scope, $location, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {
		function redBG() {
			return($location.path() === '/join') ? true : false;
		}		
		$scope.redBG = redBG();
	};

    app.controller('ViewController', [
        '$scope',
        '$location',
        'Analytics',
        '$rootScope',
        '$interval',
        '$timeout',
        '$window',
        '$http',
        '$anchorScroll',
        ViewController])
    .run(function($rootScope, $location, $anchorScroll, $routeParams) {
		function redBG() {
			return($location.path() === '/join') ? true : false;
		}	
		//when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        //$location.hash($routeParams.scrollTo);
        //$anchorScroll();
		$rootScope.redBG = redBG();
		
		// semantic transition on view change
		jQuery('#angular-view').transition('fade in');
      });
    })

}(angular.module('GiftStarterApp')));
