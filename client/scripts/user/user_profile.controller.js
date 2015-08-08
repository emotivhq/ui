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

    $http({
        method: 'GET',
        url: '/users/profile/' + thisUser + '.json?ext=giftideas'
    }).success(function (response) {
        $scope.user = response;
        $scope.userIdea = $scope.user.giftideas;
    });

    UserService.getUser(thisUser,
        function (data) {
            $scope.userCampaings = data[Object.keys(data)[0]];
            $scope.pitchins_unique = getUniquePitchIns($scope.userCampaings.pitchins);
    });

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

    $scope.DeleteSavedItem = function(idea) {
        idea.loading = true;
        var index = $scope.userIdea.indexOf(idea);
        $scope.userIdea.splice(index, 1);
        $http.post('/users', {
            'uid': $scope.user.uid,
            'action': 'delete-save-for-later',
            'url': idea.url,
            'retailer': idea.retailer,
            'price': idea.price,
            'title': idea.title,
            'imgUrl': idea.img
        })
            .then(function () {
                idea.loading = false;
            }, function () {
                //alert("Error. Please try again.");
            })
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
    $scope.imgloading = false;
    $scope.months = [
        {label: 'Jan', value: 1},
        {label: 'Feb', value: 2},
        {label: 'Mar', value: 3},
        {label: 'Apr', value: 4},
        {label: 'May', value: 5},
        {label: 'Jun', value: 6},
        {label: 'Jul', value: 7},
        {label: 'Aug', value: 8},
        {label: 'Sep', value: 9},
        {label: 'Oct', value: 10},
        {label: 'Nov', value: 11},
        {label: 'Dec', value: 12}
    ];
    var imageData;

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;
    $scope.user.error_message = "";

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
                $scope.user.img_url = newImageUrl.data;
                $scope.editMode = false;
            }, function (reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }

    $scope.goToLink = function(destination) {
        $location.path("/" + destination);
    };

};

app.controller('UserprofileController', ['$scope','UserService', '$location', '$http', 'Analytics', UserprofileController]);

}(angular.module('GiftStarterApp')));

