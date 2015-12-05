/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope', '$http', '$timeout', '$location', 'UserService', 
    ConciergeController]);

function ConciergeController($scope, $http, $timeout, $location, UserService) {
	
	$scope.showConciergeButton = false;
	if(!UserService.loggedIn && $location.path() === '/concierge') {
		$location.path('/is/concierge');22
	}
	if(UserService.loggedIn && $location.path() === '/is/concierge') {
		$scope.showConciergeButton = true;
		$location.path('/concierge');
	}
	
	//Semantic UI
	// Tabs
	jQuery('.menu .item').tab();
	
    $scope.msg = "";
    $scope.validForm = true;
    
    var resetForm = function() {
        $scope.fromemail = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.comments = ""; 
        $scope.conciergeform.$setUntouched();
    };

	$scope.validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            isValid = re.test($scope.email);
        return isValid;
    }

    $scope.sendMsg = function() {
        if ($scope.validateForm()) {
            $http({
                method: "POST",
                dataType: 'jsonp',
                url: 'https://docs.google.com/forms/d/13cnJDPtW0plkxXi3cgBu844ETrtzbw9JgWWaeqj-0UY/formResponse',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                params: {
                    'entry_1538055563': $scope.email,
                    'entry_1003504959': $scope.title, 
                    'entry_727663111': $scope.budget, 
                    'entry_1647489740': $scope.url, 
                    'entry_1284484267': $scope.comments
                }
            })
            .then(function () {
            },
            function (res) {
                if (res.status === 0) {
                    resetForm();
                    $scope.validForm = true;
                    $scope.msg = "We will do our best to respond today, definitely within 24 hours.";
                    $timeout(function() {
                        $scope.msg = "";
                    }, 6000);
                } else {
                    $scope.validForm = false;
                    $scope.msg = "An error has occured. Please try again later."
                }
            });
        } else {
            $scope.validForm = false;
            $scope.msg = "Before we proceed, please enter a valid email address.";
        }
    }
}
