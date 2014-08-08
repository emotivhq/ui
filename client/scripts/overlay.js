/**
 * Created by stuart on 4/11/14.
 */

GiftStarterApp.directive('gsOverlay', function($compile, ProductService, GiftStartService, Analytics) {
    function link(scope, element, attrs) {

        // If the giftstart is already present, draw grid immediately
        if (GiftStartService.giftStart.parts.length > 0) {
            drawGrid();
        }

        // Listen for late loads of giftstart
        scope.$on('giftstart-loaded', drawGrid);


        function drawGrid() {
            Analytics.track('campaign', 'overlay drawn');
            var overlayElement = angular.element(element.children()[1]);
            scope.$on('hide-overlay', function() {overlayElement.css('opacity', '0');});
            scope.$on('show-overlay', function() {overlayElement.css('opacity', '1');});
            var height  = 1/GiftStartService.giftStart.rows*100 - 2 +'%';
            var width  = 1/GiftStartService.giftStart.columns*100 - 2 +'%';
            // Calculate max widths for bought part user images
            var maxheight  = 1/GiftStartService.giftStart.rows*100 - 4 +'%';
            var maxwidth  = 1/GiftStartService.giftStart.columns*100 - 4 +'%';
            overlayElement.empty();

            for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                var divString = '<div class="part-cell c'+i+
                    '" ng-class="{bought: giftstart.parts['+i+
                    '].bought, selected: giftstart.parts['+i+
                    '].selected, disabled: giftstart.parts['+i+
                    '].disabled}" ng-click="giftstart.parts['+i+
                    '].toggle()" ' +
                    'style="width: '+width+';height: '+height+
                    ';"><table><tr><td><span class="price">${{giftstart.parts['+i+
                    '].value / 100 | number : 2}}</span><img class="giver" style="max-width:' +
                    maxwidth + ';max-height:' + maxheight + ';" ng-src="{{giftstart.parts['+i+
                    '].img}}"/></td></tr></table></div>';
                overlayElement.append($compile(divString)(scope));
            }
        }

        scope.$on('overlay-updated', drawGrid);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/templates/angular/overlay.html'
    };
});
