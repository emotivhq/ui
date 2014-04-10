/**
 * Created by stuart on 4/9/14.
 */

var ProductLinkController = GiftStarterApp.controller('ProductLinkController', ['$scope', '$http',
    function($scope, $http) {

        $scope.resultShown = false;
        $scope.product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            price: '$xxx.xx'
        };

        $scope.submitLink = function() {
            console.log("Fetching " + $scope.product.link);
            $http({
                method: 'POST', url: '/product', data: {url: $scope.product.link}
            }).success($scope.httpSucceed).error($scope.httpFailed);
        };

        $scope.giftstart = function() {
            console.log("GIFTSTART!");
        };

        $scope.httpSucceed = function(data, status, headers, config) {
            console.log("Fetched succeeded.");
            $scope.product.link = data.product.link;
            $scope.product.img = data.product.img;
            $scope.product.title = data.product.title;
            $scope.product.price = data.product.price;
            $scope.resultShown = true;
        };

        $scope.httpFailed = function(data, status, headers, config) {
            console.log("Fetched failed!");
        };
}]);

