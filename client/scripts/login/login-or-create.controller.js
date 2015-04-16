/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope,  $location, $routeParams, $timeout, UserService, TwitterService,
                                            FacebookService, GooglePlusService, emailLoginService, Analytics, AppStateService) {

        $scope.email = '';
        $scope.password = '';

        $scope.loggedIn = UserService.loggedIn;
        $scope.showCreate = false;
        $scope.doLoginFacebook = FacebookService.login;
        $scope.doLoginTwitter = function() {
            TwitterService.getAuthUrl();
            TwitterService.login();
        }
        $scope.doLoginGoogleplus = GooglePlusService.login;
        $scope.doLoginEmail = function() {
            emailLoginService.login(
                    'login','',$scope.email,$scope.password,'')
        }

        $scope.$on('logout-success', function() {
            $scope.loggedIn = false;
        });

        $scope.$on('login-success', function() {
            $scope.loggedIn = true;
        });


    };

    app.controller('LoginOrCreateController', [
        '$scope',  '$location', '$routeParams', '$timeout', 'UserService', 'TwitterService', 'FacebookService',
        'GooglePlusService', 'emailLoginService', 'Analytics', 'AppStateService',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));