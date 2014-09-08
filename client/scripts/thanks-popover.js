/**
 * Created by stuart on 7/1/14.
 */

GiftStarterApp.controller('ThanksPopoverController', [
            '$scope','PopoverService','GiftStartService','UserService','FacebookService','TwitterService',
            'GooglePlusService','Analytics',
    function($scope,  PopoverService,  GiftStartService,  UserService,  FacebookService,  TwitterService,
             GooglePlusService, Analytics) {
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
            TwitterService.share();
        };

        $scope.googlePlusShare = function() {
            Analytics.track('campaign', 'googleplus share from thanks');
            GooglePlusService.share();
        };

        $scope.hidePopover = PopoverService.hidePopover;

    }
]);

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/thanks-popover.html'}});