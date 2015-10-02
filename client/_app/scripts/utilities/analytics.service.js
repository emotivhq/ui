// Analytics Service
GiftStarterApp.service('Analytics', ['$window','ABChoices','$rootScope',
    '$location', '$analytics', 
	AnalyticsService]);

function AnalyticsService($window,  ABChoices, $rootScope, $location, $analytics) {

    this.track = track; //google analytics
	this.userid = userid; //google analytics
	//this.pageTrack = pageTrack; //angulartics
	this.eventTrack = eventTrack; //angulartics
	this.identify = identify; //angulartics

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
		$analytics.pageTrack(path);
    }

    function track(service, event, label, value) {
        //console && console.log && console.log('AnalyticsService.track: '+service+' '+event+' '+ABChoices.getString()+' '+value);
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value, {'nonInteraction': 1});
        }
    }
	
    function userid(uid) {
		//https://support.google.com/analytics/answer/3123662
		//https://support.google.com/analytics/bin/answer.py?hl=en_US&answer=3123666&vid=null#SetUpUserID
		//https://www.google.com/analytics/web/?hl=en#management/Settings/a51616127w100122713p104027910/%3Fm.page%3DTrackingUserId/
		if ($window.ga) {
			$window.ga('set', '&uid', uid); // Set the user ID using signed-in user_id. 
		}
    }
	
	function eventTrack(event, properties, options, callback) {
		//https://segment.com/docs/libraries/analytics.js/#track
		//analytics.track(event, [properties], [options], [callback]);
		//event, properties, options, callback
		$analytics.eventTrack(event, properties, options, callback); 
    }
	
    function identify(event, properties, options, callback) {
		//https://segment.com/docs/libraries/analytics.js/#identify
		//analytics.identify([userId], [traits], [options], [callback]);
		//event, properties, options, callback
		  // analytics.identify('1e810c197e', {
  		    // name: 'Bill Lumbergh',
  		    // email: 'bill@initech.com',
  		    // newsletter: true,
		  // });
		//$analytics.identify(event, properties, options, callback); 
		$analytics.setUsername(event);
		$analytics.setUserProperties(properties);
    }

}
