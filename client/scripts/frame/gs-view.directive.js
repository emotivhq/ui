/**
 * Created by Stuart on 10/19/14.
 */

GiftStarterApp.directive('gsView', ['$timeout', gsView]);

function gsView($timeout) {
    function link(scope, element, attrs) {
        scope.$on('$viewContentLoaded', pathChanged);
        function pathChanged() {$timeout(scrollTop, 0)}
        function scrollTop() {window.scrollTo(0, element[0].offsetTop - 9999)}
    }

    return {link: link}
}