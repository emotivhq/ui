/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var gsUserEdit = function ($http, UserService, Analytics) {
    function link(scope, elm, attrs, userProfileform) {
        scope.canEdit = true;
        scope.editUserFields = function () {
            if (!scope.userinfo && scope.blocked) {
                scope.copyUser = angular.copy(scope.user);
                scope.fieldisable = false;
                scope.canEdit = false;
            }
            else if (scope.userinfo && scope.fieldisable) {
                scope.copyUserInfo = angular.copy(scope.user);
                scope.canEdit = false;
                scope.blocked = false;
            }
        }

        scope.cancelEdit = function () {
            scope.canEdit = true;
            if (!scope.userinfo) {
                scope.fieldisable = true;
                scope.user.name = angular.copy(scope.copyUser.name);
                scope.user.email = angular.copy(scope.copyUser.email);
                scope.user.shipping_address = angular.copy(scope.copyUser.shipping_address);
                scope.user.shipping_city = angular.copy(scope.copyUser.shipping_city);
                scope.user.shipping_state = angular.copy(scope.copyUser.shipping_state);
            } else if (scope.userinfo && scope.fieldisable) {
                scope.user.name = angular.copy(scope.copyUserInfo.name);
                scope.user.link_facebook = angular.copy(scope.copyUserInfo.link_facebook);
                scope.user.link_twitter = angular.copy(scope.copyUserInfo.link_twitter);
                scope.user.link_linkedin = angular.copy(scope.copyUserInfo.link_linkedin);
                scope.user.link_googleplus = angular.copy(scope.copyUserInfo.link_googleplus);
                scope.user.link_website = angular.copy(scope.copyUserInfo.link_website);
                scope.user.birth_day = angular.copy(scope.copyUserInfo.birth_day);
                scope.blocked = true;
            }
        }

        scope.saveInput = function () {
            scope.loading = true;
            setTimeout(function() {
            if (userProfileform.$valid) {
                $http.post('/users', {
                    'uid': UserService.uid,
                    'action': 'update-profile',
                    name: scope.user.name,
                    email: scope.user.email,
                    link_facebook: scope.user.link_facebook,
                    link_twitter: scope.user.link_twitter,
                    link_linkedin: scope.user.link_linkedin,
                    link_googleplus: scope.user.link_googleplus,
                    link_website: scope.user.link_website,
                    phone: scope.user.phone,
                    shipping_address: scope.user.shipping_address,
                    birth_day: scope.user.birth_day,
                    birth_month: scope.user.birth_month,
                    shipping_city: scope.user.shipping_city,
                    shipping_state: scope.user.shipping_state,
                    shipping_zip: scope.user.shipping_zip
                })
                    .then(function (res) {
                        scope.loading = false;
                    }, function (errorRes) {
                        alert("Error. Please try again.");
                        userProfileform.$invalid = true;
                    });
                scope.canEdit = true;
                scope.fieldisable = true;
                scope.blocked = true;
            }
            else {
                alert("Please fill fields correctly");
                scope.loading = false;
                scope.canEdit = false;
                scope.fieldisable = false;
            }}, 100);
        }

    }

    return {
        scope: {
            fieldisable: "=",
            user: "=",
            userinfo: "=",
            blocked: "=",
            loading: "="
        },
        require: '^form',
        link: link,
        templateUrl: '/scripts/user/user_profile_edit.ng.html',
        restrict: 'E'
    }

}

    app.directive('gsUserEdit', ['$http', 'UserService', 'Analytics', gsUserEdit]);
}(angular.module('GiftStarterApp')));