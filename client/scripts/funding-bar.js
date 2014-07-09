/**
 * Created by stuart on 7/2/14.
 */



GiftStarterApp.directive('gsFundingBar', [
    function() {
        function link(scope, element, attrs) {

        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/funding-bar.html'
        };
    }
]);

GiftStarterApp.directive('ProgressBarDirective', ['$compile',
    function($compile) {
        function link(scope, element, attrs) {
            var bgEle = angular.element(angular.element(element.children()[0]).children()[0]);
            var barEle = angular.element(angular.element(element.children()[0]).children()[1]);

            var barHeight = attrs['barHeight'];
            var barHeightAmount = /[0-9.]+/.exec(barHeight);
            var barHeightUnit = /[a-z]+/.exec(barHeight);
            var barHeightRatio =
            barEle.css('width', barHeight);

            scope.progressBar = function () {
                var self = this;
                this.total = 1;
                this.percent = 0;
                this.listenFor = null;

                this.updateBar = function() {
                    self.percent = 100 * self.evalBarProgress() / self.total;
                    barEle.css('width', self.percent + '%');
                };

                this.evalBarProgress = function() {return 0};
                this.setProgressEvalFunction = function(fn) {
                    self.evalBarProgress = fn;
                };

                this.setListenFor = function (listenFor) {
                    self.listenFor = listenFor;
                    scope.$on(self.listenFor, self.updateBar);
                };

                this.setBarTotal = function (total) {
                    self.total = total;
                };

                return self;
            }();
        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/funding-bar.html'
        };
    }
]);
