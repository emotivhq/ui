/**
 * Created by stuart on 5/5/14.
 */


GiftStarterApp.controller('GiftStartCreateShippingController', [
            '$scope','GiftStartService','$location','ProductService','Analytics',
    function($scope,  GiftStartService,  $location,  ProductService,  Analytics) {
        $scope.shippingName = '';
        $scope.shippingAddress = '';
        $scope.shippingCity = '';
        $scope.shippingState = '';
        $scope.shippingZip = '';
        $scope.shippingPhoneNumber = '';
        $scope.shippingEmail = '';

        $scope.gcName = '';
        $scope.gcPhoneNumber = '';
        $scope.gcEmail = '';

        $scope.invalidInputs = true;

        $scope.browserWarning =
            (navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod') &&
            (navigator.userAgent.indexOf('CriOS') > -1 || navigator.userAgent.indexOf('mercury') > -1);

        if (ProductService.product.product_url == "") {
            // User navigated directly here, direct them to home page
            $location.path("");
        }

        $scope.sameAsShipping = function() {
            Analytics.track('campaign', 'same as shipping clicked');
            $scope.gcName = $scope.shippingName;
            $scope.gcPhoneNumber = $scope.shippingPhoneNumber;
            $scope.gcEmail = $scope.shippingEmail;
            console.log($scope.shippingForm);
        };

        $scope.next = function() {
            if ($scope.shippingForm.$valid) {
                Analytics.track('campaign', 'shipping/contact information submitted');
                GiftStartService.shippingName = $scope.shippingName;
                GiftStartService.shippingAddress = $scope.shippingAddress;
                GiftStartService.shippingCity = $scope.shippingCity;
                GiftStartService.shippingState = $scope.shippingState;
                GiftStartService.shippingZip = $scope.shippingZip;
                GiftStartService.shippingPhoneNumber = $scope.shippingPhoneNumber;
                GiftStartService.shippingEmail = $scope.shippingEmail;
                GiftStartService.gcName = $scope.gcName;
                GiftStartService.gcPhoneNumber = $scope.gcPhoneNumber;
                GiftStartService.gcEmail = $scope.gcEmail;

                $location.path("campaign-create");
            }
        };

    }
]);

GiftStarterApp.controller('GiftStartCreateCampaignController', [
            '$scope','GiftStartService','$location','ProductService','UserService','PopoverService','$http','$timeout',
            'Analytics',
    function($scope,  GiftStartService,  $location,  ProductService,  UserService,  PopoverService,  $http,  $timeout,
             Analytics) {
        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = false;


        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [1, 7], [2, 4], [3, 3], [2, 5], [3, 4], [3, 5],
            [4, 4], [3, 6], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
            for (var guess = 0; guess < $scope.xySets.length; guess++) {
                if ($scope.inputPrice/$scope.xySets[guess][0]/$scope.xySets[guess][1] < 20.5) {
                    return guess;
                }
            }
            return $scope.xySets.length - 1;
        }

        $scope.selectedXYSet = calculateInitialNumParts();
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];

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

        if (ProductService.product.product_url == "") {
            // User navigated directly here, direct them to home page
            $location.path("");
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
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax + $scope.serviceFee + $scope.shipping;
            $scope.updateOverlay();
        };

        $scope.moreParts = function() {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet < $scope.xySets.length) {
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
            GiftStartService.productUrl = ProductService.product.url;
            GiftStartService.productTitle = ProductService.title;
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

            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0)) {
                Analytics.track('campaign', 'campaign submitted');

                if (UserService.loggedIn) {
                    scrollTo(0, 0);
                    GiftStartService.createGiftStart();
                } else {
                    PopoverService.giftstartCreateLogin = true;
                    $location.hash("login");
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

        // So that users that were browsing another giftstart don't experience the "no overlay initially" bug
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

        $scope.updateGiftStartImage();
        $scope.priceChanged();

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);
    }
]);
