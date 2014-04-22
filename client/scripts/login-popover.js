/**
 * Created by stuart on 4/21/14.
 */


var LoginPopoverController = GiftStarterApp.controller('LoginPopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.loggedIn = false;
        console.log("anyone?");

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-note-popover></gs-note-popover>');
        }

        // Check if user is logged in already
        FacebookService.loggedIn(function (loggedIn) {
            // If they are, proceed
            if (loggedIn) {
                console.log("user is logged in!  Moving on...");
                $scope.loggedIn = true;
                goToNextPopover();
            } else {
                console.log("not logged in, they'll need to log in...");
            }
        });

        // If they aren't, they'll need to log in
        $scope.login = function() {
            console.log("helloooooooo?");
            if ($scope.loggedIn) {
                FacebookService.logout();
                $scope.loggedIn = false;
                // TODO: make sure it actually logs out, catch case where it doesn't
                console.log("logging out...");
            } else {
                FacebookService.login(function(loggedIn) {
                    if (loggedIn) {
                        goToNextPopover();
                    }
                });
                $scope.loggedIn = true;
                // TODO: make sure it actually logs in, catch case where it doesn't
                console.log("logging in...");
            }
        };

        // Listen for popover changes or hides, so we can clean up
        // TODO: The fact that I'm trying to do this seems to be an indicator that popover stuff isn't set up right.
//        $scope.$on('popover-hidden', cleanUp);
//        $scope.$on('popover-updated', cleanUp);
//        function cleanUp() {console.log("shutting down controller...");$scope.$destroy();}

    }
]);

var LoginPopoverDirective = GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/login-popover.html'}});
