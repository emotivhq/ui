/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var EmailLoginService = function ($http, $q, $rootScope) {
        var urls = {
                create: '/login/email/create',
                forgotPassword: '/login/email/requestreset',
                login: '/login/email/login',
                reset: '/login/email/reset'
            },
            uid = '';

        var login = function (mode, email, password, resetCode) {
            var deferred = $q.defer();

            uid = 'e:' + email;

            $http.post(
                urls[mode], {
                    email: email,
                    password: password,
                    code: resetCode
                }).
                success(function (response) {
                    var resObj = response;
                    if (resObj['ok']) {
                        if (mode === 'login') {
                            $rootScope.$broadcast('email-login-success');
                        }
                        deferred.resolve(resObj['ok']);
                    } else {
                        deferred.reject(resObj['error']);
                    }
                }).
                error(function () {
                    deferred.reject('We are having technical problems.  Please try again later.');
                });

            return deferred.promise;
        };

        var logout = function () {
            $rootScope.$broadcast('email-logout-success');
        };

        this.login = login;
        this.logout = logout;
        this.uid = uid;
        this.has_pitched_in = false;
    };

    app.service('emailLoginService', ['$http', '$q', '$rootScope', EmailLoginService])
}(angular.module('GiftStarterApp')));