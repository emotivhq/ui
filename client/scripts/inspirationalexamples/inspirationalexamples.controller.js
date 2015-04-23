/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('InspirationalExamplesController', ['$scope','$timeout',
    InspirationalExamplesController]);

function InspirationalExamplesController($scope, $timeout) {
    var product = function(image, price, title, product, numPeople, link) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.product = product;
        this.numPeople = numPeople;
        this.link = link;
    };
    $scope.products = [
        new product(
            "/assets/howitworks/featuredCampaigns-julep.jpg",
            "$146.25",
            "6 months of seasonal beauty products for Marion's birthday",
            "6 Boxes of Julep Maven",
            "25",
            "https://www.giftstarter.co/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-cigars.jpg",
            "$122.28",
            "T1 HIMARS Smoke Break",
            "Gurkha Special Ops",
            "12",
            "https://www.giftstarter.co/giftstart/T1-HIMARS-Smoke-Break"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-watch.jpg",
            "$329.52",
            "Run Nikki Run!!!",
            "Garmin Forerunner 220 - Black/Red Bundle (Includes Heart Rate Monitor)",
            "12",
            "https://www.giftstarter.co/giftstart/Run-Nikki-Run"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    $scope.thirdProduct = $scope.products[(n+2)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(1000, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(1000, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
                jQuery('.product-item.third').fadeOut(1000, function() {
                    $scope.$apply(function() {$scope.thirdProduct = $scope.products[(n+2)%$scope.products.length]});
                    jQuery('.product-item.third').fadeIn(2000);
                });
            });
            jQuery('.product-item.first').fadeIn(2000);
            jQuery('.product-item.second').fadeIn(2000);
            timer = $timeout(rotate, 12000);
        });
    };
    var timer = $timeout(rotate, 12000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}
