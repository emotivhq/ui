/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var UserprofileController = function ($scope, UserService, $location, $http) {

    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/') + 1);
    $scope.user = {};
    $scope.userIdea = {};
    $scope.pitchins_unique = [];

    function refreshUserData() {
        $http({
            method: 'GET',
            url: ' /users/profile/' + thisUser + '.json?ext=giftideas'
        }).success(function (response) {
            $scope.user = response;
            $scope.userIdea = $scope.user.giftideas;
        });
        UserService.getUser(thisUser,
            function (data) {
                $scope.userCampaings = data[Object.keys(data)[0]];
                $scope.pitchins_unique = getUniquePitchIns($scope.userCampaings.pitchins);
            });
    }
    refreshUserData();

    var getUniquePitchIns = function(pitchins) {
        var flags = [], ret = [], l = pitchins.length, i;
        for( i=0; i<l; i++) {
            if( flags[pitchins[i].giftstart_url_title]) continue;
            flags[pitchins[i].giftstart_url_title] = true;
            ret.push(pitchins[i]);
        }
        return ret;
    };

    $scope.giftstartThisUrl = function (title, price, img, url) {
        return '/create?' + urlSerialize({
                product_url: url,
                title: title,
                price: price,
                img_url: img,
                source: 'StoredProduct'
            });
    };

    $scope.DeleteSavedItem = function(idea){
        idea.loading = true;
        $http.post('/users', {
            'uid': $scope.user.uid,
            'action': 'delete-save-for-later',
            'url': idea.url,
            'retailer': idea.retailer,
            'price': idea.price,
            'title': idea.title,
            'imgUrl': idea.img
        })
            .then(function (res) {
                refreshUserData();
                idea.loading = false;
            }, function (errorRes) {
                alert("Error. Please try again.");
            });
    };

    var urlSerialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    $scope.fieldisable = true;
    $scope.blocked = true;
    $scope.quantity = 10;
    $scope.campaingquantity = 3;
    $scope.showMore = true;
    $scope.showMoreCampaign = true;
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


    $scope.validateLinks = function () {
        $scope.user.link_facebook = addProtocol($scope.user.link_facebook);
        $scope.user.link_twitter = addProtocol($scope.user.link_twitter);
        $scope.user.link_linkedin = addProtocol($scope.user.link_linkedin);
        $scope.user.link_googleplus = addProtocol($scope.user.link_googleplus);
        $scope.user.link_website = addProtocol($scope.user.link_website);
    };

    $scope.$on('logout-success', function() {
            $scope.editable = false;
        }
    );

    var addProtocol = function (link) {
        if (link) {
            link = link.trim().toLowerCase();
            if (link != "" && link.indexOf("http://") < 0 && link.indexOf("https://") < 0) {
                link = "http://" + link;
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

};

app.controller('UserprofileController', ['$scope','UserService', '$location', '$http', 'Analytics', UserprofileController]);

}(angular.module('GiftStarterApp')));

