/**
 * Created by Stuart on 10/31/14.
 */

angular.module('GiftStarterApp')
    .directive('gsMenu', ['UserService', gsMenu]);

function gsMenu(UserService) {

    function link(scope, element, attr) {
        scope.expanded = false;

        if (!device.mobile()) {
            element.style = "display: None";
        }

        scope.loggedIn = UserService.loggedIn;

        scope.$on('logout-success', loginChanged);
        scope.$on('login-success', loginChanged);
        scope.$on('menu-open', expand);

        scope.expand = expand;
        scope.close = close;

        function loginChanged() {
            scope.loggedIn = UserService.loggedIn;
        }

        function expand() {scope.expanded = true}
        function close() {scope.expanded = false}

    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/menu/menu.ng.html',
        link: link
    };
}
