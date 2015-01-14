/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HeaderController = function ($scope, $location, UserService, Analytics, PopoverService, $rootScope, $interval, $routeParams) {
        var self = this;
        this.thisRoute = $location.path().toString();
        this.loggedIn = UserService.loggedIn;
        this.mobile = device.mobile() || device.tablet();

        this.subliminalOffset = -3.0;
        this.subliminalStyle = {'background-position-y': this.subliminalOffset + 'px'};

        this.logout = logout;
        this.login = login;

        this.menuOpen = menuOpen;

        this.userImageUrl = UserService.profileImageUrl;
        this.userProfileUrl = '/users/' + UserService.uid;

        this.creating = $location.path().indexOf('/create') === 0;

        $interval(updateSubliminal, 3000);

        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
        $scope.$on('$routeChangeStart', routeChangeListener);

        // for sizing using ng-class
        function routeChangeListener(event, next) {
            console && console.log && console.log($location.path());
            self.creating = $location.path().indexOf('/create') === 0;
            menuClose();
            if (next.$$route) {
                self.thisRoute = next.$$route.originalPath;
            }
        }

        function updateSubliminal() {
            self.subliminalOffset -= 22.8178;
            if (self.subliminalOffset < -253) {
                self.subliminalOffset = -3;
            }
            self.subliminalStyle = {
                'background-position-y': self.subliminalOffset + 'px'
            };
        }

        function login() {PopoverService.setPopover('login')}

        function logout() {
            self.userImageUrl = '';
            Analytics.track('user', 'logout from header');
            UserService.logout();
        }

        function updateLogin() {
            self.loggedIn = UserService.loggedIn;
            self.userImageUrl = UserService.profileImageUrl;
            self.userProfileUrl = '/users/' + UserService.uid;
        }

        function menuOpen() {$rootScope.$broadcast('menu-open')}
        function menuClose() {$rootScope.$broadcast('menu-close')}

        var hideMenu = device.mobile() || device.tablet();

        $scope.actions = {
            toggleMobileMenu: function () {
                hideMenu = !hideMenu;

                // Not recommended way: needs to happen in the directive
                // TODO: future work item - move the header to a directive
                if (hideMenu) {
                    device.mobile() && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                } else {
                    device.mobile() && olark('api.box.hide');
                    angular.element('ul.headerNav').addClass('expanded');
                }
            },
            menuItemClicked: function (isLoginItem) {
                if (device.mobile() || device.tablet()) {
                    device.mobile() && !isLoginItem && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                    hideMenu = true;
                }
            }
        }

        if ($routeParams.resetCode) {
            login();
            $scope.actions.menuItemClicked(true);
        }
    };

    app.controller('HeaderController', [
        '$scope',
        '$location',
        'UserService',
        'Analytics',
        'PopoverService',
        '$rootScope',
        '$interval',
        '$routeParams',
        HeaderController]);

}(angular.module('GiftStarterApp')));
