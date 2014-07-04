/**
 * Created by stuart on 7/1/14.
 */

GiftStarterApp.controller('ThanksPopoverController', [
            '$scope','PopoverService','GiftStartService','UserService','FacebookService','$window',
    function($scope,  PopoverService,  GiftStartService,  UserService,  FacebookService,  $window) {
        $scope.close = function(){PopoverService.hidePopover()};

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;

        $scope.facebookShare = function() {
            mixpanel.track("share campaign facebook");
            ga('send', 'event', 'share campaign', 'facebook');
            FacebookService.inviteFriends();
        };

        $scope.twitterShare = function() {
            mixpanel.track("share campaign twitter");
            ga('send', 'event', 'share campaign', 'twitter');
            var shareUrl = 'https://twitter.com/share';
            var parameters = "?url=" +
                encodeURIComponent("https://6-dot-gift-starter.appspot.com/giftstart?gs-id=" +
                    GiftStartService.giftStart.gsid) +
                "&text=Check out this GiftStarter campaign!  It's the bees knees!";
            $window.open(shareUrl + parameters);
        };

        $scope.googlePlusShare = function() {
            mixpanel.track("share campaign googleplus");
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            var parameters = '?url=' +
                encodeURIComponent("https://6-dot-gift-starter.appspot.com/giftstart?gs-id=" +
                    GiftStartService.giftStart.gsid);
            $window.open(shareUrl + parameters);
        };

        $scope.hidePopover = PopoverService.hidePopover;

    }
]);

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/thanks-popover.html'}});