/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('FaqController', ['$scope','$location','$timeout',
    FaqController]);

function FaqController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.openQuestions = [];

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

    $scope.toggleQuestion = function(question) {
        if($scope.openQuestions.indexOf(question) != -1) {
            $scope.openQuestions.splice($scope.openQuestions.indexOf(question), 1);
        } else {
            $scope.openQuestions.push(question);
        }
    };
}