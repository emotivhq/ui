/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ShareController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    ShareController]);

function ShareController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService,  Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    $scope.giftStart = GiftStartService.giftStart;

    $scope.shareSuccess = false;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.ensureFacebookSharePermission = function() {
        FacebookService.checkSharePermission().then(function(hasPermission) {
            if(hasPermission!='1') {
                window.location = FacebookService.getSharePermissionUrl();
            } else {
                alert('Nothing to do; user has publish permission on Facebook!')
            }
        });
    };

    $scope.ensureTwitterSharePermission = function() {
        TwitterService.checkSharePermission().then(function(hasPermission) {
            if(hasPermission!='1') {
                TwitterService.getSharePermissionUrl().then(function(url){
                    window.location = url;
                });
            } else {
                alert('Nothing to do; user has publish permission on Twitter!')
            }
        });
    };

    $scope.shareFacebook = function(message, link, linkName) {
        link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');
        linkName = $scope.giftStart.product_title;
        if(window.confirm("Warning!  This will ACTUALLY post a live message:\n"+message+" "+link)) {
            FacebookService.doShare(message, link, linkName).then(function (success) {
                alert(success);
            });
        }
    };

    $scope.shareTwitter = function(message) {
        message += " "+$location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');
        if(window.confirm("Warning!  This will ACTUALLY post a live message:\n"+message)) {
            TwitterService.doShare(message).then(function (success) {
                alert(success);
            });
        }
    };

}
