/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('GiftsGivenBarController', ['$scope','$timeout',
    GiftsGivenBarController]);

function GiftsGivenBarController($scope) {
    var campaign = function(title, url, img) {
        this.title = title;
        this.url = url;
        this.img = img;
    };

    $scope.campaigns = [
        new campaign(
            "A fantastic bag for a fantastic lady",
            "https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady",
            "https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg"
        ),
        new campaign(
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg"
        ),
        new campaign(
            "Agnes Christmas gift",
            "https://www.giftstarter.com/giftstart/Agnes-Christmas-gift",
            "https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg"
        ),
        new campaign(
            "My inner nerd",
            "https://www.giftstarter.com/giftstart/My-inner-nerd",
            "https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg"
        ),
        new campaign(
            "Run Nikki Run!!!",
            "https://www.giftstarter.com/giftstart/Run-Nikki-Run",
            "https://storage.googleapis.com/giftstarter-pictures/p/315.jpeg"
        ),
        new campaign(
            "Let's help Wix move!",
            "https://www.giftstarter.com/giftstart/Lets-help-Wix-move",
            "https://storage.googleapis.com/giftstarter-pictures/p/Lets-help-Wix-move.jpeg"
        ),
        new campaign(
            "GiftStarter Birthday Campaign for Charity",
            "https://www.giftstarter.com/giftstart/GiftStarter-Birthday-Campaign-for-Charity-2",
            "https://storage.googleapis.com/giftstarter-pictures/p/GiftStarter-Birthday-Campaign-for-Charity-2.jpeg"
        ),
        new campaign(
            "Jessi's 30th Birthday Blowout!",
            "https://www.giftstarter.com/giftstart/Jessis-30th-Birthday-Blowout",
            "https://storage.googleapis.com/giftstarter-pictures/p/340.jpeg"
        ),
        new campaign(
            "6 months of seasonal beauty products for Marion's birthday",
            "https://www.giftstarter.com/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/218.jpeg"
        ),
        new campaign(
            "T1 HIMARS Smoke Break",
            "https://www.giftstarter.com/giftstart/T1-HIMARS-Smoke-Break",
            "https://storage.googleapis.com/giftstarter-pictures/p/165.jpeg"
        ),
        new campaign(
            "A Place for Piper",
            "https://www.giftstarter.com/giftstart/A-Place-for-Piper",
            "https://storage.googleapis.com/giftstarter-pictures/p/40.jpeg"
        ),
        new campaign(
            "Andrea and John want a Vitamix for their wedding",
            "https://www.giftstarter.com/giftstart/Andrea-and-John-want-a-Vitamix-for-their-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/2.jpg"
        ),
        new campaign(
            "The Truffle Treasure",
            "https://www.giftstarter.com/giftstart/The-Truffle-Treasure-1",
            "https://storage.googleapis.com/giftstarter-pictures/p/The-Truffle-Treasure-1.jpeg"
        ),
        new campaign(
            "Spencer's Birthday Gift- Iphone 6!",
            "https://www.giftstarter.com/giftstart/Spencers-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/390.png"
        ),
        new campaign(
            "Jeffrey Song's Birthday!",
            "https://www.giftstarter.com/giftstart/Jeffrey-Songs-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/Jeffrey-Songs-Birthday.jpeg"
        ),
        new campaign(
            "Sending our love to our newly minted Texan!",
            "https://www.giftstarter.com/giftstart/Sending-our-love-to-our-newly-minted-Texan",
            "https://storage.googleapis.com/giftstarter-pictures/p/487.jpeg"
        ),
        new campaign(
            "Birthday Love for Arry",
            "https://www.giftstarter.com/giftstart/Birthday-Love-for-Arry",
            "https://storage.googleapis.com/giftstarter-pictures/p/488.jpeg"
        ),
        new campaign(
            "Amanda & SoonSol's wedding",
            "https://www.giftstarter.com/giftstart/Amanda--SoonSols-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/385.jpeg"
        )
    ];
}
