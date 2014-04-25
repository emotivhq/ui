/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService','PopoverService','$location',
    function($scope,  GiftStartService,  PopoverService,  $location) {

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-invite-popover></gs-invite-popover>');
            $location.hash('invite');
        }

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
