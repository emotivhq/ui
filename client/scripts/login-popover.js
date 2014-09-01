/**
 * Created by stuart on 4/21/14.
 */


GiftStarterApp.controller('LoginPopoverController', [
            '$scope','UserService','PopoverService','GiftStartService','TwitterService','FacebookService','$location',
            'GooglePlusService','Analytics','AppStateService',
    function($scope,  UserService,  PopoverService,  GiftStartService,  TwitterService,  FacebookService,  $location,
             GooglePlusService,  Analytics,  AppStateService) {

        $scope.loggedIn = UserService.loggedIn;

        // Check if user is logged in already
        if (UserService.loggedIn) {loginComplete()}

        // If they aren't, they'll need to log in
        $scope.facebookLogin = function() {
            Analytics.track('user', 'login attempt with facebook');
            FacebookService.login();
        };
        $scope.twitterLogin = function() {
            Analytics.track('user', 'login attempt with twitter');
            TwitterService.login();
        };
        $scope.googleLogin  = function() {
            Analytics.track('user', 'login attempt with googleplus');
            GooglePlusService.login();
        };

        $scope.hidePopover = PopoverService.hidePopover;

        function loginComplete() {
            Analytics.track('user', 'login succeeded');
            if ($location.path().search('create') != -1) {
                PopoverService.hidePopover();
                GiftStartService.createGiftStart();
            } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
                PopoverService.contributeLogin = false;
                PopoverService.nextPopover();
            } else {
                PopoverService.hidePopover();
            }
        }

        TwitterService.getAuthUrl(AppStateService.getTwitterRedirectUrl());

        $scope.$on('login-success', loginComplete);

    }
]);

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/login-popover.html'}});
