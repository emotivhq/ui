/**
 * Created by Stuart on 11/2/14.
 */

angular.module('GiftStarterApp').directive('gsScrollPlay',[
    '$window', gsScrollPlay]);

function gsScrollPlay($window) {
    var scope, element, padding, attributes, loaded = false;

    function link($scope, elm, attrs) {
        window.elm = elm;
        scope = $scope;
        element = elm[0];
        attributes = attrs;
        padding = attrs.gsPadding;
        angular.element($window).bind("scroll", onScroll);
    }

    function onScroll() {
        var pxPastTop = $window.innerHeight -
            element.getBoundingClientRect().top;
        if (!loaded) {
            if (pxPastTop > padding) {
                loaded = true;
                var parent = element.parentNode;
                attributes.$set('src', '/assets/howToUseGS.gif');
                element.remove();
                parent.appendChild(element.cloneNode(false));
            }
        }
    }

    return {
        restrict: 'A',
        link: link
    }
}

