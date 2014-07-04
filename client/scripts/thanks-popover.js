/**
 * Created by stuart on 7/1/14.
 */

GiftStarterApp.controller('ThanksPopoverController', [
            '$scope','PopoverService','GiftStartService','UserService','FacebookService','TwitterService','GooglePlusService',
    function($scope,  PopoverService,  GiftStartService,  UserService,  FacebookService,  TwitterService,  GooglePlusService) {
        $scope.close = function(){PopoverService.hidePopover()};

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;

        $scope.facebookShare = FacebookService.inviteFriends;

        $scope.twitterShare = TwitterService.share;

        $scope.googlePlusShare = GooglePlusService.share;

        $scope.hidePopover = PopoverService.hidePopover;

    }
]);

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/thanks-popover.html'}});