/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('LoginPopoverController', ['$scope', '$http', '$cookieStore', 'UserService',
    'PopoverService','GiftStartService','TwitterService','FacebookService',
    '$location','GooglePlusService','Analytics','AppStateService', 'emailLoginService', '$routeParams', '$timeout',
    LoginPopoverController]);


function LoginPopoverController($scope, $http, $cookieStore, UserService,  PopoverService,
                                GiftStartService,  TwitterService,
                                FacebookService,  $location, GooglePlusService,
                                Analytics,  AppStateService, emailLoginService, $routeParams, $timeout) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.emailFormModel = {
        isLogin: true,
        isLoginCreate: false,
        isForgotPassword: false,
        isEmailLogin: false,
        isReset: false,
        emailname: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        message: ''
    };

    var mode = ($routeParams.resetCode) ? 'reset' : 'login',
        loginUrl = '';

    $scope.emailFormActions = {
        createLoginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = true;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            event && event.preventDefault();
        },
        forgotPasswordMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = true;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            event && event.preventDefault();
        },
        loginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = true;
            $scope.emailFormModel.isReset = false;
            event && event.preventDefault();
        },
        resetMode: function () {
            $scope.emailFormModel.isEmailLogin = true;
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = true;
        },
        submit: function () {
            if ($scope.emailLoginForm.$valid) {
                AppStateService.setPath($location.path());
                emailLoginService.login(
                    mode,
                    $scope.emailFormModel.emailname,
                    $scope.emailFormModel.email,
                    $scope.emailFormModel.password,
                    $routeParams.resetCode).
                    then(function (okMsg) {
                        if (mode === 'create' || mode === 'reset') {
                            // Automatically log the user in

                            if (mode === 'reset') {
                                $scope.emailFormModel.message = okMsg;
                            }

                            $timeout(function () {
                                $scope.emailFormActions.login();
                                $scope.emailFormActions.submit();
                            }, 1000);
                        } else if (mode === 'forgotPassword') {
                            $scope.emailFormModel.message = okMsg;
                        }

                    }, function (errMsg) {
                        $scope.emailFormModel.message = errMsg;
                    });

                console.log("submitting " + mode);
            }
        },
        createLogin: function () {
            Analytics.track('user', 'create email login');
            mode = 'create';
            if ($scope.emailFormModel.password === $scope.emailFormModel.passwordConfirm) {
                $scope.emailLoginForm.$setValidity('confirmPassword', true);
            } else {
                $scope.emailLoginForm.$setValidity('confirmPassword', false);
            }

            if ($scope.emailFormModel.email === $scope.emailFormModel.emailConfirm) {
                $scope.emailLoginForm.$setValidity('confirmEmail', true);
            } else {
                $scope.emailLoginForm.$setValidity('confirmEmail', false);
            }
        },
        forgotPassword: function () {
            Analytics.track('user', 'forgot login password');
            mode = 'forgotPassword';
        },
        reset: function () {
            Analytics.track('user', 'reset login password');
            mode = 'reset';
        },
        login: function () {
            Analytics.track('user', 'login attempt with email');
            mode = 'login';
        }
    };

    if (mode === 'reset') {
        $scope.emailFormActions.resetMode();
    }

    // Check if user is logged in already
    if (UserService.loggedIn) {loginComplete()}

    // If they aren't, they'll need to log in
    $scope.facebookLogin = function() {
        Analytics.track('user', 'login attempt with facebook');
        AppStateService.setPath($location.path());
        FacebookService.login();
    };
    $scope.twitterLogin = function() {
        Analytics.track('user', 'login attempt with twitter');
        AppStateService.setPath($location.path());
        console && console.log && console.log("Setting path", AppStateService.path);
        TwitterService.login();
    };
    $scope.googleLogin  = function() {
        Analytics.track('user', 'login attempt with googleplus');
        AppStateService.setPath($location.path());
        GooglePlusService.login();
    };

    $scope.hidePopover = PopoverService.hidePopover;

    function loginComplete() {
        Analytics.track('user', 'login succeeded');
        if (/create/.test($location.path())) {
            PopoverService.hidePopover();
            GiftStartService.createGiftStart();
        } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
            PopoverService.contributeLogin = false;
            PopoverService.nextPopover();
        } else {
            PopoverService.hidePopover();
        }
    }

    TwitterService.getAuthUrl();

    $scope.$on('login-success', loginComplete);

}
