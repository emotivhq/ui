/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ThanksPopoverController', ['$scope',
    'PopoverService','GiftStartService','UserService','FacebookService',
    'TwitterService','GooglePlusService','Analytics',
    ThanksPopoverController]);

function ThanksPopoverController($scope,  PopoverService,  GiftStartService,
                                 UserService,  FacebookService,
                                 TwitterService, GooglePlusService,
                                 Analytics) {

    $scope.close = function(){PopoverService.hidePopover()};

    $scope.mailSubject = "Join us on a gift together";
    $scope.mailBody= "I thought you might be interested in pitching in on this GiftStarter campaign:%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
        + GiftStartService.giftStart.gsid;


    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from thanks');
        FacebookService.inviteFriends(UserService.uid);
    };

    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from thanks');
        TwitterService.share(UserService.uid);
    };

    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from thanks');
        GooglePlusService.share(UserService.uid);
    };

    $scope.hidePopover = PopoverService.hidePopover;
}
