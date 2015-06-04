/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {

        this.initialize = function() {

            $scope.coreDataComplete = false;
            $scope.editMode = !$scope.coreDataComplete;

            $scope.htmlInstructions = true;
            $scope.shopifyInstructions = false;

            $http({
                method: 'GET',
                url: '/users/partner/' + UserService.uid + '.json'
            }).success(function (response) {
                $scope.partner = response;
                if($scope.partner.apiKey && $scope.partner.apiKey.length>0) {
                    $scope.coreDataComplete = true;
                }
                $scope.coreError = '';
            }).error(function() {
                $scope.coreError = "Unable to retrieve your company information; please reload the page";
            });

            //$scope.partner = {
            //    partnerId: "",
            //    companyName: "",
            //    companyUrl: "",
            //    phone: "",
            //    apiKey: ""
            //};

            $scope.coreError = "Loading...";

        };

        if(UserService.loggedIn && !UserService.isUserEmailLogin()) {
            UserService.logout();
            $window.location.reload(); //$timeout(UserService.registerLogout,3000);
        } else {
            this.initialize()
        }

        $scope.loggedIn = function() {
            return UserService.loggedIn;
        };

        $scope.editCore = function() {
            $scope.editMode = true;
        };

        $scope.saveCore = function() {
            $http({
                method: 'POST',
                url: '/users/partner/' + UserService.uid + '.json',
                data: {partner: $scope.partner}
            })
            .success( function (data) {
                $scope.partner = data;
                $scope.editMode = false;
                if($scope.partner.apiKey && $scope.partner.apiKey.length>0) {
                    $scope.coreDataComplete = true;
                }
                $location.hash('core-form');
            })
            .error(function(data) {
                $scope.coreError = data;
            })
        };

        $scope.showShopifyInstructions = function() {
            $scope.shopifyInstructions = true;
            $scope.htmlInstructions = false;
        };

        $scope.showHtmlInstructions = function() {
            $scope.shopifyInstructions = false;
            $scope.htmlInstructions = true;
        };

    };

    app.controller('PartnerportalController', ['$scope', '$rootScope', '$window', 'UserService', '$timeout', '$location', '$http', 'Analytics', PartnerportalController]);

}(angular.module('GiftStarterApp')));

