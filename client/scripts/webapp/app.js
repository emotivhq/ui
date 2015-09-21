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
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

var ngAB = angular.module('ngAB', []).value('spec', {});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.service('ABChoices', ['spec', ABChoices]);

function ABChoices(spec) {

    this.get = function() {
        return spec.map(function(test){
            return [test.name, test.cases[0].name];
        });
    };

    this.getString = function() {
        return this.get().map(function(choice) {
            return choice.join("=");
        }).join("&");
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.factory('ABInterceptor', ['spec','ABChoices', ngABInterceptor]);

function ngABInterceptor(spec,  ABChoices) {
    // Construct file modification chain spec in form:
    // {'filename': [{change}, {change}, ...], ...}
    var path_mods = spec.reduce(function(pmods, test) {
        // For test in spec, chain changes
        function add_changes(change) {
            pmods[change.file] = (pmods[change.file] || [])
                .concat([change]);
        }
        (test['cases'][0]['changes'] || []).map(add_changes);
        return pmods;
    }, {});

    function elementReplace(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        $(container).find(change.findEle)
            .replaceWith(change.replace);
        return container.innerHTML;
    }

    function elementSwitch(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        var toReplace = $(container).find(change.findEle);
        var children = toReplace.children().detach();
        toReplace.replaceWith(change.switchEle).append(children);
        return container.innerHTML;
    }

    function elementRemove(data, change) {
        var container = document.createElement('replace-container');
        container.innerHTML = data;
        $(container).find(change.removeEle).replaceWith('');
        return container.innerHTML;
    }

    return {
        response: function(response) {
            var mods = path_mods[response.config.url];
            if (!mods) {
                // No test spec for this path
                return response;
            }

            function applyChange(data, change) {
                data += change.append || '';
                if (change.css) {
                    data += '<style>' + change.css + '</style>'
                } else if (change.find && change.replace) {
                    data = data.replace(new RegExp(change.find,
                        change.flags), change.replace)
                } else if (change.findEle && change.replace) {
                    data = elementReplace(data, change);
                } else if (change.findEle && change.switchEle) {
                    data = elementSwitch(data, change);
                } else if (change.removeEle) {
                    data = elementRemove(data, change);
                } else if (change.replaceAll) {
                    data = change.replaceAll;
                }
                return data;
            }

            response.data = mods.reduce(applyChange, response.data);
            return response;
        }
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.config(['$httpProvider', ngABConfig]);

function ngABConfig($httpProvider) {
    $httpProvider.interceptors.push('ABInterceptor');
}
/*!
 * viewport-units-buggyfill v0.5.1
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window, navigator, location, XMLHttpRequest, XDomainRequest*/

  var initialized = false;
  var options;
  var userAgent = window.navigator.userAgent;
  var viewportUnitExpression = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var dimensions;
  var declarations;
  var styleNode;
  var isOldInternetExplorer = false;
  var isOperaMini = userAgent.indexOf('Opera Mini') > -1;

  var isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
    // Regexp for iOS-version tested against the following userAgent strings:
    // Example WebView UserAgents:
    // * iOS Chrome on iOS8: "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/39.0.2171.50 Mobile/12B410 Safari/600.1.4"
    // * iOS Facebook on iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201 [FBAN/FBIOS;FBAV/12.1.0.24.20; FBBV/3214247; FBDV/iPhone6,1;FBMD/iPhone; FBSN/iPhone OS;FBSV/7.1.1; FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/5]"
    // Example Safari UserAgents:
    // * Safari iOS8: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"
    // * Safari iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53"
    var iOSversion = userAgent.match(/OS (\d)/);
    // viewport units work fine in mobile Safari and webView on iOS 8+
    return iOSversion && iOSversion.length>1 && parseInt(iOSversion[1]) < 8;
  })();

  var isBadStockAndroid = (function() {
    // Android stock browser test derived from
    // http://stackoverflow.com/questions/24926221/distinguish-android-chrome-from-stock-browser-stock-browsers-user-agent-contai
    var isAndroid = userAgent.indexOf(' Android ') > -1;
    if (!isAndroid) {
      return false;
    }

    var isStockAndroid = userAgent.indexOf('Version/') > -1;
    if (!isStockAndroid) {
      return false;
    }

    var versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4;
  })();

  // Do not remove the following comment!
  // It is a conditional comment used to
  // identify old Internet Explorer versions

  /*@cc_on

  @if (@_jscript_version <= 10)
    isOldInternetExplorer = true;
  @end

  @*/

  // added check for IE11, since it *still* doesn't understand vmax!!!
  if (!isOldInternetExplorer) {
    isOldInternetExplorer = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callback = function() {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    };
  }

  // from http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function initialize(initOptions) {
    if (initialized) {
      return;
    }

    if (initOptions === true) {
      initOptions = {
        force: true
      };
    }

    options = initOptions || {};
    options.isMobileSafari = isMobileSafari;
    options.isBadStockAndroid = isBadStockAndroid;

    if (!options.force && !isMobileSafari && !isOldInternetExplorer && !isBadStockAndroid && !isOperaMini && (!options.hacks || !options.hacks.required(options))) {
      // this buggyfill only applies to mobile safari, IE9-10 and the Stock Android Browser.
      return;
    }

    options.hacks && options.hacks.initialize(options);

    initialized = true;
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    // Issue #6: Cross Origin Stylesheets are not accessible through CSSOM,
    // therefore download and inject them as <style> to circumvent SOP.
    importCrossOriginLinks(function() {
      var _refresh = debounce(refresh, options.refreshDebounceWait || 100);
      // doing a full refresh rather than updateStyles because an orientationchange
      // could activate different stylesheets
      window.addEventListener('orientationchange', _refresh, true);
      // orientationchange might have happened while in a different window
      window.addEventListener('pageshow', _refresh, true);

      if (options.force || isOldInternetExplorer || inIframe()) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }

      options.hacks && options.hacks.initializeEvents(options, refresh, _refresh);

      refresh();
    });
  }

  function updateStyles() {
    styleNode.textContent = getReplacedViewportUnits();
    // move to the end in case inline <style>s were added dynamically
    styleNode.parentNode.appendChild(styleNode);
  }

  function refresh() {
    if (!initialized) {
      return;
    }

    findProperties();

    // iOS Safari will report window.innerWidth and .innerHeight as 0 unless a timeout is used here.
    // TODO: figure out WHY innerWidth === 0
    setTimeout(function() {
      updateStyles();
    }, 1);
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id === 'patched-viewport' || !sheet.cssRules || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip entire sheet because no rules are present, it's supposed to be ignored or it's the target-element of the buggyfill
        return;
      }

      if (sheet.media && sheet.media.mediaText && window.matchMedia && !window.matchMedia(sheet.media.mediaText).matches) {
        // skip entire sheet because media attribute doesn't match
        return;
      }

      forEach.call(sheet.cssRules, findDeclarations);
    });

    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value;

      // there may be a case where accessing cssText throws an error.
      // I could not reproduce this issue, but the worst that can happen
      // this way is an animation not running properly.
      // not awesome, but probably better than a script error
      // see https://github.com/rodneyrehm/viewport-units-buggyfill/issues/21
      try {
        value = rule.cssText;
      } catch(e) {
        return;
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        // KeyframesRule does not have a CSS-PropertyName
        declarations.push([rule, null, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, null, value);
      }

      return;
    }

    if (!rule.style) {
      if (!rule.cssRules) {
        return;
      }

      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      // preserve those !important rules
      if (rule.style.getPropertyPriority(name)) {
        value += ' !important';
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, name, value);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();

    var css = [];
    var buffer = [];
    var open;
    var close;

    declarations.forEach(function(item) {
      var _item = overwriteDeclaration.apply(null, item);
      var _open = _item.selector.length ? (_item.selector.join(' {\n') + ' {\n') : '';
      var _close = new Array(_item.selector.length + 1).join('\n}');

      if (!_open || _open !== open) {
        if (buffer.length) {
          css.push(open + buffer.join('\n') + close);
          buffer.length = 0;
        }

        if (_open) {
          open = _open;
          close = _close;
          buffer.push(_item.content);
        } else {
          css.push(_item.content);
          open = null;
          close = null;
        }

        return;
      }

      if (_open && !open) {
        open = _open;
        close = _close;
      }

      buffer.push(_item.content);
    });

    if (buffer.length) {
      css.push(open + buffer.join('\n') + close);
    }

    // Opera Mini messes up on the content hack (it replaces the DOM node's innerHTML with the value).
    // This fixes it. We test for Opera Mini only since it is the most expensive CSS selector
    // see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
    if (isOperaMini) {
      css.push('* { content: normal !important; }');
    }

    return css.join('\n\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value;
    var _selectors = [];

    _value = value.replace(viewportUnitExpression, replaceValues);

    if (options.hacks) {
      _value = options.hacks.overwriteDeclaration(rule, name, _value);
    }

    if (name) {
      // skipping KeyframesRule
      _selectors.push(rule.selectorText);
      _value = name + ': ' + _value + ';';
    }

    var _rule = rule.parentRule;
    while (_rule) {
      _selectors.unshift('@media ' + _rule.media.mediaText);
      _rule = _rule.parentRule;
    }

    return {
      selector: _selectors,
      content: _value
    };
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;

    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  function importCrossOriginLinks(next) {
    var _waiting = 0;
    var decrease = function() {
      _waiting--;
      if (!_waiting) {
        next();
      }
    };

    forEach.call(document.styleSheets, function(sheet) {
      if (!sheet.href || origin(sheet.href) === origin(location.href)) {
        // skip <style> and <link> from same origin
        return;
      }

      _waiting++;
      convertLinkToStyle(sheet.ownerNode, decrease);
    });

    if (!_waiting) {
      next();
    }
  }

  function origin(url) {
    return url.slice(0, url.indexOf('/', url.indexOf('://') + 3));
  }

  function convertLinkToStyle(link, next) {
    getCors(link.href, function() {
      var style = document.createElement('style');
      style.media = link.media;
      style.setAttribute('data-href', link.href);
      style.textContent = this.responseText;
      link.parentNode.replaceChild(style, link);
      next();
    }, next);
  }

  function getCors(url, success, error) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('GET', url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open('GET', url);
    } else {
      throw new Error('cross-domain XHR not supported');
    }

    xhr.onload = success;
    xhr.onerror = error;
    xhr.send();
    return xhr;
  }

  return {
    version: '0.5.1',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };

}));

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
        this.base64StateForSharing = base64StateForSharing;
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

        function base64StateForSharing() {
            return base64State(true)
        }

        // Returns encoded app state for persisting across OAuth transitions
        function base64State(isSharingLogin) {
            state.path = window.location.pathname; //self.path;
            if(window.location.hash!="" && window.location.hash!="#") {
                state.hash = window.location.hash.slice(1);
            }
            state.app_url = $window.location.protocol + '//' + $window.location.host + '/';
            state.is_sharing_login = isSharingLogin?1:0;
            state.prior_uid = $rootScope.uid;
            state.prior_token = $rootScope.token;
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
                if (state.hash) {
                    $location.hash(state.hash);
                }
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


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.config(['$routeProvider','$locationProvider','$httpProvider',
    appConfig]);
GiftStarterApp.config(['ezfbProvider', '$httpProvider', facebookConfig]);

function appConfig($routeProvider,  $locationProvider,  $httpProvider) {
    $routeProvider
        .when('/',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/create',
        {templateUrl: '/scripts/giftstart/create/giftstart-create.html', reloadOnSearch: false})
        .when('/giftstart',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/:object/:attr',
        {templateUrl: '/scripts/giftstart/giftstart.html', reloadOnSearch: false})
        .when('/giftstart/:title/print',
        {templateUrl: '/scripts/giftstart/print/print.html', reloadOnSearch: false})
        .when('/login',
        {templateUrl: '/scripts/login/login-or-create.html', reloadOnSearch: false})
        .when('/users/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/user/:uid',
        {templateUrl: '/scripts/user/user_profile.html', reloadOnSearch: false})
        .when('/about',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/concierge',
        {templateUrl: '/scripts/static-pages/concierge/concierge.html', reloadOnSearch: false})
        .when('/faq',
        {templateUrl: '/scripts/static-pages/faq/faq.html', reloadOnSearch: false})
        .when('/howitworks',
        {templateUrl: '/scripts/static-pages/howitworks/howitworks.html', reloadOnSearch: false})
        .when('/oldbrowser',
        {templateUrl: '/scripts/static-pages/oldbrowser/oldbrowser.html', reloadOnSearch: false})
        .when('/partners',
        {templateUrl: '/scripts/static-pages/partners/partners.html', reloadOnSearch: false})
        .when('/portal',
        {templateUrl: '/scripts/partnerportal/partnerportal.html', reloadOnSearch: false})
        .when('/press',
        {templateUrl: '/scripts/static-pages/press/press.html', reloadOnSearch: false})
        .when('/terms',
        {templateUrl: '/scripts/static-pages/terms/terms.html', reloadOnSearch: false})
        .when('/privacy',
        {templateUrl: '/scripts/static-pages/privacy/privacy.html', reloadOnSearch: false})
        .when('/what-is-it',
        {templateUrl: '/scripts/static-pages/about/about.html', reloadOnSearch: false})
        .when('/add-the-button',
        {templateUrl: '/scripts/partnerportal/partnerportal.html'})
        .when('/reset/:resetCode',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/:searchTerm',
        {templateUrl: '/scripts/home/home.html', reloadOnSearch: false})
        .when('/search/',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/giftideas/:term*',
        {templateUrl: '/scripts/static-pages/giftideas/giftideas.html', reloadOnSearch: false})
        .when('/:path*', {
            controller: 'ContentRouteController',
            reloadOnSearch: false,
            template: '<ng-include ng-show="error" src="\'/scripts/four-oh-four.ng.html\'"></ng-include><div id="wp-content" ng-bind-html="content"></div>'
        })
        .otherwise({redirectTo: '/'});

    $locationProvider.hashPrefix('!').html5Mode({enabled: true});

    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

function facebookConfig(ezfbProvider, $httpProvider) {
    ezfbProvider.setInitParams({appId: window.fbAppId});
}

GiftStarterApp.controller('ContentRouteController', contentRouteController);

function contentRouteController($scope, $routeParams, $http, $sce, $window) {
//    $scope.templateUrl = '';
//    var baseUrl = '/blog/'; //content.giftstarter.com/';
    function onRouteUpdate() {
//        $scope.templateUrl = baseUrl + $routeParams.path;
//        $scope.error = false;
//        $http.get($scope.templateUrl).success(function(response) {
//            $scope.content = $sce.trustAsHtml(extractMain(response));
//            $scope.error = false;
//        }).error(function(){
            $scope.content = '';
            $scope.error = true;
//        });
    }

//    var re = new RegExp('content.giftstarter.com', 'g');
//    function replaceLink(ele) {
//        ele.host = ele.host.replace(re, $window.location.host);
//    }

//    function replaceAnchorLinks(ele) {
//        var anchors = ele.querySelectorAll('a');
//        Array.prototype.slice.call(anchors).forEach(replaceLink);
//        return ele;
//    }

    function extractMain(html) {
        return $(html).find('.site-inner').html()+'<link rel="stylesheet" id="open-sans-css" href="//fonts.googleapis.com/css?family=Open+Sans%3A300italic%2C400italic%2C600italic%2C300%2C400%2C600&amp;subset=latin%2Clatin-ext&amp;ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="dashicons-css" href="http://content.giftstarter.com/wp-includes/css/dashicons.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="admin-bar-css" href="http://content.giftstarter.com/wp-includes/css/admin-bar.min.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="menu-image-css" href="http://content.giftstarter.com/wp-content/plugins/menu-image/menu-image.css?ver=1.1" type="text/css" media="all"><!--link rel="stylesheet" id="googlefonts-css" href="http://fonts.googleapis.com/css?family=Roboto+Condensed:400&amp;subset=latin" type="text/css" media="all"--><link rel="stylesheet" id="omega-style-css" href="http://content.giftstarter.com/wp-content/themes/omega/style.css?ver=4.1" type="text/css" media="all"><link rel="stylesheet" id="footer-credits-css" href="http://content.giftstarter.com/wp-content/plugins/footer-putter/styles/footer-credits.css?ver=1.11" type="text/css" media="all">';
        /*
        var container = document.createElement('div'),
            bodyTags,
            result;
        container.innerHTML = html;
        bodyTags = container.querySelector('main');
        //console && console.log && console.log(replaceAnchorLinks(bodyTags));
        if (bodyTags == null) {
            result = html;
            console && console.log && console.log('html: ',html);
        } else if (bodyTags.length > 0) {
            result = bodyTags.innerHTML;
        } else if (bodyTags.hasOwnProperty('innerHTML')) {
            result = bodyTags.innerHTML;
        } else {
            result = html;
        }
        container = null;
        return result;
        */
    }
    $scope.$on('$routeChangeSuccess', onRouteUpdate);
    onRouteUpdate();
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsView', ['$timeout', gsView]);

function gsView($timeout) {
    function link(scope, element, attrs) {
        scope.$on('$viewContentLoaded', pathChanged);
        function pathChanged() {$timeout(scrollTop, 0)}
        function scrollTop() {window.scrollTo(0, element[0].offsetTop - 9999)}
    }

    return {link: link}
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsFocus', gsFocus);

function gsFocus($timeout, $parse) {
    return {
        //scope: true
        link: function(scope, element, attrs) {
            var model = $parse(attrs.gsFocus);
            scope.$watch(model, function(value) {
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // on blur event:
            element.bind('blur', function() {
                console && console.log && console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

setTimeout(function() {
    // For the HubSpot Sidekick bug.  Seriously.
    // https://trello.com/c/8qqEvQL6/182-high-chrome-browser-view-is-not-working
    angular.module('GiftStarterApp')
        .directive('gsMenu', gsMenu);
}, 0);
setTimeout(function() {
    // Fallback for if it still doesn't load
    if (document.getElementById('angular-view') === null) {
        window.location.reload();
    }
}, 3000);

function gsMenu(UserService, PopoverService) {

    function link(scope, element) {
        if (!device.mobile()) {element.style = "display: None"}

        scope.expanded = false;
        scope.loggedIn = UserService.loggedIn;
        scope.login = login;
        scope.logout = logout;
        scope.expand = expand;
        scope.close = close;

        scope.$on('logout-success', loginChanged);
        scope.$on('login-success', loginChanged);
        scope.$on('menu-open', expand);
        scope.$on('menu-close', close);

        function loginChanged() {scope.loggedIn = UserService.loggedIn}
        function expand() {scope.expanded = true}
        function close() {scope.expanded = false}
        function login() {PopoverService.setPopover('login')}
        function logout() {UserService.logout()}
    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/menu/menu.ng.html',
        link: link
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsScrollPlay',[
    '$window', gsScrollPlay]);

function gsScrollPlay($window) {
    var scope, element, padding, attributes, loaded = false;

    function link($scope, elm, attrs) {
        window.elm = elm;
        scope = $scope;
        element = elm[0];
        attributes = attrs;
        padding = attrs.gsPadding;
        angular.element($window).bind("scroll", onScroll);
    }

    function onScroll() {
        var pxPastTop = $window.innerHeight -
            element.getBoundingClientRect().top;
        if (!loaded) {
            if (pxPastTop > padding) {
                loaded = true;
                var parent = element.parentNode;
                attributes.$set('src', '/assets/howToUseGS.gif');
                element.remove();
                parent.appendChild(element.cloneNode(false));
            }
        }
    }

    return {
        restrict: 'A',
        link: link
    }
}


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('AboutController', ['$scope','$location','$timeout',
    AboutController]);

function AboutController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('FaqController', ['$scope','$location','$timeout', 'Analytics',
    FaqController]);

function FaqController($scope,  $location,  $timeout, Analytics) {
    $scope.location = $location;

    $scope.openQuestions = [];

    var allOpen = false;

    $scope.questionCount = 0;
    var question = function(question, answer) {
        this.question = question;
        this.answer = answer;
        $scope.questionCount++;
    };

    var section = function(name, questions) {
        this.name = name;
        this.questions = questions;
    };

    $scope.items = [
        new section(
            "OVERVIEW",
            [
                new question(
                    "What is GiftStarter?",
                    "GiftStarter is a payment parsing service that lets you buy and gift anything that is sold online, piece by piece, at anytime, and with/for whomever you want. We divide anything sold on the internet into a grid, then family and friends buy it tile by tile off the grid. Once complete, we send a handmade card and ensure the gift is shipped, too!"
                ),
                new question(
                    "How does it work?",
                    "Search for and select a product using the search bar on the homepage, fill out the GiftStarter Campaign information to share your story on why this is important to you or your gift recipient, and bring others along on the giving journey.  We let your family and friends choose their pieces of the gift to give, we send an awesome hand-crafted group card to remember the experience, and the gift too."
                ),
                new question(
                    "Who can use the GiftStarter service?",
                    "Anyone can use the GiftStarter service who has a credit card. We accept payments from most everywhere in the world. Gifts are currently limited to delivery in the United States only for now. Europe and Asia are not available for delivery yet - we are working on it."
                ),
                new question(
                    "What methods of payment do you support?",
                    "We accept Visa, Mastercard, American Express, and Discover. We process credit cards using Paypal, and direct payment via PayPal account is coming soon!"
                ),
                new question(
                    "How does GiftStarter compare to other crowdfunding sites?",
                    "Other crowdfunding sites focus on enabling payment process. We focus on enabling the gifting experience all the way to delivering a hand-crafted group card and gift."
                ),
                new question(
                    "Where do I go if I need help?",
                    "We are always here to help!  Email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>.  We are also on standby on <a href=\"https://twitter.com/GiftStarter\">Twitter</a> (@GiftStarter) and <a href=\"www.facebook.com/giftstart\">Facebook</a> (www.facebook.com/giftstart).  Also, feel free to call us at <a href=\"tel:2064864849\">206-486-4849</a>!"
                )
            ]
        ),
        new section(
            "GIFTSTARTER CAMPAIGNS",
            [
                new question(
                    "How long will my Giftstarter Campaign be live?",
                    "The Gift Champion who creates the gift campaign can decide on how long they want the campaign. You can currently choose from 1 day to 30 days."
                ),
                new question(
                    "What happens if my GiftStarter Campaign isn't completed before the due date?",
                    "We send out a giftcard for the amount raised. Depending on the funding level, we will send the recipient a hand-crafted group card with the image of what was intended."
                ),
                new question(
                    "How do I create a successful GiftStarter Campaign?",
                    "When you create the GiftStarter Campaign title and description, share with others who will pitch in why it's awesome, why it is the perfect gift for your recipient, and any personal notes about the recipient. Encourage others who pitch in to share their personal stories related to the recipient too! After all, we're creating a gifting memory together!"
                ),
                new question(
                    "When am I charged?",
                    "We want to get your contribution to the gift as soon as possible, so we charge your card as soon as you pitch in."
                )
            ]
        ),
        new section(
            "GIFTS",
            [
                new question(
                    "After the GiftStarter Campaign ends, when will the gift arrive?",
                    "We will send both the hand-crafted group card (with all those that pitched in and their personal notes) and the gift within 3-5 business days of the GiftStarter Campaign completion."
                ),
                new question(
                    "How is the \"base price\" determined?",
                    "The price of the gift at the time of campaign creation will be used to determine the \"base price.\""
                ),
                new question(
                    "How do I know who pitched in on the gift?",
                    "You'll receive a link to the GiftStarter Campaign once you pitch in. If you're the recipient, you'll receive a hand-crafted gift card at the end of the campaign!"
                )
            ]
        ),
        new section(
            "SERVICE FEES",
            [
                new question(
                    "Does GiftStarter have a fee?",
                    "Yes, our GiftStarter service fee is 8%."
                ),
                new question(
                    "Who pays the fees?",
                    "The 8% service fee is split up among the contributors to the GiftStarter campaign. For example, the fee would be $8.00 for a $100.00 item. And so if you have ten (10) people pitching in, then each person would only pay an additional $0.80. Yes... only 80 cents!! At that point, you could say it's almost free."
                ),
                new question(
                    "Is there a sales tax?",
                    "Yes, we have to pay all required legal taxes."
                ),
                new question(
                    "Do I get a receipt?",
                    "Yes, as soon as you pitch in, you will receive an email receipt."
                )
            ]
        ),
        new section(
            "SECURITY",
            [
                new question(
                    "Is my credit card information secure?",
                    "Security is our top priority. To get specific, our site uses industry standard 128-bit SSL (Secure Sockets Layer) to ensure that sensitive data (ie. credit card number, name, address, etc.) is transmitted securely during every transaction. SSL encrypts the data before it is transmitted so that it can never be read. You will see the SSL seal displayed on the page during checkout and the address bar will change to begin with https."
                ),
                new question(
                    "Is my personal information safe?",
                    "We’re sticklers about this. We never share or sell any of the personal information of our registrants or gift-givers."
                )
            ]
        )
    ];

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });

    $scope.toggleQuestion = function(question) {
        if($scope.isOpenQuestion(question)) {
            $scope.openQuestions.splice($scope.openQuestions.indexOf(question), 1);
        } else {
            $scope.openQuestions.push(question);
            Analytics.track("faq", question.question);
        }
    };

    $scope.toggleAll = function() {
        if (allOpen) {
            $scope.openQuestions.length = 0;
            allOpen = false;
        } else {
            for (var sectionIndex = 0; sectionIndex < $scope.items.length; sectionIndex++) {
                for (var questionIndex = 0; questionIndex < $scope.items[sectionIndex].questions.length; questionIndex++) {
                    $scope.openQuestions.push($scope.items[sectionIndex].questions[questionIndex]);
                }
            }
            allOpen = true;
        }
    };

    $scope.isOpenQuestion = function(question) {
        return $scope.openQuestions.indexOf(question) != -1
    }
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location', "ProductService", "UserService",
    GiftideasController]);

function GiftideasController($scope, $http, $location, ProductService, UserService) {

    $scope.productMessage = '';
    $scope.location = $location;
    $scope.path = $location.path();
    $scope.isSavingForLater = false;
    var pathParts = $scope.path.replace('//','/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length>2?pathParts[2]:false;
    console.log("category: " + category);
    var product = pathParts.length>3?pathParts[3]:false;

    // hack for mailing list error where we linked to the wrong category
    if(category && !product && (category=="lunarnewyear"||category=="farewell"||category=="pisces") && $location.search()['utm_campaign']=="18f05bc479-Weekly_Email_Lunar_New_Year_Pisces_2_19_2015") {
        category=false;
    }


    $scope.saveGiftIdeaForLater = function(product) {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater(
            "GiftIdeas",
            product.giftStartLink,
            parseInt(product.productPrice*100),
            product.productName,
            product.productDescription,
            product.productImage.indexOf('http')==0?product.productImage:('/assets/giftideas/category'+product.productImage)
        );
        if(saver) {
            saver.success(function (response) {
                $scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>.";
                $scope.isSavingForLater = false;
            })
            .error(function (response) {
                $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    function setMeta(metatitle, metadesc) {
        metatitle = "GiftStarter: "+metatitle;
        $('html head title').text(metatitle);
        $('html head meta[property="og:title"]').attr("content", metatitle);
        $('html head meta[name=description]').attr("content", metadesc);
        $('html head meta[property="og:description"]').attr("content", metadesc);
    }

    if(category) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.category = data;
            $scope.categoryPath = $scope.basePath+'/'+category;
            var prior=null;
            var setmeta=false;
            angular.forEach(data.productList, function (value, key) {
                value.productNameStripped = String(value.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
                value.hasPrice = /^\d.*/.test(value.productPrice);
                value.productDescription=value.productDescription.replace(/<\/p>\s*(<br\s*\/>)*(<p>\s*&nbsp;\s*<\/p>)*(<br\s*\/>)*\s*<p>/g,'</p><p>');
                value.productDescription=value.productDescription.replace(/&quot;/g,'"');
                value.productDescription=value.productDescription.replace(/<a /g,'<a target="_new" ');
                if(prior!=null) {
                    $scope.groups.push([prior,value]);
                    prior=null;
                } else {
                    prior=value;
                }
                if(product && value.productSlug==product) {
                    $scope.product=value;
                    var metatitle=value.productName.replace(/&[a-zA-Z0-9]{1,5};/g,'');
                    var metadesc=value.productMetaDescription&&value.productMetaDescription.trim()!=""?value.productMetaDescription:value.productDescription;
                    setMeta(metatitle, metadesc);
                    setmeta=true;
                }
                $scope.lastProduct=value;
            });
            if(!setmeta) {
                var metatitle=data.categoryName;
                var metadesc=data.categoryMetaDescription&&data.categoryMetaDescription.trim()!=""?data.categoryMetaDescription:data.categoryBlurb;
                setMeta(metatitle, metadesc);
            }
            if(prior!=null) {
                $scope.groups.push([prior]);
            }
        });
    }

    $scope.goToLink = function(destination) {
        window.location.href = destination;
    };

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope', '$http',
    ConciergeController]);

function ConciergeController($scope, $http) {

    var resetForm = function() {
        $scope.email = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.msg = "";
    };

    resetForm();

    var validateForm = function() {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test($scope.email);
    }

    $scope.sendMsg = function() {
        if (validateForm()) {
            $http.put('/email/contactus.json',{
                "from_email": $scope.email,
                "title": $scope.title,
                "budget": $scope.budget,
                "url": $scope.url
            })
            .success(function (res) {
                resetForm();
                $scope.msg = "Thank you! We'll do our best to respond on the same day, definitely within 24 hours. Please add giftconcierge@giftstarter.com to your address book to make sure you'll receive the reply."
            })
            .error(function (res) {
                $scope.msg = res['error'];
            });
        } else {
            $scope.msg = "Please enter a valid email address.";
        }
    }
}


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HowItWorksController = function ($scope, $location) {
        $scope.location = $location;
        $scope.sectionShown = "welcome";
    }

    app.controller('HowItWorksController', [
        '$scope',
        '$location',
        HowItWorksController]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('OldbrowserController', ['$scope','$location','$timeout',
    OldbrowserController]);

function OldbrowserController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var PartnerportalController = function ($scope, $rootScope, $window, UserService, $timeout, $location, $http, Analytics) {

        $scope.convertToTextarea = function(event) {
            var elem = jQuery(event.target);
            var height = elem.height();
            elem.wrapAll('<textarea>');
            var parent = elem.parent();
            elem.contents().unwrap();
            parent.height(height);
            parent.select();
        };

        function loadCoreData() {
            $scope.loading = true;
            $http({
                method: 'GET',
                url: '/users/partner/' + UserService.uid + '.json'
            }).success(function (response) {
                $scope.coreDataComplete = false;
                $scope.editMode = true;
                $scope.partner = response;
                if ($scope.partner.api_key && $scope.partner.api_key.length > 0) {
                    $scope.coreDataComplete = true;
                    $scope.editMode = false;
                }
                $scope.coreError = '';
                $scope.loading = false;
            }).error(function () {
                $scope.coreError = "Unable to retrieve your company information; please reload the page";
                $scope.coreDataComplete = false;
                $scope.editMode = false;
                $scope.loading = false;
            });
        }

        this.initialize = function() {
            $scope.coreDataComplete = false;
            $scope.editMode = false;
            $scope.loading = false;
            $scope.htmlInstructions = true;
            $scope.shopifyInstructions = false;
            $scope.coreError = "Loading...";
            loadCoreData();
        };

        if(UserService.loggedIn && !UserService.isUserEmailLogin()) {
            UserService.logout();
            $window.location.reload(); //$timeout(UserService.registerLogout,3000);
        } else {
            this.initialize()
        }

        $scope.loggedIn = function() {
            return UserService.loggedIn;
        };

        $scope.editCore = function() {
            $scope.editMode = true;
        };

        $scope.cancelCore = function() {
            $scope.editMode = false;
        };

        $scope.saveCore = function() {
            $scope.loading = true;
            $http({
                method: 'POST',
                url: '/users/partner/' + UserService.uid + '.json',
                data: {partner: $scope.partner}
            })
            .success( function (data) {
                $scope.partner = data;
                $scope.editMode = false;
                if($scope.partner.api_key && $scope.partner.api_key.length>0) {
                    $scope.coreDataComplete = true;
                }
                $scope.coreError = '';
                $scope.loading = false;
                $location.hash('core-form');
            })
            .error(function(data) {
                $scope.coreError = data;
                $scope.loading = false;
            })
        };

        $scope.showShopifyInstructions = function() {
            $scope.shopifyInstructions = true;
            $scope.htmlInstructions = false;
        };

        $scope.showHtmlInstructions = function() {
            $scope.shopifyInstructions = false;
            $scope.htmlInstructions = true;
        };

        $rootScope.$on('login-success', this.initialize);

    };

    app.controller('PartnerportalController', ['$scope', '$rootScope', '$window', 'UserService', '$timeout', '$location', '$http', 'Analytics', PartnerportalController]);

}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PartnersController', ['$scope','$location','$timeout',
    PartnersController]);

function PartnersController($scope,  $location,  $timeout) {
    $scope.location = $location;

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PressController', ['$scope','$location','$timeout',
    PressController]);

function PressController($scope,  $location,  $timeout) {
    var pressItem = function(link, img, quote) {
        this.link = link;
        this.img = img;
        this.quote = quote;
    };

    $scope.items = [
        new pressItem(
            "http://blog.timetrade.com/2015/08/21/wbey-episode-3-amazon-prime-day-giftstarter-top-retail-trends-of-2015/",
            "timetrade.png",
            "GiftStarter.com is a new service promising to help people never give a bad gift again. Instead of finding a cheap gift, or hunting people down who have agreed to go in on group gift, GiftStarter is an online service that allows people to choose a product and pay for it in increments.  Video Link: https://youtu.be/s_XH5fPG9_g"
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2015/08/14/friends-help-friends-give-gifts-giftstarter-brings.html",
            "pugetsound.png",
            "Friends help friends give gifts: GiftStarter brings crowdfunding to the party.  How?  GiftStarter lets friends and family collectively buy anything that is sold online.  Meet Arry Yu, CEO.  She's got a gift, and it's in the cloud."
        ),
        new pressItem(
            "http://www.adamsfinancialconcepts.com/index.php/resources/radio-show?filter_order=a.publish_up&filter_order_Dir=desc&format=html",
            "kkol.png",
            "In 20 years, what will be remembered as the most significant accomplishment of the Obama Administration? What does the future have in store for the stock market? Making group gifting easier and bringing people together, GiftStarter CEO Arry Yu, joins us to her story.  Full radio podcast here: <a href='http://www.adamsfinancialconcepts.com/media/com_podcastmanager/08.14.15_AboutMoney_GiftStarter_ArryYu.mp3'>LINK</a>"
        ),
        new pressItem(
            "http://simplyathomemom.com/2015/07/27/back-to-school-gift-ideas-with-giftstarter/",
            "simplyathome.png",
            "In minutes, users can launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.way2goodlife.com/back-to-school-shopping-roundup/",
            "way2goodlife.png",
            "The new school year is getting closer and that means Back to School Shopping. Try GiftStarter.com – this is a group gift solution that makes it easy for family and friends to combine individual budgets and give better, more useful ‪gifts for students in your life."
        ),
        new pressItem(
            "https://www.yahoo.com/tech/underwater-speakers-instagram-prints-124297324844.html",
            "yahoo.png",
            "Like Kickstarter for gifts: online campaigns to fund pricey presents (for birthdays, weddings, whatever) by dividing their prices up among many givers. The site illustrates who’s contributing what. The gift is shipped with a handmade card."
        ),
        new pressItem(
            "http://money.usnews.com/money/personal-finance/articles/2015/08/06/5-ways-to-get-a-big-head-start-on-holiday-shopping",
            "usworldnews.png",
            "...websites like GiftStarter.com, where customers can choose the product they want to buy, break the cost into as many pieces as they need and pay at their own pace."
        ),
        new pressItem(
            "http://issuu.com/arizonahealthandliving/docs/arizona_health_and_living_magazine_/1?e=6323197/14520390",
            "arizonahealthandliving.png",
            "BACK TO SCHOOL can be expensive, especially for college bound students. GiftStarter.com is the ideal solution that makes it easy for family and friends to combine individual budgets to give better more useful gifts to the new college student."
        ),
        new pressItem(
            "http://www.cpapracticeadvisor.com/news/12100941/giftstarter-platform-brings-cloud-to-gift-giving",
            "cpa.png",
            "A new online cloud service is making gift giving easier. GiftStarter allows family and friends to combine individual budgets to give better gifts to loved ones."
        ),
        new pressItem(
            "http://www.designcapsule.com/accessories/giftstarter-for-home-decor-gifts/",
            "designcapsulre.png",
            "The next time you want to surprise a loved one with a gift, you may find GiftStarter the best way to purchase a big ticket item."
        ),
        new pressItem(
            "http://www.seattletimes.com/business/technology/tech-spotlight-giftstarter/",
            "SeattleTimes.png",
            "The gift of efficiency: The site provides the platform for finding the gift, splitting its cost, contacting contributors through social media and processing gift payments. “It really creates that digital event of people coming together in community,” Yu said."
        ),
        new pressItem(
            "http://www.drugstorenews.com/article/giftstarter-looks-take-hassle-out-gift-giving",
            "drug-store-news.png",
            "The way it works is simple. Users launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.retailingtoday.com/article/no-more-crappy-gifts-new-site%E2%80%99s-mission",
            "retailing_today.png",
            "The recently launched Web site GiftStarter ... claims to be reinventing the gifting business so that family members, friends and co-workers are able to co-mingle individual budgets to offer recipients a more substantial gift."
        ),
        new pressItem(
            "http://www.heraldnews.com/article/20150701/BLOGS/307019986",
            "heraldpost.png",
            "That is just the sort of convenience that we always thought the Internet should deliver. And now it does!"
        ),
        new pressItem(
            "http://blogs.capecodonline.com/cape-cod-gaming/2015/07/01/giftstarter-group-gifting-made-easy/",
            "capecod.png",
            "... the scheme that the folks behind GiftStarter have come up with is not only cool, it is a major problem-solver for giving really great gifts!  The site collects the funds and orders and ships the gift – so all you need to do is pick something that is spectacular and then make sure that the right people know about it!"
        ),
        new pressItem(
            "http://agbeat.com/lists/5-things-startups-need-to-do-when-trying-to-sign-with-big-name-brands/",
            "americangeniusnews.png",
            "To better navigate the first few sales in signing on major brands and partners, Yu shares her five tips below in her own words.... Whether you’re working with one person or many people, business is about relationships..."
        ),
        new pressItem(
            "http://www.producthunt.com/tech/giftstarter",
            "producthunt.png",
            "This is awesome. Much better than the person strolling around the office with an envelope and everyone needing change for a $20... It's hard to find good gifts for adults that are inexpensive. I'd typically rather have 15 people buy me 1 thing than 15 different things."
        ),
        new pressItem(
            "http://www.meetadvisors.com/post/7-keys-to-create-a-healthy-work-environment-for-your-business",
            "meetadvisors_logo.png",
            "GiftStarter: startup with happy employees. Culture is created by each individual within a healthy workplace. We build great teams and have very open communication to make sure that everybody is accountable and happy."
        ),
        new pressItem(
            "http://www.seattlen.com/n/bbs/board.php?bo_table=News&wr_id=8398",
            "Seattle-Korean-News.png",
            "유씨는 이 같은 소셜 네트워크 방식에서 착안, 누군가에서 여러 사람이 십시일반 정성을 모아 선물을 사주는 벤처기업 (www.giftstarter.com) 을 창업했다고 설명했다."
        ),
        new pressItem(
            "http://stackeddmagazine.com/2015/04/13/do-the-evolution/",
            "stackedd.png",
            "Both founders of GiftStarter are women, presenting a unique opportunity for Yu’s company to help her employees and partners better understand women’s needs in the workplace."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/9mile-labs-demo-day-favorite-pitches-products-ideas-seattles-b2b-accelerator/",
            "milestone-9.png",
            "Each entrepreneur had a different story to tell and project to pitch, from group gifting platform GiftStarter to structured note-taking service KustomNote  to draft beer inventory system MetaCraft."
        ),
        new pressItem(
            "http://www.womenofpresence.com/arry-yu/",
            "women-of-presence.png",
            "People write personal notes with each pitch-in, all of which are compiled into a beautiful handcrafted card to be delivered with the gift, for the gift recipient on the giftstart completion."
        ),
        new pressItem(
            "http://www.heinzmarketing.com/2014/11/matts-app-week-giftstarter/",
            "heinz.png",
            "Before you know it, the kids are getting that deluxe playset thanks to everyone in the family. It's like Kickstarter, but for gifts. I love it."
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2014/09/12/40-under-40-2014-arry-yu.html?page=all",
            "PSBJ.png",
            "Most people don't need more bottles of wine or gift cards. Everyone could pitch in $10 or $15 for something someone really wants. We're putting the giving back into gifting."
        ),
        new pressItem(
            "http://www.prweb.com/releases/giftstarter/butterlondon/prweb12271758.htm",
            "prweb.png",
            "Powered by GiftStarter, butter LONDON® will be the first beauty brand to give shoppers access to true social gifting of butter LONDON®'s curated gift collections and sets."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/startup-spotlight-giftstarter-co/",
            "geekwire.png",
            "The site's mission,\" as Yu explains, \"is to bring back the humanity, personality and the joy of real-life interactions, using technology as an enabler - not a focal point."
        ),
        new pressItem(
            "http://blog.up.co/2014/11/30/teammates-challenge-got-seattle-startup-top-accelerator/",
            "up-global.png",
            "GiftStarter seems to have gotten it right without losing the spark of that Sunday night pitch back in March - or at least their partner roster would indicate as much."
        )
    ];
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('whatIsItController', [
    '$scope','$location','ToastService','$http','Analytics',
    '$window', WhatIsItController]);

function WhatIsItController($scope,  $location,  ToastService,  $http,  Analytics,
         $window) {
    $scope.hideVideo = Boolean($location.search().hv);
    $scope.videoWidth = '100%';

    $scope.remindMe = function() {
        $http({
            method: 'PUT', url: '/users/subscribe.json', data: {
                email: $scope.email,
                double_opt_in: false
            }
        });
        Analytics.track('client', 'remind me subscribe');
        ToastService.setToast("Awesome!  We'll keep you posted!", 7000);
    };

    // Load YouTube player asynch
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}


// Create youtube iframe on load
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'tA2gcLIJYBU',
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        ga('send', 'event', 'client', 'intro-video', 'play');
    } else if (event.data == YT.PlayerState.PAUSED) {
        ga('send', 'event', 'client', 'intro-video', 'pause');
    } else if (event.data == YT.PlayerState.ENDED) {
        ga('send', 'event', 'client', 'intro-video', 'complete');
    }
}
function stopVideo() {
    player.stopVideo();
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('HomeController', [
            '$scope','Analytics','$window','$http','$timeout','AppStateService',
            '$location','ToastService','$interval', '$routeParams', '$rootScope', 'PopoverService',
    function($scope,  Analytics,  $window,  $http,  $timeout,  AppStateService,
             $location, ToastService,  $interval, $routeParams, $rootScope, PopoverService) {

        if (new Date().getTime()<1427871599000 && !device.mobile() && !$window.sessionStorage.getItem('seenSweepsMarch') && !$routeParams.searchTerm && !$window.sessionStorage.getItem('fromSearch')) {
            // Showing per browser session
            PopoverService.setPopover('sweepstakes');
            $window.sessionStorage.setItem('seenSweepsMarch', 'yes')
        }

        Analytics.track('client', 'loaded home');
        if (AppStateService.state) {
            if (AppStateService.state.gsid) {
                $location.path('/giftstart').search('gs-id', AppStateService.state.gsid);
            } else if (AppStateService.state.createSession) {
                $location.path('/create');
            }
        }

        if ($routeParams.resetCode) {
            $rootScope.$broadcast('password-reset-requested');
        }

        if ($routeParams.searchTerm) {
            $timeout(function () {
                $window.sessionStorage.setItem('searchTermFromUrl', $routeParams.searchTerm);
                $rootScope.$broadcast('performSearchFromUrl');
            }, 200);
        }

        $scope.topCampaigns = {};

        $http({method: 'GET', url: '/giftstart/api/hot-campaigns?num_campaigns=2'})
            .success(function(data) {
                Analytics.track("client", "hot campaigns load succeeded");
                $scope.topCampaigns = data;

                // Cache images
                for(var j = 0; j < $scope.topCampaigns.pitchins.length; j++) {
                    for (var i = 0; i < $scope.topCampaigns.pitchins[j].length; i++) {
                        var image = new Image();
                        image.src = $scope.topCampaigns.pitchins[j][i].img;
                    }
                }

            }).error(function(data) {
                Analytics.track("client", "hot campaigns load failed");
            });

        $scope.reachOutNotReadyYet = function() {
            Analytics.track("client", "reach out not ready yet");
            ToastService.setToast("Oops!  Reaching out to friends isn't quite ready yet.<br>Thanks for letting us know you're interested!", 7000);
        };

        $scope.pitchinIndex = 0;
        $scope.fadedIn = false;
        function fadeInComment() {
            $scope.pitchinIndex += 1;
            $scope.fadedIn = true;
            $timeout(fadeOutComment, 6800);
        }
        function fadeOutComment() {
            $scope.fadedIn = false;
        }
        if (!$location.search().TESTING_OMG) {
            fadeInComment();
            $interval(fadeInComment, 7000);
        }

        $scope.goToLink = function(destination) {
            $location.path("/" + destination);
        };

    }
]);
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('GiftsGivenBarController', ['$scope','$timeout',
    GiftsGivenBarController]);

function GiftsGivenBarController($scope) {
    var campaign = function(title, url, img) {
        this.title = title;
        this.url = url;
        this.img = img;
    };

    $scope.campaigns = [
        new campaign(
            "A fantastic bag for a fantastic lady",
            "https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady",
            "https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg"
        ),
        new campaign(
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg"
        ),
        new campaign(
            "Agnes Christmas gift",
            "https://www.giftstarter.com/giftstart/Agnes-Christmas-gift",
            "https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg"
        ),
        new campaign(
            "My inner nerd",
            "https://www.giftstarter.com/giftstart/My-inner-nerd",
            "https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg"
        ),
        new campaign(
            "Run Nikki Run!!!",
            "https://www.giftstarter.com/giftstart/Run-Nikki-Run",
            "https://storage.googleapis.com/giftstarter-pictures/p/315.jpeg"
        ),
        new campaign(
            "Let's help Wix move!",
            "https://www.giftstarter.com/giftstart/Lets-help-Wix-move",
            "https://storage.googleapis.com/giftstarter-pictures/p/Lets-help-Wix-move.jpeg"
        ),
        new campaign(
            "GiftStarter Birthday Campaign for Charity",
            "https://www.giftstarter.com/giftstart/GiftStarter-Birthday-Campaign-for-Charity-2",
            "https://storage.googleapis.com/giftstarter-pictures/p/GiftStarter-Birthday-Campaign-for-Charity-2.jpeg"
        ),
        new campaign(
            "Jessi's 30th Birthday Blowout!",
            "https://www.giftstarter.com/giftstart/Jessis-30th-Birthday-Blowout",
            "https://storage.googleapis.com/giftstarter-pictures/p/340.jpeg"
        ),
        new campaign(
            "6 months of seasonal beauty products for Marion's birthday",
            "https://www.giftstarter.com/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/218.jpeg"
        ),
        new campaign(
            "T1 HIMARS Smoke Break",
            "https://www.giftstarter.com/giftstart/T1-HIMARS-Smoke-Break",
            "https://storage.googleapis.com/giftstarter-pictures/p/165.jpeg"
        ),
        new campaign(
            "A Place for Piper",
            "https://www.giftstarter.com/giftstart/A-Place-for-Piper",
            "https://storage.googleapis.com/giftstarter-pictures/p/40.jpeg"
        ),
        new campaign(
            "Andrea and John want a Vitamix for their wedding",
            "https://www.giftstarter.com/giftstart/Andrea-and-John-want-a-Vitamix-for-their-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/2.jpg"
        ),
        new campaign(
            "The Truffle Treasure",
            "https://www.giftstarter.com/giftstart/The-Truffle-Treasure-1",
            "https://storage.googleapis.com/giftstarter-pictures/p/The-Truffle-Treasure-1.jpeg"
        ),
        new campaign(
            "Spencer's Birthday Gift- Iphone 6!",
            "https://www.giftstarter.com/giftstart/Spencers-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/390.png"
        ),
        new campaign(
            "Jeffrey Song's Birthday!",
            "https://www.giftstarter.com/giftstart/Jeffrey-Songs-Birthday",
            "https://storage.googleapis.com/giftstarter-pictures/p/Jeffrey-Songs-Birthday.jpeg"
        ),
        new campaign(
            "Sending our love to our newly minted Texan!",
            "https://www.giftstarter.com/giftstart/Sending-our-love-to-our-newly-minted-Texan",
            "https://storage.googleapis.com/giftstarter-pictures/p/487.jpeg"
        ),
        new campaign(
            "Birthday Love for Arry",
            "https://www.giftstarter.com/giftstart/Birthday-Love-for-Arry",
            "https://storage.googleapis.com/giftstarter-pictures/p/488.jpeg"
        ),
        new campaign(
            "Amanda & SoonSol's wedding",
            "https://www.giftstarter.com/giftstart/Amanda--SoonSols-wedding",
            "https://storage.googleapis.com/giftstarter-pictures/p/385.jpeg"
        )
    ];
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsThankedCampaigns', ['$http',
    'Analytics', gsThankedCampaigns]);

function gsThankedCampaigns($http, Analytics) {
    var $scope;

    function link(scope, elm, attrs) {
        $scope = scope;
        $scope.campaigns = [];

        // Get thanked campaigns
        $http({method: 'GET',
            url: '/giftstarts.json?thanked=true&num=' + attrs.gsNum})
            .success(thankedCampaignsFetched)
            .error(thankedCampaignsFailed);
    }

    function thankedCampaignsFetched(data) {
        Analytics.track('client', 'thanked campaigns fetch success');
        $scope.campaigns = data;
    }

    function thankedCampaignsFailed(reason) {
        console.error('thanked campaigns fetch failed');
        Analytics.track('client', 'thanked campaigns fetch failed');
    }

    return {
        link: link,
        templateUrl: '/scripts/giftstart/thanks/thanked-campaigns.ng.html',
        restrict: 'E'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPrintUrl', ['$location', '$http', gsPrintUrl]);


function gsPrintUrl($location, $http) {
    function link(scope, element, attrs) {
        var currentUrl = $location.absUrl().slice(0, -5);
        $http.get('http://api.bitly.com/v3/shorten?callback=',
            { params: {
                "format": "json",
                "apiKey": "R_85bf9d10211f4423b5c3be4a336ad77d",
                "login": "giftstarter",
                "longUrl": currentUrl
            }})
            .success(function(response) {
              element.text(response.data.url);
              element.wrap("<a href=" + response.data.url + "></a>");
            }
        );
    }

    return {
        link: link,
        restrict: 'E'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var HeaderController = function ($scope, $location, UserService, Analytics, PopoverService, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {
        var self = this;
        this.thisRoute = $location.path().toString();
        this.loggedIn = UserService.loggedIn;
        this.mobile = device.mobile() || device.tablet();

        this.subliminalOffset = -3.0;
        this.subliminalStyle = {'background-position-y': this.subliminalOffset + 'px'};

        this.logout = logout;
        this.showReset = showReset;
        this.closeLogin = closeLogin;
        this.loginKeyPress = loginKeyPress;

        this.menuOpen = menuOpen;

        this.userImageUrl = UserService.profileImageUrl;
        this.userProfileUrl = '/users/' + UserService.uid;
        this.userName = (UserService.name).toUpperCase();

        this.creating = $location.path().indexOf('/create') === 0;
        this.portaling = $location.path().indexOf('/portal') === 0;

        $scope.isHeaderOnly = self.thisRoute == '/header';

        $scope.search = false;
        $scope.menu = false;
        $scope.notifyOpen = false;

        $scope.numNotifications = 0;
        $scope.numNotificationsUnseen = 0;
        $scope.notifications = null;
        $scope.notificationHover = false;

        $scope.showLoginwrapper = false;
        $scope.showBlackout = false;

        $interval(updateSubliminal, 3000);

        $scope.$on('login-success', updateLogin);
        $scope.$on('logout-success', updateLogin);
        $scope.$on('$routeChangeStart', routeChangeListener);
        $scope.$on('profile-image-changed', updateLogin);

        //check notifications for user
        checkNotifications = function() {
            if(UserService.loggedIn) {
                $http({
                    method: 'GET',
                    url: '/users/notify/' + UserService.uid + '.json'
                }).success(function (response) {
                    $scope.notifications = response.notifications;
                    $scope.numNotifications = 0;
                    $scope.numNotificationsUnseen = 0;
                    for (item in $scope.notifications) {
                        $scope.numNotifications++;
                        if (!$scope.notifications[parseInt(item)].seen) {
                            $scope.numNotificationsUnseen++;
                        }
                    }
                }).error(function (response) {
                    console && console.log && console.log(response)
                });
            }
        };
        $scope.pollNotifications = function(){
            checkNotifications();
            $timeout($scope.pollNotifications, 3000);
        };
        $scope.pollNotifications();

        self.notificationsHoverIn = function() {
            $scope.notificationHover = true;
            notificationsSeen();
        };

        self.notificationsHoverOut = function() {
            $scope.notificationHover = false;
        };

        function notificationsSeen() {
            $http({
                method: 'POST', url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_seen: '*'
                }
            })
        }

        self.openNotifications = function() {
            $scope.notifyOpen = true;
            notificationsSeen();
            self.closeMobileMenu();
            $scope.showBlackout = true;
            $anchorScroll('notificationlist')
        };

        self.closeNotifications = function() {
            $scope.showBlackout = false;
            $scope.notifyOpen = false;
        };

        self.notificationClick = function(item) {
            $http({
                method: 'POST', url: '/users/notify/' + UserService.uid + '.json',
                data: {
                    set_acknowledged: '["' + item.id + '"]'
                }
            });
            $scope.notifications.splice($scope.notifications.indexOf(item), 1);
            self.closeNotifications();
        };

        // for sizing using ng-class
        function routeChangeListener(event, next) {
            self.creating = $location.path().indexOf('/create') === 0;
            self.portaling = $location.path().indexOf('/portal') === 0;
            menuClose();
            if (next.$$route) {
                self.thisRoute = next.$$route.originalPath;
            }
        }

        function updateSubliminal() {
            self.subliminalOffset -= 22.8178;
            if (self.subliminalOffset < -253) {
                self.subliminalOffset = -3;
            }
            self.subliminalStyle = {
                'background-position-y': self.subliminalOffset + 'px'
            };
        }

        self.toggleMobileMenu = function() {
            $scope.menu = !$scope.menu;
        };

        self.closeMobileMenu = function() {
            $scope.menu = false;
        };

        function closeLogin() {
            $scope.showBlackout = false;
            $scope.showLoginwrapper = false;
        }

        function revealLogin() {
            $scope.showBlackout = true;
            $scope.showLoginwrapper = true;
        }

        self.showLogin = function() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-login');
            $timeout(function() {$rootScope.$broadcast('loginbox-show-login');}, 200);
        };

        function showReset() {
            revealLogin();
            $rootScope.$broadcast('loginbox-show-reset');
            jQuery('.loginwrapper .userlogin__password').focus();
        }

        function logout() {
            self.userImageUrl = '';
            Analytics.track('user', 'logout from header');
            UserService.logout();
        }

        function updateLogin() {
            self.loggedIn = UserService.loggedIn;
            self.userImageUrl = UserService.profileImageUrl;
            self.userProfileUrl = '/users/' + UserService.uid;
            self.userName = (UserService.name).toUpperCase();
        }

        function loginKeyPress($event) {
            if($event.keyCode == 27)
              closeLogin();
        }

        function menuOpen() {$rootScope.$broadcast('menu-open')}
        function menuClose() {$rootScope.$broadcast('menu-close')}

        var hideMenu = device.mobile() || device.tablet();

        $scope.headerSearchTerm = '';

        $scope.actions = {
            toggleMobileMenu: function () {
                hideMenu = !hideMenu;

                // Not recommended way: needs to happen in the directive
                // TODO: future work item - move the header to a directive
                if (hideMenu) {
                    device.mobile() && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                } else {
                    device.mobile() && olark('api.box.hide');
                    angular.element('ul.headerNav').addClass('expanded');
                }
            },
            menuItemClicked: function (isLoginItem) {
                if (device.mobile() || device.tablet()) {
                    device.mobile() && !isLoginItem && olark('api.box.show');
                    angular.element('ul.headerNav').removeClass('expanded');
                    hideMenu = true;
                }
            },
            search: function () {
                $window.sessionStorage.setItem('fromSearch', 'yes');
                $location.path('/');
                $timeout(function () {
                    $rootScope.$broadcast('performSearchFromHeader');
                }, 100);
            }
        };

        $rootScope.$on('header-show-login', function(){
            self.showLogin();
        });

        $rootScope.$on('header-close-login', function(){
            self.closeLogin();
        });

        $rootScope.$on('password-reset-requested', function() {
            if(self.loggedIn) {
                self.logout();
                window.location.reload();
            } else {
                $location.path('/', false);
            }
            self.showReset();
        });

        $scope.scrollTo = function(id) {
            $location.hash(id);
            $anchorScroll();
        };

        if($location.hash() == "nav_mobile") {
            $scope.menu = true;
        } else if($location.hash() == "searchbar") {
            $scope.search = true;
        } else if($location.hash() == "nav_login") {
            self.showLogin();
        } else if($location.hash() == "nav_help" || $location.hash() == "nav_start") {
            var menuopenlistener = function() {
                jQuery('#' + $location.hash()).removeClass("hover");
                angular.element($window).off('mousemove', menuopenlistener);
            };
            jQuery('#' + $location.hash()).addClass("hover");
            angular.element($window).on('mousemove', menuopenlistener);
        }

        var producturl = decodeURIComponent($location.search().producturl);
        if(producturl&&producturl!=""&&producturl!="true"&&producturl!="undefined") {
            var parser = document.createElement('a');
            parser.href = producturl;
            olark('api.box.expand');
            olark('api.chat.sendMessageToVisitor', {
                body: "Welcome!  Can I help you gift this product from "+(parser.hostname=="localhost"?"another site":parser.hostname)+"?"
            });
        }

        var userAgent = navigator.userAgent.toLowerCase();
         if (userAgent .indexOf('safari')!=-1){
           if(userAgent .indexOf('chrome')  > -1){
             //browser is chrome
           }else if((userAgent .indexOf('opera')  > -1)||(userAgent .indexOf('opr')  > -1)){
             //browser is opera
           }else{
               jQuery('.menu-login > .submenu').css('margin-top', '-7px');
           }
          }

    };

    app.controller('HeaderController', [
        '$scope',
        '$location',
        'UserService',
        'Analytics',
        'PopoverService',
        '$rootScope',
        '$interval',
        '$timeout',
        '$window',
        '$http',
        '$anchorScroll',
        HeaderController])
    .run(function($rootScope, $location, $anchorScroll, $routeParams) {
      //when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
      });
    })

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ToastService', ['$rootScope', ToastService]);

function ToastService($rootScope) {

    this.toastText = 'Hey this is my toast text!';
    this.toastMillis = 2000;

    var self = this;

    this.getToastText = function() {
        return self.toastText;
    };

    this.setToast = function(toastText, toastMillis) {
        self.toastText = toastText;
        self.toastMillis = toastMillis;
        $rootScope.$broadcast('display-toast');
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsToast', gsToast);

function gsToast(ToastService, $timeout) {
    function link(scope, element, attr) {
        scope.toastText = 'Het this is my test toast!';
        scope.hide = true;
        scope.displayed = false;
        scope.toastP = element[0].children[0].children[0];

        scope.hideToast = function() {
            scope.hide = true;
            $timeout(scope.displayNoneToast, 250);
        };
        scope.displayNoneToast = function() {scope.displayed = false};

        scope.showToast = function() {
            scope.hide = false;
            scope.displayed = true;
        };

        scope.$on('display-toast', function() {
            scope.toastText = ToastService.getToastText();
            scope.toastP.innerHTML = scope.toastText;
            scope.showToast();
            $timeout(scope.hideToast, ToastService.toastMillis);
        });

    }

    return {
        restrict: 'E',
        templateUrl: '/scripts/utilities/toast.html',
        link: link
    }
}

// Analytics Service
GiftStarterApp.service("Analytics", ["$window","ABChoices","$rootScope",
    "$location", AnalyticsService]);

function AnalyticsService($window,  ABChoices, $rootScope, $location) {

    this.track = track;

    this.track('client', 'loaded');

    $rootScope.$on('$viewContentLoaded', pathChanged);

    function pathChanged(event) {path($location.path())}

    function path(path) {
        //console && console.log && console.log('AnalyticsService.path: '+path);
        if ($window.ga) {
            $window.ga('send', 'pageview', {page: path});
        }
    }

    function track(service, event, label, value) {
        //console && console.log && console.log('AnalyticsService.track: '+service+' '+event+' '+ABChoices.getString()+' '+value);
        if ($window.ga) {
            $window.ga('send', 'event', service, event,
                ABChoices.getString(), value, {'nonInteraction': 1});
        }
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('HeadController', ['$scope','$location',
    HeadController]);

function HeadController($scope,  $location) {
    var headEle = document.querySelector('head');
    var ogurlMeta = document.createElement('meta');
    ogurlMeta.setAttribute('property', 'og:url');
    ogurlMeta.setAttribute('content', $location.absUrl());
    headEle.appendChild(ogurlMeta);

    $scope.ogurl = $location.absUrl();

    $scope.$on('$routeUpdate', function(next, current) {
        setMeta({property: 'og:url', content: $location.absUrl()});
    });

    function setMeta(metaObj) {
        var metaEle = headEle.querySelector('meta[property="' +
            metaObj.property + '"]');
        metaEle.setAttribute('content', metaObj.content);
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('UserService', ['$http','$rootScope','$cookieStore',
    '$window', '$timeout','FacebookService','TwitterService','GooglePlusService', 'emailLoginService',
    'Analytics', UserService]);

function UserService($http,  $rootScope,  $cookieStore,  $window, $timeout,
                     FacebookService,  TwitterService,  GooglePlusService, emailLoginService,
                     Analytics) {
    this.uid = -1;
    this.loggedIn = false;
    this.name = '';
    this.profileImageUrl  = '';
    this.isStripeCustomer = false;
    this.loginService = '';
    this.onMailingList = false;
    this.email = '';
    this.referrer = {};
    this.hasPitchedIn = false;

    var self = this;

    this.uploadProfileImage = uploadProfileImage;

    this.getUser = function(uid, callback) {
        Analytics.track("user", "user fetch initiated");
        $http({method: 'GET', url: '/users/' + uid + '.json'})
            .success(statFetchSuccess)
            .error(Analytics.track("user", "user fetch failed"));

        function statFetchSuccess(response) {
            Analytics.track("user", "user fetch succeeded");
            callback(response);
        }
    };

    this.isSystemDefaultProfileImage = function(uid, callback) {
        $http({method: 'GET', url: '/users/' + uid + '.json'}).success(
            function(data) {
                var u = data[Object.keys(data)[0]];
                callback(u.is_system_default_profile_image);
            }
        );
    };

    this.registerLogin = function(uid, profileImageUrl, token,
                                  onMailingList, name, has_pitched_in) {
        Analytics.track('login', uid);
        self.uid = uid;
        self.token = token;
        self.name = name;
        self.profileImageUrl = profileImageUrl;
        self.loggedIn = true;
        self.onMailingList = onMailingList;
        self.hasPitchedIn = has_pitched_in;

        $rootScope.uid = uid;
        $rootScope.token = token;

        $cookieStore.put('uid', uid);
        $cookieStore.put('token', token);

        //cookies take time to propagate
        $timeout(function() {
            $rootScope.$broadcast('login-success');
        }, 500);

        if (uid[0] == 'f') {FacebookService.getTaggableFriends()}
    };

    this.logout = function() {
        if (self.loginService === 'facebook') {
            FacebookService.logout();
        } else if (self.loginService === 'twitter') {
            TwitterService.logout();
        } else if (self.loginService === 'googleplus') {
            GooglePlusService.logout();
        } else if (self.loginService === 'emaillogin') {
            emailLoginService.logout();
        }
        self.registerLogout();
    };

    this.registerLogout = function() {
        self.loggedIn = false;
        self.uid = -1;
        self.profileImageUrl = '';

        $rootScope.uid = -1;
        $rootScope.token = -1;

        $cookieStore.remove('uid');
        $cookieStore.remove('token');

        $rootScope.$broadcast('logout-success');
    };

    this.isUserEmailLogin = function() {
        return self.loggedIn && self.uid.substring(0,1).toLowerCase()=='e';
    };

    function uploadProfileImage(imageData) {
        console && console.log && console.log(imageData);
        var contentType = imageData.split(';')[0].replace('data:', '');
        return $http({method: 'PUT', headers: {'Content-Type': contentType},
            url: '/users/' + self.uid + '/img/new.json',
            data: {data: imageData}});
    }

    $rootScope.$on('facebook-login-success', facebookLoggedIn);
    function facebookLoggedIn () {
        Analytics.track('user', 'logged in with facebook');
        self.loginService = 'facebook';
        self.registerLogin(FacebookService.uid, FacebookService.usr_img,
            FacebookService.token, FacebookService.subscribed,
            FacebookService.name, FacebookService.has_pitched_in);
    }
    $rootScope.$on('twitter-login-success', twitterLoggedIn);
    function twitterLoggedIn () {
        Analytics.track('user', 'logged in with twitter');
        self.loginService = 'twitter';
        self.registerLogin(TwitterService.uid, TwitterService.usr_img,
            TwitterService.token, TwitterService.subscribed,
            TwitterService.name, TwitterService.has_pitched_in);
    }
    $rootScope.$on('googleplus-login-success', googleplusLoggedIn);
    function googleplusLoggedIn () {
        Analytics.track('user', 'logged in with googleplus');
        self.loginService = 'googleplus';
        self.registerLogin(GooglePlusService.uid,
            GooglePlusService.usr_img, GooglePlusService.token,
            GooglePlusService.subscribed, GooglePlusService.name,
            GooglePlusService.has_pitched_in);
    }

    $rootScope.$on('email-login-success', emailLoggedIn);
    function emailLoggedIn () {
        Analytics.track('user', 'logged in with email');
        self.loginService = 'emaillogin';
        self.registerLogin(emailLoginService.uid,
            emailLoginService.usr_img, emailLoginService.token,
            emailLoginService.subscribed, emailLoginService.name,
            emailLoginService.has_pitched_in);
    }

    $rootScope.$on('facebook-logout-success', self.registerLogout);
    $rootScope.$on('twitter-logout-success', self.registerLogout);
    $rootScope.$on('googleplus-logout-success', self.registerLogout);
    $rootScope.$on('linkedin-logout-success', self.registerLogout);
    $rootScope.$on('email-logout-success', self.registerLogout);

    if ($window.loginDeets) {
        // base64 decode the name - for unicode chars in names
        $window.loginDeets[4] =  decodeURIComponent(escape(atob($window.loginDeets[4])));
        self.registerLogin.apply(this, $window.loginDeets);
        self.loginService = {f: 'facebook', t:'twitter', g:'googleplus', e:'emaillogin'}[$window.loginDeets[0][0]];
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ProfileController', ['$scope','UserService',
    '$location','Analytics', ProfileController]);

function ProfileController($scope,  UserService,  $location) {
    $scope.user = {};
    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/')+1)
    var imageData;

    UserService.getUser(thisUser,
        function(data) {
            $scope.user = data[Object.keys(data)[0]]
        });

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;
    
    function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .success(function(newImageUrl) {
                $scope.user.img_url = newImageUrl;
                $scope.editMode = false;
            })
            .error(function(reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var UserprofileController = function ($scope, UserService, $location, $http) {

    var urlpath = $location.path();
    var thisUser = urlpath.substring(urlpath.lastIndexOf('/') + 1);
    $scope.user = {};
    $scope.userIdea = {};
    $scope.pitchins_unique = [];

    $http({
        method: 'GET',
        url: '/users/profile/' + thisUser + '.json?ext=giftideas'
    }).success(function (response) {
        $scope.user = response;
        $scope.userIdea = $scope.user.giftideas;
    });

    UserService.getUser(thisUser,
        function (data) {
            $scope.userCampaings = data[Object.keys(data)[0]];
            $scope.pitchins_unique = getUniquePitchIns($scope.userCampaings.pitchins);
    });

    var getUniquePitchIns = function(pitchins) {
        var flags = [], ret = [], l = pitchins.length, i;
        for( i=0; i<l; i++) {
            if( flags[pitchins[i].giftstart_url_title]) continue;
            flags[pitchins[i].giftstart_url_title] = true;
            ret.push(pitchins[i]);
        }
        return ret;
    };

    $scope.giftstartThisUrl = function (title, price, img, url) {
        return '/create?' + urlSerialize({
            product_url: url,
            title: title,
            price: price,
            img_url: img,
            source: 'StoredProduct'
        });
    };

    $scope.DeleteSavedItem = function(idea) {
        idea.loading = true;
        var index = $scope.userIdea.indexOf(idea);
        $scope.userIdea.splice(index, 1);
        $http.post('/users', {
            'uid': $scope.user.uid,
            'action': 'delete-save-for-later',
            'url': idea.url,
            'retailer': idea.retailer,
            'price': idea.price,
            'title': idea.title,
            'imgUrl': idea.img
        })
            .then(function () {
                idea.loading = false;
            }, function () {
                //alert("Error. Please try again.");
            })
    };

    var urlSerialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    $scope.fieldisable = true;
    $scope.blocked = true;
    $scope.quantity = 10;
    $scope.campaingquantity = 3;
    $scope.showMore = true;
    $scope.showMoreCampaign = true;
    $scope.imgloading = false;
    $scope.months = [
        {label: 'Jan', value: 1},
        {label: 'Feb', value: 2},
        {label: 'Mar', value: 3},
        {label: 'Apr', value: 4},
        {label: 'May', value: 5},
        {label: 'Jun', value: 6},
        {label: 'Jul', value: 7},
        {label: 'Aug', value: 8},
        {label: 'Sep', value: 9},
        {label: 'Oct', value: 10},
        {label: 'Nov', value: 11},
        {label: 'Dec', value: 12}
    ];
    var imageData;

    $scope.editable = thisUser == UserService.uid;
    $scope.imageSet = false;
    $scope.user.error_message = "";

    $scope.imageUpdated = imageUpdated;
    $scope.submit = submit;


    $scope.validateLinks = function () {
        $scope.user.link_facebook = addProtocol($scope.user.link_facebook);
        $scope.user.link_twitter = addProtocol($scope.user.link_twitter);
        $scope.user.link_linkedin = addProtocol($scope.user.link_linkedin);
        $scope.user.link_googleplus = addProtocol($scope.user.link_googleplus);
        $scope.user.link_website = addProtocol($scope.user.link_website);
    };

    $scope.$on('logout-success', function() {
            $scope.editable = false;
        }
    );

    var addProtocol = function (link) {
        if (link) {
            link = link.trim().toLowerCase();
            if (link != "" && link.indexOf("http://") < 0 && link.indexOf("https://") < 0) {
                link = "http://" + link;
            }
        }
        return link;
    };

    function imageUpdated(data) {
        $scope.imageSet = true;
        imageData = data;
    }

    function submit() {
        UserService.uploadProfileImage(imageData)
            .then(function (newImageUrl) {
                $scope.user.img_url = newImageUrl.data;
                $scope.editMode = false;
            }, function (reason) {
                console && console.log && console.log('Failed to update profile image', reason);
                $scope.editMode = false;
            });
    }

    $scope.goToLink = function(destination) {
        $location.path("/" + destination);
    };

};

app.controller('UserprofileController', ['$scope','UserService', '$location', '$http', 'Analytics', UserprofileController]);

}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

var gsUserEdit = function ($http, UserService, Analytics) {
    function link(scope, elm, attrs, userProfileform) {
        scope.canEdit = true;
        scope.editUserFields = function () {
            if (!scope.userinfo && scope.blocked) {
                scope.copyUser = angular.copy(scope.user);
                scope.fieldisable = false;
                scope.canEdit = false;
            }
            else if (scope.userinfo && scope.fieldisable) {
                scope.copyUserInfo = angular.copy(scope.user);
                scope.canEdit = false;
                scope.blocked = false;
            }
        };

        scope.cancelEdit = function () {
            scope.canEdit = true;
            scope.user.error_message = "";
            scope.fieldisable = true;
            if (!scope.userinfo) {
                scope.user.name = angular.copy(scope.copyUser.name);
                scope.user.email = angular.copy(scope.copyUser.email);
                scope.user.shipping_address = angular.copy(scope.copyUser.shipping_address);
                scope.user.shipping_city = angular.copy(scope.copyUser.shipping_city);
                scope.user.shipping_state = angular.copy(scope.copyUser.shipping_state);
            } else if (scope.userinfo && scope.fieldisable) {
                scope.user.name = angular.copy(scope.copyUserInfo.name);
                scope.user.link_facebook = angular.copy(scope.copyUserInfo.link_facebook);
                scope.user.link_twitter = angular.copy(scope.copyUserInfo.link_twitter);
                scope.user.link_linkedin = angular.copy(scope.copyUserInfo.link_linkedin);
                scope.user.link_googleplus = angular.copy(scope.copyUserInfo.link_googleplus);
                scope.user.link_website = angular.copy(scope.copyUserInfo.link_website);
                scope.user.birth_month = angular.copy(scope.copyUserInfo.birth_month);
                scope.user.birth_day = angular.copy(scope.copyUserInfo.birth_day);
            }
            scope.blocked = true;
        };

        scope.saveInput = function () {
            scope.loading = true;
            scope.user.error_message = "";
            if (userProfileform.$valid) {
                $http.post('/users', {
                    'uid': scope.user.uid,
                    'action': 'update-profile',
                    name: scope.user.name,
                    email: scope.user.email,
                    link_facebook: scope.user.link_facebook,
                    link_twitter: scope.user.link_twitter,
                    link_linkedin: scope.user.link_linkedin,
                    link_googleplus: scope.user.link_googleplus,
                    link_website: scope.user.link_website,
                    phone: scope.user.phone,
                    shipping_address: scope.user.shipping_address,
                    birth_day: scope.user.birth_day,
                    birth_month: scope.user.birth_month,
                    shipping_city: scope.user.shipping_city,
                    shipping_state: scope.user.shipping_state,
                    shipping_zip: scope.user.shipping_zip
                })
                    .then(function (res) {
                        scope.loading = false;
                    }, function (errorRes) {
                        scope.user.error_message = "Error. Please try again.";
                        userProfileform.$invalid = true;
                    });
                scope.canEdit = true;
                scope.fieldisable = true;
                scope.blocked = true;
            }
            else {
                scope.user.error_message = "It looks like some of your info is incorrect; please try again.";
                scope.loading = false;
                scope.canEdit = false;
                scope.fieldisable = false;
            }
        };

        scope.$on('logout-success', function() {
            scope.canEdit = true;
            scope.fieldisable = true;
            scope.blocked = true;
        }
    );

    }

    return {
        scope: {
            fieldisable: "=",
            user: "=",
            userinfo: "=",
            blocked: "=",
            loading: "="
        },
        require: '^form',
        link: link,
        templateUrl: '/scripts/user/user_profile_edit.ng.html',
        restrict: 'E'
    }

};

    app.directive('gsUserEdit', ['$http', 'UserService', 'Analytics', gsUserEdit]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('InspirationalExamplesController', ['$scope','$timeout',
    InspirationalExamplesController]);

function InspirationalExamplesController($scope, $timeout) {
    var product = function(image, price, title, product, numPeople, link, desc) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.product = product;
        this.numPeople = numPeople;
        this.link = link;
        this.desc = desc;
    };
    $scope.products = [
        new product(
            "/assets/howitworks/featuredCampaigns-julep.jpg",
            "$146.25",
            "6 months of seasonal beauty products for Marion's birthday",
            "6 Boxes of Julep Maven",
            "11",
            "https://www.giftstarter.com/giftstart/6-months-of-seasonal-beauty-products-for-Marions-birthday",
            "/assets/inspirationalexamples/6-months-of-beauty.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-cigars.jpg",
            "$122.28",
            "T1 HIMARS Smoke Break",
            "Gurkha Special Ops",
            "3",
            "https://www.giftstarter.com/giftstart/T1-HIMARS-Smoke-Break",
            "/assets/inspirationalexamples/t1-himars-smoke-break.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-tiffanys.jpg",
            "$147.20",
            "Jessi's 30th Birthday Blowout!",
            "TIFFANY 1837™ Circle Pendant",
            "7",
            "https://www.giftstarter.com/giftstart/Jessis-30th-Birthday-Blowout",
            "/assets/inspirationalexamples/jessi-30th-birthday-blowout.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-ghosttruck.jpg",
            "$448.80",
            "Let's help Wix move!",
            "Gift of Moving by Ghostruck (1br move within 30 mi of Seattle)",
            "15",
            "https://www.giftstarter.com/giftstart/Lets-help-Wix-move",
            "/assets/inspirationalexamples/lets-help-wix-move.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-lens.jpg",
            "$1,270.08",
            "Just when you thought Quinn and Silas' pictures couldn't get any more amazing...",
            "Canon EF 135mm f/2L USM Lens for Canon SLR Cameras",
            "8",
            "https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing",
            "/assets/inspirationalexamples/just-when-you-thought.png"
        ),
        new product(
            "/assets/howitworks/featuredCampaigns-watch.jpg",
            "$329.52",
            "Run Nikki Run!!!",
            "Garmin Forerunner 220 - Black/Red Bundle (Includes Heart Rate Monitor)",
            "11",
            "https://www.giftstarter.com/giftstart/Run-Nikki-Run",
            "/assets/inspirationalexamples/run-nikki-run.png"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    $scope.thirdProduct = $scope.products[(n+2)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(1000, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(1000, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
                jQuery('.product-item.third').fadeOut(1000, function() {
                    $scope.$apply(function() {$scope.thirdProduct = $scope.products[(n+2)%$scope.products.length]});
                    jQuery('.product-item.third').fadeIn(2000);
                });
            });
            jQuery('.product-item.first').fadeIn(2000);
            jQuery('.product-item.second').fadeIn(2000);
            timer = $timeout(rotate, 12000);
        });
    };
    var timer = $timeout(rotate, 12000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('FacebookService', ['ezfb', '$http', '$rootScope',
    '$location', '$window', 'AppStateService', '$q', FacebookService]);

function FacebookService(ezfb,  $http,  $rootScope,  $location,  $window,
                         AppStateService, $q) {
    var self = this;

    this.uid = -1;
    this.usr_img = '';
    this.name = '';
    this.token = '';
    this.taggableFriends = [];

    this.getTaggableFriends = getTaggableFriends;

    this.loginCallback = function(response) {
        if (response.status === 'connected') {
            self.getLongTermToken(response.authResponse.accessToken,
                response.authResponse.userID);
        }
    };

    this.login = function() {
        AppStateService.set('login_service', 'facebook');
        var url = 'https://www.facebook.com/dialog/oauth' +
            '?client_id=' + window.fbAppId +
            '&response_type=code' +
            '&redirect_uri=' + $window.location.protocol + '//' +
            $window.location.host +
            '&state=' + AppStateService.base64State() +
            '&scope=public_profile,email,user_friends'; //user_birthday
        console&console.log&&console.log("FB URL: "+url)&&console.log("\n\n\n");
        $window.open(url, '_self');
    };

    this.checkSharePermission = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'has-share-auth', service: 'facebook'}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    this.getSharePermissionUrl = function() {
        AppStateService.set('login_service', 'facebook');
        var url = 'https://www.facebook.com/dialog/oauth' +
            '?client_id=' + window.fbAppId +
            '&response_type=code' +
            '&redirect_uri=' + $window.location.protocol + '//' +
            $window.location.host +
            '&state=' + AppStateService.base64StateForSharing() +
            '&scope=publish_actions'; //user_birthday
        return url;
    };

    this.doShare = function(message, link, linkName) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'facebook',
                    message: message, link: link, link_name: linkName}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    this.getLongTermToken = function(token) {
        $http({method: 'POST', url: '/users',
            data: {service: 'facebook', action: 'get-long-term-token',
                auth_token: token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}
        })
            .success(function(data) {
                self.uid = data['uid'];
                self.name = data['name'];
                self.usr_img = data['usr_img'];
                self.token = data['token'];
                self.subscribed = data['on_mailing_list'];
                self.has_pitched_in = data['has_pitched_in'];
                $rootScope.$broadcast('facebook-login-success');
            })
    };

    this.logout = function() {
        // TODO: logout doesn't work due to X FRAME restriction...
        // Facebook is trying to go to facebook.com/home.php?
        $rootScope.$broadcast('facebook-logout-success');
    };

    this.inviteFriends = function(uid, method) {
        $window.FB.Canvas.setAutoGrow();
        method = (typeof method === 'undefined') ? 'send' : method;
        ga(method, 'event', 'share campaign', 'facebook');

        if (!device.mobile() && !device.tablet()) {
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'facebook',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
            })));
            ezfb.ui({method: method, link: $location.absUrl(), href: $location.absUrl(),
                app_id: ezfb.app_id});
            $location.search('re', null);
        } else {
            var shareUrl = 'https://www.facebook.com/sharer/sharer.php';
            var parameters = "?u=" + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.location.href = shareUrl + parameters;
        }
    };

    function getTaggableFriends() {
        return $q(function(resolve, reject) {
            if (self.taggableFriends.length) {
                resolve(self.taggableFriends);
            } else {
                fetchTaggableFriends(resolve, reject);
            }
        });
    }

    function fetchTaggableFriends(resolve, reject) {
        var uid = 'me';
        // TODO: use better abstraction than direct access of inserted token
        return $http({method: 'GET', url: 'https://graph.facebook.com/' +
            uid + '/taggable_friends' + '?access_token=' +
            window.loginDeets[2]})
            .success(function(response) {
                self.taggableFriends = response.data;
                resolve(response.data);
            })
            .error(reject);
    }

    if (AppStateService.fbAuthResponse) {
        self.getLongTermToken(AppStateService.fbAuthResponse.access_token);
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('TwitterService', [
            '$http','$rootScope','$window','$location','$q','AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q,  AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        this.verifier = '';
        this.auth_url = '';
        this.oauth_token = '';

        var self = this;

        this.login = function() {
            $window.open(self.auth_url, '_self');
        };

        this.logout = function() {
            // TODO: actually log out...?
            $rootScope.$broadcast('twitter-logout-success');
        };

        this.share = function() {
            ga('send', 'event', 'share campaign', 'twitter');
            var shareUrl = 'https://twitter.com/share';
            var parameters = "?url=" + encodeURIComponent($location.absUrl().split('#')[0]) +
                "&text="+encodeURIComponent("Help us gift #together on @GiftStarter! It's easy! Simply purchase 1 or more tiles on the #gift. #GiftsMatter");
            $window.open(shareUrl + parameters);
        };

        this.submitVerifier = function() {
            $http({method: 'POST', url: '/users', data: {
                action: 'submit-verifier', service: 'twitter',
                verifier: self.verfier, oauth_token: self.oauth_token,
                location: $location.path() + $window.location.search,
                referrer: AppStateService.referrer}})
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('twitter-login-success');
                })
                .error(function(data) {console && console.log && console.log(data);});
        };


        this.getAuthUrl = function(successCallback, failureCallback) {
            var deferred = $q.defer();
            AppStateService.set('login_service', 'twitter');
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-auth-url', service: 'twitter',
                    redirect_url: AppStateService.getOauthRedirectUrl()}})
                    .success(function(data) {
                        self.auth_url = data['url'];
                        deferred.resolve(self.auth_url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                    return deferred.promise
                };
            return doDeferred()
        };

        this.checkSharePermission = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'has-share-auth', service: 'twitter'}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };


        this.getSharePermissionUrl = function() {
            var deferred = $q.defer();
            var doDeferred = function() {
                AppStateService.set('login_service', 'twitter');
                $http({method: 'POST', url: '/users', data: {
                    action: 'get-share-auth-url', service: 'twitter',
                    redirect_url: AppStateService.getOauthRedirectUrlForSharing()}})
                    .success(function(data) {
                        deferred.resolve(data.url);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

        this.doShare = function(message, link) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'twitter',
                    link: link, message: message}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

        function twitterOauthCallback(oauthToken, oauthVerifier) {
            self.oauth_token = oauthToken;
            self.verfier = oauthVerifier;
            self.submitVerifier();
        }

        if (AppStateService.oauthToken) {
            twitterOauthCallback(AppStateService.oauthToken,
                AppStateService.oauthVerifier);
        }
    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GooglePlusService', [
            '$http','$rootScope','$window','$location', '$q', 'AppStateService',
    function($http,  $rootScope,  $window,  $location,  $q, AppStateService) {

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var self = this;

        this.loginCallback = function(authResponse) {
            // Receive access_token, id_token, and one-time code
            // Send one-time code to server
            self.authResponse = authResponse;
            self.submitOneTimeCode();
        };

        this.submitOneTimeCode = function() {
            // Get app state data from auth response
            self.gplus_code_request = {method: 'POST', url: '/users',
                data: {service: 'googleplus', action: 'submit-one-time-code',
                    auth_response: self.authResponse,
                    location: $location.path() + $window.location.search,
                    redirect_url: $window.location.protocol + '//' +
                        $window.location.host + '/',
                    referrer: AppStateService.referrer}};
            $http(self.gplus_code_request)
                .success(function(data) {
                    self.uid = data['uid'];
                    self.name = data['name'];
                    self.usr_img = data['usr_img'];
                    self.token = data['token'];
                    self.subscribed = data['on_mailing_list'];
                    self.has_pitched_in = data['has_pitched_in'];
                    $rootScope.$broadcast('googleplus-login-success');
                })
                .error(function(data) {console && console.log && console.log(data)});
            self.loginRequested = false;
        };

        this.login = function() {
            AppStateService.set('login_service', 'googleplus');
            self.auth_url = 'https://accounts.google.com/o/oauth2/auth' +
                '?scope=' + encodeURIComponent(
                'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email') +
                '&client_id=' +
                encodeURIComponent($window.googlePlusClientId) +
                '&redirect_uri=' +
                encodeURIComponent($window.location.protocol + '//' +
                    $window.location.host + '/') +
                '&response_type=code' +
                '&state=' + AppStateService.base64State() +
                '&access_type=offline';
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        //this.checkSharePermission = function() {
        //        var deferred = $q.defer();
        //        var doDeferred = function() {
        //            $http({method: 'POST', url: '/users', data: {
        //                action: 'has-share-auth', service: 'googleplus'}})
        //                .success(function(data) {
        //                    deferred.resolve(data);
        //                })
        //                .error(function(data) {
        //                    console && console.log && console.log(data);
        //                    deferred.reject(data);
        //                });
        //            return deferred.promise
        //        };
        //        return doDeferred();
        //    };

        //this.getSharePermissionUrl = function() {
        //    AppStateService.set('login_service', 'googleplus');
        //    url = 'https://accounts.google.com/o/oauth2/auth' +
        //        '?scope=' + encodeURIComponent(
        //        'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.stream.write') +
        //        '&client_id=' +
        //        encodeURIComponent($window.googlePlusClientId) +
        //        '&redirect_uri=' +
        //        encodeURIComponent($window.location.protocol + '//' +
        //            $window.location.host + '/') +
        //        '&response_type=code' +
        //        '&state=' + AppStateService.base64StateForSharing() +
        //        '&access_type=offline';
        //    return url;
        //};

        //this.doShare = function(message) {
        //    var deferred = $q.defer();
        //    var doDeferred = function() {
        //        $http({method: 'POST', url: '/users', data: {
        //            action: 'do-share', service: 'googleplus',
        //            message: message}})
        //            .success(function(data) {
        //                deferred.resolve(data);
        //            })
        //            .error(function(data) {
        //                console && console.log && console.log(data);
        //                deferred.reject(data);
        //            });
        //        return deferred.promise
        //    };
        //    return doDeferred();
        //};

        this.logout = function() {
            $rootScope.$broadcast('googleplus-logout-success');
        };

        this.share = function(uid) {
            ga('send', 'event', 'share campaign', 'googleplus');
            var shareUrl = 'https://plus.google.com/share';
            $location.search('re', btoa(JSON.stringify({
                type: 'consumer',
                uid: uid,
                channel: 'googleplus',
                uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
                    function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    }
                )
            })));
            var parameters = '?url=' + encodeURIComponent($location.absUrl().split('#')[0]);
            $window.open(shareUrl + parameters);
            $location.search('re', null);
        };

        if (AppStateService.gplusAuthResponse) {
            self.loginCallback(AppStateService.gplusAuthResponse);
        }

    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LinkedInService', [
            '$http','$rootScope','$window','$location','AppStateService', '$q',
    function($http,  $rootScope,  $window,  $location,  AppStateService, $q) {
        var self = this;

        this.login = function() {
            AppStateService.set('login_service', 'linkedin');
            self.auth_url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64State();
            self.auth_window = $window.open(self.auth_url, '_self');
            self.loginRequested = true;
        };

        this.logout = function() {
            $rootScope.$broadcast('linkedin-logout-success');
        };

        this.checkSharePermission = function() {
                var deferred = $q.defer();
                var doDeferred = function() {
                    $http({method: 'POST', url: '/users', data: {
                        action: 'has-share-auth', service: 'linkedin'}})
                        .success(function(data) {
                            deferred.resolve(data);
                        })
                        .error(function(data) {
                            console && console.log && console.log(data);
                            deferred.reject(data);
                        });
                    return deferred.promise
                };
                return doDeferred();
            };

        this.getSharePermissionUrl = function() {
            AppStateService.set('login_service', 'linkedin');
            var url = 'https://www.linkedin.com/uas/oauth2/authorization' +
                '?scope=' + encodeURIComponent('r_basicprofile r_emailaddress w_share') +
                '&client_id=' + encodeURIComponent($window.linkedInClientId) +
                '&redirect_uri=' + encodeURIComponent($window.location.protocol + '//' + $window.location.host) + //no trailing slash!
                '&response_type=code' +
                '&state=' + AppStateService.base64StateForSharing();
            return url
        };

        this.doShare = function(message, link, linkName) {
            var deferred = $q.defer();
            var doDeferred = function() {
                $http({method: 'POST', url: '/users', data: {
                    action: 'do-share', service: 'linkedin',
                    message: message, link: link, link_name: linkName}})
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        console && console.log && console.log(data);
                        deferred.reject(data);
                    });
                return deferred.promise
            };
            return doDeferred();
        };

    }
]);

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var EmailLoginService = function ($http, $q, $rootScope) {

        var self = this;

        this.uid = -1;
        this.usr_img = '';
        this.name = '';
        this.token = '';

        var urls = {
                create: '/login/email/create',
                forgotPassword: '/login/email/requestreset',
                login: '/login/email/login',
                reset: '/login/email/reset'
            },
            uid = '';

        var login = function (mode, emailname, email, password, resetCode) {
            var deferred = $q.defer();

            $http.post(
                urls[mode], {
                    emailname: emailname,
                    email: email,
                    password: password,
                    code: resetCode
                }).
                success(function (response) {
                    var resObj = response;
                    if (resObj['ok']) {
                        if (mode === 'login') {
                            var data = resObj['ok'];
                            self.uid = data['uid'];
                            self.usr_img = data['usr_img'];
                            self.name = data['name'];
                            self.token = data['token'];
                            self.subscribed = data['on_mailing_list'];
                            self.has_pitched_in = data['has_pitched_in'];
                            $rootScope.$broadcast('email-login-success');
                        }
                        deferred.resolve(resObj['ok']);
                    } else {
                        deferred.reject(resObj['error']);
                    }
                }).
                error(function () {
                    deferred.reject('We are having technical problems.  Please try again later.');
                });

            return deferred.promise;
        };

        var logout = function () {
            $rootScope.$broadcast('email-logout-success');
        };

        this.login = login;
        this.logout = logout;
    };

    app.service('emailLoginService', ['$http', '$q', '$rootScope', EmailLoginService])
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

    var LoginOrCreateController = function ($scope, $rootScope, $location, $routeParams, $timeout, $http, AppStateService, UserService, TwitterService,
                                            FacebookService, LinkedInService, GooglePlusService, emailLoginService, Analytics) {

        $scope.working = false;
        if (typeof($scope.showCreate) == 'undefined') {
            $scope.showCreate = true; //override via ng-repeat="showCreate in [true]" during ng-include
        }
        $scope.showForgot = false;
        $scope.showReset = false;
        if (typeof($scope.showSocials) == 'undefined') {
            $scope.showSocials = true; //override via ng-repeat="showSocials in [true]" during ng-include
        }
        $scope.name;
        $scope.surname;
        $scope.email;
        //$scope.reenteremail;
        $scope.password;
        $scope.showPassword;
        //$scope.reenterpassword;
        $scope.message;
        $scope.resetCode;

        $scope.resetForm = function() {
            $scope.name='';
            $scope.surname='';
            $scope.email='';
            //$scope.reenteremail='';
            $scope.password='';
            $scope.showPassword=false;
            //$scope.reenterpassword='';
            $scope.message='';
            $scope.resetCode='';
        };
        $scope.resetForm();

        if(UserService.loggedIn) {
            jQuery('.userlogin').css({display:"none"});
        }

        function doSocialLogin(successFunction, maxRetries) {
            maxRetries = typeof maxRetries !== 'undefined' ? maxRetries : 3;
            if(AppStateService.get('staged_giftstart')) {
                console && console.log && console.log("staged-create: " + AppStateService.get('staged_giftstart')['staging_uuid']);
                $http.post('/giftstart/create.json', AppStateService.get('staged_giftstart'))
                    .success(function (response) {
                        AppStateService.remove('staged_giftstart');
                        AppStateService.setPath($location.path());
                        successFunction();
                    })
                    .error(function () {
                        if(maxRetries>0)
                        console && console.log && console.log("Error while staging GiftStart; retrying...");
                        doSocialLogin(successFunction, maxRetries-1);
                    });
            } else {
                successFunction();
            }
        }

        $scope.doLoginFacebook = function() {
            doSocialLogin(FacebookService.login);
        };
        $scope.doLoginTwitter = function() {
            doSocialLogin(function() {
                TwitterService.getAuthUrl().then(function(url) {
                    TwitterService.login();
                });
            });
        };
        $scope.doLoginGoogleplus = function() {
            doSocialLogin(GooglePlusService.login);
        };
        $scope.doLoginLinkedin = function() {
            doSocialLogin(LinkedInService.login);
        };
        $scope.doLoginEmail = function() {
            Analytics.track('user', 'login attempt with email');
            $scope.working = true;
            emailLoginService.login('login','',$scope.email,$scope.password,'').
                then(function (okMsg) {
                    //reset handled by $scope.$on('login-success')
                }, function (errMsg) {
                    $scope.working = false;
                    $scope.message=errMsg;
                });
        };

        $scope.doCreateEmail = function() {
            Analytics.track('user', 'create email login');
            //if ($scope.email.trim()!=$scope.reenteremail.trim()) {
            //    $scope.message="Your email addresses do not match";
            //    return;
            //}
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
            $scope.working = true;
            emailLoginService.login('create',$scope.name+' '+$scope.surname,$scope.email,$scope.password,'').
                then(function (okMsg) {
                    emailLoginService.login('login','',$scope.email,$scope.password,'')
                }, function (errMsg) {
                    $scope.working = false;
                    $scope.message=errMsg;
                });
        };

        $scope.doForgotPassword = function() {
            Analytics.track('user', 'forgot login password');
            $scope.working = true;
            emailLoginService.login('forgotPassword','',$scope.email,'','').
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.doResetPassword = function() {
            //if ($scope.password.trim()!=$scope.reenterpassword.trim()) {
            //    $scope.message="Your passwords do not match";
            //    return;
            //}
            Analytics.track('user', 'reset login password');
            $scope.working = true;
            emailLoginService.login('reset','',$scope.email,$scope.password,$scope.resetCode).
                then(function (okMsg) {
                    $scope.message=okMsg;
                    $scope.showForgot = false;
                    $scope.working = false;
                    //$timeout(function(){$rootScope.$broadcast('header-show-login')},3000);
                    //jQuery('.userlogin').fadeOut(3000);
                    //jQuery('.userlogin').fadeIn(1500);
                    $scope.doLoginEmail();
                }, function (errMsg) {
                    $scope.message=errMsg;
                    $scope.working = false;
                });
        };

        $scope.$on('logout-success', function() {
            jQuery('.userlogin').fadeIn(1500);
            $scope.resetForm();
        });

        $scope.$on('hide-login-socials', function() {
            $scope.showSocials = false;
        });

        $scope.$on('login-success', function() {
            $scope.resetForm();
            $scope.message=UserService.name?("Welcome, "+UserService.name+"!"):"Welcome!";
            $timeout(function(){$rootScope.$broadcast('header-close-login')},3000);
            jQuery('.userlogin').fadeOut(3000);
            $scope.working = false;
        });

        $rootScope.$on('loginbox-show-login', function(){
            $scope.resetForm();
            $scope.showCreate = false;
            $scope.showReset = false;
            setTimeout(function() {jQuery('.loginwrapper .userlogin__email').focus();}, 0);
        });

        $rootScope.$on('loginbox-show-reset', function() {
            $scope.resetForm();
            $scope.resetCode = $routeParams.resetCode;
            $scope.showCreate = false;
            $scope.showReset = true;
        });

    };

    app.controller('LoginOrCreateController', [
        '$scope', '$rootScope', '$location', '$routeParams', '$timeout', '$http', 'AppStateService', 'UserService', 'TwitterService', 'FacebookService',
        'LinkedInService','GooglePlusService', 'emailLoginService', 'Analytics',
        LoginOrCreateController]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GiftStartService', [
    '$http','$location','UserService','$rootScope', 'PopoverService','$window',
    'Analytics','AppStateService', '$resource',
     GiftStartService]);

function GiftStartService($http,  $location,  UserService,  $rootScope,
                          PopoverService,  $window,  Analytics,
                          AppStateService, $resource) {

    var GiftStart = $resource('/giftstart/:key.json');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    newPitchIns;

    this.giftStart = {};

    this.payment = {
        gsid: -1,
        parts: [],
        note: '',
        stripeResponse: {},
        emailAddress: '',
        subscribe: false,
        firstName: '',
        lastName: ''
    };

    this.pitchIns = [];
    this.pitchInsInitialized = false;

    this.lastCheckedMilliseconds = new Date().getTime();
    this.updateInterval = 3*1000;

    // Shipping/Contact Info
    this.shippingName = '';
    this.shippingEmail = '';
    this.shippingAddress = '';
    this.shippingCity = '';
    this.shippingState = '';
    this.shippingZip = '';
    this.shippingPhoneNumber = '';
    this.shippingEmail = '';
    this.gcName = '';
    this.gcPhoneNumber = '';
    this.gcEmail = '';

    // Campaign Details
    this.title = '';
    this.description = '';
    this.coupon = '';
    this.specialNotes = '';
    this.productImgUrl = '';
    this.productTitle = '';
    this.retailerLogo = '';
    this.rows = 3;
    this.columns = 3;
    this.productPrice = 0;
    this.salesTax = 0;
    this.shipping = 0;
    this.serviceFee = 0;
    this.totalPrice = 0;
    this.campaignLength = 0;
    this.newPitchIn = {};
    // Thanks data
    this.thanks_img = {};

    // Restore from state
    this.preselectedParts = [];
    if (AppStateService.get('selectedParts')) {
        this.preselectedParts = AppStateService.get('selectedParts');
        AppStateService.remove('selectedParts');
    }

    var self = this;

    var linkReplacerRegex = /(https?:\/\/(([-\w\.]+)+(:\d+)?(\/([-\w\/_\.]*(\?\S+)?)?)?))/g;

    this.makeLinks = function() {
        jQuery('.makelinks').each(function() {
            var thishtml=jQuery(this).html();
            if(thishtml.indexOf('<a')<0) {
                jQuery(this).html(thishtml.replace(linkReplacerRegex, "<a href=\"$1\" title=\"\" target=\"_blank\">$1</a>"));
            }
        })
    };

    this.createGiftStart = function() {
        console&&console.log&&console.log("createGiftStart");
        Analytics.track('campaign', 'created');
        // Check to see that name is populated (for fb-login it is not yet)
        if (!self.gcName) {self.gcName = UserService.name}

        self.giftStart = self.buildGiftStart();
        self.pitchInsInitialized = false;
        return $http({method: 'POST', url: '/giftstart/create.json',
            data: self.giftStart})
            .success(function(data) {
                self.inflateGiftStart(data);
            })
            .error(function(reason) {
                console && console.log && console.log(reason);
                Analytics.track('campaign', 'campaign create failed');
            });
    };

    this.buildGiftStart = function() {
        return {
            title: self.title,
            description: self.description,
            coupon: self.coupon,
            special_notes: self.specialNotes,
            gift_champion_uid: UserService.uid,
            product_price: self.productPrice,
            sales_tax: self.salesTax,
            shipping: self.shipping,
            service_fee: self.serviceFee,
            total_price: self.totalPrice,
            campaign_length: self.campaignLength,
            product_img_url: self.productImgUrl,
            product_url: self.productUrl,
            product_title: self.productTitle,
            retailer_logo: self.retailerLogo,
            totalSelection: 0,
            funded: 0,
            parts: self.makeParts(self.rows * self.columns, self.totalPrice),
            rows: self.rows,
            columns: self.columns,
            gc_phone_number: self.gcPhoneNumber,
            gc_email: self.gcEmail,
            gc_name: self.gcName,
            shipping_name: self.shippingName,
            shipping_email: self.shippingEmail,
            shipping_address: self.shippingAddress,
            shipping_city: self.shippingCity,
            shipping_state: self.shippingState,
            shipping_zip: self.shippingZip,
            shipping_phone_number: self.shippingPhoneNumber
        };
    };

    this.makeParts = function(numParts, totalPrice) {
        function injectPartToggles(parts) {
            function makePartToggle(i) {
                var ti = i;
                return function () {
                    if (!parts[ti].bought && !parts[ti].disabled) {
                        // If selected is none, this will force it into a bool
                        parts[ti].selected = (parts[ti].selected == false);
                        Analytics.track('campaign', 'overlay part toggled');
                        self.updateSelected();
                    }
//                        if (parts[ti].bought) {
//                            Analytics.track('client',
//                                'go to user page from overlay');
//                            self.goToUserPage(parts[ti].uid);
//                        }
                }
            }

            for (var i = 0; i < parts.length; i++) {
                parts[i].toggle = makePartToggle(i);
            }
        }

        var tempParts = [];
        for (var i = 0; i < numParts; i++) {
            var selected = self.preselectedParts.indexOf(i) > -1;
            tempParts.push({
                bought: false,
                disabled: false,
                selected: selected,
                part_id: i,
                value: Math.floor(totalPrice/numParts)
            });
        }

        injectPartToggles(tempParts);

        return tempParts;
    };

    this.disableParts = function() {
        function disablePart(part) {part.disabled = !part.bought;}
        self.giftStart.parts.map(disablePart);
    };

    function getSelectedParts() {
        var selected = [];
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                selected.push(i);
            }
        }
        return selected;
    }

    this.updateSelected = function() {
        self.giftStart.totalSelection = 0;
        self.giftStart.nSelected = 0;
        self.giftStart.nBought = 0;
        self.giftStart.nTotal = 0;
        self.giftStart.remaining = 0;
        self.giftStart.funded = 0;
        self.giftStart.parts.map(function(part) {
            self.giftStart.totalSelection += part.value * part.selected;
            self.giftStart.nSelected += 1 * part.selected;
            self.giftStart.nBought += 1 * part.bought;
            self.giftStart.nTotal += 1;
            self.giftStart.remaining += part.value *
                !(part.selected || part.bought);
            self.giftStart.funded += part.value * part.bought;
        });
        AppStateService.overlayState(getSelectedParts());
        $rootScope.$broadcast('selection-changed');
    };

    this.fetchGiftStart = function(url_title) {
        console && console.log && console.log("fetchGiftStart: "+url_title);
        function fetchSuccess(data) {self.inflateGiftStart(data)}
        function fetchError(reason) {Analytics.track('campaign',
            'campaign fetch failed')}
        $http({method: 'GET', url: '/giftstart/' + url_title + '.json'})
            .success(function(data) {self.inflateGiftStart(data)})
            .error(function(){Analytics.track('campaign',
                'campaign fetch failed')});
    };

    this.inflateGiftStart = function(giftstart) {
        console && console.log && console.log("inflateGiftStart "+giftstart.giftstart_url_title);
        Analytics.track('campaign', 'campaign enabled');

        self.giftStart = giftstart;

        self.giftStart.parts = self.makeParts(self.giftStart.rows *
                self.giftStart.columns,
            self.giftStart.total_price);
        self.updateSelected();

        if (!(/\/giftstart\//.test($location.path()))) {
            console && console.log && console.log(location.pathname);
            $location.path('/giftstart/' + giftstart.giftstart_url_title);
        }

        self.syncPitchIns('GiftStartService');

        setTimeout(self.makeLinks,2000);

        $rootScope.$broadcast('giftstart-loaded');
    };

    this.saveNote = function(noteText, name) {
        self.payment.note = noteText;
        self.payment.firstName = name;
        var data = {payment: self.payment, action: 'pitch-in-note-update',
            uid: UserService.uid};
        $http({method: 'POST', url: '/pay', data: data})
            .success(function (resp) {
                self.newPitchIn = resp;
                self.payment.note = "";
                self.payment.firstName = "";
                $rootScope.$broadcast('note-saved');
            });
    };

    this.saveImage = function(imageUrl) {
        var data = {payment: self.payment, action: 'pitch-in-img-update',
            uid: UserService.uid, imgurl:imageUrl};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.uploadImage = function(imageData) {
        var contentType = imageData.split(';')[0].replace('data:', '');
        var data = {payment: self.payment, action: 'pitch-in-img-upload',
            uid: UserService.uid, contenttype: contentType, imgdata: imageData};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.attachStripeResponse = function(response) {
        self.payment.stripeResponse = response;
        self.payment.gsid = self.giftStart.gsid;
        self.payment.parts = [];
        for (var i=0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                self.payment.parts.push(self.giftStart.parts[i].part_id);
            }
        }
    };

    this.attachCardData = function(number,cvc,expiry,addressZip) {
        self.payment.cardData = {number:number,cvc:cvc,expiry:expiry,zip:addressZip};
        self.payment.gsid = self.giftStart.gsid;
        self.payment.parts = [];
        for (var i=0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                self.payment.parts.push(self.giftStart.parts[i].part_id);
            }
        }
    };

    this.sendPayment = function(callback) {
        var data = {payment: self.payment, action: 'pitch-in',
            uid: UserService.uid};
        if (self.payment.subscribe) {
            Analytics.track('pitchin', 'subscribed to mailing list');
        }
        if (self.payment.saveCreditCard) {
            Analytics.track('pitchin', 'save credit card');
        }
        $http({method: 'POST', url: '/pay',
            data: data})
            .success(function(data) {
                self.paymentSuccess(data);
                if (callback) {callback(data)}
            })
            .error(function(data) {
                self.paymentFailure(data);
                if (callback) {callback(data)}
            });
    };

    this.payWithFingerprint = function(fingerprint) {
        self.attachStripeResponse('');
        return $http({method: 'POST', url: '/pay',
            data: {fingerprint: fingerprint, action: 'pitch-in',
                subscribe: self.payment.subscribe, payment: self.payment,
                uid: UserService.uid}})
            .success(self.paymentSuccess)
            .error(self.paymentFailure);
    };

    this.showOverlay = function() {$rootScope.$broadcast('show-overlay');};
    this.hideOverlay = function() {$rootScope.$broadcast('hide-overlay');};

    this.paymentSuccess = function(data) {
        if (!data['payment-error']) {
            self.syncPitchIns('GiftStartService');
            self.updateSelected();
            $rootScope.$broadcast('payment-success');
        }
    };

    this.paymentFailure = function(data) {console && console.log && console.log("Pitch-in failed!: "+data)};

    this.updateCampaign = function(newTitle, newDescription, newImage,
                                   newGcName) {
        if (newTitle || newDescription || newImage) {
            var newgs = {};
            if (newTitle) {
                newgs.title = newTitle;
            }
            if (newDescription) {
                newgs.description = newDescription;
            }
            if (newImage) {
                newgs.image = newImage;
            }
            if (newGcName) {
                newgs.gc_name = newGcName;
            }
        }
        Analytics.track('campaign', 'campaign update sent');

        $http({method: 'POST', url: '/giftstart/' +
            self.giftStart.giftstart_url_title + '.json', data: newgs})
            .success(function(response) {
                Analytics.track('campaign', 'campaign update succeeded');
                if (response.title) {
                    self.giftStart.title = response.title;
                }
                if (response.description) {
                    self.giftStart.description = response.description;
                }
                if (response.product_img_url) {
                    self.giftStart.product_img_url =
                        response.product_img_url + '#' +
                        new Date().getTime();
                }
                if (response.gc_name) {
                    self.giftStart.gc_name = response.gc_name;
                }
                $rootScope.$broadcast('giftstart-updated');
            })
            .error(function() {Analytics.track('campaign', 'campaign update failed')})
    };

    this.updateComment = function(pitchIn) {
        var data = {
            pitchin: pitchIn,
            action: 'pitch-in-note-update',
            uid: UserService.uid
        };
        $http({method: 'POST', url: '/pay', data: data})
            .success(function(response) {
                Analytics.track('campaign', 'pitchin comment update succeeded');
            })
            .error(function() {
                Analytics.track('campaign', 'pitchin comment update failed');
            })
    };

    this.updateCommentImage = function(pitchIn, imageData) {
        var contentType = imageData.split(';')[0].replace('data:', '');
        var data = {
            payment: pitchIn, action: 'pitch-in-img-upload',
            uid: UserService.uid, contenttype: contentType, imgdata: imageData
        };
        return $http({method: 'POST', url: '/pay', data: data});
    };

    this.setThanksImage = function(img) {self.thanksImage = img};

    this.updateThanks = function(message) {
        var url = '/thanks';
        if ($location.search().thanks) {
            url += '-' + $location.search().thanks;
        }

        var data = {
            message: message, img: self.thanksImage, gsid: self.giftStart.gsid,
            url_title: self.giftStart.giftstart_url_title
        };
        if (UserService.uid != -1) {data.uid = UserService.uid;}

        return $http({method: 'PUT', url: url, data: data});
    };

    this.goToUserPage = function(uid) {
        $location.path('u').search('').search('uid', uid);
    };

    function checkForSync() {
        $http({
            method: 'POST',
            url: '/pay',
            data: {action: 'get-pitch-ins', gsid: self.giftStart.gsid}
        })
            .success(syncCheckCallback)
            .error(function() {console && console.log && console.log("Failed to contact part sync.")})
    }

    function syncCheckCallback(pitchins) {
        updatePartsFromPitchIns(pitchins);
        formatPitchIns(pitchins);
        $rootScope.$broadcast('pitch-ins-updated');
    }

    function formatPitchIns(pitchins) {
        newPitchIns = pitchins;
        var i, len, date;
        for (i = 0, len = newPitchIns.length; i < len; i++) {
            date = new Date(1000 * pitchins[i].timestamp);
            newPitchIns[i].timestampString = months[date.getMonth()] +
                " " + date.getDate() + ", " +
                ((date.getHours() - 1) % 12) + ":" +
                ('0' + date.getMinutes()).slice(-2) + " " +
                (date.getHours() >= 12 ? 'PM' : 'AM');
        }
        newPitchIns.sort(function(a, b) {return b.timestamp - a.timestamp});
        angular.forEach(newPitchIns, function(newPitchIn) {
            if (self.pitchIns.length < newPitchIns.length && newPitchIn.gsid === self.giftStart.gsid) {
                this.unshift(newPitchIn);
            }
        }, self.pitchIns);
    }

    function updatePartsFromPitchIns(pitchins) {
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            self.giftStart.parts[i].bought = false;
            self.giftStart.parts[i].img = '';
            self.giftStart.parts[i].uid = '';
        }
        for (i = 0; i < pitchins.length; i++) {
            for (var j = 0; j < pitchins[i].parts.length; j++) {
                var partId = pitchins[i].parts[j];
                self.giftStart.parts[partId].bought = true;
                self.giftStart.parts[partId].selected = false;
                self.giftStart.parts[partId].img = pitchins[i].img;
                self.giftStart.parts[partId].uid = pitchins[i].uid;
            }
        }
        if (!Boolean(self.pitchInsInitialized)) {
            self.pitchInsInitialized = true;
            $rootScope.$broadcast('pitch-ins-initialized');
        }
        self.updateSelected();
    }

    function updateLastChecked() {
        self.lastCheckedMilliseconds = new Date().getTime();
    }

    this.syncPitchIns = function(source) {
        console&&console.log&&console.log("syncPitchIns: "+source);
        if (self.giftStart.gsid) {
            if (source == 'pitch-in-hover' || source == 'GiftStartService') {
                // User hovered pitch-in button, need to update immediately
                checkForSync();
                updateLastChecked();
            } else if (!self.pitchInsInitialized) {
                checkForSync();
                updateLastChecked();
             }
        }
    };

    // Sync pitchins on route change (navigation, back, etc.)
    $rootScope.$on('$routeChangeSuccess', function() {
        AppStateService.setPath($location.path());
        self.pitchInsInitialized = false;
        var path = $location.path();
        if (path.indexOf("/giftstart/")>=0) {
            var urlTitle = path.split('/')[2];
            if (urlTitle != undefined) {
                self.fetchGiftStart(urlTitle);
            }
        }
    });

    // Check if giftstart was sent with page on init load
    if ($window.GIFTSTART) {
        self.inflateGiftStart($window.GIFTSTART);
        $rootScope.$broadcast('giftstart-loaded');
    }

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftStartController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    GiftStartController]);

function GiftStartController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService,  Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    //alert('TBD: functionality and left-hand side (see Screen Shot 2015-05-29 at 11.14.12 PM')

    Analytics.track('campaign', 'controller created');

    $scope.giftStart = GiftStartService.giftStart;
    $scope.pitchIns = [];

    $scope.secondsLeft = 0;

    $scope.newTitle = $scope.giftStart.title;
    $scope.newDescription = $scope.giftStart.description;
    $scope.editingTitle = false;
    $scope.editingDescription = false;
    $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    $scope.pitchInsInitialized = false;
    $scope.pitchinButtonHoverMessage = 'Click on some grid pieces first!';

    $scope.isMobile = device.mobile();
    $scope.newUser = !UserService.hasPitchedIn;
    $scope.loggedIn = UserService.loggedIn;
    $scope.imageUpdated = imageUpdated;
    $scope.picEdit = false;
    $scope.picUploading = false;
    var currentComment;

    $scope.userId = UserService.uid;
    $scope.commentEditing = [];     //keeping as array for one day when we can upload multiple images
    var imageData, commentName, commentImg, commentTxt;

    $scope.productMessage = '';

    $scope.isSavingForLater = false;

    $scope.showLoginBox = false;
    $scope.showPayBox = false;
    $scope.showSignBox = false;
    $scope.showShareBox = false;

    $scope.showShare = UserService.loggedIn && $location.hash() == "share-panel";


    function imageUpdated(data) {
        imageData = data;
    }

    $scope.showSharePanel = function(show) {
            $scope.showShareBox = false;
            $scope.showShare = show;
    };

    $scope.editingComment = function(comment, editing) {
        if (editing) {                      //edit mode on
            $scope.commentEditing.push(comment);
            commentName = comment.name;
            commentTxt = comment.note;
            commentImg = comment.img;
            currentComment = comment;
        } else if (!editing) {              //saving edit
            $scope.picEdit = false;
            $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
            GiftStartService.updateComment(comment);
            currentComment = null;
        }
    };

    $scope.cancelEditComment = function(comment) {
        $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
        comment.name = commentName;
        comment.note = commentTxt;
        comment.img = commentImg;
        $scope.picEdit = false;
    };

    $scope.isEditing = function(comment) {
        return $scope.commentEditing.indexOf(comment) != -1;
    };

    $scope.picSubmit = function() {
        $scope.picUploading = true;
        if (imageData) {
            currentComment.img = imageData;
            GiftStartService.updateCommentImage(currentComment, imageData)
                .success(function(response) {
                    console&&console.log&&console.log("pitchin image changed");
                    Analytics.track('campaign', 'pitchin image update succeeded');
                    currentComment.img = response;
                    $rootScope.$broadcast('pitchin-image-changed', response);
                    $scope.picUploading = false;
                    imageData = null;
                    var data = {payment: currentComment, action: 'pitch-in-img-update',
                    uid: currentComment.uid, imgurl: currentComment.img};
                    $http({method: 'POST', url: '/pay', data: data});
                })
                .error(function() {
                    Analytics.track('campaign', 'pitchin image update failed');
                    $scope.picUploading = false;
                    imageData = null;
                });
        }
        $scope.picEdit = false;
    };

    $scope.setPicEdit = function(edit) {
        $scope.picEdit = edit;
    };

    $scope.getTileCost = function() {
        return Math.floor($scope.giftStart.total_price / ($scope.giftStart.rows * $scope.giftStart.columns));
    };

    $rootScope.$on('paybox-hidden', function() {
        $scope.showPayBox = false;
        $scope.showSignBox = true;
    });

    $rootScope.$on('paybox-hidden-cancel', function() {
        $scope.showPayBox = false;
    });

    $rootScope.$on('signbox-hidden', function() {
        $scope.showSignBox = false;
        $scope.showShare = false;
        $scope.showShareBox = true;
    });

    $scope.shareBox = function (show) {
        $scope.showShareBox = show;
    };

    if ($scope.giftStart.gc_name) {
        $scope.newGcName = $scope.giftStart.gc_name;
    } else {
        $scope.newGcName = UserService.name;
    }

    // Remove old giftstart scheme if present (it messes up login)
    if ($location.search()['gs-id']) {
        $location.search('gs-id', null);
    }

    $scope.mailSubject = encodeURIComponent("Join us on a gift together");
    $scope.mailBody= function() {
        $location.search('re', btoa(JSON.stringify({
            type: 'consumer',
            uid: UserService.uid,
            channel: 'email',
            uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        })));
        var url = encodeURIComponent("I thought you might be interested in pitching in on this GiftStarter campaign:\n\n" + $location.absUrl());
        $location.search('re', null);
        return url;
    };

    // Check if we should fetch a giftstart
    if($location.path().length > 11) {
        if (GiftStartService.giftStart.gsid == undefined) {
            var url_title = $location.path().split('/')[2];
            GiftStartService.fetchGiftStart(url_title);
        }
    }

    $scope.fundingBarProgress = function() {
        return (GiftStartService.giftStart.funded /
            GiftStartService.giftStart.total_price * 100).toString() + '%';
    };

    $scope.pitchinBarProgress = function() {
        return ((GiftStartService.giftStart.funded +
            GiftStartService.giftStart.totalSelection) /
            GiftStartService.giftStart.total_price * 100).toString() + '%';
    };

    $document.bind('keyup keydown', function(event) {
        if(event.ctrlKey && event.keyCode === 80) {
            window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
            event.preventDefault();
            return false;
        }
    });

    $scope.$on('pitch-ins-initialized', function() {
        $scope.pitchInsInitialized = true;
    });

    $scope.$on('note-saved', function() {
        $scope.pitchIns.shift();
        $scope.pitchIns.unshift(GiftStartService.newPitchIn);
    });

    $scope.$on('pitch-ins-updated', function() {
    $http({
        method: 'POST',
        url: '/pay',
        data: {action: 'get-pitch-ins', gsid: $scope.giftStart.gsid}
    })
        .success( function (pitchIns) {
            var currentPids = [];
            angular.forEach($scope.pitchIns, function(pitchIn) {
                currentPids.unshift(pitchIn.parts.join('_'));
            });
            angular.forEach(pitchIns, function(pitchIn) {
                if(currentPids.indexOf(pitchIn.parts.join('_'))<0) {
                  $scope.pitchIns.unshift(pitchIn);
                }
            });
            //if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
            //    $scope.pitchIns.unshift(pitchIn);
            //}
        //});
        //    angular.forEach(pitchIns, function(pitchIn) {
        //    if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
        //        this.unshift(pitchIn);
        //    }
        //}, $scope.pitchIns);
        })
        .error(function() {console && console.log && console.log("Failed to contact part sync.")})
    });

    $scope.$on('selection-changed', function() {
        if (GiftStartService.giftStart.totalSelection > 0) {
            $scope.pitchinButtonHoverMessage = '';
        } else {
            $scope.pitchinButtonHoverMessage = 'Click on some parts first!';
        }
    });

    var syncPitchInsTimerIsFast = true;

    var syncPitchInsTimer = $interval(function(){
        GiftStartService.syncPitchIns("GiftStartService");
        if (syncPitchInsTimerIsFast && ($scope.secondsLeft <= 0 || $scope.campaignComplete())) {
            $interval.cancel(syncPitchInsTimer);
            syncPitchInsTimerIsFast = false;
            syncPitchInsTimer = $interval(function () {
                GiftStartService.syncPitchIns("GiftStartService");
            }, 60000, false);
        }
    }, 1000, false);

    // Synchronize parts on mouse activity
    $scope.mouseActivityCallback = function(source) {
        GiftStartService.syncPitchIns(source);
    };
    $scope.pitchInHoverCallback = function() {
        GiftStartService.syncPitchIns('pitch-in-hover')};

    $scope.pitchIn = function() {
        // Ensure they have selected more than $0 of the gift to pitch in
        if (GiftStartService.giftStart.totalSelection > 0) {
            Analytics.track('pitchin', 'pitchin button clicked');
            if (UserService.loggedIn) {
                AppStateService.set('contributeLogin', false);
                //PopoverService.setPopover('pay');
                $scope.showPayBox = true;
                $rootScope.$broadcast('paybox-shown');
            } else {
                //PopoverService.contributeLogin = true;
                AppStateService.set('contributeLogin', true);
                //PopoverService.setPopover('login');
                $rootScope.$broadcast('loginbox-show-login');
                $scope.showLoginBox = true;
            }
        } else {console && console.log && console.log("Nothing selected!")}
    };

    function restartPitchin() {
        if (AppStateService.get('contributeLogin')) {
            AppStateService.remove('contributeLogin');
            $scope.pitchIn();
        }
    }

    $scope.campaignComplete = function() {
        return (GiftStartService.giftStart.funded /
            GiftStartService.giftStart.total_price > 0.9975);
    };

    $scope.updateSecondsLeft = function() {
        if (($scope.secondsLeft < 0) || ($scope.campaignComplete())) {
            $scope.countdown = "Campaign Complete";
            GiftStartService.disableParts();
        } else {
            $scope.secondsLeft -= 1;

            var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
            var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);

            $scope.countdown = days + " days, " + hours + " hours";
        }
    };

    function startSecondsLeftTimer() {
        $scope.secondsLeftTimer = $interval($scope.updateSecondsLeft, 1000);
    }
    function stopSecondsLeftTime() {
        $scope.secondsLeftTimer.cancel();
        $scope.secondsLeftTimer = null;
    }

    $scope.saveProdForLater = function() {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater(
            'GiftStartService',
            GiftStartService.giftStart.product_url,
            GiftStartService.giftStart.price,
            GiftStartService.giftStart.product_title,
            '',
            GiftStartService.giftStart.product_img_url
        );
        if(saver) {
            saver.success(function (response) {
                $scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                $scope.isSavingForLater = false;
            })
            .error(function (response) {
                $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    var colorMap = [];

    $scope.randomColor = function(index) {
        if (colorMap[index] == null) {
            var colors = ["red", "green", "orange", "teal"];
            colorMap[index] = colors[Math.floor(Math.random() * colors.length)];
        }
        return colorMap[index];
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.giftstartThisUrl = function() {
        return '/create?' + urlSerialize({
                product_url: GiftStartService.giftStart.product_url,
                title: GiftStartService.giftStart.product_title,
                price: GiftStartService.giftStart.price,
                img_url: GiftStartService.giftStart.product_img_url,
                source: 'GiftStarter'
            });
    };

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };


    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookMsg = function() {
        Analytics.track('campaign', 'facebook share from campaign');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from campaign');
        //FacebookService.inviteFriends(UserService.uid, 'share');
        FB.ui(
         {
          method: 'share',
          href: $location.absUrl()
        }, function(response){});
        FB.Canvas.setAutoGrow();
    };
    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from campaign');
        TwitterService.share(UserService.uid);
    };
    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from campaign');
        GooglePlusService.share(UserService.uid);
    };

    $scope.productLinkClicked = function(){
        Analytics.track('campaign', 'product link clicked');
    };

    $scope.goToUserPage = function(uid) {
        Analytics.track('client', 'go to user page from comments');
        GiftStartService.goToUserPage(uid);
    };

    $scope.toPDFPage = function() {
        window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
    };

    $scope.$on('login-success', function() {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
        $scope.newUser = !UserService.hasPitchedIn;
        $scope.showLoginBox = false;
        restartPitchin();
    });
    $scope.$on('logout-success', function() {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
    });

    $scope.showOverlay = GiftStartService.showOverlay;
    $scope.hideOverlay = GiftStartService.hideOverlay;

    var imageInput = angular.element(document.getElementById('campaign-image-input'));
    $scope.updateImage = function() {
        var maxImageSize = 2*1024*1024; // 2 MB
        var acceptableFileTypes = ['image/jpeg', 'image/png'];
        if (imageInput[0].files[0]) {
            if (imageInput[0].files[0].size > maxImageSize) {
                alert("Oops!  Images must be smaller than 2 MB.");
            } else if (acceptableFileTypes.indexOf(imageInput[0].files[0].type) == -1) {
                alert("Oops!  Only jpeg and png images are allowed!  You chose a " + imageInput[0].files[0].type + ".");
            } else {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var img_data = event.target.result;
                    $scope.newImage = {data: img_data,
                        filename: imageInput[0].files[0].name};
                };
                reader.readAsDataURL(imageInput[0].files[0]);
            }
        }
    };

    $scope.updateCampaign = function() {
        GiftStartService.updateCampaign($scope.newTitle, $scope.newDescription,
            $scope.newImage, $scope.newGcName);
        $scope.editMode = false;
    };

    if (GiftStartService.giftStart.gsid != undefined) {
        // Start timer update ticker
        $scope.secondsLeft = GiftStartService.giftStart.deadline -
            (new Date()).getTime()/1000;
        startSecondsLeftTimer();
    }

    // Update this giftstart when the service updates it
    $scope.$on('giftstart-loaded', function() {
        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = GiftStartService.giftStart.deadline -
            (new Date()).getTime()/1000;
        startSecondsLeftTimer();
    });
    $scope.$on('giftstart-updated', function() {
        $scope.giftStart = GiftStartService.giftStart;
        startSecondsLeftTimer();
    });

    function loginChanged() {
        $scope.campaignEditable =
            UserService.uid == $scope.giftStart.gift_champion_uid;
    }

    function loggedIn() {
        $scope.loggedIn = true;
        loginChanged();
    }

    function loggedOut() {
        $scope.loggedIn = false;
        $scope.showShare = false;
        $scope.showShareBox = false;
        loginChanged();
    }

    $scope.$on('login-success', loggedIn);
    $scope.$on('logout-success', loggedOut);

    $scope.$on('giftstart-loaded', restartPitchin);

    imageInput.bind('change', $scope.updateImage);

    $scope.$on("$destroy", function() {
        if (syncPitchInsTimer) {
            $interval.cancel(syncPitchInsTimer);
        }
    });

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsCopyUrl', ['$window', gsCopyUrl]);


function gsCopyUrl($window) {
    function link(scope, element, attrs) {
        element.on('click', function () {
            if (!$window.getSelection().toString()) {
                // Required for mobile Safari
                this.setSelectionRange(0, this.value.length)
            }
        });
    }

    return {
        restrict: 'A',
        link: link
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsThanks', gsThanks);

function gsThanks() {

    controller.$inject = ['$scope', 'UserService', '$location',
        'GiftStartService', 'Analytics', 'PopoverService','$window',
        'AppStateService'];
    function controller($scope, UserService, $location, GiftStartService,
                        Analytics, PopoverService, $window, AppStateService) {
        var thanks = this;

        thanks.message = GiftStartService.giftStart.thanks_message;
        thanks.newMessage = getNewMessage() ||
            GiftStartService.giftStart.thanks_message;

        thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
        thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
        thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
            || $location.search().thanks;

        thanks.showLogin = showLogin;
        thanks.update = update;
        thanks.profileImageUrl = UserService.profileImageUrl;

        thanks.imageUpdated = imageUpdated;

        if ($location.search().thanks == undefined) {
            $location.search('thanks', AppStateService.get('thanks-code'));
            AppStateService.remove('thanks-code');
        }

        $scope.$on('login-success', loginChanged);
        $scope.$on('logout-success', loginChanged);
        $scope.$on('giftstart-loaded', giftstartChanged);

        function loginChanged() {
            thanks.profileImageUrl = UserService.profileImageUrl;
            thanks.editable = GiftStartService.giftStart.thanks_uid ==
                UserService.uid;
        }

        function showLogin() {
            cacheNewMessage();
            PopoverService.setPopover('login');
        }

        function giftstartChanged() {
            thanks.message = GiftStartService.giftStart.thanks_message;
            thanks.newMessage = getNewMessage() ||
                GiftStartService.giftStart.thanks_message;

            thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
            thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
            thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
                || $location.search().thanks;
        }

        function cacheNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            AppStateService.set('thanks-code', $location.search().thanks);
            // TODO: Replace with data layer
            localStorage.setItem(thisThanksURI + 'message', thanks.newMessage);
        }

        function getNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            // TODO: Replace with data layer
            return localStorage.getItem(thisThanksURI + 'message');
        }

        function update() {
            var req = GiftStartService.updateThanks(thanks.newMessage);
            req.success(
                function(response) {
                    thanks.message = response.thanks_message;
                    thanks.newMessage = thanks.message;
                    thanks.imgUrl = response.thanks_img_url;
                    $location.path('/giftstart/' +
                        GiftStartService.giftStart.giftstart_url_title);
                })
                .error(function(reason) {
                    Analytics.track('campaign', 'thanks failed');
                    $window.alert('Thanking failed!  Did you get the link ' +
                        'right?');
                });
            thanks.edit = false;
        }

        function imageUpdated(imageData) {
            GiftStartService.setThanksImage(imageData);
        }
    }

    return {
        restrict: 'E',
        controller: controller,
        controllerAs: 'thanks',
        templateUrl: '/scripts/giftstart/thanks/thanks.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var controller = function ($scope,
                               $rootScope,
                               GiftStartService,
                               $location,
                               ProductService,
                               UserService,
                               PopoverService,
                               $http,
                               $timeout,
                               Analytics,
                               AppStateService) {

        var shippingRate = 0; //0.045;

        var campaignLength = 10;

        $scope.inputPrice = ProductService.product.price / 100;
        $scope.totalPrice = 0;
        $scope.deliveryDate = null;
        $scope.campaignEndDate = null;
        $scope.getCampaignLength = function (date) {
            if (angular.isDate(date)) {
                campaignLength = Math.round((date.getTime() - new Date().getTime()) / 86400000)-5; //5 days for shipping etc
            }
            return campaignLength;
        };
        $scope.salesTaxRate = 0.098;
        $scope.serviceFeeRate = 0.08;
        $scope.fetchingTaxRate = false;

        $scope.xySets = [[1, 2], [1, 3], [2, 2], [1, 5], [2, 3], [2, 4],
            [3, 3], [2, 5], [3, 4], [3, 5], [4, 4], [3, 6], [4, 5], [4, 6],
            [5, 5], [5, 6], [6, 6], [6, 7], [7, 7]];

        function calculateInitialNumParts() {
            $scope.selectedXYSet = 0;
            for (var guess = 0; guess < $scope.xySets.length; guess++) {
                var calcPrice = $scope.inputPrice / $scope.xySets[guess][0] /
                    $scope.xySets[guess][1];
                if (calcPrice < 20.5) {
                    return guess;
                }
            }
            return $scope.xySets.length - 1;
        }

        $scope.showLoginBox = false;

        $scope.createStep = 1;

        $scope.shippingName = '';
        $scope.shippingEmail = '';
        $scope.shippingZip = '';
        $scope.shippingState = '';
        $scope.shippingDetailsSubmitted = false;

        $scope.product = ProductService.product;
        $scope.imgIndex = 0;
        $scope.selectedImg = ProductService.product.imgs[$scope.imgIndex];
        $scope.title = '';
        $scope.description = '';
        $scope.gcEmail = '';
        if(UserService.loggedIn) {
            UserService.getUser(UserService.uid, function(data) {
                $scope.gcEmail = data[Object.keys(data)[0]].email;
            });
        }
        $scope.coupon = '';
        $scope.specialNotes = '';
        $scope.pitchInsInitialized = false;
        $scope.giftStart = GiftStartService.giftStart;
        $scope.descriptionLongEnough = true;

        this.referral = {};
        $scope.showIntroCopy = false;
        $scope.fromReferral = false;

        $scope.dateChosenValid = dateChosenValid;
        $scope.changeDueDate = false;

        $scope.shippingChanged = function () {
            if ($scope.shippingZip&&$scope.shippingZip.length == 5) {
                Analytics.track('campaign', 'shipping updated');
                $scope.fetchingTaxRate = true;
                $scope.shippingDetailsSubmitted = true;

                $http({
                    method: 'POST', url: '/product',
                    data: {
                        action: 'get-tax-and-shipping',
                        shipping_address: 'street', shipping_city: 'city',
                        title: ProductService.product.title,
                        shipping_state: $scope.shippingState,
                        shipping_zip: $scope.shippingZip
                    }
                })
                .success(function (result) {
                    Analytics.track('product', 'tax and shipping fetch success');
                    $scope.salesTaxRate = result.tax;
                    $scope.fetchingTaxRate = false;
                    $scope.priceChanged();
                })
                .error(function (reason) {
                    $scope.fetchingTaxRate = false;
                    Analytics.track('product', 'tax and shipping fetch failed');
                });
            }
        };

        $scope.nextImage = function () {
            $scope.imgIndex = ($scope.imgIndex + 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.previousImage = function () {
            $scope.imgIndex = ($scope.imgIndex + $scope.product.imgs.length - 1) % $scope.product.imgs.length;
            $scope.selectedImg = $scope.product.imgs[$scope.imgIndex];
            $scope.updateGiftStartImage();
        };

        $scope.updateGiftStartImage = function () {
            Analytics.track('campaign', 'selected image changed');
            GiftStartService.giftStart.product_img_url = $scope.selectedImg;
        };

        function completePriceChange() {
            Analytics.track('campaign', 'price changed');
            $scope.salesTax = $scope.salesTaxRate * $scope.inputPrice * 100;
            $scope.serviceFee = $scope.serviceFeeRate * $scope.inputPrice * 100;
            $scope.shipping = shippingRate * $scope.inputPrice * 100;
            $scope.totalPrice = $scope.inputPrice * 100 + $scope.salesTax + $scope.serviceFee + $scope.shipping;
            $scope.fetchingTaxRate = false;
            $scope.updateOverlay();
        }

        $scope.priceChanged = function () {
            $scope.fetchingTaxRate = true;
            $http({
                method: 'POST', url: '/product',
                data: {
                    action: 'get-service-fee',
                    coupon: $scope.coupon
                }
            })
            .success(function (result) {
                Analytics.track('product', 'service fee fetch success');
                $scope.serviceFeeRate = result.fee;
                completePriceChange();
            })
            .error(function (reason) {
                Analytics.track('product', 'service fee fetch failure');
                completePriceChange();
            });
        };

        $scope.moreParts = function (event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet < $scope.xySets.length - 1) {
                $scope.selectedXYSet += 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.fewerParts = function (event) {
            Analytics.track('campaign', 'number of parts changed');
            if ($scope.selectedXYSet > 0) {
                $scope.selectedXYSet -= 1;
                $scope.x = $scope.xySets[$scope.selectedXYSet][0];
                $scope.y = $scope.xySets[$scope.selectedXYSet][1];
                $scope.updateOverlay();
            }

            event.preventDefault();
        };

        $scope.updateOverlay = function () {
            GiftStartService.giftStart.columns = $scope.x;
            GiftStartService.giftStart.rows = $scope.y;
            GiftStartService.giftStart.total_price = $scope.totalPrice;
            GiftStartService.giftStart.parts = GiftStartService.makeParts($scope.x * $scope.y, $scope.totalPrice);
            $scope.giftStart = GiftStartService.giftStart;
            $scope.$broadcast('overlay-updated');
        };

        $scope.makeUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };

        function stagedGiftStart(uuid) {
            return {
                'title': $scope.title,
                'description': $scope.description,
                'coupon': $scope.coupon,
                'product_url': ProductService.product.product_url,
                'product_img_url': $scope.selectedImg,
                'product_price': $scope.inputPrice * 100,
                'product_title': ProductService.product.title,
                'sales_tax': $scope.salesTax,
                'shipping': $scope.shipping,
                'service_fee': $scope.serviceFee,
                'total_price': $scope.totalPrice,
                'campaign_length': campaignLength,
                'columns': $scope.x,
                'rows': $scope.y,
                'shipping_name': $scope.shippingName,
                'shipping_email': $scope.shippingEmail,
                'shipping_state': $scope.shippingState,
                'shipping_zip': $scope.shippingZip,
                'gc_email': $scope.gcEmail,
                'staging_uuid': uuid
            }
        }

        function clearCreateData() {
            $scope.title = '';
            $scope.description = '';
            $scope.coupon = '';
            $scope.selectedImg = '';
            $scope.shippingName = '';
            $scope.shippingEmail = '';
            $scope.shippingZip = '';
            $scope.shippingState = '';
            $scope.inputPrice = 0;
            campaignLength = 10;
            $scope.shippingDetailsSubmitted = false;
        }

        function dateChosenValid() {
            return !($scope.getCampaignLength($scope.deliveryDate) >= 29 ||
            $scope.getCampaignLength($scope.deliveryDate) < 1);
        }

        $scope.dueDateEmpty = function() {
            if($('.endDate')[0].value) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeDeliveryDate = function() {
            $(".endDate").datepicker("show");
        };

        $scope.deliveryDateChanged = function(dateText) {
            $scope.campaignEndDate = new Date($scope.deliveryDate);
            $scope.campaignEndDate.setDate($scope.campaignEndDate.getDate() - 6);
            $(".endRange").datepicker("option", "maxDate", $scope.campaignEndDate);
            $(".endRange").datepicker("setDate", $scope.campaignEndDate);
        };

        var endDateChanged = function(dateText) {
            $scope.campaignEndDate = new Date(dateText);
            $(".endRange").datepicker("setDate", $scope.campaignEndDate);
        };

        $scope.validationCreateStep = {
            title: 2,
            description: 2,
            coupon: 3,
            shippingState: 3,
            shippingZip: 3,
            shippingName: 3,
            shippingEmail: 3,
            deliveryDate: 3,
            gcEmail: 2
        };

        function resetValidationErrors() {
            $scope.hideValidationError = {
                title: true,
                description: true,
                coupon: true,
                shippingState: true,
                shippingZip: true,
                shippingName: true,
                shippingEmail: true,
                deliveryDate: true,
                gcEmail: true
            };
        }
        resetValidationErrors();

        $scope.isSubmittingData = false;

        $scope.validationTrigger = {
            createButtonClicked: false
        };

        $scope.runValidation = function() {
            var keys = Object.keys($scope.hideValidationError);
            var hasErrors = false;
            keys.forEach(function (key) {
                if ($scope.validationCreateStep[key] == $scope.createStep) {
                    $scope.hideValidationError[key] = false;
                }
                switch($scope.createStep) {
                    case 2: hasErrors = $scope.campaignForm.title.$error.required||$scope.campaignForm.description.$error.required||$scope.campaignForm.gcEmail.$error.required; break;
                    case 3: hasErrors = $scope.campaignForm.shippingState.$error.required||$scope.campaignForm.shippingZip.$error.required||$scope.campaignForm.shippingName.$error.required||$scope.campaignForm.shippingEmail.$error.required||$scope.campaignForm.deliveryDate.$error.required; break;
                }
            });
            $scope.validationTrigger.createButtonClicked = true;
            return !hasErrors;
        };

        $scope.isCreateStepTiles = function() {return $scope.createStep==1;};

        $scope.isCreateStepStory = function() {return $scope.createStep==2;};

        $scope.isCreateStepShipping = function() {return $scope.createStep==3;};

        $scope.goToStep = function(i) {
            $scope.createStep=Math.max(Math.min(i,3),1);
            $('html,body').animate({scrollTop: $('#giftstart-create-controls').offset().top-100}, 500);
        };

        $scope.prevStep = function() {
            $scope.goToStep($scope.createStep-1);
        };

        $scope.nextStep = function() {
            if($scope.runValidation()) {
                $scope.goToStep($scope.createStep + 1);
            }
            jQuery('#giftstart-create-next').blur();
        };

        $scope.next = function() {

            $scope.runValidation();

            GiftStartService.title = $scope.title;
            GiftStartService.description = $scope.description;
            GiftStartService.coupon = $scope.coupon;
            GiftStartService.productUrl = ProductService.product.product_url;
            GiftStartService.productTitle = ProductService.product.title;
            GiftStartService.retailerLogo = ProductService.logo;
            GiftStartService.productImgUrl = $scope.selectedImg;
            GiftStartService.rows = $scope.y;
            GiftStartService.columns = $scope.x;
            GiftStartService.productPrice = $scope.inputPrice*100;
            GiftStartService.shippingName = $scope.shippingName;
            GiftStartService.shippingEmail = $scope.shippingEmail;
            GiftStartService.shippingZip = $scope.shippingZip;
            GiftStartService.shippingState = $scope.shippingState;
            GiftStartService.salesTax = $scope.salesTax;
            GiftStartService.shipping = $scope.shipping;
            GiftStartService.serviceFee = $scope.serviceFee;
            GiftStartService.totalPrice = $scope.totalPrice;
            GiftStartService.campaignLength = campaignLength;
            GiftStartService.specialNotes = $scope.specialNotes;
            GiftStartService.gcEmail = $scope.gcEmail;
            GiftStartService.gcName = UserService.name;

            if ($scope.campaignForm.$valid && ($scope.inputPrice != 0) && dateChosenValid()) {
                if (UserService.loggedIn) {
                    Analytics.track('campaign', 'campaign submitted', '',
                        $scope.totalPrice);
                    $scope.isSubmittingData = true;
                    GiftStartService.createGiftStart()
                        .success(function(data) {
                            clearCreateData();
                            resetValidationErrors();
                        })
                        .error(function(data) {
                            alert("A severe error occurred; please try again? If it keeps happening, please contact the Gift Concierge with the following information: "+data);
                            $scope.isSubmittingData = false;
                        });
                } else {
                    var uuid = $scope.makeUUID();
                    //stash staged giftstart for later use by login-popover.controller
                    AppStateService.set('staging_uuid', uuid);
                    console&&console.log&&console.log("staging: "+stagedGiftStart(uuid)['staging_uuid']);
                    AppStateService.set('staged_giftstart', stagedGiftStart(uuid));
                    console&&console.log&&console.log("staged: "+AppStateService.get('staged_giftstart')['staging_uuid']);
                    //PopoverService.giftstartCreateLogin = true;
                    //PopoverService.setPopover('login');
                    $rootScope.$broadcast('loginbox-show-login');
                    $scope.showLoginBox = true;
                }
            }
        };

        $scope.onDescriptionBlur = function() {
            var longEnough = $scope.description.length > 400;
            if (!longEnough && $scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short displayed');
            } else if (longEnough && !$scope.descriptionLongEnough) {
                Analytics.track('campaign', 'description too short hidden');
            }
            $scope.descriptionLongEnough = longEnough;
        };

        // So that users that were browsing another giftstart don't experience
        // the "no overlay initially" bug
        if (!GiftStartService.title) {
            GiftStartService.giftStart.gsid = 0;
            GiftStartService.giftStart = GiftStartService.buildGiftStart();
        } else {
            //$scope.inputPrice = GiftStartService.productPrice/100;
            //$scope.shippingZip = GiftStartService.shippingZip;
            //$scope.shippingState = GiftStartService.shippingState;
            //$scope.title = GiftStartService.title;
            //$scope.description = GiftStartService.description;
            $scope.specialNotes = GiftStartService.specialNotes;
            $scope.giftStart = GiftStartService.giftStart;
        }

        $scope.selectedXYSet = calculateInitialNumParts();

        extractReferral();
        extractPromo();


        function extractReferral() {
            if ($location.search().product_url &&
                $location.search().title &&
                $location.search().price &&
                $location.search().img_url &&
                $location.search().source) {
                restoreFromReferral({
                    product_url: $location.search().product_url,
                    productTitle: $location.search().title,
                    productImgUrl: $location.search().img_url,
                    price: $location.search().price,
                    source: $location.search().source
                });
                $location.search('product_url', null);
                $location.search('title', null);
                $location.search('price', null);
                $location.search('img_url', null);
                $location.search('source', null);
            }
        }

        function extractPromo() {
            if ($location.search().promo == 'dress-for-success') {
                $scope.title = 'Gift a Start Collection';
                $scope.description = 'Give the gift of confidence this holiday season with this curated assortment of beautiful basics. butter LONDON is proud to partner with Dress for Success to gift a new start to women in need. Dress for Success is a not-for-profit organization dedicated to helping women get back on their feet and back into the workforce. For these women giving something as simple as a lipstick can make an impact. Help deliver a new start this holiday season by starting a GiftStart for our Gift A Start Collection.';
                $scope.shippingZip = '98118';
                $scope.shippingState = 'WA';
                $scope.shippingChanged();
                $location.search('promo', null);
            }
        }

        function restoreFromSession(session) {
            // This function doesn't seem to be in use
            $scope.title = session.title;
            $scope.description = session.description;
            $scope.coupon = session.coupon;
            ProductService.product.product_url = session.productUrl;
            ProductService.product.title = session.productTitle;
            ProductService.logo = session.retailerLogo;
            $scope.selectedImg = session.productImgUrl;
            $scope.selectedXYSet = session.selectedXYSet;
            $scope.y = session.rows;
            $scope.x = session.columns;
            $scope.inputPrice = session.productPrice / 100;
            $scope.shippingZip = session.shippingZip;
            $scope.shippingState = session.shippingState;
            $scope.salesTax = session.salesTax;
            $scope.shipping = session.shipping;
            $scope.serviceFee = session.serviceFee;
            $scope.totalPrice = session.totalPrice;
            $scope.campaignLength = session.campaignLength;
            $scope.specialNotes = session.specialNotes;
            $scope.gcEmail = session.gcEmail;

            $scope.$on('login-success', $scope.next);
        }

        function restoreFromReferral(referral) {
            // If user was referred here from a brand
            ProductService.product.product_url = referral.product_url;
            ProductService.product.title = referral.productTitle;
            ProductService.product.imgs = [referral.productImgUrl];
            $scope.selectedImg = referral.productImgUrl;
            $scope.inputPrice = parseInt(referral.price)/100;
            $scope.showIntroCopy = true;
            $scope.fromReferral = true;
            $scope.referredFrom = getReferrerName(referral.source);

            $scope.ghostruck = /ghostruck/.test(referral.source.toLowerCase());

            // special for ghostruck: auto zip and state
            if (/ghostruck/.test(referral.source.toLowerCase())) {
                $scope.shippingState = 'WA';
                $scope.shippingZip = '98118';
                $scope.shippingChanged();
            }

            Analytics.track('client', 'referred from', referral.source);
        }

        function getReferrerName(source) {
            if (/ghostruck/.test(source.toLowerCase())) {
                return 'Ghostruckers!';
            } else {
                return '';
            }
        }

        $timeout(function() {
            $scope.pitchInsInitialized = true;
        }, 2500);

        if (this.referral) {
            $scope.selectedXYSet = calculateInitialNumParts();
        }
        $scope.x = $scope.xySets[$scope.selectedXYSet][0];
        $scope.y = $scope.xySets[$scope.selectedXYSet][1];
        $scope.updateGiftStartImage();
        $scope.priceChanged();

        $(".endDate").datepicker({
            minDate: "+7d",
            maxDate: "+34d",
            onSelect: $scope.deliveryDateChanged
        });

        $(".endRange").datepicker({
            minDate: "+7d",
            maxDate: "+34d",
            onSelect: endDateChanged
        });

        $rootScope.$on('login-success', function(){
            $scope.showLoginBox = false;
            $scope.next();
        });

    };

    app.controller('GiftStartCreateController', [
        '$scope',
        '$rootScope',
        'GiftStartService',
        '$location',
        'ProductService',
        'UserService',
        'PopoverService',
        '$http',
        '$timeout',
        'Analytics',
        'AppStateService',
        controller]);

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ShareController', [
            '$scope','$rootScope','GiftStartService','$location','$interval', '$timeout',
            'FacebookService','TwitterService','GooglePlusService','LinkedInService','Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService','LocalStorage',
    ShareController]);

function ShareController($scope, $rootScope, GiftStartService,  $location,  $interval, $timeout,
         FacebookService,  TwitterService,  GooglePlusService, LinkedInService, Analytics,
         ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {

    $scope.giftStart = GiftStartService.giftStart;

    $scope.message = "Hey! I just pitched in on a gift for " + $scope.giftStart.shipping_name + " using GiftStarter, a web service where you can buy anything online and split the cost with friends! " + $scope.giftStart.product_title + " will be such an exciting gift for them to receive. Please help to make it happen by following the link below to pitch in too!\n\nLINK: " + $scope.campaignUrl();

    $scope.sharePermission = [];
    $scope.sharePermission["facebook"] = false;
    $scope.sharePermission["twitter"] = false;
    $scope.sharePermission["linkedin"] = false;
    $scope.sharePermission["google"] = false;
    var sharePermissionUrlFacebook = FacebookService.getSharePermissionUrl();
    var sharePermissionUrlTwitter = null;
    var sharePermissionUrlLinkedIn = LinkedInService.getSharePermissionUrl();

    $scope.emailRecipients = "";

    var ensuring = [];
    ensuring["facebook"] = false;
    ensuring["twitter"] = false;
    ensuring["linkedin"] = false;

    $scope.refreshPermissionsStatus = function() {
        //check to see if user has permission to post
        FacebookService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["facebook"] = hasPermission=='1';
            if(ensuring["facebook"]) {$scope.selectedSocials["facebook"] = $scope.sharePermission["facebook"]; ensuring["facebook"] = false;}
        });
        TwitterService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["twitter"] = hasPermission=='1';
            if(ensuring["twitter"]) {$scope.selectedSocials["twitter"] = $scope.sharePermission["twitter"]; ensuring["twitter"] = false;}
        });
        LinkedInService.checkSharePermission().then(function(hasPermission) {
            $scope.sharePermission["linkedin"] = hasPermission=='1';
            if(ensuring["linkedin"]) {$scope.selectedSocials["linkedin"] = $scope.sharePermission["linkedin"]; ensuring["linkedin"] = false;}
        });
        //GooglePlusService.checkSharePermission().then(function(hasPermission) {
        //    $scope.sharePermission["google"] = hasPermission=='1';
        //    if($scope.selectedSocials["google"]) {$scope.selectedSocials["google"] = $scope.sharePermission["google"];}
        //});
        //twitter permissions URL must be generated dynamically
        if(!$scope.sharePermission["twitter"]) {
            TwitterService.getSharePermissionUrl().then(function(url){
                sharePermissionUrlTwitter = url;
            });
        }
    };

    $scope.refreshPermissionsStatus();
    var permissionsTimer = $interval($scope.refreshPermissionsStatus,4*60*1000); //twitter URL expires after 5m
    $scope.$on("$destroy",function() {$interval.cancel(permissionsTimer);});


    $scope.ensureFacebookSharePermission = function() {
        ensuring["facebook"] = true;
        window.open(sharePermissionUrlFacebook);
    };

    $scope.ensureTwitterSharePermission = function() {
        ensuring["twitter"] = true;
        window.open(sharePermissionUrlTwitter);
    };

    $scope.ensureLinkedInSharePermission = function() {
        ensuring["linkedin"] = true;
        window.open(sharePermissionUrlLinkedIn);
    };

    $scope.shareReset = function() {
        $scope.selectedSocials["facebook"] = false;
        $scope.selectedSocials["twitter"] = false;
        $scope.selectedSocials["linkedin"] = false;
        $scope.selectedSocials["google"] = false;
        $scope.emailRecipients = "";
        $scope.shareSuccess = false;
    };

    $scope.shareFacebook = function(message, link, linkName) {
        Analytics.track('campaign', 'facebook share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        FacebookService.doShare(message, link, linkName);
    };

    $scope.shareTwitter = function(message, link) {
        Analytics.track('campaign', 'twitter share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        TwitterService.doShare(message, link);
    };

    $scope.shareGplus = function(link) {
        Analytics.track('campaign', 'gplus share submitted');
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        window.open("https://plus.google.com/share?url="+link);
        $scope.sharePermission["google"] = true;
    };

    $scope.shareLinkedin = function(message, link, linkName) {
        Analytics.track('campaign', 'linkedin share submitted');
        //if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        //if (!linkName) {linkName = $scope.giftStart.product_title;}
        LinkedInService.doShare(message, link, linkName);
    };

    $scope.shareEmail = function(to, message, link) {
        if (!link) {link = $location.absUrl().replace('localhost:8080','www.dev.giftstarter.co');}
        Analytics.track('campaign', 'email share submitted');
        $scope.sending = true;
        $http({
            method: 'PUT',
            url: '/email/sharecampaign.json',
            data: {
                to: to,
                message: message,
                share_url: link,
                gsid: $scope.giftStart.gsid
            }
        })
        .success(function() {
            //alert('True');
        })
        .error(function() {
            //alert('False');

        });
    };

    $scope.shareSuccess = false;

    $scope.selectedSocials = [];
    $scope.selectedSocials["facebook"] = false;
    $scope.selectedSocials["twitter"] = false;
    $scope.selectedSocials["linkedin"] = false;
    $scope.selectedSocials["google"] = false;

    var ensurePermission = [];
    ensurePermission["facebook"] = $scope.ensureFacebookSharePermission;
    ensurePermission["twitter"] = $scope.ensureTwitterSharePermission;
    ensurePermission["linkedin"] = $scope.ensureLinkedInSharePermission;
    ensurePermission["google"] = $scope.shareGplus;

    $scope.shareClick = function() {
        $scope.shareSuccess = true;

        if($scope.selectedSocials["facebook"]) {
            $scope.shareFacebook($scope.message);
        }
        if($scope.selectedSocials["twitter"]) {
            $scope.shareTwitter($scope.message);
        }
        if($scope.selectedSocials["linkedin"]) {
            $scope.shareLinkedin($scope.message);
        }
        //if($scope.selectedSocials["google"]) {
        //    $scope.shareGoogle();
        //}
        if($scope.emailRecipients.trim().length>0) {
            $scope.shareEmail($scope.emailRecipients, $scope.message)
        }
    };

    $scope.selectSocial = function(social) {
        if(!$scope.sharePermission[social]) {
            ensurePermission[social]();
        } else {
            $scope.selectedSocials[social] = true;
        }
    };

    $scope.campaignUrl = function() {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11);//$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };

    $scope.loggedIn = function() {
        return UserService.loggedIn;
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ProductService', ['$http','$rootScope','Analytics',
    'UserService', 'PopoverService', '$location', ProductService]);

function ProductService($http,  $rootScope,  Analytics, UserService, PopoverService, $location) {

    this.product = {
        product_url: '',
        imgs: [],
        title: '',
        logo: '',
        imageWidth: 0,
        imageHeight: 0
    };

    this.products = [];

    var self = this;

    this.submitLink = function(url, onSuccess, onFail) {
        $http({
            method: 'GET',
            url: '/products/urls/' + encodeURIComponent(url) + '.json'
        }).success(function(data) {
            if (data.error) {
                console && console.log && console.log("Fetched failed!");
                onFail(data);
            } else {
                self.product.imgs = data.product.imgs;
                self.product.price = data.product.price;
                self.product.title = data.product.title;
                self.logo = data.product.logo;
                onSuccess(self.product);
            }
        }).error(function(data) {
            console && console.log && console.log("Fetched failed!");
            onFail(data);
        });
    };

    this.createCampaignFromProduct = function(url, price, title, imgUrl) {
        Analytics.track('product', 'campaign create from search');
        self.product.product_url = url;
        self.product.price = price;
        self.product.title = title;
        self.logo = '';
        self.product.imgs = [imgUrl];
        $location.path("create");
    };

    this.saveForLater = function(retailer, url, price, title, description, imgUrl) {
        if(!UserService.loggedIn) {
            $rootScope.$broadcast('header-show-login');
        } else {
            Analytics.track('product', 'save for later');
            return $http.post('/users', {
                'uid': UserService.uid,
                'action': 'save-for-later',
                'url': url,
                'retailer': retailer,
                'price': price,
                'title': title,
                'description': description,
                'imgUrl': imgUrl
            });
        }
    };

    this.searchProducts = function(search) {
        if(window.history) {window.history.replaceState({},'GiftStarter Search: '+search,'/search/'+encodeURIComponent(search));}
        Analytics.track('product', 'search submitted');
        $http({method: 'GET',
            url: '/products/' + encodeURIComponent(search) + '.json'})
            .success(self.fetchSuccess);
    };

    this.fetchSuccess = function (result) {
        Analytics.track('product', 'search succeeded');
        self.products = result;
        if (self.products.length) {
            $rootScope.$broadcast('products-fetched');
        } else {
            $rootScope.$broadcast('products-empty');
        }
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsProductSearch', gsProductSearch);

function gsProductSearch(ProductService, $location, Analytics, UserService, $window,
                         $timeout, $rootScope) {
    function link(scope, element) {
        scope.loading = false;
        scope.failed = false;
        scope.results_empty = false;
        scope.product_url = "";
        scope.currentProductLink = '';
        scope.selectedProduct = -1;
        scope.productMessage = '';
        scope.isSavingForLater = false;

        scope.giftConciergeClicked = function() {Analytics.track('client',
            'gift concierge email clicked')};

        function onSuccess(product) {
            Analytics.track('product', 'link submission succeeded');
            scope.loading = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.product.imgs = product.imgs;
            $location.path("create");
        }
        function onFailure(reason) {
            Analytics.track('product', 'link submission failed');
            scope.loading = false;
            scope.failed = true;
        }

        scope.submit = function() {
            // Determine if url or search term
            var isUrl = (scope.product_url.indexOf('http://') == 0) |
                (scope.product_url.indexOf('https://') == 0);

            if (isUrl) {
                scope.submitLink();
            } else {
                scope.submitSearch();
            }
        };

        scope.submitSearch = function() {
            Analytics.track('product', 'search submitted');
            ProductService.searchProducts(scope.product_url);
            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            scope.selectedProducts = [];
        };

        scope.submitLink = function() {
            Analytics.track('product', 'link submitted');

            // Fix urls if they don't start with http://
            if (scope.product_url.slice(0, 7) !== "http://" &&
                scope.product_url.slice(0, 8) !== "https://") {
                scope.product_url = "http://" + scope.product_url;
            }

            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.submitLink(scope.product_url, onSuccess,
                onFailure);
        };

        scope.$on('products-fetched', function() {
            scope.loading = false;
            scope.failed = false;
            scope.products = ProductService.products.filter(function(product) {
                return product.imgUrl != '' && product.price > 3998;
            });
            scope.pageNumbers = [];
            scope.numPages = Math.floor(scope.products.length / scope.pageSize);
            for (var i = 1; i <= scope.numPages; i++) {
                scope.pageNumbers.push(i);
            }
            scope.selectPage(1);
        });

        scope.$on('products-fetch-fail', function() {
            scope.loading = false;
            scope.failed = true;
        });

        scope.$on('products-empty', function() {
            scope.loading = false;
            scope.results_empty = true;
        });

        scope.selectedPage = 1;
        scope.pageSize = 10;
        scope.numPages = 0;
        scope.pageNumbers = [];

        scope.incrementPage = function() {
            if (scope.selectedPage < scope.pageNumbers.length) {
                Analytics.track('product', 'increment page');
                scope.selectPage(scope.selectedPage + 1);
            }
        };

        scope.decrementPage = function() {
            if (scope.selectedPage > 1) {
                Analytics.track('product', 'decrement page');
                scope.selectPage(scope.selectedPage - 1);
            }
        };

        scope.selectPage = function(page) {
            scope.selectedPage = page;
            scope.selectedProducts = scope.products.slice(
                    (scope.selectedPage - 1) * scope.pageSize,
                    scope.selectedPage * scope.pageSize);
            scope.hideProductDetails();
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
        };

        scope.showProductDetails = function(index) {
            Analytics.track('product', 'show product details');
            scope.hideProductDetails();
            scope.productMessage = '';
            scope.selectedProduct = index;
            scope.selectedProducts[index].selected = true;

            var root = angular.element(document.querySelector(
                '#search-products-section'))[0];

            // Product div animates as it expands, so need to infer height
            // from initial state (2x height/width)
            var height = root.children[index].offsetHeight;
            $timeout(function (){
                var offset = root.children[index].offsetTop;
                var scrollOffset = offset - ($window.innerHeight -
                    2 * height) / 2;
                $window.scrollTo(0, scrollOffset);
            }, 100);
        };

        scope.hideProductDetails = function() {
            scope.selectedProduct = -1;
            scope.selectedProducts.map(function(p) {
                p.selected = false;
                return p;
            });
        };

        scope.fixImage = function(img) {
            var jImg = $(img);
            if(jImg.width()<250) {
                var newSrc = jImg.attr('src').replace('500x500', '250x250');
                jImg.attr('src', newSrc);
                scope.products[jImg.attr('index')].imgUrl=newSrc;
            }
        };

        scope.goToProduct = function($index, $event) {
            if (scope.selectedProduct == $index) {
                //$window.open(scope.selectedProducts[$index].url, '_blank');
                scope.startCampaignFrom($index);
                $event.stopPropagation();
            }
        };

        scope.startCampaignFrom = function(index) {
            ProductService.createCampaignFromProduct(
                scope.selectedProducts[index].url,
                scope.selectedProducts[index].price,
                scope.selectedProducts[index].title,
                scope.selectedProducts[index].imgUrl
            );
        };

        scope.saveForLater = function(index) {
            scope.isSavingForLater = true;
            var saver = ProductService.saveForLater(
                scope.selectedProducts[index].retailer,
                scope.selectedProducts[index].url,
                scope.selectedProducts[index].price,
                scope.selectedProducts[index].title,
                scope.selectedProducts[index].description,
                scope.selectedProducts[index].imgUrl
            );
            if(saver) {
                saver.success(function (response) {
                    scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                    scope.isSavingForLater = false;
                })
                .error(function (response) {
                    scope.productMessage = "An error occurred while saving the product: " + response['error'];
                    scope.isSavingForLater = false;
                });
            } else {
                scope.isSavingForLater = false;
            }
        };

        var performHeadSearch = function () {
            scope.submit();
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
            $window.sessionStorage.setItem('fromSearch', null);
        };

        $rootScope.$on('performSearchFromHeader', function () {
            scope.product_url = $('#product-search-input-head').val();
            performHeadSearch();
        });

        $rootScope.$on('performSearchFromUrl', function () {
            scope.product_url = $window.sessionStorage.getItem('searchTermFromUrl');
            performHeadSearch();
        });
    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/product/product-search.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsOverlay', gsOverlay);

function gsOverlay($compile, $timeout, $window, GiftStartService, Analytics) {
    function link(scope, element, attrs) {
        var overlayElement = angular.element('gs-overlay div.overlay');

        function drawGrid() {
            // Add artificial delay so the DOM elements have time to settle.
            $timeout(function () {
                var overlayHeight = overlayElement.height();
                var overlayWidth = overlayElement.width();

                Analytics.track('campaign', 'overlay drawn');
                var marginHeight = overlayHeight/GiftStartService.giftStart.rows/20;
                var marginWidth = overlayWidth/GiftStartService.giftStart.columns/20;
                var margin = (marginHeight > marginWidth) ? marginWidth : marginHeight;
                var height = Math.floor(overlayHeight/GiftStartService.giftStart.rows - 2*margin);
                var width = Math.floor(overlayWidth/GiftStartService.giftStart.columns - 2*margin - 1);
                scope.$on('hide-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '0');});
                scope.$on('show-overlay', function() {angular.element('gs-overlay div.overlay .part-cell').css('opacity', '1');});
                // Calculate max widths for bought part user images
                var usrHeight  = overlayHeight/GiftStartService.giftStart.rows - 4*margin;
                var usrWidth  = overlayWidth/GiftStartService.giftStart.columns - 4*margin;
                var usrShortEdge = (usrHeight > usrWidth) ? usrWidth : usrHeight;
                overlayElement.empty();
                if(GiftStartService.giftStart.parts !== 'undefined' && GiftStartService.giftStart.parts.length !== 'undefined'){
                    for (var i = 0; i < GiftStartService.giftStart.parts.length; i++) {
                        var divString = '<div class="part-cell c'+i+
                            '" ng-class="{bought: giftstart.parts['+i+
                            '].bought, selected: giftstart.parts['+i+
                            '].selected, disabled: giftstart.parts['+i+
                            '].disabled}" ng-click="giftstart.parts['+i+
                            '].toggle()" ' +
                            'style="width: '+width+'px;height: '+height+'px;margin:'+margin+'px '+margin+'px;">' +
                            '<div class="td"><span class="price">${{giftstart.parts['+i+
                            '].value / 100 | number : 2}}</span><a ng-href="/users/{{giftstart.parts['+i+'].uid}}"><img class="giver" style="width:' +
                            usrShortEdge + 'px;height:' + usrShortEdge + 'px;" ng-src="{{giftstart.parts['+i+
                            '].img}}"/></a></div></div>';
                        overlayElement.append($compile(divString)(scope));
                    }
                }
            }, 10);
        }

        drawGrid();

        angular.element($window).on('load', drawGrid);
        angular.element($window).on('resize', drawGrid);
        scope.$on('overlay-updated', drawGrid);
        scope.$on('giftstart-loaded', drawGrid);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/scripts/giftstart/overlay/overlay.html'
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('PopoverService', ['$rootScope','$timeout',
    'Analytics','LocalStorage', PopoverService]);

function PopoverService($rootScope,  $timeout,  Analytics, LocalStorage) {

    this.template = '';
    var self = this;
    this.currentLocation = '';
    this.validHashes = ['login', 'pay', 'note', 'thanks'];

    this.setPopover = function(popoverName) {
        //LocalStorage.set('/PopoverService/current', popoverName);
        console && console.log && console.log('setting popover', popoverName);
        if (popoverName === '' || popoverName === null) {
            this.hidePopover();
        } else {
            self.template = '<gs-' + popoverName + '-popover></gs-' + popoverName + '-popover>';
            self.currentLocation = popoverName;
            self.showPopover();
            $rootScope.$broadcast('popover-updated');
        }
    };

    this.setPopoverFromTemplate = function(newTemplate) {
        this.template = newTemplate;
        $rootScope.$broadcast('popover-updated');
    };

    this.getCurrentTemplate = function() {
        return this.template;
    };

    this.hidePopover = function() {
        $timeout(function() {
            //LocalStorage.remove('/PopoverService/current');
            self.contributeLogin = false;
            //LocalStorage.set('/GiftStartService/contributeLogin', false);
            $rootScope.$broadcast('popover-hidden');
            self.currentLocation = '';

            // show olark message app if mobile.
            if (device.mobile()) {
                olark('api.box.show');
            }
        });
    };

    this.showPopover = function() {
        // hide olark message app if mobile.
        if (device.mobile()) {
            olark('api.box.hide');
        }
        //window.setTimeout("var el=jQuery('.popover-container').first();alert('top: '+el.position().top+', left: '+el.position().left+', h: '+el.height()+', w: '+el.width())",1000);
        $rootScope.$broadcast('popover-shown');
    };

    this.nextPopover = function() {
        if (self.validHashes.indexOf(self.currentLocation) + 1 < self.validHashes.length) {
            var nextPopover = self.validHashes[self.validHashes.indexOf(self.currentLocation) + 1];
            self.setPopover(nextPopover);
            Analytics.track('client', 'showing popover ' + nextPopover);
        } else {
            self.hidePopover();
        }
    };

    // Ensure they don't navigate directly to a popover
    //if (LocalStorage.get('/PopoverService/contributeLogin')) {
    //    self.contributeLogin = LocalStorage
    //        .get('/PopoverService/contributing');
    //} else {
        self.contributeLogin = Boolean(self.contributeLogin);
    //}
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPopover', ['PopoverService', '$compile', '$document',
    gsPopover]);


function gsPopover(PopoverService, $compile, $document) {
    function link(scope, element, attrs) {

        scope.popoverShown = false;

        var templateContainer = angular.element(angular.element(element.children()[0]).children()[0]);
        var currentTemplate = '';
        var bodyElement = angular.element($document.find('body')[0]);

        var fixPosition = function() {
            scope.topPosition = $(window).scrollTop();
        };

        scope.topPosition = 0;

        // When something updates the popover service, this should listen and update from service
        scope.$on('popover-updated', popoverUpdated);
        function popoverUpdated() {
            currentTemplate = PopoverService.getCurrentTemplate();
            templateContainer.empty();
            templateContainer.append($compile(currentTemplate)(scope));
        }

        // When something hides via the popover service, this needs to react
        scope.$on('popover-hidden', popoverHidden);
        function popoverHidden() {
            scope.popoverShown = false;
            bodyElement.removeClass('popoverShown');
        }

        // When something shows via the popover service, this needs to react
        scope.$on('popover-shown', popoverShown);
        function popoverShown() {
            scope.popoverShown = true;
            bodyElement.addClass('popoverShown');
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $(window).on("orientationchange",fixPosition);
            }
            fixPosition();
        }

        // Hide if they click outside of popover
        //element.on('click', PopoverService.hidePopover);

        // Prevent hiding if they click inside popover
        templateContainer.on('click', function(e) {e.stopPropagation()});

    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/popover/popover.html'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsFundingBar', [gsFundingBar]);


function gsFundingBar() {
    function link(scope, element, attrs) {}

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/giftstart/funding-bar/funding-bar.html'
    };
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('LoginPopoverController', ['$scope', '$http', '$cookieStore', 'UserService',
    'PopoverService','GiftStartService','TwitterService','FacebookService',
    '$location','GooglePlusService','Analytics','AppStateService', 'emailLoginService', '$routeParams', '$timeout',
    LoginPopoverController]);


function LoginPopoverController($scope, $http, $cookieStore, UserService,  PopoverService,
                                GiftStartService,  TwitterService,
                                FacebookService,  $location, GooglePlusService,
                                Analytics,  AppStateService, emailLoginService, $routeParams, $timeout) {

    $scope.loggedIn = UserService.loggedIn;

    $scope.emailFormModel = {
        isLogin: true,
        isLoginCreate: false,
        isForgotPassword: false,
        isEmailLogin: false,
        isReset: false,
        emailname: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        message: '',
        loginInProgress: false,
        createInProgress: false,
        resetInProgress: false,
        getPwInProgress: false,
        showOk: false
    };

    var mode = ($routeParams.resetCode) ? 'reset' : 'login',
        loginUrl = '';

    var loadingComplete = function () {
        $scope.emailFormModel.loginInProgress = false;
        $scope.emailFormModel.getPwInProgress = false;
        $scope.emailFormModel.createInProgress = false;
        $scope.emailFormModel.resetInProgress = false;
    };

    var resetForm = function () {
        if ($scope.emailLoginForm) {
            $scope.emailLoginForm.$setPristine();
            $scope.emailFormModel.message = '';
        }

    };

    var confirmPasswordCheck = function () {
        if ($scope.emailFormModel.password === $scope.emailFormModel.passwordConfirm) {
            $scope.emailLoginForm.$setValidity('confirmPassword', true);
        } else {
            $scope.emailLoginForm.$setValidity('confirmPassword', false);
        }
    }

    $scope.emailFormActions = {
        createLoginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = true;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        forgotPasswordMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = true;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        loginMode: function (event) {
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = true;
            $scope.emailFormModel.isReset = false;
            resetForm();
            event && event.preventDefault();
        },
        resetMode: function () {
            $scope.emailFormModel.isEmailLogin = true;
            $scope.emailFormModel.isLoginCreate = false;
            $scope.emailFormModel.isForgotPassword = false;
            $scope.emailFormModel.isLogin = false;
            $scope.emailFormModel.isReset = true;
            resetForm();
        },
        submit: function () {
            if ($scope.emailLoginForm.$valid) {
                AppStateService.setPath($location.path());
                emailLoginService.login(
                    mode,
                    $scope.emailFormModel.emailname,
                    $scope.emailFormModel.email,
                    $scope.emailFormModel.password,
                    $routeParams.resetCode).
                    then(function (okMsg) {
                        if (mode === 'create' || mode === 'reset') {

                            if (mode === 'reset') {
                                $scope.emailFormModel.message = okMsg;
                            }

                            $timeout(function () {
                                // Automatic log in
                                $scope.emailFormActions.login();
                                $scope.emailFormActions.submit();

                                $scope.emailFormModel.resetInProgress = false;
                                $scope.emailFormModel.createInProgress = false;
                            }, 1000);
                        } else if (mode === 'forgotPassword') {
                            $scope.emailFormModel.message = okMsg;
                            $scope.emailFormModel.showOk = true;
                        }

                        $scope.emailFormModel.loginInProgress = false;
                        $scope.emailFormModel.getPwInProgress = false;
                    }, function (errMsg) {
                        $scope.emailFormModel.message = errMsg;
                        loadingComplete();
                    });

                console.log("submitting " + mode);
            }
        },
        createLogin: function () {
            Analytics.track('user', 'create email login');
            mode = 'create';

            confirmPasswordCheck();

            if ($scope.emailFormModel.email.toLowerCase() === $scope.emailFormModel.emailConfirm.toLowerCase()) {
                $scope.emailLoginForm.$setValidity('confirmEmail', true);
            } else {
                $scope.emailLoginForm.$setValidity('confirmEmail', false);
            }

            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.createInProgress = true;
            }
        },
        forgotPassword: function () {
            Analytics.track('user', 'forgot login password');
            mode = 'forgotPassword';
            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.getPwInProgress = true;
            }
        },
        reset: function () {
            Analytics.track('user', 'reset login password');
            mode = 'reset';

            confirmPasswordCheck();

            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.resetInProgress = true;
            }
        },
        login: function () {
            Analytics.track('user', 'login attempt with email');
            mode = 'login';
            if ($scope.emailLoginForm.$valid) {
                $scope.emailFormModel.loginInProgress = true;
            }
        }
    };

    if (mode === 'reset') {
        $scope.emailFormActions.resetMode();
    }

    // Check if user is logged in already
    if (UserService.loggedIn) {loginComplete()}


    // Send user to social login site
    function completeLogin(socialService) {
        Analytics.track('user', 'login attempt with ' + socialService);
        AppStateService.setPath($location.path());
        console && console.log && console.log("Setting path", AppStateService.path);
        switch (socialService) {
            case "facebook": FacebookService.login(); break;
            case "twitter": TwitterService.login(); break;
            case "googleplus": GooglePlusService.login(); break;
        }
    }

    //move staged giftstart from browser to server
    function doLogin(socialService) {
        if(AppStateService.get('staged_giftstart')) {
            console && console.log && console.log("staged-create: " + AppStateService.get('staged_giftstart')['staging_uuid']);
            $http.post('/giftstart/create.json', AppStateService.get('staged_giftstart'))
                .success(function (response) {
                    AppStateService.remove('staged_giftstart');
                    completeLogin(socialService);
                })
                .error(function () {
                    console && console.log && console.log("Error while staging GiftStart; retrying...");
                    doLogin(socialService);
                });

        } else {
            completeLogin(socialService);
        }
    }

    // If they aren't, they'll need to log in
    $scope.facebookLogin = function () {doLogin("facebook")};
    $scope.twitterLogin = function() {doLogin("twitter");};
    $scope.googleLogin  = function() {doLogin("googleplus");};

    $scope.hidePopover = PopoverService.hidePopover;

    function loginComplete() {
        Analytics.track('user', 'login succeeded');
        if (/\/create(\/|$)/.test($location.path())) {
            //give login time to propagate
            setTimeout(GiftStartService.createGiftStart,500);
            setTimeout(PopoverService.hidePopover,2500);
        } else if (($location.path().search('giftstart?') != -1) && PopoverService.contributeLogin) {
            PopoverService.contributeLogin = false;
            PopoverService.nextPopover();
        } else {
            PopoverService.hidePopover();
        }
    }

    TwitterService.getAuthUrl();

    $scope.$on('login-success', loginComplete);

}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsLoginPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/login/login-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var noteText = '';
    var skipNote = false;

    var notePopoverController = function ($scope, $rootScope, $location, UserService, PopoverService, GiftStartService, Analytics) {
        
        $scope.noteText = noteText;
        $scope.skipNote = skipNote;
        $scope.profilePicture = UserService.profileImageUrl;
        $scope.name = UserService.name;

        $scope.$on('pitchin-image-changed', function (event,imgUrl) {
            $scope.profilePicture = imgUrl;
        });

        $scope.hidePopover = function () {
            PopoverService.hidePopover();
        };

        $scope.editPhoto = function () {
            noteText = $scope.noteText;
            skipNote = $scope.skipNote;
            PopoverService.setPopover('profile');
        };

        $scope.action = {
            submit: function () {
                if ($scope.skipNote) {
                    Analytics.track('pitchin', 'no note submitted');
                    GiftStartService.saveNote(' ', $scope.name);
                } else {
                    Analytics.track('pitchin', 'note submitted');
                    GiftStartService.saveNote($scope.noteText, $scope.name);
                }
                //PopoverService.setPopover('thanks');
                $rootScope.$broadcast('signbox-hidden');
                $scope.skipNote = skipNote = false;
                $scope.noteText = noteText = '';
                $scope.name = UserService.name;
                $scope.profilePicture = UserService.profileImageUrl;
            }
        }
    };

    app.controller('NotePopoverController', ['$scope', '$rootScope', '$location', 'UserService', 'PopoverService','GiftStartService','Analytics', notePopoverController]);
}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsNotePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/note/note-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var profilePopoverController = function ($scope, UserService, PopoverService, GiftStartService, Analytics) {

        $scope.profilePicture = UserService.profileImageUrl;
        $scope.useAsProfilePicture = false;
        $scope.editMode = false;

        $scope.user = UserService.user;

        var imageData;

        $scope.imageSet = false;

        $scope.imageUpdated = imageUpdated;

        $scope.userHasDefaultProfileImage = false;

        UserService.isSystemDefaultProfileImage(UserService.uid,
            function(data) {
                $scope.userHasDefaultProfileImage = data;
            }
        );

        function imageUpdated(data) {
            console && console.log && console.log("imageUpdated: "+data);
            $scope.imageSet = true;
            imageData = data;
        }

        function saveUpdatedImage() {
            if($scope.useAsProfilePicture) {
                UserService.uploadProfileImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        UserService.profileImageUrl = newImageUrl;
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                        $scope.$parent.$broadcast('profile-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update profile image', reason);
                    });
            } else {
                GiftStartService.uploadImage(imageData)
                    .success(function (newImageUrl) {
                        GiftStartService.saveImage(newImageUrl);
                        $scope.$parent.$broadcast('pitchin-image-changed',newImageUrl);
                    })
                    .error(function (reason) {
                        console && console.log && console.log('Failed to update pitch-in image', reason);
                    });
            }
        }

        $scope.cancel = function () {
            //PopoverService.setPopover('note');
            PopoverService.hidePopover();
        };

        $scope.action = {
            submit: function () {
                if ($scope.imageSet) {
                    saveUpdatedImage();
                    Analytics.track('pitchin', 'user pitchin image '+($scope.useAsProfilePicture?'and profile image ':'')+'changed');
                    //PopoverService.setPopover('note');
                    PopoverService.hidePopover();
                } else {
                    Analytics.track('pitchin', 'user image not changed');
                    //PopoverService.setPopover('note');
                    PopoverService.hidePopover();
                }
                $scope.editMode = false;
            }
        }
    };

    app.controller('ProfilePopoverController', ['$scope','UserService','PopoverService','GiftStartService','Analytics', profilePopoverController]);
}(angular.module('GiftStarterApp')));


/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsProfilePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/profile/profile-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PayPopoverController', ['$scope','$rootScope','GiftStartService',
    'PopoverService','UserService','Analytics','CardService','$timeout',
    PayPopoverController]);

function PayPopoverController($scope, $rootScope, GiftStartService, PopoverService,
                              UserService,  Analytics, CardService, $timeout) {

    $scope.initialize = function() {

        jQuery('.payment form').find("input[type=text], input[type=email]").val('');

        CardService.fetch();

        // Now that user is logged in, create giftstart in server
        if (!GiftStartService.giftStart.gsid) {
            GiftStartService.createGiftStart()
        }

        $scope.currentCharge = GiftStartService.giftStart.totalSelection;
        $scope.emailSubscribe = true;
        $scope.saveCreditCard = true;
        $scope.pitchingIn = false;
        $scope.userOnMailingList = UserService.onMailingList;
        $scope.addressZip = '';
        $scope.email = '';
        $scope.firstname = '';
        $scope.lastname = '';
        if(UserService.loggedIn) {
            UserService.getUser(UserService.uid, function(data) {
                var u = data[Object.keys(data)[0]];
                $scope.email = u.email;
                if(u.name) {
                    var names = u.name.split(" ");
                    if (names.length > 0) {
                        $scope.firstname = names[0];
                    }
                    if (names.length > 1) {
                        $scope.lastname = names[names.length-1];
                    }
                }
            });
        }

        $scope.cards = CardService.cards;
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.showDeleteCardDialogue = false;
        $scope.cardsLoading = !(CardService.cards.length > 0);

        $scope.errorMessage = '';

        $scope.submitted = false;

        $scope.numberImgUrl = '/assets/cc_icon_card_number.png';
        $scope.cvcImgUrl = '/assets/cc_icon_cvc.png';
        $scope.expiryImgUrl = '/assets/cc_icon_expiry.png';
        $scope.zipImgUrl = '/assets/cc_icon_zip.png';
        $scope.emailImgUrl = '/assets/cc_icon_email.png';

    };

    $scope.initialize();

    $scope.hidePopover = function() {
        PopoverService.hidePopover();
        if($scope.submitted) {
            $rootScope.$broadcast('paybox-hidden');
        } else {
            $rootScope.$broadcast('paybox-hidden-cancel');
        }
    };

    $rootScope.$on('paybox-shown',$scope.initialize);

    $scope.updateFormValidity = function() {
        if ($scope.submitted) {
            $scope.numberImgUrl = $scope.stripeForm.$error.card ?
                '/assets/cc_icon_card_number_error.png' : '/assets/cc_icon_card_number.png';
            $scope.cvcImgUrl = $scope.stripeForm.$error.cvc ?
                '/assets/cc_icon_cvc_error.png' : '/assets/cc_icon_cvc.png';
            $scope.expiryImgUrl = $scope.stripeForm.$error.expiry ?
                '/assets/cc_icon_expiry_error.png' : '/assets/cc_icon_expiry.png';
            $scope.zipImgUrl = $scope.addressZip.length != 5 ?
                '/assets/cc_icon_zip_error.png' : '/assets/cc_icon_zip.png';
            $scope.emailImgUrl = $scope.stripeForm.$error.email ?
                '/assets/cc_icon_email_error.png' : '/assets/cc_icon_email.png';
        }
    };

    $scope.trackConversion =  function() {
        var google_conversion_struct = {
            google_conversion_id: 961290155,
            google_conversion_language: "en",
            google_conversion_format: "2",
            google_conversion_color: "ffffff",
            google_conversion_label: "mwFzCO75mlgQq7-wygM",
            google_conversion_value: GiftStartService.giftStart.totalSelection,
            google_conversion_currency: "USD",
            google_remarketing_only: false
        };
        window.google_trackConversion(google_conversion_struct);
        console && console.log && console.log(google_conversion_struct);
        window.uetq = window.uetq || [];
        var data = {
            ec: 'PitchInThankYou',
            ea: 'PitchInSuccess',
            el: 'PurchaseConfirmation',
            ev: GiftStartService.giftStart.totalSelection,
            gv: GiftStartService.giftStart.totalSelection
        };
        window.uetq.push(data);
        console && console.log && console.log(data);
    };

    $scope.paypalSubmit = function() {
        // 1. User submits card details in field
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.pitchingIn = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    if (data['payment-error']) {
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                    }
                    $timeout(function(){
                        $scope.pitchingIn = false;
                        //$rootScope.$broadcast('paybox-hidden');
                    },1000);
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachCardData($scope.number,$scope.cvc,$scope.expiry,$scope.addressZip);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.firstname = $scope.firstname;
            GiftStartService.payment.lastname = $scope.lastname;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                if (data['payment-error']) {
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                }
                $timeout(function(){
                    $scope.pitchingIn = false;
                    //$rootScope.$broadcast('paybox-hidden');
                },1000);
            });
        }
    };

    $scope.stripeSubmit = function(status, response) {
        // Charge process!
        // 1. User submits card details in field
        // 2. Client app sends details to stripe
        // 3. Stripe validates details and sends response with card id
        // 4. Client app sends response with card id to server app
        // 5. Server app attempts to charge card, responds with result (success/fail)
        $scope.submitted = true;
        $scope.updateFormValidity();
        GiftStartService.payment.subscribe = $scope.emailSubscribe;
        if ($scope.selectedCard) {
            GiftStartService.payWithFingerprint($scope.selectedCard)
                .success(function (data) {
                    $scope.pitchingIn = false;
                    if (data['payment-error']) {
                        console&&console.log&&console.log(data['payment-error']);
                        $scope.errorMessage = data['payment-error'];
                    } else {
                        $scope.trackConversion();
                        $rootScope.$broadcast('paybox-hidden');
                    }
                })
                .error(function(data) {
                    $scope.pitchingIn = false;
                    console&&console.log&&console.log(data);
                    //$rootScope.$broadcast('paybox-hidden');
                });
        } else if (response.error) {
            $scope.pitchingIn = false;
            //$rootScope.$broadcast('paybox-hidden');
            console&&console.log&&console.log(response);
            Analytics.track('pitchin', 'payment error');
        } else {
            // Got stripe token, attach it to the current giftstart payment
            Analytics.track('pitchin', 'payment submitted',
                GiftStartService.giftStart.gsid.toString(),
                $scope.currentCharge);
            GiftStartService.attachStripeResponse(response);
            GiftStartService.payment.emailAddress = $scope.email;
            GiftStartService.payment.saveCreditCard = $scope.saveCreditCard;
            GiftStartService.sendPayment(function (data) {
                $scope.pitchingIn = false;
                if (data['payment-error']) {
                    console&&console.log&&console.log(data['payment-error']);
                    $scope.errorMessage = data['payment-error'];
                } else {
                    $scope.trackConversion();
                    $rootScope.$broadcast('paybox-hidden');
                }
            });
        }
    };

    $scope.$on('payment-success', function() {
        Analytics.track('pitchin', 'payment succeeded',
            GiftStartService.giftStart.gsid.toString(),
            $scope.currentCharge);
        //if(PopoverService.currentLocation=='pay') {
        //    PopoverService.nextPopover();
        //}
        //PopoverService.setPopover('note');
        $scope.pitchingIn = false;
        $rootScope.$broadcast('paybox-hidden');
        $scope.number = '';
        $scope.cvc = '';
        $scope.expiry = '';
        $scope.addressZip = '';
    });

    $scope.$on('cards-fetch-success', cardsFetched);

    $scope.$on('cards-fetch-failure', cardsFetchFailed);

    function cardsFetchFailed() {
        $scope.cardsLoading = false;
    }

    function cardsFetched() {
        $scope.cards = CardService.cards;
        deselectCards();
        //auto-select first card
        if ($scope.cards.length > 0) {
            $scope.selectCard.apply({card: $scope.cards[0]});
        }
        $scope.putNew = !(CardService.cards.length > 0);
        $scope.cardsLoading = false;
    }

    $scope.deselectCards = deselectCards;
    function deselectCards(except) {
        $scope.showDeleteCardDialogue = false;
        $scope.selectedCard = '';
        $scope.selectedLastFour = '';
        for (var i = 0; i < $scope.cards.length; i++) {
            if ($scope.cards[i].fingerprint != except) {
                $scope.cards[i].selected = false;
            }
        }
    }

    $scope.deleteSelectedCard = function() {
        $scope.showDeleteCardDialogue = false;
        if ($scope.selectedCard) {
            CardService.deleteCard($scope.selectedCard)
                .success(function(response){
                    CardService.fetch()
                });
        }
    };

    $scope.selectCard = function(allowToggle) {
        if (this.card.fingerprint == $scope.selectedCard) {
            deselectCards();
        } else {
            deselectCards(this.card.fingerprint);
            this.card.selected = true;
            $scope.selectedCard = this.card.fingerprint;
            $scope.selectedLastFour = this.card.last_four
        }
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/pay/pay-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').service('CardService', ['$rootScope',
    '$http', 'UserService', 'Analytics', cardService]);

