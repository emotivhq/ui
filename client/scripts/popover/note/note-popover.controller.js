/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var notePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        var google_conversion_struct = {
            google_conversion_id: 961290155,
            google_conversion_language: "en",
            google_conversion_format: "2",
            google_conversion_color: "ffffff",
            google_conversion_label: "mwFzCO75mlgQq7-wygM",
            google_conversion_value: GiftStartService.giftStart.totalSelection,
            google_conversion_currency: "USD",
            google_remarketing_only: false
        }

        window.google_trackConversion(google_conversion_struct);
        console && console.log && console.log('google - converted: ');
        console && console.log && console.log(google_conversion_struct);

        window.uetq = window.uetq || [];
        var data = {
            ec: 'PitchInThankYou',
            ea: 'PitchInSuccess',
            el: 'PurchaseConfirmation',
            ev: GiftStartService.giftStart.totalSelection,
            gv: GiftStartService.giftStart.totalSelection
        };
        window.uetq.push(data);
        console && console.log && console.log('bing - converted: ');
        console && console.log && console.log(data);

        $scope.noteText = '';
        $scope.profilePicture = UserService.profileImageUrl;

        $scope.$on('pitchin-image-changed', function (event,imgUrl) {
            $scope.profilePicture = imgUrl;
        });

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
            $scope.skipNote = false;
            $scope.noteText = '';
        };

        $scope.editPhoto = function () {
            PopoverService.setPopover('profile');
        };

        $scope.skipNote = false;

        $scope.action = {
            submit: function () {
                if ($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    GiftStartService.saveNote(' ');
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

