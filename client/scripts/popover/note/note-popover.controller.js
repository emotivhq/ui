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
        $scope.$on('pitchin-image-changed', function (event, imgUrl) {
            $scope.profilePicture = imgUrl;
        });
        $scope.hidePopover = function () {
            PopoverService.hidePopover();
        };
        $scope.editPhoto = function () {
            noteText = $scope.noteText;
            skipNote = $scope.skipNote;
			$rootScope.showEditPhoto = true;
			$scope.showEditPhoto = true;
            PopoverService.setPopover('profile');
        };
        $scope.editPhoto = function () {
            noteText = $scope.noteText;
            skipNote = $scope.skipNote;
            //PopoverService.setPopover('profile');
			$rootScope.showEditPhoto = true;
			$scope.showEditPhoto = true;
        };        $scope.action = {
            submit: function () {
                if($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    GiftStartService.saveNote(' ', $scope.name);
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText, $scope.name);
                }
                //PopoverService.setPopover('thanks');
                $rootScope.$broadcast('signbox-hidden');
                $scope.skipNote = skipNote = false;
                $scope.noteText = noteText = '';
                $scope.name = UserService.name;
                $scope.profilePicture = UserService.profileImageUrl;
            }
        }
    };
    app.controller('NotePopoverController', ['$scope', '$rootScope', '$location', 'UserService', 'PopoverService', 'GiftStartService', 'Analytics', notePopoverController]);
}(angular.module('GiftStarterApp')));