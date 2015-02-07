/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPopover', ['PopoverService', '$compile', '$document',
    gsPopover]);


function gsPopover(PopoverService, $compile, $document) {
    function link(scope, element, attrs) {

        scope.popoverShown = false;

        var templateContainer = angular.element(angular.element(element.children()[0]).children()[0]);
        var currentTemplate = '';
        var bodyElement = angular.element($document.find('body')[0]);

        var noScroll = function (event) {
            event.preventDefault();
        };

        scope.topPosition = 0;

        // When something updates the popover service, this should listen and update from service
        scope.$on('popover-updated', popoverUpdated);
        function popoverUpdated() {
            currentTemplate = PopoverService.getCurrentTemplate();
            templateContainer.empty();
            templateContainer.append($compile(currentTemplate)(scope));
        }

        // When something hides via the popover service, this needs to react
        scope.$on('popover-hidden', popoverHidden);
        function popoverHidden() {
            scope.popoverShown = false;
            bodyElement.removeClass('popoverShown');
            bodyElement.off('touchmove', noScroll);
        }

        // When something shows via the popover service, this needs to react
        scope.$on('popover-shown', popoverShown);
        function popoverShown() {
            scope.popoverShown = true;
            bodyElement.addClass('popoverShown');
            scope.topPosition = $(window).scrollTop() - 150;
            bodyElement.on('touchmove', noScroll);
        }

        // Hide if they click outside of popover
        //element.on('click', PopoverService.hidePopover);

        // Prevent hiding if they click inside popover
        templateContainer.on('click', function(e) {e.stopPropagation()});

    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/popover/popover.html'
    };
}