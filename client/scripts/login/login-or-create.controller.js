/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope,  $location, $routeParams, $timeout, UserService, TwitterService,
                                            FacebookService, GooglePlusService, emailLoginService, Analytics, AppStateService) {

        $scope.showCreate = false;
        $scope.showForgot = false;
        $scope.name;
        $scope.surname;
        $scope.email;
        $scope.reenteremail;
        $scope.password;
        $scope.reenterpassword;
        $scope.message;

        resetForm = function() {
            $scope.name='';
            $scope.surname='';
            $scope.email='';
            $scope.reenteremail='';
            $scope.password='';
            $scope.reenterpassword='';
            $scope.message='';
        };
        resetForm();

        $scope.loggedIn = UserService.loggedIn;
        $scope.doLoginFacebook = FacebookService.login;
        $scope.doLoginTwitter = function() {
            TwitterService.getAuthUrl();
            TwitterService.login();
        };
        $scope.doLoginGoogleplus = GooglePlusService.login;
        $scope.doLoginEmail = function() {
            Analytics.track('user', 'login attempt with email');
            emailLoginService.login('login','',$scope.email,$scope.password,'').
                then(function (okMsg) {
                    resetForm();
                }, function (errMsg) {
                    $scope.message=errMsg;
                });
        };

        $scope.doCreateEmail = function() {
            Analytics.track('user', 'create email login');
            if ($scope.email.trim()!=$scope.reenteremail.trim()) {
                $scope.message="Your email addresses do not match";
                return;
            }
            if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
                $scope.message="Your passwords do not match";
                return;
            }
            emailLoginService.login('create',$scope.name+' '+$scope.surname,$scope.email,$scope.password,'').
                then(function (okMsg) {
                    resetForm();
                }, function (errMsg) {
                    $scope.message=errMsg;
                });
        };

        $scope.doForgotPassword = function() {
            Analytics.track('user', 'forgot login password');
            emailLoginService.login('forgotPassword','',$scope.email,'','').
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                }, function (errMsg) {
                    $scope.message=errMsg;
                });
        };

        $scope.$on('logout-success', function() {
            $scope.loggedIn = false;
            resetForm();
        });

        $scope.$on('login-success', function() {
            $scope.loggedIn = true;
            resetForm();
        });


    };

    app.controller('LoginOrCreateController', [
        '$scope',  '$location', '$routeParams', '$timeout', 'UserService', 'TwitterService', 'FacebookService',
        'GooglePlusService', 'emailLoginService', 'Analytics', 'AppStateService',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));