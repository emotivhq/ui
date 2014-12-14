/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('HeadController', ['$scope','$location',
    HeadController]);

function HeadController($scope,  $location) {
    var headEle = document.querySelector('head');
    var ogurlMeta = document.createElement('meta');
    ogurlMeta.setAttribute('property', 'og:url');
    ogurlMeta.setAttribute('content', $location.absUrl());
    headEle.appendChild(ogurlMeta);

    $scope.ogurl = $location.absUrl();

    $scope.$on('$routeUpdate', function(next, current) {
        setMeta({property: 'og:url', content: $location.absUrl()});
    });

    function setMeta(metaObj) {
        var metaEle = headEle.querySelector('meta[property="' +
            metaObj.property + '"]');
        metaEle.setAttribute('content', metaObj.content);
    }
}
