/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HowItWorksController = function ($scope, $location) {
        $scope.location = $location;
        $scope.sectionShown = "welcome";
    }

    app.controller('HowItWorksController', [
        '$scope',
        '$location',
        HowItWorksController]);
}(angular.module('GiftStarterApp')));