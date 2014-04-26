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
            price: -1,
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
        $scope.loading = false;
        $scope.x = 3;
        $scope.y = 3;
        $scope.xySets = [[1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5], [5, 5], [5, 6], [6, 6]];
        $scope.selectedXYSet = 3;
        $scope.product = {
            link: '',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            price: '',
            imageWidth: 0,
            imageHeight: 0
        };

        function onSuccess(product) {
            $scope.loading = false;
            $scope.product = product;
            $scope.resultShown = true;
        }
        function onFailure(reason) {
            $scope.loading = false;
            console.log("Product service failed to fetch product.");
        }

        $scope.submitLink = function() {
            $scope.loading = true;
            ProductService.submitLink($scope.product.link, $scope.product.price, onSuccess, onFailure);
        };

        $scope.moreParts = function() {
            if ($scope.selectedXYSet < $scope.xySets.length) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
            }
        };

        $scope.fewerParts = function() {
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
            }
        };

        $scope.giftstart = function() {
            if ($scope.product.price > 0) {
                GiftStartService.initiateGiftStart($scope.product.title, $scope.product.description, $scope.product.img,
                    $scope.product.imageHeight, $scope.product.price, $scope.product.link, $scope.x, $scope.y);
            }
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