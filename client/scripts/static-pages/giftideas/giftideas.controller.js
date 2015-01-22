/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location','$timeout',
    GiftideasController]);

function GiftideasController($scope, $http, $location,  $timeout) {
    $scope.location = $location;
    $scope.path = $location.path();

    var pathParts = $scope.path.split('/');
    var category = pathParts.length>2?pathParts[2]:false;
    var product = pathParts.length>3?pathParts[3]:false;

    //$scope.scrollToSearch = function() {
    //    if (Object.keys($location.search()).length) {
    //        var selector = document.querySelector('#'+Object.keys($location.search())[0]);
    //        var element = angular.element(selector);
    //        element[0].scrollIntoView();
    //    }
    //};

    //$scope.$watch('location.search()', function() {
    //    $timeout($scope.scrollToSearch, 400);
    //    $timeout($scope.scrollToSearch, 700);
    //});

    this.populateCategory = function(category, $http) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.category = data;
            var prior=null;
            angular.forEach(data.productList, function (value, key) {
                if(prior!=null) {
                    $scope.groups.push([prior,value]);
                    prior=null;
                } else {
                    prior=value;
                }
            });
            if(prior!=null) {
                $scope.groups.push([prior]);
            }
        });
    };

    this.populateProduct = function(category, product, $http) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            angular.forEach(data.productList, function (value, key) {
                if(value.productSlug==product) {
                    $scope.product=value;
                }
            });
        });
    };

    if(category) {
        this.populateCategory(category, $http);
    }

    if(product) {
        this.populateProduct(category, product, $http);
    }

}
