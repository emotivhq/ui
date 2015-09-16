/* 
 * Angulartics Module 
 * Load core, Segment, Inspectlet, and GTM submodules. 
 * Remove submodules as necessary.
 *
*/

var gsAngulartics = angular.module('gsAngulartics', [
	'angulartics',
	'angulartics.segment',
	'angulartics.inspectlet',
	'angulartics.google.tagmanager'
])
.config(function ($analyticsProvider) {
            $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
            $analyticsProvider.withAutoBase(true);  /* Records full path */
			$analyticsProvider.withBase(true); /* Records full path - https://github.com/angulartics/angulartics#full-path-tracking-for-pages-without-a-router */
});