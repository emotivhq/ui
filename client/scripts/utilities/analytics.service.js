// Analytics Service
GiftStarterApp.service("Analytics", ["$window","ABChoices","$rootScope",
    "$location", AnalyticsService]);

function AnalyticsService($window,  ABChoices, $rootScope, $location) {

    this.track = track;

    this.track('client', 'loaded');

    $rootScope.$on('$viewContentLoaded', pathChanged);

    function pathChanged(event) {path($location.path())}

    function path(path) {
        if ($window.ga) {
            $window.ga('send', 'pageview', {page: path});
        }
    }

    function track(service, event, label, value) {
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value);
        }
    }
}
