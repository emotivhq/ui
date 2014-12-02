/**
 * Created by Stuart on 12/1/14.
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
