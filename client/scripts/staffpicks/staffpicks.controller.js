/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('StaffPicksController', ['$scope','$interval',
    StaffPicksController]);

function StaffPicksController($scope, $interval) {
    var product = function(image, price, title, desc, avatar) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.desc = desc;
        this.avatar = avatar;
    }
  $scope.products = [
      new product("/assets/giftideas/category/wedding/vitamixThumb.jpg", "$500.00", "Vitamix", "this is a test", "/assets/about/img/arry.png"),
      new product("/assets/giftideas/category/wedding/vitamixThumb.jpg", "$509.00", "Vitamix", "this is a test22", "/assets/about/img/jon.png")
  ]
}
