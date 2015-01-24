/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location','$sce',
    GiftideasController]);

//app.filter('html', function($sce) { return $sce.trustAsHtml; });

function GiftideasController($scope, $http, $location,  $sce) {
    $scope.location = $location;
    $scope.path = $location.path();

    var pathParts = $scope.path.replace('//','/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length>2?pathParts[2]:false;
    var product = pathParts.length>3?pathParts[3]:false;

    function addCalculatedVars(product) {
        product.productNameStripped = String(product.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
        product.hasPrice = !isNaN(product.productPrice);
    }

    this.populateCategory = function(category, $http) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.category = data;
            $scope.categoryPath = $scope.basePath+'/'+category;
            var prior=null;
            angular.forEach(data.productList, function (value, key) {
                addCalculatedVars(value);
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
                    addCalculatedVars(value);
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
