/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('LoginPopoverController', ['$scope', '$http', '$cookieStore', 'UserService',
    'PopoverService','GiftStartService','TwitterService','FacebookService',
    '$location','GooglePlusService','Analytics','AppStateService', 'emailLoginService',
    LoginPopoverController]);


function LoginPopoverController($scope, $http, $cookieStore, UserService,  PopoverService,
                                GiftStartService,  TwitterService,
                                FacebookService,  $location, GooglePlusService,
                                Analytics,  AppStateService, emailLoginService) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.emailFormModel = {
        isLogin: true,
        isLoginCreate: false,
        isForgotPassword: false,
        isEmailLogin: false,
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        message: ''
    };

    var mode = 'login',
        loginUrl = '';

    $scope.emailFormActions = {
        createLoginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = true;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            event && event.preventDefault();
        },
        forgotPasswordMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = true;
            $scope.emailFormModel.isLogin = false;
            event && event.preventDefault();
        },
        loginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = true;
            event && event.preventDefault();
        },
        submit: function () {
            if ($scope.emailLoginForm.$valid) {
                AppStateService.setPath($location.path());
                emailLoginService.login(
                    mode,
                    $scope.emailFormModel.email,
                    $scope.emailFormModel.password,
                    '').
                    then(function () {
                        if (mode === 'create') {
                            // Switch to login mode
                            $scope.emailFormModel.email = '';
                            $scope.emailFormModel.password = '';
                            $scope.emailFormActions.loginMode();
                        } else if (mode === 'forgotPassword') {
                            $scope.emailFormModel.message = 'An instruction has been sent to your email address.';
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
        reser: function () {
            Analytics.track('user', 'reset login password');
            mode = 'reset';
        },
        login: function () {
            Analytics.track('user', 'login attempt with email');
            mode = 'login';
        }
    };

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
