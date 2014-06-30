/**
 * Created by stuart on 6/29/14.
 */

window.teamEmailCallback = function(authresponse) {alert(authresponse)};

GiftStarterApp.controller('TeamEmailAuthorize', [
            '$scope','$http',
    function($scope,  $http){
        $scope.login = function() {
            gapi.auth.signIn({
                accesstype: 'offline',
                scope: 'https://www.googleapis.com/auth/gmail.compose',
                callback: teamEmailCallback

            });
        };

        $scope.sendToServer = function(authResponse) {
            $http({method: 'POST', url: '/user',
                data: {action: 'team-email-authorize', auth_response: authResponse}})
                .success(function(data) {console.log(data)})
                .error(function(data) {console.log(data)});
        };

        window.teamEmailCallback = $scope.sendToServer;
    }
]);