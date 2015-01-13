/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var EmailLoginService = function ($http, $q) {
        var urls = {
                create: '/login/email/create',
                forgotPassword: '/login/email/requestreset',
                login: '/login/email/login',
                reset: '/login/email/reset'
            },
            uuid = '';

        var login = function (mode, email, password, code) {
            var deferred = $q.defer();

            uuid = email;

            $http.post(
                urls[mode], {
                    email: email,
                    password: password,
                    code: code
                }).
                success(function (response) {
                    //alert((JSON.stringify(response, null, 4)));
                    var resObj = JSON.parse(response);
                    if (resObj['ok']) {
                        if (mode === 'login') {
                            $rootScope.$broadcast('email-login-success');
                        }
                        deferred.resolve();
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
        this.uuid = uuid;
        this.has_pitched_in = false;
    };

    app.service('emailLoginService', ['$http', '$q', EmailLoginService])
}(angular.module('GiftStarterApp')));