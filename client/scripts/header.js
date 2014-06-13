/**
 * Created by stuart on 6/9/14.
 */


//GiftStarterApp.service('HeaderService', [
//            '$rootScope','$route',
//    function($rootScope,  $route) {
//
//        var headerTemplates = {
//            '/': '/templates/angular/headerHomePage.html',
//            '/*': '/templates/angular/headerDefault.html'
//        };
//        this.headerTemplate = headerTemplates['/'];
//
//        var self = this;
//
//        $rootScope.$on('$routeChangeStart', function(event, next) {
//            if (next in self.headerTemplates) {
//                self.headerTemplate = self.headerTemplates[next];
//            } else {
//                self.headerTemplate = self.headerTemplates['/*'];
//            }
//            $rootScope.$broadcast('header-changed');
//        });
//    }
//]);

GiftStarterApp.controller('HeaderController', [
            '$scope','$location',
    function($scope,  $location) {
        $scope.thisRoute = $location.path().toString();

        function routeChangeListener(event, next) {
            $scope.thisRoute = next.$$route.originalPath;
        }
        $scope.$on('$routeChangeStart', routeChangeListener);
    }
]);

