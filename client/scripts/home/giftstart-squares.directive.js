/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsSquares', [gsSquares]);

function gsSquares() {

    function link(scope, ele, attr) {

    }

    function gsSquaresCtrl() {

    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/home/giftstart-squares.ng.html',
        controller: gsSquaresCtrl,
        controllerAs: 'squares'
    }
}
