/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('GiftsGivenBarController', ['$scope','$timeout',
    GiftsGivenBarController]);

function GiftsGivenBarController($scope) {
    var campaign = function(url, img) {
        this.url = url;
        this.img = img;
    };

    $scope.campaigns = [
        new campaign(
            "https://www.giftstarter.co/giftideas/baby/4moms-Breeze-Playard",
            "/assets/staffpicks/4momsBreeze.jpg"

        ),
        new campaign(
            "https://www.giftstarter.co/search/lumix%20gh4",
            "https://www.giftstarter.co/search/lumix%20gh4"

        )
    ];
}
