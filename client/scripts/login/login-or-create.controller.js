/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope, $rootScope, $location, $routeParams, $timeout, $http, AppStateService, UserService, TwitterService,
                                            FacebookService, LinkedInService, GooglePlusService, emailLoginService, Analytics) {

        $scope.working = false;
        if (typeof($scope.showCreate) == 'undefined') {
            $scope.showCreate = true; //override via ng-repeat="showCreate in [true]" during ng-include
        }
        $scope.showForgot = false;
        $scope.showReset = false;
        if (typeof($scope.showSocials) == 'undefined') {
            $scope.showSocials = true; //override via ng-repeat="showSocials in [true]" during ng-include
        }
        $scope.name;
        $scope.surname;
        $scope.email;
        //$scope.reenteremail;
        $scope.password;
        $scope.showPassword;
        //$scope.reenterpassword;
        $scope.message;
        $scope.resetCode;

        $scope.resetForm = function() {
            $scope.name='';
            $scope.surname='';
            $scope.email='';
            //$scope.reenteremail='';
            $scope.password='';
            $scope.showPassword=false;
            //$scope.reenterpassword='';
            $scope.message='';
            $scope.resetCode='';
        };
        $scope.resetForm();

        if(UserService.loggedIn) {
            jQuery('.userlogin').css({display:"none"});
        }

        function doSocialLogin(successFunction, maxRetries) {
            maxRetries = typeof maxRetries !== 'undefined' ? maxRetries : 3;
            if(AppStateService.get('staged_giftstart')) {
                console && console.log && console.log("staged-create: " + AppStateService.get('staged_giftstart')['staging_uuid']);
                $http.post('/giftstart/create.json', AppStateService.get('staged_giftstart'))
                    .success(function (response) {
                        AppStateService.remove('staged_giftstart');
                        AppStateService.setPath($location.path());
                        successFunction();
                    })
                    .error(function () {
                        if(maxRetries>0)
                        console && console.log && console.log("Error while staging GiftStart; retrying...");
                        doSocialLogin(successFunction, maxRetries-1);
                    });
            } else {
                successFunction();
            }
        }

        $scope.doLoginFacebook = function() {
            doSocialLogin(FacebookService.login);
        };
        $scope.doLoginTwitter = function() {
            doSocialLogin(function() {
                TwitterService.getAuthUrl().then(function(url) {
                    TwitterService.login();
                });
            });
        };
        $scope.doShareTwitter = function() {
            TwitterService.getSharePermissionUrl().then(function(url){
                //window.open(url);
                window.location = url;
            });
        };
        $scope.doLoginGoogleplus = function() {
            doSocialLogin(GooglePlusService.login);
        };
        $scope.doLoginLinkedin = function() {
            doSocialLogin(LinkedInService.login);
        };
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
            //if ($scope.email.trim()!=$scope.reenteremail.trim()) {
            //    $scope.message="Your email addresses do not match";
            //    return;
            //}
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
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

        $scope.doResetPassword = function() {
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
            Analytics.track('user', 'reset login password');
            $scope.working = true;
            emailLoginService.login('reset','',$scope.email,$scope.password,$scope.resetCode).
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                    //$timeout(function(){$rootScope.$broadcast('header-show-login')},3000);
                    //jQuery('.userlogin').fadeOut(3000);
                    //jQuery('.userlogin').fadeIn(1500);
                    $scope.doLoginEmail();
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.$on('logout-success', function() {
            jQuery('.userlogin').fadeIn(1500);
            $scope.resetForm();
        });

        $scope.$on('hide-login-socials', function() {
            $scope.showSocials = false;
        });

        $scope.$on('login-success', function() {
            $scope.resetForm();
            $scope.message=UserService.name?("Welcome, "+UserService.name+"!"):"Welcome!";
            $timeout(function(){$rootScope.$broadcast('header-close-login')},3000);
            jQuery('.userlogin').fadeOut(3000);
            $scope.working = false;
        });

        $rootScope.$on('loginbox-show-login', function(){
            $scope.resetForm();
            $scope.showCreate = false;
            $scope.showReset = false;
            setTimeout(function() {jQuery('.loginwrapper .userlogin__email').focus();}, 0);
        });

        $rootScope.$on('loginbox-show-reset', function() {
            $scope.resetForm();
            $scope.resetCode = $routeParams.resetCode;
            $scope.showCreate = false;
            $scope.showReset = true;
        });

    };

    app.controller('LoginOrCreateController', [
        '$scope', '$rootScope', '$location', '$routeParams', '$timeout', '$http', 'AppStateService', 'UserService', 'TwitterService', 'FacebookService',
        'LinkedInService','GooglePlusService', 'emailLoginService', 'Analytics',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));