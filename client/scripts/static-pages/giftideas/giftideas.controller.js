/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location',
    GiftideasController]);

function GiftideasController($scope, $http, $location) {

    $scope.location = $location;
    $scope.path = $location.path();
    var pathParts = $scope.path.replace('//','/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length>2?pathParts[2]:false;
    var product = pathParts.length>3?pathParts[3]:false;

    if(category) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.category = data;
            $scope.categoryPath = $scope.basePath+'/'+category;
            var prior=null;
            angular.forEach(data.productList, function (value, key) {
                value.productNameStripped = String(value.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
                value.hasPrice = !isNaN(value.productPrice);
                if(prior!=null) {
                    $scope.groups.push([prior,value]);
                    prior=null;
                } else {
                    prior=value;
                }
                if(product && value.productSlug==product) {
                    $scope.product=value;
                }
            });
            if(prior!=null) {
                $scope.groups.push([prior]);
            }
        });
    }

}
