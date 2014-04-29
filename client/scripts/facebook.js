/**
 * Created by stuart on 4/7/14.
 */

GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    function(ezfb, $http, $rootScope) {

        this.uid = -1;
        this.profilePictureUrl  = '';
        this.friends = [];
        this.loggedIn = false;
        this.isStripeCustomer = false;
        var self = this;

        this.loginCallback = function(response) {
            if (response.status === 'connected') {
                self.uid = response.authResponse.userID;
                self.loggedIn = true;

                // Get user's profile picture for later user
                ezfb.api("me/picture?type=square&height=150&width=150", self.loginSuccess);
                self.getFriends();
                self.checkIfStripeCustomer();
            } else {
                $rootScope.$broadcast('login-failure');
                self.loggedIn = false;
            }
        };
        this.loginSuccess = function(response) {
            self.profilePictureUrl = response.data.url;
            $rootScope.$broadcast('login-success');
        };

        this.login = function() {
            ezfb.login(self.loginCallback,
                {scope: 'public_profile,basic_info,email,user_birthday,user_friends,friends_birthday'});
        };

        this.getLongTermToken = function(token) {
            $http({method: 'POST', url: 'auth',
                data: {
                    type: 'facebook',
                    action: 'get-long-term-token',
                    token: token
                }
            })
            .success(function(data) {ezfb.init({authResponse: data})})
            .error();
        };

        this.logout = function() {
            ezfb.logout(this.logoutCallback)
        };
        this.logoutCallback = function(response) {
            if (response.status  !== 'connected') {
                self.loggedIn = false;
                self.profilePictureUrl = '';
                self.uid = -1;
            }
        };

        this.getFriends = function() {ezfb.api("me/friends?fields=id,name,birthday,picture", this.friendsCallback)};

        this.friendsCallback = function(response) {
            if (response && !response.error) {
                self.friends = response.data;
                $rootScope.$broadcast('get-friends-success');
            } else {$rootScope.$broadcast('get-friends-failed')}
        };

        this.inviteFriends = function(friends, message) {
            console.log("Inviting friends:");
            console.log(friends);
            console.log("Invitation message:");
            console.log(message);
        };

        this.checkIfStripeCustomer = function() {
            $http({method: 'POST', url: '/pay', data: {action: 'is-existing-customer', uid: self.uid}})
                .success(function(response) {self.isStripeCustomer = response.isStripeCustomer})
                .error(function() {console.log('Failed to determine if stripe customer.')});
        };

        ezfb.getLoginStatus(this.loginCallback);

}]);
