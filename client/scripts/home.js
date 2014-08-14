/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout',
    function($scope,  Analytics,  $window,  $http,  $timeout) {
        Analytics.track('client', 'loaded home');

        $scope.retailerClick = function(retailerUrl, retailerName) {
            $window.open(retailerUrl, retailerName);
            Analytics.track('client', 'reatiler clicked ' + retailerName);
        };

        $scope.productClicked = function(productUrl, productName) {
            $window.open(productUrl, productName);
            Analytics.track('client', 'product clicked ' + productName);
        };

        $scope.hotCampaigns = {};

        $http({method: 'GET', url: '/giftstart/api/hot-campaigns?num_campaigns=3'})
            .success(function(data) {
                Analytics.track("client", "hot campaigns load succeeded");
                $scope.hotCampaigns = data;

                // TEST EST EST TEST TEST TEST
                $scope.hotCampaigns.pitchins[0] = [{
                    img: 'https://storage.googleapis.com/giftstarter-pictures/dev/u/f27213779.jpg',
                    note: 'This is going to suite you so well!  You\'ve always been so awesome, this is me giving back.  Your besty loves you!!!!!', name: 'Stuart Owen'
                },{
                    img: 'https://storage.googleapis.com/giftstarter-pictures/u/f657795820.jpg',
                    note: 'This is for your 30th.',
                    name: 'Janet Phillip'
                }];
                // TEST EST EST TEST TEST TEST

            }).error(function(data) {
                Analytics.track("client", "hot campaigns load failed");
            });

        $scope.pitchinIndex = 0;
        $scope.fadedIn = false;
        function fadeInComment() {
            $scope.fadedIn = true;
            $scope.pitchinIndex += 1;
            $timeout(commentDelay, 200);
        }
        function commentDelay() {
            $timeout(fadeOutComment, 7000);
        }
        function fadeOutComment() {
            $scope.fadedIn = false;
            $timeout(fadeInComment, 200);
        }
        fadeInComment();
        console.log($scope.fadedIn);
    }
]);

GiftStarterApp.directive('gsHotCampaign', function() {
    function link(scope, element, attrs) {
        scope.goToUrl = function() {window.open('/giftstart?gs-id=' + scope.campaign.giftstart.gsid);};
    }

    return {
        restrict: 'E',
        scope: {campaign: '=', pitchins: '=', index: '=', fadeIn: '='},
        link: link,
        templateUrl: '/templates/angular/hot-campaign.html'
    };
});