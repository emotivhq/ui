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
        'ngSanitize', 'ngAB', 'ngResource', 'ui.date', 'gsAngulartics', 'mgo-angular-wizard']);

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
        .when('/yourvillage',
        {templateUrl: '/views/yourvillage/yourvillage.html', reloadOnSearch: false})
        .when('/test',
        {templateUrl: '/views/home/home.html', reloadOnSearch: false})
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
        {templateUrl: '/views/login/login.html', reloadOnSearch: false})
        .when('/join',
        {templateUrl: '/views/join/join.html', reloadOnSearch: false})
        .when('/is',
        {templateUrl: '/views/is/is.html', reloadOnSearch: false})
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
	$locationProvider.html5Mode(true);

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
			$scope.bg = 'white';
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

angular.module('GiftStarterApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/views/home/home.html',
    "We will be moving all views out of scripts and into views. In due time."
  );


  $templateCache.put('/views/is/is.html',
    "<div class=\"howitworks static-pages\" ng-controller=\"HowItWorksController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>Crowdfunding for Gifts</h1>\n" +
    "    <p>Let us tell you a bit more about how it works.<br />GiftStarter is the place to give and get meaningful gifts. Gift and pay for ANY product or service TO anyone WITH anyone.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/concierge\">ASK A QUESTION</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div class=\"menu\">\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'welcome'\" ng-class=\"{selected: sectionShown == 'welcome'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          WELCOME\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'group-gifting'\" ng-class=\"{selected: sectionShown == 'group-gifting'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GROUP GIFTING\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'concierge'\" ng-class=\"{selected: sectionShown == 'concierge'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GIFT CONCIERGE\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'search'\" ng-class=\"{selected: sectionShown == 'search'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          FIND A GIFT\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'glossary'\" ng-class=\"{selected: sectionShown == 'glossary'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GLOSSARY\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"selector-bar\"></div>\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <div id=\"welcome\" ng-show=\"sectionShown == 'welcome'\">\n" +
    "        <h2>Welcome to GiftStarter!</h2>\n" +
    "        <h4>Start amazing gifts here -- ones you are proud to give, and they're happy to get.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it -- and we help you with the rest. When you use GiftStarter, you don't have to collect the money or chase people down for cash.<br />It only takes a couple minutes to launch a campaign for your gift.\n" +
    "          <br />Start an amazing gift today! Once it is complete, we handle ensuring the card with everyone's messages and the gift is shipped!\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div id=\"glossary\" ng-show=\"sectionShown == 'glossary'\">\n" +
    "        <h2>Giftstarter Glossary</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement bringing people committed to giving amazing gifts.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          Here's a glossary of gifting words to help you in our gifting community:\n" +
    "        </p>\n" +
    "        <table>\n" +
    "          <tr>\n" +
    "            <td>GiftStarter - n.</td>\n" +
    "            <td>That's us! We are here to help you give amazing gifts you are proud to give, and they are happy to get.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Champion - n.</td>\n" +
    "            <td>This is a person (you!) that starts an amazing gift, and invites family and friends to pitch in.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Contributor - n.</td>\n" +
    "            <td>The people invited in by the Gift Champion to pitch in on the amazing gift and sign the card.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Recipient - n.</td>\n" +
    "            <td>The person(s) that receive the amazing gift!</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Concierge - n.</td>\n" +
    "            <td>Our Gift Concierge is like your personal shopper who will help you find and give that amazing gift.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Nudge - n, v.</td>\n" +
    "            <td>These are the gentle friendly reminders (nudges) we make in order to help ensure your gifting event is amazing.</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "      <div id=\"search\" ng-show=\"sectionShown == 'search'\">\n" +
    "        <h2>Find an Amazing Gift</h2>\n" +
    "        <h4>GiftStarter helps you give amazing gifts you are proud to give and they are happy to get.</h4>\n" +
    "        <p class=\"sub\">GiftStarter has the tools to help you find those gifts you’re proud to give, and they’re happy to get.</p>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>SEARCH</p>\n" +
    "            <p>Use our search bar located at the top of the page and on the home page to search for products by name or brand. We source our gifts from reliable stores such as:</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-1.png\" />\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT CONCIERGE</p>\n" +
    "            <p>Our Gift Concierge is like you personal shopping assistant who will help you find the perfect gift for the occassion - even if it’s not on our site!</p>\n" +
    "          </div>\n" +
    "          <div id=\"search-item-concierge\">\n" +
    "            <p>You can <a href=\"mailto:giftconcierge@giftstarter.com\">email</a> (giftconcierge@giftstarter.com), contact via <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">chat</a>, or call  206.486.4849</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT IDEAS</p>\n" +
    "            <p>More of a browser when you shop? Our carefully curated gift ideas are a great place to see what new and exciting products there are to gift.</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-2.png\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div id=\"concierge\" ng-show=\"sectionShown == 'concierge'\">\n" +
    "        <h2>Gift Concierge</h2>\n" +
    "        <h4>Fast, fun, and no pressure personal shopper to help you find that perfect gift. Can't find it? We can help. Can't think of an idea? We can help.</h4>\n" +
    "        <p class=\"sub\">We'll get back to you same day if possible -- definitely within 24 hours.</p>\n" +
    "        <div class=\"concierge-table\">\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>EMAIL<br/><br/>\n" +
    "              Send us an email at any time. The more information you include about your need, the more we can help!<br/><br/><br/>\n" +
    "              <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>LIVE CHAT<br/><br/>\n" +
    "              You can access our live chat program in the bottom right corner of your browser.<br/><br/>\n" +
    "              <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">Don't see it?</a><br/><br/>\n" +
    "              *Live chat available during business hours (PST)\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>ONLINE FORM<br/><br/>\n" +
    "              Fill out the quick form about your gifting need and we'll get on it ASAP!<br/><br/><br/>\n" +
    "              <a href=\"/concierge\" class=\"button\">ONLINE FORM</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p>Or you can just plain call us: 206-486-4849.</p>\n" +
    "      </div>\n" +
    "      <div id=\"group-gifting\" ng-show=\"sectionShown == 'group-gifting'\">\n" +
    "        <h2>Group Gifting Starts Here</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement focused on bringing people together in a community that loves giving amazing gifts.<br/></h4>\n" +
    "        <p class=\"sub\">Our patent-pending technology divides the price of the gift into perfect pieces, giving family and friends the ability to purchases as many or as few pieces as they wish! Any product available online can be gifted with GiftStarter, and we’re here to help every step of the way. From collecting the money to shipping the gift - and even creating a special card with your personal messages - we’ve got you covered!<br/></p>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-1.png\" />\n" +
    "          <p class=\"center\"><strong>1</strong><br/>FIND A GIFT</p><p>Search from over 3 million products on our site. You can also discover our favorite gifts on our Gift Ideas page or contact our Gift Concierge for custom gifts.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-2.png\" />\n" +
    "          <p class=\"center\"><strong>2</strong><br/>SELECT A GIFT</p><p>From the search results or Gift Ideas page, you can click on product images to view product information and details, and the “GiftStart it” button. Click this button to start your group gift!</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-3.png\" />\n" +
    "          <p class=\"center\"><strong>3</strong><br/>ADJUST THE PIECES</p><p>Click the “+” to add pieces, thus lowering the price of each piece. Click the “-” button to remove pieces, and increase the price of each piece. Consider the size of the group you’ll invite; some people will buy 1 piece, some may buy more.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-4.png\" />\n" +
    "          <p class=\"center\"><strong>4</strong><br/>YOUR GIFTING EVENT</p><p>Describe the reason for this gift. What’s the event? Who is it for? Why is this a good gift for this person and/or event?</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-5.png\" />\n" +
    "          <p class=\"center\"><strong>5</strong><br/>THE GIFT</p><p>Tell us where this gift needs to go and when you want it there and we’ll make it happen! <br />*Note standard shipping is always free with GiftStarter</p>\n" +
    "        </div>\n" +
    "        <p class=\"clear sub\">That’s all there is to it. Share and invite friends and family to purchase pieces and give a gift that shows how much you care. We’re here to help you at any time and to ensure the gift and personal card are delivered. <br /><br />Give a remarkable gift today.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"clear\">\n" +
    "      <a href=\"/giftideas\" alt=\"\" class=\"button\" id=\"gifting-button\">START GIFTING</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <h2>Inspiring Examples</h2>\n" +
    "    <ng-include src=\"'/scripts/inspirationalexamples/inspirationalexamples.ng.html'\"></ng-include>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/views/join/join-form.html',
    "<div class=\"userlogin__form hidden\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn create_action ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\tCreate Account\n" +
    "\t\t</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "<wizard on-finish=\"finishedWizard()\"> \n" +
    "<form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action ui form\">\n" +
    "    <wz-step title=\"\" canexit=\"\">\n" +
    "        <h2 class=\"vertical small bottom\">Create a new account</h2>\n" +
    "        <p>Sign up with your e-mail address.</p>\n" +
    "\t\t<div class=\"field ui left icon input\" style=\"width:100%\">\n" +
    "\t\t\t<i class=\"mail icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"you@yourdomain.com\" required style=\"width:100%\" />\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"ui middle aligned center aligned vertical medium top bottom grid\">\n" +
    "\t\t<div class=\"column six\">\n" +
    "\t\t<div class=\"inline field\">\n" +
    "\t\t\t<div class=\"ui checkbox checked column wide four\">\n" +
    "  \t\t\t\t<input type=\"checkbox\" name=\"public\" checked=\"\">\n" +
    "  \t\t\t\t<label>It's ok to send me (very occasional) <br />email about the Giftstarter service.</label>\n" +
    "\t\t\t</div>\n" +
    "   \t\t</div>\n" +
    "\t\t<button class=\"ui right labeled icon button submit\" type=\"submit\" wz-next value=\"Continue\">\n" +
    "  \t\t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\t\tNext\n" +
    "\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t\t</div>\n" +
    "    </wz-step>\n" +
    "    <wz-step title=\"\" canexit=\"\">\n" +
    "        <h2 class=\"vertical small bottom\">Set Up Your Account</h2>\n" +
    "        <p>GiftsStarter is all abut you. How do you want people to recognize you?</p>\n" +
    "\t\t<div class=\"ui middle aligned center grid\">\t\t\t\n" +
    "\t\t<div class=\"column centered\">\t\t\t\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"terminal icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"Your First Name\" required />\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"terminal icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Your Last Name\" required />\n" +
    "\t\t</div>\n" +
    "\t\t</div></div>\n" +
    "\t\t<div class=\"ui middle aligned center aligned vertical large top bottom grid\">\n" +
    "\t\t\t<button class=\"ui right labeled icon button\" type=\"submit\" wz-next value=\"Continue\">\n" +
    "  \t\t\t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\t\t\tNext\n" +
    "\t\t\t</button>\n" +
    "\t\t</div>\n" +
    "    </wz-step>\n" +
    "    <wz-step title=\"\" canexit=\"\">\n" +
    "        <h2 class=\"vertical small bottom\">That' It! Let's Go...</h2>\n" +
    "        <p>Enter a strong password to finish your account stup. Or, take a minute to watch this funny video about how GiftStarter worked for a group of friends. Then get started.</p>\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"protect icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__password\" type=\"password\" name=\"password\" ng-hide=\"$parent.showPassword\" ng-model=\"$parent.password\" placeholder=\"Strong Password\" required />\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"ui middle aligned center aligned vertical large top bottom grid\">\n" +
    "\t\t<button class=\"userlogin__loginbtn create_action ui right labeled icon button primary red\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\" wz-next value=\"Create Account\">\n" +
    "\t\t\t<i class=\"add user icon\"></i>\n" +
    "  \t\t\tCreate Account\n" +
    "\t\t</button>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"userlogin__message ui small message\" ng-show=\"$parent.message\">\n" +
    "  \t\t\t<i class=\"close icon\"></i>\n" +
    "  \t\t\t<div class=\"content\">{{$parent.message}}</div>\n" +
    "\t\t</div>\n" +
    "    </wz-step>\n" +
    "</form>\n" +
    "</wizard>\n"
  );


  $templateCache.put('/views/join/join.html',
    "<div class=\"ui grid stackable join container\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"eight wide column\">\n" +
    "            <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "                <ng-include src=\"'/views/join/join-form.html'\"></ng-include>\n" +
    "                <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "                    <span>Already have an account? </span>\n" +
    "                    <span><a ng-href=\"/login\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "    <div class=\"eight wide column\">\n" +
    "\n" +
    "        <div class=\"masthead segment bg-gradient\">\n" +
    "            <div class=\"ui container\">\n" +
    "                <div class=\"introduction\">\n" +
    "\n" +
    "                   <iframe class=\"tablet computer\" width=\"531\" height=\"305\" src=\"https://www.youtube-nocookie.com/embed/sNP59QXUlFQ?rel=0&amp;controls=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "\n" +
    "\t\t\t\t\t<div class=\"ui icon message vertical medium\">\n" +
    "    \t\t\t\t\t<i class=\"facebook icon blue\"></i>\n" +
    "    \t\t\t\t\t<div class=\"content column two\">\n" +
    "        \t\t\t\t\t<div class=\"header\">\n" +
    "            \t\t\t\t\tRather use social media?\n" +
    "        \t\t\t\t\t</div>\n" +
    "        \t\t\t\t\t<p>It only takes a few clicks to sign up.</p>\n" +
    "    \t\t\t\t\t</div>\n" +
    "    \t\t\t\t\t<div class=\"column three\">\n" +
    "        \t\t\t\t\t<a href=\"#\" class=\"ui blue basic button social\">Start Here</a>\n" +
    "    \t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"ui social basic modal middle aligned center aligned\">\n" +
    "        <i class=\"close icon\"></i>\n" +
    "        <div class=\"ui middle center aligned header\">\n" +
    "            Create Your Account\n" +
    "        </div>\n" +
    "        <div class=\"middle center aligned grid\">\n" +
    "\t\t\t<div class=\"image content container\">\n" +
    "            <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "                <div class=\"social\">\n" +
    "                    <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\">\n" +
    "                        <img class=\"social__icons\" src=\"/assets/login/facebook.png\">\n" +
    "                    </a>\n" +
    "                    <br/>\n" +
    "                    <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\">\n" +
    "                        <img class=\"social__icons\" src=\"/assets/login/twitter.png\">\n" +
    "                    </a>\n" +
    "                    <br/>\n" +
    "                    <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\">\n" +
    "                        <img class=\"social__icons\" src=\"/assets/login/linkedin.png\">\n" +
    "                    </a>\n" +
    "                    <br/>\n" +
    "                    <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\">\n" +
    "                        <img class=\"social__icons\" src=\"/assets/login/google.png\">\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\t\t</div>\n" +
    "    </div>\n" +
    "\t\n" +
    "</div>\n" +
    "\n" +
    "    <script>\n" +
    "        function handlePopupClosed() {\n" +
    "            angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "        }\n" +
    "    </script>"
  );


  $templateCache.put('/views/join/onboard.html',
    "<!--\n" +
    "To change this template use Tools | Templates.\n" +
    "-->\n" +
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/views/login/login-form.html',
    "<div class=\"userlogin__form ui stacked segment\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h3 class=\"vertical small bottom\">Login with your email address:</h3>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action login ui form\">\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"user icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"you@yourdomain.com\" required />\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"hide icon\"></i>\n" +
    "\t\t\t<input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required />\n" +
    "\t\t</div>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\tLogin\n" +
    "\t\t</button>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Did you forgot your password?</a>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form ui stacked segment\" ng-show=\"$parent.showForgot\">\n" +
    "    <h3>Password Reminder</h3>\n" +
    "\t<form ng-submit=\"$parent.doForgotPassword()\" class=\"ui form\">\n" +
    "\t\t<div class=\"field ui left icon input\">\n" +
    "\t\t\t<i class=\"user icon\"></i>\n" +
    "\t\t\t<input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"you@yourdomain.com\" required />\n" +
    "\t\t</div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"forward mail icon\"></i>\n" +
    "  \t\tGet Password\n" +
    "\t\t</button>    \n" +
    "\t</form>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Nevermind, I remember it now...</a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h3>Reset Your Password:</h3>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/views/login/login.html',
    "<div class=\"userlogin ui equal grid stackable centered center aligned\" ng-controller=\"LoginOrCreateController\" class=\"ui grid stackable\">\n" +
    "    <div class=\"userlogin__emaillogin login-block ui six wide column vertical small bottom\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/views/login/login-form.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block ui six wide column center aligned\" ng-show=\"showSocials\">\n" +
    "        <h3 class=\"ui computer tablet\">Or social media:</h3>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-href=\"/join\" class=\"userlogin__createacclink linky\">Join</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/views/yourvillage/yourvillage.html',
    "<style>\n" +
    "    .ui.fixed.menu+.ui.grid.providence {\n" +
    "        padding-top: 0;\n" +
    "    }\n" +
    "    .ui.header .sub.header {\n" +
    "        line-height: 1.4em;\n" +
    "        padding-top: .8rem;\n" +
    "        font-size: 1.2rem;\n" +
    "    }\n" +
    "    .hidden.divider {\n" +
    "        display: block;\n" +
    "    }\n" +
    "</style>\n" +
    "<a class=\"ui teal inverted one item menu top fixed\" href=\"tel:+1-206-486-4849\">\n" +
    "    <div class=\"item\">\n" +
    "        Questions? Give us a call today!\n" +
    "    </div>\n" +
    "</a>\n" +
    "<div class=\"ui grid stackable providence container\">\n" +
    "    <div class=\"sixteen wide column\">\n" +
    "        <img class=\"ui fluid centered medium image\" src=\"/assets/webLogo.png\">\n" +
    "        <div class=\"ui center aligned huge header\">Create a GiftStarter Campaign and Easily:</div>\n" +
    "        <div class=\"ui text container\">\n" +
    "            <div class=\"ui large list\">\n" +
    "                <div class=\"item\">\n" +
    "                    <i class=\"corner green checkmark icon\"></i>\n" +
    "                    <div class=\"content\">Break any product or service into affordable pieces.</div>\n" +
    "                </div>\n" +
    "                <div class=\"item\">\n" +
    "                    <i class=\"corner green checkmark icon\"></i>\n" +
    "                    <div class=\"content\">Get support from family &amp; friends.</div>\n" +
    "                </div>\n" +
    "                <div class=\"item\">\n" +
    "                    <i class=\"corner green checkmark icon\"></i>\n" +
    "                    <div class=\"content\">Save time and money when it matters most.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"ui section divider\"></div>\n" +
    "<div class=\"ui text container\">\n" +
    "    <h1 class=\"ui center aligned header\">\n" +
    "        Get the help you need.\n" +
    "        <div class=\"sub header\">Not quite sure what will make your life easier? We have teamed up with Providence &amp; YourVillage to provide a few suggestions based on what other mothers have found useful.</div>\n" +
    "    </h1>\n" +
    "\n" +
    "    <div class=\"ui stackable two column grid\">\n" +
    "        <div class=\"column\">\n" +
    "            <div class=\"ui fluid link card\">\n" +
    "                <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/abcdoula\">\n" +
    "                    <img src=\"images/products/abcdoula.png\">\n" +
    "                </a>\n" +
    "                <div class=\"content\">\n" +
    "                    <a class=\"header\" href=\"https://www.giftstarter.com/giftideas/abcdoula\">ABC Doula</a>\n" +
    "                    <div class=\"meta\">Portland, OR &amp; Seattle, WA</div>\n" +
    "                    <div class=\"description\">\n" +
    "                        <strong>A</strong>fter <strong>B</strong>aby <strong>C</strong>omes Doula Service is a  team of postpartum doulas in Portland, OR offering in-home postpartum care to families with newborns.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <a class=\"ui bottom attached button brown\" href=\"https://www.giftstarter.com/giftideas/abcdoula\">\n" +
    "                    <span>Find your Doula <i class=\"arrow right icon\"></i></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"column\">\n" +
    "            <div class=\"ui fluid link card\">\n" +
    "                <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/lishfood\">\n" +
    "                    <img src=\"images/products/lishfood.png\">\n" +
    "                </a>\n" +
    "                <div class=\"content\">\n" +
    "                    <a class=\"header\" href=\"https://www.giftstarter.com/giftideas/lishfood\">Lish Food</a>\n" +
    "                    <div class=\"meta\">Seattle, WA Only</div>\n" +
    "                    <div class=\"description\">\n" +
    "                        Lish gives you convenient access to delicious, wholesome meals prepared fresh by top local chefs, including alums from The French Laundry and Canlis.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <a class=\"ui bottom attached button olive\" href=\"https://www.giftstarter.com/giftideas/lishfood\">\n" +
    "                    <span>Place your order <i class=\"arrow right icon\"></i></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"column\">\n" +
    "            <div class=\"ui fluid link card\">\n" +
    "                <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/farmtofit\">\n" +
    "                    <img src=\"images/products/farmtofit.png\">\n" +
    "                </a>\n" +
    "                <div class=\"content\">\n" +
    "                    <a class=\"header\" href=\"https://www.giftstarter.com/giftideas/farmtofit\">Farm To Fit</a>\n" +
    "                    <div class=\"meta\">\n" +
    "                        Portland, OR Only\n" +
    "                    </div>\n" +
    "                    <div class=\"description\">\n" +
    "                        Farm to Fit is a local meal delivery service with calorie specific meal plans. We also offer Gluten Free &amp; Diabetic Friendly options.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <a class=\"ui bottom attached button orange\" href=\"https://www.giftstarter.com/giftideas/farmtofit\">\n" +
    "                    <span>Place your order <i class=\"arrow right icon\"></i></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"column\">\n" +
    "            <div class=\"ui fluid link card\">\n" +
    "                <a class=\"image\" href=\"https://www.giftstarter.com/giftideas/fullbellyfare\">\n" +
    "                    <img src=\"images/products/fullbellyfare.png\">\n" +
    "                </a>\n" +
    "                <div class=\"content\">\n" +
    "                    <a class=\"header\" href=\"https://www.giftstarter.com/giftideas/fullbellyfare\">Full Belly Fare</a>\n" +
    "                    <div class=\"meta\">Portland, OR Only</div>\n" +
    "                    <div class=\"description\">\n" +
    "                        Portland's healthy meal delivery service! Vegetarian? Paleo? Vegan? Dairy free? Soy free? Your gourmet food delivery service is here!\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <a class=\"ui bottom attached button grey\" href=\"https://www.giftstarter.com/giftideas/fullbellyfare\">\n" +
    "                    <span>Place your order <i class=\"arrow right icon\"></i></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"ui hidden section divider\"></div>\n" +
    "<div class=\"ui grid stackable container tablet only mobile only\">\n" +
    "    <div class=\"sixteen wide column\">\n" +
    "        <div class=\"ui attached segment\">\n" +
    "            <div class=\"ui header huge centered\">\n" +
    "                We're here to help.\n" +
    "                <div class=\"sub header\">\n" +
    "                    Our \"Mommy Happiness\" specialist are always here to help. Give us a call or send us an email.\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"ui two bottom attached buttons\">\n" +
    "            <a class=\"ui grey basic button\" href=\"mailto:giftconcierge@giftstarter.com\">\n" +
    "                <i class=\"mail icon\"></i>\n" +
    "                Email\n" +
    "            </a>\n" +
    "            <a class=\"ui positive button\" href=\"tel:+1-206-486-4849\">\n" +
    "                <i class=\"phone icon\"></i>\n" +
    "                Call\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<script>\n" +
    "    //TODO: 5 Oct 2015 Tyler Goelz (@yaboi)\n" +
    "    //Uncomment when form is implemented to fix iOS\n" +
    "    //number pad / affix error.\n" +
    "    //\n" +
    "    //NOTE: Test this with Semantic, because this fix\n" +
    "    //was put in place for Bootstrap 3 affix which is\n" +
    "    //no longer being used.\n" +
    "    //\n" +
    "    //     $(function () {\n" +
    "    //         if(isMobile()) {\n" +
    "    //             if(isIOS()) {\n" +
    "    //                 fixIOSAffix();\n" +
    "    //             }\n" +
    "    //         }\n" +
    "    //         function isIOS() {\n" +
    "    //             return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);\n" +
    "    //         }\n" +
    "    //         function isMobile() {\n" +
    "    //             return /(iPad|iPhone|iPod|Android|BlackBerry|BB\\d+|CriOS)/g.test(navigator.userAgent);\n" +
    "    //         }\n" +
    "    //         function fixIOSAffix() {\n" +
    "    //             var affix = $('[data-spy=\"affix\"]'),\n" +
    "    //                 input = $('input');\n" +
    "    //             input.on('focus', function () {\n" +
    "    //                 affix.fadeOut();\n" +
    "    //             });\n" +
    "    //             input.on('blur', function () {\n" +
    "    //                 affix.fadeIn();\n" +
    "    //             });\n" +
    "    //         }\n" +
    "    //     });\n" +
    "</script>"
  );


  $templateCache.put('/scripts/brandbar/brandbar.ng.html',
    "<div id=\"brandbar\">\n" +
    "    <div class=\"brandbox\"><a href=\"/search/sturtevants\"><img src=\"/assets/brandbar/sturtevants.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/butter+london\"><img src=\"/assets/brandbar/butterLondon.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/rei\"><img src=\"/assets/brandbar/rei.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/bhphoto\"><img src=\"/assets/brandbar/bhphoto.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/amazon\"><img src=\"/assets/brandbar/amazon.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/button/giftstart-it-button.ng.html',
    "<div class=\"giftstart-it-button\">\n" +
    "    <a><h4>GiftStart It!</h4></a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/four-oh-four.ng.html',
    "<style>\n" +
    "    #four-oh-four {\n" +
    "        margin: 6em auto;\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "    #four-oh-four h1.super {\n" +
    "        font-size: 4em;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"four-oh-four\">\n" +
    "    <h1 class=\"super\">404</h1>\n" +
    "    <h2>Woops!  This page doesn't exist.</h2>\n" +
    "    <p><a href=\"/\">Here's a link to the home page!</a></p>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/scripts/giftideas/giftideas.ng.html',
    "<div id=\"giftideas\">\n" +
    "\n" +
    "    <div ng-show=\"product\" class=\"singleproduct\">\n" +
    "        <div class=\"head\">\n" +
    "            <div class=\"hero\">\n" +
    "                <div class=\"ui one cards\">\n" +
    "\t\t\t\t\t<a class=\"red card\">\n" +
    "\t\t\t\t\t\t<div class=\"image\">\n" +
    "\t\t\t\t\t\t\t<img src=\"/assets/giftideas/category{{product.productImage}}\" alt=\"{{product.imageAltText}}\">\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t</div>\n" +
    "            </div>\n" +
    "            <div class=\"titles\">\n" +
    "\t\t\t\t<button ng-click=\"goToLink(product.giftStartLink)\" target=\"_self\" class=\"primary ui huge button icon primary top attached\" ng-show=\"product.hasPrice\">\n" +
    "\t\t\t\t\t\t<i class=\"gift icon\"></i>\n" +
    "\t\t\t\t\t\tGift It\n" +
    "\t\t\t\t</button>\n" +
    "                <div class=\"scrollbox ui segment card attached\">\n" +
    "                    <div class=\"content\">\n" +
    "\t\t\t\t\t\t<div class=\"header\"><span ng-bind-html=\"product.productName\"></span></div>\n" +
    "                    \t<div class=\"meta\">${{product.productPrice}}</div>\n" +
    "                    \t<div class=\"description\"><span ng-bind-html=\"product.productDescription\"></span></div>\n" +
    "\t\t\t\t\t</div>\n" +
    "                </div>\n" +
    "                    <button onclick=\"olark('api.box.expand')\" class=\"primary ui button\" ng-show=\"!product.hasPrice\">CONTACT THE GIFT CONCIERGE</button>\n" +
    "                    <div ng-show=\"product.hasPrice\" class=\"saveforlater\">\n" +
    "                        <button ng-click=\"saveGiftIdeaForLater(product);\" class=\"ui icon small button bottom attached\" ng-show=\"product.hasPrice\">\n" +
    "\t\t\t\t\t\t\t<i class=\"bookmark icon\"></i>\n" +
    "\t\t\t\t\t\t\tSave for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\">\n" +
    "\t\t\t\t\t\t</button>\n" +
    "                        <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category\" class=\"products\">\n" +
    "\t\t<div class=\"ui stackable four column grid\">\n" +
    "\t\t<div class=\"eight wide column\">\n" +
    "\t\t<h2 class=\"ui center aligned header\" ng-show=\"!product\">\n" +
    "  \t\t\t<img class=\"ui circular image\" src=\"/assets/giftideas/category/{{category.categorySlug}}.jpg\" alt=\"{{category.categorySlug}}\" style=\"    display: block; margin: 0 auto .5rem;width: 57%;\">\n" +
    "\t\t</h2>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"eight wide column\"  ng-show=\"!product\">\n" +
    "\t\t<div class=\"ui piled segment padded center aligned secondary\">\n" +
    "\t\t<h2 class=\"center aligned header\">\n" +
    "  \t\t\t{{category.categoryName}}\n" +
    "\t\t</h2>\n" +
    "\t\t\t<span ng-bind-html=\"category.categoryBlurb\"></span>\n" +
    "\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"clear\"></div>\n" +
    "        <div class=\"grid\">\n" +
    "            <div ng-repeat=\"group in groups\" class=\"group ui two stackable cards\" ng-class-odd=\"'left'\" ng-class-even=\"'right'\">\n" +
    "                <div ng-repeat=\"product in group\" ng-class=\"{'last':product==lastProduct&&group.length==1}\" class='ui link card tile' title=\"{{product.productNameStripped}}\">\n" +
    "\t\t\t\t\t<a href=\"{{categoryPath}}/{{product.productSlug}}\" class=\"image\">\n" +
    "\t\t\t\t\t\t<img src=\"/assets/giftideas/category{{product.productThumb}}\" alt=\"{{product.imageAltText}}\" class=\"load\" />\n" +
    "\t\t\t\t\t\t<div class=\"content\">\n" +
    "\t\t\t\t\t\t\t<a class=\"header\" ng-bind-html=\"product.productNameShort\"></a>\n" +
    "\t\t\t\t\t\t\t<div class=\"meta\">${{product.productPrice}}</div>\n" +
    "\t\t\t\t\t\t</div>\n" +
    "\t\t\t\t\t</a>\n" +
    "\t\t\t\t</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "<h1 class=\"vertical medium top bottom\">Top Categories</h1>\n" +
    "<div class=\"categories ui four stackable link cards\">\n" +
    "\n" +
    "    <div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/music\">\n" +
    "            <img src=\"/assets/giftideas/category/music.jpg\" alt=\"Music\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/music\">Music</a>\n" +
    "            <div class=\"description\">\n" +
    "                Looking for the perfect gift for someone who has everything or loves the gift of music?\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content\">\n" +
    "            <a class=\"center\" href=\"/giftideas/music\">\n" +
    "                <i class=\"unhide icon\"></i> View Music\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/luma\">\n" +
    "            <img src=\"/assets/giftideas/category/luma-diamonds.jpg\" alt=\"Luma Diamonds\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/luma\">Luma Diamonds</a>\n" +
    "            <div class=\"description\">\n" +
    "                With such a variety of beautiful pieces, there is sure to be one perfect for the deserving individual in your life. \n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content\">\n" +
    "            <a class=\"center\" href=\"/giftideas/luma\">\n" +
    "                <i class=\"unhide icon\"></i> View Luma\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/kids\">\n" +
    "            <img src=\"/assets/giftideas/category/kids.jpg\" alt=\"Kids\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/kids\">Kids</a>\n" +
    "            <div class=\"description\">\n" +
    "                We've picked out some of the very best kid gifts that are sure to delight a little one in your life.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content\">\n" +
    "            <a class=\"center\" href=\"/giftideas/kids\">\n" +
    "                <i class=\"unhide icon\"></i> View Kids\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/home\">\n" +
    "            <img src=\"/assets/giftideas/category/home.jpg\" alt=\"Home\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/home\">Home</a>\n" +
    "            <div class=\"content\">\n" +
    "                These gift ideas will help to make any house feel more like a home!\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content\">\n" +
    "            <a class=\"center\" href=\"/giftideas/home\">\n" +
    "                <i class=\"unhide icon\"></i> View Home\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\t<div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/cute\">\n" +
    "            <img src=\"/assets/giftideas/category/cute.jpg\" alt=\"Cute\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/cute\">Cute</a>\n" +
    "            <div class=\"description\">\n" +
    "                Know someone who absolutely loves cute things? This is the place for that kind of stuff.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content bottom button attached\">\n" +
    "            <a class=\"center\" href=\"/giftideas/cute\">\n" +
    "                <i class=\"view icon\"></i> View Cute\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\t<div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/baby\">\n" +
    "            <img src=\"/assets/giftideas/category/Baby.jpg\" alt=\"Baby\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/baby\">Baby</a>\n" +
    "            <div class=\"description\">\n" +
    "                Hand picked and curated by moms all over for the best experience for both baby & mom. \n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content bottom button attached\">\n" +
    "            <a class=\"center\" href=\"/giftideas/baby\">\n" +
    "                <i class=\"view icon\"></i> View Baby\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\t<div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/forher\">\n" +
    "            <img src=\"/assets/giftideas/category/forHer.jpg\" alt=\"For Her\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/forher\">For Her</a>\n" +
    "            <div class=\"description\">\n" +
    "                Sisters. Grandmas. Moms. Aunts. Cousins. Friends. Colleagues. We have our own tastes, and here are some favorites.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content bottom button attached\">\n" +
    "            <a class=\"center\" href=\"/giftideas/forher\">\n" +
    "                <i class=\"unhide icon\"></i> View For Her\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\t<div class=\"card\">\n" +
    "        <a class=\"image\" href=\"/giftideas/forhim\">\n" +
    "            <img src=\"/assets/giftideas/category/forHim.jpg\" alt=\"For Him\" class=\"load\" />\n" +
    "        </a>\n" +
    "        <div class=\"content\">\n" +
    "            <a class=\"header\" href=\"/giftideas/forhim\">For Him</a>\n" +
    "            <div class=\"description\">\n" +
    "                The best damm handcrafted gift list for guys.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"extra content bottom button attached\">\n" +
    "            <a class=\"center\" href=\"/giftideas/forhim\">\n" +
    "                <i class=\"unhide icon\"></i> View Him\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\t\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/cool\"><img src=\"/assets/giftideas/category/cool.jpg\" alt=\"Cool\" class=\"load\" /><div class=\"tilelabel\">Cool</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/office\"><img src=\"/assets/giftideas/category/office.jpg\" alt=\"Office\" class=\"load\" /><div class=\"tilelabel\">Office</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/farewell\"><img src=\"/assets/giftideas/category/Farewell.jpg\" alt=\"Farewell\" class=\"load\" /><div class=\"tilelabel\">Farewell</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/sympathy\"><img src=\"/assets/giftideas/category/sympathy.jpg\" alt=\"Sympathy\" class=\"load\" /><div class=\"tilelabel\">Sympathy</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/beauty\"><img src=\"/assets/giftideas/category/beauty.jpg\" alt=\"Beauty\" class=\"load\" /><div class=\"tilelabel\">Beauty</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wine\"><img src=\"/assets/giftideas/category/wine.jpg\" alt=\"Wine\" class=\"load\" /><div class=\"tilelabel\">Wine</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/butterlondon\"><img src=\"/assets/giftideas/category/butterLONDON.jpg\" alt=\"butter LONDON\" class=\"load\" /><div class=\"tilelabel\">butter LONDON</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/petlovers\"><img src=\"/assets/giftideas/category/pet-lovers.jpg\" alt=\"Pet Lovers\" class=\"load\" /><div class=\"tilelabel\">Pet Lovers</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wedding\"><img src=\"/assets/giftideas/category/Wedding.jpg\" alt=\"Wedding\" class=\"load\" /><div class=\"tilelabel\">Wedding</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/graduation\"><img src=\"/assets/giftideas/category/graduation.jpg\" alt=\"Graduation\" class=\"load\" /><div class=\"tilelabel\">Graduation</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/red\"><img src=\"/assets/giftideas/category/red.jpg\" alt=\"Wear Red\" class=\"load\" /><div class=\"tilelabel\">Wear Red</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/pisces\"><img src=\"/assets/giftideas/category/pisces.jpg\" alt=\"Pisces\" class=\"load\"  class=\"load\" /><div class=\"tilelabel\">Pisces</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/patriots\"><img src=\"/assets/giftideas/category/Patriots.jpg\" alt=\"Patriots\" class=\"load\" /><div class=\"tilelabel\">Patriots</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/seahawks\"><img src=\"/assets/giftideas/category/Seahawks.jpg\" alt=\"Seahawks\" class=\"load\" /><div class=\"tilelabel\">Seahawks</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/employee\"><img src=\"/assets/giftideas/category/employee.jpg\" alt=\"Employee Appreciation\" class=\"load\" /><div class=\"tilelabel\">Employee Appreciation</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/boss\"><img src=\"/assets/giftideas/category/Boss.jpg\" alt=\"Boss\" class=\"load\" /><div class=\"tilelabel\">Boss</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/teacher\"><img src=\"/assets/giftideas/category/teacher.jpg\" alt=\"Teacher\" class=\"load\" /><div class=\"tilelabel\">Teacher</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/electronics\"><img src=\"/assets/giftideas/category/electronics.jpg\" alt=\"Electronics\" class=\"load\" /><div class=\"tilelabel\">Electronics</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/outdoors\"><img src=\"/assets/giftideas/category/outdoors.jpg\" alt=\"Outdoors\" class=\"load\" /><div class=\"tilelabel\">Outdoors</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/green\"><img src=\"/assets/giftideas/category/green.jpg\" alt=\"Green and Organic\" class=\"load\" /><div class=\"tilelabel\">Green and Organic</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/military\"><img src=\"/assets/giftideas/category/Military.jpg\" alt=\"Military\" class=\"load\" /><div class=\"tilelabel\">Military</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/giftcard\"><img src=\"/assets/giftideas/category/giftcard.jpg\" alt=\"Gift Cards\" class=\"load\" /><div class=\"tilelabel\">Gift Cards</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftsgivenbar/giftsgivenbar.ng.html',
    "<div id=\"giftsgivenbar\" ng-controller=\"GiftsGivenBarController\">\n" +
    "    <h2>Gifts given through GiftStarter</h2>\n" +
    "    <span ng-repeat=\"campaign in campaigns\">\n" +
    "        <div ng-if=\"$index%6==0\"></div><div ng-class-even=\"'hidephone'\" class=\"giftbox\"><a ng-href=\"{{campaign.url}}\"><img ng-src=\"{{campaign.img}}\" title=\"{{campaign.title}}\"></a></div>\n" +
    "    </span>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-new.ng.html',
    "<div class=\"static-pages\">\n" +
    "  <div id=\"new-pillow\" class=\"headerwrap\">\n" +
    "\n" +
    "    <h1>GIVE AN AMAZING GIFT</h1>\n" +
    "    <img src=\"/assets/welcome.png\" class=\"welcome\"><h1 id=\"welcome-gters\">{{referredFrom}}</h1>\n" +
    "    <p>Give amazing gifts you're proud to give, and they're happy to get. From a group or from yourself, we'll help make it happen.</p>\n" +
    "\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-video.html',
    "<div class=\"gsintro-2\" ng-show=\"showIntroCopy\">\n" +
    "    <div id=\"pillow-wrapper\">\n" +
    "        <div id=\"pillow-header-copy\">\n" +
    "            <header class=\"welcome\">\n" +
    "                <img id=\"pillow-header-img\" src=\"/assets/welcomeBanner.png\">\n" +
    "            </header>\n" +
    "            <p id=\"pillow-copy\">GiftStarter helps friends and family come together to pitch in on bigger, better gifts!  You've already found a product to giftstart, well done!  All you need now is a compelling story, and you're ready to share this giftstart with your friends and family!</p>\n" +
    "        </div>\n" +
    "        <div id=\"pillow-video-div\">\n" +
    "            <iframe id=\"pillow-iframe\" src=\"//www.youtube.com/embed/tA2gcLIJYBU\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    div.gsintro-2 {\n" +
    "        width: 120%;\n" +
    "        background-color: #f0f0f0;\n" +
    "        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);\n" +
    "        padding: 2em 15%;\n" +
    "        margin: 0 -10%;\n" +
    "        text-align: left;\n" +
    "    }\n" +
    "    #pillow-header-copy {vertical-align: top;}\n" +
    "    #pillow-header-img {width: 100%;}\n" +
    "    #pillow-copy {margin-bottom: 2em;}\n" +
    "    #pillow-iframe {width: 100%;}\n" +
    "\n" +
    "    @media screen and (min-width: 33em) {\n" +
    "        #pillow-header-img {width: 80%;}\n" +
    "        #pillow-wrapper {\n" +
    "            width: 30em;\n" +
    "            margin: 0 auto;\n" +
    "        }\n" +
    "        #pillow-iframe {height: 16.875em;}\n" +
    "    }\n" +
    "    @media screen and (min-width: 66em) {\n" +
    "        #pillow-wrapper {width: 62em;}\n" +
    "        #pillow-header-copy {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "            margin-right: 1.5em;\n" +
    "        }\n" +
    "        #pillow-video-div {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "</style>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow.html',
    "<div class=\"gsintro\" ng-show=\"showIntroCopy\">\n" +
    "    <h2>Hey There!</h2>\n" +
    "    <p>GiftStarter helps you and your friends/family get bigger, better gifts by getting everyone to pitch in.</p>\n" +
    "    <p class=\"copy\">By creating this GiftStart, you're on the way to delivering an awesome gift!  Just add a compelling story, create the GiftStart, and share with your loved ones!  Easy as pie. (Even easier, actually)</p>\n" +
    "    <p class=\"cancel-button\" ng-click=\"showIntroCopy = false\">Close</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/create/giftstart-create.html',
    "<div class=\"create wrapper shipping\" id=\"giftstart-contact-wrapper\" ng-controller=\"GiftStartCreateController\">\n" +
    "\n" +
    "    <ng-include ng-show=\"fromReferral\" src=\"'/scripts/giftstart/brand-pillow/brand-pillow-video.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-hide=\"showLoginBox\">\n" +
    "        <div ng-show=\"isCreateStepTiles()\">\n" +
    "            <h2 class=\"state-title\">How many pitch-in pieces do you want?</h2>\n" +
    "            <div class=\"state-subtitle\">Create Your Gifting Event: step 2 of 4</div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"isCreateStepStory()\">\n" +
    "            <h2 class=\"state-title\">Your Gifting Event</h2>\n" +
    "            <div class=\"state-subtitle\">Create Your Gifting Event: step 3 of 4</div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"isCreateStepShipping()\">\n" +
    "            <h2 class=\"state-title\">Shipping Details</h2>\n" +
    "            <div class=\"state-subtitle\">Create Your Gifting Event: step 4 of 4</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block image\">\n" +
    "        <div class=\"image-container\">\n" +
    "            <gs-overlay giftstart=\"giftStart\" ng-class=\"{initialized: pitchInsInitialized}\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block details\" ng-class=\"{submitting:isSubmittingData}\" id=\"giftstart-create-controls\">\n" +
    "\n" +
    "        <form name=\"campaignForm\" ng-hide=\"showLoginBox\" novalidate class=\"ui form\">\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepTiles()\" id=\"num-part-selection\">\n" +
    "                <div class=\"desc\"><strong>Things to consider:</strong>\n" +
    "                    <br />How many people do you think will pitch-in on the gift? How much do you think each person will pitch-in?\n" +
    "                    <br />We recommend picking the smallest amount per piece because remember, a person can always buy more than one piece.</div>\n" +
    "                <div class=\"more-parts\">Add Pieces\n" +
    "                    <br/>\n" +
    "                    <img class=\"linky\" ng-click=\"moreParts($event)\" src=\"/assets/circle_red_plus.png\">\n" +
    "                </div>\n" +
    "                <div class=\"fewer-parts-mobile\">Remove Pieces\n" +
    "                    <br/>\n" +
    "                    <img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\">\n" +
    "                </div>\n" +
    "                <span class=\"parts-control\"><span class=\"numtiles\"> {{x*y}} Pieces</span>\n" +
    "                <span class=\"money\" ng-hide=\"fetchingTaxRate\"> ${{ totalPrice/100/x/y | number : 2 }} <img class=\"loading\"  src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\"/> each* <span class=\"tax-note\">(+tax)</span></span>\n" +
    "                </span>\n" +
    "                <div class=\"fewer-parts\">\n" +
    "                    <img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\">\n" +
    "                    <br/>Remove Pieces</div>\n" +
    "                <!-- button class=\"help float-right\" ng-click=\"help()\">Help</button -->\n" +
    "                <span class=\"disclaimer\">* Shipping is included.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepStory()\">\n" +
    "                <h2>1. What's the gifting event?</h2>\n" +
    "                <div class=\"field ui left icon input\" style=\"width:100%\">\n" +
    "                    <i class=\"gift icon\"></i>\n" +
    "                    <input type=\"text\" id=\"campaign-title\" name=\"title\" placeholder=\"What's the occasion?\" maxlength=\"140\" ng-model=\"title\" ng-focus=\"hideValidationError.title = true\" ng-blur=\"hideValidationError.title = false\" onkeypress=\"return event.keyCode==13?false:true\" required=\"\" />\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.title.$touched || validationTrigger.createButtonClicked) && !hideValidationError.title\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.title.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to name the gifting event!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <h2>2. Describe your gifting event.</h2>\n" +
    "                <textarea id=\"campaign-description\" name=\"description\" placeholder=\"Who's the gift for? What's your relationship? Why this gift?\" maxlength=\"500\" ng-focus=\"hideValidationError.description = true\" ng-blur=\"hideValidationError.description = false\" ng-model=\"description\" ng-blur=\"onDescriptionBlur()\" required=\"\"></textarea>\n" +
    "                <label for=\"campaign-description\">500 character maximum (3-5 sentences)</label>\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.description.$touched || validationTrigger.createButtonClicked) && !hideValidationError.description\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.description.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to describe it!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"not-long-enough\" ng-hide=\"descriptionLongEnough\">\n" +
    "                    <p>Woah there! Looks like your GiftStart description is a bit short. We know, brevity is the soul of wit - but how about we add to the story to get people more involved? Here are a few questions for inspiration:</p>\n" +
    "                    <ul>\n" +
    "                        <li>Why does the recipient deserve this gift?</li>\n" +
    "                        <li>Is there a story behind the gift or why the recipient might need/want it?</li>\n" +
    "                        <li>What is special/awesome/interesting/unique about this product?</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"email\">\n" +
    "                    <h2>3. Your Email Address</h2>\n" +
    "                    <input type=\"email\" id=\"contact-email\" placeholder=\"username@mail.com\" name=\"gcEmail\" ng-model=\"gcEmail\" ng-focus=\"hideValidationError.gcEmail = true\" ng-blur=\"hideValidationError.gcEmail = false\" onkeypress=\"return event.keyCode==13?false:true\" required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.gcEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.gcEmail\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Don't forget your email address!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.email\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Your email address is invalid!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepShipping()\">\n" +
    "                <h2>1. Who is the Gift for?</h2>\n" +
    "                <!-- label>All prices include taxes, shipping, and handling, based on destination.</label -->\n" +
    "                <div class=\"shipping-details\">\n" +
    "                    <div class=\"ui left icon input\">\n" +
    "                        <span class=\"name\">\n" +
    "                        <input type=\"text\"\n" +
    "                               placeholder=\"First and Last Name\"\n" +
    "                               ng-model=\"shippingName\"\n" +
    "                               name=\"shippingName\"\n" +
    "                               ng-focus=\"hideValidationError.shippingName = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingName = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                               required=\"\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingName.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingName \" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingName.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's name!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                        <i class=\"user icon\"></i>\n" +
    "                    </div>\n" +
    "                    <div class=\"ui left icon input\">\n" +
    "                        <span class=\"email\">\n" +
    "                        <input type=\"email\"\n" +
    "                               ng-model=\"shippingEmail\"\n" +
    "                               name=\"shippingEmail\"\n" +
    "                               placeholder=\"Email Address*\"\n" +
    "                               ng-focus=\"hideValidationError.shippingEmail = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingEmail = false\"\n" +
    "                               onkeypress=\"return event.keyCode!=13\"\n" +
    "                               required=\"\" />\n" +
    "                        <label>* Email will only be sent after the gift is received</label>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingEmail\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's email address!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.email\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Recipient's email address is invalid!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                        <i class=\"mail icon\"></i>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <h2>2. Where should the Gift be shipped?</h2>\n" +
    "                    <span class=\"state\">\n" +
    "                        <select class=\"state\"\n" +
    "                                ng-model=\"shippingState\"\n" +
    "                                name=\"shippingState\"\n" +
    "                                required=\"\"\n" +
    "                                ng-change=\"shippingChanged()\"\n" +
    "                                ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                                ng-focus=\"hideValidationError.shippingState = true\"\n" +
    "                                ng-blur=\"hideValidationError.shippingState = false\"\n" +
    "                                onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                                >\n" +
    "                            <option value=\"\">State</option>\n" +
    "                            <option value=\"AK\">AK</option>\n" +
    "                            <option value=\"AL\">AL</option>\n" +
    "                            <option value=\"AR\">AR</option>\n" +
    "                            <option value=\"AZ\">AZ</option>\n" +
    "                            <option value=\"CA\">CA</option>\n" +
    "                            <option value=\"CO\">CO</option>\n" +
    "                            <option value=\"CT\">CT</option>\n" +
    "                            <option value=\"DC\">DC</option>\n" +
    "                            <option value=\"DE\">DE</option>\n" +
    "                            <option value=\"FL\">FL</option>\n" +
    "                            <option value=\"GA\">GA</option>\n" +
    "                            <option value=\"IA\">IA</option>\n" +
    "                            <option value=\"ID\">ID</option>\n" +
    "                            <option value=\"IL\">IL</option>\n" +
    "                            <option value=\"IN\">IN</option>\n" +
    "                            <option value=\"KS\">KS</option>\n" +
    "                            <option value=\"KY\">KY</option>\n" +
    "                            <option value=\"LA\">LA</option>\n" +
    "                            <option value=\"MA\">MA</option>\n" +
    "                            <option value=\"MD\">MD</option>\n" +
    "                            <option value=\"ME\">ME</option>\n" +
    "                            <option value=\"MI\">MI</option>\n" +
    "                            <option value=\"MN\">MN</option>\n" +
    "                            <option value=\"MO\">MO</option>\n" +
    "                            <option value=\"MS\">MS</option>\n" +
    "                            <option value=\"MT\">MT</option>\n" +
    "                            <option value=\"NC\">NC</option>\n" +
    "                            <option value=\"ND\">ND</option>\n" +
    "                            <option value=\"NE\">NE</option>\n" +
    "                            <option value=\"NH\">NH</option>\n" +
    "                            <option value=\"NJ\">NJ</option>\n" +
    "                            <option value=\"NM\">NM</option>\n" +
    "                            <option value=\"NV\">NV</option>\n" +
    "                            <option value=\"NY\">NY</option>\n" +
    "                            <option value=\"OH\">OH</option>\n" +
    "                            <option value=\"OK\">OK</option>\n" +
    "                            <option value=\"OR\">OR</option>\n" +
    "                            <option value=\"PA\">PA</option>\n" +
    "                            <option value=\"RI\">RI</option>\n" +
    "                            <option value=\"SC\">SC</option>\n" +
    "                            <option value=\"SD\">SD</option>\n" +
    "                            <option value=\"TN\">TN</option>\n" +
    "                            <option value=\"TX\">TX</option>\n" +
    "                            <option value=\"UT\">UT</option>\n" +
    "                            <option value=\"VA\">VA</option>\n" +
    "                            <option value=\"VT\">VT</option>\n" +
    "                            <option value=\"WA\">WA</option>\n" +
    "                            <option value=\"WI\">WI</option>\n" +
    "                            <option value=\"WV\">WV</option>\n" +
    "                            <option value=\"WY\">WY</option>\n" +
    "                        </select>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingState.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingState\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingState.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the state!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <span class=\"zip\">\n" +
    "                        <input type=\"text\"\n" +
    "                               class=\"zip\"\n" +
    "                               name=\"shippingZip\"\n" +
    "                               placeholder=\"Zip Code\"\n" +
    "                               minlength=\"5\" maxlength=\"5\"\n" +
    "                               ng-model=\"shippingZip\"\n" +
    "                               required=\"\"\n" +
    "                               ng-change=\"shippingChanged()\"\n" +
    "                               ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                               ng-focus=\"hideValidationError.shippingZip = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingZip = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingZip.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingZip\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingZip.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the zip!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"campaign-length\">\n" +
    "                    <h2>3. When do you need the gift to be delivered?</h2>\n" +
    "                    <label>Currently we only allow delivery dates less than 34 days away.</label>\n" +
    "                    <h4>Delivery Date</h4>\n" +
    "                    <input ui-date type=\"text\" class=\"endDate\" ng-model=\"deliveryDate\" name=\"deliveryDate\" placeholder=\"mm/dd/yyyy\" ng-focus=\"hideValidationError.deliveryDate = true\" ng-blur=\"hideValidationError.deliveryDate = false; deliveryDateChanged()\" required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.deliveryDate.$touched || validationTrigger.createButtonClicked) && !hideValidationError.deliveryDate\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.deliveryDate.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"!dateChosenValid()\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <h4 ng-hide=\"dueDateEmpty()\">Campaign End Date <!--a class=\"button\" ng-click=\"changeDueDate = !changeDueDate\">CHANGE</a--></h4>\n" +
    "                    <p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">Your campaign will end on</p>\n" +
    "                    <h2 class=\"endDate-date\" ng-hide=\"dueDateEmpty()\">{{campaignEndDate.toDateString()}}</h2>\n" +
    "                    <p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">.</p>\n" +
    "                    <p id=\"endDate-comment\" ng-hide=\"dueDateEmpty()\">Your campaign needs to end at least 5 days before your delivery date.</p>\n" +
    "                    <div ng-show=\"changeDueDate\" class=\"endRange\" ng-class=\"{opaque: dueDateEmpty()}\" ui-date></div>\n" +
    "                </div>\n" +
    "\n" +
    "\t\t\t\t\n" +
    "\t\t\t\t<div class=\"coupon-code\">\n" +
    "                    <h2>5. Do you have a promo code?</h2>\n" +
    "                    <input type=\"text\" id=\"coupon\" name=\"coupon\" placeholder=\"Enter your code\" maxlength=\"20\" ng-model=\"coupon\" ng-focus=\"hideValidationError.code = true\" ng-blur=\"hideValidationError.code = false;\" onkeypress=\"return event.keyCode==13?false:true\" ng-change=\"priceChanged()\" />\n" +
    "                </div>\n" +
    "                <div class=\"price-block\">\n" +
    "                    <h2>Price\n" +
    "\t\t\t\t\t\t<a class=\"ui price tooltip\" for=\"tooltip-checkbox\" data-content=\"The price of the gift at the time of creation will be used to determine the gift base price.\">\n" +
    "\t\t\t\t\t\t\t<i class=\"info circle icon\"></i>\n" +
    "                        </a>\n" +
    "\t\t\t\t\t</h2>\n" +
    "                    <label>\n" +
    "                        Base price of the gift.\n" +
    "                        <input type=\"checkbox\" id=\"tooltip-checkbox\" />\n" +
    "                    </label>\n" +
    "\n" +
    "                    <div class=\"ui statistic\">\n" +
    "                        <div class=\"value\">\n" +
    "                            <i class=\"ui dollar icon grey\"></i> {{inputPrice}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"total-price-block\">\n" +
    "                    <h2>Total Price</h2>\n" +
    "                    <label>Includes fees & taxes.</label>\n" +
    "                    <div class=\"ui statistic\">\n" +
    "                        <div class=\"value\" ng-hide=\"fetchingTaxRate || !shippingDetailsSubmitted\">\n" +
    "                            <i class=\"ui dollar icon green\"></i> {{ totalPrice/100 | number : 2 }}\n" +
    "                        </div>\n" +
    "                    <img class=\"loading\" src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\" />\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "        <div ng-show=\"showLoginBox\" class=\"login-box\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/views/login/create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"progress-nav\" ng-hide=\"showLoginBox\">\n" +
    "        <div class=\"back-indicator\" ng-class=\"{'invisible': isCreateStepTiles()}\">\n" +
    "            <img id=\"giftstart-create-prev\" class=\"linky prev\" ng-click=\"prevStep()\" src=\"/assets/circle_black_lt.png\">\n" +
    "            <br/>PREVIOUS\n" +
    "            <br/>STEP</div>\n" +
    "        <div class=\"step-indicator\">\n" +
    "            <img src=\"/assets/circle_green_check.png\" alt=\"Find a gift\" />\n" +
    "            <br/>FIND\n" +
    "            <br/>A GIFT</div>\n" +
    "        <img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" />\n" +
    "        <div class=\"step-indicator\">\n" +
    "            <img ng-hide=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Adjust the tiles\" />\n" +
    "            <img ng-show=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(1)\" alt=\"Adjust the pieces\" />\n" +
    "            <br/>Adjust\n" +
    "            <br/>the pieces</div>\n" +
    "        <img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" />\n" +
    "        <div class=\"step-indicator\">\n" +
    "            <img ng-hide=\"isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Tell the story\" />\n" +
    "            <img ng-show=\"isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(2)\" alt=\"Tell the story\" />\n" +
    "            <br/>Tell the\n" +
    "            <br/>story</div>\n" +
    "        <img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" alt=\"Shipping datails\" />\n" +
    "        <div class=\"step-indicator\">\n" +
    "            <img src=\"/assets/circle_black.png\" />\n" +
    "            <br/>Shipping\n" +
    "            <br/>details</div>\n" +
    "        <button id=\"giftstart-create-next\" class=\"ui right labeled icon button large next\" ng-hide=\"isCreateStepShipping()\" ng-click=\"nextStep()\">\n" +
    "            <i class=\"arrow right icon\"></i>\n" +
    "            Continue\n" +
    "        </button>\n" +
    "        <button id=\"giftstart-create-submit\" class=\"ui right labeled icon button large next secondary create-campaign\" ng-show=\"isCreateStepShipping()\" ng-click=\"next()\">\n" +
    "            <i class=\"arrow right icon\"></i>\n" +
    "            Continue\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/funding-bar/funding-bar.html',
    "<div class=\"funding-bar wrapper\">\n" +
    "    <div class=\"bar-bg\"></div><div ng-style=\"{'width': pitchinBarProgress()}\" class=\"pi-bar\"></div><div ng-style=\"{'width': fundingBarProgress()}\" class=\"bar\"></div><div class=\"mask\"><img src=\"/assets/giftstart/mask.png\"/></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/giftstart.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\" >\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h1 class=\"title campaign-title\" ng-hide=\"editMode\">{{giftStart.title}}</h1>\n" +
    "            <input class=\"title\" ng-model=\"newTitle\" ng-show=\"editMode\"/>\n" +
    "            <span class=\"title edit\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"prodtitle\">\n" +
    "                <a ng-href=\"{{giftStart.product_url}}\" rel=\"nofollow\" class=\"title\" target=\"_blank\" ng-click=\"productLinkClicked();\" ng-mouseover=\"hideOverlay();\" ng-mouseleave=\"showOverlay();\" ng-show=\"giftStart.product_title\">{{giftStart.product_title}}</a>\n" +
    "            </div>\n" +
    "            <div class=\"description\">\n" +
    "                <span class=\"description edit\"><textarea class=\"description\" ng-model=\"newDescription\" ng-show=\"editMode\"></textarea></span>\n" +
    "                <span class=\"description makelinks\" ng-hide=\"editMode\" style=\"white-space: pre-line;\">{{giftStart.description}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"signature\">\n" +
    "                <p class=\"name\" ng-show=\"!editMode\">\n" +
    "                    <span class=\"signature__title\" ng-show=\" giftStart.gc_name \"> {{ giftStart.gc_name }} </span>\n" +
    "                </p>\n" +
    "                    <input class=\"gc-name\" ng-model=\"newGcName\" ng-show=\"editMode\"/>\n" +
    "                <a class=\"edit button linky\" ng-show=\"campaignEditable && !editMode && secondsLeft > 0 && !campaignComplete()\" ng-click=\"editMode=true;\">EDIT</a>\n" +
    "                <div class=\"save\"><button class=\"save\" ng-click=\"updateCampaign();\" ng-show=\"editMode\">Save</button><button class=\"save\" ng-click=\"editMode=false;\" ng-show=\"editMode\">X</button></div>\n" +
    "                <p ng-show=\"giftStart.gc_name.length > 0 || editMode\" class=\"gift-champion\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay block\" Xng-class=\"{shrunk: showPayBox}\">\n" +
    "            <div class=\"image-upload\" ng-show=\"editMode\"><label>Upload New Image:  </label><input id=\"campaign-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/></div>\n" +
    "            <gs-overlay ng-class=\"{initialized: pitchInsInitialized}\" giftstart=\"giftStart\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "            <div class=\"receipt-wrap\" ng-show=\"showPayBox\">\n" +
    "                <div class=\"receipt\">\n" +
    "                    <div class=\"receipt-tiles\">\n" +
    "                        <div class=\"img-wrap\" style=\"background-image:url('{{giftStart.product_img_url}}')\"></div>\n" +
    "                        <div class=\"info-tiles\">\n" +
    "                            <h2 class=\"num-tiles\">{{giftStart.nSelected}} PIECES</h2>\n" +
    "                            <h4 class=\"cost-tiles\">AT ${{getTileCost() / 100 | number : 2}} EACH</h4>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"receipt-total\">\n" +
    "                        <h4 class=\"purchase-total\">PURCHASE TOTAL: <h2 class=\"total-price\">${{giftStart.totalSelection / 100 | number : 2}}</h2></h4>\n" +
    "                        <p class=\"purchase-note\">Includes our gift concierge service, taxes, shipping, handling, and handmade card.</p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"login-box\" ng-show=\"showLoginBox\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"pay-box\" ng-show=\"showPayBox\">\n" +
    "            <h2>Payment Information:</h2>\n" +
    "            <p>We accept payment by Visa, MasterCard, Amex, or Discover.  Our payments are secure and processed by PayPal.</p>\n" +
    "            <ng-include src=\"'/scripts/pay/pay.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"sign-box\" ng-show=\"showSignBox\">\n" +
    "            <h2>Sign the Card:</h2>\n" +
    "            <p>Write a message to the recipient and we'll include it on the group card so they'll know part of this gift came from you. You know, giving credit where credit is due. We’re all about that.</p>\n" +
    "            <ng-include src=\"'/scripts/popover/note/note-popover.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"share-box\" ng-show=\"showShareBox\">\n" +
    "            <h2>Share with Friends:</h2>\n" +
    "            <p>Your payment was successful! Thank you. You will receive an email shorty. In the meantime, you can invite friends to pitch in just like you did.</p>\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span>INVITE FRIENDS TO PITCH IN</span></button></a>\n" +
    "            <a href=\"\" ng-click=\"shareBox(false)\">SKIP THIS STEP</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--ng-include src=\"'/scripts/share/invite-pitchin.html'\"></ng-include-->\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"pitch-instructions\" ng-show=\"secondsLeft > 0 && !campaignComplete()\">\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">1</span></div><h4> CLICK ON THE PIECES YOU WANT TO PURCHASE</h4><br/>\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">2</span></div><h4> PITCH IN!</h4>\n" +
    "            </div>\n" +
    "            <button class=\"pitch-in button red\" ng-show=\"secondsLeft > 0 && !campaignComplete()\" ng-class=\"{disabled: giftStart.totalSelection == 0}\" ng-click=\"pitchIn()\" ng-mouseover=\"pitchInHoverCallback()\" title=\"{{pitchinButtonHoverMessage}}\">PAY ${{giftStart.totalSelection / 100 | number : 2}} NOW</button>\n" +
    "\n" +
    "            <div class=\"giftstart-this\" ng-show=\"secondsLeft <= 0 || campaignComplete()\">\n" +
    "                Would you like to give this gift to someone you know?  Click the button below to start your own campaign for this gift.<br/>\n" +
    "                <a class=\"giftstart-this-link\" target=\"_self\" href=\"{{giftstartThisUrl()}}\"><button class=\"pitch-in button primary\">GIFTSTART IT</button></a>\n" +
    "                <div class=\"saveforlater\">\n" +
    "                    <button class=\"pitch-in button green\" ng-click=\"saveProdForLater();\">SAVE FOR LATER <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                    <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span ng-hide=\"secondsLeft <= 0 || campaignComplete()\">INVITE FRIENDS TO PITCH IN</span><span ng-show=\"secondsLeft <= 0 || campaignComplete()\">SHARE THIS CAMPAIGN</span></button></a>\n" +
    "            <!--div class=\"invite block\">\n" +
    "                <h3 class=\"black invite-friends\">Share This Campaign With Friends!</h3>\n" +
    "                <img class=\"share\" src=\"/assets/envelope.png\" ng-click=\"emailShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/facebookicon.png\" ng-click=\"facebookShare();\"/>\n" +
    "                <img class=\"share\" src=\"/assets/twittericon.png\" ng-click=\"twitterShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/googleicon.png\" ng-click=\"googlePlusShare();\" /><br/>\n" +
    "                Or share this link:\n" +
    "                <input id=\"share-url\" type=\"text\" value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "            </div-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block fullwidth--last\">\n" +
    "        <div class=\"prices block\">\n" +
    "            <gs-funding-bar></gs-funding-bar>\n" +
    "            <div class=\"price funded\">\n" +
    "                <h2><span class=\"giftstart product contribution\">{{giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Gifted</h4>\n" +
    "            </div>\n" +
    "            <div class=\"price remaining\">\n" +
    "                <h2><span class=\"giftstart product remaining\">{{giftStart.nTotal-giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Remaining</h4>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"completion block\">\n" +
    "            <p>This campaign ends {{giftStart.deadline*1000 | date:\"MMMM d 'at' ha PST\" : 'PST'}}</p>\n" +
    "            <div><h2 class=\"countdown\" ng-class=\"{danger: (secondsLeft < 86400) && (secondsLeft <= 0)}\">{{countdown}}</h2><h4 ng-hide=\"secondsLeft <= 0 || campaignComplete()\">Left for Pitch-ins</h4></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"share-panel\">\n" +
    "        <a id=\"closebtn\" href=\"\" ng-show=\"showShare\" ng-click=\"showSharePanel(false)\">CLOSE</a>\n" +
    "        <ng-include src=\"'/scripts/share/invite-pitchin.html'\" ng-show=\"showShare\"></ng-include>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <gs-thanks></gs-thanks>\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"title title--groupcard\">\n" +
    "            <h2 class=\"title__name\">Group Card</h2>\n" +
    "            <span class=\"title__catchline\">To sign the card, first pitch-in by purchasing some pieces above</span>\n" +
    "        </div>\n" +
    "        <div ng-repeat-start=\"pitchIn in pitchIns | orderBy:'-timestamp' track by $index\" class=\"h--hide\"></div>\n" +
    "        <div class=\"contributors {{randomColor($index)}}\">\n" +
    "            <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "            <div class=\"contributors__figure\">\n" +
    "                <a class=\"contributors__link\" ng-href=\"/users/{{pitchIn.uid}}\" ng-hide=\"isEditing(pitchIn) && picEdit\">\n" +
    "                    <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\" />\n" +
    "                </a>\n" +
    "                <a class=\"userprofile__imageedit button\" ng-show=\"isEditing(pitchIn) && !picEdit\" ng-click=\"setPicEdit(true)\">Change photo</a>\n" +
    "                <gs-image-upload ng-show=\"isEditing(pitchIn) && picEdit\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <a class=\"userprofile__imagesave button\" ng-click=\"picSubmit()\" ng-show=\"isEditing(pitchIn) && picEdit\">Save</a>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__info\">\n" +
    "                <h4 class=\"contributors__name\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.name}}</h4>\n" +
    "                <input type=\"text\" ng-model=\"pitchIn.name\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Name\"/>\n" +
    "                <p class=\"contributors__info\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.note}}</p>\n" +
    "                <textarea ng-model=\"pitchIn.note\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Comment\"/>\n" +
    "                <p id=\"textcount\" ng-show=\"isEditing(pitchIn)\">{{230 - pitchIn.note.length}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__edit\">\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"pitchIn.uid == userId && !isEditing(pitchIn) && commentEditing.length == 0\" ng-click=\"editingComment(pitchIn, true)\">EDIT</a>\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"isEditing(pitchIn)\" ng-click=\"cancelEditComment(pitchIn)\">CANCEL</a>\n" +
    "                <button class=\"contributors__edit__button savebtn red\" ng-show=\"isEditing(pitchIn)\" ng-disabled=\"picUploading || pitchIn.note.length > 230 || pitchIn.name.length > 38 || pitchIn.name.length < 1\" ng-click=\"editingComment(pitchIn, false)\">SAVE</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        <p class=\"nocontributors\" ng-hide=\"pitchIns.length > 0\">No contributors yet - be the first one on the card!</p>\n" +
    "    </div>\n" +
    "    <div ng-show=\"secondsLeft <= 0 || campaignComplete()\" class=\"btn btn--pdf\">\n" +
    "        <a href=\"\" ng-click=\"toPDFPage()\" class=\"btn__link\">\n" +
    "            View Card PDF\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/overlay/overlay.html',
    "<div class=\"tile-overlay\" style=\"background-image: url({{giftstart.product_img_url}})\">\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/print/print.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\">\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h2 class=\"title\" ng-hide=\"editMode\">{{giftStart.title}}</h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"fullwidth\">\n" +
    "\n" +
    "        <div class=\"col2 block\">\n" +
    "            <h3 class=\"title\" target=\"_blank\">\n" +
    "                {{giftStart.product_title}}</h3>\n" +
    "\n" +
    "            <div class=\"desc\">\n" +
    "                GiftStarter is a Gifting Experience Service. Our mission is to focus on the gifting experience, using\n" +
    "                technology as an enabler. We enable the experience that captures giving between the recipient and those\n" +
    "                that give.<br/><br/>\n" +
    "\n" +
    "                Search for and select a product using the search bar on the homepage, fill out the GiftStart information\n" +
    "                to share your story on why this is important to you or your gift recipient, and bring others along on\n" +
    "                the giving journey. We let your family and friends choose their pieces of the gift to give, we send an\n" +
    "                awesome hand-crafted group card to remember the experience, and the gift too. <br/>\n" +
    "            </div>\n" +
    "            <div id=\"header-logo\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay col2 block\">\n" +
    "            <div class=\"overlay\" style=\"background-image: url({{giftStart.product_img_url}})\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"contributor__description\">\n" +
    "            <p class=\"contributor__text\">\n" +
    "                {{giftStart.description}}\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"name\">\n" +
    "                <span>\n" +
    "                   &mdash;&mdash;{{giftStart.gc_name}}\n" +
    "                </span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"gift-champion\">\n" +
    "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion\n" +
    "            </p>\n" +
    "        </div>\n" +
    "        <div class=\"contributor__link\">\n" +
    "            <p class=\"contributor__campaign\">\n" +
    "                View the Campaign\n" +
    "            </p>\n" +
    "            <gs-print-url class=\"contributor__href\"></gs-print-url>\n" +
    "        </div>\n" +
    "        <div class=\"groupcard__wrapper\">\n" +
    "            <div ng-repeat-start=\"pitchIn in pitchIns\"\n" +
    "                 ng-class=\"{true: 'contributors--row'}[$index % 3 == 0 && !$first]\"\n" +
    "                 class=\"contributors--pre h--hide\"></div>\n" +
    "            <div class=\"contributors {{randomColor($index)}}\" ng-class=\"{true: 'contributors--only'}[pitchIns.length == 1]\">\n" +
    "                <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "                <div class=\"contributors__figure\">\n" +
    "                    <!--<div class=\"img-border\">-->\n" +
    "                        <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\"/>\n" +
    "                    <!--</div>-->\n" +
    "                </div>\n" +
    "                <div class=\"contributors__info\">\n" +
    "                    <h3 class=\"contributors__name\">{{pitchIn.name}}</h3>\n" +
    "\n" +
    "                    <p class=\"contributors__info\">{{pitchIn.note}}</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    html {\n" +
    "        background: #fff;\n" +
    "    }\n" +
    "\n" +
    "    * {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    * a {\n" +
    "        font-size: 1em;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        src: url('/assets/fonts/Gotham-Book.woff'), url('/assets/fonts/Gotham-Book.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        font-style: italic;\n" +
    "        src: url('/assets/fonts/Gotham-BookItalic.woff'), url('/assets/fonts/Gotham-BookItalic.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Slab\";\n" +
    "        src: url('/assets/fonts/RobotoSlab-Thin-webfont.woff');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Bold\";\n" +
    "        src: url('/assets/fonts/Roboto-Bold.woff'), url('/assets/fonts/Roboto-Bold.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Roboto;\n" +
    "        src: url('/assets/fonts/Roboto-Regular.woff');\n" +
    "    }\n" +
    "\n" +
    "    h3 {\n" +
    "        font: 400 1.25em \"Roboto\", sans-serif;\n" +
    "        color: #000;\n" +
    "    }\n" +
    "\n" +
    "    #habla_oplink_a,\n" +
    "    footer,\n" +
    "    .headerNav,\n" +
    "    .search,\n" +
    "    #header,\n" +
    "    .toast-wrapper,\n" +
    "    .h--hide,\n" +
    "    body > :last-child {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    #header-logo {\n" +
    "        background-image: url(/assets/GSlogo_web_large_reg.png);\n" +
    "        background-repeat: no-repeat;\n" +
    "        background-size: 238px 98px;\n" +
    "        width: 238px;\n" +
    "        height: 98px;\n" +
    "        position: relative;\n" +
    "        top: 0;\n" +
    "        left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        width: 100% !important;\n" +
    "        margin: 0 !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .overlay {\n" +
    "        display: block;\n" +
    "        margin-left: auto !important;\n" +
    "        margin-right: auto !important;\n" +
    "        height: 400px;\n" +
    "        background-size: 350px 400px;\n" +
    "        background-repeat: no-repeat;\n" +
    "    }\n" +
    "\n" +
    "    #angular-view {\n" +
    "        margin: 0;\n" +
    "    }\n" +
    "\n" +
    "    .col2 {\n" +
    "        margin-right: 0 !important;\n" +
    "        width: 50% !important;\n" +
    "        margin-right: 3%;\n" +
    "        float: right !important;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link,\n" +
    "    .contributors__img,\n" +
    "    .contributor__description {\n" +
    "        display: inline-block;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__campaign {\n" +
    "        font-size: 21px;\n" +
    "        color: #ffffff;\n" +
    "        margin: 0 0 15px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard__wrapper {\n" +
    "        float: left;\n" +
    "        width: 96%;\n" +
    "        margin: 10px 2%;\n" +
    "    }\n" +
    "\n" +
    "    .desc {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    /*.contributors__img {*/\n" +
    "        /*width: 47% !important;*/\n" +
    "        /*margin: 5% 25% !important*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .contributor__description {\n" +
    "        width: 60%;\n" +
    "        margin-left: 3%;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link {\n" +
    "        background: #238471;\n" +
    "        width: 32%;\n" +
    "        float: right;\n" +
    "        padding: 6% 0 7%;\n" +
    "        margin: 10px 2% 0 2%\n" +
    "    }\n" +
    "\n" +
    "    .contributor__href {\n" +
    "        color: #ffffff;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    .gift-champion {\n" +
    "        padding-left: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__text,\n" +
    "    .name,\n" +
    "    .gift-champion {\n" +
    "        text-align: left !important;\n" +
    "    }\n" +
    "\n" +
    "    .fullwidth > .groupcard {\n" +
    "        display: block !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .title--groupcard .title {\n" +
    "        margin-top: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .title {\n" +
    "        color: black;\n" +
    "        text-align: center;\n" +
    "        border-radius: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        clear: both;\n" +
    "        padding: 0;\n" +
    "        text-align: center;\n" +
    "        display: block;\n" +
    "        width: 92%;\n" +
    "        margin: 0 4% 5rem 4%;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title--groupcard {\n" +
    "        margin: 0 auto 5rem;\n" +
    "        /*display: table-caption;*/\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title__name {\n" +
    "        font-size: 3.2rem;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors {\n" +
    "        display: inline-block;\n" +
    "        width: 26% !important;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {\n" +
    "        .groupcard .contributors--row {\n" +
    "            display: none;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--pre:nth-child(2n) {*/\n" +
    "            /*display: table-row;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 50%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 667px) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 375px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .groupcard .contributors__info {\n" +
    "        padding: 0 10% 3%;\n" +
    "        -webkit-hyphens: auto;\n" +
    "        -moz-hyphens: auto;\n" +
    "        -ms-hyphens: auto;\n" +
    "        hyphens: auto;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__name {\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__img {\n" +
    "        width: 100%;\n" +
    "        margin: 8% 0 1%;\n" +
    "        -webkit-border-radius: 50%;\n" +
    "        -moz-border-radius: 50%;\n" +
    "        -ms-border-radius: 50%;\n" +
    "        border: 6px solid #d6d6d6;\n" +
    "        border-radius: 50%;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    /*.img-border {*/\n" +
    "        /*border: 6px solid #d6d6d6;*/\n" +
    "        /*border-radius: 50%;*/\n" +
    "        /*width: 80%*/\n" +
    "    /*}*/\n" +
    "</style>\n"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanked-campaigns.ng.html',
    "<div class=\"thanked-campaigns wrapper\" ng-repeat=\"campaign in campaigns\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "        <img class=\"thanks-image\" ng-src=\"{{campaign.thanks_img_url}}\"/>\n" +
    "    </a>\n" +
    "    <div class=\"description-container\">\n" +
    "        <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "            <h4 class=\"accent\">{{campaign.title}}</h4>\n" +
    "        </a>\n" +
    "        <p class=\"campaign-description\">{{campaign.thanks_message}}</p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanks.html',
    "<div class=\"thank-you block\" ng-show=\"thanks.editable || thanks.edit || thanks.message\">\n" +
    "    <!--<div class=\"thank-you block\">-->\n" +
    "    <div class=\"message\">\n" +
    "        <div class=\"show-message\" ng-hide=\"thanks.edit\">\n" +
    "            <h1>GiftStart Success!</h1>\n" +
    "            <h4>A Thank You From the Recipient:</h4>\n" +
    "            <p>{{thanks.message}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"edit-message\" ng-show=\"thanks.edit\">\n" +
    "            <h1>Say Thank You!</h1>\n" +
    "            <p>Say a few words of thanks to those who pitched in, we'll send them a link when you're finished, and you can share it on your favorite social sites:</p>\n" +
    "            <textarea ng-model=\"thanks.newMessage\"></textarea>\n" +
    "            <div class=\"profile-img\" ng-show=\"thanks.profileImageUrl\">\n" +
    "                <p>Logged in as:</p>\n" +
    "                <img ng-src=\"{{thanks.profileImageUrl}}\"/>\n" +
    "            </div>\n" +
    "            <div class=\"login-for-pic\" ng-hide=\"loggedIn\">\n" +
    "                <p>Login to add a profile picture!</p><button class=\"white-fill\" ng-click=\"thanks.showLogin()\">Login</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"image\">\n" +
    "        <img ng-src=\"{{thanks.imgUrl}}\" ng-show=\"thanks.imgUrl && !thanks.edit\"/>\n" +
    "        <gs-image-upload class=\"white-buttons\" ng-show=\"thanks.edit\" on-image-updated=\"thanks.imageUpdated\"></gs-image-upload>\n" +
    "    </div>\n" +
    "    <div class=\"buttons\">\n" +
    "        <button class=\"white-fill submit\" ng-show=\"thanks.edit\" ng-click=\"thanks.update();\">Say Thanks!</button><button class=\"edit white-border\" ng-show=\"thanks.editable && !thanks.edit\" ng-click=\"thanks.edit=true;\"><img class=\"edit\" src=\"/assets/edit_button_white.png\"/></button>\n" +
    "    </div>\n" +
    "    <button class=\"cancel\" ng-show=\"thanks.edit\" ng-click=\"thanks.edit=false;\">X</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/header/giftstart-it-header.ng.html',
    "<div class=\"giftstart-it-header\" ng-class=\"{shown: shown}\">\n" +
    "    <span>\n" +
    "        <p>Want to give this gift to someone you know?</p>\n" +
    "        <gs-it-button ng-click=\"linkClicked()\"></gs-it-button>\n" +
    "        <p class=\"cancel\" ng-click=\"hideButtonHeader()\">X</p>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"giftstart-it-header-padding\" ng-class=\"{shown: shown}\"></div>\n"
  );


  $templateCache.put('/scripts/header/subscribe-header.ng.html',
    "<div class=\"subscribe-header\">\n" +
    "    <span>\n" +
    "        <p>Hey! Join our email newsletter for <b>group gifting ideas and updates</b>!</p>\n" +
    "        <form action=\"//giftstarter.us8.list-manage.com/subscribe/post?u=9d503578c402cdc6d3fa96dd7&amp;id=c2e64310be\" method=\"post\" id=\"mc-embedded-subscribe-form-hdr\" name=\"mc-embedded-subscribe-form\" class=\"validate ng-pristine ng-valid\" target=\"_blank\" novalidate=\"\">\n" +
    "            <input type=\"email\" value=\"\" name=\"EMAIL\" class=\"email\" id=\"mce-EMAIL\" placeholder=\"Enter Email Address\" required=\"\">\n" +
    "            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n" +
    "            <div style=\"position: absolute; left: -5000px;\"><input type=\"text\" name=\"b_9d503578c402cdc6d3fa96dd7_fdc0096ceb\" tabindex=\"-1\" value=\"\"></div>\n" +
    "            <button type=\"submit\" class=\"button\">Subscribe</button>\n" +
    "        </form>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"subscribe-header-padding\" ng-class=\"{shown: subscribeShow}\"></div>\n"
  );


  $templateCache.put('/scripts/home/giftstart-squares.ng.html',
    "<div id=\"giftstart-squares\">\n" +
    "    <div class=\"column one\"><a href=\"https://www.giftstarter.com/giftstart/Agnes-Christmas-gift\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg');\"><p>Agnes Christmas gift</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Dae-Needs-a-Manly-Grill-for-his-Birthday\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/23.jpg');\"><p>Dae Needs a Manly Grill for his Birthday</p></div></div></a></div><div class=\"column two\"><a href=\"https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady\"><div class=\"giftstart-square big\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg');\"><p>A fantastic bag for a fantastic lady</p></div></div></a></div><div class=\"column three\"><a href=\"https://www.giftstarter.com/giftstart/Rocky-is-just-a-baby\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/115.jpeg');\"><p>Rocky Baby</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg');\"><p>Just when you thought Quinn and Silas' pictures couldn't get any more amazing...</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Geekwire-Community-Feeding-Over-400-in-Seattle\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/Union_Gospel_Mission___Human_str.jpg');\"><p>Geekwire Feeds the Homeless</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Lets-get-Dale-a-FitBit\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/31.com/skuimage/857717');\"><p>Let's get Dale a FitBit!</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/My-inner-nerd\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg');\"><p>My inner nerd.,</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/2-bottles-of-scotch-for-Matt-to-send-him-off-to-his-journey-at-Porchcom\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/132.jpeg');\"><p>2 Bottles of Scotch</p></div></div></a></div>\n" +
    "    <div style=\"clear: both;\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/home.html',
    "<div class=\"landing-page\" ng-controller=\"HomeController\">\n" +
    "\t<!--div class=\"headerwrap\">\n" +
    "        <h1>Welcome to GiftStarter!</h1>\n" +
    "        <p>We are putting the emotion back into gifting. With GiftStarter you can give gifts you're proud to give, and\n" +
    "            they're happy to get. Make your lists. Find your community. Give better gifts.</p>\n" +
    "        <a name=\"productsearch\"></a>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div-->\n" +
    "    <!--ng-include src=\"'/scripts/product/search-results.ng.html'\"></ng-include-->\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/why-giftstarter.ng.html'\" class=\"hidden\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/how-it-works.ng.html'\"></ng-include>\n" +
    "\t<!--ng-include src=\"'/scripts/staffpicks/staffpicks.ng.html'\"></ng-include-->\n" +
    "    <!--ng-include src=\"'/scripts/giftsgivenbar/giftsgivenbar.ng.html'\"></ng-include-->\n" +
    "    <div class=\"userlogin hidden\" id=\"loginpanel\">\n" +
    "        <div class=\"userlogin__logo\"></div>\n" +
    "        <h2 class=\"userlogin__title\">\n" +
    "            Join the giving movement\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\" class=\"hidden\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/brandbar/brandbar.ng.html'\" class=\"hidden\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/top-campaign.html',
    "<div class=\"campaign-preview wrapper\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\"><div class=\"campaign-title\"><h1>{{campaign.title}}</h1></div><p class=\"product-name\">{{campaign.product.title}}</p><img class=\"product-image\" ng-src=\"{{campaign.product_img_url}}\"/></a>\n" +
    "    <div class=\"comment-container\" ng-class=\"{fadedIn: fadeIn}\">\n" +
    "        <img class=\"contrib-img\" ng-src=\"{{pitchins[index % pitchins.length].img}}\"/>\n" +
    "        <div class=\"comment-wrapper\">\n" +
    "            <p class=\"contrib-message\">{{pitchins[index % pitchins.length].note}}</p>\n" +
    "            <p class=\"contrib-name\">{{pitchins[index % pitchins.length].name}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/how-it-works.ng.html',
    "<div class=\"whatisgiftstarter how-it-works\">\n" +
    "    <h2>How it works</h2>\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks1.png\" />\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks2.png\" />\n" +
    "    <p><span class=\"title\">IF YOU CAN BUY IT ONLINE, YOU CAN GIFT IT WITH GIFTSTARTER.</span> <span id=\"howitworks-paragraph\">When you set up your gift\n" +
    "    campaign, you can <strong>choose how many pieces</strong> will be in your grid. We <strong>break up the price of\n" +
    "    the product into pieces</strong>, so the more pieces you have, the cheaper each piece is! Once your gift\n" +
    "    campaign is set up, you <strong>invite your friends to buy pieces</strong> -- and your part is finished! Each\n" +
    "    contributor can <strong>purchase as many or as few pieces as they wish</strong>, then leave a message for the group\n" +
    "    card when they check out. <strong>We take care of everything else</strong> -- from ensuring the gift is\n" +
    "    ordered and shipped to making and sending the homemade group card, we've got you covered!</span></p>\n" +
    "    <button class=\"red\" ng-click=\"goToLink('howitworks')\">LEARN MORE</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/why-giftstarter.ng.html',
    "<div class=\"whatisgiftstarter why-giftstarter\">\n" +
    "    <h2>Why GiftStarter?</h2>\n" +
    "    <div>\n" +
    "        <div class=\"item one\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">GET AND GIVE GIFTS YOU WANT</h4>\n" +
    "                <p>\n" +
    "                    <strong>We remove the barrier of large price tags.</strong>\n" +
    "                    The gifts most people want are more expensive than the average giver is\n" +
    "                    able to gift alone, but with GiftStarter, <strong>many people can give\n" +
    "                    a little and together give gifts people actually want.</strong> Imagine\n" +
    "                    a world where birthdays aren't just an assortment of gift cards and\n" +
    "                    $20 checks from grandma.\n" +
    "            </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item two\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">HAVE MEANINGFUL INTERACTIONS</h4>\n" +
    "                <p>\n" +
    "                    We didn't invent group gifting, but we did make sure the recipient will\n" +
    "                    know exactly who was involved in the gift. Each participant can <strong>\n" +
    "                    add a picture and personal message to the handcrafted group card. </strong>\n" +
    "                    Once the gift is received, the recipient can <strong>post a thank you note\n" +
    "                    </strong> and picture on the gift campaign page for all the contributors\n" +
    "                    to see.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item three\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">PAIN-FREE GROUP GIFTING</h4>\n" +
    "                <p>\n" +
    "                    Whether it's your coworkers in your office or buddies spread across the nation,\n" +
    "                    it's never been so easy to start a group gift. We don't just <strong>take care\n" +
    "                    of the money collection</strong>, but also <strong>ensure the gift is ordered and\n" +
    "                    shipped, along with the group card</strong>. And as always, <strong>shipping\n" +
    "                    is free</strong> for all GiftStarter gifts!\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\t\t\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/inspirationalexamples/inspirationalexamples.ng.html',
    "<div class=\"inspirationalexamples\" ng-controller=\"InspirationalExamplesController\">\n" +
    "  <div id=\"outer\">\n" +
    "  <div class=\"rotate\">\n" +
    "    <div class=\"product-item first\">\n" +
    "      <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{firstProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item second\">\n" +
    "      <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{secondProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item third\">\n" +
    "      <a ng-href=\"{{thirdProduct.link}}\"><img class=\"left-col\" ng-src=\"{{thirdProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{thirdProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    </div>\n" +
    "  <div id=\"clear\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/login/create-account.html',
    "<div class=\"userlogin__form\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red create_action\" ng-disabled=\"$parent.working\">Create account</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/login/login-or-create.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-hide=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/login.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/create-account.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-show=\"showCreate\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"showSocials\">\n" +
    "        <br/><br/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/scripts/login/login.html',
    "<div class=\"userlogin__form\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h4>Login with an email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter your password\" required></div>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Forgot password</a>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red login_action\" ng-disabled=\"$parent.working\">Log In</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showForgot\">\n" +
    "    <form ng-submit=\"$parent.doForgotPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn\" ng-disabled=\"$parent.working\">Get Password</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h4>Reset Your Password:</h4>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/marketingbanner/marketingbanner.ng.html',
    "<div id=\"marketingbanner\">\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/buyPieces.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/freeShipping.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/search/butter+london\"><img src=\"/assets/marketingbanner/featuredBL.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/menu/menu.ng.html',
    "<div class=\"menu-wrapper\" ng-class=\"{expanded: expanded}\">\n" +
    "    <button class=\"cancel\" ng-click=\"close()\">X</button>\n" +
    "    <ul class=\"menu\">\n" +
    "        <li class=\"menu-item\"><a href=\"http://www.giftstarter.com/blog\" target=\"_blank\">Blog</a></li>\n" +
    "        <li class=\"menu-item\"><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li class=\"menu-item\" ng-show=\"loggedIn\" ng-click=\"logout()\"><a>Logout</a></li>\n" +
    "        <li class=\"menu-item\" ng-hide=\"loggedIn\" ng-click=\"login()\"><a>Login</a></li>\n" +
    "    </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/partnerportal/partnerportal.html',
    "<div class=\"partnerportal static-pages\" ng-controller=\"PartnerportalController\" >\n" +
    "    <div class=\"headerwrap\">\n" +
    "        <h1>PARTNER PORTAL</h1>\n" +
    "        <br />\n" +
    "        <p>Thanks for joining the gifting revolution!  GiftStarter is a great platform to help you increase average order size, turn your users into brand advocates endorsing your brand to their family and friends.  Let's reinvent gifting.  #GiftsMatter when we #GiftTogether.</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"login\">\n" +
    "        <div class=\"login-title\" ng-show=\"!loggedIn()\">Welcome, partner!  Please log in:</div>\n" +
    "        <span ng-repeat=\"showCreate in [false]\"><ng-include ng-repeat=\"showSocials in [false]\" src=\"'/scripts/login/login-or-create.html'\"></ng-include></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"core-info\" ng-show=\"loggedIn()\">\n" +
    "        <h1>1. {{coreDataComplete?'Verify':'Enter'}} your company info:</h1>\n" +
    "        <form class=\"core-form\"><a name=\"core-form\"></a>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyName\">Company Name:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.company_name}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyName\" ng-model=\"partner.company_name\"/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyUrl\">Website:</span><span class=\"value\"  ng-hide=\"editMode\">{{partner.company_url}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyUrl\" ng-model=\"partner.company_url\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">Phone:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.phone_number}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"phone\" ng-model=\"partner.phone_number\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">API Key:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.api_key}}</span></span>\n" +
    "            <span class=\"row\"><span class=\"error\" ng-show=\"coreError!=''\">{{coreError}}</span></span>\n" +
    "            <span class=\"row buttons\"><span class=\"buttons\"><button ng-hide=\"editMode\" ng-click=\"editCore()\" ng-disabled=\"loading\">Edit</button><span ng-show=\"editMode\"><button ng-show=\"coreDataComplete\" ng-click=\"cancelCore()\" ng-disabled=\"loading\">Cancel</button> <button ng-click=\"saveCore()\" ng-disabled=\"loading\">Save</button></span></span></span>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div ng-show=\"coreDataComplete\">\n" +
    "        <section id=\"add-the-button\">\n" +
    "            <h1>2. Add the GiftStart It button to your website:</h1>\n" +
    "            <p>Adding the GiftStart It button is easy.  Pick your platform:</p>\n" +
    "            <ul class=\"toggle-button\">\n" +
    "                <li ng-class=\"{'selected': shopifyInstructions}\"><a ng-click=\"showShopifyInstructions()\">Shopify</a></li>\n" +
    "                <li ng-class=\"{'selected': htmlInstructions}\"><a ng-click=\"showHtmlInstructions()\">All Others</a></li>\n" +
    "            </ul>\n" +
    "            <div class=\"add-instructions\" ng-show=\"shopifyInstructions\">\n" +
    "                <p>To add the button to your Shopify store, you can either add it site-wide (for all products), or to individual products.</p>\n" +
    "                <p>&bull; To add the button to <b>all</b> products, click \"Online Store\", then \"Themes\", then \"Edit HTML/CSS\" under the \"...\".\n" +
    "                    Next, click \"product.liquid\" under your Templates, and add the following code on a new line after \"{% include 'product' %}\":</p>\n" +
    "                <p>&bull; or, to add the button to a <b>single</b> product, click the \"&lt;&rt;\" symbol in the editing bar for the Description of your product,\n" +
    "                    then paste the following code (and click \"Save\"):</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/shopify/button.js\"&gt;&lt;/script&gt;\n" +
    "                &lt;style&gt;\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                &lt;/style&gt;\n" +
    "                </pre>\n" +
    "                <p>You can modify the styling if you like, but be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "            <div class=\"add-instructions\" ng-show=\"htmlInstructions\">\n" +
    "                <p>To add the button to a site, simply insert the following snippet next to your \"Add to Cart\" button:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\" style=\"display: none;\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        productUrl: 'http://example.com/product/12345',\n" +
    "                        title: 'Example title',\n" +
    "                        price: 85.00,\n" +
    "                        imgUrl: 'http://example.com/images/12345.jpg',\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/button/general.js\"&gt;&lt;/script&gt;\n" +
    "                </pre>\n" +
    "                <p>You'll need to replace the example product info in the first script tag with your actual product data.  On most platforms this can be done in the template for your product details page.</p>\n" +
    "                <p>You should style the button to match your existing buttons height and corner rounding, but a good starting point for the buttons CSS is:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                </pre>\n" +
    "                <p>Be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/pay/pay.html',
    "<div class=\"payment\" ng-controller=\"PayPopoverController\">\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <div class=\"selected\"><img ng-show=\"card.selected\" src=\"/assets/green_check.png\"/></div>\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" Xng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Enter New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div id=\"card-imgs\">\n" +
    "                <img src=\"/assets/mastercard_card.png\" />\n" +
    "                <img src=\"/assets/visa_card.png\" />\n" +
    "                <img src=\"/assets/discover_card.png\" />\n" +
    "                <img src=\"/assets/amex_card.png\" />\n" +
    "            </div>\n" +
    "            <div class=\"firstname\">\n" +
    "                <input type=\"text\" id=\"card-firstname\" ng-disabled=\"!putNew\" ng-model=\"firstname\" placeholder=\"First Name\" ng-change=\"updateFormValidity()\" name=\"firstname\"/>\n" +
    "            </div><div class=\"lastname\">\n" +
    "                <input type=\"text\" id=\"card-lastname\" ng-disabled=\"!putNew\" ng-model=\"lastname\" placeholder=\"Last Name\" ng-change=\"updateFormValidity()\" name=\"lastname\"/>\n" +
    "            </div><div class=\"number\">\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><br/><div class=\"expiry\">\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"Expires MM/YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"Billing ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><br/><div class=\"email\">\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address*\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"email-note\">\n" +
    "                * Receipt will be emailed\n" +
    "            </span><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label for=\"save-credit-card\">Remember my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/>\n" +
    "            </span><span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "                <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span ng-show=\"selectedCard\"><input id=\"delete-credit-card-toggle\" type=\"checkbox\" ng-model=\"showDeleteCardDialogue\"><label for=\"delete-credit-card-toggle\"><span class=\"arrow\" ng-class=\"{down: showDeleteCardDialogue && selectedCard}\">&#x25BC;</span><span>Delete Selected Card</span></label></span>\n" +
    "        <div class=\"delete-credit-card-confirm\" ng-show=\"showDeleteCardDialogue && selectedCard\">\n" +
    "            <button class=\"delete-card\" ng-click=\"deleteSelectedCard()\">Delete card #{{selectedLastFour}}</button> <button class=\"delete-cancel\" ng-click=\"showDeleteCardDialogue = false\">Cancel</button>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay primary\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><a class=\"cancel-button button linky\" ng-click=\"hidePopover()\">Cancel</a></div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/email-share/email-share-popover.html',
    "<div class=\"email-share-popover\" ng-controller=\"EmailSharePopoverController\">\n" +
    "    <h1 class=\"white\">Email Share!</h1>\n" +
    "    <div id=\"open-with-email-client\">\n" +
    "        <a href=\"{{emailUrl}}\" target=\"_blank\" ng-click=\"trackEmailClientClick()\">\n" +
    "            <span class=\"share\">Open in email client</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"toEmails\">To:</label>\n" +
    "        <textarea id=\"toEmails\" ng-model=\"toEmails\" placeholder=\"friend@email.com; family@email.com\"></textarea>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"fromEmail\">From:</label>\n" +
    "        <input id=\"fromEmail\" type=\"email\" ng-model=\"fromEmail\" placeholder=\"you@email.com\" name=\"email\"/>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <textarea class=\"message\" ng-model=\"message\" placeholder=\"\">\n" +
    "        </textarea>\n" +
    "        <div class=\"message-sub\">\n" +
    "        {{gsName}}<br/>\n" +
    "        - {{userSvcName}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <span class=\"error\" ng-hide=\"formValid\">Invalid email!</span>\n" +
    "    <button class=\"large white-border\" ng-click=\"submit()\">Send!</button>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/login/login-popover.html',
    "<div class=\"login-popover\" ng-controller=\"LoginPopoverController\">\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLogin\">Log In</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLoginCreate\">Create Account</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isForgotPassword || emailFormModel.isReset\">Reset Password</h1>\n" +
    "    <div class=\"block\">\n" +
    "        <div class=\"login-button facebook\" ng-click=\"facebookLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"login-button twitter\" ng-click=\"twitterLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"login-button googleplus\" ng-click=\"googleLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "        <div class=\"login-button\" ng-click=\"emailFormModel.isEmailLogin = !emailFormModel.isEmailLogin\" ng-hide=\"emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <form name=\"emailLoginForm\" ng-show=\"emailFormModel.isEmailLogin\" class=\"emailLogin\" ng-submit=\"emailFormActions.submit()\" novalidate>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"text\" name=\"emailname\" placeholder=\"Enter your name\" ng-model=\"emailFormModel.emailname\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailname.$error.required\">Name required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\"emailFormModel.email\" required/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.required\">Email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"email\" name=\"emailConfirm\" placeholder=\"Confirm your email\" ng-model=\"emailFormModel.emailConfirm\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.required\">Confirm email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.email\">Invalid email.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && ((emailFormModel.email|lowercase) !== (emailFormModel.emailConfirm|lowercase))\">Emails do not match.</span>\n" +
    "            </div>\n" +
    "            <div ng-hide=\"emailFormModel.isForgotPassword\">\n" +
    "                <input type=\"password\" name=\"password\" placeholder=\"Enter your password\" ng-model=\"emailFormModel.password\" ng-required=\"emailFormModel.isLogin || emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.password.$error.required\">Password required.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate || emailFormModel.isReset\">\n" +
    "                <input type=\"password\" name=\"passwordConfirm\" placeholder=\"Confirm your password\" ng-model=\"emailFormModel.passwordConfirm\" ng-required=\"emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.passwordConfirm.$error.required\">Confirm password required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && (emailFormModel.password !== emailFormModel.passwordConfirm)\">Passwords do not match.</span>\n" +
    "            </div>\n" +
    "            <div class=\"loginButton\">\n" +
    "                <input type=\"submit\" value=\"Login\" ng-class=\"{loading: emailFormModel.loginInProgress}\" ng-click=\"emailFormActions.login()\" ng-show=\"emailFormModel.isLogin\">\n" +
    "                <input type=\"submit\" value=\"Create\"  ng-class=\"{loading: emailFormModel.createInProgress}\" ng-click=\"emailFormActions.createLogin()\" ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"submit\" value=\"Get password\" class=\"getPw\" ng-class=\"{loading: emailFormModel.getPwInProgress}\" ng-click=\"emailFormActions.forgotPassword()\" ng-show=\"emailFormModel.isForgotPassword && !emailFormModel.showOk\">\n" +
    "                <input type=\"submit\" value=\"Reset\" ng-class=\"{loading: emailFormModel.resetInProgress}\" ng-click=\"emailFormActions.reset()\" ng-show=\"emailFormModel.isReset\">\n" +
    "                <input type=\"button\" value=\"Ok\" ng-click=\"hidePopover()\" ng-show=\"emailFormModel.showOk\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <span class=\"or\">or</span>\n" +
    "                <input type=\"button\" class=\"createLogin\" ng-click=\"emailFormActions.createLoginMode($event)\" value=\"Create login\" />\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <a ng-click=\"emailFormActions.forgotPasswordMode($event)\" class=\"forgotPwdLink linky\">Forgot password.</a>\n" +
    "                <div style=\"clear: both\"></div>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                {{emailFormModel.message}}\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/note/note-popover.html',
    "<div class=\"note-popover\" ng-init=\"stateClass = ''\" ng-controller=\"NotePopoverController\" >\n" +
    "    <div class=\"note-wrapper\">\n" +
    "        <div class=\"profile-picture-wrapper\">\n" +
    "            <img class=\"profile-picture\" ng-src=\"{{profilePicture}}\">\n" +
    "            <a class=\"edit-picture-button button\" ng-click=\"editPhoto()\">Edit Photo</a>\n" +
    "        </div>\n" +
    "        <div class=\"note\">\n" +
    "            <input id=\"name-box\" type=\"text\" ng-model=\"name\" placeholder=\"Name\" />\n" +
    "            <textarea class=\"note\" ng-model=\"noteText\" ng-disabled=\"skipNote\" placeholder=\"Comment\"></textarea>\n" +
    "            <p class=\"chars-left\" ng-show=\"noteText.length > 0\" ng-class=\"{warning: (noteText.length > 214)}\">{{230 - noteText.length}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"note-skipbox\">\n" +
    "        <input id=\"skipNote\" type=\"checkbox\" ng-model=\"skipNote\">\n" +
    "        <label for=\"skipNote\">No thanks, just put my name on the card.</label>\n" +
    "    </div>\n" +
    "    <button class=\"large primary\" ng-click=\"action.submit()\" ng-disabled=\"!skipNote && !noteText || noteText.length > 250 \" ng-class=\"{disabled: !skipNote && !noteText}\">Sign it!</button>\n" +
    "    <!-- div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div -->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/pay/pay-popover.html',
    "<div class=\"pay-popover\" ng-controller=\"PayPopoverController\">\n" +
    "    <h1 class=\"white\">Pitch In!</h1>\n" +
    "     <div class=\"powered\">Powered by <img src=\"/assets/powered_by_paypal.png\"></div>\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" ng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Use New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div class=\"number\">\n" +
    "                <img ng-src=\"{{numberImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <img ng-src=\"{{cvcImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><div class=\"expiry\">\n" +
    "                <img ng-src=\"{{expiryImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"MM / YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <img ng-src=\"{{zipImgUrl}}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><div class=\"email\">\n" +
    "                <img src=\"{{emailImgUrl}}\"/>\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label class=\"small\" for=\"save-credit-card\">Save my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/><label for=\"tooltip-checkbox\"><span class=\"tooltip-icon\"><img id=\"save-credit-card-lock\" src=\"/assets/cc_icon_cvc_white.png\"/><span class=\"tooltip\">Transactions are processed via secure 128-bit SSL encryption.</span></span></label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "            <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label class=\"small\" for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "        </span>\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\" height=\"28px\" width=\"28px\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/popover.html',
    "<div class=\"popover-wrapper\" ng-class=\"{shown: popoverShown}\" ng-style=\"{top: topPosition}\">\n" +
    "    <div class=\"popover-container\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/profile/profile-popover.html',
    "<div class=\"profile-popover\" ng-controller=\"ProfilePopoverController\" >\n" +
    "    <div class=\"leftcol\">\n" +
    "        <h1 class=\"white\">Upload your Photo!</h1>\n" +
    "        <p>Your picture will show up on the pieces you purchased and next to your message on the group card that will be hand-made and mailed to the recipient.</p>\n" +
    "        <img src=\"/assets/cardExample.png\"><img src=\"/assets/gridExample.png\">\n" +
    "    </div>\n" +
    "    <div class=\"rightcol\">\n" +
    "        <div class=\"profile-wrapper\">\n" +
    "            <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "                <img id=\"profile-image\" ng-src=\"{{profilePicture}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "                <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "                <a class=\"edit button\" ng-show=\"!editMode\" ng-click=\"editMode=true;\" onclick=\"$('#profile-image-container gs-image-upload div div button.image').click()\">EDIT</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <input id=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\" type=\"checkbox\" ng-model=\"useAsProfilePicture\">\n" +
    "            <label for=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\">Use this as my default profile picture</label>\n" +
    "            <label for=\"useAsProfilePicture\" ng-show=\"userHasDefaultProfileImage\">Since you've never added an image before, this will become your profile picture.</label>\n" +
    "        </div>\n" +
    "        <button class=\"large white-border\" ng-click=\"action.submit()\" ng-class=\"{disabled: !imageSet}\">Submit Photo</button>\n" +
    "        <div class=\"cancel-button\"><a class=\"cancel-button button\" ng-click=\"cancel()\">Cancel</a></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/sweepstakes/sweepstakes-popover.html',
    "<div class=\"sweeps-popover\">\n" +
    "    <div class=\"close\" style=\"opacity:0.8\" ng-click=\"close()\">X</div>\n" +
    "    <div class=\"logoArea\"></div>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"arrow-down\"></div>\n" +
    "        <h1>Enter to Win - Our Gift to You</h1>\n" +
    "        <p class=\"intro\">\n" +
    "            Experience GiftStarter yourself! Simply provide your name and email address below and you'll be\n" +
    "            entered to win your choice of an icPooch - Internet Pet Treat Dispenser with 6oz of icPooch\n" +
    "            Cookies ($130 value), or a Keurig&reg; K45 Elite Brewing System ($120 value).<sup>*</sup>\n" +
    "        </p>\n" +
    "        <div class=\"prizes\">\n" +
    "            <div class=\"sweepsBL\"></div>\n" +
    "            <div class=\"sweepsGP\"></div>\n" +
    "            <div style=\"clear: both; height: 0;\"></div>\n" +
    "        </div>\n" +
    "        <form name=\"sweepForm\" ng-submit=\"submit()\" novalidate>\n" +
    "            <div>\n" +
    "                <input type=\"text\" name=\"first\" class=\"name\" ng-model=\"model.first\" placeholder=\"First Name\" required/>\n" +
    "                <input type=\"text\" name=\"last\" class=\"name\" ng-model=\"model.last\" placeholder=\"Last Name\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.first.$error.required\">First name is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.last.$error.required\">Last name is required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" class=\"email\" ng-model=\"model.email\" placeholder=\"Email Address\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.required\">Email is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"submit\" value=\"Submit\" />\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <a ng-click=\"close()\">{{model.message}}</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <p class=\"disclaimer\">\n" +
    "            * All entries must be received by 11:59pm PT on Tuesday, March 31, 2015. By entering,\n" +
    "            you are agreeing to receive email communication from GiftStarter. Employees of GiftStarter\n" +
    "            and their families are not eligible to participate.<a style=\"float: right; opacity: .8\" ng-click=\"close()\">cancel</a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/thanks/thanks-popover.html',
    "<div class=\"thanks-popover\" ng-controller=\"ThanksPopoverController\">\n" +
    "    <h1 class=\"white\">Success!</h1>\n" +
    "    <p>Ah, that warm fuzzy feeling is the best, isn't it? Thank you for using GiftStarter as the new way to give! Seriously-we think you're just phenomenal.</p>\n" +
    "    <p>Give some friends the opportunity to get some warm fuzzies from this GiftStart, too.</p>\n" +
    "    <div class=\"buttons\">\n" +
    "        <!--<button class=\"share\" ng-click=\"socialShare()\">Facebook</button>-->\n" +
    "        <!--<a href=\"mailto:?subject={{mailSubject}}&body={{mailBody}}\" target=\"_blank\" ng-click=\"mixpanel.track('Email share in thanks clicked');\"><button class=\"share\">Email</button></a>-->\n" +
    "        <!--<button class=\"large white-border\" ng-click=\"close()\">Close</button>-->\n" +
    "        <div class=\"share-button\" ng-click=\"emailShare()\"><img class=\"share-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"facebookShare()\"><img class=\"share-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"twitterShare()\"><img class=\"share-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"googlePlusShare()\"><img class=\"share-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "    </div>\n" +
    "    <p>Want to start your own GiftStart?<br>It's easy – start <a href=\"/\" ng-click=\"hidePopover()\">here.</a></p>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Close</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/product/product-search.html',
    "<!--<div class=\"product-link wrapper\" ng-controller=\"ProductLinkController\">-->\n" +
    "<div id=\"product-search-anchor\" class=\"product-link\">\n" +
    "    <div class=\"search wrapper\">\n" +
    "        <div class=\"inputs\">\n" +
    "            <input id=\"product-search-input\" class=\"text-input\" type=\"text\" name=\"product-link\" placeholder=\"SEARCH HERE FOR THE PERFECT GIFT...\" ng-model=\"product_url\" ng-keyup=\"$event.keyCode == 13 ? submit() : null\"/><button id=\"product-search-button\" class=\"submit searchbtn\" ng-click=\"submit()\">SEARCH</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"categories-container hidden\">\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BRANDS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/apple\">Apple</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bose\">Bose</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/butter+london\">butter LONDON</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cuisinart\">Cuisinart</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dyson+vacuum\">Dyson</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fat+cork\">Fat Cork</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/frends\">Frends</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/icpooch\">iCPooch</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/samsung\">Samsung</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sturtevants\">Sturtevant's Sports</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BABY GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/baby+crib\">Baby Crib</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bassinet\">Bassinet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cradle\">Cradle</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/crib+bedding\">Crib Bedding</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/diaper+bag\">Diaper Bag</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/high+chair\">High Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playard\">Playard</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rocking+chair\">Rocking Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/stroller\">Stroller</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>ELECTRONIC GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/camera\">Camera</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/home+theater\">Home Theater</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipad\">iPad</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/iphone\">iPhone</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipod\">iPod</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/macbook\">Macbook</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playstation\">Playstation</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/television\">Television</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/wireless+speaker\">Wireless Speakers</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/xbox\">Xbox</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>HOME + WEDDING GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/barbecue+grill\">Barbecue Grill</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dog+bed\">Dog Bed</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/duvet\">Duvet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fish+tank\">Fish Tank</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/keurig\">Keurig</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/lawn+mower\">Lawn Mower</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rug\">Rugs</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/Vitamix\">Vitamix</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sofa\">Sofa</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/toaster+oven\">Toaster Oven</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"loading\">\n" +
    "        <img src=\"/assets/loading.gif\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"failed\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"results_empty\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section id=\"search-products-section\" class=\"products\" ng-class=\"{hidden: products.length == 0}\">\n" +
    "        <div class=\"product-container\" ng-class=\"{selected: product.selected}\" ng-repeat=\"product in selectedProducts\" ng-hide=\"!product.imgUrl\" ng-click=\"showProductDetails({{$index}})\">\n" +
    "            <div class=\"product\">\n" +
    "                <div class=\"image-container\">\n" +
    "                    <span class=\"vert-align-helper\"></span>\n" +
    "                    <img ng-click=\"goToProduct($index);\" ng-src=\"{{product.imgUrl}}\" onerror=\"angular.element($(this)).scope().fixImage(this);\" index=\"{{$index}}\" />\n" +
    "                </div>\n" +
    "                <div class=\"product-details\">\n" +
    "                    <h4 class=\"title\" ng-click=\"goToProduct($index, $event);\">{{product.title}}</h4>\n" +
    "                    <p class=\"description\" ng-bind-html=\"product.description\"></p>\n" +
    "                    <p class=\"price block\">${{product.price / 100 | number : 2}}</p>\n" +
    "                    <div class=\"buttons\">\n" +
    "                        <button class=\"giftstart primary\" ng-click=\"startCampaignFrom($index);$event.stopPropagation();\">GiftStart it</button>\n" +
    "                        <button class=\"giftstart green\" ng-click=\"saveForLater($index);$event.stopPropagation();\">Save for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                        <div class=\"product-message\" ng-show=\"product.selected\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <button class=\"cancel\" ng-click=\"hideProductDetails();$event.stopPropagation();\">X</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"page-buttons\" ng-show=\"products.length > 10\" >\n" +
    "            <a class=\"button linky\" ng-click=\"decrementPage()\">Previous</a><span class=\"page-number\" ng-class=\"{selected: pageNumber == selectedPage}\" ng-repeat=\"pageNumber in pageNumbers\" ng-click=\"selectPage(pageNumber)\">{{pageNumber}}</span><a class=\"button linky\" ng-click=\"incrementPage()\">Next</a>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <!--p class=\"need-help-concierge\">Can't find the gift you want? Simply contact our <a href=\"/concierge\" ng-click=\"giftConciergeClicked()\">Gift Concierge</a> and we'll find it for you. Or visit our <a href=\"/giftideas\">Gift Ideas</a> page for more ideas.</p-->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/share/invite-pitchin.html',
    "<div id=\"shareControllerWrapper\" class=\"share pitchin\" ng-controller=\"ShareController\">\n" +
    "    <div id=\"title\">\n" +
    "        <h1>Invite Friends to Pitch-in</h1>\n" +
    "        <!--p>Your GiftStarter campaign is successfully set up! Invite friends to help pitch-in\n" +
    "        and increase your chances of fully funding the gift!</p-->\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-show=\"loggedIn()\" id=\"share-block\">\n" +
    "        <div id=\"content\">\n" +
    "            <div class=\"block message\">\n" +
    "            <h4>YOUR MESSAGE</h4>\n" +
    "            <textarea id=\"shareMessage\" ng-model=\"message\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"share-where block\">\n" +
    "                <div class=\"share-where-social\">\n" +
    "                    <h4>SHARE ON SOCIAL MEDIA</h4>\n" +
    "                    <p>Select which networks you would like to post on:</p>\n" +
    "                    <div id=\"social-icons-container\">\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['facebook']=false\"><img class=\"social__icons\" src=\"/assets/share/facebook.png\" ng-show=\"selectedSocials['facebook']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/facebook-share-unselected.png ng-hide=\"selectedSocials['facebook']\" ng-click=\"selectSocial('facebook')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['twitter']=false\"><img class=\"social__icons\" src=\"/assets/share/twitter.png\" ng-show=\"selectedSocials['twitter']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/twitter-share-unselected.png ng-hide=\"selectedSocials['twitter']\" ng-click=\"selectSocial('twitter')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['linkedin']=false\"><img class=\"social__icons\" src=\"/assets/share/linkedin.png\" ng-show=\"selectedSocials['linkedin']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/linkedin-share-unselected.png ng-hide=\"selectedSocials['linkedin']\" ng-click=\"selectSocial('linkedin')\"/>\n" +
    "                        <!--<a class=\"social__link linky\" ng-click=\"selectedSocials['google']=false\"><img class=\"social__icons\" src=\"/assets/share/google.png\" ng-hide=\"!sharePermission['google'] || !selectedSocials['google']\"></a>-->\n" +
    "                        <!--<img class=\"social__icons linky\" src=/assets/share/google-share-unselected.png ng-show=\"!selectedSocials['google']\" ng-click=\"selectSocial('google')\"/>-->\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"share-where-email\">\n" +
    "                    <h4>SEND AN EMAIL</h4>\n" +
    "                    <p>Enter email addresses separated by a comma<!--, or import gmail contacts to select email addresses-->:</p>\n" +
    "                    <!--a href=\"\"><h4>IMPORT GMAIL CONTACTS</h4></a-->\n" +
    "                    <textarea ng-model=\"emailRecipients\" placeholder=\"Enter email addresses, separated by commas\"></textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-buttons\">\n" +
    "            <p ng-show=\"shareSuccess\">YOUR SHARE SUCCESSFULLY POSTED!</p>\n" +
    "            <p class=\"twitter-note\" ng-show=\"selectedSocials['twitter'] && message.length>118\">Note: For Twitter, only the first 118 characters of your message and a link to this campaign will be posted.</p>\n" +
    "            <button class=\"red\" ng-hide=\"shareSuccess\" ng-disabled=\"!selectedSocials['facebook']&&!selectedSocials['twitter']&&!selectedSocials['linkedin']&&!selectedSocials['google']&&emailRecipients.length==0\" ng-click=\"shareClick()\">SHARE</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"shareReset()\">SHARE AGAIN</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"$parent.showSharePanel(false); shareReset()\">FINISH</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-where-link\">\n" +
    "            <h4>SHARE A LINK!</h4>\n" +
    "            <p>Use this link to invite friends and family to GiftStarter through any means you'd like:</p>\n" +
    "            <input value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--a href=\"\"><h4>SKIP AND SHARE LATER</h4></a>\n" +
    "        <p>You can share your campaign at any time from your profile page or the campaign page!</p-->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/staffpicks/staffpicks.ng.html',
    "<div class=\"staffpicks\" ng-controller=\"StaffPicksController\">\n" +
    "  <div id=\"outer\">\n" +
    "    <div id=\"titlexo\">\n" +
    "      <img src=\"/assets/staffpicks/staff-picks-title-image.png\" />\n" +
    "    </div>\n" +
    "    <div class=\"rotate\">\n" +
    "      <div class=\"product-item first\">\n" +
    "        <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <div>\n" +
    "          <img class=\"avatar\" ng-src=\"{{firstProduct.avatar}}\"/>\n" +
    "          <p>{{firstProduct.desc}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{firstProduct.title}}</p>\n" +
    "          <p>{{firstProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"product-item second\">\n" +
    "        <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <img class=\"avatar\" ng-src=\"{{secondProduct.avatar}}\"/>\n" +
    "        <p>{{secondProduct.desc}}</p>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{secondProduct.title}}</p>\n" +
    "          <p>{{secondProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div id=\"clear\"></div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/about/about.html',
    "<div class=\"about body static-pages\" ng-controller=\"AboutController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>WHAT IS GIFTSTARTER?</h1>\n" +
    "    <p>Our mission is to reinvent gifting by putting our hearts back into the giving experience. Give amazing gifts you're proud of, and your friends and loved ones are delighted to get. From a group or from yourself, we'll make it happen. It's that easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main threeup\">\n" +
    "    <h2>The Team</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>CEO/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/christie.png\" alt=\"\" />\n" +
    "      <h3><b>Christie Gettler</b></h3>\n" +
    "      <h4>Design/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/sharon.png\" alt=\"\" />\n" +
    "      <h3><b>Sharon Kuo</b></h3>\n" +
    "      <h4>Web Engineering</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/joel.png\" alt=\"\" />\n" +
    "      <h3><b>Joel Serino</b></h3>\n" +
    "      <h4>Product Growth</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/tyler.png\" alt=\"\" />\n" +
    "      <h3><b>Tyler Goelz</b></h3>\n" +
    "      <h4>UX Engineer</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"mission\">\n" +
    "    <hr />\n" +
    "    <h2>Our Mission</h2>\n" +
    "    <p class=\"font\">To enable people to make meaningful connections with others using the power of gifts.<br />\n" +
    "      <b>Want to send a gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to send a group gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to save up piece by piece for a gift?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "    Your time is valuable. Don't waste another second -- use GiftStarter for all of your gifting needs.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"milestones\">\n" +
    "    <hr />\n" +
    "    <h2>Our Milestones</h2>\n" +
    "    <table>\n" +
    "      <tr>\n" +
    "        <td><b>March 2014</b></td>\n" +
    "        <td>1<sup>st</sup> place win at Startup Weekend ReDesign Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>July 2014</b></td>\n" +
    "        <td>Launched with products from Amazon.com, REI, Nordstrom, Filson, and Costco</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>August 2014</b></td>\n" +
    "        <td>Accepted into 9Mile Labs (a B2B Technology Startup Accelerator) in Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>September 2014</b></td>\n" +
    "        <td>Added over 3,000,000 products from retailers like 1-800-Flowers, B&H Photo, Best Buy, BackCountry, Sur La Table, and Kohl's</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>October 2014</b></td>\n" +
    "        <td>Launched partnership with butter LONDON&reg;</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>November 2014</b></td>\n" +
    "        <td>Launched partnerships with Sturtevant's Sports, FatCork, and iCPooch</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>Janurary 2015</b></td>\n" +
    "        <td>Our first angel investor, Gary Rubens, joins the GiftStarter team</td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"advisors threeup\">\n" +
    "    <hr />\n" +
    "    <h2>Our Advisors</h2>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/barbary-brunner.png\" alt=\"\" />\n" +
    "      <h3><b>Barbary Brunner</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gina.png\" alt=\"\" />\n" +
    "      <h3><b>Gina Cuff</b></h3>\n" +
    "      <h4>Ecommerce Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/hoon.png\" alt=\"\" />\n" +
    "      <h3><b>Hoon Kong</b></h3>\n" +
    "      <h4>Engineering Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"investors\">\n" +
    "    <hr />\n" +
    "    <h2>Our Investors</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/9mile-labs.png\" alt=\"\" />\n" +
    "      <h3><b>9Mile Labs</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gary-rubens.png\" alt=\"\" />\n" +
    "      <h3><b>Gary Rubens</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rao-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Rao Remala</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rudy-gadre.png\" alt=\"\" />\n" +
    "      <h3><b>Rudy Gadre</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/500startups.png\" alt=\"\" />\n" +
    "      <h3><b>500 Startups</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"contactus\" class=\"Contact\">\n" +
    "    <hr />\n" +
    "    <h2>Contact Us</h2>\n" +
    "    <p class=\"font\">\n" +
    "      <b>For Help:</b> email our Gift Concierge at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a><br /><b>For Press and Partners:</b> email <a href=\"mailto:partner@giftstarter.com\">partner@giftstarter.com</a><br/><br/>\n" +
    "      Also, feel free to call us at 206-486-4849!<br/><br/>\n" +
    "      GIFTSTARTER (also known as Emotiv Labs, Inc.)<br/>\n" +
    "      3727 S. Alaska Street<br/>\n" +
    "      Suite #18284<br/>\n" +
    "      Seattle, WA 98118\n" +
    "    </p>\n" +
    "    <a href=\"/giftideas\" alt=\"\" class=\"button\">START GIFTING</a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/card/card.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head lang=\"en\">\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title></title>\n" +
    "    <link rel=\"stylesheet\" href=\"/stylesheets/compiled.css\"/>\n" +
    "    <link href='https://fonts.googleapis.com/css?family=Roboto:300,600' rel='stylesheet' type='text/css'>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "    <section class=\"bow card\">\n" +
    "        <div class=\"product\">\n" +
    "            <img src=\"{{product_img_url}}\"/>\n" +
    "        </div>\n" +
    "        <img class=\"bow image\" src=\"/assets/card_bow.png\"/>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"whats-giftstarter card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <img class=\"logo\" src=\"/assets/Logo-01.png\">\n" +
    "            <p class=\"copy\"><b>Congratulations!</b></p>\n" +
    "            <p class=\"copy\">This {{product_name}} gift was group gifted for you using GiftStarter, so that your family and friends could pitch in to give you this amazing gift. Your Gift Champion, {{gc.name}}, rallied the troops and helped make this happen. This is the handmade card with all of their personal messages to you. And... YES, the actual gift is on its way to you. Watch your mailbox!</p>\n" +
    "            <p class=\"copy\">Happy gifting!</p>\n" +
    "            <!--<p class=\"signoff\">Love,</p>-->\n" +
    "            <!--<p class=\"signature\">THE GIFTSTARTER TEAM</p>-->\n" +
    "        </div>\n" +
    "        <footer>\n" +
    "            <p>SAY THANK YOU HERE!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"{{giftstart_url}}\">{{giftstart_url}}</a></p>\n" +
    "        </footer>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"gift-champion giver card\">\n" +
    "        <img src=\"{{gc.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{{gc.comment}}</p>\n" +
    "            <p class=\"name\">{{gc.name}}</p>\n" +
    "            <p class=\"the-giftstarter\">Gift Champion</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"grid card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <div class=\"grid\"><img class=\"product\" src=\"{{product_img_url}}\"/><div class=\"overlay\">{% for part_img_url in parts -%}<div class=\"part\" style=\"width: {{part_width}}; height: {{part_height}};\">{% if part_img_url %}\n" +
    "                <img class=\"part-image\" src=\"{{part_img_url}}\" style=\"max-height: {{max_img_height}};\"/>\n" +
    "                {% endif %}\n" +
    "            </div>{%- endfor %}</div></div>\n" +
    "        </div>\n" +
    "        <!--<p>TO VIEW THE WHOLE ONLINE GIFT, VISIT</p>-->\n" +
    "        <a href=\"{{giftstart_url}}\">{{giftstart_url}}</a>\n" +
    "    </section>\n" +
    "\n" +
    "    {% for giver in givers %}\n" +
    "    <section class=\"giver card\">\n" +
    "        <img src=\"{{giver.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{% if giver.comment %}{{giver.comment}}{% endif %}</p>\n" +
    "            <p class=\"name\">{{giver.name}}</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    {% endfor %}\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/scripts/static-pages/concierge/concierge.html',
    "<div class=\"concierge static-pages\" ng-controller=\"ConciergeController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>GIFT CONCIERGE IS STANDING BY</h1>\n" +
    "    <p>Need help coming up with ideas, finding a specific gift, or setting up your gift? Send any gift request and we can help.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">CONTACT NOW</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Give an Amazing Gift</h2>\n" +
    "    <div class=\"concierge-item intro\">\n" +
    "      <p>Give them a gift you're proud to give - and they're happy to get. By bringing people together with GiftStarter, you can give the gift they won't be able to stop talking about.<br /></p><blockquote>\"The best thing about the Gift Concierge is that someone will go out of their way to help you find the perfect gift and to craft the perfect experience. It is like recruiting a super hero that will make the impossible possible.\" - Thibault L.</blockquote><p>The Gift Concierge is here to help you make it happen. See all the ways the Gift Concierge can assist you.</p>\n" +
    "      <a class=\"button\" href=\"/howitworks\">HOW IT WORKS</a>\n" +
    "    </div>\n" +
    "    <div class=\"concierge-item form\">\n" +
    "      <p>Fill out the form below and we'll get back to you the same day (if possible) or within 24 hours guaranteed.</p>\n" +
    "      <div id=\"concierge-form\">\n" +
    "        <form ng-submit=\"sendMsg()\">\n" +
    "          <input type=\"text\" name=\"title\" ng-model=\"title\" placeholder=\"What event is the gift for?\" /><br/>\n" +
    "          <input type=\"text\" name=\"budget\" ng-model=\"budget\" placeholder=\"Is there a budget you want to stay within?\" /><br/>\n" +
    "          <input type=\"text\" name=\"url\" ng-model=\"url\" placeholder=\"URL to the gift you're thinking of\" /><br/>\n" +
    "          <input type=\"email\" name=\"email\" ng-model=\"email\" placeholder=\"Your email address (required)\" /><br/>\n" +
    "          <input type=\"text\" name=\"comments\" ng-model=\"comments\" placeholder=\"Additional comments\" /><br/>\n" +
    "          <button type=\"submit\" class=\"button red\">SUBMIT</button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <p>{{msg}}</p>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Give the perfect group gift, every time.</h2>\n" +
    "    <div class=\"info\">\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/clock-icon-2x.png\" alt=\"We'll help you find the perfect gift\">\n" +
    "        <br/>\n" +
    "        <h4>Timely, Personalized Service</h4>\n" +
    "        <p>Our Gift Concierge can provide fast and friendly guidance on how to make your gift campaign a success. We can also help you \"quick start\" your GiftStart campaign by setting it up exactly to your needs then sending you the link.</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/gift-icon-2x.png\" alt=\"Custom help in finding the right gift\">\n" +
    "        <br/>\n" +
    "        <h4>Personal Gifter</h4>\n" +
    "        <p>Fun, Fast and No Pressure Gift Ideas - we provide recommendations without the feeling of obligation to take our advice. Once you settle on the perfect gift and the campaign is set up, we take care of the rest through the GiftStarter platform (collecting payments and personal messages, making the card, shipping). We've seen hundreds of group gifts, let us help you find yours!</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/bulb-icon-2x.png\" alt=\"Group Gift any gift you can imagine\">\n" +
    "        <br/>\n" +
    "        <h4>If You Can Dream It, You Can Gift It</h4>\n" +
    "        <p>Can't find it on our site? We can make that perfect Group Gift Campaign a reality. No matter what the gift, whether it's horseback riding lessons with a local provider or an airline ticket to a beautiful beach, we can make it happen! For ideas and inspiration, check our <a href=\"http://www.pinterest.com/Giftstarter/\">2014 Gift Guides on Pinterest.</a></p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/faq/faq.html',
    "<div class=\"faq static-pages\" ng-controller=\"FaqController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>FREQUENTLY ASKED QUESTIONS</h1>\n" +
    "    <p>We are here to help in any way we can. If you need help coming up with ideas, finding a gift or setting up your gift, send any request to us. We respond within 1 business day (9AM-7PM PST). Email <a href=\"mailto: giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>, call 206-486-4849, or use the chat option in the bottom right corner of your window.</p>\n" +
    "  </div>\n" +
    "    <div class=\"main\">\n" +
    "      <h2 ng-click=\"toggleAll()\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"openQuestions.length == questionCount\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"openQuestions.length == questionCount\"/><span ng-hide=\"openQuestions.length == questionCount\">Expand All</span><span ng-show=\"openQuestions.length == questionCount\">Close All</span></h2>\n" +
    "      <div ng-repeat=\"section in items\" class=\"sections\">\n" +
    "        <h1>{{section.name}}</h1>\n" +
    "        <div ng-repeat=\"question in section.questions\">\n" +
    "          <h2 ng-click=\"toggleQuestion(question)\" ng-class=\"{open: isOpenQuestion(question)}\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"isOpenQuestion(question)\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"isOpenQuestion(question)\"/>{{question.question}}</h2>\n" +
    "          <p ng-show=\"isOpenQuestion(question)\" ng-bind-html=\"question.answer\"></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/giftideas/giftideas.html',
    "<div class=\"giftideas wrapper static-pages\" ng-controller=\"GiftideasController\">\n" +
    "    <!-- ==== HEADERWRAP ==== -->\n" +
    "    <div class=\"headerwrap\" name=\"home\" title=\"GiftStarter Team\" ng-show=\"!category\">\n" +
    "        <h1>FIND THE PERFECT GIFT</h1>\n" +
    "        <p>It's that easy.  Weddings, baby showers, birthdays, any occasion - simply find the perfect gift, share it with friends & family so they can pitch in, and we'll take care of shipping it... including a handmade card.</p>\n" +
    "    </div><!-- /headerwrap -->\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/giftideas/giftideas.ng.html'\"></ng-include>\n" +
    "\n" +
    "    <div class=\"clear hidden\" ng-hide>\n" +
    "        <p>&nbsp;</p>\n" +
    "        <h4 class=\"centered\">Looking for something else?</h4>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category || product\" id=\"disclaimer\">\n" +
    "        If the item you GiftStart has color, size or other options, please contact the Gift Concierge to ensure you get the item that best meets your specifications or if you have any other questions regarding your product selection.\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/howitworks/howitworks.html',
    "<div class=\"howitworks static-pages\" ng-controller=\"HowItWorksController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>HOW IT WORKS</h1>\n" +
    "    <p>Let us tell you a bit more about how it works.<br />GiftStarter is the place to give and get meaningful gifts. Gift and pay for ANY product or service TO anyone WITH anyone.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/concierge\">ASK A QUESTION</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div class=\"menu\">\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'welcome'\" ng-class=\"{selected: sectionShown == 'welcome'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          WELCOME\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'group-gifting'\" ng-class=\"{selected: sectionShown == 'group-gifting'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GROUP GIFTING\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'concierge'\" ng-class=\"{selected: sectionShown == 'concierge'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GIFT CONCIERGE\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'search'\" ng-class=\"{selected: sectionShown == 'search'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          FIND A GIFT\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'glossary'\" ng-class=\"{selected: sectionShown == 'glossary'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GLOSSARY\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"selector-bar\"></div>\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <div id=\"welcome\" ng-show=\"sectionShown == 'welcome'\">\n" +
    "        <h2>Welcome to GiftStarter!</h2>\n" +
    "        <h4>Start amazing gifts here -- ones you are proud to give, and they're happy to get.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it -- and we help you with the rest. When you use GiftStarter, you don't have to collect the money or chase people down for cash.<br />It only takes a couple minutes to launch a campaign for your gift.\n" +
    "          <br />Start an amazing gift today! Once it is complete, we handle ensuring the card with everyone's messages and the gift is shipped!\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div id=\"glossary\" ng-show=\"sectionShown == 'glossary'\">\n" +
    "        <h2>Giftstarter Glossary</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement bringing people committed to giving amazing gifts.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          Here's a glossary of gifting words to help you in our gifting community:\n" +
    "        </p>\n" +
    "        <table>\n" +
    "          <tr>\n" +
    "            <td>GiftStarter - n.</td>\n" +
    "            <td>That's us! We are here to help you give amazing gifts you are proud to give, and they are happy to get.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Champion - n.</td>\n" +
    "            <td>This is a person (you!) that starts an amazing gift, and invites family and friends to pitch in.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Contributor - n.</td>\n" +
    "            <td>The people invited in by the Gift Champion to pitch in on the amazing gift and sign the card.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Recipient - n.</td>\n" +
    "            <td>The person(s) that receive the amazing gift!</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Concierge - n.</td>\n" +
    "            <td>Our Gift Concierge is like your personal shopper who will help you find and give that amazing gift.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Nudge - n, v.</td>\n" +
    "            <td>These are the gentle friendly reminders (nudges) we make in order to help ensure your gifting event is amazing.</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "      <div id=\"search\" ng-show=\"sectionShown == 'search'\">\n" +
    "        <h2>Find an Amazing Gift</h2>\n" +
    "        <h4>GiftStarter helps you give amazing gifts you are proud to give and they are happy to get.</h4>\n" +
    "        <p class=\"sub\">GiftStarter has the tools to help you find those gifts you’re proud to give, and they’re happy to get.</p>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>SEARCH</p>\n" +
    "            <p>Use our search bar located at the top of the page and on the home page to search for products by name or brand. We source our gifts from reliable stores such as:</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-1.png\" />\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT CONCIERGE</p>\n" +
    "            <p>Our Gift Concierge is like you personal shopping assistant who will help you find the perfect gift for the occassion - even if it’s not on our site!</p>\n" +
    "          </div>\n" +
    "          <div id=\"search-item-concierge\">\n" +
    "            <p>You can <a href=\"mailto:giftconcierge@giftstarter.com\">email</a> (giftconcierge@giftstarter.com), contact via <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">chat</a>, or call  206.486.4849</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT IDEAS</p>\n" +
    "            <p>More of a browser when you shop? Our carefully curated gift ideas are a great place to see what new and exciting products there are to gift.</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-2.png\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div id=\"concierge\" ng-show=\"sectionShown == 'concierge'\">\n" +
    "        <h2>Gift Concierge</h2>\n" +
    "        <h4>Fast, fun, and no pressure personal shopper to help you find that perfect gift. Can't find it? We can help. Can't think of an idea? We can help.</h4>\n" +
    "        <p class=\"sub\">We'll get back to you same day if possible -- definitely within 24 hours.</p>\n" +
    "        <div class=\"concierge-table\">\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>EMAIL<br/><br/>\n" +
    "              Send us an email at any time. The more information you include about your need, the more we can help!<br/><br/><br/>\n" +
    "              <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>LIVE CHAT<br/><br/>\n" +
    "              You can access our live chat program in the bottom right corner of your browser.<br/><br/>\n" +
    "              <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">Don't see it?</a><br/><br/>\n" +
    "              *Live chat available during business hours (PST)\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>ONLINE FORM<br/><br/>\n" +
    "              Fill out the quick form about your gifting need and we'll get on it ASAP!<br/><br/><br/>\n" +
    "              <a href=\"/concierge\" class=\"button\">ONLINE FORM</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p>Or you can just plain call us: 206-486-4849.</p>\n" +
    "      </div>\n" +
    "      <div id=\"group-gifting\" ng-show=\"sectionShown == 'group-gifting'\">\n" +
    "        <h2>Group Gifting Starts Here</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement focused on bringing people together in a community that loves giving amazing gifts.<br/></h4>\n" +
    "        <p class=\"sub\">Our patent-pending technology divides the price of the gift into perfect pieces, giving family and friends the ability to purchases as many or as few pieces as they wish! Any product available online can be gifted with GiftStarter, and we’re here to help every step of the way. From collecting the money to shipping the gift - and even creating a special card with your personal messages - we’ve got you covered!<br/></p>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-1.png\" />\n" +
    "          <p class=\"center\"><strong>1</strong><br/>FIND A GIFT</p><p>Search from over 3 million products on our site. You can also discover our favorite gifts on our Gift Ideas page or contact our Gift Concierge for custom gifts.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-2.png\" />\n" +
    "          <p class=\"center\"><strong>2</strong><br/>SELECT A GIFT</p><p>From the search results or Gift Ideas page, you can click on product images to view product information and details, and the “GiftStart it” button. Click this button to start your group gift!</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-3.png\" />\n" +
    "          <p class=\"center\"><strong>3</strong><br/>ADJUST THE PIECES</p><p>Click the “+” to add pieces, thus lowering the price of each piece. Click the “-” button to remove pieces, and increase the price of each piece. Consider the size of the group you’ll invite; some people will buy 1 piece, some may buy more.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-4.png\" />\n" +
    "          <p class=\"center\"><strong>4</strong><br/>YOUR GIFTING EVENT</p><p>Describe the reason for this gift. What’s the event? Who is it for? Why is this a good gift for this person and/or event?</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-5.png\" />\n" +
    "          <p class=\"center\"><strong>5</strong><br/>THE GIFT</p><p>Tell us where this gift needs to go and when you want it there and we’ll make it happen! <br />*Note standard shipping is always free with GiftStarter</p>\n" +
    "        </div>\n" +
    "        <p class=\"clear sub\">That’s all there is to it. Share and invite friends and family to purchase pieces and give a gift that shows how much you care. We’re here to help you at any time and to ensure the gift and personal card are delivered. <br /><br />Give a remarkable gift today.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"clear\">\n" +
    "      <a href=\"/giftideas\" alt=\"\" class=\"button\" id=\"gifting-button\">START GIFTING</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <h2>Inspiring Examples</h2>\n" +
    "    <ng-include src=\"'/scripts/inspirationalexamples/inspirationalexamples.ng.html'\"></ng-include>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/oldbrowser/oldbrowser.html',
    "<div class=\"oldbrowser wrapper\" ng-controller=\"OldbrowserController\">\n" +
    "    <p>Whoops! Your browser is not supported.  Please use a different browser.</p>\n" +
    "    <p>If you don't have a different browser, you can download one of these for free:</p>\n" +
    "    <p><span><a href=\"https://www.google.com/chrome/browser/\"><img src=\"/assets/chrome-logo.png\"><br/>Google Chrome</a></span><span><a href=\"https://www.mozilla.org/en-US/firefox/new/\"><img src=\"/assets/firefox-logo.png\"><br/>Mozilla Firefox</a></span></p>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/partners/partners.html',
    "<div class=\"partners static-pages\" ng-controller=\"PartnersController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>PARTNER WITH US</h1>\n" +
    "    <p>We love our brand partners. Let your customers be your advocates to their family and friends through gifting. Partner with us today, setup is fast and easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div id=\"love\">\n" +
    "    <h2>Why do Brands Love GiftStarter?</h2>\n" +
    "    <p class=\"sub\">GiftStarter is the best group gifting service for brands. We enable seamless social commerce with our patent-pending technology. We ship a handmade card and the gift with every GiftStart. Using social, we connect family and friends to gift-pportunities. GiftStarters love our partner products and services. In fact, they are gifted 4:1 over others. Join us and give your customers a better way to gift, together.</p>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/money-icon-2x.png\" alt=\"Increase Sales Opportunities\">\n" +
    "        <br>\n" +
    "        <h4>Increase Sales Opportunities</h4>\n" +
    "        <p>Broaden the reach of your target audience and increase brand exposure with GiftStarter. Group gifts expand your reach and sell additional products and services to audiences who may not have previously been exposed to your brand. Additionally, our Gift Concierge service promotes our brand partners by providing users with group gift ideas, helping to gain new customers.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/truck-icon-2x.png\" alt=\"We Take Care of Delivery\">\n" +
    "        <br>\n" +
    "        <h4>We Take Care of Delivery</h4>\n" +
    "        <p>No hassling with special shipment inputs. GiftStarter works directly with the initiators of GiftStarts to collect recipient shipping information and directly inputs this into your current e-commerce flow.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/no-fee-icon-2x.png\" alt=\"No Setup Fee\">\n" +
    "          <br>\n" +
    "          <h4>No Setup Fee (Early Partners Only)</h4>\n" +
    "          <p>Using our seamless integration of the GiftStarter button, we work directly with partners to ensure end-to-end integration of the group gifting experience into your e-commerce platform. This complimentary service is provided through our technical and partner teams. Setup typically takes less then 20 minutes.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/thumb-2x.png\" alt=\"Our Users, Your Brand Ambassadors\">\n" +
    "          <br>\n" +
    "          <h4>Our Users, Your Brand Ambassadors</h4>\n" +
    "          <p>Partnering with GiftStarter brings the added benefit of engaging directly with ambassadors of your brands, as group gifting allows users to easily promote your products and services through their circle of family and friends. GiftStarter delivers a higher level of perceived value  providing more reasons to purchase including social media integration and handcrafted cards.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Featured Partners</h2>\n" +
    "    <div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/butter-logo-square.png\" alt=\"butterLondon - Partner\">\n" +
    "\n" +
    "        <p>“With the growing importance of social influence\n" +
    "        and mobile shopping to our customers, we needed to explore a solution that allows our Bezzie Mates to shop and give socially this holiday season. GiftStarter was the perfect partner to celebrate this customer experience and support group giftting across social and digital platforms.”</p>\n" +
    "        <h4><b>Leslie Freitag</b></h4>\n" +
    "        <h5>President & CEO</h5>\n" +
    "      </div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/bh-logo.png\" alt=\"B&H Photo - Partner\">\n" +
    "\n" +
    "        <p>“I just love Giftstarter! I think it creates an easy platform for us to present large order items as gifts for photographers, providing a great benefit to B&H customers you can't find anywhere else!”</p>\n" +
    "        <h4><b>Menashe Wodinksy</b></h4>\n" +
    "        <h5>Online Marketing Strategist</h5>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Start Delighting Customers Now</h2>\n" +
    "    <p>Expand your brand and better connect with audiences through group gifting.</p>\n" +
    "    <a href=\"mailto:partner@giftstarter.com\" class=\"button\">PARTNER WITH US</a>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/press/press.html',
    "<div class=\"static-pages presspage\" ng-controller=\"PressController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>IN THE NEWS</h1>\n" +
    "    <p>We've been fortunate enough to be featured by some of the most prestigious media outlets in the world. <span class=\"wrap-on-desktop\">See what all of the buzz is about.</span></p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/blog\">READ MORE</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Who's talking about GiftStarter?</h2>\n" +
    "    <div class=\"press-item\" ng-repeat=\"item in items\">\n" +
    "      <a href=\"{{item.link}}\" target=\"_blank\">\n" +
    "      <img src=\"assets/press/{{item.img}}\" />\n" +
    "      </a>\n" +
    "      <p ng-bind-html=\"item.quote\"></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bottom\">\n" +
    "    <hr />\n" +
    "    <h2>Try it yourself!</h2>\n" +
    "    <a class=\"button\" href=\"/giftideas\">START GIFTING</a>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/privacy/privacy.html',
    "<div class=\"faq wrapper privacyandterms\">\n" +
    "<h1>Privacy Policy</h1>\n" +
    "<p>The Site is operated by GiftStarter, Inc. (\"GiftStarter\" or the \"Company\"). This page sets forth the Privacy Policy (the \"Policy\") for the website at GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”)</p>\n" +
    "<p>We take the responsibility of having your personal information very seriously. We use your personal information only for providing and improving the Service. We treat your personal information as we would and do treat our own.</p>\n" +
    "<p>By using the Service, you consent to the collection and use of information in accordance with this Policy.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace this Policy by posting the updated version on the Site. It is your responsibility to check this Policy periodically for changes. Your continued use of the Service following the posting of any changes to this Policy constitutes your acceptance of those changes.</p>\n" +
    "<h2>Collection of Information</h2>\n" +
    "<p>We may collect and process the following information about you:</p>\n" +
    "<ul>\n" +
    "<li>Information (such as your name, email and postal address, telephone number, sex, and country of residence) that you provide by completing forms on the Site, including if you register as a user of the Service, subscribe to our newsletter, upload or submit any material through the Site, or request any information;</li>\n" +
    "<li>Your log-in and password details in connection with the account sign-in process;</li>\n" +
    "<li>Details of any requests or transactions made by you through the Service;</li>\n" +
    "<li>Communications you send to us, for example to report a problem or to submit queries, concerns, or comments regarding the Service or its content;</li>\n" +
    "<li>Information that you post to the Site in the form of comments or contributions to discussions; and</li>\n" +
    "<li>IP addresses.</li>\n" +
    "</ul>\n" +
    "<h2>Uses of Your Personal Information</h2>\n" +
    "<p>We will use the personal information you provide to:</p>\n" +
    "<ul>\n" +
    "<li>Identify you when you sign-in to your account;</li>\n" +
    "<li>Enable us to provide you with the Services;</li>\n" +
    "<li>Send you information we think you may find useful or which you have requested from us;</li>\n" +
    "<li>Present projects to you when you use the Service which we believe will be of interest based on your geographic location and previous use of the Service;</li>\n" +
    "<li>Administer your account with us;</li>\n" +
    "<li>Enable us to contact you regarding any question you make through the Service;</li>\n" +
    "<li>Analyze the use of the Service and the people visiting to improve our content and Services; and</li>\n" +
    "<li>Use for other purposes that we may disclose to you when we request your information.</li>\n" +
    "</ul>\n" +
    "<p>Campaign creators (GiftStarters) receive the names of the Gift Givers during the GiftStart process.</p>\n" +
    "<p>GiftStarters never receive Gift Givers' credit card information.</p>\n" +
    "<p>We provide the verified personal or legal entity name to Gift Givers in their receipt emails. In the future, we may provide these names to Gift Givers or other users on the project page or other areas.</p>\n" +
    "<p>Personal information is collected via Secure Socket Layer (SSL) protocol (https) to ensure security and safety.</p>\n" +
    "<h2>Email</h2>\n" +
    "<p>We want to communicate with you only if you want to hear from us. We try to keep emails to a minimum and give you the ability to opt out when we can.</p>\n" +
    "<p>We will send you email relating to your personal transactions. We will keep these emails to a minimum.\n" +
    "You will also receive certain email notifications, for which you may opt-out.</p>\n" +
    "<p>We may send you service-related announcements on rare occasions when it is necessary to do so.</p>\n" +
    "<h2>Third-Party Services</h2>\n" +
    "<p>We never post anything to your accounts with Facebook, Twitter, or any other third-party sites without your permission.</p>\n" +
    "<p>Except for the purposes of providing the Services, we will not give your name or personal information to third parties.</p>\n" +
    "<h2>Technology</h2>\n" +
    "<p>Cookies are small pieces of information which are issued to your computer when you visit a website and which store and sometimes track information about your use of the Service. GiftStarter uses cookies to help recognize you as a repeat visitor, to improve the quality of our Service, and to try and make your browsing experience meaningful. When you enter our Site, our web server sends a cookie to your computer which allows us to recognize your computer but not specifically who is using it. By associating the identification numbers in the cookies with other customer information when, for example, you log-in to the Service, then we know that the cookie information relates to you. Some of the code and cookies used by our Service are served by us, and some are served by third parties who are delivering services on our behalf.</p>\n" +
    "<p>Most web browsers automatically accept cookies but, if you prefer, you can change your browser to prevent that or to notify you each time a cookie is set. You can also learn more about cookies by visiting <a href=\"http://www.allaboutcookies.org\">www.allaboutcookies.org</a> which includes additional useful information on cookies and how to block cookies using different browsers. By blocking or deleting cookies used on our Service, you may not be able to take full advantage of our Service.</p>\n" +
    "<h2>Voluntary Disclosure</h2>\n" +
    "<p>Any personal information or content that you voluntarily disclose in public areas of the Site becomes publicly available and can be collected and used by other users. You should exercise caution before disclosing your personal information through these public venues.</p>\n" +
    "<p>GiftStarters never receive users' credit card information.</p>\n" +
    "<h2>Wrap-up</h2>\n" +
    "<p>GiftStarter reserves the right to disclose your personally identifiable information as required by law and when we believe that disclosure is necessary to protect our rights, or in the good-faith belief that it is necessary to comply with the law.</p>\n" +
    "<p>On request, we will give you a copy of all the personal information about you that we hold. This information is subject to a fee not exceeding the prescribed fee permitted by law.</p>\n" +
    "<p>People under 18 (or the legal age in your jurisdiction) are not permitted to use GiftStarter on their own, and so this privacy policy makes no provision for their use of the site.</p>\n" +
    "<p>Information that you submit through the Service may be transferred to countries outside the European Economic Area (“EEA”) to provide the Service to you. For example, our servers are in the United States. If we transfer your information outside the EEA in this way, we will take steps to ensure that your privacy rights continue to be protected.</p>\n" +
    "<p>Your privacy is very important to us, but due to the existing legal regulatory and security environment, we cannot fully ensure that your private communications and other personally identifiable information will not be disclosed to third parties. Under certain circumstances, the government or third parties may lawfully or unlawfully intercept or access transmissions or private communications. Additionally, in the unlikely event we need to investigate or resolve possible problems or inquiries, we may disclose information about you to private entities, law enforcement, or other government officials as we, in our sole discretion, believe necessary or appropriate.</p>\n" +
    "<p>GiftStarter encourages you to learn as much as you can about your privacy on the Internet. To find out more, visit <a href=\"http://www.bbbonline.org\">www.bbbonline.org</a> or <a href=\"http://www.TRUSTe.com\">www.TRUSTe.com</a>.</p>\n" +
    "<h2>Questions</h2>\n" +
    "<p>If you have questions or suggestions, please contact our primary Privacy Agent at <a href=\"mailto:arry@giftstarter.com\">arry@giftstarter.com</a>.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/terms/terms.html',
    "<div class=\"wrapper faq privacyandterms\">\n" +
    "<h1>Terms of Use</h1>\n" +
    "<p>GiftStarter.com’s goal is to provide the #1 online gifting experience service.  The GiftStarter.com websites exist for the purpose of providing a personal gifting experience with one or more people together.  Any use outside of this purpose is prohibited.  These terms of use apply exclusively to your access and use of the GiftStarter.com website, and any parts or sections thereof including, but not limited to GiftStarter.com web content, member-personalized GiftStarter.com GiftStart information, user information, photos, and graphics (hereinafter referred to as the “site.)</p>\n" +
    "<h2>Summary of Service</h2>\n" +
    "<p>GiftStarter is a platform where certain users (\"GiftStarters\") run GiftStarts to fund gifts from one or more gifters (Gift Givers).  Through the Site, email, websites, and other media, the Service makes accessible various content, including, but not limited to, videos, photographs, images, artwork, graphics, audio clips, comments, data, text, software, scripts, projects, other material and information, and associated trademarks and copyrightable works (collectively, “Content”). Gift GiftStarters, Gift Givers, and other visitors to and users of the Service (collectively, “Users”) may have the ability to contribute, add, create, upload, submit, distribute, facilitate the distribution of, collect, post, or otherwise make accessible (\"Submit\") Content. “User Submissions” means any Content Submitted by Users.</p>\n" +
    "<h2>Acceptance of Terms</h2>\n" +
    "<p>If you do not agree with any of these terms, do not access or otherwise use the Site or any information or materials contained on the Site.  Your use of the Site shall be deemed to be your agreement to abide by each of the terms set below.\n" +
    "Please read these Terms of Use (the \"Agreement\" or \"Terms of Use\") carefully before using the services offered by Emotiv Labs, Inc. or Emotive Labs, Inc. (together “GiftStarter” or the “Company”). This Agreement sets forth the legally binding terms and conditions for your use of the website at www.GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”). By using the Service in any manner, including, but not limited to, visiting or browsing the Site or contributing content, information, or other materials or services to the Site, you agree to be bound by this Agreement.</p>\n" +
    "<p>The Service is offered subject to acceptance of all of the terms and conditions contained in these Terms of Use, including the Privacy Policy and all other operating rules, policies, and procedures that may be published on the Site by the Company, which are incorporated by reference. These Terms of Use apply to every user of the Service. In addition, some services offered through the Service may be subject to additional terms and conditions adopted by the Company. Your use of those services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace these Terms of Use by posting the updated terms on the Site. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.</p>\n" +
    "<p>The Company reserves the right to change, suspend, or discontinue the Service (including, but not limited to, the availability of any feature, database, or Content) at any time for any reason. The Company may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.</p>\n" +
    "<p>The Service is available only to individuals who are at least 18 years old (and at least the legal age in your jurisdiction). You represent and warrant that if you are an individual, you are at least 18 years old and of legal age in your jurisdiction to form a binding contract, and that all registration information you submit is accurate and truthful. The Company reserves the right to ask for proof of age from you and your account may be suspended until satisfactory proof of age is provided. The Company may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in those jurisdictions.</p>\n" +
    "<h2>Rules and Conduct</h2>\n" +
    "<p>As a condition of use, you promise not to use the Service for any purpose that is prohibited by the Terms of Use or law. The Service is provided only for your own personal, non-commercial use (except as allowed by the terms set forth in the section of these Terms of Use titled, \"Gifts: Fundraising and Commerce\"). You are responsible for all of your activity in connection with the Service. You shall not, and shall not permit any third party using your account to, take any action, or Submit Content, that:</p>\n" +
    "<ul>\n" +
    "<li>Infringes any patent, trademark, trade secret, copyright, right of publicity, or other right of any other person or entity, or violates any law or contract;</li>\n" +
    "<li>You know is false, misleading, or inaccurate;</li>\n" +
    "<li>Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, tortious, obscene, offensive, profane, or invasive of another's privacy;</li>\n" +
    "<li>Contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit, or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password, or other information of the Company or any third party;</li>\n" +
    "<li>Is made in breach of any legal duty owed to a third party, such as a contractual duty or a duty of confidence; or\n" +
    "impersonates any person or entity, including any employee or representative of the Company.</li>\n" +
    "</ul>\n" +
    "<p>Additionally, you shall not: (i) take any action that imposes or may impose (as determined by the Company in its sole discretion) an unreasonable or disproportionately large load on the Company’s or its third-party providers’ infrastructure; (ii) interfere or attempt to interfere with the proper working of the Service or any activities conducted on the Service; (iii) bypass any measures the Company may use to prevent or restrict access to the Service (or other accounts, computer systems, or networks connected to the Service); (iv) run Maillist, Listserv, or any form of auto-responder or \"spam\" on the Service; or (v) use manual or automated software, devices, or other processes to \"crawl\" or \"spider\" any page of the Site.</p>\n" +
    "<p>You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</p>\n" +
    "<p>Users agree to not abuse other users' personal information. Abuse is defined as using personal information for any purpose other than those explicitly specified in the GiftStarter’s GiftStart, or is not related to fulfilling delivery of a product or service explicitly specified in the GiftStarters’s GiftStart.</p>\n" +
    "<h2>Registration</h2>\n" +
    "<p>You may view Content on the Site without registering, but as a condition of using certain aspects of the Service, you may be required to register with the Company and select a screen name (\"User ID\") and password. You shall provide accurate, complete, and updated registration information. Failure to do so shall constitute a breach of the Terms of Use, which may result in immediate termination of your account. You shall not use as a User ID, domain name, or project name any name or term that (i) is the name of another person, with the intent to impersonate that person; (ii) is subject to any rights of another person, without appropriate authorization; or (iii) is offensive, vulgar, or obscene. The Company reserves the right in its sole discretion to refuse registration of or cancel a User ID, domain name, and project name. You are solely responsible for activity that occurs on your account and shall be responsible for maintaining the confidentiality of your password for the Site. You shall never use another User account without the other User’s express permission. You will immediately notify the Company in writing of any unauthorized use of your account, or other known account-related security breach.</p>\n" +
    "<h2>Hyperlinks to this Site</h2>\n" +
    "<p>You are granted a limited, nonexclusive right to create a \"hypertext\" link to the Site provided that such link is to the entry page of the Site (or your GiftStart page within the Site) and does not portray GiftStarter. or any of its other products or services in a false, misleading, derogatory, or otherwise defamatory manner. This limited right may be revoked at any time for any reason whatsoever. You may not use, frame, or utilize framing techniques to enclose any GiftStarter trademark, logo or trade name or other proprietary information including the images found at the Site, the content of any text or the layout/design of any page or any form contained on a page without the express written consent of GiftStarter (or Emotiv Labs, Inc.)</p>\n" +
    "<h2>Gifts: Fundraising and Commerce</h2>\n" +
    "<p>GiftStarter is a platform where GiftStarters run campaigns to fund gifts. By creating a campaign (GiftStart) on GiftStarter, you as the GiftStarter are offering the public the opportunity to enter into a contract with you. By backing a GiftStart on GiftStarter, you as the Gift Giver(s) accept that offer and the contract between Gift Giver(s) and GiftStarter is formed. GiftStarter is not a party to that agreement between the Gift Giver(s) and GiftStarter. All dealings are solely between Users.</p>\n" +
    "<p>By backing or creating a GiftStart on GiftStarter, you agree to be bound by this entire Agreement, including the following terms:</p>\n" +
    "<ul>\n" +
    "<li>Gift Givers agree to provide their payment information at the time they contribution to a GiftStart. The payment will be collected at the moment of gifting.  The gift or gift amount requested will be gifted to the User designated as the “Gift Recipient” in the GiftStart setup process. The amount Gift Givers contribution is the amount they will be charged.</li>\n" +
    "<li>Gift Givers consent to GiftStarter and its payments partners authorizing or reserving a charge on their payment card or other payment method for any amount up to the full contribution at any time between the contribution and collection of the funds.</li>\n" +
    "<li>Gift Givers agree to have sufficient funds or credit available at the GiftStart deadline to ensure that the contribution will be collectible.</li>\n" +
    "<li>Gift Givers may not cancel or reduce their contribution once the GiftStart has been funded and/or the GiftStart deadline has been passed (10 days).</li>\n" +
    "<li>The Estimated gift delivery date for each gift is not a promise to fulfill by that date, but is merely an estimate of when GiftStarter aims to deliver the gift by.</li>\n" +
    "<li>For some gifts, the GiftStarter needs further information from Gift Givers, such as a mailing address or t-shirt size, to enable the GiftStarter to deliver the gifts. GiftStarter shall request the information directly from GiftStarter or Gift Givers at some point during or after the GiftStart.</li>\n" +
    "<li>GiftStarter does not offer refunds.</li>\n" +
    "<li>Because of occasional failures of payments from Gift Givers, GiftStarter cannot guarantee the receipt by Gift Recipient of the amount contributed minus fees.</li>\n" +
    "<li>GiftStarter and its payments partners will remove their fees before transmitting proceeds of a GiftStart. Fees may vary depending on region and other factors (e.g. taxes, shipping).</li>\n" +
    "<li>GiftStarter reserves the right to cancel a contribution at any time and for any reason.</li>\n" +
    "<li>GiftStarter reserves the right to reject, cancel, interrupt, remove, or suspend a GiftStart at any time and for any reason. GiftStarter is not liable for any damages as a result of any of those actions. GiftStarter’s policy is not to comment on the reasons for any of those actions.</li>\n" +
    "<li>Users should not take any action in reliance on having their project posted on the Site or having any of the money contributed until they have the ability to withdraw and spend the money. There may be a delay between the end of a successful GiftStart and access to the funds.</li>\n" +
    "</ul>\n" +
    "<p>GiftStarter is not liable for any damages or loss incurred related to gifts or any other use of the Service. GiftStarter is under no obligation to become involved in disputes between any Users, or between Users and any third party arising in connection with the use of the Service. This includes, but is not limited to, delivery of goods and services, and any other terms, conditions, warranties, or representations associated with GiftStarts on the Site. GiftStarter does not oversee the performance or punctuality of projects. The Company does not endorse any User Submissions. You release GiftStarter, its officers, employees, agents, and successors in rights from claims, damages, and demands of every kind, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and the Service.</p>\n" +
    "<h2>Fees and Payments</h2>\n" +
    "<p>Joining GiftStarter is free. However, we do charge fees for certain services. When you use a service that has a fee you have an opportunity to review and accept the fees that you will be charged. Changes to fees are effective after we provide you with notice by posting the changes on the Site. You are responsible for paying all fees and taxes associated with your use of the Service.</p>\n" +
    "<p>Funds contributed by Gift Givers are collected by PayPal. GiftStarter is not responsible for the performance of PayPal.\n" +
    "Third Party Payment Services.</p>\n" +
    "<p>GiftStarter provides links and interfaces to third party payment services, such as PayPal, which permit gift givers to send funds to purchase gifts on behalf of the GiftStarter(s) and Gift Giver(s) for the Gift Recipient(s). You acknowledge that while GiftStarter. provides links to these third party payment services, GiftStarter. does not control and is not responsible for payments made or received through these services. Any use of third party payment services by you will be subject to the fees, terms and conditions of such third party payment services, and at your own risk.</p>\n" +
    "<p>In some circumstances and in order to reduce transactions fees, GiftStarter may collect and pay PayPal payment fees on behalf of the user. You acknowledge these fees will automatically be paid to GiftStarter via PayPal.</p>\n" +
    "<p>Gift givers acknowledge that they are submitting payment via PayPal, and therefore, GiftStarter cannot be responsible for lost payments, identity theft, fraud or refunds.</p>\n" +
    "<h2>Third-Party Sites</h2>\n" +
    "<p>The Service may permit you to link to other websites or resources on the internet, and other websites or resources may contain links to the Site. When you access third-party websites, you do so at your own risk. Those other websites are not under the Company's control, and you acknowledge that the Company is not liable for the content, functions, accuracy, legality, appropriateness, or any other aspect of those other websites or resources. The inclusion on another website of any link to the Site does not imply endorsement by or affiliation with the Company. You further acknowledge and agree that the Company shall not be liable for any damage related to the use of any content, goods, or services available through any third-party website or resource.</p>\n" +
    "<h2>Content and License</h2>\n" +
    "<p>You agree that the Service contains Content provided by the Company and its partners and Users and that the Content may be protected by copyrights, trademarks, service marks, patents, trade secrets, or other rights and laws. You shall abide by and maintain all copyright and other legal notices, information, and restrictions contained in any Content accessed through the Service.</p>\n" +
    "<p>The Company grants to each User of the Service a worldwide, non-exclusive, non-sublicensable and non-transferable license to use and reproduce the Content, solely for personal, non-commercial use. Use, reproduction, modification, distribution, or storage of any Content for other than personal, non-commercial use is prohibited without prior written permission from the Company, or from the copyright holder. You shall not sell, license, rent, or otherwise use or exploit any Content for commercial use or in any way that violates any third-party right.</p>\n" +
    "<h2>Changes to the Site</h2>\n" +
    "<p>The Company reserves the right from time to time to make modifications and changes to the Site. These modifications and changes may include, but are not limited to, discontinuing, temporarily or permanently, any service offered by, or through the Company. (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any other party for any changes and modifications to the Site.</p>\n" +
    "<h2>Intellectual Property</h2>\n" +
    "<p>By Submitting User Submissions on the Site or otherwise through the Service, you agree to the following terms:</p>\n" +
    "<ul>\n" +
    "<li>GiftStarter’s Service is patent pending, under both United States and International intellectual property laws and agreements. You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</li>\n" +
    "<li>You are publishing your User Submission, and you may be identified publicly by your name or User ID in association with your User Submission.</li>\n" +
    "<li>You grant to GiftStarter a non-exclusive license to access your User Submissions through the Service, and to use, edit, modify, reproduce, distribute, prepare derivative works of, display and perform such User Submissions solely for commercial use.</li>\n" +
    "<li>You further agree that your User Submissions will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material or you are otherwise legally entitled to post the material and to grant GiftStarter all of the license rights granted herein.</li>\n" +
    "<li>You will pay all royalties and other amounts owed to any person or entity based on your Submitting User Submissions to the Service or the Company’s publishing or hosting of the User Submissions as contemplated by these Terms of Use.</li>\n" +
    "<li>The use or other exploitation of User Submissions by the Company and Users as contemplated by this Agreement will not infringe or violate the rights of any third party, including without limitation any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.</li>\n" +
    "<li>The Company shall have the right to delete, edit, modify, reformat, excerpt, or translate any of your User Submissions.</li>\n" +
    "<li>All information publicly posted or privately transmitted through the Site is the sole responsibility of the person from which that content originated.</li>\n" +
    "<li>The Company will not be liable for any errors or omissions in any Content.</li>\n" +
    "<li>The Company cannot guarantee the identity of any other Users with whom you may interact while using the Service.</li>\n" +
    "<li>All Content you access through the Service is at your own risk and you will be solely responsible for any resulting damage or loss to any party.</li>\n" +
    "</ul>\n" +
    "<p>In accordance with the Digital Millennium Copyright Act, GiftStarter has adopted a policy of, in appropriate circumstances, terminating User accounts that are repeat infringers of the intellectual property rights of others. GiftStarter also may terminate User accounts even based on a single infringement.</p>\n" +
    "<h2>Copyright Notifications</h2>\n" +
    "<p>Any materials on the Site, including without limitation any documentation, content, text, data, graphics, images, interfaces or other material or works of authorship (the \"Materials\") are copyrighted material owned by or licensed to GiftStarter. All rights are reserved. The Materials contain trademarks, service marks and trade names which are owned by Honeyfund.com, Inc. and its affiliates, and may also contain brand and product names which are trademarks, service marks or trade names of third parties which are owned by their respective owners.</p>\n" +
    "<p>GiftStarter will remove infringing materials in accordance with the DMCA if properly notified that Content infringes copyright. If you believe that your work has been copied in a way that constitutes copyright infringement, please notify GiftStarter's Copyright Agent by emailing Arry at arry@giftstarter.com. Your email must contain the following information (please confirm these requirements with your legal counsel, or see the U.S. Copyright Act, 17 U.S.C. §512(c)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li>\n" +
    "<li>A description of the copyrighted work that you claim has been infringed;</li>\n" +
    "<li>A description of where the material that you claim is infringing is located on the Site, sufficient for GiftStarter to locate the material;</li>\n" +
    "<li>Your address, telephone number, and email address;</li>\n" +
    "<li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</li>\n" +
    "<li>A statement by you that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>\n" +
    "</ul>\n" +
    "<p>If you believe that your work has been removed or disabled by mistake or misidentification, please notify GiftStarter’s Copyright Agent in writing by emailing Arry at arry@giftstarter.com. Your counter-notice must contain the following information (please confirm these requirements with your legal counsel or see the U.S. Copyright Act, 17 U.S.C. §512(g)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>A physical or electronic signature of the user of the Services;</li>\n" +
    "<li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;</li>\n" +
    "<li>A statement made under penalty of perjury that the subscriber has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material; and</li>\n" +
    "<li>The subscriber's name, address, telephone number, and a statement that the subscriber consents to the jurisdiction of the Federal District Court for the judicial district in which the address is located, or if the subscriber's address is outside of the United States, for any judicial district in which the service provider may be found, and that the user will accept service of process from the person who provided notification under subscriber (c)(1)(C) or an agent of such person.</li>\n" +
    "</ul>\n" +
    "<p>Under the Copyright Act, any person who knowingly materially misrepresents that material is infringing or was removed or disabled by mistake or misidentification may be subject to liability.</p>\n" +
    "<p>If you fail to comply with these notice requirements, your notification or counter-notification may not be valid.</p>\n" +
    "<p>Our designated copyright agent for notice of alleged copyright infringement can be reached at:</p>\n" +
    "<p>Emotiv Labs, Inc. <br>\n" +
    "Attn: Copyright Agent <br>\n" +
    "PO Box 18284 <br>\n" +
    "Seattle, WA 98118 <br>\n" +
    "Email: arry@giftstarter.com</p>\n" +
    "<h2>Termination</h2>\n" +
    "<p>The Company may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. If you wish to terminate your account, you may do so by following the instructions on the Site. Any fees paid to the Company are non-refundable. All provisions of the Terms of Use that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>\n" +
    "<h2>Warranty Disclaimer</h2>\n" +
    "<p>The Company has no special relationship with or fiduciary duty to you. You acknowledge that the Company has no duty to take any action regarding any of the following: which Users gain access to the Site; what Content Users access through the Site; what effects the Content may have on Users; how Users may interpret or use the Content; or what actions Users may take as a result of having been exposed to the Content. The Company cannot guarantee the authenticity of any data or information that Users provide about themselves or their GiftStarts and projects. You release the Company from all liability for your having acquired or not acquired Content through the Site. The Site may contain, or direct you to websites containing, information that some people may find offensive or inappropriate. The Company makes no representations concerning any Content on the Site, and the Company is not liable for the accuracy, copyright compliance, legality, or decency of material contained on the Service.</p>\n" +
    "<p>The Company does not guarantee that any Content will be made available through the Service. The Company has no obligation to monitor the Service or Content. The Company reserves the right to, at any time, for any reason, and without notice: (i) cancel, reject, interrupt, remove, or suspend a GiftStart or project; (ii) remove, edit, or modify any Content, including, but not limited to, any User Submission; and (iii) remove or block any User or User Submission. GiftStarter reserves the right not to comment on the reasons for any of these actions.</p>\n" +
    "<p>The Service is provided “as is” and “as available” and is without warranty of any kind, express or implied, including, but not limited to, the implied warranties of title, non-infringement, merchantability, and fitness for a particular purpose, and any warranties implied by any course of performance or usage of trade, all of which are expressly disclaimed. The Company, and its directors, employees, agents, suppliers, partners, and content providers do not warrant that: (a) the Service will be secure or available at any particular time or location; (b) any defects or errors will be corrected; (c) any content or software available at or through the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements. Your use of the Service is solely at your own risk. Some states or countries do not allow limitations on how long an implied warranty lasts, so the above limitations may not apply to you.</p>\n" +
    "<p>The Company makes no guaranty of confidentiality or privacy of any communication or information transmitted on the Site or any website linked to the Site. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<p>Electronic Communications Privacy Act Notice (18 USC §2701-2711): THE COMPANY MAKES NO GUARANTY OF CONFIDENTIALITY OR PRIVACY OF ANY COMMUNICATION OR INFORMATION TRANSMITTED ON THE SITE OR ANY WEBSITE LINKED TO THE SITE. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<h2>Indemnification</h2>\n" +
    "<p>You shall defend, indemnify, and hold harmless the Company, its affiliates, and each of its and its affiliates’ employees, contractors, directors, suppliers, and representatives from all liabilities, claims, and expenses, including reasonable attorneys' fees and other legal costs, that arise from or relate to your use or misuse of, or access to, the Service and Content, or otherwise from your User Submissions, violation of the Terms of Use, or infringement by you, or any third party using your account, of any intellectual property or other right of any person or entity. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with the Company in asserting any available defenses.</p>\n" +
    "<h2>Limitation of Liability</h2>\n" +
    "<p>In no event shall the Company, nor its directors, employees, agents, partners, suppliers, or content providers, be liable under contract, tort, strict liability, negligence, or any other legal or equitable theory with respect to the service (i) for any lost profits, data loss, cost of procurement of substitute goods or services, or special, indirect, incidental, punitive, or consequential damages of any kind whatsoever, substitute goods or services (however arising), (ii) for any bugs, viruses, trojan horses, or the like (regardless of the source of origination), or (iii) for any direct damages in excess of (in the aggregate) one hundred U.S. dollars ($100.00). some states or countries do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations and exclusions may not apply to you.</p>\n" +
    "<h2>International</h2>\n" +
    "<p>Accessing the Service is prohibited from territories where the Content is illegal. If you access the Service from other locations, you do so at your own initiative and are responsible for compliance with local laws.</p>\n" +
    "<h2>Electronic Delivery, Notice Policy, and Your Consent</h2>\n" +
    "<p>By using the Services, you consent to receive from GiftStarter all communications including notices, agreements, legally required disclosures, or other information in connection with the Services (collectively, \"Contract Notices\") electronically. GiftStarter may provide the electronic Contract Notices by posting them on the Site. If you desire to withdraw your consent to receive Contract Notices electronically, you must discontinue your use of the Services.</p>\n" +
    "<h2>Governing Law</h2>\n" +
    "<p>These Terms of Service (and any further rules, policies, or guidelines incorporated by reference) shall be governed by and construed in accordance with the laws of the United States, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods. You agree that the Company and its Services are deemed a passive website that does not give rise to personal jurisdiction over GiftStarter or its parents, subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers or shareholders, either specific or general, in any jurisdiction other than the State of Washington. You agree that any action at law or in equity arising out of or relating to these terms, or your use or non-use of the Services, shall be filed only in the state or federal courts located in Washington County in the State of Washington and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action. You hereby irrevocably waive any right you may have to trial by jury in any dispute, action, or proceeding.</p>\n" +
    "<h2>Integration and Severability</h2>\n" +
    "<p>These Terms of Use and other referenced material are the entire agreement between you and the Company with respect to the Service, and supersede all prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and the Company with respect to the Service and govern the future relationship. If any provision of the Terms of Use is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Use will otherwise remain in full force and effect and enforceable. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder.</p>\n" +
    "<h2>Miscellaneous</h2>\n" +
    "<p>The Company shall not be liable for any failure to perform its obligations hereunder where the failure results from any cause beyond the Company’s reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation. The Terms of Use are personal to you, and are not assignable, transferable, or sublicensable by you except with the Company's prior written consent. The Company may assign, transfer, or delegate any of its rights and obligations hereunder without consent. No agency, partnership, joint venture, or employment relationship is created as a result of the Terms of Use and neither party has any authority of any kind to bind the other in any respect. In any action or proceeding to enforce rights under the Terms of Use, the prevailing party will be entitled to recover costs and attorneys' fees. All notices under the Terms of Use will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/what-is-it/what-is-it.html',
    "<section class=\"what-is-it wrapper\" ng-controller=\"whatIsItController\">\n" +
    "    <header>\n" +
    "        <h1> GiftStarter makes giving <span>awesome</span> gifts <span>fun</span> and <span>easy</span>.</h1>\n" +
    "    </header>\n" +
    "    <div class=\"copy\">\n" +
    "        <p>Giving an awesome gift is hard - what your friends really want is usually too expensive.  With GiftStarter, you can bring your friends and family together to get a bigger, better gift.</p>\n" +
    "        <p>All you have to do is create a campaign on GiftStarter and invite your friends!  It's easy for everyone to pitch in, and leave their own special message.  Once it's all bought, GiftStart ships the recipient a beautiful hand-crafted card with everyone's well-wishes, and ships them the gift too!</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"video\" ng-hide=\"hideVideo\">\n" +
    "        <div id=\"player\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"email\">\n" +
    "        <p>Give us your email, and we'll remind you for your next big event!</p>\n" +
    "        <input type=\"email\" placeholder=\"email@example.com\" ng-model=\"email\"/><button ng-click=\"remindMe();\">Remind Me!</button>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('/scripts/user/profile.html',
    "<div class=\"user-wrapper\" ng-controller=\"ProfileController\">\n" +
    "    <header>\n" +
    "        <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "            <img id=\"profile-image\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "            <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "            <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "            <button class=\"edit\" ng-show=\"editable && !editMode\" ng-click=\"editMode=true;\">EDIT</button>\n" +
    "            <button class=\"upload\" ng-click=\"submit()\" ng-show=\"editMode\" ng-class=\"{disabled: !imageSet}\">SAVE</button>\n" +
    "        </div>\n" +
    "        <h1>{{user.name}}</h1>\n" +
    "    </header>\n" +
    "    <section>\n" +
    "        <article class=\"giftstarts\">\n" +
    "            <div><img src=\"/assets/giftstartRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.giftstarts.length}}</div>\n" +
    "            <div class=\"giftstarts\">\n" +
    "                <div class=\"giftstart\" ng-repeat=\"gs in user.giftstarts\">\n" +
    "                    <a ng-href=\"/giftstart/{{gs.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{gs.title}}</p><p class=\"description\">{{gs.description}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "        <article class=\"pitchins\">\n" +
    "            <div><img src=\"/assets/pitchinRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.pitchins.length}}</div>\n" +
    "            <div class=\"pitchins\">\n" +
    "                <div class=\"pitchin\" ng-repeat=\"pi in user.pitchins\">\n" +
    "                    <a ng-href=\"/giftstart/{{pi.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{pi.gs_title}}</p><p class=\"description\">{{pi.note}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile.html',
    "<div class=\"userprofile\" ng-controller=\"UserprofileController\" >\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_info.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_fields.html'\"></ng-include>\n" +
    "    <h2 class=\"userprofile__header\">\n" +
    "        GiftStarter Campaigns\n" +
    "    </h2>\n" +
    "    <a name=\"mycampaigns\"></a><ng-include src=\"'/scripts/user/user_profile_campaign.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_giftidea.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_friendconnections.html'\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile_campaign.html',
    "<div class=\"userprofile__campaigns\">\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_pitchins.html'\"></ng-include>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_champion.html'\"></ng-include>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_champion.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Championed\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.giftstarts.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't been a Gift Champion yet. Start a gift today! <br />\n" +
    "            <a href=\"/giftideas\" class=\"usercampaign__link\">Browse Gift Ideas</a>\n" +
    "            <a href=\"/search\" class=\"usercampaign__link\">Search</a>\n" +
    "        </p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't started any gifts yet</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"giftstart in userCampaings.giftstarts | limitTo:campaingquantity track by $index\" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ giftstart.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ giftstart.product_img_url }}\" alt=\"Championed image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ giftstart.title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.giftstarts.length > 3\"  ng-click=\"campaingquantity=userCampaings.giftstarts.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_edit.ng.html',
    "<div class=\"userprofile__loading\" ng-show=\"loading\">\n" +
    "    <img class=\"userprofile__loadingimg\" src=\"/assets/loading.gif\" alt=\"preloader\" title=\"preloader\">\n" +
    "</div>\n" +
    "<a ng-show=\"canEdit\" class=\"editlink__edit button linky\" ng-click=\"editUserFields();\">\n" +
    "    Edit\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__save button linky\"  ng-click=\"saveInput()\">\n" +
    "    Save\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__cancel button linky\" ng-click=\"cancelEdit();\">\n" +
    "    Cancel\n" +
    "</a>\n"
  );


  $templateCache.put('/scripts/user/user_profile_fields.html',
    "\n" +
    "        <div class=\"userprofile__fields\" ng-hide=\"loading\">\n" +
    "            <p class=\"userprofile__text\" ng-show=\"editable\">\n" +
    "                <span class=\"userprofile__emnote\">The information below will not be visible to anyone but you.</span> Adding this information now ensures you'll always know what's happening with gifts you're a part of, and we will know where to ship gifts for you! (Unless specified otherwise)\n" +
    "            </p>\n" +
    "            <form class=\"userprofileform\" name=\"userProfileform\" ng-show=\"editable\">\n" +
    "                <div class=\"userprofileform__firstcol\">\n" +
    "                    <div class=\"userprofileform__email\">\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.required\">\n" +
    "                        Please fill in your email\n" +
    "                    </span>\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.email\">\n" +
    "                        Please fill in valid email\n" +
    "                    </span>\n" +
    "                    <p class=\"userprofileform__labelmail\">Email</p>\n" +
    "                    <input type=\"email\" class=\"userprofileform__usermail\" ng-disabled=\"fieldisable\" ng-model=\"user.email\"  placeholder=\"{{ user.email }} Your e-mail\" name=\"userEmail\" ng-required=\"!fieldisable\" />\n" +
    "                </div>\n" +
    "                    <div class=\"userprofileform__phone\">\n" +
    "                    <p class=\"userprofileform__labelphone\">Phone</p>\n" +
    "                    <input type=\"text\"  class=\"userprofileform__userphone\" ng-disabled=\"fieldisable\" ng-model=\"user.phone\" placeholder=\"{{user.phone}} Phone number\" name=\"phone\" required />\n" +
    "                </div>\n" +
    "                </div>\n" +
    "                <div class=\"userprofileform__secondcol\">\n" +
    "                    <div class=\"userprofileform__shipping\">\n" +
    "                        <div>\n" +
    "                            <div class=\"userprofileform__labelshipping\">\n" +
    "                                Shipping Address\n" +
    "                            </div>\n" +
    "                            <div class=\"userprofileform__usershippinginfo\" ng-show=\"fieldisable\">\n" +
    "                                <span class=\"userprofileform__useraddress\">{{ user.shipping_address }} </span><br/>\n" +
    "                                <span class=\"userprofileform__useraddressfull\"> {{ user.shipping_city }} {{ user.shipping_state }} {{ user.shipping_zip }}</span>\n" +
    "                            </div>\n" +
    "                            <input type=\"text\" ng-hide=\"fieldisable\" class=\"userprofileform__usershipping\" ng-disabled=\"fieldisable\" ng-model=\"user.shipping_address\" placeholder=\"{{ user.shipping_address }} Shipping address\" name=\"shippingaddress\" required  />\n" +
    "                        </div>\n" +
    "                        <div>\n" +
    "                            <input type=\"text\" class=\"userprofileform__usercity\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_city\" placeholder=\"{{ user.shipping_city }} Shipping city\"  name=\"shippingcity\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userstate\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_state\" placeholder=\"{{ user.shipping_state }} State\" name=\"shippingstate\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userzip\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_zip\" placeholder=\"{{ user.shipping_zip }} ZIP code\" name=\"shippingzip\" required  />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-show=\"editable\" class=\"editlink\">\n" +
    "                    <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" loading=\"loading\"></gs-user-edit>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>"
  );


  $templateCache.put('/scripts/user/user_profile_friendconnections.html',
    "<div class=\"friendconnections\">\n" +
    "    <div class=\"friendconnections__wrap\">\n" +
    "        <h2 class=\"friendconnections__title\">Friend Connections</h2>\n" +
    "        <p class=\"friendconnections__info\">\n" +
    "            Soon you'll be able to connect with your friends and family on GiftStarter. Make sure you never miss a birthday, anniversary, or important event, and finding people to pitch-in will be a breeze. Please check back soon!\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_giftidea.html',
    "<div class=\"useridea\">\n" +
    "    <div class=\"useridea__wrap\">\n" +
    "        <h2 class=\"useridea__title\">Saved Gift Ideas</h2>\n" +
    "        <div class=\"useridea__filter\" ng-hide=\"userIdea.length == 0\">\n" +
    "            <span class=\"useridea__filterby\">\n" +
    "                Filter by\n" +
    "            </span>\n" +
    "            <!-- span class=\"useridea__filtertags\">\n" +
    "                My tags\n" +
    "            </span -->\n" +
    "            <span class=\"useridea__filterdate\">\n" +
    "                Date added\n" +
    "            </span>\n" +
    "            <span class=\"useridea__filtertprice\" ng-click=\"userOrder = '-price' \">\n" +
    "                Product price\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <p class=\"useridea__innfonone\" ng-show=\"userIdea.length == 0\">\n" +
    "            Did you know you can save products you like to your Saved Gift Idea Board? Just click the \"Save It For Later\" button!\n" +
    "        </p>\n" +
    "        <div class=\"useridea__productlist\">\n" +
    "            <div ng-repeat-start=\"idea in userIdea | limitTo:quantity | orderBy:userOrder track by $index\" class=\"h--hide\"></div>\n" +
    "            <div class=\"useridea__productlistitem\">\n" +
    "                    <div class=\"useridea__productdesc\">\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div class=\"useridea__productimgwrap\">\n" +
    "                                <img class=\"useridea__productimg\" ng-src=\"{{ idea.img }}\" alt=\"Gift Idea Image\"/>\n" +
    "                                <a class=\"useridea__close linky\" ng-show=\"editable\" ng-click=\"DeleteSavedItem(idea)\" ng-disabled=\"idea.loading\">\n" +
    "                                    X <span class=\"useridea__deletetext\">remove</span> <img src=\"/assets/loading_transparent.gif\" class=\"loader\" ng-show=\"idea.loading\">\n" +
    "                                </a>\n" +
    "                            </div>\n" +
    "                        </a>\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div clamp=\"2\"  class=\"useridea__producttitle\">\n" +
    "                                {{ idea.title }}\n" +
    "                            </div>\n" +
    "                            <div class=\"useridea__productprice\">{{ idea.price / 100 | currency }}</div>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"useridea__findbtn\">\n" +
    "            <button href=\"search/\" ng-click=\"goToLink('giftideas')\" class=\"useridea__findlink primary-green\">Find more gift ideas</button>\n" +
    "        </div>\n" +
    "        <div ng-show=\"showMore\">\n" +
    "            <a class=\"useridea__viewmorelink linky\" ng-show=\" userIdea.length>10\"  ng-click=\"quantity=userIdea.length; showMore=false\">\n" +
    "                View more\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_info.html',
    "       <form class=\"userprofile__info\" name=\"userprofileInfo\">\n" +
    "            <div class=\"userprofile__image\" ng-class=\"{true: 'userprofile__image--edit'}[editMode]\">\n" +
    "                <button class=\"userprofile__imagecancel tooltip--right\" data-tooltip=\"Close\" ng-show=\"editMode && !blocked\" ng-click=\"editMode = false;\">x</button>\n" +
    "                <img class=\"userprofile__userimage\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode && !blocked\" />\n" +
    "                <gs-image-upload ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <img class=\"userprofile__preload\" src=\"/assets/loading_transparent.gif\" alt=\"image loading\" title=\"image loading\" ng-show=\"imgloading\">\n" +
    "                <button class=\"userprofile__imageedit\" ng-hide=\"editMode || blocked\"  ng-click=\"editMode=true;\">Change photo</button>\n" +
    "                <button class=\"userprofile__imagesave\" ng-click=\"submit(); editMode = false;\" ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\">Save</button>\n" +
    "                <button class=\"userprofile__imageupload\" ng-show=\"editMode && !blocked\"  ng-click=\"openImageDialogGlobal();\">Upload</button>\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__name\">\n" +
    "                <h2 ng-show=\"blocked\" class=\"userprofile__title\">\n" +
    "                    {{ user.name }}\n" +
    "                </h2>\n" +
    "                <input class=\"userprofile__title\" type=\"text\" ng-model=\"user.name\" ng-disabled=\"blocked\" ng-hide=\"blocked\" name=\"username\" ng-value=\"user.name\" placeholder=\"{{ user.name }}\" />\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__social\">\n" +
    "                <div class=\"social\" ng-show=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||editable\">\n" +
    "                    <p class=\"social__desc\">Social profiles</p>\n" +
    "                    <div class=\"social__nolinks\" ng-hide=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||!blocked\">\n" +
    "                        (none added)\n" +
    "                    </div>\n" +
    "                    <div class=\"social__inline\" >\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_facebook||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_facebook}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/facebookicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkfacebook\" class=\"social__inputs\" placeholder=\"{{user.link_facebook}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_facebook\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_twitter||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_twitter}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/twittericon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linktwitter\" class=\"social__inputs\" placeholder=\"{{user.link_twitter}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_twitter\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_linkedin||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_linkedin}}\"  class=\"social__link\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/linkedInicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linklinkedin\" class=\"social__inputs\" placeholder=\"{{user.link_linkedin}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_linkedin\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_googleplus||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_googleplus}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/googleicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkgoogleplus\" class=\"social__inputs\" placeholder=\"{{user.link_googleplus}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-hide=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_googleplus\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_website||!blocked\">\n" +
    "                            <a href=\"{{user.link_website}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/wwwicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkwebsite\" class=\"social__inputs\" placeholder=\"{{user.link_website}} Paste link to web page\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_website\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"calendar\" ng-show=\"(user.birth_month&&user.birth_day)||editable\">\n" +
    "                <p class=\"calendar__calendartext\">Birth Date</p>\n" +
    "                <div class=\"calendar__monthwrap\">\n" +
    "                    <select ng-disabled=\"blocked\" class=\"calendar__month\" ng-model=\"user.birth_month\" ng-options=\"month.value as month.label for month in months\"></select>\n" +
    "                </div>\n" +
    "                <input type=\"number\" name=\"date\" min=\"1\" max=\"31\" class=\"calendar__date\" ng-disabled=\"blocked\" ng-model=\"user.birth_day\"  />\n" +
    "            </div>\n" +
    "           <div class=\"userprofile__errors\">{{user.error_message}}</div>\n" +
    "            <div ng-show=\"editable\" class=\"editlink editlink--white\">\n" +
    "                <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" userinfo=\"true\" loading=\"loading\" ></gs-user-edit>\n" +
    "            </div>\n" +
    "       </form>"
  );


  $templateCache.put('/scripts/user/user_profile_pitchins.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Pitch Ins\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.pitchins.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't pitched-in on any gifts yet.</p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't pitched in on any gifts yet. Invite them to pitch-in on one of your campaigns!</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"pitchin in pitchins_unique | limitTo:campaingquantity track by $index \" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ pitchin.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ pitchin.gs_img }}\" alt=\"Pitch Ins image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ pitchin.gs_title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.pitchins.length > 3\"  ng-click=\"campaingquantity=userCampaings.pitchins.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/utilities/image-upload/image-upload.html',
    "<div class=\"image-upload wrapper\">\n" +
    "    <canvas></canvas>\n" +
    "    <div class=\"uploader\">\n" +
    "        <input class=\"thanks-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/>\n" +
    "        <button ng-click=\"openImageDialog()\" class=\"image\"></button>\n" +
    "        <button ng-click=\"rotateImage()\" class=\"rotate tooltip--left\" data-tooltip=\"Rotate uploaded image\"></button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/utilities/link_create.html',
    "<html>\n" +
    "<body>\n" +
    "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/ramda/0.8.0/ramda.js\"></script>\n" +
    "    <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
    "    <script src=\"//tinymce.cachefly.net/4.1/tinymce.min.js\"></script>\n" +
    "    <script>\n" +
    "\n" +
    "        function setJson(shortlink) {\n" +
    "            var ret = '\\n     {';\n" +
    "            ret += '\\n         \"productName\":\"'+htmlentities($('#title').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productNameShort\":\"'+htmlentities($('#titleshort').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productSlug\":\"'+htmlentities($('#slug').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productPrice\":\"'+htmlentities($('#price').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productDescription\":\"'+tinyMCE.activeEditor.getContent({format : 'html'}).replace(/\"/g, \"&quot;\").replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "//            ret += '\\n         \"productDescription\":\"'+htmlentities($('#description').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productMetaDescription\":\"'+htmlentities($('#metadescription').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productImage\":\"'+htmlentities($('#image').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productThumb\":\"'+htmlentities($('#imagethumb').val().trim())+'\",';\n" +
    "            ret += '\\n         \"imageAltText\":\"'+htmlentities($('#alttext').val().trim())+'\",';\n" +
    "            ret += '\\n         \"giftStartLink\":\"'+shortlink+'\"';\n" +
    "            ret += '\\n     },';\n" +
    "            $('#json').val(ret);\n" +
    "            $('#json').select();\n" +
    "        }\n" +
    "\n" +
    "        function formSubmit() {\n" +
    "            var url = makeUrl($('#url').val(), $('#title').val(),\n" +
    "                    $('#price').val(), $('#image').val(), $('#source').val());\n" +
    "            $('#result').val(url);\n" +
    "            $('#prodimglink').attr(\"href\",$('#image').val());\n" +
    "            $('#prodimg').attr(\"src\",$('#image').val());\n" +
    "            setBitlyUrl(url);\n" +
    "        }\n" +
    "\n" +
    "        function makeUrl(url, title, price, img, source) {\n" +
    "            if (source === '') {\n" +
    "                alert(\"oops!  need a referrer!  just put any tracking string, like 'mancrate_coffee'.\");\n" +
    "                return '';\n" +
    "            }\n" +
    "            return 'https://www.giftstarter.com/create?' + urlSerialize({\n" +
    "                        product_url: url,\n" +
    "                        title: title,\n" +
    "                        price: 100*price,\n" +
    "                        img_url: (img.toLowerCase().indexOf('http')==0?img:('/assets/giftideas/category'+img)),\n" +
    "                        source: source\n" +
    "                    });\n" +
    "        }\n" +
    "\n" +
    "        function urlSerialize(obj) {\n" +
    "            var str = [];\n" +
    "            for(var p in obj)\n" +
    "                if (obj.hasOwnProperty(p)) {\n" +
    "                    str.push(encodeURIComponent(p) + \"=\" +\n" +
    "                    encodeURIComponent(obj[p]));\n" +
    "                }\n" +
    "            return str.join(\"&\");\n" +
    "        }\n" +
    "\n" +
    "        function setBitlyUrl(long_url){\n" +
    "            $('#shortlink').val(\"\");\n" +
    "            $.getJSON(\n" +
    "                \"http://api.bitly.com/v3/shorten?callback=?\",\n" +
    "                {\n" +
    "                    \"format\": \"json\",\n" +
    "                    \"apiKey\": \"R_85bf9d10211f4423b5c3be4a336ad77d\",\n" +
    "                    \"login\": \"giftstarter\",\n" +
    "                    \"longUrl\": long_url\n" +
    "                },\n" +
    "                function(response)\n" +
    "                {\n" +
    "                    $('#shortlink').val(response.data.url);\n" +
    "                    setJson(response.data.url);\n" +
    "                }\n" +
    "            );\n" +
    "        }\n" +
    "\n" +
    "        function setShortTitle() {\n" +
    "            $('#titleshort').val($('#title').val().substring(0, 28));\n" +
    "            setProductSlug();\n" +
    "        }\n" +
    "        function setProductSlug() {\n" +
    "            $('#alttext').val($('#titleshort').val());\n" +
    "            $('#slug').val(JSON.stringify($('#titleshort').val()).trim().replace(/\\W/g,' ').trim().replace(/ +/g,'-'));\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "        function setImageVals() {\n" +
    "            $('#image').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'.jpg');\n" +
    "            $('#imagethumb').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'-thumb.jpg');\n" +
    "        }\n" +
    "        function checkSlug() {\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "\n" +
    "        function get_html_translation_table(table, quote_style) {\n" +
    "          //  discuss at: http://phpjs.org/functions/get_html_translation_table/\n" +
    "          // original by: Philip Peterson\n" +
    "          //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "          // bugfixed by: noname\n" +
    "          // bugfixed by: Alex\n" +
    "          // bugfixed by: Marco\n" +
    "          // bugfixed by: madipta\n" +
    "          // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "          // bugfixed by: T.Wild\n" +
    "          // improved by: KELAN\n" +
    "          // improved by: Brett Zamir (http://brett-zamir.me)\n" +
    "          //    input by: Frank Forte\n" +
    "          //    input by: Ratheous\n" +
    "          //        note: It has been decided that we're not going to add global\n" +
    "          //        note: dependencies to php.js, meaning the constants are not\n" +
    "          //        note: real constants, but strings instead. Integers are also supported if someone\n" +
    "          //        note: chooses to create the constants themselves.\n" +
    "          //   example 1: get_html_translation_table('HTML_SPECIALCHARS');\n" +
    "          //   returns 1: {'\"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}\n" +
    "\n" +
    "          var entities = {},\n" +
    "            hash_map = {},\n" +
    "            decimal;\n" +
    "          var constMappingTable = {},\n" +
    "            constMappingQuoteStyle = {};\n" +
    "          var useTable = {},\n" +
    "            useQuoteStyle = {};\n" +
    "\n" +
    "          // Translate arguments\n" +
    "          constMappingTable[0] = 'HTML_SPECIALCHARS';\n" +
    "          constMappingTable[1] = 'HTML_ENTITIES';\n" +
    "          constMappingQuoteStyle[0] = 'ENT_NOQUOTES';\n" +
    "          constMappingQuoteStyle[2] = 'ENT_COMPAT';\n" +
    "          constMappingQuoteStyle[3] = 'ENT_QUOTES';\n" +
    "\n" +
    "          useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';\n" +
    "          useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :\n" +
    "            'ENT_COMPAT';\n" +
    "\n" +
    "          if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {\n" +
    "            throw new Error('Table: ' + useTable + ' not supported');\n" +
    "            // return false;\n" +
    "          }\n" +
    "\n" +
    "          entities['38'] = '&amp;';\n" +
    "          if (useTable === 'HTML_ENTITIES') {\n" +
    "            entities['160'] = '&nbsp;';\n" +
    "            entities['161'] = '&iexcl;';\n" +
    "            entities['162'] = '&cent;';\n" +
    "            entities['163'] = '&pound;';\n" +
    "            entities['164'] = '&curren;';\n" +
    "            entities['165'] = '&yen;';\n" +
    "            entities['166'] = '&brvbar;';\n" +
    "            entities['167'] = '&sect;';\n" +
    "            entities['168'] = '&uml;';\n" +
    "            entities['169'] = '&copy;';\n" +
    "            entities['170'] = '&ordf;';\n" +
    "            entities['171'] = '&laquo;';\n" +
    "            entities['172'] = '&not;';\n" +
    "            entities['173'] = '&shy;';\n" +
    "            entities['174'] = '&reg;';\n" +
    "            entities['175'] = '&macr;';\n" +
    "            entities['176'] = '&deg;';\n" +
    "            entities['177'] = '&plusmn;';\n" +
    "            entities['178'] = '&sup2;';\n" +
    "            entities['179'] = '&sup3;';\n" +
    "            entities['180'] = '&acute;';\n" +
    "            entities['181'] = '&micro;';\n" +
    "            entities['182'] = '&para;';\n" +
    "            entities['183'] = '&middot;';\n" +
    "            entities['184'] = '&cedil;';\n" +
    "            entities['185'] = '&sup1;';\n" +
    "            entities['186'] = '&ordm;';\n" +
    "            entities['187'] = '&raquo;';\n" +
    "            entities['188'] = '&frac14;';\n" +
    "            entities['189'] = '&frac12;';\n" +
    "            entities['190'] = '&frac34;';\n" +
    "            entities['191'] = '&iquest;';\n" +
    "            entities['192'] = '&Agrave;';\n" +
    "            entities['193'] = '&Aacute;';\n" +
    "            entities['194'] = '&Acirc;';\n" +
    "            entities['195'] = '&Atilde;';\n" +
    "            entities['196'] = '&Auml;';\n" +
    "            entities['197'] = '&Aring;';\n" +
    "            entities['198'] = '&AElig;';\n" +
    "            entities['199'] = '&Ccedil;';\n" +
    "            entities['200'] = '&Egrave;';\n" +
    "            entities['201'] = '&Eacute;';\n" +
    "            entities['202'] = '&Ecirc;';\n" +
    "            entities['203'] = '&Euml;';\n" +
    "            entities['204'] = '&Igrave;';\n" +
    "            entities['205'] = '&Iacute;';\n" +
    "            entities['206'] = '&Icirc;';\n" +
    "            entities['207'] = '&Iuml;';\n" +
    "            entities['208'] = '&ETH;';\n" +
    "            entities['209'] = '&Ntilde;';\n" +
    "            entities['210'] = '&Ograve;';\n" +
    "            entities['211'] = '&Oacute;';\n" +
    "            entities['212'] = '&Ocirc;';\n" +
    "            entities['213'] = '&Otilde;';\n" +
    "            entities['214'] = '&Ouml;';\n" +
    "            entities['215'] = '&times;';\n" +
    "            entities['216'] = '&Oslash;';\n" +
    "            entities['217'] = '&Ugrave;';\n" +
    "            entities['218'] = '&Uacute;';\n" +
    "            entities['219'] = '&Ucirc;';\n" +
    "            entities['220'] = '&Uuml;';\n" +
    "            entities['221'] = '&Yacute;';\n" +
    "            entities['222'] = '&THORN;';\n" +
    "            entities['223'] = '&szlig;';\n" +
    "            entities['224'] = '&agrave;';\n" +
    "            entities['225'] = '&aacute;';\n" +
    "            entities['226'] = '&acirc;';\n" +
    "            entities['227'] = '&atilde;';\n" +
    "            entities['228'] = '&auml;';\n" +
    "            entities['229'] = '&aring;';\n" +
    "            entities['230'] = '&aelig;';\n" +
    "            entities['231'] = '&ccedil;';\n" +
    "            entities['232'] = '&egrave;';\n" +
    "            entities['233'] = '&eacute;';\n" +
    "            entities['234'] = '&ecirc;';\n" +
    "            entities['235'] = '&euml;';\n" +
    "            entities['236'] = '&igrave;';\n" +
    "            entities['237'] = '&iacute;';\n" +
    "            entities['238'] = '&icirc;';\n" +
    "            entities['239'] = '&iuml;';\n" +
    "            entities['240'] = '&eth;';\n" +
    "            entities['241'] = '&ntilde;';\n" +
    "            entities['242'] = '&ograve;';\n" +
    "            entities['243'] = '&oacute;';\n" +
    "            entities['244'] = '&ocirc;';\n" +
    "            entities['245'] = '&otilde;';\n" +
    "            entities['246'] = '&ouml;';\n" +
    "            entities['247'] = '&divide;';\n" +
    "            entities['248'] = '&oslash;';\n" +
    "            entities['249'] = '&ugrave;';\n" +
    "            entities['250'] = '&uacute;';\n" +
    "            entities['251'] = '&ucirc;';\n" +
    "            entities['252'] = '&uuml;';\n" +
    "            entities['253'] = '&yacute;';\n" +
    "            entities['254'] = '&thorn;';\n" +
    "            entities['255'] = '&yuml;';\n" +
    "          }\n" +
    "\n" +
    "          if (useQuoteStyle !== 'ENT_NOQUOTES') {\n" +
    "            entities['34'] = '&quot;';\n" +
    "          }\n" +
    "          if (useQuoteStyle === 'ENT_QUOTES') {\n" +
    "            entities['39'] = '&#39;';\n" +
    "          }\n" +
    "          entities['60'] = '&lt;';\n" +
    "          entities['62'] = '&gt;';\n" +
    "\n" +
    "          // ascii decimals to real symbols\n" +
    "          for (decimal in entities) {\n" +
    "            if (entities.hasOwnProperty(decimal)) {\n" +
    "              hash_map[String.fromCharCode(decimal)] = entities[decimal];\n" +
    "            }\n" +
    "          }\n" +
    "\n" +
    "          return hash_map;\n" +
    "        }\n" +
    "\n" +
    "        function htmlentities(string, quote_style, charset, double_encode) {\n" +
    "            //  discuss at: http://phpjs.org/functions/htmlentities/\n" +
    "            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            // improved by: nobbler\n" +
    "            // improved by: Jack\n" +
    "            // improved by: Rafał Kukawski (http://blog.kukawski.pl)\n" +
    "            // improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)\n" +
    "            // bugfixed by: Onno Marsman\n" +
    "            // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "            //    input by: Ratheous\n" +
    "            //  depends on: get_html_translation_table\n" +
    "            //   example 1: htmlentities('Kevin & van Zonneveld');\n" +
    "            //   returns 1: 'Kevin &amp; van Zonneveld'\n" +
    "            //   example 2: htmlentities(\"foo'bar\",\"ENT_QUOTES\");\n" +
    "            //   returns 2: 'foo&#039;bar'\n" +
    "\n" +
    "            var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),\n" +
    "            symbol = '';\n" +
    "            string = string == null ? '' : string + '';\n" +
    "\n" +
    "            if (!hash_map) {\n" +
    "                return false;\n" +
    "            }\n" +
    "\n" +
    "            if (quote_style && quote_style === 'ENT_QUOTES') {\n" +
    "            hash_map[\"'\"] = '&#039;';\n" +
    "            }\n" +
    "\n" +
    "            if ( !! double_encode || double_encode == null) {\n" +
    "                for (symbol in hash_map) {\n" +
    "                  if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                    string = string.split(symbol)\n" +
    "                      .join(hash_map[symbol]);\n" +
    "                  }\n" +
    "                }\n" +
    "            } else {\n" +
    "                string = string.replace(/([\\s\\S]*?)(&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|$)/g, function(ignore, text, entity) {\n" +
    "                  for (symbol in hash_map) {\n" +
    "                    if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                      text = text.split(symbol)\n" +
    "                        .join(hash_map[symbol]);\n" +
    "                    }\n" +
    "                  }\n" +
    "\n" +
    "                  return text + entity;\n" +
    "                });\n" +
    "            }\n" +
    "\n" +
    "          return string;\n" +
    "        }\n" +
    "\n" +
    "    </script>\n" +
    "    <div style=\" display:inline-block; float:left; min-width:750px; white-space: nowrap\">\n" +
    "        <label style=\"color:#999999\" for=\"catslug\">Category Slug*</label> <input type=\"text\" id=\"catslug\" required=\"\" value=\"\" placeholder=\"teacher\"/><br>\n" +
    "        <label for=\"url\">Product URL</label> <input type=\"text\" id=\"url\" required=\"\" size=\"80\"/><br>\n" +
    "        <label for=\"title\">Product Title</label> <input type=\"text\" id=\"title\" required=\"\" size=\"80\" onchange=\"setShortTitle()\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"titleshort\">Short Title*</label> <input type=\"text\" id=\"titleshort\" required=\"\" size=\"40\" maxlength=\"28\" onchange=\"setProductSlug()\"/> (max 28 chars)<br>\n" +
    "        <label style=\"color:#999999\" for=\"slug\">Product Slug*</label> <input type=\"text\" id=\"slug\" required=\"\" size=\"40\"/><br>\n" +
    "        <label for=\"image\">Product Image URL</label> <input type=\"text\" id=\"image\" required=\"\" size=\"40\" value=\"\" placeholder=\"/teacher/visa-gift-card.png\"/><br>\n" +
    "        <label for=\"imagethumb\" style=\"color:#999999\">Product Thumbnail URL</label> <input type=\"text\" id=\"imagethumb\" required=\"\" size=\"40\" value=\"\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"alttext\">Image ALT text*</label> <input type=\"text\" id=\"alttext\" required=\"\" size=\"40\" /><br>\n" +
    "        <label for=\"price\">Product Price</label> <input type=\"text\" id=\"price\" required=\"\" placeholder=\"e.g. 299.67 for $299.67\"/><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"description\">Description*</label> <textarea type=\"text\" id=\"description\" required=\"\" rows=\"5\" cols=\"60\"> </textarea><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"metadescription\">Meta Description*</label> <textarea type=\"text\" id=\"metadescription\" required=\"\" rows=\"3\" cols=\"60\"> </textarea><br>\n" +
    "        <label for=\"source\">Referrer (a tracking string)</label> <input type=\"text\" id=\"source\" required=\"\" /><br><br>\n" +
    "        <label style=\"color:#999999\">*only required for JSON</label> &nbsp; &nbsp; <button id=\"submit\" onclick=\"formSubmit()\">Create Link</button><br><br>\n" +
    "        <label for=\"result\">Result </label><input id=\"result\" size=\"40\"/> &nbsp;\n" +
    "        <label for=\"shortlink\">Short </label><input id=\"shortlink\"/><br>\n" +
    "        <textarea id=\"json\" rows=\"10\" cols=\"80\"></textarea>\n" +
    "    </div>\n" +
    "    <div><a id=\"prodimglink\" href=\"/assets/link_create_preview.png\" target=\"prodimg\"><img id=\"prodimg\" style=\"display:inline-block; float:left; width:480px; border: 0px;\" src=\"/assets/link_create_preview.png\"></a></div>\n" +
    "\n" +
    "    <script>\n" +
    "        tinymce.init({\n" +
    "            selector:'#description',\n" +
    "            plugins: [\"code\", \"paste\"],\n" +
    "            oninit : \"setPlainText\",\n" +
    "            width: 620,\n" +
    "            toolbar: \"bold italic underline styleselect fontsizeselect bullist numlist outdent indent removeformat subscript superscript code\"\n" +
    "        });\n" +
    "        $('#slug').on('change', checkSlug);\n" +
    "        $('#catslug').on('change', function () {\n" +
    "            this.value = this.value.toLowerCase();\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        });\n" +
    "    </script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('/scripts/utilities/toast.html',
    "<div class=\"toast-wrapper\" ng-class=\"{hide: hide, displayed: displayed}\">\n" +
    "    <p class=\"toast\"></p>\n" +
    "    <p class=\"close\" ng-click=\"hideToast()\">X</p>\n" +
    "</div>"
  );

}]);

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
'use strict';

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope', '$http', '$location', 'ProductService', 'UserService', GiftideasController]);

