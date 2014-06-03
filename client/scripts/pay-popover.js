/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService','PopoverService',
    function($scope,  GiftStartService,  PopoverService) {

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;

        $scope.stripeSubmit = function(status, response) {
            // Charge process!
            // 1. User submits card details in field
            // 2. Client app sends details to stripe
            // 3. Stripe validates details and sends response with card id
            // 4. Client app sends response with card id to server app
            // 5. Server app attempts to charge card, responds with result (success/fail)
            if(response.error) {
                mixpanel.track("Payment error");
                ga('send', 'event', 'pitch-in', 'payment error');
                console.log("Card processing error, payment not made.");
                console.log(response);
            } else {
                // Got stripe token, attach it to the current giftstart payment
                mixpanel.track("Payment succeeded");
                ga('send', 'event', 'pitch-in', 'payment success');
                console.log(response);
                GiftStartService.attachStripeResponse(response);
                GiftStartService.payment.emailAddress = $scope.email;
                GiftStartService.sendPayment();
            }
        };

        // TODO: Implement error reporting for cards that are rejected!
        $scope.$on('payment-success', function() {PopoverService.nextPopover()});

    }
]);

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/pay-popover.html'}});
