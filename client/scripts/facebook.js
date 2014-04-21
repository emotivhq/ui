/**
 * Created by stuart on 4/7/14.
 */

var FacebookService = GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    function(ezfb, $http, $rootScope) {

        var uid = -1;

        ezfb.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                uid = res.authResponse.userID;
                $rootScope.$broadcast('login-success');
            }
        });

        function loggedIn(callback) {
            ezfb.getLoginStatus(function(res) {
                callback(res.status === 'connected');
            });
        }

        function login() {
            ezfb.login(function (res) {
                if (res.status === 'connected') {
                    $rootScope.$broadcast('login-success');
                    uid = res.authResponse.userID;
                    getLongTermToken(res.authResponse.accessToken);
                } else {
                    $rootScope.$broadcast('login-failure');
                }
            }, {scope: 'public_profile,basic_info,email,user_birthday,user_friends,friends_birthday'});
        }

        function getLongTermToken(token) {
            $http({method: 'POST', url: 'auth',
                data: {
                    type: 'facebook',
                    action: 'get-long-term-token',
                    token: token
                }}).
                success(function(data) {
                    ezfb.init({authResponse: data});
                }).
                error();
        }

        var logout = function() {
            ezfb.logout(function () {
            });
        };

        var getFriends = function(callback) {
            ezfb.api("me/friends?fields=id,name,birthday,picture",
                function (response) {
                    if (response && !response.error) {
                        callback(response.data);
                    }
                }
            );
        };

        function getUid() {return uid}

        return  {
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            getFriends: getFriends,
            getUid: getUid
        }

}]);


var FriendsController = GiftStarterApp.controller('FriendsController', ['$scope', 'FacebookService',
    function($scope, FacebookService) {
        $scope.friends = [];

        $scope.toggleLogin = function() {
            if (FacebookService.loginStatus) {
                FacebookService.logout();
            } else {
                FacebookService.login();
            }
        };

        $scope.$on('login-success', loginSuccess);
        function loginSuccess() {FacebookService.getFriends(loadFriends);}

        $scope.$on('login-failure', loginFail);
        function loginFail() {console.log("Failed to log in.");}

        function loadFriends(friends) {$scope.friends = friends;}

}]);
