/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout','AppStateService',
            '$location','ToastService','$interval','GiftStart',
    function($scope,  Analytics,  $window,  $http,  $timeout,  AppStateService,
             $location, ToastService,  $interval, GiftStart) {
        Analytics.track('client', 'loaded home');
window.gs = GiftStart;
        if (AppStateService.state) {
            if (AppStateService.state.gsid) {
                $location.path('/giftstart').search('gs-id', AppStateService.state.gsid);
            } else if (AppStateService.state.createSession) {
                $location.path('/create');
            }
        }

        $scope.hotCampaigns = {};

        $http({method: 'GET', url: '/giftstart/api/hot-campaigns?num_campaigns=2'})
            .success(function(data) {
                Analytics.track("client", "hot campaigns load succeeded");
                $scope.hotCampaigns = data;

                // Cache images
                for(var j = 0; j < $scope.hotCampaigns.pitchins.length; j++) {
                    for (var i = 0; i < $scope.hotCampaigns.pitchins[j].length; i++) {
                        var image = new Image();
                        image.src = $scope.hotCampaigns.pitchins[j][i].img;
                    }
                }

            }).error(function(data) {
                Analytics.track("client", "hot campaigns load failed");
            });

        $scope.reachOutNotReadyYet = function() {
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
        if (!$location.search().TESTING_OMG) {
            fadeInComment();
            $interval(fadeInComment, 7000);
        }
    }
]);