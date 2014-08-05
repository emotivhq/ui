/**
 * Created by stuart on 7/28/14.
 */


GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window',
    function($scope,  Analytics,  $window) {
        Analytics.track('client', 'loaded home');

        $scope.retailerClick = function(retailerUrl, retailerName) {
            $window.open(retailerUrl, retailerName);
            Analytics.track('client', 'reatiler clicked ' + retailerName);
        };

        $scope.productClicked = function(productUrl, productName) {
            $window.open(productUrl, productName);
            Analytics.track('client', 'product clicked ' + productName);
        };

    }
]);