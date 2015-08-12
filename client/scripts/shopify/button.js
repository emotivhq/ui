/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function GiftStarterButton() {
    // For use with the Shopify GiftStarter Button on product pages
    // Button tag and script source should be:
    // <script src="https://www.giftstarter.com/scripts/shopify/button.js"></script>
    // <gs-button id="gsbutton" class="gsbutton"></gs-button>

    window.GiftStartButton = this;
    this.productObject = null;
    this.product = null;
    var self = this;

    // Tracking data
    var buttonSeenSent = false;
    var buttonX, buttonY, buttonW, buttonH;
    var intervalId;

    this.getThisProduct = function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            self.productObject = JSON.parse(this.responseText).product;
            self.getSelectedVariant();
            self.updateButtonLink();
        };
        var url = document.location.href.split('#')[0].split('?')[0] + '.json';
        xhr.open('get', url, true);
        console && console.log && console.log(document.location.href.split('?')[0] + '.json');
        xhr.send();
    };

    this.getSelectedVariant = function() {
        self.product = self.productObject.variants[0];

        var variant = parseInt(self.getParameterByName('variant'));
        self.product.imgUrl = self.productObject.image.src;
        if (variant) {
            for (var i = 0; i < self.productObject.variants.length; i++) {
                if (self.productObject.variants[i].id == variant) {
                    self.product = self.productObject.variants[i];
                    break;
                }
            }
            self.product.imgUrl = self.productObject.image.src;
            for (i = 0; i < self.productObject.images.length; i++) {
                if (self.productObject.images[i].variant_ids.indexOf(variant) > -1) {
                    self.product.imgUrl = self.productObject.images[i].src;
                    break;
                }
            }
        }
    };

    this.updateButtonLink = function() {
        var publicKey = '';
        if (window.giftStartButton) {publicKey = window.giftStartButton.publicKey;}
        var urlParams = {
            product_url: document.location.href,
            title: self.productObject.title,
            price: self.product.price * 100,
            img_url: self.product.imgUrl,
            public_key: publicKey,
            source: 'shopify/' + window.Shopify.shop
        };
        var url = 'https://www.giftstarter.com/create?' + self.urlSerialize(urlParams);
        self.buttonLink.setAttribute('href', url);
        if (self.product.price > 99) {
            self.button.setAttribute('style', ' display: inline-block; text-align: center;');
        }
    };

    this.moveAfterPurchaseButton = function() {
        var target = document.getElementById('add-to-cart');
        if(target) {
            target.parentElement.appendChild(self.button);
            self.buttonImg.setAttribute('style', 'max-height: 92%; padding: 0; margin: 0 8px; border: 1px solid darkgrey;');
        }
    };

    this.urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    this.getParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };


    this.initializeButton = function() {
        // Create elements...
        self.button = document.querySelector('#gsbutton');
        self.buttonDiv = document.createElement('div');
        self.buttonLink = document.createElement('a');
        self.buttonLink.setAttribute('target', '_blank');
        self.buttonLink.setAttribute('style', 'display: block; height: 100%;');
        self.buttonImg = document.createElement('img');
        self.buttonText = document.createElement('p');

        // Apply styles...
        // var buttonClass= self.button.getAttribute('class');
        // if (buttonClass) {
        //     if (/black/.test(buttonClass)) {
        //         self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/logo-button-black.png');
        //     } else if (/white/.test(buttonClass)) {
        //         self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/logo-button-white.png');
        //     } else if (/nobg/.test(buttonClass)) {
        //         self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/gs_button_nobg.png');
        //     } else if (/bg/.test(buttonClass)) {
        //         self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/gs_button_bg.png');
        //     } else {
        //         self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/gs_button_nobg.png');
        //     }
        // } else {
        //     self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/gs_button_nobg.png');
        // }
        self.buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/PartnerButtonIcon.png');
        self.buttonImg.setAttribute('style', 
            'display: inline-block; margin-right: 5px; width: 26px; vertical-align: middle');
        self.buttonText.innerHTML = 'GiftStart It!';
        self.buttonText.setAttribute('style', 
            'display: inline-block; font-size: 14px; font-family: Gotham, sans-serif');
        self.buttonLink.setAttribute('style', 
            'text-decoration: none; color: white');
        self.buttonDiv.setAttribute('style', 
            'min-height: 26px; min-width: 32px; background-color: #e44028; padding: 0 10px;');
        self.button.setAttribute('title',
            'Gift this together with friends and family!');
        self.button.setAttribute('style', 'max-height: 100%;');


        // Put onto the dom...
        self.buttonDiv.appendChild(self.buttonImg);
        self.buttonDiv.appendChild(self.buttonText);
        self.buttonLink.appendChild(self.buttonDiv);
        self.button.appendChild(self.buttonLink);
        self.moveAfterPurchaseButton();
    };

    setTimeout(this.initializeButton, 100);
    self.getThisProduct();

    // Watch for URL changes that signify variant selection
    self.prevUrl = '';
    setInterval(function() {
        var thisUrl = document.location.href;
        if (self.prevUrl != thisUrl) {
            self.getThisProduct();
        }
        self.prevUrl = thisUrl;
    }, 250);

    //tracking

    function isButtonVisible() {
        // Button is visible if buttonY + button height < scrollY + screen
        // height and same with X
        var visible = true;
        var bounds = button.getBoundingClientRect();
        visible &= bounds.bottom < window.innerHeight;
        visible &= bounds.right < window.innerWidth;
        return visible;
    }

    function makeData(action) {
        var publicKey = '';
        if (window.giftStartButton) {publicKey = window.giftStartButton.publicKey;}
        return {
            domain: window.location.host,
            path: window.location.pathname,
            uuid: makeUUID(),
            productUrl: document.location.href,
            productTitle: self.productObject.title,
            productPrice: self.product.price,
            productImgUrl: self.product.imgUrl,
            publicKey: publicKey,
            scrollDepth: window.scrollY,
            screenW: window.screen.width,
            screenH: window.screen.height,
            cookie: getCookie(),
            action: action,
            buttonX: buttonX,
            buttonY: buttonY,
            buttonW: buttonW,
            buttonH: buttonH,
            buttonBorder: getBorder(),
            buttonBackground: getBackground(),
            buttonImg: buttonImg.src
        }
    }

    function sendSee() {sendData(makeData('seen'))}
    function sendClick() {sendData(makeData('click'))}

    function makeUUID() {
        if (!Boolean(window.GsButtonUUID)) {
            window.GsButtonUUID = uuid()
        }
        return window.GsButtonUUID;
    }

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    var docCookies = {
        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    function getCookie() {
        var cookieVal = docCookies.getItem('gsButtonTrack');
        if (!Boolean(cookieVal)) {
            cookieVal = uuid();
            docCookies.setItem('gsButtonTrack', cookieVal, Infinity, '/');
        }
        return cookieVal;
    }

    function getBorder() {
        return document.defaultView.getComputedStyle(
            document.querySelector('#gsbutton'),null)
            .getPropertyValue('border');
    }

    function getBackground() {
        return document.defaultView.getComputedStyle(
            document.querySelector('#gsbutton'),null)
            .getPropertyValue('background');
    }

    function sendData(data) {
        var encodedData = window.btoa(JSON.stringify(data))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '.');
        var elm = document.createElement('script');
        elm.src = 'https://www.giftstarter.com/a/' + encodedData;
        elm.onload = function() {document.head.removeChild(elm)};
        document.head.appendChild(elm);
    }

    var lastScroll = window.scrollY;
    function heartBeat() {
        if (!buttonSeenSent) {
            if (isButtonVisible()) {
                if (lastScroll == window.scrollY) {
                    buttonSeenSent = true;
                    sendSee();
                    clearInterval(intervalId);
                }
            }
        }
        lastScroll = window.scrollY;
    }

    setTimeout(function() {
        if (self.product.price > 99) {
            button.onclick = sendClick;
            sendData(makeData('create'));
            intervalId = setInterval(heartBeat, 300);
        }
    }, 200);

})();