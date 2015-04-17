/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('StaffPicksController', ['$scope','$timeout',
    StaffPicksController]);

function StaffPicksController($scope, $timeout) {
    var product = function(image, price, title, desc, avatar) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.desc = desc;
        this.avatar = avatar;
    };
    $scope.products = [
        new product(
            "/assets/giftideas/category/wedding/vitamixThumb.jpg",
            "$500.00",
            "Vitamix",
            "this is a test",
            "/assets/about/img/arry.png"
        ),
        new product(
            "/assets/giftideas/category/giftcard/applebee-s-gift-card.png",
            "$300.00",
            "CANDLES",
            "this is a very very very very very very very very very very very very long description",
            "/assets/about/img/sharon.png"
        ),
        new product(
            "/assets/giftideas/category/wedding/vitamixThumb.jpg",
            "$509.00",
            "BOOP",
            "this is a test22",
            "/assets/about/img/jon.png"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(1000, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(1000, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
            });
            jQuery('.product-item.first').fadeIn(2000);
            jQuery('.product-item.second').fadeIn(2000);
            timer = $timeout(rotate, 5000);
        });
    };
    var timer = $timeout(rotate, 4000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}