function cardService($rootScope, $http, UserService, Analytics) {
    var self = this;

    var brandImgMap = {
        'Visa': '/assets/visa_card.png',
        'visa': '/assets/visa_card.png',
        'American Express': '/assets/amex_card.png',
        'amex': '/assets/amex_card.png',
        'MasterCard': '/assets/mastercard_card.png',
        'mastercard': '/assets/mastercard_card.png',
        'Discover': '/assets/discover_card.png',
        'discover': '/assets/discover_card.png',
        'JCB': '/assets/jcb_card.png',
        'jcb': '/assets/jcb_card.png',
        'Diners Club': '/assets/dinersclub_card.png',
        'diners': '/assets/dinersclub_card.png',
        'Unknown': '/assets/unknown_card.png',
        'unknown': '/assets/unknown_card.png'
    };

    this.cards = [];
    this.fetch = fetchCards;
    this.deleteCard = deleteCard;

    function fetchCards() {
        if(UserService.uid!=-1) {
            Analytics.track('client', 'user cards fetch started');
            return $http({method: 'GET', url: '/users/' + UserService.uid +
                '/cards.json'})
                .success(handleCardResponse)
                .error(function(reason) {
                    $rootScope.$broadcast('cards-fetch-failure');
                    Analytics.track('client', 'user cards fetch failed');

                });
        }
    }

    function deleteCard(fingerprint) {
        Analytics.track('client', 'user card deleted');
        var deleteIndex = -1;
        for (var i = 0; i < this.cards.length; i++) {
            if(this.cards[i].fingerprint == fingerprint) {deleteIndex=i;}
        }
        if(deleteIndex>=0) {this.cards.splice(deleteIndex, 1);}
        return $http({method: 'POST', url: '/users/' + UserService.uid +
            '/cards.json', data: {action: 'delete-card', fingerprint: fingerprint}});
    }

    function addCardImage(card) {
        var newCard = card;
        newCard.brandImage = brandImgMap[card.brand];
        return newCard;
    }

    function handleCardResponse(data) {
        Analytics.track('client', 'user cards fetch succeeded');
        if (typeof data == 'string') {
            self.cards = JSON.parse(data).map(addCardImage);
        } else {
            self.cards = data.map(addCardImage);
        }
        $rootScope.$broadcast('cards-fetch-success');
        return self.cards;
    }

    return this;
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ThanksPopoverController', ['$scope',
    'PopoverService','GiftStartService','UserService','FacebookService',
    'TwitterService','GooglePlusService','Analytics',
    ThanksPopoverController]);

