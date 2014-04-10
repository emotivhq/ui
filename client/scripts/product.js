/**
 * Created by stuart on 4/9/14.
 */


var ProductService = GiftStarterApp.service('ProductService', ['$http',
    function($http) {

        var product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            price: '$xxx.xx'
        };

        function getProduct() {return product;}

        function submitLink(url, onSuccess, onFail) {
            $http({
                method: 'POST', url: '/product', data: {url: url}
            }).success(function(data, status, headers, config) {
                console.log("Fetched succeeded.");
                product.link = data.product.link;
                product.img = data.product.img;
                product.title = data.product.title;
                product.price = data.product.price;
                onSuccess(product);
            }).error(function(data, status, headers, config) {
                console.log("Fetched failed!");
                onFail(data);
            });
        }

        return {
            submitLink: submitLink,
            getProduct: getProduct

        };

}]);


var ProductLinkController = GiftStarterApp.controller('ProductLinkController', ['$scope', 'ProductService',
    'GiftStartService',
    function($scope, ProductService, GiftStartService) {

        $scope.resultShown = false;
        $scope.product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            price: '$xxx.xx'
        };

        function onSuccess(product) {
            $scope.product = product;
            $scope.resultShown = true;
        }
        function onFailure(reason) {console.log("Product service failed to fetch product.");}

        $scope.submitLink = function() {ProductService.submitLink($scope.product.link, onSuccess, onFailure);};

        $scope.giftstart = function() {GiftStartService.initiateGiftStart();};

}]);