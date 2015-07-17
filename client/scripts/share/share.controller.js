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

    $scope.sharePermission = [];
    $scope.sharePermission["facebook"] = false;
    $scope.sharePermission["twitter"] = false;
    $scope.sharePermission["linkedin"] = false;
    $scope.sharePermission["google"] = false;
    var sharePermissionUrlFacebook = FacebookService.getSharePermissionUrl();
    var sharePermissionUrlTwitter = null;


    $scope.refreshPermissionsStatus = function() {
        //check to see if user has permission to post
        FacebookService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["facebook"] = hasPermission=='1';
            if($scope.selectedSocials["facebook"]) {$scope.selectedSocials["facebook"] = $scope.sharePermission["facebook"];}
        });
        TwitterService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["twitter"] = hasPermission=='1';
            if($scope.selectedSocials["twitter"]) {$scope.selectedSocials["twitter"] = $scope.sharePermission["twitter"];}
        });
        //GooglePlusService.checkSharePermission().then(function(hasPermission) {
        //    $scope.sharePermission["google"] = hasPermission=='1';
        //    if($scope.selectedSocials["google"]) {$scope.selectedSocials["google"] = $scope.sharePermission["google"];}
        //});
        //twitter permissions URL must be generated dynamically
        if(!$scope.sharePermission["twitter"]) {
            TwitterService.getSharePermissionUrl().then(function(url){
                sharePermissionUrlTwitter = url;
            });
        }
    };

    $scope.refreshPermissionsStatus();
    var permissionsTimer = $interval($scope.refreshPermissionsStatus,4*60*1000); //twitter URL expires after 5m
    $scope.$on("$destroy",function() {$interval.cancel(permissionsTimer);});


    $scope.ensureFacebookSharePermission = function() {
        window.open(sharePermissionUrlFacebook);
    };

    $scope.ensureTwitterSharePermission = function() {
        window.open(sharePermissionUrlTwitter);
    };

    $scope.shareReset = function() {
        $scope.selectedSocials["facebook"] = false;
        $scope.selectedSocials["twitter"] = false;
        $scope.selectedSocials["linkedin"] = false;
        $scope.selectedSocials["google"] = false;
        $scope.shareSuccess = false;
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

    $scope.shareGplus = function(link) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        window.open("https://plus.google.com/share?url="+link)
        $scope.sharePermission["google"] = true;
    };

    $scope.shareLinkedin = function(message, link, linkName) {
        if (!message) {message = 'I just created a new gift on GiftStarter!'}
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        if (!linkName) {linkName = $scope.giftStart.product_title;}
        window.open("https://www.linkedin.com/shareArticle?mini=true"
            +"&url="+link
            +"&title="+linkName
            +"&summary="+message
        );
        $scope.sharePermission["linkedin"] = true;
    };


    $scope.shareSuccess = false;

    $scope.selectedSocials = [];
    $scope.selectedSocials["facebook"] = false;
    $scope.selectedSocials["twitter"] = false;
    $scope.selectedSocials["linkedin"] = false;
    $scope.selectedSocials["google"] = false;

    var ensurePermission = [];
    ensurePermission["facebook"] = $scope.ensureFacebookSharePermission;
    ensurePermission["twitter"] = $scope.ensureTwitterSharePermission;
    ensurePermission["linkedin"] = $scope.shareLinkedin;
    ensurePermission["google"] = $scope.shareGplus;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;
        alert(jQuery('#shareMessage').innerHTML);

        if($scope.selectedSocials["facebook"]) {
            $scope.shareFacebook();
        }
        if($scope.selectedSocials["twitter"]) {
            $scope.shareTwitter();
        }
        //if($scope.selectedSocials["linkedin"]) {
        //    $scope.shareLinkedin();
        //}
        //if($scope.selectedSocials["google"]) {
        //    $scope.shareGoogle();
        //}
    };

    $scope.selectSocial = function(social) {
        $scope.selectedSocials[social] = true;
        if(!$scope.sharePermission[social]) {
            console.log(ensurePermission);
            ensurePermission[social]();
        }
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };
}
