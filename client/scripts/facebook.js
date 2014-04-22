/**
 * Created by stuart on 4/7/14.
 */

GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    function(ezfb, $http, $rootScope) {

        var uid = -1;
        var profilePictureUrl  = '';

        ezfb.getLoginStatus(function(res) {
            if (res.status === 'connected') {
                uid = res.authResponse.userID;

                // Get user's profile picture for later user
                ezfb.api("me/picture?type=square&height=150&width=150",
                    function(response) {
                        console.log(response);
                        profilePictureUrl = response.data.url;
                        $rootScope.$broadcast('login-success');
                    }
                );
            }
        });

        function loggedIn(callback) {
            ezfb.getLoginStatus(function(res) {
                callback(res.status === 'connected');
            });
        }

        function login(callback) {
            ezfb.login(function (res) {
                if (res.status === 'connected') {
                    uid = res.authResponse.userID;
                    getLongTermToken(res.authResponse.accessToken);

                    // Get user's profile picture for later user
                    ezfb.api("me/picture?type=square&height=150&width=150",
                        function(response) {
                            profilePictureUrl = response.data.url;
                            $rootScope.$broadcast('login-success');
                        }
                    );
                    if (callback) {
                        callback(res);
                    }
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

        function getProfilePictureUrl() {return profilePictureUrl}

        return  {
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            getFriends: getFriends,
            getUid: getUid,
            getProfilePictureUrl: getProfilePictureUrl
        }

}]);

//
//var FriendsController = GiftStarterApp.controller('FriendsController', ['$scope', 'FacebookService',
//    function($scope, FacebookService) {
//        $scope.friends = [];
//
//        $scope.toggleLogin = function() {
//            if (FacebookService.loginStatus) {
//                FacebookService.logout();
//            } else {
//                FacebookService.login();
//            }
//        };
//
//        $scope.$on('login-success', loginSuccess);
//        function loginSuccess() {FacebookService.getFriends(loadFriends);}
//
//        $scope.$on('login-failure', loginFail);
//        function loginFail() {console.log("Failed to log in.");}
//
//        function loadFriends(friends) {$scope.friends = friends;}
//
//}]);
