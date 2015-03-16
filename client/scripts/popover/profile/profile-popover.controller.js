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
            console && console.log && console.log("imageUpdated: "+data);
            $scope.imageSet = true;
            imageData = data;
        }

        function saveUpdatedImage() {
            if($scope.useAsProfilePicture) {
                UserService.uploadProfileImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        UserService.profileImageUrl = newImageUrl;
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                        $scope.$parent.$broadcast('profile-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update profile image', reason);
                    });
            } else {
                GiftStartService.uploadImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update pitch-in image', reason);
                    });
            }
        }

        $scope.cancel = function () {
            PopoverService.setPopover('note');
        };

        $scope.action = {
            submit: function () {
                if ($scope.imageUpdated) {
                    saveUpdatedImage();
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    PopoverService.setPopover('note');
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    PopoverService.setPopover('note');
                }
                $scope.editMode = false;
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));

