/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location','$timeout',
    GiftideasController]);

function GiftideasController($scope, $http, $location,  $timeout) {
    $scope.location = $location;
    $scope.showCategories = true;
    $scope.showProducts = false;
    $scope.showSingleProduct = false;
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

    this.populateCategories = function(category, $http) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.categoryName = data.categoryName;
            $scope.categorySlug = data.categorySLug;
            $scope.categoryBlurb = data.categoryBlurb;
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

    if(category) {
        $scope.showCategories = false;
        $scope.showProducts = true;
        $scope.showSingleProduct = false;
        this.populateCategories(category, $http);
    }

}
