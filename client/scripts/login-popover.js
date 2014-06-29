/**
 * Created by stuart on 4/21/14.
 */


GiftStarterApp.controller('LoginPopoverController', [
            '$scope','UserService','PopoverService','GiftStartService','TwitterService','FacebookService','$location','GooglePlusService',
    function($scope,  UserService,  PopoverService,  GiftStartService,  TwitterService,  FacebookService,  $location,  GooglePlusService) {

        $scope.loggedIn = UserService.loggedIn;

        // Check if user is logged in already
        if (UserService.loggedIn) {loginComplete()}

        // If they aren't, they'll need to log in
        $scope.login = FacebookService.login;

        $scope.twitterLogin = TwitterService.login;

        $scope.googleLogin = GooglePlusService.login;

        function loginComplete() {
            mixpanel.track("Login succeeded");
            ga('send', 'event', 'login', 'success');
            if ($location.path().search('campaign-create') != -1) {
                PopoverService.hidePopover();
                GiftStartService.createGiftStart();
            } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
                PopoverService.contributeLogin = false;
                PopoverService.nextPopover();
            } else {
                PopoverService.hidePopover();
            }
        }

        $scope.$on('login-success', loginComplete);

    }
]);

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/login-popover.html'}});
