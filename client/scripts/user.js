/**
 * Created by stuart on 6/25/14.
 */

GiftStarterApp.service('UserService', [
            '$http','$rootScope',
    function($http,  $rootScope) {
        this.uid = -1;
        this.loggedIn = false;
        this.profileImageUrl  = '';
        this.isStripeCustomer = false;
        this.loginService = '';

        var self = this;

        this.registerLogin = function(uid, profileImageUrl) {
            self.uid = uid;
            self.profileImageUrl = profileImageUrl;
            self.loggedIn = true;
            $rootScope.$broadcast('login-success');
        };


        this.logout = function() {
            if (self.loginService === 'facebook') {
                FacebookService.logout();
            } else if (self.loginService === 'twitter') {
                TwitterService.logout();
            }
        };

        this.registerLogout = function() {
            self.loggedIn = false;
            self.uid = -1;
            self.profileImageUrl = '';
            $rootScope.$broadcast('logout-success');
        };

        this.checkIfStripeCustomer = function() {
            $http({method: 'POST', url: '/pay', data: {action: 'is-existing-customer', uid: self.uid}})
                .success(function(response) {self.isStripeCustomer = response.isStripeCustomer})
                .error(function() {console.log('Failed to determine if stripe customer.')});
        };


    }
]);

