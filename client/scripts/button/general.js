/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */


// makeGiftStarterButton
// Fills in GiftStarter button on product pages.
// Button tag and script source should be:
// <script>
//     window.giftStartButton = {
//         productUrl: 'http://example.com/product/12345',
//         title: 'Example title',
//         price: 85.00,
//         imgUrl: 'http://example.com/images/12345.jpg',
//         publicKey: 'XXXX-XXXX-XXXX-XXXX-XXXX'
//     };
// </script>
// <script src="https://www.giftstarter.com/scripts/button/general.js"></script>
// <gs-button id="gsbutton" class="gsbutton" style="display: none;"></gs-button>
// Recommended styling:
// <style>gs-button{height: 40px;border: 2px solid #df484b; border-radius: 4px;}</style>
window.makeGiftStartButton = function(productUrl, title, price, imgUrl,
                                      publicKey, buttonId) {
    // Ensure inputs are valid before continuing
    function inputValid(prev, input) {return input != null && input != undefined && prev;}
    var inputsValid = [productUrl, title, price, imgUrl].reduce(inputValid, true);
    if (!inputsValid) {return}

    if (publicKey == undefined || publicKey == null) {
        publicKey = '';
    }
    if (buttonId == undefined || buttonId == null) {
        buttonId = '';
    }
    var gs_domain = 'https://www.giftstarter.com';
    var source = location.host;
    var gsButtonId = 'gsbutton' + buttonId;
    var button = document.querySelector('#gsbutton' + buttonId);
    var buttonLink, buttonImg, intervalId;

    // Tracking data
    var buttonSeenSent = false;
    var buttonX, buttonY, buttonW, buttonH, buttonStyle;

    var urlSerialize = function(obj) {
        var str = [];
        for(var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" +
                    encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };

    function initializeButton() {
        // Create elements...
        button = document.querySelector('#gsbutton' + buttonId);
        buttonDiv = document.createElement('div');
        buttonLink = document.createElement('a');
        buttonLink.setAttribute('target', '_blank');
        buttonLink.setAttribute('style', 'display: block; height: 100%;');
        buttonImg = document.createElement('img');
        buttonText = document.createElement('p');

        // Apply styles...
        if (!button) {return;}
        // var buttonClass = button.getAttribute('class');
        // if (buttonClass) {
        //     if (buttonClass.indexOf('bg') > 0) {
        //         buttonImg.setAttribute('src',
        //                 gs_domain + '/assets/gs_button_bg.png');
        //     } else {
        //         buttonImg.setAttribute('src',
        //                 gs_domain + '/assets/gs_button_nobg.png');
        //     }
        // } else {
        //     buttonImg.setAttribute('src',
        //             gs_domain + '/assets/gs_button_nobg.png');
        // }
        buttonImg.setAttribute('src', 'https://www.giftstarter.com/assets/PartnerButtonIcon.png');
        buttonImg.setAttribute('style', 
            'display: inline-block; margin-right: 5px; width: 26px; vertical-align: middle');
        buttonText.innerHTML = 'GiftStart It!';
        buttonText.setAttribute('style', 
            'display: inline-block; font-size: 14px; font-family: Gotham, sans-serif; margin: 14px 0; padding: 0');
        buttonLink.setAttribute('style', 
            'text-decoration: none; color: white');
        buttonDiv.setAttribute('style', 
            'min-height: 26px; min-width: 32px; background-color: #e44028; padding: 0 10px;');
        button.setAttribute('title',
            'Gift this together with friends and family!');
        button.setAttribute('style', 'max-height: 100%;');


        // Put onto the dom...
        buttonDiv.appendChild(buttonImg);
        buttonDiv.appendChild(buttonText);
        buttonLink.appendChild(buttonDiv);
        button.appendChild(buttonLink);
    }

    var url = gs_domain + '/create?' + urlSerialize({
        product_url: productUrl,
        title: title,
        price: price * 100,
        img_url: imgUrl,
        public_key: publicKey,
        source: source
    });

    setTimeout(function() {
        initializeButton();
        buttonLink.setAttribute('href', url);
        if (price > 75) {
            button.setAttribute('style',
                ' display: inline-block; text-align: center;');

            button.onclick = sendClick;
            sendData(makeData('create'));
            intervalId = setInterval(heartBeat, 300);
        }
    }, 1);

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

    function isButtonVisible() {
        // Button is visible if buttonY + button height < scrollY + screen
        // height and same with X
        var visible = true;
        var bounds = button.getBoundingClientRect();
        visible &= bounds.bottom < window.innerHeight;
        visible &= bounds.right < window.innerWidth;
        return visible;
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
            document.getElementById(gsButtonId),null)
            .getPropertyValue('border');
    }

    function getBackground() {
        return document.defaultView.getComputedStyle(
            document.getElementById(gsButtonId),null)
            .getPropertyValue('background');
    }

    function makeData(action) {
        return {
            domain: window.location.host,
            path: window.location.pathname,
            uuid: makeUUID(),
            productUrl: productUrl,
            productTitle: title,
            productPrice: price,
            productImgUrl: imgUrl,
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

    return this;
};

if (window.giftStartButton) {
    window.makeGiftStartButton(
        window.giftStartButton.productUrl,
        window.giftStartButton.title,
        window.giftStartButton.price,
        window.giftStartButton.imgUrl,
        window.giftStartButton.publicKey
    )
}