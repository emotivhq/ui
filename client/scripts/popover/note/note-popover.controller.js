/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var noteText = '';
    var skipNote = false;

    var notePopoverController = function ($scope, $rootScope, $location, UserService, PopoverService, GiftStartService, Analytics) {
        
        $scope.noteText = noteText;
        $scope.skipNote = skipNote;
        $scope.profilePicture = UserService.profileImageUrl;
        $scope.name = UserService.name;

        $scope.$on('pitchin-image-changed', function (event,imgUrl) {
            $scope.profilePicture = imgUrl;
        });

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
        };

        $scope.editPhoto = function () {
            noteText = $scope.noteText;
            skipNote = $scope.skipNote;
            PopoverService.setPopover('profile');
        };

        $scope.action = {
            submit: function () {
                if ($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    GiftStartService.saveNote(' ', "poop");
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText, "poop");
                }
                PopoverService.setPopover('thanks');
                $rootScope.$broadcast('signbox-hidden');
                $scope.skipNote = skipNote = false;
                $scope.noteText = noteText = '';
            }
        }
    };

    app.controller('NotePopoverController', ['$scope', '$rootScope', '$location', 'UserService', 'PopoverService','GiftStartService','Analytics', notePopoverController]);
}(angular.module('GiftStarterApp')));

