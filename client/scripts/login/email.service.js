/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var EmailLoginService = function ($http, $q, $rootScope) {

        var self = this;

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var urls = {
                create: '/login/email/create',
                forgotPassword: '/login/email/requestreset',
                login: '/login/email/login',
                reset: '/login/email/reset'
            },
            uid = '';

        var login = function (mode, email, password, resetCode) {
            var deferred = $q.defer();

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
                            var data = resObj['ok'];
                            self.uid = data['uid'];
                            self.usr_img = data['img_url'];
                            self.name = data['name'];
                            self.token = data['token'];
                            self.subscribed = data['on_mailing_list'];
                            self.has_pitched_in = data['has_pitched_in'];
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
    };

    app.service('emailLoginService', ['$http', '$q', '$rootScope', EmailLoginService])
}(angular.module('GiftStarterApp')));