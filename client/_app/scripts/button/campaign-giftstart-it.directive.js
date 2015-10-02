/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsItButton', ['GiftStartService',
    gsItButton]);

function gsItButton(GiftStartService) {

    // Things I need:
    // product url
    // product title
    // product price
    // product img url

    function link(scope, ele, attrs) {
        var anchor = ele[0].children[0].children[0];
        anchor.href = calculateLink();
    }

    function calculateLink() {
        console && console.log && console.log(GiftStartService.giftStart);
        return url = '/create?' + urlSerialize({
                product_url: GiftStartService.giftStart.product_url,
                title: GiftStartService.giftStart.product_title,
                price: GiftStartService.giftStart.price,
                img_url: GiftStartService.giftStart.product_img_url,
                source: 'GiftStarter'
            });
    }

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/button/giftstart-it-button.ng.html'
    }
}