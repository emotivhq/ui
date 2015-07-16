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

    $scope.sharePermissionFacebook = false;
    var sharePermissionUrlFacebook = FacebookService.getSharePermissionUrl();
    $scope.sharePermissionTwitter = false;
    var sharePermissionUrlTwitter = null;
    $scope.sharePermissionGplus = false;
    var sharePermissionUrlGplus = GooglePlusService.getSharePermissionUrl();


    $scope.refreshPermissionsStatus = function() {
        //check to see if user has permission to post
        FacebookService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermissionFacebook = hasPermission=='1';
        });
        TwitterService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermissionTwitter = hasPermission=='1';
        });
        GooglePlusService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermissionGplus = hasPermission=='1';
        });
        //twitter permissions URL must be generated dynamically
        if(!$scope.sharePermissionTwitter) {
            TwitterService.getSharePermissionUrl().then(function(url){
                sharePermissionUrlTwitter = url;
            });
        }
    };

    $scope.refreshPermissionsStatus();
    var permissionsTimer = $interval($scope.refreshPermissionsStatus,4*60*1000); //twitter URL expires after 5m
    $scope.$on("$destroy",function() {$interval.cancel(permissionsTimer);});


    $scope.shareSuccess = false;

    $scope.pressedFacebook = false;
    $scope.pressedTwitter = false;
    $scope.pressedLinkedIn = false;
    $scope.pressedGoogle = false;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;

        if($scope.pressedFacebook) {
            $scope.shareFacebook();
        }
        if($scope.pressedTwitter) {
            $scope.shareTwitter();
        }
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.ensureFacebookSharePermission = function() {
        window.open(sharePermissionUrlFacebook);
    };

    $scope.ensureTwitterSharePermission = function() {
        window.open(sharePermissionUrlTwitter);
    };

    $scope.ensureGplusSharePermission = function() {
        window.open(sharePermissionUrlGplus);
    };

    $scope.shareFacebook = function(message, link, linkName) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        if (!linkName) {linkName = $scope.giftStart.product_title;}
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

    $scope.shareLinkedin = function(message, link, linkName) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        if (!linkName) {linkName = $scope.giftStart.product_title;}
        window.open("https://www.linkedin.com/shareArticle?mini=true"
            +"&url="+link
            +"&title="+linkName
            +"&summary="+message
        )
    }

}
