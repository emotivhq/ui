/**
 * Created by Stuart on 10/16/14.
 */

GiftStarterApp.directive('gsPopover', ['PopoverService', '$compile',
    gsPopover]);


function gsPopover(PopoverService, $compile) {
    function link(scope, element, attrs) {

        scope.popoverShown = false;

        var templateContainer = angular.element(angular.element(element.children()[0]).children()[0]);
        var currentTemplate = '';

        // When something updates the popover service, this should listen and update from service
        scope.$on('popover-updated', popoverUpdated);
        function popoverUpdated() {
            currentTemplate = PopoverService.getCurrentTemplate();
            templateContainer.empty();
            templateContainer.append($compile(currentTemplate)(scope));
        }

        // When something hides via the popover service, this needs to react
        scope.$on('popover-hidden', popoverHidden);
        function popoverHidden() {scope.popoverShown = false}

        // When something shows via the popover service, this needs to react
        scope.$on('popover-shown', popoverShown);
        function popoverShown() {scope.popoverShown = true}

        // Hide if they click outside of popover
        element.on('click', PopoverService.hidePopover);

        // Prevent hiding if they click inside popover
        templateContainer.on('click', function(e) {e.stopPropagation()});

    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/popover/popover.html'
    };
}