function ThanksPopoverController($scope,  PopoverService,  GiftStartService,
                                 UserService,  FacebookService,
                                 TwitterService, GooglePlusService,
                                 Analytics) {

    $scope.close = function(){PopoverService.hidePopover()};

    $scope.mailSubject = "Join us on a gift together";
    $scope.mailBody= "I thought you might be interested in pitching in on this GiftStarter campaign:%0D%0A%0D%0Ahttp://www.giftstarter.com/giftstart?gs-id="
        + GiftStartService.giftStart.gsid;


    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookMsg = function() {
        Analytics.track('campaign', 'facebook share from thanks');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from thanks');
        //FacebookService.inviteFriends(UserService.uid, 'share');
        FB.ui(
         {
          method: 'share',
          href: $location.absUrl()
        }, function(response){});
        FB.Canvas.setAutoGrow();
    };


    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from thanks');
        TwitterService.share(UserService.uid);
    };

    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from thanks');
        GooglePlusService.share(UserService.uid);
    };

    $scope.hidePopover = PopoverService.hidePopover;
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsThanksPopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/thanks/thanks-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    'use strict';

    var emailSharePopoverController = function ($scope,
                                                PopoverService,
                                                $http,
                                                UserService,
                                                Analytics,
                                                GiftStartService,
                                                $location) {

        var email = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+\.([a-z0-9-]+)+$/i,
            emails;

        var trackEmailClientClick = function () {
            Analytics.track('client', 'email client share clicked');
        };

        var sendEmail = function (to, from, message, share_url) {
            Analytics.track('campaign', 'email share submitted');
            $scope.sending = true;
            $http({
                method: 'PUT',
                url: '/giftstart/share',
                data: {
                    to: to,
                    from: from,
                    message: message,
                    share_url: share_url,
                    gsid: GiftStartService.giftStart.gsid,
                    sender_name: UserService.name,
                    sender_uid: UserService.uid
                }
            })
            .success(function() {
                Analytics.track('campaign', 'email share succeeded');
                $scope.sending = false;
                $scope.toEmails = '';
                $scope.fromEmail = '';
                $scope.message = '';
                $scope.hidePopover();
            })
            .error(function() {
                $scope.sending = false;
                Analytics.track('campaign', 'email share failed');
            });
        };

        $scope.toEmails = '';
        $scope.fromEmail = UserService.email;
        $scope.userSvcName = UserService.name;
        $scope.gsName = GiftStartService.giftStart.title
        $scope.formValid = true;
        $scope.message = "I thought you might be interested in pitching in on this GiftStarter campaign:";
        $scope.formValid = true;
        $scope.emailUrl = "mailto:?subject=" +
                          encodeURI("Join us on a gift together") +
                          "&body=" +
                          encodeURI("I thought you might be interested in pitching in on this GiftStarter campaign:\n\n" +
                          $location.absUrl());

        $scope.sending = false;

        $scope.hidePopover = PopoverService.hidePopover;

        $scope.trackEmailClientClick = trackEmailClientClick;

        $scope.submit = function () {
            emails = $scope.toEmails
                .replace(/[ \n]/g, "")
                .split(/[,;]/)
                .filter(function (eml) { return eml !== ''; });

            $scope.formValid = emails.length > 0 && emails.every(function (s) { return email.test(s) }) && email.test($scope.fromEmail);

            if ($scope.formValid) {
                $location.search('re', btoa(JSON.stringify({
                    type: 'consumer',
                    uid: UserService.uid,
                    channel: 'email',
                    uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    })
                })));
                sendEmail(emails, $scope.fromEmail, $scope.message, $location.absUrl());
                $location.search('re', null);
            }
        };
    };

    app.controller('EmailSharePopoverController', [
        '$scope',
        'PopoverService',
        '$http',
        'UserService',
        'Analytics',
        'GiftStartService',
        '$location',
        emailSharePopoverController
    ]);

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsEmailSharePopover',
    function() {return {restrict: 'E',
        templateUrl: '/scripts/popover/email-share/email-share-popover.html'}});

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {
    var sweepStakesDirective = function ($http, PopoverService) {
        var link = function (scope, element, attr) {
            scope.model = {
                first: '',
                last: '',
                email: '',
                message: ''
            };

            scope.close = function () {
                PopoverService.hidePopover();
            };

            scope.submit = function () {
                if (scope.sweepForm.$valid) {
                    $http.post('/users/sweepstakes.json',{
                        firstname: scope.model.first,
                        lastname: scope.model.last,
                        email: scope.model.email
                    })
                    .success(function (res) {
                        scope.model.message = res['ok'];
                        PopoverService.hidePopover();
                    })
                    .error(function (res) {
                        scope.model.message = res['error'];
                    });
                }
            }
        };

        return {
            restrict: 'E',
            scope: {},
            link: link,
            templateUrl: '/scripts/popover/sweepstakes/sweepstakes-popover.html'
        };
    };

    app.directive('gsSweepstakesPopover', ['$http', 'PopoverService', sweepStakesDirective]);
}(angular.module('GiftStarterApp')));
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('StaffPicksController', ['$scope','$timeout',
    StaffPicksController]);

