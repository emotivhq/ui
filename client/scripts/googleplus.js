/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','UserService',
    function($http,  UserService) {

        var self = this;

        this.loginCallback = function(authResponse) {
            console.log(authResponse);
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            submitOneTimeCode(authResponse)
        };

        function submitOneTimeCode(authResponse) {
            $http({method: 'POST', url: '/user',
                data: {service: 'googleplus', action: 'submit-one-time-code', auth_response: authResponse}})
                .success(function(data) {
                    UserService.registerLogin(data['uid'], data['usr_img']);
                }).error(function(data) {console.log(data)});
        }

        this.login = function() {
            gapi.auth.signIn({accesstype: 'offline'});
        };

        window.googlePlusCallback = self.loginCallback;

    }
]);
