/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('InspirationalExamplesController', ['$scope','$timeout',
    InspirationalExamplesController]);

function InspirationalExamplesController($scope, $timeout) {
    var product = function(image, price, title, product, numPeople, link, desc) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.product = product;
        this.numPeople = numPeople;
        this.link = link;
        this.desc = desc;
    };
    $scope.products = [
        new product(
            "/assets/howitworks/featuredCampaigns-julep.jpg",
            "$146.25",
            "6 months of seasonal beauty products for Marion's birthday",
            "6 Boxes of Julep Maven",
            "11",
            "https://www.giftstarter.co/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "/assets/inspirationalexamples/6-months-of-beauty.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-cigars.jpg",
            "$122.28",
            "T1 HIMARS Smoke Break",
            "Gurkha Special Ops",
            "3",
            "https://www.giftstarter.co/giftstart/T1-HIMARS-Smoke-Break",
            "/assets/inspirationalexamples/t1-himars-smoke-break.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-tiffanys.jpg",
            "$147.20",
            "Jessi's 30th Birthday Blowout!",
            "TIFFANY 1837™ Circle Pendant",
            "7",
            "https://www.giftstarter.co/giftstart/Jessis-30th-Birthday-Blowout",
            "/assets/inspirationalexamples/jessi-30th-birthday-blowout.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-ghosttruck.jpg",
            "$448.80",
            "Let's help Wix move!",
            "Gift of Moving by Ghostruck (1br move within 30 mi of Seattle)",
            "15",
            "https://www.giftstarter.co/giftstart/Lets-help-Wix-move",
            "/assets/inspirationalexamples/lets-help-wix-move.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-lens.jpg",
            "$1,270.08",
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "Canon EF 135mm f/2L USM Lens for Canon SLR Cameras",
            "8",
            "https://www.giftstarter.co/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "/assets/inspirationalexamples/just-when-you-thought.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-watch.jpg",
            "$329.52",
            "Run Nikki Run!!!",
            "Garmin Forerunner 220 - Black/Red Bundle (Includes Heart Rate Monitor)",
            "11",
            "https://www.giftstarter.co/giftstart/Run-Nikki-Run",
            "/assets/inspirationalexamples/run-nikki-run.png"
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
