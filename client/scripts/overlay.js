/**
 * Created by stuart on 4/11/14.
 */

var gsOverlay = GiftStarterApp.directive('gsOverlay', function($compile, ProductService, GiftStartService) {
    function link(scope, element, attrs) {

        var overlayElement = angular.element(element.children()[1]);
        var imageHeight = ProductService.getProduct().imageHeight;
        overlayElement.css('margin-top', (-imageHeight - 4 + "px"));
        overlayElement.css('height', imageHeight + "px");
        var gs = GiftStartService.getGiftStart();

        var x = gs.parts[0].length;
        var y = gs.parts.length;

        for (var j = 0; j < y; j++) {
            var rowStr = '<tr class="part-row '+j+'"></tr>';
            overlayElement.append(rowStr);

            for (var i = 0; i < x; i++) {
                var tdStr = '<td ng-class="{\'part-cell\': true, c'+i+': true, bought: giftstart.parts['+j+']['+i+
                    '].bought, selected: giftstart.parts['+j+']['+i+'].selected}" ng-click="giftstart.parts['+j+']['+i+
                    '].toggle()">${{giftstart.parts['+j+']['+i+'].value}}</td>';
                angular.element(overlayElement.children()[j]).append($compile(tdStr)(scope));
            }
        }
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/templates/angular/product-overlay.html'
    };
});
