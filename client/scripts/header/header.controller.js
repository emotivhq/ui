/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HeaderController = function ($scope, $location, UserService, Analytics, PopoverService, $rootScope, $interval, $timeout, $window, $http) {
        var self = this;
        this.thisRoute = $location.path().toString();
        this.loggedIn = UserService.loggedIn;
        this.mobile = device.mobile() || device.tablet();

        this.subliminalOffset = -3.0;
        this.subliminalStyle = {'background-position-y': this.subliminalOffset + 'px'};

        this.logout = logout;
        this.showReset = showReset;
        this.closeLogin = closeLogin;
        this.loginKeyPress = loginKeyPress;

        this.menuOpen = menuOpen;

        this.userImageUrl = UserService.profileImageUrl;
        this.userProfileUrl = '/users/' + UserService.uid;
        this.userName = (UserService.name).toUpperCase();

        this.creating = $location.path().indexOf('/create') === 0;

        $scope.search = false;
        $scope.menu = false;
        $scope.notifyOpen = false;

        $scope.numNotifications = 0;
        $scope.notifications = null;
        $scope.notificationImg = "notifications-none.png";

        $interval(updateSubliminal, 3000);

        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
        $scope.$on('$routeChangeStart', routeChangeListener);
        $scope.$on('profile-image-changed', updateLogin);

        //check notifications for user
        $http({
            method: 'GET',
            url: ' /users/notify/' + UserService.uid + '.json'
        }).success(function (response) {
            console.log(response);
            $scope.notifications = response.notifications;
            var emptyList = true;
            for (item in $scope.notifications) {
                console.table(item);
                emptyList = false;
                if ($scope.notifications[item].seen == false) {
                    $scope.numNotifications++;
                }
            }
            //show 'no notifications' msg if list is empty
            if (emptyList) {
                jQuery('#no-notifications-msg').css('display', 'block');
            }
            self.checkNotifications();
        }).error(function (response) {
            jQuery('#no-notifications-msg').css('display', 'block');
        });

        self.checkNotifications = function() {
            if ($scope.numNotifications > 0) {
                $scope.notificationImg = "notifications-new.png";
            } else {
                $scope.notificationImg = "notifications-none.png";
            }
        };

        self.notificationsHoverIn = function() {
            $scope.notificationImg = "notifications-open.png";
        };

        self.notificationsHoverOut = function() {
            self.checkNotifications();
        };

        self.openNotifications = function() {
            self.closeMobileMenu();
            jQuery('.blackout-screen').css('display', 'block');
            $scope.notifyOpen = true;
        };

        self.closeNotifications = function() {
            jQuery('.blackout-screen').css('display', 'none');
            $scope.notifyOpen = false;
        };

        // for sizing using ng-class
        function routeChangeListener(event, next) {
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

        self.toggleMobileMenu = function() {
            $scope.menu = !$scope.menu;
            console.log($scope.menu);
        };

        self.closeMobileMenu = function() {
            $scope.menu = false;
        };

        function closeLogin() {
            jQuery('.blackout-screen').css('display', 'none');
            jQuery('.loginwrapper').css('display', 'none');
        }

        function revealLogin() {
            jQuery('.blackout-screen').css('display', 'block');
            jQuery('.loginwrapper').css('display', 'block');
        }

        self.showLogin = function() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-login');
            $timeout(function() {
                $rootScope.$broadcast('loginbox-show-login');
            }, 200);
        };

        function showReset() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-reset');
            jQuery('.loginwrapper .userlogin__password').focus();
        }

        function logout() {
            self.userImageUrl = '';
            Analytics.track('user', 'logout from header');
            UserService.logout();
        }

        function updateLogin() {
            self.loggedIn = UserService.loggedIn;
            self.userImageUrl = UserService.profileImageUrl;
            self.userProfileUrl = '/users/' + UserService.uid;
            self.userName = (UserService.name).toUpperCase();
        }

        function loginKeyPress($event) {
            if($event.keyCode == 27)
              closeLogin();
        }

        function menuOpen() {$rootScope.$broadcast('menu-open')}
        function menuClose() {$rootScope.$broadcast('menu-close')}

        var hideMenu = device.mobile() || device.tablet();

        $scope.headerSearchTerm = '';

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
            },
            search: function () {
                $window.sessionStorage.setItem('fromSearch', 'yes');
                $location.path('/');
                $timeout(function () {
                    $rootScope.$broadcast('performSearchFromHeader');
                }, 100);
            }
        };

        $rootScope.$on('header-show-login', function(){
            self.showLogin();
        });

        $rootScope.$on('header-close-login', function(){
            self.closeLogin();
        });

        $rootScope.$on('password-reset-requested', function() {
            self.showReset();
        });

        $scope.scrollTo = function(id) {
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
            var menuopenlistener = function() {
                jQuery('#' + $location.hash()).removeClass("hover");
                angular.element($window).off('mousemove', menuopenlistener);
            };
            jQuery('#' + $location.hash()).addClass("hover");
            angular.element($window).on('mousemove', menuopenlistener);
        }

        var producturl = decodeURIComponent($location.search().producturl);
        if(producturl&&producturl!=""&&producturl!="true"&&producturl!="undefined") {
            var parser = document.createElement('a');
            parser.href = producturl;
            olark('api.box.expand');
            olark('api.chat.sendMessageToVisitor', {
                body: "Welcome!  Can I help you gift this product from "+(parser.hostname=="localhost"?"another site":parser.hostname)+"?"
            });
            console.log("set Olark message: "+parser.hostname);
        }

        var userAgent = navigator.userAgent.toLowerCase();
         if (userAgent .indexOf('safari')!=-1){
           if(userAgent .indexOf('chrome')  > -1){
             //browser is chrome
           }else if((userAgent .indexOf('opera')  > -1)||(userAgent .indexOf('opr')  > -1)){
             //browser is opera
           }else{
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
        HeaderController])
    .run(function($rootScope, $location, $anchorScroll, $routeParams) {
      //when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
      });
    })

}(angular.module('GiftStarterApp')));
