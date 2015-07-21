/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ShareController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','LinkedInService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    ShareController]);

function ShareController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService, LinkedInService, Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    $scope.giftStart = GiftStartService.giftStart;

    $scope.message = "Hey! I just pitched in on a gift for " + $scope.giftStart.shipping_name + " using GiftStarter, a web service where you can buy anything online and split the cost with friends! " + $scope.giftStart.product_title + " will be such an exciting gift for them to receive. Please help to make it happen by following the link below to pitch in too!\n\nLINK: " + $scope.campaignUrl() + "\n\n" + $scope.giftStart.gc_name;

    $scope.sharePermission = [];
    $scope.sharePermission["facebook"] = false;
    $scope.sharePermission["twitter"] = false;
    $scope.sharePermission["linkedin"] = false;
    $scope.sharePermission["google"] = false;
    var sharePermissionUrlFacebook = FacebookService.getSharePermissionUrl();
    var sharePermissionUrlTwitter = null;
    var sharePermissionUrlLinkedIn = LinkedInService.getSharePermissionUrl();

    $scope.emailRecipients = "";


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
        LinkedInService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["linkedin"] = hasPermission=='1';
            if($scope.selectedSocials["linkedin"]) {$scope.selectedSocials["linkedin"] = $scope.sharePermission["linkedin"];}
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

    $scope.ensureLinkedInSharePermission = function() {
        window.open(sharePermissionUrlLinkedIn);
    };

    $scope.shareReset = function() {
        $scope.selectedSocials["facebook"] = false;
        $scope.selectedSocials["twitter"] = false;
        $scope.selectedSocials["linkedin"] = false;
        $scope.selectedSocials["google"] = false;
        $scope.emailRecipients = "";
        $scope.shareSuccess = false;
    };

    $scope.shareFacebook = function(message, link, linkName) {
        Analytics.track('campaign', 'facebook share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        FacebookService.doShare(message, link, linkName);
    };

    $scope.shareTwitter = function(message, link) {
        Analytics.track('campaign', 'twitter share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        TwitterService.doShare(message, link);
    };

    $scope.shareGplus = function(link) {
        Analytics.track('campaign', 'gplus share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        window.open("https://plus.google.com/share?url="+link);
        $scope.sharePermission["google"] = true;
    };

    $scope.shareLinkedin = function(message, link, linkName) {
        Analytics.track('campaign', 'linkedin share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        LinkedInService.doShare(message, link, linkName);
    };

    $scope.shareEmail = function(to, message, link) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        Analytics.track('campaign', 'email share submitted');
        $scope.sending = true;
        $http({
            method: 'PUT',
            url: '/email/sharecampaign.json',
            data: {
                to: to,
                message: message,
                share_url: link,
                gsid: $scope.giftStart.gsid
            }
        })
        .success(function() {
            //alert('True');
        })
        .error(function() {
            //alert('False');

        });
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
    ensurePermission["linkedin"] = $scope.ensureLinkedInSharePermission;
    ensurePermission["google"] = $scope.shareGplus;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;

        if($scope.selectedSocials["facebook"]) {
            $scope.shareFacebook($scope.message);
        }
        if($scope.selectedSocials["twitter"]) {
            $scope.shareTwitter($scope.message);
        }
        if($scope.selectedSocials["linkedin"]) {
            $scope.shareLinkedin($scope.message);
        }
        //if($scope.selectedSocials["google"]) {
        //    $scope.shareGoogle();
        //}
        if($scope.emailRecipients.trim().length>0) {
            $scope.shareEmail($scope.emailRecipients, $scope.message)
        }
    };

    $scope.selectSocial = function(social) {
        $scope.selectedSocials[social] = true;
        if(!$scope.sharePermission[social]) {
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

    $scope.loggedIn = function() {
        return UserService.loggedIn;
    };
}
