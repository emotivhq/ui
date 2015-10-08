/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

	var ViewController = function ($scope, $location, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {

		function isFull() {
			return($location.path() === '/join') ? true : false;
		}
		function padHeader() {
			return($location.path() === '/login') ? true : false;
		}
		$scope.fullContainer = isFull();
		$scope.paddedContainer = padHeader();

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
      function isFull() {
			return($location.path() === '/join') ? true : false;
		}
		function padHeader() {
			return($location.path() === '/login') ? true : false;
		}
		//when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        //$location.hash($routeParams.scrollTo);
        //$anchorScroll();
		$rootScope.fullContainer = isFull();
		$rootScope.paddedContainer = padHeader();
		//alert($rootScope.fullContainer = " - " + $rootScope.paddedContainer);
		
		// semantic transition on view change
		jQuery('#angular-view').transition('fade in');
      });
    })

}(angular.module('GiftStarterApp')));
