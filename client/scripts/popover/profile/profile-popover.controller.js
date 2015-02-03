/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var profilePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.profilePicture = "http://localhost:8080/assets/about/img/jon.png";//UserService.profileImageUrl;
        $scope.campaignPicture = UserService.profileImageUrl;
        $scope.useAsProfilePicture = false;
        $scope.editMode = false;

        $scope.cancel = function () {
            PopoverService.setPopover('note');
        };

        $scope.action = {
            submit: function () {
                console && console.log && console.log("Pic Changed: "+($scope.profilePicture!=$scope.campaignPicture)+", Use for Profile: "+$scope.useAsProfilePicture)
                if ($scope.profilePicture!=$scope.campaignPicture) {
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    PopoverService.setPopover('note');
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    //todo: GiftStartService.saveUserImage($scope.campaignPicture);
                    PopoverService.setPopover('note');
                }
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));