function StaffPicksController($scope, $timeout) {
    var product = function(image, price, title, desc, avatar, link) {
        this.image = image;
        this.price = price;
        this.title = title;
        this.desc = desc;
        this.avatar = avatar;
        this.link = link;
    };
    $scope.products = [
        new product(
            "/assets/staffpicks/4momsBreeze.jpg",
            "$299.99",
            "4moms® Breeze®",
            "This is the one thing I repeatedly wish I would have splurged on. Typical pack and plays are such a pain to set up and take down, I long for the ease of this one every time!",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/baby/4moms-Breeze-Playard"
        ),
        new product(
            "/assets/staffpicks/lumixgh4.jpg",
            "$1,497.99",
            "Lumix GH4",
            "It's an amazing video-centric DSLR. The Lumix GH4 shoots 4k at 24p, supports VFR and unlimited length, and boasts clean HDMI out and onboard WiFi & NFC – all at half the price of a Canon 5D!",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.com/search/lumix%20gh4"
        ),
        new product(
            "/assets/giftideas/category/electronics/apple-watch-milanese.jpg",
            "$699.99",
            "The Apple Watch Milanese",
            "I love all things tech - so I gotta try it! This band is something I would totally wear every day and even out to a dinner party. I bet my husband would steal it and wear it sometimes too.",
            "/assets/about/img/arry.png",
            "https://www.giftstarter.com/giftideas/electronics/Apple-Watch-Milanese"
        ),
        new product(
            "/assets/staffpicks/hue-personal-wireless-light.jpg",
            "$199.99",
            "Hue Personal Wireless Light",
            "The Philips Hue Personal Wireless Lighting Kit connects to your home Wi-Fi and" +
            " up to 50 Philips Hue Bulbs/Lighting. It is the most exciting and unique product. " +
            "The lights sync with an alarm, sets on schedules, " +
            "and the IFTTT connectivity to other 3rd party apps is mindblowing.",
            "/assets/about/img/roy.png",
            "https://www.giftstarter.com/giftideas/electronics/Hue-Personal-Wireless-Light"
        ),
        new product(
            "/assets/staffpicks/uppababy-stroller-2015.jpg",
            "$299.99",
            "UPPAbaby Vista Stroller 2015",
            "It’s the only stroller you’ll ever need. First kid? Use the seat, carseat, or bassinet. Two kids? Attach a second of any of those. Three kids? Add the skateboard to the back. It looks right no matter what configuration you have, and it’s full of features.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/baby/UPPAbaby-Stroller-2015"
        ),
        new product(
            "/assets/staffpicks/steelseries-headset-white-thumb.jpg",
            "$159.99",
            "SteelSeries Headphones with Inline Mic",
            "This is a great gift if you need headphones for gaming, streaming, or everyday. It's got inline mic for streaming, looks nice, and is very comfortable.",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.com/giftideas/electronics/SteelSeries-Headset-White"
        ),
        new product(
            "/assets/staffpicks/brother-thread-serger.jpg",
            "$299.99",
            "Brother Thread Serger",
            "I have my mother’s old sewing machine, but I find for many of my projects a serger would be ideal. This one is very user friendly for novices, with advanced features for experienced users.",
            "/assets/about/img/christie.png",
            "https://www.giftstarter.com/giftideas/forher/Brother-Thread-Serger"
        ),
        new product(
            "/assets/staffpicks/guava-lotus-everywhere-crib.jpg",
            "$509.00",
            "Lotus Everywhere Crib",
            "Transforms from backpack to standard-size crib in under a minute. Lightweight yet stable, with zippered mesh sides and an optional sun-shade, it's perfect for travel AND as a primary sleep-space or play area for your little one.",
            "/assets/about/img/jon.png",
            "https://www.giftstarter.com/giftideas/baby/Guava-Lotus-Everywhere-Crib"
        ),
        new product(
            "/assets/staffpicks/deathadder-gaming-mouse-thumb.jpg",
            "$59.99",
            "Razer Gaming Mouse",
            "This is the ultimate mouse for gaming and everyday use and it's ergonomic, too!!",
            "/assets/about/img/sharon.png",
            "https://www.giftstarter.com/giftideas/electronics/DeathAdder-Gaming-Mouse"
        )
    ];
    var n = 0;
    $scope.firstProduct = $scope.products[n];
    $scope.secondProduct = $scope.products[(n+1)%$scope.products.length];
    var rotate = function() {
        jQuery('.product-item.first').fadeOut(500, function() {
            n = (n + 1) % $scope.products.length;
            $scope.$apply(function() {$scope.firstProduct = $scope.products[n]});
            jQuery('.product-item.second').fadeOut(500, function() {
                $scope.$apply(function() {$scope.secondProduct = $scope.products[(n+1)%$scope.products.length]});
            });
            jQuery('.product-item.first').fadeIn(1000);
            jQuery('.product-item.second').fadeIn(1000);
            timer = $timeout(rotate, 20000);
        });
    };
    var timer = $timeout(rotate, 20000);

    $scope.$on('$destroy', function() {$timeout.cancel(timer);});
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsImageUpload', gsImageUpload);

function gsImageUpload($timeout, $window) {

    function link(scope, element, attrs) {

        var inputEle = document.querySelector('.thanks-image-input');
        var canvasEle = element.children()[0].children[0];
        var ctx = canvasEle.getContext('2d');
        var aspect = attrs.aspect;
        var gsElement = element[0];

        scope.openImageDialog = function () {
            inputEle.click();
        };

        scope.$parent.openImageDialogGlobal = function () {
            scope.openImageDialog();
        };

        // Size canvas to container
        function resizeCanvas() {
            canvasEle.width = gsElement.parentElement.offsetWidth * 2;
            if (aspect) {
                canvasEle.height = gsElement.offsetWidth * 2 / aspect;
            } else {
                canvasEle.height = gsElement.offsetHeight * 2;
            }
        }

        resizeCanvas();

        // Initialize image from localStorage
        if ($window.localStorage.getItem('thank-you-image')) {
            reader = {result: $window.localStorage.getItem('thank-you-image')};
            $window.localStorage.removeItem('thank-you-image');
            makeImage(reader.result);
        }

        // Callback for uploading file
        var reader;
        scope.putImage = function putImage(file) {
            reader = new FileReader();
            reader.onloadend = fileLoaded;
            reader.readAsDataURL(file);
        };

        function setImageRot(orientation) {
            switch (orientation) {
                case 8:
                    ctx.rotate(90 * Math.PI / 180);
                    break;
                case 3:
                    ctx.rotate(180 * Math.PI / 180);
                    break;
                case 6:
                    ctx.rotate(-90 * Math.PI / 180);
                    break;
            }
        }

        function makeImage(imageData) {
            resizeCanvas();
            var tempImg = new Image();
            tempImg.src = imageData;

            tempImg.onload = function imageLoaded() {
                var imageW = tempImg.width;
                var imageH = tempImg.height;
                var rotation = 0;

                if (imageW > imageH) {
                    imageW *= canvasEle.width / imageH;
                    imageH = canvasEle.height;
                } else {
                    imageH *= canvasEle.height / imageW;
                    imageW = canvasEle.width;
                }

                var imageContext = this;
                ctx.drawImage(this, 0, 0, imageW, imageH);
                scope.imageUpdated(canvasEle.toDataURL());

                scope.rotateImage = function rotateImage() {
                    ctx.translate(canvasEle.width / 2, canvasEle.height / 2);
                    rotation = (rotation + 1) % 4;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(-canvasEle.width / 2, -canvasEle.height / 2);
                    ctx.drawImage(imageContext, imgX, imgY,
                        imageW, imageH);
                    scope.imageUpdated(canvasEle.toDataURL());
                };

                var dragReady = true;
                var dragPrevX = 0;
                var dragPrevY = 0;
                var imgX = 0;
                var imgY = 0;
                var dragNextX = 0;
                var dragNextY = 0;
                var dragging = false;
                angular.element(canvasEle)
                    .on('mousedown touchstart', function (event) {
                        if (dragReady) {
                            dragReady = false;
                            $timeout(function () {
                                dragReady = true;
                            }, 100);

                            dragging = true;
                            dragPrevX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragNextX = dragPrevX;
                            dragPrevY = event.screenY ||
                                event.touches.item(0).screenY;
                            dragNextY = dragPrevY;
                        }
                    });
                angular.element(canvasEle)
                    .on('mouseup touchend mouseleave touchleave',
                    function (event) {
                        dragging = false;
                        scope.imageUpdated(canvasEle.toDataURL());
                    });
                angular.element(canvasEle)
                    .on('mousemove touchmove', function (event) {
                        if (dragging) {
                            event.preventDefault();
                            // Transform drag based on rotation
                            switch (rotation) {
                                case 0:
                                    imgX += dragNextX - dragPrevX;
                                    imgY += dragNextY - dragPrevY;
                                    break;
                                case 1:
                                    if (imageW > imageH) {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    } else {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    }
                                    break;
                                case 2:
                                    imgX -= dragNextX - dragPrevX;
                                    imgY -= dragNextY - dragPrevY;
                                    break;
                                case 3:
                                    if (imageW > imageH) {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    } else {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    }
                                    break;
                            }

                            dragPrevX = dragNextX;
                            dragNextX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragPrevY = dragNextY;
                            dragNextY = event.screenY ||
                                event.touches.item(0).screenY;
                            if (imgX > 0) {
                                imgX = 0
                            }
                            if (imgY > 0) {
                                imgY = 0
                            }
                            if (imageH + imgY < canvasEle.height) {
                                imgY = canvasEle.height - imageH;
                                dragPrevY = dragNextY;
                            }
                            if (imageW + imgX < canvasEle.width) {
                                imgX = canvasEle.width - imageW;
                                dragPrevX = dragNextX;
                            }

                            ctx.drawImage(imageContext, imgX, imgY,
                                imageW, imageH);
                        }
                    });

            };
        }


        function fileLoaded() {
            // Cache thank-you image
            try {
                $window.localStorage.setItem('thank-you-image', reader.result);
            } catch (exception) {
                console && console.log && console.log("Unable to store image in localStorage",
                    exception);
            }
            makeImage(reader.result);
            scope.$parent.imgloading = false;
        }

        function fileChanged() {
            scope.putImage(inputEle.files[0]);
        }
        angular.element(inputEle).on('change', function () {
            scope.$parent.imgloading = true;
            $timeout(function () {
                fileChanged();
            }, 100);
        });
    }

    return {
        restrict: 'E',
        scope: {imageUpdated: '=onImageUpdated', imageData: '=newImageData'},
        link: link,
        templateUrl: '/scripts/utilities/image-upload/image-upload.html'
    };
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('LocalStorage', ['$window', LocalStorage]);

function LocalStorage($window) {

    this.set = set;
    this.get = get;
    this.remove = remove;

    function set(key, data) {
        var item = data;
        if (typeof data != 'string') {
            item = JSON.stringify(data);
        }
        $window.localStorage.setItem(key, item);
    }

    function get(key) {
        var item = $window.localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (e) {}
        return item;
    }

    function remove(key) {
        $window.localStorage.removeItem(key);
    }
}
// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/N48EEGX3xi555mzpZNQw.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

//
// UserVoice Javascript SDK developer documentation:
// https://www.uservoice.com/o/javascript-sdk
//

// Set colors
UserVoice.push(['set', {
    accent_color: '#e23a39',
    trigger_color: 'white',
    trigger_background_color: '#df484b'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {
    //email:      'john.doe@example.com', // User’s email address
    //name:       'John Doe', // User’s real name
    //created_at: 1364406966, // Unix timestamp for the date the user signed up
    //id:         123, // Optional: Unique id of the user (if set, this should not change)
    //type:       'Owner', // Optional: segment your users by type
    //account: {
    //  id:           123, // Optional: associate multiple users with a single account
    //  name:         'Acme, Co.', // Account name
    //  created_at:   1364406966, // Unix timestamp for the date the account was created
    //  monthly_rate: 9.99, // Decimal; monthly rate of the account
    //  ltv:          1495.00, // Decimal; lifetime value of the account
    //  plan:         'Enhanced' // Plan name for the account
    //}
}]);

// Add default trigger to the bottom-right corner of the window:
//UserVoice.push(['addTrigger', { mode: 'contact', trigger_position: 'bottom-right' }]);

// Or, use your own custom trigger:
//UserVoice.push(['addTrigger', '#id', { mode: 'contact' }]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);
(function () {
    GiftStarterApp.directive('clamp', clampDirective);

    clampDirective.$inject = ['$timeout'];
    function clampDirective($timeout) {
        var directive = {
            restrict: 'A',
            link: linkDirective
        };

        return directive;

        function linkDirective(scope, element, attrs) {
            $timeout(function () {
                var lineCount = 1, lineMax = +attrs.clamp;
                var lineStart = 0, lineEnd = 0;
                var text = element.html().replace(/\n/g, ' ');
                var maxWidth = element[0].offsetWidth;
                var estimateTag = createElement();

                element.empty();
                element.append(estimateTag);

                text.replace(/ /g, function (m, pos) {
                    if (lineCount >= lineMax) {
                        return;
                    } else {
                        estimateTag.html(text.slice(lineStart, pos));
                        if (estimateTag[0].offsetWidth > maxWidth) {
                            estimateTag.html(text.slice(lineStart, lineEnd));
                            resetElement(estimateTag);
                            lineCount++;
                            lineStart = lineEnd + 1;
                            estimateTag = createElement();
                            element.append(estimateTag);
                        }
                        lineEnd = pos;
                    }
                });
                estimateTag.html(text.slice(lineStart));
                resetElement(estimateTag, true);

                scope.$emit('clampCallback', element, attrs);
            });
        }
    }

    return;

    function createElement() {
        var tagDiv = document.createElement('div');
        (function (s) {
            s.position = 'absolute';
            s.whiteSpace = 'pre';
            s.visibility = 'hidden';
            s.display = 'inline-block';
        })(tagDiv.style);

        return angular.element(tagDiv);
    }

    function resetElement(element, type) {
        element.css({
            position: 'inherit',
            overflow: 'hidden',
            display: 'block',
            textOverflow: (type ? 'ellipsis' : 'clip'),
            visibility: 'inherit',
            whiteSpace: 'nowrap',
            width: '100%'
        });
    }
})();

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsItButton', ['GiftStartService',
    gsItButton]);

function gsItButton(GiftStartService) {

    // Things I need:
    // product url
    // product title
    // product price
    // product img url

    function link(scope, ele, attrs) {
        var anchor = ele[0].children[0].children[0];
        anchor.href = calculateLink();
    }

    function calculateLink() {
        console && console.log && console.log(GiftStartService.giftStart);
        return url = '/create?' + urlSerialize({
                product_url: GiftStartService.giftStart.product_url,
                title: GiftStartService.giftStart.product_title,
                price: GiftStartService.giftStart.price,
                img_url: GiftStartService.giftStart.product_img_url,
                source: 'GiftStarter'
            });
    }

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/button/giftstart-it-button.ng.html'
    }
}
/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsItHeader', ['$interval',
    '$window', '$location', 'Analytics', gsItHeader]);

