/**
 * Created by stuart on 9/7/14.
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
