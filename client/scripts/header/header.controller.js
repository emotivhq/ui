/**
 * Created by stuart on 6/9/14.
 */


GiftStarterApp.controller('HeaderController', ['$scope','$location',
    'UserService','Analytics','PopoverService', HeaderController]);

function HeaderController($scope,  $location,  UserService,  Analytics,
                          PopoverService) {
    var self = this;
    this.thisRoute = $location.path().toString();
    this.loggedIn = UserService.loggedIn;
    this.mobile = device.mobile();

    this.logout = logout;
    this.login = login;

    $scope.$on('login-success', updateLogin);
    $scope.$on('logout-success', updateLogin);
    $scope.$on('$routeChangeStart', routeChangeListener);

    // for sizing using ng-class
    function routeChangeListener(event, next) {
        if (next.$$route) {
            self.thisRoute = next.$$route.originalPath;
        }
    }

    function login() {
        PopoverService.setPopover('login');
    }

    function logout() {
        Analytics.track('user', 'logout from header');
        UserService.logout();
    }

    function updateLogin() {
        self.loggedIn = UserService.loggedIn;
    }
}
