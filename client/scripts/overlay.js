/**
 * Created by stuart on 4/11/14.
 */

GiftStarterApp.directive('gsOverlay', function($compile, ProductService, GiftStartService, Analytics) {
    function link(scope, element, attrs) {

        function drawGrid() {
            console.log('drawing grid');
            var imageHeight = element.children()[0].offsetHeight;
            var imageWidth = element.children()[0].offsetWidth;

            Analytics.track('campaign', 'overlay drawn');
            var overlayElement = angular.element(element.children()[1]);
            var marginHeight = imageHeight/GiftStartService.giftStart.rows/20;
            var marginWidth = imageWidth/GiftStartService.giftStart.columns/20;
            var margin = (marginHeight > marginWidth) ? marginWidth : marginHeight;
            var height  = imageHeight/GiftStartService.giftStart.rows - 2*margin;
            var width  = imageWidth/GiftStartService.giftStart.columns - 2*margin;
            scope.$on('hide-overlay', function() {overlayElement.css('opacity', '0');});
            scope.$on('show-overlay', function() {overlayElement.css('opacity', '1');});
            // Calculate max widths for bought part user images
            var usrHeight  = imageHeight/GiftStartService.giftStart.rows - 4*margin;
            var usrWidth  = imageWidth/GiftStartService.giftStart.columns - 4*margin;
            var usrLongEdge = (usrHeight > usrWidth) ? usrWidth : usrHeight;
            overlayElement.empty();

            for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                var divString = '<div class="part-cell c'+i+
                    '" ng-class="{bought: giftstart.parts['+i+
                    '].bought, selected: giftstart.parts['+i+
                    '].selected, disabled: giftstart.parts['+i+
                    '].disabled}" ng-click="giftstart.parts['+i+
                    '].toggle()" ' +
                    'style="width: '+width+'px;height: '+height+'px;margin:'+margin+'px '+margin+'px;">' +
                    '<table><tr><td><span class="price">${{giftstart.parts['+i+
                    '].value / 100 | number : 2}}</span><img class="giver" style="width:' +
                    usrLongEdge + 'px;height:' + usrLongEdge + 'px;" ng-src="{{giftstart.parts['+i+
                    '].img}}"/></td></tr></table></div>';
                overlayElement.append($compile(divString)(scope));
            }
        }

        angular.element(element.children()[0]).bind('load', drawGrid);
        scope.$on('overlay-updated', drawGrid);
        scope.$on('giftstart-loaded', drawGrid);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/templates/angular/overlay.html'
    };
});
