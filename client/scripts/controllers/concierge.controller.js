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
	jQuery('.mailto').popup();
	jQuery('.phoneto').popup();
	
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
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($scope.email);
    }
		
	
	$scope.sendMsg = function() {
            $http.put('/email/contactus.json',{
                "from_email": $scope.fromemail,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url,
				"msg": $scope.comments
             })
            .success(function (res) {
                resetForm();
                $scope.msg = "We will do our best to respond right away. Check your inbox - or in some cases, spam folder.";
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });

    }
	
	
	
	
}