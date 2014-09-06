/**
 * Created by stuart on 5/5/14.
 */

GiftStarterApp.controller('GiftStartCreateCampaignController', [
            '$scope','GiftStartService','$location','ProductService','UserService','PopoverService','$http','$timeout',
            'Analytics','AppStateService',
    function($scope,  GiftStartService,  $location,  ProductService,  UserService,  PopoverService,  $http,  $timeout,
             Analytics,  AppStateService) {
        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = false;

        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [2, 4], [3, 3], [2, 5], [3, 4], [3, 5],
            [4, 4], [3, 6], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
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

        if (ProductService.product.product_url == "") {
            if (AppStateService.state) {
                if (!AppStateService.state.createSession) {
                    // User navigated directly here, direct them to home page
                    $location.path("");
                }
            }
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

            AppStateService.giftstartCreateState({
                title: $scope.title,
                description: $scope.description,
                productUrl: ProductService.product.url,
                productTitle: ProductService.title,
                retailerLogo: ProductService.logo,
                productImgUrl: $scope.selectedImg,
                rows: $scope.y,
                columns: $scope.x,
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
                    scrollTo(0, 0);
                    Analytics.track('campaign', 'campaign submitted', '',
                        $scope.totalPrice);
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

        if (AppStateService.state) {
            if (AppStateService.state.createSession) {
                $scope.title = AppStateService.state.createSession.title;
                $scope.description = AppStateService.state.createSession.description;
                ProductService.product.url = AppStateService.state.createSession.productUrl;
                ProductService.title = AppStateService.state.createSession.productTitle;
                ProductService.logo = AppStateService.state.createSession.retailerLogo;
                $scope.selectedImg = AppStateService.state.createSession.productImgUrl;
                $scope.y = AppStateService.state.createSession.rows;
                $scope.x = AppStateService.state.createSession.columns;
                $scope.inputPrice = AppStateService.state.createSession.productPrice/100;
                $scope.shippingZip = AppStateService.state.createSession.shippingZip;
                $scope.shippingState = AppStateService.state.createSession.shippingState;
                $scope.salesTax = AppStateService.state.createSession.salesTax;
                $scope.shipping = AppStateService.state.createSession.shipping;
                $scope.serviceFee = AppStateService.state.createSession.serviceFee;
                $scope.totalPrice = AppStateService.state.createSession.totalPrice;
                $scope.specialNotes = AppStateService.state.createSession.specialNotes;
                $scope.gcEmail = AppStateService.state.createSession.gcEmail;
                $scope.$on('login-success', $scope.next);
                AppStateService.state.createSession = null;
            }
        } else if (AppStateService.giftstartReferralData) {
            // If user was referred here from a brand
            ProductService.product.url = AppStateService.giftstartReferralData.product_url;
            ProductService.title = AppStateService.giftstartReferralData.title;
            ProductService.product.imgs = [AppStateService.giftstartReferralData.img_url];
            $scope.selectedImg = AppStateService.giftstartReferralData.img_url;
            $scope.inputPrice = parseInt(AppStateService.giftstartReferralData.price)/100;
            $scope.showIntroCopy = true;
            Analytics.track('client', 'referred from', AppStateService.giftstartReferralData.source);
        }

        $scope.selectedXYSet = calculateInitialNumParts();
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);


        $scope.updateGiftStartImage();
        $scope.priceChanged();

        // Scroll to the top of the form on controller creation
        $timeout(function() {
            if (AppStateService.giftstartReferralData) {
                document.querySelector('#header-logo').scrollIntoView();
            } else {
                var root = angular.element(document.querySelector('#giftstart-contact-wrapper'))[0];
                root.querySelector('.block.image').scrollIntoView();
            }
        }, 250);
    }
]);
