/**
 * Created by stuart on 4/21/14.
 */


GiftStarterApp.controller('LoginPopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.loggedIn = false;

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-note-popover></gs-note-popover>');
        }

        // Check if user is logged in already
        FacebookService.loggedIn(function (loggedIn) {
            // If they are, proceed
            if (loggedIn) {
                $scope.loggedIn = true;
                goToNextPopover();
            }
        });

        // If they aren't, they'll need to log in
        $scope.login = function() {
            FacebookService.login(function(loggedIn) {
                if (loggedIn) {
                    $scope.loggedIn = true;
                    goToNextPopover();
                } else {
                    console.log('Failed to log into facebook.');
                }
            });
        };

        // Listen for popover changes or hides, so we can clean up
        // TODO: The fact that I'm trying to do this seems to be an indicator that popover stuff isn't set up right.
//        $scope.$on('popover-hidden', cleanUp);
//        $scope.$on('popover-updated', cleanUp);
//        function cleanUp() {console.log("shutting down controller...");$scope.$destroy();}

    }
]);

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/login-popover.html'}});
