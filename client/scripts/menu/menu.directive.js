/**
 * Created by Stuart on 10/31/14.
 */

angular.module('GiftStarterApp')
    .directive('gsMenu', ['UserService', gsMenu]);

function gsMenu(UserService) {

    function link(scope, element, attr) {
        scope.loggedIn = UserService.loggedIn;

        scope.$on('logout-success', loginChanged);
        scope.$on('login-success', loginChanged);

        function loginChanged() {
            scope.loggedIn = UserService.loggedIn;
        }
    }

    return {
        restrict: 'E',
        template: "hello",
//        templateUrl: '/scripts/menu/menu.ng.html',
        link: link
    };
}
