/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('NotePopoverController', ['$scope','UserService',
    'PopoverService','GiftStartService','Analytics', NotePopoverController]);

function NotePopoverController($scope,  UserService,  PopoverService,
                               GiftStartService,  Analytics) {

    $scope.noteText = '';
    $scope.profilePicture = UserService.profileImageUrl;

    $scope.hidePopover = PopoverService.hidePopover;

    // Now that user is logged in, create giftstart in server
    if (!GiftStartService.giftStart.gsid) {GiftStartService.createGiftStart()}

    $scope.submit = function() {
        Analytics.track('pitchin', 'note submitted');
        GiftStartService.saveNote($scope.noteText);
        PopoverService.nextPopover();
    };
}
