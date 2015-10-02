/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('whatIsItController', [
    '$scope','$location','ToastService','$http','Analytics',
    '$window', WhatIsItController]);

function WhatIsItController($scope,  $location,  ToastService,  $http,  Analytics,
         $window) {
    $scope.hideVideo = Boolean($location.search().hv);
    $scope.videoWidth = '100%';

    $scope.remindMe = function() {
        $http({
            method: 'PUT', url: '/users/subscribe.json', data: {
                email: $scope.email,
                double_opt_in: false
            }
        });
        Analytics.track('client', 'remind me subscribe');
        ToastService.setToast("Awesome!  We'll keep you posted!", 7000);
    };

    // Load YouTube player asynch
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}


// Create youtube iframe on load
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'tA2gcLIJYBU',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        ga('send', 'event', 'client', 'intro-video', 'play');
    } else if (event.data == YT.PlayerState.PAUSED) {
        ga('send', 'event', 'client', 'intro-video', 'pause');
    } else if (event.data == YT.PlayerState.ENDED) {
        ga('send', 'event', 'client', 'intro-video', 'complete');
    }
}
function stopVideo() {
    player.stopVideo();
}