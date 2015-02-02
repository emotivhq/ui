/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var profilePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.profilePicture = UserService.profileImageUrl;
        $scope.campaignPicture = UserService.profileImageUrl;
        $scope.useAsProfilePicture = false;

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
        };

        $scope.action = {
            submit: function () {
                if ($scope.profilePicture!=$scope.campaignPicture) {
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    self.setPopover('note');
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    //todo: GiftStartService.saveUserImage($scope.campaignPicture);
                    self.setPopover('note');
                }
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));

