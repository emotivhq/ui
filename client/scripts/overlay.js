/**
 * Created by stuart on 4/11/14.
 */

GiftStarterApp.directive('gsOverlay', function($compile, ProductService, GiftStartService) {
    function link(scope, element, attrs) {

        // If the giftstart is already present, draw grid immediately
        if (GiftStartService.giftStart.parts.length > 0) {
            drawGrid();
        }

        // Listen for late loads of giftstart
        scope.$on('giftstart-loaded', drawGrid);

        function drawGrid() {
            var overlayElement = angular.element(element.children()[1]);
            var height  = 1/GiftStartService.giftStart.rows*100+'%';
            var width  = 1/GiftStartService.giftStart.columns*100+'%';
            overlayElement.empty();

            for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                var divString = '<div ng-class="{\'part-cell\': true, c'+i+
                    ': true, bought: giftstart.parts['+i+
                    '].bought, selected: giftstart.parts['+i+
                    '].selected}" ng-click="giftstart.parts['+i+
                    '].toggle()" ' +
                    'style="width: '+width+';height: '+height+';"><span class="price">${{giftstart.parts['+i+
                    '].value | number : 2}}</span><img class="giver" ng-src="{{giftstart.parts['+i+
                    '].img}}"/></div>';
                overlayElement.append($compile(divString)(scope));
            }

//            for (var j = 0; j < GiftStartService.giftStart.parts.length; j++) {
//                var rowStr = '<tr class="part-row '+j+'"></tr>';
//                overlayElement.append(rowStr);
//
//                for (var i = 0; i < GiftStartService.giftStart.parts[0].length; i++) {
//                    var tdStr = '<td ' +
//                        'ng-class="{\'part-cell\': true, c'+i+': true, bought: giftstart.parts['+j+']['+i+
//                        '].bought, selected: giftstart.parts['+j+']['+i+'].selected}" ' +
//                        'ng-click="giftstart.parts['+j+']['+i+'].toggle()"' +
//                        'style="height: '+height+';width: '+width+';">' +
//                            '<span class="price">${{giftstart.parts['+j+']['+i+'].value | number : 2}}</span>' +
//                            '<img class="giver" ng-src="{{giftstart.parts['+j+']['+i+'].img}}"/>' +
//                        '</td>';
//                    angular.element(overlayElement.children()[j]).append($compile(tdStr)(scope));
//                }
//            }
        }
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/templates/angular/overlay.html'
    };
});
