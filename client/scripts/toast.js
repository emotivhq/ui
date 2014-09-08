/**
 * Created by stuart on 9/7/14.
 */

GiftStarterApp.service('ToastService', [
            '$rootScope',
    function($rootScope) {

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
]);

GiftStarterApp.directive('gsToast',
    function(ToastService, $timeout) {
        function link(scope, element, attr) {
            scope.toastText = 'Het this is my test toast!';
            scope.hide = true;
            scope.displayed = false;
            scope.toastP = element[0].children[0].children[0];

            scope.hideToast = function() {
                scope.hide = true;
                $timeout(scope.displayNoneToast, 250);
            };
            scope.displayNoneToast = function() {scope.displayed = false};

            scope.showToast = function() {
                scope.hide = false;
                scope.displayed = true;
            };

            scope.$on('display-toast', function() {
                scope.toastText = ToastService.getToastText();
                scope.toastP.innerHTML = scope.toastText;
                scope.showToast();
                $timeout(scope.hideToast, ToastService.toastMillis);
            });

        }

        return {
            restrict: 'E',
            templateUrl: '/templates/angular/toast.html',
            link: link
        }
    }
);