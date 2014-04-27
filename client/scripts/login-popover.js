/**
 * Created by stuart on 4/21/14.
 */


GiftStarterApp.controller('LoginPopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.loggedIn = FacebookService.loggedIn;

        // Check if user is logged in already
        if (FacebookService.loggedIn) {PopoverService.nextPopover()}

        // If they aren't, they'll need to log in
        $scope.login = FacebookService.login;

        $scope.$on('login-success', PopoverService.nextPopover);


        // Listen for popover changes or hides, so we can clean up
        // TODO: The fact that I'm trying to do this seems to be an indicator that popover stuff isn't set up right.
//        $scope.$on('popover-hidden', cleanUp);
//        $scope.$on('popover-updated', cleanUp);
//        function cleanUp() {console.log("shutting down controller...");$scope.$destroy();}

    }
]);

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/login-popover.html'}});
