/**
 * Created by stuart on 4/22/14.
 */

GiftStarterApp.controller('InvitePopoverController', [
            '$scope','FacebookService','PopoverService',
    function($scope,  FacebookService,  PopoverService) {

        $scope.friends = FacebookService.friends;
        $scope.profilePicture = FacebookService.profilePictureUrl;
        $scope.inviteMessage = 'Check out this GiftStarter campaign!';

        injectSelectToggles($scope.friends);

        $scope.invite = function() {
            alert("Invite!");
        };

        $scope.inviteFriends = function() {
            var selectedFriends = $scope.friends.filter(function(ele) {return ele.selected});
            FacebookService.inviteFriends(selectedFriends, $scope.inviteMessage);
            PopoverService.nextPopover();
        };

        function injectSelectToggles(friends) {
            function makeSelectToggle(i) {
                var ti = i;
                return function () {
                    // If selected is none, this will force it into a bool
                    friends[ti].selected = (friends[ti].selected != true);
                }
            }

            for (var i = 0; i < friends.length; i++) {
                friends[i].selected = false;
                friends[i].toggle = makeSelectToggle(i);
            }
        }

    }
]);

GiftStarterApp.directive('gsInvitePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/invite-popover.html'}});

GiftStarterApp.controller('ThanksPopoverController', [
            '$scope','PopoverService','GiftStartService',
    function($scope,  PopoverService,  GiftStartService) {
        $scope.close = function(){PopoverService.hidePopover()};

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;
    }
]);

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/thanks-popover.html'}});