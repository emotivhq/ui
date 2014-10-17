/**
 * Created by stuart on 7/2/14.
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