function gsItHeader($interval, $window, $location, Analytics) {

    var $scope,
        shown = $location.path().indexOf('/giftstart') != 0;

    function link(scope, ele, attr) {
        $scope = scope;

        $scope.hideButtonHeader = hideButtonHeader;
        $scope.linkClicked = linkClicked;

        function hideButtonHeader() {$scope.shown = false}
        function showButtonHeader() {$scope.shown = true}
        function onScroll() {
            if (!shown) {
                if (200 < ($window.scrollY || $window.scrollTop)) {
                    shown = true;
                    showButtonHeader();
                }
            }
        }

        function linkClicked() {
            Analytics.track('client', 'giftstart it header button clicked');
        }

        scope.$on('$routeChangeStart', hideButtonHeader);

        var interval = $interval(onScroll, 2000);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/giftstart-it-header.ng.html'
    }
}

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').directive('gsSubscribeHeader', ['$location',
    'Analytics', '$timeout', 'UserService', gsSubscribeHeader]);

function gsSubscribeHeader($location, Analytics, $timeout, UserService) {
    var $scope,
        show = $location.path().indexOf('/giftstart') == -1 &&
            !UserService.onMailingList;

    function link(scope, ele, attr) {
        $scope = scope;

        $scope.subscribeShow = true;
        $scope.hideSubscribeHeader = hideHeader;
        $scope.subscribeClicked = subscribeClicked;

        function hideHeader() {$scope.subscribeShow = false}
        function showHeader() {$scope.subscribeShow = true}

        function subscribeClicked() {
            Analytics.track('client', 'header email subscribed');
        }

        $timeout(function() {
            if (show) {
                showHeader();
                show = false;
            }
        }, 1500);
    }

    return {
        scope: $scope,
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/header/subscribe-header.ng.html'
    }
}
