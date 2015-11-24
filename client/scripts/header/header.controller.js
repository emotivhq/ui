/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function (app) {
    var HeaderController = function ($scope, $location, UserService, Analytics, PopoverService, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {
        var self = this;
        jQuery('.discover').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        this.thisRoute = $location.path().toString();
        this.loggedIn = UserService.loggedIn;
        this.mobile = device.mobile() || device.tablet();
        this.subliminalOffset = -3.0;
        this.subliminalStyle = {
            'background-position-y': this.subliminalOffset + 'px'
        };
        this.logout = logout;
        //this.showReset = showReset;
        this.closeLogin = closeLogin;
        this.loginKeyPress = loginKeyPress;
        this.menuOpen = menuOpen;
        this.userImageUrl = UserService.profileImageUrl;
        this.userProfileUrl = '/users/' + UserService.uid;
        this.userName = (UserService.name).toUpperCase();
        this.creating = $location.path().indexOf('/create') === 0;
        this.portaling = $location.path().indexOf('/portal') === 0;
        $scope.isHeaderOnly = self.thisRoute == '/header';
        $scope.search = false;
        $scope.menu = false;
        $scope.notifyOpen = false;
        $scope.numNotifications = 0;
        $scope.numNotificationsUnseen = 0;
        $scope.notifications = null;
        $scope.notificationHover = false;
        $scope.showLoginwrapper = false;
        $scope.showBlackout = false;
        $interval(updateSubliminal, 3000);
        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
        $scope.$on('$routeChangeStart', routeChangeListener);
        $scope.$on('profile-image-changed', updateLogin);
        //check notifications for user
        checkNotifications = function () {
            if(UserService.loggedIn) {
                $http({
                    method: 'GET',
                    url: '/users/notify/' + UserService.uid + '.json'
                }).success(function (response) {
                    $scope.notifications = response.notifications;
                    $scope.numNotifications = 0;
                    $scope.numNotificationsUnseen = 0;
                    for(item in $scope.notifications) {
                        $scope.numNotifications++;
                        if(!$scope.notifications[parseInt(item)].seen) {
                            $scope.numNotificationsUnseen++;
                        }
                    }
                    $scope.numNotificationsUnseen =1;
                }).error(function (response) {
                    console && console.log && console.log(response)
                });
            }
        };
        $scope.pollNotifications = function () {
            checkNotifications();
            $timeout($scope.pollNotifications, 66600);
        };
        $scope.pollNotifications();
        self.notificationsHoverIn = function () {
            $scope.notificationHover = true;
            notificationsSeen();
        };
        self.notificationsHoverOut = function () {
            $scope.notificationHover = false;
        };

        function notificationsSeen() {
            $http({
                method: 'POST',
                url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_seen: '*'
                }
            })
        }
        self.openNotifications = function () {
            $scope.notifyOpen = true;
            notificationsSeen();
            self.closeMobileMenu();
            $scope.showBlackout = true;
            $anchorScroll('notificationlist')
        };
        self.closeNotifications = function () {
            $scope.showBlackout = false;
            $scope.notifyOpen = false;
        };
        self.notificationClick = function (item) {
            $http({
                method: 'POST',
                url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_acknowledged: '["' + item.id + '"]'
                }
            });
            $scope.notifications.splice($scope.notifications.indexOf(item), 1);
            self.closeNotifications();
        };
        // for top menu sizing using ng-class and hide/show

        function isSlimMenu() {
            return(!UserService.loggedIn && $location.path() === '/join') ? true : false;
        }

        function isYourVillageMenu() {
            return($location.path() === '/yourvillage') ? true : false;
        }
        
        function isFacebookLoginMenu() {
            return($location.path() === '/holidays-2015') ? true : false;
        }

        function isYourVillageSubPage() {
            return($scope.yourVillageMenu && $location.path() !== '/yourvillage') ? true : false;
        }

        function isUserMenu() {
            return(UserService.loggedIn && !isYourVillageMenu()) ? true : false;
        }

        function isHomeMenu() {
            return(!UserService.loggedIn && $location.path() === '/') ? true : false;
        }

        function isCreateMenu() {
            return(!UserService.loggedIn && $location.path() === '/create') ? true : false;
        }

        function isMainMenu() {
            return(!UserService.loggedIn && !isSlimMenu() && !isHomeMenu() && !isCreateMenu() && !isYourVillageMenu() && !isFacebookLoginMenu()) ? true : false;
        }

        function updateMenuType() {
            if(!$scope.yourVillageMenu) {                
                $scope.slimMenu = isSlimMenu();
                $scope.mainMenu = isMainMenu();
                $scope.userMenu = isUserMenu();
                $scope.homeMenu = isHomeMenu();
                $scope.createMenu = isCreateMenu();
                $scope.yourVillageMenu = isYourVillageMenu()
                $scope.yourVillageSubPage = isYourVillageSubPage();
                $scope.facebookLogin = isFacebookLoginMenu();
                $timeout(function() {
                    if ($('.toc.item').length > 0) {
                        $('.ui.menu.sidebar').sidebar('attach events', '.toc.item', 'overlay');   
                    }
                })
            } else {
                $scope.yourVillageSubPage = isYourVillageSubPage();
            }
        }
        updateMenuType();

        function routeChangeListener(event, next, current) {
            /* jshint ignore:start */
            if(next && next.params && next.params.path === 'blog') {
                event.preventDefault();
                $rootScope.$evalAsync(function () {
                    $window.location.href = next.params.path;
                });
            }
            /* jshint ignore:end */
            updateMenuType();
            self.creating = $location.path().indexOf('/create') === 0;
            self.portaling = $location.path().indexOf('/portal') === 0;
            menuClose();
            if(next.$$route) {
                self.thisRoute = next.$$route.originalPath;
            }
        }

        function updateSubliminal() {
            self.subliminalOffset -= 22.8178;
            if(self.subliminalOffset < -253) {
                self.subliminalOffset = -3;
            }
            self.subliminalStyle = {
                'background-position-y': self.subliminalOffset + 'px'
            };
        }
        $scope.goBack = function () {
            $window.history.back()
        }
        self.toggleMobileMenu = function () {
            $scope.menu = !$scope.menu;
        };
        self.closeMobileMenu = function () {
            $scope.menu = false;
        };

        function closeLogin() {
            $scope.showBlackout = false;
            $scope.showLoginwrapper = false;
        }

        function revealLogin() {
            $scope.showBlackout = true;
            $scope.showLoginwrapper = true;
        }
        self.showLogin = function () {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-login');
            $timeout(function () {
                $rootScope.$broadcast('loginbox-show-login');
            }, 200);
        };

        function logout() {
            self.userImageUrl = '';
            Analytics.track('user', 'logout from header');
            UserService.logout();
            updateMenuType();
        }

        function updateLogin() {
            self.loggedIn = UserService.loggedIn;
            self.userImageUrl = UserService.profileImageUrl;
            self.userProfileUrl = '/users/' + UserService.uid;
            self.userName = (UserService.name).toUpperCase();
            updateMenuType();
        }

        function loginKeyPress($event) {
            if($event.keyCode == 27) closeLogin();
        }

        function menuOpen() {
            $rootScope.$broadcast('menu-open')
        }

        function menuClose() {
            $rootScope.$broadcast('menu-close')
        }
        var hideMenu = device.mobile() || device.tablet();
        $scope.headerSearchTerm = '';
        $scope.actions = {
            toggleMobileMenu: function () {
                hideMenu = !hideMenu;
                // Not recommended way: needs to happen in the directive
                // TODO: future work item - move the header to a directive
                if(hideMenu) {
                    device.mobile() && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                } else {
                    device.mobile() && olark('api.box.hide');
                    angular.element('ul.headerNav').addClass('expanded');
                }
            },
            menuItemClicked: function (isLoginItem) {
                if(device.mobile() || device.tablet()) {
                    device.mobile() && !isLoginItem && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                    hideMenu = true;
                }
            },
            search: function () {
                $window.sessionStorage.setItem('fromSearch', 'yes');
                $location.path('/');
                $timeout(function () {
                    $rootScope.$broadcast('performSearchFromHeader');
                }, 100);
            }
        };
        $rootScope.$on('header-show-login', function () {
            self.showLogin();
        });
        $rootScope.$on('header-close-login', function () {
            self.closeLogin();
        });
        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };
        if($location.hash() == "nav_mobile") {
            $scope.menu = true;
        } else if($location.hash() == "searchbar") {
            $scope.search = true;
        } else if($location.hash() == "nav_login") {
            self.showLogin();
        } else if($location.hash() == "nav_help" || $location.hash() == "nav_start") {
            var menuopenlistener = function () {
                jQuery('#' + $location.hash()).removeClass("hover");
                angular.element($window).off('mousemove', menuopenlistener);
            };
            jQuery('#' + $location.hash()).addClass("hover");
            angular.element($window).on('mousemove', menuopenlistener);
        }
        var producturl = decodeURIComponent($location.search().producturl);
        if(producturl && producturl != "" && producturl != "true" && producturl != "undefined") {
            var parser = document.createElement('a');
            parser.href = producturl;
            olark('api.box.expand');
            olark('api.chat.sendMessageToVisitor', {
                body: "Welcome!  Can I help you gift this product from " + (parser.hostname == "localhost" ? "another site" : parser.hostname) + "?"
            });
        }
        var userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.indexOf('safari') != -1) {
            if(userAgent.indexOf('chrome') > -1) {
                //browser is chrome
            } else if((userAgent.indexOf('opera') > -1) || (userAgent.indexOf('opr') > -1)) {
                //browser is opera
            } else {
                jQuery('.menu-login > .submenu').css('margin-top', '-7px');
            }
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
        '$timeout',
        '$window',
        '$http',
        '$anchorScroll',
        HeaderController
    ]).run(function ($rootScope, $location, $anchorScroll, $routeParams) {
        //function isSlim() {
        //    return($location.path() === '/join') ? true : false;
        //}
        //this.makeSlim = isSlim();
        //$rootScope.slimHeader = isSlim();
        $rootScope.greybg = false;
        //when the route is changed scroll to the proper element.
        $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
            $location.hash($routeParams.scrollTo);
            $anchorScroll();
            //this.makeSlim = isSlim();
            //$rootScope.slimHeader = isSlim();
            $rootScope.greybg = false;
        });
    });
}(angular.module('GiftStarterApp')));