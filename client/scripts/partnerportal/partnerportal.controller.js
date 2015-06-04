/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {

        if(UserService.loggedIn && !UserService.isUserEmailLogin()) {
            UserService.logout();
            $window.location.reload(); //$timeout(UserService.registerLogout,3000);
        }

        $scope.coreDataComplete = false;
        $scope.editMode = !$scope.coreDataComplete;

        $scope.htmlInstructions = true;
        $scope.shopifyInstructions = false;

        $scope.partner ={
            partnerId: "",
            companyName: "Company Name",
            companyUrl: "Company URL",
            phone: "Phone",
            apiKey:"API Key"
        };

        $scope.coreError = "Error message";

        $scope.loggedIn = function() {
            return UserService.loggedIn;
        };

        $scope.editCore = function() {
            $scope.editMode = true;
        };

        $scope.saveCore = function() {
            $scope.editMode = false;
            $scope.coreDataComplete = true;
            $location.hash('core-form');
            $anchorScroll();
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

