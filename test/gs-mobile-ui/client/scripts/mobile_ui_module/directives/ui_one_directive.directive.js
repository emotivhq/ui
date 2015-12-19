'use strict';
 /*eslint consistent-this:[2,  "uiOneDirectiveCtrl"] */
var directivename = 'uiOneDirective';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var uiOneDirectiveCtrl = this;
        uiOneDirectiveCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'uiOneDirectiveCtrl',
            bindToController: true,
            template: require('./ui_one_directive.directive.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
