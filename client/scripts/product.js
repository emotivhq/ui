/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('ProductService', [
            '$http',
    function($http) {

        var product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 400,
            imageWidth: 0,
            imageHeight: 0
        };

        function getProduct() {return product;}

        function submitLink(url, price, onSuccess, onFail) {
            $http({
                method: 'POST', url: '/product', data: {url: url, price: price}
            }).success(function(data, status, headers, config) {
                product.link = data.product.link;
                product.img = data.product.img;
                product.title = data.product.title;
                product.price = data.product.price;
                product.description = data.product.description;
                onSuccess(product);
            }).error(function(data, status, headers, config) {
                console.log("Fetched failed!");
                onFail(data);
            });
        }

        function setImageDimensions(x, y) {
            product.imageHeight = y;
            product.imageWidth = x;
        }

        return {
            submitLink: submitLink,
            getProduct: getProduct,
            setImageDimensions: setImageDimensions
        };

}]);

GiftStarterApp.controller('ProductLinkController', [
            '$scope','ProductService','GiftStartService',
    function($scope,  ProductService,  GiftStartService) {

        $scope.resultShown = false;
        $scope.product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            price: 400,
            imageWidth: 0,
            imageHeight: 0
        };

        function onSuccess(product) {
            $scope.product = product;
            $scope.resultShown = true;
        }
        function onFailure(reason) {console.log("Product service failed to fetch product.");}

        $scope.submitLink = function() {ProductService.submitLink($scope.product.link, $scope.product.price, onSuccess, onFailure);};

        $scope.giftstart = function() {
            console.log($scope);
            GiftStartService.initiateGiftStart($scope.product.title, $scope.product.description, $scope.product.img,
                $scope.product.imageHeight, $scope.product.price);
        };

        $scope.imageLoaded = function(element) {
            $scope.product.imageHeight = angular.element(element.children()[0]).prop('clientHeight');
            $scope.product.imageWidth = angular.element(element.children()[0]).prop('clientWidth');
            ProductService.setImageDimensions($scope.product.imageWidth, $scope.product.imageHeight);
        };

}]);

GiftStarterApp.directive('gsImg',
    function($compile) {
        var template = '';
        var link = function(scope, element, attrs) {
            template = '<img ng-src="{{'+attrs.src+'}}" class="'+attrs.class+'"/>';
            element.append($compile(template)(scope));
            angular.element(element.children()[0]).on('load',
                function() {
                    scope[attrs.onLoad](element);
            });
        };

        return {
            restrict: 'E',
            link: link
        }


});