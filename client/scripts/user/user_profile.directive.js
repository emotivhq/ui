/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsUserEdit', ['$http', 'UserService', 'Analytics', gsUserEdit]);

function gsUserEdit($http, UserService, Analytics) {
    function link(scope, elm, attrs, userProfileform) {
        scope.canEdit = true;

        scope.editUserFields = function () {
            if(!scope.userinfo) {
                scope.copyUser = angular.copy(scope.user);
                scope.fieldisable = false;

            }
            scope.canEdit = false;
        }

        scope.cancelEdit = function () {
            scope.canEdit = true;
            if(!scope.userinfo) {
                scope.fieldisable = true;
                scope.user = angular.copy(scope.copyUser);
            }
        }

        scope.saveInput = function () {
            if(userProfileform.$valid) {
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
                    .success(function (res) {
                        console.log(res);
                    })
                    .error(function (res) {
                        console.log(res);
                    });
                scope.canEdit = true;
                scope.fieldisable = true;
            }
            else {
                alert("Please fill fields correctly");
                scope.canEdit = false;
                scope.fieldisable = false;
            }
        }
    }

    return {
        scope: {
            fieldisable: "=",
            user: "=",
            userinfo: "=",
        },
        require: '^form',
        link: link,
        templateUrl: '/scripts/user/user_profile_edit.ng.html',
        restrict: 'E'
    }
}