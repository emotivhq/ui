/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function (app) {
    var SearchController = function ($scope, $location) {
        var self = this;        
        this.thisRoute = $location.path().toString();
        $scope.isProvidence = self.thisRoute == '/yourvillage';
    };
    app.controller('SearchController', [
        '$scope',
        '$location',
        SearchController
        ]);
}(angular.module('GiftStarterApp')));