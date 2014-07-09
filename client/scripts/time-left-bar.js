/**
 * Created by stuart on 7/8/14.
 */

GiftStarterApp.directive('gsTimeLeftBar', [
    function() {
        function link(scope, element, attrs) {

        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/time-left-bar.html'
        };
    }
]);
