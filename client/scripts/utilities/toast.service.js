/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ToastService', ['$rootScope', ToastService]);

function ToastService($rootScope) {

    this.toastText = 'Hey this is my toast text!';
    this.toastMillis = 2000;

    var self = this;

    this.getToastText = function() {
        return self.toastText;
    };

    this.setToast = function(toastText, toastMillis) {
        self.toastText = toastText;
        self.toastMillis = toastMillis;
        $rootScope.$broadcast('display-toast');
    };
}
