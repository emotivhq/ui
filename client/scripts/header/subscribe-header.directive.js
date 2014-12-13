/**
 * Created by Stuart on 12/5/14.
 */

angular.module('GiftStarterApp').directive('gsSubscribeHeader', ['$location',
    'Analytics', '$timeout', 'UserService', gsSubscribeHeader]);

function gsSubscribeHeader($location, Analytics, $timeout, UserService) {
    var $scope,
        show = $location.path().indexOf('/giftstart') == -1 &&
            !UserService.onMailingList;

    function link(scope, ele, attr) {
        $scope = scope;

        $scope.subscribeShow = true;
        $scope.hideSubscribeHeader = hideHeader;
        $scope.subscribeClicked = subscribeClicked;

        function hideHeader() {$scope.subscribeShow = false}
        function showHeader() {$scope.subscribeShow = true}

        function subscribeClicked() {
            Analytics.track('client', 'header email subscribed');
        }

        $timeout(function() {
            if (show) {
                showHeader();
                show = false;
            }
        }, 1500);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/subscribe-header.ng.html'
    }
}
