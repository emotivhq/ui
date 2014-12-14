/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var emailSharePopoverController = function ($scope,
                                                PopoverService,
                                                $http,
                                                UserService,
                                                Analytics,
                                                GiftStartService,
                                                $location) {

        var email = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.([a-z0-9-]+)+$/i,
            emails;

        var trackEmailClientClick = function () {
            Analytics.track('client', 'email client share clicked');
        };

        var sendEmail = function (to, from, message, share_url) {
            Analytics.track('campaign', 'email share submitted');
            $scope.sending = true;
            $http({
                method: 'PUT',
                url: '/giftstart/share',
                data: {
                    to: to,
                    from: from,
                    message: message,
                    share_url: share_url,
                    gsid: GiftStartService.giftStart.gsid,
                    sender_name: UserService.name,
                    sender_uid: UserService.uid
                }
            })
            .success(function() {
                Analytics.track('campaign', 'email share succeeded');
                $scope.sending = false;
                $scope.toEmails = '';
                $scope.fromEmail = '';
                $scope.message = '';
                $scope.hidePopover();
            })
            .error(function() {
                $scope.sending = false;
                Analytics.track('campaign', 'email share failed');
            });
        };

        $scope.toEmails = '';
        $scope.fromEmail = UserService.email;
        $scope.message = "Hey, check out this GiftStart, it's the bee's knees!\n\n" + UserService.name;
        $scope.formValid = true;
        $scope.emailUrl = "mailto:?subject=" +
                          encodeURI("Check out this awesome GiftStarter campaign!") +
                          "&body=" +
                          encodeURI("Check out this awesome GiftStarter campaign, it's the bee's knees!\n\n" + $location.absUrl());

        $scope.sending = false;

        $scope.hidePopover = PopoverService.hidePopover;

        $scope.trackEmailClientClick = trackEmailClientClick;

        $scope.submit = function () {
            emails = $scope.toEmails
                .replace(/[ \n]/g, "")
                .split(/[,;]/)
                .filter(function (eml) { return eml !== ''; });

            $scope.formValid = emails.length > 0 && emails.every(function (s) { return email.test(s) }) && email.test($scope.fromEmail);

            if ($scope.formValid) {
                $location.search('re', btoa(JSON.stringify({
                    type: 'consumer',
                    uid: UserService.uid,
                    channel: 'email',
                    uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
                })));
                sendEmail(emails, $scope.fromEmail, $scope.message, $location.absUrl());
                $location.search('re', null);
            }
        };
    };

    app.controller('EmailSharePopoverController', [
        '$scope',
        'PopoverService',
        '$http',
        'UserService',
        'Analytics',
        'GiftStartService',
        '$location',
        emailSharePopoverController
    ]);

}(angular.module('GiftStarterApp')));
