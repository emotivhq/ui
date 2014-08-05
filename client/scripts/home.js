/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics',
    function($scope,  Analytics) {
        Analytics.track('client', 'loaded home');

        $scope.retailerClicked = function(retailer) {
            Analytics.track('client', 'reatiler clicked ' + retailer);
        };

        $scope.productClicked = function(product) {
            Analytics.track('client', 'product clicked ' + retailer);
        };

    }
]);