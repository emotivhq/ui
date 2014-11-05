/**
 * Created by Stuart on 10/16/14.
 */



GiftStarterApp.controller('ProfileController', ['$scope','UserService',
    '$location','Analytics', ProfileController]);

function ProfileController($scope,  UserService,  $location) {
    $scope.user = {};

    var thisUser = $location.path().replace('/users/', '');

    UserService.getUser(thisUser,
        function(data) {$scope.user = data[Object.keys(data)[0]]});

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;

    $scope.imageUpdated = function(data){
        $scope.imageSet = true;
        console.log('image updated', data);
    }
}
