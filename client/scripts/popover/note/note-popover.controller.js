/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var notePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.noteText = '';
        $scope.profilePicture = UserService.profileImageUrl;

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
            $scope.skipNote = false;
            $scope.noteText = '';
        };

        $scope.skipNote = false;

        $scope.action = {
            submit: function () {
                if ($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    PopoverService.nextPopover();
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText);
                    PopoverService.nextPopover();
                }
                $scope.skipNote = false;
                $scope.noteText = '';
            }
        }
    };

    app.controller('NotePopoverController', ['$scope','UserService', 'PopoverService','GiftStartService','Analytics', notePopoverController]);
}(angular.module('GiftStarterApp')));

