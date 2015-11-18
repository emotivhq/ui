/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PayPopoverController', ['$scope','$rootScope','GiftStartService',
    'PopoverService','UserService','Analytics','CardService','$timeout', 'toastr',
    PayPopoverController]);

function PayPopoverController($scope, $rootScope, GiftStartService, PopoverService,
                              UserService,  Analytics, CardService, $timeout, toastr) {

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
        $scope.showDeleteCardDialogue = false;
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
        if($scope.submitted) {
            $rootScope.$broadcast('paybox-hidden');
        } else {
            $rootScope.$broadcast('paybox-hidden-cancel');
        }
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
		Analytics.eventTrack('Completed Order', { 
			id: GiftStartService.giftStart.gsid, 
			uid: UserService.uid, 
			name: $scope.firstname + '' + $scope.lastname, 
			price: GiftStartService.giftStart.totalSelection,
			category: 'Campaign'
		});
    };

    $scope.paypalSubmit = function() {
        // 1. User submits card details in field
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.pitchingIn = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    if (data['payment-error']) {
                        //$scope.errorMessage = data['payment-error'];
						toastr.error(data['payment-error'], 'Whoops!', {
  							positionClass: 'toast-bottom-right'
						});
                    } else {
                        $scope.submitted = true;
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
                    //$scope.errorMessage = data['payment-error'];
						toastr.error(data['payment-error'], 'Whoops!', {
  							positionClass: 'toast-bottom-right'
						});
                } else {
                    $scope.submitted = true;
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
                        //$scope.errorMessage = data['payment-error'];
						toastr.error(data['payment-error'], 'Whoops!', {
  							positionClass: 'toast-bottom-right'
						});
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
                    //$scope.errorMessage = data['payment-error'];
						toastr.error(data['payment-error'], 'Whoops!', {
  							positionClass: 'toast-bottom-right'
						});
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
        //PopoverService.setPopover('note');
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
        deselectCards();
        //auto-select first card
        if ($scope.cards.length > 0) {
            $scope.selectCard.apply({card: $scope.cards[0]});
        }
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.cardsLoading = false;
    }

    $scope.deselectCards = deselectCards;
    function deselectCards(except) {
        $scope.showDeleteCardDialogue = false;
        $scope.selectedCard = '';
        $scope.selectedLastFour = '';
        for (var i = 0; i < $scope.cards.length; i++) {
            if ($scope.cards[i].fingerprint != except) {
                $scope.cards[i].selected = false;
            }
        }
    }

    $scope.deleteSelectedCard = function() {
        $scope.showDeleteCardDialogue = false;
        if ($scope.selectedCard) {
            CardService.deleteCard($scope.selectedCard)
                .success(function(response){
                    CardService.fetch()
                });
        }
    };

    $scope.selectCard = function(allowToggle) {
        $scope.putNew = false;
        if (this.card.fingerprint == $scope.selectedCard) {
            deselectCards();
        } else {
            deselectCards(this.card.fingerprint);
            this.card.selected = true;
            $scope.selectedCard = this.card.fingerprint;
            $scope.selectedLastFour = this.card.last_four
        }
    };
}
