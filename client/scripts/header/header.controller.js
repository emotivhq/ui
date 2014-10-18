/**
 * Created by stuart on 6/9/14.
 */


GiftStarterApp.controller('HeaderController', ['$scope','$location',
    'UserService','Analytics', HeaderController]);

function HeaderController($scope,  $location,  UserService,  Analytics) {
    $scope.thisRoute = $location.path().toString();
    $scope.loggedIn = UserService.loggedIn;

    // ?
    function routeChangeListener(event, next) {
        if (next.$$route) {
            $scope.thisRoute = next.$$route.originalPath;
        }
    }
    $scope.$on('$routeChangeStart', routeChangeListener);

    $scope.logout = function() {
        Analytics.track('user', 'logout from header');
        UserService.logout();
    };

    function updateLogin() {
        $scope.loggedIn = UserService.loggedIn;
    }

    $scope.$on('login-success', updateLogin);
    $scope.$on('logout-success', updateLogin);
}
