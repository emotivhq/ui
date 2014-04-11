/**
 * Created by stuart on 4/11/14.
 */

var gsOverlay = GiftStarterApp.directive('gsOverlay', function() {
    function link(scope, element, attrs) {

        var parts = [];
        var overlayElement = element.children()[1];
        console.log(element);
        console.log(element.children());

        var x = 5;
        var y = 3;

        for (var j = 0; j < y; j++) {
            angular.element(overlayElement).append('<tr class="part-row ' + j + '"></tr>');

            for (var i = 0; i < x; i++) {
                angular.element(angular.element(overlayElement).
                    children()[j]).append('<tc class="part-cell ' + i + '"></tc>');

            }
        }

    }

    return {
        restrict: 'E',
        scope: {product: '='},
        link: link,
        templateUrl: '/templates/angular/product-overlay.html'
    };
});
