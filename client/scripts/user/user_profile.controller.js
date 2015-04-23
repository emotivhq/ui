/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('UserprofileController', ['$scope','UserService',
    '$location', '$http', 'Analytics', UserprofileController]);

function UserprofileController($scope, UserService, $location, $http) {

    $scope.user = {};
    $http({
        method: 'GET',
        url: ' /users/profile/' + UserService.uid + '.json'
    }).success(function(response){
        $scope.user = response;
    });

    $scope.fieldisable = true;
    $scope.blocked = true;
    $scope.months = [
        { label: 'Jan', value: 0 },
        { label: 'Feb', value: 1 },
        { label: 'Mar', value: 2 },
        { label: 'Apr', value: 3 },
        { label: 'May', value: 4},
        { label: 'Jun', value: 5},
        { label: 'Jul', value: 6},
        { label: 'Aug', value: 7},
        { label: 'Sep', value: 8},
        { label: 'Oct', value: 9},
        { label: 'Nov', value: 10},
        { label: 'Dec', value: 11}
    ];
    $scope.$watch('user', function(newValue, oldValue) {
       newValue.birth_month = $scope.months[newValue.birth_month];
    });
    var thisUser = $location.path().replace('/user/', '');
    var imageData;

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
}
