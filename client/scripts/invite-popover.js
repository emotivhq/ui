/**
 * Created by stuart on 4/22/14.
 */

GiftStarterApp.controller('InvitePopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.friends = [];

        FacebookService.getFriends(function(friends) {
            $scope.friends = friends;
            injectSelectToggles($scope.friends);
        });

        $scope.invite = function() {
            alert("Invite!");
        };

        function injectSelectToggles(friends) {
            function makeSelectToggle(i) {
                var ti = i;
                return function () {
                    // If selected is none, this will force it into a bool
                    if (friends[ti].selected) {
                        friends[ti].selected = false;
                    } else {
                        friends[ti].selected = true;
                    }
                }
            }

            for (var i = 0; i < friends.length; i++) {
                friends[i].toggle = makeSelectToggle(i);
            }
        }

    }
]);

GiftStarterApp.directive('gsInvitePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/invite-popover.html'}});