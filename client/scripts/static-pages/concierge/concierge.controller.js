/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope', '$http',
    ConciergeController]);

function ConciergeController($scope, $http) {

    var resetForm = function() {
        $scope.email = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.msg = "";
    };

    resetForm();

    $scope.validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            isValid = re.test($scope.email);
        $scope.msg = isValid ? '' : $scope.msg;
        
        return isValid;
    }
	// Semantic ui
	jQuery('.menu .item').tab();

    $scope.sendMsg = function() {
        if ($scope.validateForm()) {
            $http.put('/email/contactus.json',{
                "from_email": $scope.email,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url
            })
            .success(function (res) {
                resetForm();
                $scope.msg = "We'll do our best to respond today, definitely within 24 hours."
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });
        } else {
            $scope.msg = "Before we proceed, please enter a valid email address.";
        }
    }
}

