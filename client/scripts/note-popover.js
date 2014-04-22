/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('NotePopoverController', [
            '$scope','FacebookService','PopoverService','GiftStartService',
    function($scope,  FacebookService,  PopoverService,  GiftStartService) {

        $scope.noteText = '';
        $scope.profilePicture = '';

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-pay-popover></gs-pay-popover>');
        }

        // Get their profile picture
        FacebookService.getProfilePictureLink(function(profilePicture) {
            $scope.profilePicture = profilePicture;
        });

        $scope.submit = function() {
            GiftStartService.saveNote($scope.noteText);
            goToNextPopover();
        };
    }
]);

var NotePopoverDirective = GiftStarterApp.directive('gsNotePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/note-popover.html'}});
