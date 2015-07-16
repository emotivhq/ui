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

}
