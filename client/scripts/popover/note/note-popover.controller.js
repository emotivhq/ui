/**
 * Copyright (C) Giftstarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var notePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics, CardService) {

        $scope.noteText = '';
        $scope.profilePicture = UserService.profileImageUrl;

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
            $scope.skipNote = false;
            $scope.noteText = '';
        }

        $scope.skipNote = false;

        CardService.fetch();

        // Now that user is logged in, create giftstart in server
        if (!GiftStartService.giftStart.gsid) {
            GiftStartService.createGiftStart()
        }

        $scope.action = {
            submit: function () {
                if (skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    PopoverService.nextPopover();
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText);
                    PopoverService.nextPopover();
                }
            }
        }
    };

    app.controller('NotePopoverController', ['$scope','UserService', 'PopoverService','GiftStartService','Analytics', 'CardService', notePopoverController]);
}(angular.module('GiftStarterApp')));

