/**
 * Created by Stuart on 10/16/14.
 */



GiftStarterApp.controller('ProfileController', ['$scope','UserService',
    '$location','Analytics', ProfileController]);

function ProfileController($scope,  UserService,  $location) {
    $scope.user = {};

    UserService.getUser($location.path().replace('/users/', ''),
        function(data) {$scope.user = data[Object.keys(data)[0]]});
}
