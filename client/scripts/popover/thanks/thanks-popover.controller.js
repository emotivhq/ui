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

    window.google_trackConversion({
        google_conversion_id: 961290155,
        google_conversion_language: "en",
        google_conversion_format: "2",
        google_conversion_color: "ffffff",
        google_conversion_label: "mwFzCO75mlgQq7-wygM",
        google_conversion_value: GiftStartService.giftStart.totalSelection,
        google_conversion_currency: "USD",
        google_remarketing_only: false
    });

    window.uetq = window.uetq || [];
    var data = {
        ec: 'PitchInThankYou',
        ea: 'PitchInSuccess',
        el: 'PurchaseConfirmation',
        ev: GiftStartService.giftStart.totalSelection
    };
    window.uetq.push(data);

    $scope.close = function(){PopoverService.hidePopover()};

    $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
    $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
        + GiftStartService.giftStart.gsid;

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
