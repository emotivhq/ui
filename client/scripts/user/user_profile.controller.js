/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('UserprofileController', ['$scope','UserService',
    '$location', '$http', 'Analytics', UserprofileController]);

function UserprofileController($scope, UserService, $location, $http) {
    $scope.user = {};

    var thisUser = $location.path().replace('/user/', '');
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
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }

    $scope.checkAJAX = function() {
        var req = {
            method: 'POST',
            url: '/users',
            data: { test: 'test' }
        }
        $http(req).success(function(response){
            console.log(response)
        });
    }
}
