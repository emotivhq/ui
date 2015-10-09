/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

	var ViewController = function ($scope, $location, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {

		function fullContainer() {
			return($location.path() === '/join' || $location.path() === '/create') ? true : false;
		}
		function padContainer() {
			return($location.path() === '/login') ? true : false;
		}
		function redBG() {
			return($location.path() === '/join') ? true : false;
		}		
		$scope.redBG = redBG();
		$scope.fullContainer = fullContainer();
		$scope.paddedContainer = padContainer();
		//alert($scope.fullContainer = " - " + $scope.paddedContainer);

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
      function fullContainer() {
			return($location.path() === '/join' || $location.path() === '/create') ? true : false;
		}
		function padContainer() {
			return($location.path() === '/login') ? true : false;
		}
		function redBG() {
			return($location.path() === '/join') ? true : false;
		}	
		//when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        //$location.hash($routeParams.scrollTo);
        //$anchorScroll();
		$rootScope.redBG = redBG();
		$rootScope.fullContainer = fullContainer();
		$rootScope.paddedContainer = padContainer();
		//alert($rootScope.fullContainer = " r-r " + $rootScope.paddedContainer);
		
		// semantic transition on view change
		jQuery('#angular-view').transition('fade in');
      });
    })

}(angular.module('GiftStarterApp')));
