/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('PopoverService', ['$rootScope','$timeout',
    'Analytics','LocalStorage', PopoverService]);

function PopoverService($rootScope,  $timeout,  Analytics, LocalStorage) {

    this.template = '';
    var self = this;
    this.currentLocation = '';
    this.validHashes = ['login', 'pay', 'note', 'thanks'];

    this.setPopover = function(popoverName) {
        LocalStorage.set('/PopoverService/current', popoverName);
        console && console.log && console.log('setting popover', popoverName);
        if (popoverName === '' || popoverName === null) {
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
            LocalStorage.remove('/PopoverService/current');
            self.contributeLogin = false;
            LocalStorage.set('/GiftStartService/contributeLogin', false);
            $rootScope.$broadcast('popover-hidden');
            self.currentLocation = '';

            // show olark message app if mobile.
            if (device.mobile()) {
                olark('api.box.show');
            }
        });
    };

    this.showPopover = function() {
        // hide olark message app if mobile.
        if (device.mobile()) {
            olark('api.box.hide');
        }
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
