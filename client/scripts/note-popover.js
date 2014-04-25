/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('NotePopoverController', [
            '$scope','FacebookService','PopoverService','GiftStartService',
    function($scope,  FacebookService,  PopoverService,  GiftStartService) {

        $scope.noteText = '';
        $scope.profilePicture = FacebookService.profilePictureUrl;

        // Now that user is logged in, create giftstart in server
        GiftStartService.createGiftStart();

        function goToNextPopover() {
            PopoverService.setPopoverFromTemplate('<gs-pay-popover></gs-pay-popover>');
        }

        $scope.submit = function() {
            GiftStartService.saveNote($scope.noteText);
            goToNextPopover();
        };
    }
]);

var NotePopoverDirective = GiftStarterApp.directive('gsNotePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/note-popover.html'}});
