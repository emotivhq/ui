/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService','PopoverService',
    function($scope,  GiftStartService,  PopoverService) {

        $scope.gs = GiftStartService.getGiftStart();

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-invite-popover></gs-invite-popover>');
        }

        $scope.currentCharge = function() {
            return $scope.gs.totalSelection;
        };

        $scope.stripeSubmit = function(status, response) {
            if(response.error) {
                console.log("Card processing error, payment not made.");
                console.log(response);
            } else {
                // Got stripe token, attach it to the current giftstart payment
                // TODO: AMOUNT TO BE CHARGED MUST BE CALCULATED ON THE SERVER.
                GiftStartService.attachStripeResponse(response);
                goToNextPopover();
            }
        }
    }
]);

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/pay-popover.html'}});
