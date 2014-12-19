/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('LoginPopoverController', ['$scope','UserService',
    'PopoverService','GiftStartService','TwitterService','FacebookService',
    '$location','GooglePlusService','Analytics','AppStateService',
    LoginPopoverController]);


function LoginPopoverController($scope,  UserService,  PopoverService,
                                GiftStartService,  TwitterService,
                                FacebookService,  $location, GooglePlusService,
                                Analytics,  AppStateService) {

    $scope.loggedIn = UserService.loggedIn;

    // Check if user is logged in already
    if (UserService.loggedIn) {loginComplete()}

    // If they aren't, they'll need to log in
    $scope.facebookLogin = function() {
        Analytics.track('user', 'login attempt with facebook');
        AppStateService.setPath($location.path());
        FacebookService.login();
    };
    $scope.twitterLogin = function() {
        Analytics.track('user', 'login attempt with twitter');
        AppStateService.setPath($location.path());
        console && console.log && console.log("Setting path", AppStateService.path);
        TwitterService.login();
    };
    $scope.googleLogin  = function() {
        Analytics.track('user', 'login attempt with googleplus');
        AppStateService.setPath($location.path());
        GooglePlusService.login();
    };

    $scope.hidePopover = PopoverService.hidePopover;

    function loginComplete() {
        Analytics.track('user', 'login succeeded');
        if (/create/.test($location.path())) {
            PopoverService.hidePopover();
            GiftStartService.createGiftStart();
        } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
            PopoverService.contributeLogin = false;
            PopoverService.nextPopover();
        } else {
            PopoverService.hidePopover();
        }
    }

    TwitterService.getAuthUrl();

    $scope.$on('login-success', loginComplete);

}
