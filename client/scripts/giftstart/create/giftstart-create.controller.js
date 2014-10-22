/**
 * Created by stuart on 5/5/14.
 */

GiftStarterApp.controller('GiftStartCreateController',
    ['$scope','GiftStartService','$location','ProductService',
        'UserService','PopoverService','$http','$timeout',
        'Analytics','AppStateService','LocalStorage',

    function($scope,  GiftStartService,  $location,  ProductService,
             UserService,  PopoverService,  $http,  $timeout, Analytics,
             AppStateService, LocalStorage) {
        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = false;

        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [3, 5],
            [4, 4], [3, 6], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
            $scope.selectedXYSet = 0;
            for (var guess = 0; guess < $scope.xySets.length; guess++) {
                if ($scope.inputPrice/$scope.xySets[guess][0]/$scope.xySets[guess][1] < 20.5) {
                    return guess;
                }
            }
            return $scope.xySets.length - 1;
        }

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

        $scope.showIntroCopy = false;
        $scope.fromReferral = false;

        if (ProductService.product.product_url == "") {
            if (!LocalStorage.get('/GiftStartCreateController/referral') &&
                !LocalStorage.get('/GiftStartCreateController/session')) {
//                $location.path("");
            }
//            if (AppStateService.state) {
//                if (!AppStateService.state.createSession) {
//                    // User navigated directly here, direct them to home page
//                    $location.path("");
//                }
//            }
        }

        $scope.shippingChanged = function() {
            if ($scope.shippingZip.length == 5) {
                Analytics.track('campaign', 'shipping updated');
                $scope.fetchingTaxRate = true;
                $scope.shippingDetailsSubmitted = true;

                $http({method: 'POST', url: '/product',
                    data: {action: 'get-tax-and-shipping', shipping_address: 'street',
                        shipping_city: 'city', shipping_state: $scope.shippingState,
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
            GiftStartService.giftStart.product.img_url = $scope.selectedImg;
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

        $scope.moreParts = function() {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet < $scope.xySets.length - 1) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }
        };

        $scope.fewerParts = function() {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }
        };

        $scope.updateOverlay = function() {
            GiftStartService.giftStart.columns = $scope.x;
            GiftStartService.giftStart.rows = $scope.y;
            GiftStartService.giftStart.product.total_price = $scope.totalPrice;
            GiftStartService.giftStart.parts = GiftStartService.makeParts($scope.x * $scope.y, $scope.totalPrice);
            $scope.giftStart = GiftStartService.giftStart;
            $scope.$broadcast('overlay-updated');
        };

        $scope.next = function() {
            GiftStartService.title = $scope.title;
            GiftStartService.description = $scope.description;
            GiftStartService.productUrl = ProductService.product.product_url;
            GiftStartService.productTitle = ProductService.product.title;
            GiftStartService.retailerLogo = ProductService.logo;
            GiftStartService.productImgUrl = $scope.selectedImg;
            GiftStartService.rows = $scope.y;
            GiftStartService.columns = $scope.x;
            GiftStartService.productPrice = $scope.inputPrice*100;
            GiftStartService.shippingZip = $scope.shippingZip;
            GiftStartService.shippingState = $scope.shippingState;
            GiftStartService.salesTax = $scope.salesTax;
            GiftStartService.shipping = $scope.shipping;
            GiftStartService.serviceFee = $scope.serviceFee;
            GiftStartService.totalPrice = $scope.totalPrice;
            GiftStartService.specialNotes = $scope.specialNotes;
            GiftStartService.gcEmail = $scope.gcEmail;
            GiftStartService.gcName = UserService.name;

            LocalStorage.set('/GiftStartCreateController/session', {
                title: $scope.title,
                description: $scope.description,
                productUrl: ProductService.product.product_url,
                productTitle: ProductService.product.title,
                retailerLogo: ProductService.logo,
                productImgUrl: $scope.selectedImg,
                rows: $scope.y,
                columns: $scope.x,
                selectedXYSet: $scope.selectedXYSet,
                productPrice: $scope.inputPrice*100,
                shippingZip: $scope.shippingZip,
                shippingState: $scope.shippingState,
                salesTax: $scope.salesTax,
                shipping: $scope.shipping,
                serviceFee: $scope.serviceFee,
                totalPrice: $scope.totalPrice,
                specialNotes: $scope.specialNotes,
                gcEmail: $scope.gcEmail,
                gcName: UserService.name

            });

            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0)) {

                if (UserService.loggedIn) {
                    Analytics.track('campaign', 'campaign submitted', '',
                        $scope.totalPrice);
                    LocalStorage.remove('/GiftStartCreateController/session');
                    LocalStorage.remove('/GiftStartCreateController/referral');
                    GiftStartService.createGiftStart();
                } else {
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

        var session = LocalStorage.get('/GiftStartCreateController/session');
        var referral = LocalStorage.get('/GiftStartCreateController/referral');
        if (session) {
            restoreFromSession(session);
        }  else if (referral) {
            restoreFromReferral(referral);
        }
        LocalStorage.remove('/GiftStartCreateController/session');
        LocalStorage.remove('/GiftStartCreateController/referral');

        function extractReferral() {
            console.log($location.search());
            if ($location.search().product_url &&
                $location.search().title &&
                $location.search().price &&
                $location.search().img_url &&
                $location.search().source) {
                console.log($location.search());
                LocalStorage.set('/GiftStartCreateController/referral', {
                    product_url: $location.search().product_url,
                    productTitle: $location.search().title,
                    price: $location.search().price,
                    productImgUrl: $location.search().img_url,
                    source: $location.search().source
                });
                $location.search('product_url', null);
                $location.search('title', null);
                $location.search('price', null);
                $location.search('img_url', null);
                $location.search('source', null);
            }
        }

        function restoreFromSession(session) {
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

            Analytics.track('client', 'referred from', referral.source);
        }

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);

        if (referral) {
            $scope.selectedXYSet = calculateInitialNumParts();
        }
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];
        $scope.updateGiftStartImage();
        $scope.priceChanged();

        // Scroll to the top of the form on controller creation
//        $timeout(function() {
//            if (referral) {
//                document.querySelector('#header-logo').scrollIntoView();
//            } else {
//                var root = angular.element(document.querySelector('#giftstart-contact-wrapper'))[0];
//                root.querySelector('.block.image').scrollIntoView();
//            }
//        }, 250);
    }
]);
