/**
 * Created by stuart on 6/9/14.
 */


GiftStarterApp.controller('HeaderController', ['$scope','$location',
    'UserService','Analytics','PopoverService', '$rootScope', '$interval',
    HeaderController]);

function HeaderController($scope,  $location,  UserService,  Analytics,
                          PopoverService, $rootScope, $interval) {
    var self = this;
    this.thisRoute = $location.path().toString();
    this.loggedIn = UserService.loggedIn;
    this.mobile = device.mobile();

    this.subliminalOffset = -3.0;
    this.subliminalStyle = {'background-position-y': this.subliminalOffset +
        'px'};

    this.logout = logout;
    this.login = login;

    this.menuOpen = menuOpen;

    $interval(updateSubliminal, 3000);

    $scope.$on('login-success', updateLogin);
    $scope.$on('logout-success', updateLogin);
    $scope.$on('$routeChangeStart', routeChangeListener);

    // for sizing using ng-class
    function routeChangeListener(event, next) {
        menuClose();
        if (next.$$route) {
            self.thisRoute = next.$$route.originalPath;
        }
    }

    function updateSubliminal() {
        self.subliminalOffset -= 22.8178;
        self.subliminalStyle = {
            'background-position-y': self.subliminalOffset + 'px'
        };
    }

    function login() {PopoverService.setPopover('login')}

    function logout() {
        Analytics.track('user', 'logout from header');
        UserService.logout();
    }

    function updateLogin() {self.loggedIn = UserService.loggedIn}

    function menuOpen() {$rootScope.$broadcast('menu-open')}
    function menuClose() {$rootScope.$broadcast('menu-close')}
}
