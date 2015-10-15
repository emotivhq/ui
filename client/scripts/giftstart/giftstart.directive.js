/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.directive('gsCopyUrl', ['$window', gsCopyUrl]);

function gsCopyUrl($window) {
    function link(scope, element, attrs) {
        element.on('click', function () {
            if(!$window.getSelection().toString()) {
                // Required for mobile Safari
                this.setSelectionRange(0, this.value.length)
            }
        });
    }
    return {
        restrict: 'A',
        link: link
    };
}