/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {
    if(UserService.loggedIn && !UserService.isUserEmailLogin()) {
        UserService.logout();
        $window.location.reload(); //$timeout(UserService.registerLogout,3000);
    }
};

app.controller('PartnerportalController', ['$scope', '$rootScope', '$window', 'UserService', '$timeout', '$location', '$http', 'Analytics', PartnerportalController]);

}(angular.module('GiftStarterApp')));

