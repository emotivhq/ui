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
        scope.submit = submit;
        scope.editing = false;
        scope.src = attrs.src;
    }

    function startEdit() {
        $scope.editing = true;
        Analytics.track('user', 'profile image edit start');
    }

    function cancel() {
        $scope.editing = false;
        Analytics.track('user', 'profile image edit cancel');

    }

    function submit() {
        Analytics.track('user', 'profile image submit');

    }

    return {
        link: link,
        template: '<div><img ng-src="{{src}}"/><button class="edit">Edit</button></div>',
        restrict: 'E'
    }
}
