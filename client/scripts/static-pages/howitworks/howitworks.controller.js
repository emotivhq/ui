/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HowItWorksController = function ($scope, $location, UserService) {
        $scope.location = $location;
		$scope.loggedIn = UserService.loggedIn;
		this.loggedIn = UserService.loggedIn;
        $scope.sectionShown = "welcome";
		/* semantic ui embed */
		jQuery('.youtube .ui.embed').embed({
			parameters: {
        		autohide       : false,
        		autoplay       : false,
        		modestbranding : 1
      			}
		});
		
		
    }

    app.controller('HowItWorksController', [
        '$scope',
        '$location',
		'UserService',
        HowItWorksController]);
}(angular.module('GiftStarterApp')));