/**
 * Created by Stuart on 10/14/14.
 */


// makeGiftStarterButton
// Fills in GiftStarter button on product pages.
// Button tag and script source should be:
// <script>
//     window.giftStartButton = {
//         productUrl: 'http://example.com/product/12345',
//         title: 'Example title',
//         price: 85.00,
//         imgUrl: 'http://example.com/images/12345.jpg'
//     };
// </script>
// <script src="https://www.giftstarter.co/scripts/button/general.js"></script>
// <gs-button id="gsbutton" class="gsbutton" style="display: none;"></gs-button>
// Recommended styling:
// <style>gs-button{height: 40px;border: 2px solid #df484b; border-radius: 4px;}</style>
(window.makeGiftStartButton = function(productUrl, title, price, imgUrl, buttonNum) {
    if (!Boolean(buttonNum)) {buttonNum = ''}

    window.giftStartButton = window.giftStartButton || {};
    var self = window.giftStartButton;
    var gs_domain = 'https://www.giftstarter.co';
    var source = location.host;
    var gsButtonId = 'gsbutton' + buttonNum;
    self.button = document.querySelector('#gsbutton');

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

    self.initializeButton = function() {
        // Create elements...
        self.button = document.querySelector('#gsbutton');
        self.buttonLink = document.createElement('a');
        self.buttonLink.setAttribute('target', '_blank');
        self.buttonLink.setAttribute('style', 'height: 100%;');
        self.buttonImg = document.createElement('img');

        // Apply styles...
        var buttonClass= self.button.getAttribute('class');
        if (buttonClass) {
            if (buttonClass.indexOf('bg') > 0) {
                self.buttonImg.setAttribute('src',
                        gs_domain + '/assets/gs_button_bg.png');
            } else {
                self.buttonImg.setAttribute('src',
                        gs_domain + '/assets/gs_button_nobg.png');
            }
        } else {
            self.buttonImg.setAttribute('src',
                    gs_domain + '/assets/gs_button_nobg.png');
        }
        self.buttonImg.setAttribute('style',
            'max-height: 100%;');
        self.button.setAttribute('title',
            'Gift this together with friends and family!');


        // Put onto the dom...
        self.buttonLink.appendChild(self.buttonImg);
        self.button.appendChild(self.buttonLink);
    };

    var url = gs_domain + '/create?' + urlSerialize({
        product_url: self.productUrl,
        title: self.title,
        price: self.price * 100,
        img_url: self.imgUrl,
        source: source
    });

    setTimeout(function() {
        self.initializeButton();
        self.buttonLink.setAttribute('href', url);
        if (self.price > 40) {
            self.button.setAttribute('style',
                ' display: inline-block; text-align: center;');
        }

        sendData(makeData('create'));
    }, 1);

    function sendData(data) {
        var encodedData = encodeURIComponent(window.btoa(JSON.stringify(data)));
        var elm = document.createElement('script');
        elm.src = 'https://www.dev.giftstarter.co/a/' + encodedData;
        document.head.appendChild(elm);
        document.head.removeChild(elm);
    }

    function onScroll(event) {

    }

    function makeUUID() {
        if (!Boolean(window.GsButtonUUID)) {
            window.GsButtonUUID = ''; // TODO make uuid
        }
        return window.GsButtonUUID;
    }

    function getCookie() {
        // TODO get or make cookie
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
            scrollDepth: document.documentElement.scrollTop,
            screenW: window.screen.width,
            screenH: window.screen.height,
            cookie: getCookie(),
            action: action,
            buttonX: buttonX,
            buttonY: buttonY,
            buttonW: buttonW,
            buttonH: buttonH,
            buttonBorder: document.defaultView.getComputedStyle(
                document.getElementById(gsButtonId),null)
                .getPropertyValue('border'),
            buttonBackground: document.defaultView.getComputedStyle(
                document.getElementById(gsButtonId),null)
                .getPropertyValue('background'),
            buttonImg: self.buttonImg.src
        }
    }
    return self;
})();
