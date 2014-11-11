/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', ['$scope','GiftStartService',
    'PopoverService','UserService','Analytics', PayPopoverController]);

function PayPopoverController($scope, GiftStartService, PopoverService,
                              UserService,  Analytics) {

    $scope.currentCharge = GiftStartService.giftStart.totalSelection;
    $scope.emailSubscribe = true;
    $scope.saveCreditCard = false;
    $scope.pitchingIn = false;
    $scope.userOnMailingList = UserService.onMailingList;
    $scope.addressZip = '';

    $scope.errorMessage = '';

    $scope.hidePopover = PopoverService.hidePopover;

    $scope.submitted = false;

    $scope.numberImgUrl = '/assets/cc_icon_card_number.png';
    $scope.cvcImgUrl = '/assets/cc_icon_cvc.png';
    $scope.expiryImgUrl = '/assets/cc_icon_expiry.png';
    $scope.zipImgUrl = '/assets/cc_icon_zip.png';
    $scope.emailImgUrl = '/assets/cc_icon_email.png';

    $scope.updateFormValidity = function() {
        if ($scope.submitted) {
            $scope.numberImgUrl = $scope.stripeForm.$error.card ?
                '/assets/cc_icon_card_number_error.png' : '/assets/cc_icon_card_number.png';
            $scope.cvcImgUrl = $scope.stripeForm.$error.cvc ?
                '/assets/cc_icon_cvc_error.png' : '/assets/cc_icon_cvc.png';
            $scope.expiryImgUrl = $scope.stripeForm.$error.expiry ?
                '/assets/cc_icon_expiry_error.png' : '/assets/cc_icon_expiry.png';
            $scope.zipImgUrl = $scope.addressZip.length != 5 ?
                '/assets/cc_icon_zip_error.png' : '/assets/cc_icon_zip.png';
            $scope.emailImgUrl = $scope.stripeForm.$error.email ?
                '/assets/cc_icon_email_error.png' : '/assets/cc_icon_email.png';
        }
    };

    $scope.stripeSubmit = function(status, response) {
        // Charge process!
        // 1. User submits card details in field
        // 2. Client app sends details to stripe
        // 3. Stripe validates details and sends response with card id
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.updateFormValidity();
        if(response.error) {
            $scope.pitchingIn = false;
            Analytics.track('pitchin', 'payment error');
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachStripeResponse(response);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.subscribe = $scope.emailSubscribe;
            GiftStartService.sendPayment(function (data) {
                $scope.pitchingIn = false;
                if (data['stripe-error']) {
                    $scope.errorMessage = data['stripe-error'].error.message;
                }
            });
        }
    };

    $scope.$on('payment-success', function() {
        Analytics.track('pitchin', 'payment succeeded',
            GiftStartService.giftStart.gsid.toString(),
            $scope.currentCharge);
        PopoverService.nextPopover();
        $scope.pitchingIn = false;
    });

}
