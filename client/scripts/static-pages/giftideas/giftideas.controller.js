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

    var path = $location.path();

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

    this.populateCategories = function(path, $http) {
        $http({method: 'GET', url: '/assets'+path+'.json'}).success(function (data) {
            $scope.products = [];
            $scope.categoryName = data.categoryName;
            $scope.categoryBlurb = data.categoryBlurb;
            angular.forEach(data.productList, function (value, key) {
                $scope.showCategories = false;
                $scope.products.push(value);
            });
        });
    };

    this.populateCategories(path, $http);

}
