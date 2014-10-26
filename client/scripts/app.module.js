/**
 * Created by stuart on 4/7/14.
 */


var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch',
        'ngSanitize', 'ngAB', 'ngResource']);

console.log("ver54");


GiftStarterApp.service('AppStateService', [
            '$location','$window','PopoverService',
    function($location,  $window,  PopoverService) {

        var self = this;
        var state = {};

        this.set = set;
        this.get = get;
        this.remove = remove;

        function set(key, value) {state[key] = value}
        function get(key) {return state[key]}
        function remove(key) {delete state[key]}

        this.getOauthRedirectUrl = function() {
//            $location.search('state', );
            var url = $window.location.protocol + '//' + $window.location.host
                + '/?state=' + self.base64State();
            console.log(url);
            return url;
//            $location.search('state', null);
//            return url;
        };

        this.path = $location.path();

        // Returns encoded app state for persisting across OAuth transitions
        this.base64State = function() {
//            var state = {};
//            if ($location.path() == '/giftstart') {state.gsid = $location.search()['gs-id']}
//            if (/\/giftstart\/[a-zA-Z0-9]/.test($location.path())) {state.title_url = $location.path().split('/')[$location.path().split('/').length - 1]}
//            if (self.selectedParts) {state.selectedParts = self.selectedParts}
//            if (self.contributing != null) {state.contributing = self.contributing}
//            if (self.popover) {
//                state.popover = self.popover;
//                PopoverService.setPopover(self.popover);
//            }
//            if (self.thanks) {state.thanks = self.thanks}
//            if (self.createSession != null) {state.createSession = self.createSession}

            state.path = self.path;
            state.app_url = $window.location.protocol + '//' +
                $window.location.host + '/';
            return btoa(JSON.stringify(state));
        };

        this.setPath = function(path) {self.path = path};

        this.overlayState = function(selectedParts) {
            set('selectedParts', selectedParts);
        };

        this.thanksState = function(thanksData) {
            set('thanks', thanksData);
        };


        if ($location.search().state) {
            this.state = JSON.parse($window.atob($location.search()['state']));
            $location.search('state', null);
            if (this.state.title_url) {
                $location.path('/giftstart/' + this.state.title_url);
            }
            if (this.state.path) {
                $location.path(this.state.path);
            }
        }

        if ($location.search().code && $location.search().session_state && $location.search().authuser) {
            // Handle non-FB oauth
            // Make object for authResponse
            self.gplusAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($window.location.search.substr(1).split('&'));
            $location.search('code', null);
            $location.search('session_state', null);
            $location.search('authuser', null);
            $location.search('num_sessions', null);
            $location.search('prompt', null);
        } else if (/access_token/.test($location.hash())) {
            // Handle FB oauth
            self.fbAuthResponse = (function(a) {
                if (a == "") return {};
                var b = {};
                for (var i = 0; i < a.length; ++i)
                {
                    var p=a[i].split('=');
                    if (p.length != 2) continue;
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
                return b;
            })($location.hash().split('&'));
            $location.hash('');
        }

        // Delete tracking url as soon as it is seen
        if ($location.search().re) {
            self.referrer = JSON.parse(atob($location.search().re));
            $location.search('re', null);
        }

        if ($location.search().source && $location.search().title &&
            $location.search().product_url) {
            this.referrer = {
                type: 'partner',
                channel: $location.search().source.replace("shopify/", ""),
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            };
            this.giftstartReferralData = $location.search();
        }
    }
]);

