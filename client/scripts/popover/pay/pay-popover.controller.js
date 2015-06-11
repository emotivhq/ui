/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PayPopoverController', ['$scope','$rootScope','GiftStartService',
    'PopoverService','UserService','Analytics','CardService','$timeout',
    PayPopoverController]);

function PayPopoverController($scope, $rootScope, GiftStartService, PopoverService,
                              UserService,  Analytics, CardService, $timeout) {

    $scope.initialize = function() {

        jQuery('.payment form').find("input[type=text], input[type=email]").val('');

        CardService.fetch();

        // Now that user is logged in, create giftstart in server
        if (!GiftStartService.giftStart.gsid) {
            GiftStartService.createGiftStart()
        }

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;
        $scope.emailSubscribe = true;
        $scope.saveCreditCard = true;
        $scope.pitchingIn = false;
        $scope.userOnMailingList = UserService.onMailingList;
        $scope.addressZip = '';
        $scope.email = '';
        $scope.firstname = '';
        $scope.lastname = '';
        if(UserService.loggedIn) {
            UserService.getUser(UserService.uid, function(data) {
                var u = data[Object.keys(data)[0]];
                $scope.email = u.email;
                if(u.name) {
                    var names = u.name.split(" ");
                    if (names.length > 0) {
                        $scope.firstname = names[0];
                    }
                    if (names.length > 1) {
                        $scope.lastname = names[names.length-1];
                    }
                }
            });
        }

        $scope.cards = CardService.cards;
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.cardsLoading = !(CardService.cards.length > 0);

        $scope.errorMessage = '';

        $scope.submitted = false;

        $scope.numberImgUrl = '/assets/cc_icon_card_number.png';
        $scope.cvcImgUrl = '/assets/cc_icon_cvc.png';
        $scope.expiryImgUrl = '/assets/cc_icon_expiry.png';
        $scope.zipImgUrl = '/assets/cc_icon_zip.png';
        $scope.emailImgUrl = '/assets/cc_icon_email.png';

    };

    $scope.initialize();

    $scope.hidePopover = function() {
        PopoverService.hidePopover();
        $rootScope.$broadcast('paybox-hidden');
    };

    $rootScope.$on('paybox-shown',$scope.initialize);

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

    $scope.trackConversion =  function() {
        var google_conversion_struct = {
            google_conversion_id: 961290155,
            google_conversion_language: "en",
            google_conversion_format: "2",
            google_conversion_color: "ffffff",
            google_conversion_label: "mwFzCO75mlgQq7-wygM",
            google_conversion_value: GiftStartService.giftStart.totalSelection,
            google_conversion_currency: "USD",
            google_remarketing_only: false
        };
        window.google_trackConversion(google_conversion_struct);
        console && console.log && console.log(google_conversion_struct);
        window.uetq = window.uetq || [];
        var data = {
            ec: 'PitchInThankYou',
            ea: 'PitchInSuccess',
            el: 'PurchaseConfirmation',
            ev: GiftStartService.giftStart.totalSelection,
            gv: GiftStartService.giftStart.totalSelection
        };
        window.uetq.push(data);
        console && console.log && console.log(data);
    };

    $scope.paypalSubmit = function() {
        // 1. User submits card details in field
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    if (data['payment-error']) {
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                    }
                    $timeout(function(){
                        $scope.pitchingIn = false;
                        //$rootScope.$broadcast('paybox-hidden');
                    },1000);
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachCardData($scope.number,$scope.cvc,$scope.expiry,$scope.addressZip);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.firstname = $scope.firstname;
            GiftStartService.payment.lastname = $scope.lastname;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                if (data['payment-error']) {
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                }
                $timeout(function(){
                    $scope.pitchingIn = false;
                    //$rootScope.$broadcast('paybox-hidden');
                },1000);
            });
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
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    $scope.pitchingIn = false;
                    if (data['payment-error']) {
                        console&&console.log&&console.log(data['payment-error']);
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                        $rootScope.$broadcast('paybox-hidden');
                    }
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else if (response.error) {
            $scope.pitchingIn = false;
            //$rootScope.$broadcast('paybox-hidden');
            console&&console.log&&console.log(response);
            Analytics.track('pitchin', 'payment error');
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachStripeResponse(response);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                $scope.pitchingIn = false;
                if (data['payment-error']) {
                    console&&console.log&&console.log(data['payment-error']);
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                    $rootScope.$broadcast('paybox-hidden');
                }
            });
        }
    };

    $scope.$on('payment-success', function() {
        Analytics.track('pitchin', 'payment succeeded',
            GiftStartService.giftStart.gsid.toString(),
            $scope.currentCharge);
        //if(PopoverService.currentLocation=='pay') {
        //    PopoverService.nextPopover();
        //}
        PopoverService.setPopover('note');
        $scope.pitchingIn = false;
        $rootScope.$broadcast('paybox-hidden');
        $scope.number = '';
        $scope.cvc = '';
        $scope.expiry = '';
        $scope.addressZip = '';
    });

    $scope.$on('cards-fetch-success', cardsFetched);

    $scope.$on('cards-fetch-failure', cardsFetchFailed);

    function cardsFetchFailed() {
        $scope.cardsLoading = false;
    }

    function cardsFetched() {
        $scope.cards = CardService.cards;
        if ($scope.cards.length > 0) {
            $scope.selectCard.apply({card: $scope.cards[0]});
        }
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.cardsLoading = false;
    }

    $scope.deselectCards = deselectCards;
    function deselectCards(except) {
        $scope.selectedCard = '';
        for (var i = 0; i < $scope.cards.length; i++) {
            if ($scope.cards[i].fingerprint != except) {
                $scope.cards[i].selected = false;
            }
        }
    }

    $scope.showDeleteCard = function() {
        for (var i = 0; i < $scope.cards.length; i++) {
            $scope.cards[i].showDelete = false;
        }
        this.card.showDelete = true;
    };

    $scope.hideDeleteCard = function() {
        this.card.showDelete = false;
    };

    $scope.deleteCard = function() {
        alert("TBD: delete "+this.card.last_four)
    };

    $scope.selectCard = function(allowToggle) {
        if (this.card.fingerprint == $scope.selectedCard) {
            deselectCards();
            //auto-select first card
            $scope.selectCard.apply({card: $scope.cards[0]});
        } else {
            deselectCards(this.card.fingerprint);
            this.card.selected = true;
            $scope.selectedCard = this.card.fingerprint;
        }
    };

    //cardsFetched();
}
