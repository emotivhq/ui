/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    var sweepStakesDirective = function ($http, PopoverService) {
        var link = function (scope, element, attr) {
            scope.model = {
                first: '',
                last: '',
                email: '',
                message: ''
            };

            scope.close = function () {
                PopoverService.hidePopover();
            };

            scope.submit = function () {
                if (scope.sweepForm.$valid) {
                    $http.post('/users/sweepstakes.json',{
                        firstname: scope.model.first,
                        lastname: scope.model.last,
                        email: scope.model.email
                    })
                    .success(function (res) {
                        scope.model.message = res['ok'];
                    })
                    .error(function (res) {
                        scope.model.message = res['error'];
                    });
                }
            }
        };

        return {
            restrict: 'E',
            scope: {},
            link: link,
            templateUrl: '/scripts/popover/sweepstakes/sweepstakes-popover.html'
        };
    };

    app.directive('gsSweepstakesPopover', ['$http', 'PopoverService', sweepStakesDirective]);
}(angular.module('GiftStarterApp')));