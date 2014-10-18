// Analytics Service
GiftStarterApp.service("Analytics", ["$window","ABChoices", AnalyticsService]);

function AnalyticsService($window,  ABChoices) {
    this.track = function(service, event, label, value) {
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value);
        }
    };

    this.track('client', 'loaded');
}
