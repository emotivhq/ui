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
		this.userProfileUrl = '/users/' + UserService.uid;
		$scope.userProfileUrl = '/users/' + UserService.uid;
    }

    app.controller('FooterController', [
        '$scope',
        '$location',
		'UserService',
        FooterController]);
}(angular.module('GiftStarterApp')));