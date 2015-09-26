// Analytics Service
GiftStarterApp.service("Analytics", ["$window","ABChoices","$rootScope",
    "$location", "gsAngulartics", AnalyticsService]);

function AnalyticsService($window,  ABChoices, $rootScope, $location, gsAngulartics) {

    this.track = track; //google analytics
	this.pageTrack = gsAngulartics.pageTrack; //angulartics
	this.eventTrack = gsAngulartics.eventTrack; //angulartics

    this.track('client', 'loaded');

    $rootScope.$on('$viewContentLoaded', pathChanged);

    function pathChanged(event) {path($location.path())}

    function path(path) {
        //console && console.log && console.log('AnalyticsService.path: '+path);
        if ($window.ga) {
            $window.ga('send', 'pageview', {page: path});
        }
		// https://segment.com/docs/libraries/analytics.js/#page
		// analytics.page([category], [name], [properties], [options], [callback]);
		// path, but example:
		  // { 
			// name: 'string',
  			// path: 'string',
  			// referrer: 'string',
  			// search: 'string',
  			// title: 'string',
  			// url: 'string' 
  		  // }
		gsAngulartics.pageTrack(path);
    }

    function track(service, event, label, value) {
        //console && console.log && console.log('AnalyticsService.track: '+service+' '+event+' '+ABChoices.getString()+' '+value);
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value, {'nonInteraction': 1});
        }
    }
    function eventTrack(event, properties, options, callback) {
		//https://segment.com/docs/libraries/analytics.js/#track
		//gsAngulartics.track(event, [properties], [options], [callback]);
		//event, properties, options, callback
		gsAngulartics.eventTrack(event, properties, options, callback); 
    }
}
