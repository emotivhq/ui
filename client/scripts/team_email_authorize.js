/**
 * Created by stuart on 6/29/14.
 */

window.teamEmailCallback = function(authresponse) {alert(authresponse)};

GiftStarterApp.controller('TeamEmailAuthorize', [
            '$scope','$http',
    function($scope,  $http){

        $scope.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
            '?scope=' + encodeURIComponent('profile https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/gmail.modify') +
            '&client_id=' + encodeURIComponent('26242969111.apps.googleusercontent.com') +
            '&redirect_uri=' + encodeURIComponent('https://6-dot-gift-starter.appspot.com/oauth-callback/googleplus') +
            '&response_type=' + encodeURIComponent('code') +
            '&access_type=' + encodeURIComponent('offline');

        $scope.login = function() {
            window.open($scope.auth_url, 'Google Authorization');
        };

        $scope.sendToServer = function(authResponse) {
            $http({method: 'POST', url: '/user',
                data: {action: 'team-email-authorize', auth_response: authResponse}})
                .success(function(data) {console.log(data)})
                .error(function(data) {console.log(data)});
        };

        window.googlePlusCallback = $scope.sendToServer;
    }
]);