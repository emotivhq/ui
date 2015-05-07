/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPrintUrl', ['$location', '$http', gsPrintUrl]);


function gsPrintUrl($location, $http) {
    function link(scope, element, attrs) {
        var currentUrl = $location.absUrl().slice(0, -5);
        $http.get('http://api.bitly.com/v3/shorten?callback=',
            { params: {
                "format": "json",
                "apiKey": "R_85bf9d10211f4423b5c3be4a336ad77d",
                "login": "giftstarter",
                "longUrl": currentUrl
            }})
            .success(function(response) {
              element.text(response.data.url);
              element.wrap("<a href=" + response.data.url + "></a>");
            }
        );
    }

    return {
        link: link,
        restrict: 'E'
    };
}