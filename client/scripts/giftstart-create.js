/**
 * Created by stuart on 5/5/14.
 */


GiftStarterApp.controller('GiftStartCreateShippingController', [
            '$scope','GiftStartService','$location','ProductService',
    function($scope,  GiftStartService,  $location,  ProductService) {
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
            $scope.gcName = $scope.shippingName;
            $scope.gcPhoneNumber = $scope.shippingPhoneNumber;
            $scope.gcEmail = $scope.shippingEmail;
            console.log($scope.shippingForm);
        };

        $scope.next = function() {
            if ($scope.shippingForm.$valid) {
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

        // So that users that were browsing another giftstart don't experience the "no overlay initially" bug
        GiftStartService.giftStart.gsid = 0;


        GiftStartService.giftStart = GiftStartService.buildGiftStart();

    }
]);

GiftStarterApp.controller('GiftStartCreateCampaignController', [
            '$scope','GiftStartService','$location','ProductService','UserService','PopoverService','$http','$timeout',
    function($scope,  GiftStartService,  $location,  ProductService,  UserService,  PopoverService,  $http,  $timeout) {
        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = true;
        $scope.selectedXYSet = 7;
        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [1, 7], [2, 4], [3, 3], [2, 5], [3, 4], [3, 5],
            [4, 4], [3, 6], [4, 5], [4, 6], [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];

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

        $http({method: 'POST', url: '/product',
            data: {action: 'get-tax-and-shipping', shipping_address: GiftStartService.shippingAddress,
                shipping_city: GiftStartService.shippingCity, shipping_state: GiftStartService.shippingState,
                shipping_zip: GiftStartService.shippingZip}})
            .success(function(result) {
                $scope.salesTaxRate = result.tax;
                $scope.fetchingTaxRate = false;
                $scope.priceChanged();
            })
            .error(function(reason) {console.log(reason)});

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
            GiftStartService.giftStart.product.img_url = $scope.selectedImg;
        };

        $scope.priceChanged = function() {
            $scope.salesTax = $scope.salesTaxRate * $scope.inputPrice * 100;
            $scope.serviceFee = 0.08 * $scope.inputPrice * 100;
            $scope.shipping = 0.045 * $scope.inputPrice * 100;
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax + $scope.serviceFee + $scope.shipping;
            $scope.updateOverlay();
        };

        $scope.moreParts = function() {
            if ($scope.selectedXYSet < $scope.xySets.length) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }
        };

        $scope.fewerParts = function() {
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
            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0)) {
                mixpanel.track("GiftStart staged");
                ga('send', 'event', 'campaign', 'staged');

                GiftStartService.title = $scope.title;
                GiftStartService.description = $scope.description;
                GiftStartService.productUrl = ProductService.product.url;
                GiftStartService.productImgUrl = $scope.selectedImg;
                GiftStartService.rows = $scope.y;
                GiftStartService.columns = $scope.x;
                GiftStartService.productPrice = $scope.inputPrice*100;
                GiftStartService.salesTax = $scope.salesTax;
                GiftStartService.shipping = $scope.shipping;
                GiftStartService.serviceFee = $scope.serviceFee;
                GiftStartService.totalPrice = $scope.totalPrice;
                GiftStartService.specialNotes = $scope.specialNotes;

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
                mixpanel.track("description too short displayed");
                ga('send', 'event', 'campaign-create', 'description too short displayed');
            } else if (longEnough && !$scope.descriptionLongEnough) {
                mixpanel.track("description too short hidden");
                ga('send', 'event', 'campaign-create', 'description too short hidden');
            }
            $scope.descriptionLongEnough = longEnough;
        };

        $scope.updateGiftStartImage();
        $scope.priceChanged();

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);
    }
]);
