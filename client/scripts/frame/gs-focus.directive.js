/**
 * Created by Stuart on 10/21/14.
 */
GiftStarterApp.directive('gsFocus', gsFocus);

function gsFocus($timeout, $parse) {
    return {
        //scope: true
        link: function(scope, element, attrs) {
            var model = $parse(attrs.gsFocus);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // on blur event:
            element.bind('blur', function() {
                console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}