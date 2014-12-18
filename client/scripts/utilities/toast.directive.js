/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsToast', gsToast);

function gsToast(ToastService, $timeout) {
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
        templateUrl: '/scripts/utilities/toast.html',
        link: link
    }
}
