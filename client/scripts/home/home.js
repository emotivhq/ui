/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('HomeController', [
            '$scope', 'Analytics', '$window', '$http', '$timeout', 'AppStateService',
            '$location', 'ToastService', '$interval', '$routeParams', '$rootScope', 'PopoverService',
    function ($scope, Analytics, $window, $http, $timeout, AppStateService, $location, ToastService, $interval, $routeParams, $rootScope, PopoverService) {
        if(new Date().getTime() < 1427871599000 && !device.mobile() && !$window.sessionStorage.getItem('seenSweepsMarch') && !$routeParams.searchTerm && !$window.sessionStorage.getItem('fromSearch')) {
            // Showing per browser session
            PopoverService.setPopover('sweepstakes');
            $window.sessionStorage.setItem('seenSweepsMarch', 'yes')
        }
        Analytics.track('client', 'loaded home');
        if(AppStateService.state) {
            if(AppStateService.state.gsid) {
                $location.path('/giftstart').search('gs-id', AppStateService.state.gsid);
            } else if(AppStateService.state.createSession) {
                $location.path('/create');
            }
        }
        if($routeParams.resetCode) {
            $rootScope.$broadcast('password-reset-requested');
        }
        if($routeParams.searchTerm) {
            $timeout(function () {
                $window.sessionStorage.setItem('searchTermFromUrl', $routeParams.searchTerm);
                $rootScope.$broadcast('performSearchFromUrl');
            }, 200);
        }
        $scope.topCampaigns = {};
        $http({
            method: 'GET',
            url: '/giftstart/api/hot-campaigns?num_campaigns=2'
        }).success(function (data) {
            Analytics.track("client", "hot campaigns load succeeded");
            $scope.topCampaigns = data;
            // Cache images
            for(var j = 0; j < $scope.topCampaigns.pitchins.length; j++) {
                for(var i = 0; i < $scope.topCampaigns.pitchins[j].length; i++) {
                    var image = new Image();
                    image.src = $scope.topCampaigns.pitchins[j][i].img;
                }
            }
        }).error(function (data) {
            Analytics.track("client", "hot campaigns load failed");
        });
        $scope.reachOutNotReadyYet = function () {
            Analytics.track("client", "reach out not ready yet");
            ToastService.setToast("Oops!  Reaching out to friends isn't quite ready yet.<br>Thanks for letting us know you're interested!", 7000);
        };
        $scope.pitchinIndex = 0;
        $scope.fadedIn = false;

        function fadeInComment() {
            $scope.pitchinIndex += 1;
            $scope.fadedIn = true;
            $timeout(fadeOutComment, 6800);
        }

        function fadeOutComment() {
            $scope.fadedIn = false;
        }
        if(!$location.search().TESTING_OMG) {
            fadeInComment();
            $interval(fadeInComment, 7000);
        }
        $scope.goToLink = function (destination) {
            $location.path("/" + destination);
        };
    }
]);