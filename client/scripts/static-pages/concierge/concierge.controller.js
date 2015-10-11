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

    var validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($scope.email);
    }
	// Semantic ui
	jQuery('.menu .item').tab();

    $scope.sendMsg = function() {
        if (validateForm()) {
            $http.put('/email/contactus.json',{
                "from_email": $scope.email,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url
            })
            .success(function (res) {
                resetForm();
                $scope.msg = "Thank you! We'll do our best to respond on the same day, definitely within 24 hours. Please add giftconcierge@giftstarter.com to your address book to make sure you'll receive the reply."
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });
        } else {
            $scope.msg = "Please enter a valid email address.";
        }
    }
}

