/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('NotePopoverController', [
            '$scope','UserService','PopoverService','GiftStartService',
    function($scope,  UserService,  PopoverService,  GiftStartService) {

        $scope.noteText = '';
        $scope.profilePicture = UserService.profileImageUrl;

        $scope.hidePopover = PopoverService.hidePopover;

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
