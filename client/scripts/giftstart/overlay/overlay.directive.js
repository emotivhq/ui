/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsOverlay', gsOverlay);

function gsOverlay($compile, $timeout, GiftStartService, Analytics) {
    function link(scope, element, attrs) {
        var overlayElement = angular.element('gs-overlay div.overlay');

        function drawGrid() {
            // Add artificial delay so the DOM elements have time to settle.
            $timeout(function () {
                var overlayHeight = overlayElement.height();
                var overlayWidth = overlayElement.width();

                Analytics.track('campaign', 'overlay drawn');
                //var overlayElement = angular.element(element.children()[1]);
                var marginHeight = overlayHeight/GiftStartService.giftStart.rows/20;
                var marginWidth = overlayWidth/GiftStartService.giftStart.columns/20;
                var margin = (marginHeight > marginWidth) ? marginWidth : marginHeight;
                var height = Math.floor(overlayHeight/GiftStartService.giftStart.rows - 2*margin);
                var width = Math.floor(overlayWidth/GiftStartService.giftStart.columns - 2*margin - 1);
                scope.$on('hide-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '0');});
                scope.$on('show-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '1');});
                // Calculate max widths for bought part user images
                var usrHeight  = overlayHeight/GiftStartService.giftStart.rows - 4*margin;
                var usrWidth  = overlayWidth/GiftStartService.giftStart.columns - 4*margin;
                var usrShortEdge = (usrHeight > usrWidth) ? usrWidth : usrHeight;
                overlayElement.empty();

                if(GiftStartService.giftStart.parts.length){
                    for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                        var divString = '<div class="part-cell c'+i+
                            '" ng-class="{bought: giftstart.parts['+i+
                            '].bought, selected: giftstart.parts['+i+
                            '].selected, disabled: giftstart.parts['+i+
                            '].disabled}" ng-click="giftstart.parts['+i+
                            '].toggle()" ' +
                            'style="width: '+width+'px;height: '+height+'px;margin:'+margin+'px '+margin+'px;">' +
                            '<div class="td"><span class="price">${{giftstart.parts['+i+
                            '].value / 100 | number : 2}}</span><a ng-href="/users/{{giftstart.parts['+i+'].uid}}"><img class="giver" style="width:' +
                            usrShortEdge + 'px;height:' + usrShortEdge + 'px;" ng-src="{{giftstart.parts['+i+
                            '].img}}"/></a></div></div>';
                        overlayElement.append($compile(divString)(scope));
                    }
                }
            }, 10);
        }

        drawGrid();

        angular.element(overlayElement).bind('load', drawGrid);
        jQuery( window ).resize(drawGrid);
        scope.$on('overlay-updated', drawGrid);
        scope.$on('giftstart-loaded', drawGrid);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/scripts/giftstart/overlay/overlay.html'
    };
}
