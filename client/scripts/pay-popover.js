/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService',
    function($scope,  GiftStartService) {

        $scope.gs = GiftStartService.getGiftStart();

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-invite-popover></gs-invite-popover>');
        }

        $scope.currentCharge = function() {
            return $scope.gs.totalSelection;
        };

        $scope.stripeSubmit = function() {
            alert("Stripe Submit!");
//            goToNextPopover();
        }
    }
]);

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/pay-popover.html'}});
