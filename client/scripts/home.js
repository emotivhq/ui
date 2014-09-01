/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout','AppStateService','$location',
    function($scope,  Analytics,  $window,  $http,  $timeout,  AppStateService,  $location) {
        Analytics.track('client', 'loaded home');

        if (AppStateService.state) {
            if (AppStateService.state.gsid) {
                $location.path('/giftstart').search('gs-id', AppStateService.state.gsid);
            } else if (AppStateService.state.createSession) {
                $location.path('/create');
            }
        }

        $scope.retailerClick = function(retailerUrl, retailerName) {
            $window.open(retailerUrl, retailerName);
            Analytics.track('client', 'reatiler clicked ' + retailerName);
        };

        $scope.productClicked = function(productUrl, productName) {
            $window.open(productUrl, productName);
            Analytics.track('client', 'product clicked ' + productName);
        };

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

        $scope.pitchinIndex = 0;
        $scope.fadedIn = false;
        function fadeInComment() {
            $scope.fadedIn = true;
            $timeout(commentDelay, 200);
        }
        function commentDelay() {
            $timeout(fadeOutComment, 7000);
        }
        function fadeOutComment() {
            $scope.fadedIn = false;
            $timeout(loadDelay, 200);
        }
        function loadDelay() {
            $scope.pitchinIndex += 1;
            $timeout(fadeInComment, 100);
        }
        fadeInComment();
    }
]);

GiftStarterApp.directive('gsHotCampaign', function(Analytics) {
    function link(scope, element, attrs) {
        scope.goToUrl = function() {
            Analytics.track("client", "hot campaigns clicked");
            window.open('/giftstart?gs-id=' + scope.campaign.giftstart.gsid, "_blank");
        };
    }

    return {
        restrict: 'E',
        scope: {campaign: '=', pitchins: '=', index: '=', fadeIn: '='},
        link: link,
        templateUrl: '/templates/angular/hot-campaign.html'
    };
});