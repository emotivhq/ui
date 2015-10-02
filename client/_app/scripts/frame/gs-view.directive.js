/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
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