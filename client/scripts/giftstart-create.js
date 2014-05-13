/**
 * Created by stuart on 5/5/14.
 */


GiftStarterApp.controller('GiftStartCreateController', [
            '$scope','ProductService','GiftStartService','$location','FacebookService','PopoverService',
    function($scope,  ProductService,  GiftStartService,  $location,  FacebookService,  PopoverService) {

        $scope.x = 3;
        $scope.y = 3;
        $scope.xySets = [[1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5], [5, 5], [5, 6], [6, 6]];
        $scope.selectedXYSet = 3;
        $scope.product = ProductService.product;
        $scope.imgIndex = 0;
        $scope.selectedImg = ProductService.product.imgs[$scope.imgIndex];
        $scope.title = "";
        $scope.description = "";
        $scope.gsInvalid = true;

        $scope.gcPhoneNumber = '';
        $scope.gcEmail = '';
        $scope.shippingName = '';
        $scope.shippingAddress = '';
        $scope.shippingCity = '';
        $scope.shippingState = '';
        $scope.shippingZip = '';
        $scope.shippingPhoneNumber = '';

        $scope.price = 0;
        $scope.shipping = 10;
        $scope.salesTax = 0;
        $scope.serviceFee = 0;
        $scope.totalPrice = 0;

        if (ProductService.product.product_url == "") {
            // User navigated directly here, direct them to home page
            $location.path("");
        }

        $scope.nextImage = function() {
            $scope.imgIndex = ($scope.imgIndex + 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
        };

        $scope.previousImage = function() {
            $scope.imgIndex = ($scope.imgIndex + $scope.product.imgs.length - 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
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

        $scope.giftstart = function() {
            mixpanel.track("GiftStart staged");
            if (!$scope.gsInvalid) {
                GiftStartService.stageGiftStart($scope.title, $scope.description, $scope.selectedImg,
                    $scope.totalPrice, $scope.product.product_url, $scope.x, $scope.y,
                    $scope.gcPhoneNumber, $scope.gcEmail, $scope.shippingName, $scope.shippingAddress,
                    $scope.shippingCity, $scope.shippingState, $scope.shippingZip, $scope.shippingPhoneNumber);
                if (FacebookService.loggedIn) {
                    GiftStartService.fireGiftStartCreate();
                } else {
                    PopoverService.giftstartCreateLogin = true;
                    $location.hash("login");
                }
            }
        };

        $scope.shippingChanged = function() {
            // TODO: calculate this based on... something??
            $scope.shipping = 10;
            $scope.updateGsValidity();
        };

        $scope.priceChanged = function() {
            $scope.salesTax = 0.098 * $scope.price;
            $scope.serviceFee = 0.05 * $scope.price;
            $scope.totalPrice = $scope.price + $scope.salesTax + $scope.serviceFee + $scope.shipping;
            $scope.updateGsValidity();
        };

        $scope.updateGsValidity = function() {
            $scope.gsInvalid = (
                ($scope.title == '') ||
                ($scope.description == '') ||
                ($scope.gcPhoneNumber == '') ||
                ($scope.gcEmail == '') ||
                ($scope.shippingName == '') ||
                ($scope.shippingAddress == '') ||
                ($scope.shippingCity == '') ||
                ($scope.shippingState == '') ||
                ($scope.shippingZip == '') ||
                ($scope.shippingPhoneNumber == '') ||
                ($scope.price <= 0)
            );
        };

        $scope.browserWarning =
            (navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod') &&
            (navigator.userAgent.indexOf('CriOS') > -1 || navigator.userAgent.indexOf('mercury') > -1);
    }
]);
