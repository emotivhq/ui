/**
 * Created by Stuart on 11/24/14.
 */

angular.module('GiftStarterApp').directive('gsItHeader', ['$interval',
    '$window', gsItHeader]);

function gsItHeader($interval, $window) {
    var $scope,
        shown = false;

    function link(scope, ele, attr) {
        $scope = scope;
        $scope.shown = false;

        $scope.hideButtonHeader = hideButtonHeader;

        function hideButtonHeader() {$scope.shown = false}
        function showButtonHeader() {$scope.shown = true}
        function onScroll() {
            if (!shown) {
                if (200 < ($window.scrollY || $window.scrollTop)) {
                    shown = true;
                    showButtonHeader();
                }
            }
        }

        var interval = $interval(onScroll, 3000);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/giftstart-it-header.ng.html'
    }
}
