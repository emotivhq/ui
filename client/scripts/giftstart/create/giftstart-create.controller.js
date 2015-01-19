/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var controller = function ($scope,
                               GiftStartService,
                               $location,
                               ProductService,
                               UserService,
                               PopoverService,
                               $http,
                               $timeout,
                               Analytics,
                               AppStateService) {
        var campaignLength = 10;

        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.campaignEndDate = null;
        $scope.getCampaignLength = function (date) {
            if (angular.isDate(date)) {
                campaignLength = Math.round((date.getTime() - new Date().getTime()) / 86400000);
            }

            return campaignLength;
        };
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = false;

        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [2, 4],
            [3, 3], [2, 5], [3, 4], [3, 5], [4, 4], [3, 6], [4, 5], [4, 6],
            [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
            $scope.selectedXYSet = 0;
            for (var guess = 0; guess < $scope.xySets.length; guess++) {
                var calcPrice = $scope.inputPrice / $scope.xySets[guess][0] /
                    $scope.xySets[guess][1];
                if (calcPrice < 20.5) {
                    return guess;
                }
            }
            return $scope.xySets.length - 1;
        }

        $scope.shippingName = '';
        $scope.shippingEmail = '';
        $scope.shippingZip = '';
        $scope.shippingState = '';
        $scope.shippingDetailsSubmitted = false;

        $scope.product = ProductService.product;
        $scope.imgIndex = 0;
        $scope.selectedImg = ProductService.product.imgs[$scope.imgIndex];
        $scope.title = '';
        $scope.description = '';
        $scope.specialNotes = '';
        $scope.pitchInsInitialized = false;
        $scope.giftStart = GiftStartService.giftStart;
        $scope.descriptionLongEnough = true;

        this.referral = {};
        $scope.showIntroCopy = false;
        $scope.fromReferral = false;

        $scope.dateChosenValid = dateChosenValid;

        $scope.shippingChanged = function() {
            if ($scope.shippingZip.length == 5) {
                Analytics.track('campaign', 'shipping updated');
                $scope.fetchingTaxRate = true;
                $scope.shippingDetailsSubmitted = true;

                $http({method: 'POST', url: '/product',
                    data: {action: 'get-tax-and-shipping',
                        shipping_address: 'street', shipping_city: 'city',
                        title: ProductService.product.title,
                        shipping_state: $scope.shippingState,
                        shipping_zip: $scope.shippingZip}})
                    .success(function(result) {
                        Analytics.track('product', 'tax and shipping fetch success');
                        $scope.salesTaxRate = result.tax;
                        $scope.fetchingTaxRate = false;
                        $scope.priceChanged();
                    })
                    .error(function(reason) {
                        $scope.fetchingTaxRate = false;
                        Analytics.track('product', 'tax and shipping fetch failed');
                    });
            }
        };

        $scope.nextImage = function() {
            $scope.imgIndex = ($scope.imgIndex + 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.previousImage = function() {
            $scope.imgIndex = ($scope.imgIndex + $scope.product.imgs.length - 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.updateGiftStartImage = function() {
            Analytics.track('campaign', 'selected image changed');
            GiftStartService.giftStart.product_img_url = $scope.selectedImg;
        };

        $scope.priceChanged = function() {
            Analytics.track('campaign', 'price changed');
            $scope.salesTax = $scope.salesTaxRate * $scope.inputPrice * 100;
            $scope.serviceFee = 0.08 * $scope.inputPrice * 100;
            $scope.shipping = 0.045 * $scope.inputPrice * 100;
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax +
                $scope.serviceFee + $scope.shipping;
            $scope.updateOverlay();
        };

        $scope.moreParts = function(event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet < $scope.xySets.length - 1) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.fewerParts = function(event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.updateOverlay = function() {
            GiftStartService.giftStart.columns = $scope.x;
            GiftStartService.giftStart.rows = $scope.y;
            GiftStartService.giftStart.total_price = $scope.totalPrice;
            GiftStartService.giftStart.parts = GiftStartService.makeParts($scope.x * $scope.y, $scope.totalPrice);
            $scope.giftStart = GiftStartService.giftStart;
            $scope.$broadcast('overlay-updated');
        };

        $scope.makeUUID = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };

        function stagedGiftStart(uuid) {
            return {
                'title': $scope.title,
                'description': $scope.description,
                'product_url': ProductService.product.product_url,
                'product_img_url': $scope.selectedImg,
                'product_price': $scope.inputPrice*100,
                'product_title': ProductService.product.title,
                'sales_tax': $scope.salesTax,
                'shipping': $scope.shipping,
                'service_fee': $scope.serviceFee,
                'total_price': $scope.totalPrice,
                'campaign_length': campaignLength,
                'columns': $scope.x,
                'rows': $scope.y,
                'shipping_name': $scope.shippingName,
                'shipping_email': $scope.shippingEmail,
                'shipping_state': $scope.shippingState,
                'shipping_zip': $scope.shippingZip,
                'gc_email': $scope.gcEmail,
                'staging_uuid': uuid
            }
        }

        function clearCreateData() {
            $scope.title = '';
            $scope.description = '';
            $scope.selectedImg = '';
            $scope.shippingName = '';
            $scope.shippingEmail = '';
            $scope.shippingZip = '';
            $scope.shippingState = '';
            $scope.inputPrice = 0;
            campaignLength = 10;
            $scope.shippingDetailsSubmitted = false;
        }

        function dateChosenValid() {
            return !($scope.getCampaignLength($scope.campaignEndDate) > 29 ||
                $scope.getCampaignLength($scope.campaignEndDate) < 2);
        }

        $scope.hideValidationError = {
            title: true,
            description: true,
            shippingState: true,
            shippingZip: true,
            shippingName: true,
            shippingEmail: true,
            campaignEndDate: true,
            gcEmail: true
        };

        $scope.validationTrigger = {
            createButtonClicked: false
        }

        $scope.createButtonClicked = false;

        $scope.next = function() {
            var keys = Object.keys($scope.hideValidationError)
            keys.forEach(function (key) {
                $scope.hideValidationError[key] = false;
            })
            $scope.validationTrigger.createButtonClicked = true;

            GiftStartService.title = $scope.title;
            GiftStartService.description = $scope.description;
            GiftStartService.productUrl = ProductService.product.product_url;
            GiftStartService.productTitle = ProductService.product.title;
            GiftStartService.retailerLogo = ProductService.logo;
            GiftStartService.productImgUrl = $scope.selectedImg;
            GiftStartService.rows = $scope.y;
            GiftStartService.columns = $scope.x;
            GiftStartService.productPrice = $scope.inputPrice*100;
            GiftStartService.shippingName = $scope.shippingName;
            GiftStartService.shippingEmail = $scope.shippingEmail;
            GiftStartService.shippingZip = $scope.shippingZip;
            GiftStartService.shippingState = $scope.shippingState;
            GiftStartService.salesTax = $scope.salesTax;
            GiftStartService.shipping = $scope.shipping;
            GiftStartService.serviceFee = $scope.serviceFee;
            GiftStartService.totalPrice = $scope.totalPrice;
            GiftStartService.campaignLength = campaignLength;
            GiftStartService.specialNotes = $scope.specialNotes;
            GiftStartService.gcEmail = $scope.gcEmail;
            GiftStartService.gcName = UserService.name;

            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0) &&
                dateChosenValid()) {
                if (UserService.loggedIn) {
                    Analytics.track('campaign', 'campaign submitted', '',
                        $scope.totalPrice);
                    GiftStartService.createGiftStart();
                    clearCreateData();
                } else {
                    var uuid = $scope.makeUUID();
                    // Send giftstart to staging
                    $http.post('/giftstart/create.json',
                        stagedGiftStart(uuid));
                    AppStateService.set('staging_uuid', uuid);

                    PopoverService.giftstartCreateLogin = true;
                    PopoverService.setPopover('login');
                }
            }
        };

        $scope.onDescriptionBlur = function() {
            var longEnough = $scope.description.length > 400;
            if (!longEnough && $scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short displayed');
            } else if (longEnough && !$scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short hidden');
            }
            $scope.descriptionLongEnough = longEnough;
        };

        // So that users that were browsing another giftstart don't experience
        // the "no overlay initially" bug
        if (!GiftStartService.title) {
            GiftStartService.giftStart.gsid = 0;
            GiftStartService.giftStart = GiftStartService.buildGiftStart();
        } else {
            $scope.inputPrice = GiftStartService.productPrice/100;
            $scope.shippingZip = GiftStartService.shippingZip;
            $scope.shippingState = GiftStartService.shippingState;
            $scope.title = GiftStartService.title;
            $scope.description = GiftStartService.description;
            $scope.specialNotes = GiftStartService.specialNotes;
            $scope.giftStart = GiftStartService.giftStart;
        }

        $scope.selectedXYSet = calculateInitialNumParts();

        extractReferral();
        extractPromo();


        function extractReferral() {
            if ($location.search().product_url &&
                $location.search().title &&
                $location.search().price &&
                $location.search().img_url &&
                $location.search().source) {
                restoreFromReferral({
                    product_url: $location.search().product_url,
                    productTitle: $location.search().title,
                    productImgUrl: $location.search().img_url,
                    price: $location.search().price,
                    source: $location.search().source
                });
                $location.search('product_url', null);
                $location.search('title', null);
                $location.search('price', null);
                $location.search('img_url', null);
                $location.search('source', null);
            }
        }

        function extractPromo() {
            if ($location.search().promo == 'dress-for-success') {
                $scope.title = 'Gift a Start Collection';
                $scope.description = 'Give the gift of confidence this holiday season with this curated assortment of beautiful basics. butter LONDON is proud to partner with Dress for Success to gift a new start to women in need. Dress for Success is a not-for-profit organization dedicated to helping women get back on their feet and back into the workforce. For these women giving something as simple as a lipstick can make an impact. Help deliver a new start this holiday season by starting a GiftStart for our Gift A Start Collection.';
                $scope.shippingZip = '98118';
                $scope.shippingState = 'WA';
                $scope.shippingChanged();
                $location.search('promo', null);
            }
        }

        function restoreFromSession(session) {
            // This function doesn't seem to in use
            $scope.title = session.title;
            $scope.description = session.description;
            ProductService.product.product_url = session.productUrl;
            ProductService.product.title = session.productTitle;
            ProductService.logo = session.retailerLogo;
            $scope.selectedImg = session.productImgUrl;
            $scope.selectedXYSet = session.selectedXYSet;
            $scope.y = session.rows;
            $scope.x = session.columns;
            $scope.inputPrice = session.productPrice / 100;
            $scope.shippingZip = session.shippingZip;
            $scope.shippingState = session.shippingState;
            $scope.salesTax = session.salesTax;
            $scope.shipping = session.shipping;
            $scope.serviceFee = session.serviceFee;
            $scope.totalPrice = session.totalPrice;
            $scope.campaignLength = session.campaignLength;
            $scope.specialNotes = session.specialNotes;
            $scope.gcEmail = session.gcEmail;

            $scope.$on('login-success', $scope.next);
        }

        function restoreFromReferral(referral) {
            // If user was referred here from a brand
            ProductService.product.product_url = referral.product_url;
            ProductService.product.title = referral.productTitle;
            ProductService.product.imgs = [referral.productImgUrl];
            $scope.selectedImg = referral.productImgUrl;
            $scope.inputPrice = parseInt(referral.price)/100;
            $scope.showIntroCopy = true;
            $scope.fromReferral = true;
            $scope.referredFrom = getReferrerName(referral.source);

            $scope.ghostruck = /ghostruck/.test(referral.source.toLowerCase());

            // special for ghostruck: auto zip and state
            if (/ghostruck/.test(referral.source.toLowerCase())) {
                $scope.shippingState = 'WA';
                $scope.shippingZip = '98118';
                $scope.shippingChanged();
            }

            Analytics.track('client', 'referred from', referral.source);
        }

        function getReferrerName(source) {
            if (/ghostruck/.test(source.toLowerCase())) {
                return 'Ghostruckers!';
            } else {
                return '';
            }
        }

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);

        if (this.referral) {
            $scope.selectedXYSet = calculateInitialNumParts();
        }
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];
        $scope.updateGiftStartImage();
        $scope.priceChanged();
    };

    app.controller('GiftStartCreateController', [
        '$scope',
        'GiftStartService',
        '$location',
        'ProductService',
        'UserService',
        'PopoverService',
        '$http',
        '$timeout',
        'Analytics',
        'AppStateService',
        controller]);

}(angular.module('GiftStarterApp')));
