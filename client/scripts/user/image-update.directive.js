/**
 * Created by Stuart on 11/3/14.
 */

angular.module('GiftStarterApp').directive('gsImageUpdate', ['$http',
    'Analytics', gsImageUpdate]);

function gsImageUpdate($http, Analytics) {
    var $scope;

    function link(scope, elm, attrs) {
        $scope = scope;
        scope.startEdit = startEdit;
        scope.cancel = cancel;
        scope.upload = upload;
        scope.editing = false;
    }

    function startEdit() {
        $scope.editing = true;
        Analytics.track('user', 'profile image edit start');
    }

    function cancel() {
        $scope.editing = false;
        Analytics.track('user', 'profile image edit cancel');

    }

    function upload() {
        Analytics.track('user', 'profile image submit');

    }

    return {
        link: link,
        template: '<div><img src=""/><button class="edit"></button></div>',
        restrict: 'E'
    }
}
