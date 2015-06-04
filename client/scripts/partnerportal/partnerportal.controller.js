/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {

        function loadCoreData() {
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/users/partner/' + UserService.uid + '.json'
            }).success(function (response) {
                $scope.coreDataComplete = false;
                $scope.editMode = true;
                $scope.partner = response;
                if ($scope.partner.api_key && $scope.partner.api_key.length > 0) {
                    $scope.coreDataComplete = true;
                    $scope.editMode = false;
                }
                $scope.coreError = '';
                $scope.loading = false;
            }).error(function () {
                $scope.coreError = "Unable to retrieve your company information; please reload the page";
                $scope.coreDataComplete = false;
                $scope.editMode = false;
                $scope.loading = false;
            });
        }

        this.initialize = function() {
            $scope.coreDataComplete = false;
            $scope.editMode = false;
            $scope.loading = false;
            $scope.htmlInstructions = true;
            $scope.shopifyInstructions = false;
            $scope.coreError = "Loading...";
            loadCoreData();
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

        $scope.cancelCore = function() {
            $scope.editMode = false;
        };

        $scope.saveCore = function() {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/users/partner/' + UserService.uid + '.json',
                data: {partner: $scope.partner}
            })
            .success( function (data) {
                $scope.partner = data;
                $scope.editMode = false;
                if($scope.partner.api_key && $scope.partner.api_key.length>0) {
                    $scope.coreDataComplete = true;
                }
                $scope.coreError = '';
                $scope.loading = false;
                $location.hash('core-form');
            })
            .error(function(data) {
                $scope.coreError = data;
                $scope.loading = false;
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

