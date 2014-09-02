/**
 * Created by stuart on 9/2/14.
 */


GiftStarterApp.controller('EmailSharePopoverController', [
            '$scope','PopoverService','$http','UserService','Analytics',
            'GiftStartService',
    function($scope,  PopoverService,  $http,  UserService,  Analytics,
             GiftStartService) {

        $scope.toEmails = '';
        $scope.fromEmail = UserService.email;
        $scope.message = "Hey, check out this GiftStart, it's the bee's knees!\n"
            + window.location.href.split("#")[0] + "\n\n" + UserService.name;
        $scope.formValid = true;

        $scope.sending = false;

        $scope.hidePopover = PopoverService.hidePopover;

        var email = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.([a-z0-9-]+)+$/i;

        $scope.submit = function() {
            var emails = $scope.toEmails.replace(/[ \n]/g, "").split(/[,;]/);
            window.emails = emails;
            $scope.formValid = emails.map(function(s){return email.test(s)})
                .every(function(b){return b}) && email.test($scope.fromEmail);

            if ($scope.formValid) {sendEmail(emails, $scope.fromEmail,
                $scope.message)}
        };

        function sendEmail(to, from, message) {
            Analytics.track('campaign', 'email share submitted');
            $scope.sending = true;
            $http({method: 'PUT', url: 'share', data:{
                to: to, from: from, message: message,
                gsid: GiftStartService.giftStart.gsid,
                sender_name: UserService.name
            }}).success(function() {
                Analytics.track('campaign', 'email share succeeded');
                $scope.sending = false;

                $scope.toEmails = '';
                $scope.fromEmail = '';
                $scope.message = '';

                $scope.hidePopover();
            }).error(function() {
                $scope.sending = false;
                Analytics.track('campaign', 'email share failed');
            });
        }
    }
]);


GiftStarterApp.directive('gsEmailSharePopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/email-share-popover.html'}});