/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope','$location','$timeout',
    ConciergeController]);

function ConciergeController($scope,  $location,  $timeout) {
    $scope.location = $location;
    $scope.email = "";
    $scope.title = "boo";
    $scope.budget = "";
    $scope.url = "";
    $scope.msg = "hi";

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });

    var resetForm = function() {
        $scope.email = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.msg = "";
    };

    var validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($scope.email);
    }

    $scope.sendMsg = function() {
        if (validateForm()) {
            $http.post('/email/contactus.json',{
                "from_email": $scope.email,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url
            })
            .success(function (res) {
                $scope.msg = "Thank you! We'll do our best to respond on the same day, definitely within 24 hours. Please add giftconcierge@giftstarter.co to your address book to make sure you'll receive the reply."
                resetForm();
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });
        }
    }
}

