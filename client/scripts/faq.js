/**
 * Created by stuart on 7/31/14.
 */

GiftStarterApp.controller('FaqController', [
            '$scope','$location','$timeout',
    function($scope,  $location,  $timeout) {
        $scope.location = $location;

        $scope.scrollToSearch = function() {
            console.log("Scrolling to " + '#'+Object.keys($location.search())[0]);
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        };

        $scope.$watch('location.search()', function() {
            $timeout($scope.scrollToSearch, 400);
            $timeout($scope.scrollToSearch, 700);
        });
    }
]);