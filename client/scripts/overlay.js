/**
 * Created by stuart on 4/11/14.
 */

var gsOverlay = GiftStarterApp.directive('gsOverlay', function($compile) {
    function link(scope, element, attrs) {

        var overlayElement = angular.element(element.children()[1]);
        var imageElement =  angular.element(element.children()[0]);
        var imageHeight = '500px';//imageElement.prop('offsetHeight');
        overlayElement.css('margin-top', '-'+imageHeight);
        overlayElement.css('height', imageHeight);

        var x = 5;
        var y = 4;

        for (var j = 0; j < y; j++) {
            var rowStr = '<tr class="part-row '+j+'"></tr>';
            overlayElement.append(rowStr);

            for (var i = 0; i < x; i++) {
                angular.element(overlayElement.children()[j]).append($compile('<td ng-class="{\'part-cell\': true, c'+i+': true, bought: giftstart.parts['+j+']['+i+'].bought}"></td>')(scope));

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
