/**
 * Created by stuart on 4/22/14.
 */

GiftStarterApp.controller('InvitePopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.friends = [];

        FacebookService.getFriends(function(friends) {$scope.friends = friends});

        $scope.invite = function() {
            alert("Invite!");
        }

    }
]);

GiftStarterApp.directive('gsInvitePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/invite-popover.html'}});