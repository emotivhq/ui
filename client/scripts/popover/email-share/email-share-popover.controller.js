/**
 * Created by stuart on 9/2/14.
 */


GiftStarterApp.controller('EmailSharePopoverController', [
            '$scope','PopoverService','$http','UserService','Analytics',
            'GiftStartService','$location', EmailSharePopoverController
]);

function EmailSharePopoverController ($scope,  PopoverService,  $http,  UserService,  Analytics,
         GiftStartService, $location) {

    $scope.toEmails = '';
    $scope.fromEmail = UserService.email;
    $scope.message = "Hey, check out this GiftStart, it's the bee's knees!\n\n" + UserService.name;
    $scope.formValid = true;

    $scope.sending = false;

    $scope.hidePopover = PopoverService.hidePopover;

    var email = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.([a-z0-9-]+)+$/i;

    $scope.submit = function() {
        var emails = $scope.toEmails.replace(/[ \n]/g, "").split(/[,;]/);
        $scope.formValid = emails.map(function(s){return email.test(s)})
            .every(function(b){return b}) && email.test($scope.fromEmail);

        if ($scope.formValid) {
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: UserService.uid,
                channel: 'email',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                })
            })));
            sendEmail(emails, $scope.fromEmail, $scope.message,
                $location.absUrl());
            $location.search('re', null);
        }
    };

    function sendEmail(to, from, message, share_url) {
        Analytics.track('campaign', 'email share submitted');
        $scope.sending = true;
        $http({method: 'PUT', url: '/giftstart/share', data:{
            to: to, from: from, message: message, share_url: share_url,
            gsid: GiftStartService.giftStart.gsid,
            sender_name: UserService.name, sender_uid: UserService.uid
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
