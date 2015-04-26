/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var UserprofileController = function ($scope, UserService, GiftStartService, $location, $http) {

    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/')+1);
    $scope.user = {};
    $scope.userIdea = {};
    $http({
        method: 'GET',
        url: ' /users/profile/' + thisUser + '.json?ext=giftideas'
    }).success(function (response) {
        $scope.user = response;
        $scope.userIdea = $scope.user.giftideas;
        console.log($scope.userIdea);
    });

    console.log(GiftStartService);

    $scope.fieldisable = true;
    $scope.blocked = true;
    $scope.quantity = 10;
    $scope.showMore = true;
    $scope.months = [
        {label: 'Jan', value: 0},
        {label: 'Feb', value: 1},
        {label: 'Mar', value: 2},
        {label: 'Apr', value: 3},
        {label: 'May', value: 4},
        {label: 'Jun', value: 5},
        {label: 'Jul', value: 6},
        {label: 'Aug', value: 7},
        {label: 'Sep', value: 8},
        {label: 'Oct', value: 9},
        {label: 'Nov', value: 10},
        {label: 'Dec', value: 11}
    ];
    var imageData;

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;

    $scope.validateLinks = function() {
        $scope.user.link_facebook=addProtocol($scope.user.link_facebook);
        $scope.user.link_twitter=addProtocol($scope.user.link_twitter);
        $scope.user.link_linkedin=addProtocol($scope.user.link_linkedin);
        $scope.user.link_googleplus=addProtocol($scope.user.link_googleplus);
        $scope.user.link_website=addProtocol($scope.user.link_website);
    };

    var addProtocol = function(link) {
        if(link){
            link=link.trim();
            if(link!=""&&link.indexOf("http://")<0&&link.indexOf("https://")<0) {
                link="http://"+link;
            }
        }
        return link;
    };

    function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .then(function (newImageUrl) {
                $scope.user.img_url = newImageUrl;
                $scope.editMode = false;
            }, function (reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }
}
    app.controller('UserprofileController', ['$scope','UserService', 'GiftStartService',
    '$location', '$http', 'Analytics', UserprofileController]);
}(angular.module('GiftStarterApp')));

