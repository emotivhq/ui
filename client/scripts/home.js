/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout','AppStateService',
            '$location','ToastService','$interval',
    function($scope,  Analytics,  $window,  $http,  $timeout,  AppStateService,
             $location, ToastService,  $interval) {
        Analytics.track('client', 'loaded home');

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
//        fadeInComment();
//        $interval(fadeInComment, 7000);
    }
]);

GiftStarterApp.directive('gsHotCampaign', function(Analytics, $location) {
    function link(scope, element, attrs) {
        scope.goToUrl = function() {
            Analytics.track("client", "hot campaigns clicked");
            $location.path('giftstart').search('').search('gs-id',
                scope.campaign.giftstart.gsid)
        };
    }

    return {
        restrict: 'E',
        scope: {campaign: '=', pitchins: '=', index: '=', fadeIn: '='},
        link: link,
        templateUrl: '/templates/angular/hot-campaign.html'
    };
});