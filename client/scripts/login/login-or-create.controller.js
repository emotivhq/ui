/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope) {
        $scope.showLogin = true;


    }

    app.controller('LoginOrCreateController', [
        '$scope',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));