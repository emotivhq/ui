/**
 * Created by stuart on 4/7/14.
 */

GiftStarterApp.service('FacebookService', [
            'ezfb','$http','$rootScope','$location','$window','AppStateService',
    function(ezfb,  $http,  $rootScope,  $location,  $window,  AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';
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
            $http({method: 'POST', url: '/users',
                data: {uid: uid, service: 'facebook', action: 'get-long-term-token', auth_token: token,
                    location: $location.path() + $window.location.search,
                    referrer: AppStateService.referrer}
            })
            .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    $rootScope.$broadcast('facebook-login-success');
                })
        };

        this.logout = function() {
            // TODO: logout doesn't work due to X FRAME restriction... Facebook is trying to go to facebook.com/home.php?
//            ezfb.logout(function(response) {
//                if (response.status  !== 'connected') {
//                    $rootScope.$broadcast('facebook-logout-success');
//                } else {
//                    console.log("Facebook logout failed.");
//                    console.log(response);
//                }
//            });
            $rootScope.$broadcast('facebook-logout-success');
        };

        this.inviteFriends = function(uid) {
            mixpanel.track("share campaign facebook");
            ga('send', 'event', 'share campaign', 'facebook');
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'facebook',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                })
            })));
            ezfb.ui({method: 'send', link: $location.absUrl(), app_id: ezfb.app_id});
            console.log($location.absUrl());
            $location.search('re', null);
        };
}]);
