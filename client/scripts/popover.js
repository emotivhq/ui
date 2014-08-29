/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.service('PopoverService', [
            '$rootScope','$location','$timeout','Analytics','AppStateService',
    function($rootScope,  $location,  $timeout,  Analytics,  AppStateService) {

        this.template = '';
        this.currentLocation = $location.hash();
        var self = this;

        this.setPopover = function(popoverName) {
            if (popoverName === '') {
                this.hidePopover();
            } else {
                console.log("Set popover " + popoverName);
                AppStateService.popoverState(popoverName);
                self.template = '<gs-' + popoverName + '-popover></gs-' + popoverName + '-popover>';
                self.currentLocation = popoverName;
                $location.hash(popoverName);
                self.showPopover();
                $rootScope.$broadcast('popover-updated');
            }
        };

        this.setPopoverFromTemplate = function(newTemplate) {
            this.template = newTemplate;
            $rootScope.$broadcast('popover-updated');
        };

        this.getCurrentTemplate = function() {
            return this.template;
        };

        this.hidePopover = function() {
            $timeout(function() {
                Analytics.track('client', 'hiding popover');
                self.contributeLogin = false;
                AppStateService.contributeLogin(false);
                $rootScope.$broadcast('popover-hidden');
                self.currentLocation = '';
                $location.hash('');
            });
        };

        this.showPopover = function() {
            Analytics.track('client', 'showing popover');
            $rootScope.$broadcast('popover-shown');
        };

        this.validHashes = ['login', 'note', 'pay', 'thanks'];
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var hash = $location.hash();
            if (self.currentLocation === '') {
                if ((hash == 'login') || (hash == 'note')) {
                    self.setPopover(hash);
                }
            } else if (self.validHashes.indexOf(hash) == (self.validHashes.indexOf(self.currentLocation) + 1)) {
                self.setPopover(hash);
            } else if (self.validHashes.indexOf(hash) == (self.validHashes.indexOf(self.currentLocation) - 1)) {
                self.setPopover(hash);
            } else if(hash == self.currentLocation) {
                // Noop
            } else {
                console.log("Wrong hash location");
                self.hidePopover();
            }
        });

        this.nextPopover = function() {
            if (self.validHashes.indexOf(self.currentLocation) + 1 < self.validHashes.length) {
                self.setPopover(self.validHashes[self.validHashes.indexOf(self.currentLocation) + 1]);
            } else {
                self.hidePopover();
            }
        };

        // Ensure they don't navigate directly to a popover
        if ($location.hash()) {
            $location.hash('');
        }

        if (AppStateService.state) {
            if (AppStateService.state.contributeLogin) {
                self.contributeLogin = AppStateService.state.contributing;
            } else {
                self.contributeLogin = Boolean(self.contributeLogin);
            }
        }
    }
]);


GiftStarterApp.directive('gsPopover', ['PopoverService', '$compile',
    function (PopoverService, $compile) {
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
            templateUrl: '/templates/angular/popover.html'
        };
    }
]);
