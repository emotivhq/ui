/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('NotePopoverController', [
            '$scope','FacebookService','PopoverService','GiftStartService',
    function($scope,  FacebookService,  PopoverService,  GiftStartService) {

        $scope.noteText = '';
        $scope.profilePicture = FacebookService.profilePictureUrl;

        // Now that user is logged in, create giftstart in server
        if (!GiftStartService.giftStart.gsid) {GiftStartService.createGiftStart()}

        $scope.submit = function() {
            mixpanel.track("Note submitted");
            ga('send', 'event', 'pitch-in', 'note submitted');
            GiftStartService.saveNote($scope.noteText);
            PopoverService.nextPopover();
        };
    }
]);

GiftStarterApp.directive('gsNotePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/note-popover.html'}});
