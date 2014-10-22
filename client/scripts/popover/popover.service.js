/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.service('PopoverService', ['$rootScope','$timeout',
    'Analytics','LocalStorage', PopoverService]);

function PopoverService($rootScope,  $timeout,  Analytics, LocalStorage) {

    this.template = '';
    var self = this;
    this.currentLocation = '';
    this.validHashes = ['login', 'note', 'pay', 'thanks'];

    this.setPopover = function(popoverName) {
        LocalStorage.set('/PopoverService/current', popoverName);
        if (popoverName === '') {
            this.hidePopover();
        } else {
            self.template = '<gs-' + popoverName + '-popover></gs-' + popoverName + '-popover>';
            self.currentLocation = popoverName;
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
            LocalStorage.set('/PopoverService/contributeLogin', false);
            $rootScope.$broadcast('popover-hidden');
            self.currentLocation = '';
        });
    };

    this.showPopover = function() {
        $rootScope.$broadcast('popover-shown');
    };

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
    if (LocalStorage.get('/PopoverService/contributeLogin')) {
        self.contributeLogin = LocalStorage
            .get('/PopoverService/contributing');
    } else {
        self.contributeLogin = Boolean(self.contributeLogin);
    }
}
