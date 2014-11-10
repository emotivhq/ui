/**
 * Created by Stuart on 10/16/14.
 */



GiftStarterApp.controller('ProfileController', ['$scope','UserService',
    '$location','Analytics', ProfileController]);

function ProfileController($scope,  UserService,  $location) {
    $scope.user = {};

    var thisUser = $location.path().replace('/users/', '');
    var imageData;

    UserService.getUser(thisUser,
        function(data) {$scope.user = data[Object.keys(data)[0]]});

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;

        function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .success(function(newImageUrl) {
                $scope.user.img_url = newImageUrl;
                $scope.editMode = false;
            })
            .error(function(reason) {
                console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }
}
