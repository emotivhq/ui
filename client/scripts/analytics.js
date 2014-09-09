// Analytics Service
GiftStarterApp.service("Analytics", [
            "$window",
    function($window) {

        this.track = function(service, event, label, value) {
            if ($window.ga) {
                $window.ga('send', 'event', service, event, label, value);
            }
            if ($window.mixpanel) {
                $window.mixpanel.track(service + ' - ' + event + ' - ' + label
                    + ' - ' + value);
            }
        };

        this.track('client', 'loaded');

    }
]);