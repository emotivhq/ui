/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var profilePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.profilePicture = UserService.profileImageUrl;//"http://localhost:8080/assets/about/img/jon.png";
        $scope.useAsProfilePicture = false;
        $scope.editMode = false;

        $scope.user = UserService.user;

        var imageData;

        $scope.imageSet = false;

        $scope.imageUpdated = imageUpdated;

        function imageUpdated(data) {
            $scope.imageSet = true;
            imageData = data;
        }

        function saveProfilePhoto() {
            UserService.uploadProfileImage(imageData)
                .success(function(newImageUrl) {
                    $scope.editMode = false;
                })
                .error(function(reason) {
                    console && console.log && console.log('Failed to update profile image', reason);
                    $scope.editMode = false;
                });
        }

        $scope.cancel = function () {
            PopoverService.setPopover('note');
        };

        $scope.action = {
            submit: function () {
                console && console.log && console.log("Pic Changed: "+$scope.imageUpdated+", Use for Profile: "+$scope.useAsProfilePicture)
                if ($scope.imageUpdated) {
                    if($scope.useAsProfilePicture) {
                        saveProfilePhoto()
                    }
                    //GiftStartService.saveUserImage($scope.campaignPicture);
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    PopoverService.setPopover('note');
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    PopoverService.setPopover('note');
                }
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));

