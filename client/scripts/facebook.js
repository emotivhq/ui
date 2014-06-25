/**
 * Created by stuart on 4/7/14.
 */

GiftStarterApp.service('FacebookService', [
            'ezfb','$http','$rootScope','$location','UserService',
    function(ezfb,  $http,  $rootScope,  $location,  UserService) {

        this.uid = -1;
        var self = this;

        this.loginCallback = function(response) {
            if (response.status === 'connected') {
                self.getLongTermToken(response.authResponse.accessToken, response.authResponse.userID);
            }
        };

        this.login = function() {
            ezfb.login(self.loginCallback,
                {scope: 'public_profile,basic_info,email,user_birthday,user_friends,friends_birthday'});
        };

        this.getLongTermToken = function(token, uid) {
            $http({method: 'POST', url: '/user',
                data: {uid: uid, service: 'facebook', action: 'get-long-term-token', auth_token: token}
            })
            .success(function(data) {UserService.registerLogin(data['uid'], data['usr_img']);})
        };

        this.logout = function() {
            ezfb.logout(function(response) {
                if (response.status  !== 'connected') {
                    UserService.registerLogout();
                }
            });
        };

        this.inviteFriends = function() {
            ezfb.ui({method: 'send', link: $location.absUrl(), app_id: ezfb.app_id});
        };

        ezfb.getLoginStatus(this.loginCallback);

}]);
