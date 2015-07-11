/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var WhatIsGiftStarterController = function ($scope, $location) {
        $scope.location = $location;
    };

    $scope.buttonClick = function(destination) {
        alert("hi");
    };

    app.controller('WhatIsGiftStarterController', [
        '$scope',
        '$location',
        WhatIsGiftStarterController]);
}(angular.module('GiftStarterApp')));