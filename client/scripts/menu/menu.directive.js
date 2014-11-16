/**
 * Created by Stuart on 10/31/14.
 */

setTimeout(function() {
    // For the HubSpot Sidekick bug.  Seriously.
    // https://trello.com/c/8qqEvQL6/182-high-chrome-browser-view-is-not-working
    angular.module('GiftStarterApp')
        .directive('gsMenu', gsMenu);
}, 0);

function gsMenu(UserService, PopoverService) {

    function link(scope, element) {
        if (!device.mobile()) {element.style = "display: None"}

        scope.expanded = false;
        scope.loggedIn = UserService.loggedIn;
        scope.login = login;
        scope.logout = logout;
        scope.expand = expand;
        scope.close = close;

        scope.$on('logout-success', loginChanged);
        scope.$on('login-success', loginChanged);
        scope.$on('menu-open', expand);
        scope.$on('menu-close', close);

        function loginChanged() {scope.loggedIn = UserService.loggedIn}
        function expand() {scope.expanded = true}
        function close() {scope.expanded = false}
        function login() {PopoverService.setPopover('login')}
        function logout() {UserService.logout()}
    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/menu/menu.ng.html',
        link: link
    };
}
