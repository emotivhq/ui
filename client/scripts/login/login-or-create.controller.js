/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope,  $location, $routeParams, $timeout, UserService, TwitterService,
                                            FacebookService, GooglePlusService, emailLoginService, Analytics) {

        $scope.working = false;
        $scope.showCreate = false;
        $scope.showForgot = false;
        $scope.name;
        $scope.surname;
        $scope.email;
        $scope.reenteremail;
        $scope.password;
        $scope.reenterpassword;
        $scope.message;

        $scope.resetForm = function() {
            $scope.name='';
            $scope.surname='';
            $scope.email='';
            $scope.reenteremail='';
            $scope.password='';
            $scope.reenterpassword='';
            $scope.message='';
        };
        $scope.resetForm();

        if(UserService.loggedIn) {
            jQuery('.userlogin').css({display:"none"});
        }

        $scope.doLoginFacebook = FacebookService.login;
        $scope.doLoginTwitter = function() {
            TwitterService.getAuthUrl();
            TwitterService.login();
        };
        $scope.doLoginGoogleplus = GooglePlusService.login;
        $scope.doLoginEmail = function() {
            Analytics.track('user', 'login attempt with email');
            $scope.working = true;
            emailLoginService.login('login','',$scope.email,$scope.password,'').
                then(function (okMsg) {
                    //reset handled by $scope.$on('login-success')
                }, function (errMsg) {
                    $scope.working = false;
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
            $scope.working = true;
            emailLoginService.login('create',$scope.name+' '+$scope.surname,$scope.email,$scope.password,'').
                then(function (okMsg) {
                    emailLoginService.login('login','',$scope.email,$scope.password,'')
                }, function (errMsg) {
                    $scope.working = false;
                    $scope.message=errMsg;
                });
        };

        $scope.doForgotPassword = function() {
            Analytics.track('user', 'forgot login password');
            $scope.working = true;
            emailLoginService.login('forgotPassword','',$scope.email,'','').
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.$on('logout-success', function() {
            jQuery('.userlogin').fadeIn(1500);
            $scope.resetForm();
        });

        $scope.$on('login-success', function() {
            $scope.resetForm();
            $scope.message="Welcome, "+UserService.name+"!";
            jQuery('.userlogin').fadeOut(3000);
            $scope.working = false;
        });


    };

    app.controller('LoginOrCreateController', [
        '$scope',  '$location', '$routeParams', '$timeout', 'UserService', 'TwitterService', 'FacebookService',
        'GooglePlusService', 'emailLoginService', 'Analytics',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));