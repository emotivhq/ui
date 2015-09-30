/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsFundingBar', [gsFundingBar]);


function gsFundingBar() {
    function link(scope, element, attrs) {}

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/giftstart/funding-bar/funding-bar.html'
    };
}