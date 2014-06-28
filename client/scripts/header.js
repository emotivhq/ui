/**
 * Created by stuart on 6/9/14.
 */


GiftStarterApp.controller('HeaderController', [
            '$scope','$location','UserService',
    function($scope,  $location,  UserService) {
        $scope.thisRoute = $location.path().toString();
        $scope.loggedIn = UserService.loggedIn;

        function routeChangeListener(event, next) {
            $scope.thisRoute = next.$$route.originalPath;
        }
        $scope.$on('$routeChangeStart', routeChangeListener);

        $scope.logout = function() {
            console.log('Loggin out...');
            UserService.logout();
        };

        function updateLogin() {
            console.log("Login Status Updated");
            $scope.loggedIn = UserService.loggedIn;
        }
        console.log($scope.loggedIn);
        console.log(UserService.loggedIn);
        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
    }
]);

