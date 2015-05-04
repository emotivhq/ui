/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('StaffPicksController', ['$scope','$timeout',
    StaffPicksController]);

function StaffPicksController($scope, $timeout) {
    var product = function(image, price, title, desc, avatar, link) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.desc = desc;
        this.avatar = avatar;
        this.link = link;
    };
    $scope.products = [
        new product(
            "/assets/staffpicks/4momsBreeze.jpg",
            "$299.99",
            "4moms® Breeze®",
            "This is the one thing I repeatedly wish I would have splurged on. Typical pack and plays are such a pain to set up and take down, I long for the ease of this one every time!",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.co/giftideas/baby/4moms-Breeze-Playard"
        ),
        new product(
            "/assets/staffpicks/lumixgh4.jpg",
            "$1,497.99",
            "Lumix GH4",
            "It's an amazing video-centric DSLR. The Lumix GH4 shoots 4k at 24p, supports VFR and unlimited length, and boasts clean HDMI out and onboard WiFi & NFC – all at half the price of a Canon 5D!",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.co/search/lumix%20gh4"
        ),
        new product(
            "/assets/giftideas/category/electronics/apple-watch-milanese.jpg",
            "$699.99",
            "The Apple Watch Milanese",
            "I love all things tech - so I gotta try it! This band is something I would totally wear every day and even out to a dinner party. I bet my husband would steal it and wear it sometimes too.",
            "/assets/about/img/arry.png",
            "https://www.giftstarter.co/giftideas/electronics/Apple-Watch-Milanese"
        ),
        new product(
            "/assets/staffpicks/hue-personal-wireless-light.jpg",
            "$199.99",
            "Hue Personal Wireless Light",
            "The Philips Hue Personal Wireless Lighting Kit connects to your home Wi-Fi and" +
            " up to 50 Philips Hue Bulbs/Lighting. It is the most exciting and unique product. " +
            "The lights sync with an alarm, sets on schedules, " +
            "and the IFTTT connectivity to other 3rd party apps is mindblowing.",
            "/assets/about/img/roy.png",
            "https://www.giftstarter.co/giftideas/electronics/Hue-Personal-Wireless-Light"
        ),
        new product(
            "/assets/staffpicks/uppababy-stroller-2015.jpg",
            "$299.99",
            "UPPAbaby Vista Stroller 2015",
            "It’s the only stroller you’ll ever need. First kid? Use the seat, carseat, or bassinet. Two kids? Attach a second of any of those. Three kids? Add the skateboard to the back. It looks right no matter what configuration you have, and it’s full of features.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.co/giftideas/baby/UPPAbaby-Stroller-2015"
        ),
        new product(
            "/assets/staffpicks/steelseries-headset-white-thumb.jpg",
            "$159.99",
            "SteelSeries Headphones with Inline Mic",
            "This is a great gift if you need headphones for gaming, streaming, or everyday. It's got inline mic for streaming, looks nice, and is very comfortable.",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.co/giftideas/electronics/SteelSeries-Headset-White"
        ),
        new product(
            "/assets/staffpicks/brother-thread-serger.jpg",
            "$299.99",
            "Brother Thread Serger",
            "I have my mother’s old sewing machine, but I find for many of my projects a serger would be ideal. This one is very user friendly for novices, with advanced features for experienced users.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.co/giftideas/forher/Brother-Thread-Serger"
        ),
        new product(
            "/assets/staffpicks/guava-lotus-everywhere-crib.jpg",
            "$509.00",
            "Lotus Everywhere Crib",
            "Transforms from backpack to standard-size crib in under a minute. Lightweight yet stable, with zippered mesh sides and an optional sun-shade, it's perfect for travel AND as a primary sleep-space or play area for your little one.",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.co/giftideas/baby/Guava-Lotus-Everywhere-Crib"
        ),
        new product(
            "/assets/staffpicks/deathadder-gaming-mouse-thumb.jpg",
            "$59.99",
            "Razer Gaming Mouse",
            "This is the ultimate mouse for gaming and everyday use and it's ergonomic, too!!",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.co/giftideas/electronics/DeathAdder-Gaming-Mouse"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(500, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(500, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
            });
            jQuery('.product-item.first').fadeIn(1000);
            jQuery('.product-item.second').fadeIn(1000);
            timer = $timeout(rotate, 20000);
        });
    };
    var timer = $timeout(rotate, 20000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}
