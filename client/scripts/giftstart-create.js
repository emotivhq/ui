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

    }
]);

GiftStarterApp.controller('GiftStartCreateCampaignController', [
            '$scope','GiftStartService','$location','ProductService','FacebookService','PopoverService','$http',
    function($scope,  GiftStartService,  $location,  ProductService,  FacebookService,  PopoverService,  $http) {
        $scope.inputPrice = ProductService.product.price/100;
        $scope.totalPrice = 0;
        $scope.salesTaxRate = 0.098;
        $scope.fetchingTaxRate = true;
        $scope.selectedXYSet = 7;
        $scope.xySets = [[2, 1], [3, 1], [2, 2], [5, 1], [3, 2], [7, 1], [4, 2], [3, 3], [5, 2], [4, 3], [5, 3],
            [4, 4], [6, 3], [5, 4], [6, 4], [5, 5], [6, 5], [6, 6], [7, 6], [7, 7]];
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];

        $scope.product = ProductService.product;
        $scope.imgIndex = 0;
        $scope.selectedImg = ProductService.product.imgs[$scope.imgIndex];
        $scope.title = '';
        $scope.description = '';
        $scope.specialNotes = '';

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
        };

        $scope.previousImage = function() {
            $scope.imgIndex = ($scope.imgIndex + $scope.product.imgs.length - 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
        };

        $scope.priceChanged = function() {
            $scope.salesTax = $scope.salesTaxRate * $scope.inputPrice * 100;
            $scope.serviceFee = 0.08 * $scope.inputPrice * 100;
            $scope.shipping = 0.045 * $scope.inputPrice * 100;
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax + $scope.serviceFee + $scope.shipping;
        };

        $scope.moreParts = function() {
            if ($scope.selectedXYSet < $scope.xySets.length) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
            }
        };

        $scope.fewerParts = function() {
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
            }
        };

        $scope.next = function() {
            if ($scope.campaignForm.$valid) {
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

                if (FacebookService.loggedIn) {
                    GiftStartService.createGiftStart();
                } else {
                    PopoverService.giftstartCreateLogin = true;
                    $location.hash("login");
                }
            }
        };

        $scope.priceChanged();
    }
]);
