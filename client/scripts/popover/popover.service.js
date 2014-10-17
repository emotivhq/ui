/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.service('PopoverService', ['$rootScope','$location','$timeout',
    'Analytics','AppStateService', PopoverService]);

function PopoverService($rootScope,  $location,  $timeout,  Analytics,
                        AppStateService) {

    this.template = '';
    this.currentLocation = $location.hash();
    var self = this;

    this.setPopover = function(popoverName) {
        AppStateService.popoverState(popoverName);
        if (popoverName === '') {
            this.hidePopover();
        } else {
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
            self.contributeLogin = false;
            AppStateService.contributeLogin(false);
            $rootScope.$broadcast('popover-hidden');
            self.currentLocation = '';
            $location.hash('');
        });
    };

    this.showPopover = function() {
        $rootScope.$broadcast('popover-shown');
    };

    this.validHashes = ['login', 'note', 'pay', 'thanks'];
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var hash = $location.hash();
        if ((AppStateService.state || {}).contributeLogin) {
            self.setPopover(hash);
            AppStateService.state.contributing = false;
            alert("Yeeeee buddy");
        } else if (self.currentLocation === '') {
            if ((hash == 'login') || (hash == 'note') || (hash == 'email-share')) {
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
            var nextPopover = self.validHashes[self.validHashes.indexOf(self.currentLocation) + 1];
            self.setPopover(nextPopover);
            Analytics.track('client', 'showing popover ' + nextPopover);
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
