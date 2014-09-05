// Analytics Service
GiftStarterApp.service("Analytics", [
            "$window",
    function($window) {

        this.track = function(service, event, label, value) {
            $window.ga('send', 'event', service, event, label, value);
            $window.mixpanel.track(service + ' - ' + event + ' - ' + label
                + ' - ' + value);
        };

        this.track('client', 'loaded');

    }
]);