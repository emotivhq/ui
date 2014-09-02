/**
 * Created by stuart on 9/2/14.
 */


GiftStarterApp.controller('EmailSharePopoverController', [
            '$scope',
    function($scope) {

        $scope.toEmails = '';
        $scope.fromEmail = '';
        $scope.message = '';

        $scope.hidePopover = PopoverService.hidePopover;

        $scope.submit = function() {
            console.log("Submit!");
        };
    }
]);


GiftStarterApp.directive('gsEmailSharePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/email-share-popover.html'}});