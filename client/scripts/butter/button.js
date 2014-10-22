/**
 * Created by Stuart on 9/24/14.
 */


// makeGiftStarterButton
// Fills in GiftStarter button on product pages.
// Button tag and script source should be:
// <script src="https://www.giftstarter.co/scripts/butter/button.js"></script>
// <script>
//     window.giftStartButton = {
//         productUrl: 'http://example.com/product/12345',
//         title: 'Example title',
//         price: 85.00,
//         imgUrl: 'http://example.com/images/12345.jpg'
//     };
// </script>
// <gs-button id="gsbutton" class="gsbutton" style="display: none;"></gs-button>
// Recommended styling:
// <style>gs-button{height: 40px;border: 2px solid #df484b; border-radius: 4px;}</style>
(window.makeGiftStartButton = function(productUrl, title, price, imgUrl,
                                       buttonId) {
    if (!Boolean(window.giftStartButton)) {
        console.log("Ruh roh!  Doesn't look like window.giftStartButton exists!");
        return;
    } else if (!Boolean(window.giftStartButton.productUrl)) {
        console.log("Ruh roh!  Doesn't look like window.giftStartButton.productUrl exists!");
        return;
    } else if (!Boolean(window.giftStartButton.title)) {
        console.log("Ruh roh!  Doesn't look like window.giftStartButton.title exists!");
        return;
    } else if (!Boolean(window.giftStartButton.price)) {
        console.log("Ruh roh!  Doesn't look like window.giftStartButton.price exists!");
        return;
    } else if (!Boolean(window.giftStartButton.imgUrl)) {
        console.log("Ruh roh!  Doesn't look like window.giftStartButton.imgUrl exists!");
        return;
    }

    var self = window.giftStartButton;
    var gs_domain = 'https://www.dev.giftstarter.co';
    var source = 'butterLONDON';
    self.button = document.querySelector('#gsbutton');

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
        self.buttonLink.setAttribute('style', 'display: block; height: 100%;');
        self.buttonImg = document.createElement('img');

        // Apply styles...
        var buttonClass= self.button.getAttribute('class');
        if (buttonClass) {
            if (buttonClass.indexOf('bg') > 0) {
                self.buttonImg.setAttribute('src',
                    gs_domain + '/assets/gs_button_bg.png');
            } else {
                self.buttonImg.setAttribute('src',
                        gs_domain + '/assets/new_button.png');
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
        if (self.price > 39.98) {
            self.button.setAttribute('style',
                ' display: inline-block; text-align: center;');
        }
    }, 1);

    return self;
})();
