/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService','PopoverService',
    function($scope,  GiftStartService,  PopoverService) {

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;

        $scope.stripeSubmit = function(status, response) {
            if(response.error) {
                mixpanel.track("Payment error");
                console.log("Card processing error, payment not made.");
                console.log(response);
            } else {
                // Got stripe token, attach it to the current giftstart payment
                mixpanel.track("Payment succeeded");
                console.log(response);
                GiftStartService.attachStripeResponse(response);
                GiftStartService.payment.emailAddress = $scope.email;
                GiftStartService.sendPayment();
                PopoverService.nextPopover();
            }
        }
    }
]);

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/pay-popover.html'}});
