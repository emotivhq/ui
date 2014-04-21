/**
 * Created by stuart on 4/21/14.
 */

var PopoverService = GiftStarterApp.service('PopoverService', ['$rootScope',
    function($rootScope) {

        var template = '';

        function setPopoverFromTemplate(newTemplate) {
            console.log("Setting popover from template...");
            template = newTemplate;
            $rootScope.$broadcast('popover-updated');
        }

        function getCurrentTemplate() {
            return template;
        }

        function hidePopover() {$rootScope.$broadcast('popover-hidden')}

        function showPopover() {$rootScope.$broadcast('popover-shown')}

        return {
            setPopoverFromTemplate: setPopoverFromTemplate,
            getCurrentTemplate: getCurrentTemplate,
            hidePopover: hidePopover,
            showPopover: showPopover
        };
    }
]);


var gsPopover = GiftStarterApp.directive('gsPopover', ['PopoverService',
    function (PopoverService) {
        function link(scope, element, attrs) {

            var templateContainer = angular.element(angular.element(angular.element(element.children()[0]).children()[0]).children()[0]);
            var currentTemplate = '';

            // When something updates the popover service, this should listen and update from service
            scope.$on('popover-updated', popoverUpdated);
            function popoverUpdated() {
                currentTemplate = PopoverService.getCurrentTemplate();
                templateContainer.html(currentTemplate);
            }

            // When something hides via the popover service, this needs to react
            scope.$on('popover-hidden', popoverHidden);
            function popoverHidden() {element.css('display', 'none')}

            // When something shows via the popover service, this needs to react
            scope.$on('popover-shown', popoverShown);
            function popoverShown() {element.css('display', 'table')}

            // Hide if they click outside of popover
            element.on('click', PopoverService.hidePopover);

            // Prevent hiding if they click inside popover
            templateContainer.on('click', function(e) {e.stopPropagation()});

        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/popover.html'
        };
    }
]);