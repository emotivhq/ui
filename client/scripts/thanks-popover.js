/**
 * Created by stuart on 7/1/14.
 */

GiftStarterApp.controller('ThanksPopoverController', [
    '$scope','PopoverService','GiftStartService',
    function($scope,  PopoverService,  GiftStartService) {
        $scope.close = function(){PopoverService.hidePopover()};

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;

        $scope.hidePopover = PopoverService.hidePopover;

    }
]);

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/thanks-popover.html'}});