function GiftideasController($scope, $http, $location, ProductService, UserService) {
    $scope.productMessage = '';
    $scope.location = $location;
    $scope.path = $location.path();
    $scope.isSavingForLater = false;
    var pathParts = $scope.path.replace('//', '/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length > 2 ? pathParts[2] : false;
    var product = pathParts.length > 3 ? pathParts[3] : false;
	// lazy load images
     jQuery('.load').visibility({
        type: 'image',
        transition: 'vertical flip in',
        duration: 500
      });

    // hack for mailing list error where we linked to the wrong category
    if(category && !product && (category === 'lunarnewyear' || category === 'farewell' || category === 'pisces') && $location.search()['utm_campaign'] === '18f05bc479-Weekly_Email_Lunar_New_Year_Pisces_2_19_2015') {
        category = false;
    }

    $scope.saveGiftIdeaForLater = function(product) {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater('GiftIdeas',
            product.giftStartLink,
            parseInt(product.productPrice * 100),
            product.productName,
            product.productDescription,
            product.productImage.indexOf('http') === 0 ? product.productImage : ('/assets/giftideas/category' + product.productImage)
        );
        if(saver) {
            saver.success(function () {
                $scope.productMessage = 'The gift has been saved to your <a href=\'/users/\' + UserService.uid + \'\'>profile</a>.';
                $scope.isSavingForLater = false;
            })
            .error(function () {
                $scope.productMessage = 'An error occurred while saving the product: ' + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    function setMeta(metatitle, metadesc) {
        metatitle = 'GiftStarter: ' + metatitle;
        $('html head title').text(metatitle);
        $('html head meta[property=\'og:title\']').attr('content', metatitle);
        $('html head meta[name=description]').attr('content', metadesc);
        $('html head meta[property="og:description"]').attr('content', metadesc);
    }

    var prior,
        setMetaFlag;

    function productInit (productValue) {
        productValue.productNameStripped = String(productValue.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
        productValue.hasPrice = /^\d.*/.test(productValue.productPrice);
        productValue.productDescription = productValue.productDescription.replace(/<\/p>\s*(<br\s*\/>)*(<p>\s*&nbsp;\s*<\/p>)*(<br\s*\/>)*\s*<p>/g, '</p><p>');
        productValue.productDescription = productValue.productDescription.replace(/&quot;/g, '"');
        productValue.productDescription = productValue.productDescription.replace(/<a /g, '<a target="_new" ');
    }

    function fillProductData (productValue, productKey) {

        productInit(productValue);

        if(prior != null) {
            $scope.groups.push([prior, productValue]);
            prior = null;
        } else {
            prior = productValue;
        }

        if(product && productValue.productSlug === product) {
            $scope.product = productValue;
            var metatitle = productValue.productName.replace(/&[a-zA-Z0-9]{1,5};/g, '');
            var metadesc = productValue.productMetaDescription && productValue.productMetaDescription.trim() !== '' ? productValue.productMetaDescription : productValue.productDescription;
            setMeta(metatitle, metadesc);
            setMetaFlag = true;
        }
        $scope.lastProduct = productValue;
    }

    function shuffle(groupsArr) {
        var currentIndex = groupsArr.length, temporaryValue, randomIndex ;

        while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = groupsArr[currentIndex];
        groupsArr[currentIndex] = groupsArr[randomIndex];
        groupsArr[randomIndex] = temporaryValue;
      }

      return groupsArr;
    }

    if(category) {
        $http.get('/assets/giftideas/' + category + '.json').then( function (response) {
            $scope.groups = [];
            $scope.category = response.data;
            $scope.categoryPath = $scope.basePath + '/' + category;
            prior = null;
            setMetaFlag = false;
            angular.forEach(response.data.productList, fillProductData);
            shuffle($scope.groups)
            if(!setMetaFlag) {
                var metatitle = response.data.categoryName;
                var metadesc = response.data.categoryMetaDescription && response.data.categoryMetaDescription.trim() !== '' ? response.data.categoryMetaDescription : response.data.categoryBlurb;
                setMeta(metatitle, metadesc);
            }
            if(prior != null) {
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
            "http://www.forbes.com/sites/learnvest/2015/09/22/new-parents-reveal-their-smartest-baby-money-moves/",
            "forbes.png",
            "When baby makes three, all kinds of seeming “must-haves” can take a toll on your bottom line—from hand-knit nursery blankets to souped-up strollers. According to the U.S. Department of Agriculture, the average middle-income family shells out about $13,000 in just the first year of a baby’s life. So how can moms and dads navigate the budget-busting new-baby minefield?"
        ),
        new pressItem(
            "http://www.huffingtonpost.com/learnvest/new-parents-dish-on-the-b_b_8186200.html",
            "huffingtonpost.jpg",
            "New parents dish on 'The Best Baby Money Decision I Ever Made' including from GiftStarter cofounder, Christie Gettler Tarazon."
        ),
        new pressItem(
            "http://www.investorideas.com/news/2015/technology/09221.asp",
            "investorideas.png",
            "GiftStarter has built a quick, easy-to-use campaign launch and payment parsing process, allowing users to select gifts... , invite friends and family, regardless of their location and be left assured that GiftStarter's coordination expertise and commitment to service will take care of the money collection, gift ordering, shipping and participant group card creation – resulting in a gifting experience that us seamless from start to finish! <br />  <a href='http://www.investorideas.com/news/2015/technology/09221.asp'>LINK</a>"
        ),
        new pressItem(
            "http://blog.timetrade.com/2015/08/21/wbey-episode-3-amazon-prime-day-giftstarter-top-retail-trends-of-2015/",
            "timetrade.png",
            "GiftStarter.com is a new service promising to help people never give a bad gift again. Instead of finding a cheap gift, or hunting people down who have agreed to go in on group gift, GiftStarter is an online service that allows people to choose a product and pay for it in increments. <a href='https://youtu.be/s_XH5fPG9_g'>Video Link</a>"
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
		function isSlim() {
        	return($location.path() === '/join') || ($location.path() === '/test') ? true : false;
    	}
		this.makeSlim = isSlim();
		this.slimHeader = isSlim();
		$scope.slimHeader = isSlim();

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
        $scope.isProvidence = self.thisRoute == '/yourvillage';
		$scope.slimHeader = isSlim();
        
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
		function isSlim() {
        	return($location.path() === '/join') || ($location.path() === '/test') ? true : false;
    	}
		this.makeSlim = isSlim();
		$rootScope.slimHeader = isSlim();
		$rootScope.greybg = false;
      //when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        $location.hash($routeParams.scrollTo);
        $anchorScroll();
		this.makeSlim = isSlim();
		$rootScope.slimHeader = isSlim();
		$rootScope.greybg = false;
      });
    })

}(angular.module('GiftStarterApp')));

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
(function (app) {
    var SearchController = function ($scope, $location) {
        var self = this;        
        this.thisRoute = $location.path().toString();
        $scope.isProvidence = self.thisRoute == '/yourvillage';
    };
    app.controller('SearchController', [
        '$scope',
        '$location',
        SearchController
        ]);
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

/* 
 * Angulartics Module 
 * Load core, Segment, Inspectlet, and GTM submodules. 
 * Remove submodules as necessary.
 *
*/
var gsAngulartics = angular.module('gsAngulartics', [
	'angulartics',
	'angulartics.segment',
	'angulartics.google.analytics',
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
        Analytics.userid(uid);
        Analytics.identify(uid, {name: name});
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

        $scope.greybg = true;
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

        /* semantic ui triggers */
		if(UserService.loggedIn) {
            jQuery('.userlogin').css({display:"none"});
        }
		jQuery('.button.social').click(function(){
  			jQuery('.ui.social.modal').modal('show');
	  	});
		jQuery('.create_action.ui.form').form({
		    fields: {
		        email: {
		            identifier: 'email',
		            rules: [{
		                type: 'email',
		                prompt: 'Please enter a valid e-mail'
		            }]
		        },
		        name: 'empty',
		        surname: 'empty',
		        password: ['minLength[6]', 'empty']
		    }
		});
		jQuery('.userlogin__form')
  			// if a direction if specified it will be obeyed
  		.transition('fade up in')
		;

		$scope.emailValidation = function(context){
			return context.firstName === $scope.email;
		}
		$scope.nameValidation = function(context){
			return context.firstName === $scope.name;
			return context.lastName === $scope.surname;
		}
		$scope.passwordValidation = function(context){
			return context.password === $scope.password;
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
		Analytics.eventTrack('New GiftStart', { 
			gsid: self.giftStart.gsid, 
			champion: UserService.uid, 
			name: this.title, 
			price: this.totalPrice,
			category: 'Campaign'
		});
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

		jQuery('.price.tooltip')
  			.popup()
		;
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
            $('#giftstart-create-next').blur();
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
        var overlayElement = angular.element('gs-overlay div.tile-overlay');

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
		Analytics.eventTrack('Completed Order', { 
			id: GiftStartService.giftStart.gsid, 
			uid: UserService.uid, 
			name: $scope.firstname + '' + $scope.lastname, 
			price: GiftStartService.giftStart.totalSelection,
			category: 'Campaign'
		});
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

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function (app) {

	var ViewController = function ($scope, $location, $rootScope, $interval, $timeout, $window, $http, $anchorScroll) {

		function isFull() {
			return($location.path() === '/join') || ($location.path() === '/test') ? true : false;
		}
	
		$scope.fullContainer = isFull();

	};

    app.controller('ViewController', [
        '$scope',
        '$location',
        'Analytics',
        '$rootScope',
        '$interval',
        '$timeout',
        '$window',
        '$http',
        '$anchorScroll',
        ViewController])
    .run(function($rootScope, $location, $anchorScroll, $routeParams) {
      function isFull() {
			return($location.path() === '/join') || ($location.path() === '/test') ? true : false;
		}
		//when the route is changed scroll to the proper element.
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        //$location.hash($routeParams.scrollTo);
        //$anchorScroll();
		$rootScope.fullContainer = isFull();
		jQuery('#angular-view').transition('fade in');
      });
    })

}(angular.module('GiftStarterApp')));
