/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('ProductService', [
            '$http',
    function($http) {

        this.product = {
            link: '',
            imgs: [],
            imageWidth: 0,
            imageHeight: 0
        };

        var self = this;

        this.submitLink = function(url, onSuccess, onFail) {
            $http({
                method: 'POST', url: '/product', data: {url: url}
            }).success(function(data) {
                self.product.imgs = data.product.imgs;
                onSuccess(self.product);
            }).error(function(data) {
                console.log("Fetched failed!");
                onFail(data);
            });
        };

}]);

GiftStarterApp.controller('ProductLinkController', [
            '$scope','ProductService','$location',
    function($scope,  ProductService,  $location) {
        $scope.loading = false;
        $scope.failed = false;
        $scope.link = "";

        function onSuccess(product) {
            $scope.loading = false;
            ProductService.product.url = $scope.link;
            ProductService.product.imgs = product.imgs;
            $location.path("create-giftstart");
        }
        function onFailure(reason) {
            $scope.loading = false;
            $scope.failed = true;
            console.log("Product service failed to fetch product.");
        }

        $scope.submitLink = function() {
            $scope.loading = true;
            $scope.failed = false;
            ProductService.submitLink($scope.link, onSuccess, onFailure);
        };

}]);