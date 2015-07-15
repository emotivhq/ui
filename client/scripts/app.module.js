/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

var GiftStarterApp = angular.module('GiftStarterApp',
    ['ngRoute', 'ezfb', 'angularPayments', 'ngCookies',  'ngTouch',
        'ngSanitize', 'ngAB', 'ngResource', 'ui.date']);

angular.module('GiftStarterApp').service('AppStateService', [
            '$location','$window','$rootScope',
    function($location,  $window,  $rootScope) {

        var self = this;
        var state = {};

        this.set = set;
        this.get = get;
        this.remove = remove;

        function set(key, value) {state[key] = value}
        function get(key) {return state[key]}
        function remove(key) {delete state[key]}

        this.base64State = base64State;
        this.getOauthRedirectUrl = getOauthRedirectUrl;
        this.getOauthRedirectUrlForSharing = getOauthRedirectUrlForSharing;
        this.overlayState = overlayState;
        this.thanksState = thanksState;

        this.path = $location.path();

        // Remove OAuth params
        $location.search('code', null);
        $location.search('oauth_verifier', null);
        $location.search('oauth_token', null);
        $location.search('authuser', null);
        $location.search('num_sessions', null);
        $location.search('session_state', null);
        $location.search('prompt', null);

        // Remove FB OAuth fragment
        if ($location.hash() == '_=_') {
            $location.hash('');
        }

        function getOauthRedirectUrl() {
            return $window.location.protocol + '//' + $window.location.host
                + '/?state=' + self.base64State();
        }

        function getOauthRedirectUrlForSharing() {
            return $window.location.protocol + '//' + $window.location.host
                + '/?state=' + self.base64State(true);
        }

        // Returns encoded app state for persisting across OAuth transitions
        function base64State(isSharingLogin) {
            state.path = window.location.pathname; //self.path;
            state.app_url = $window.location.protocol + '//' + $window.location.host + '/';
            if(isSharingLogin) {state.is_sharing_login = 1;}
            console && console.log && console.log('encoding state', state);
            return btoa(JSON.stringify(state));
        }

        this.setPath = function(path) {self.path = path};

        function overlayState(selectedParts) {
            set('selectedParts', selectedParts);
        }

        function thanksState(thanksData) {
            set('thanks', thanksData);
        }

        if ($location.search().state) {
            state = JSON.parse($window.atob($location.search()['state']));
            console && console.log && console.log('parsed state', state);
            $location.search('state', null);
            if (state.title_url) {
                $location.path('/giftstart/' + state.title_url);
            } else if (state.path) {
                $location.path(state.path);
            }
            $rootScope.$broadcast('state-parsed');
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
            set('referrer', JSON.parse(atob($location.search().re)));
            $location.search('re', null);
        }

        //delete API key
        if ($location.search().public_key) {
            set('api_key', $location.search().public_key);
            $location.search('public_key', null);
        }


        if ($location.search().source && $location.search().title &&
            $location.search().product_url) {
            set('referrer', {
                type: 'partner',
                channel: $location.search().source.replace("shopify/", ""),
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            });
            this.giftstartReferralData = $location.search();
        }

    }
]);

