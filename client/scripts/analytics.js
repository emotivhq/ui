// Analytics Service
GiftStarterApp.service("Analytics", [
            "$window",
    function($window) {

        this.track = function(service, event) {
            $window.ga('send', 'event', service, event);
            $window.mixpanel.track(service + ' - ' + event);
        };

        this.track('app', 'loaded');

    }
]);