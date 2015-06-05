/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

(function GiftStarterButton() {
    // For use with the Shopify GiftStarter Button on product pages
    // Button tag and script source should be:
    // <script src="https://www.giftstarter.co/scripts/shopify/button.js"></script>
    // <gs-button id="gsbutton" class="gsbutton"></gs-button>

    window.GiftStartButton = this;
    this.productObject = null;
    this.product = null;
    var self = this;

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
        var url = 'https://www.giftstarter.co/create?' + self.urlSerialize(urlParams);
        self.buttonLink.setAttribute('href', url);
        if (self.product.price > 50) {
            self.button.setAttribute('style', ' display: inline-block; text-align: center;');
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
        self.buttonLink = document.createElement('a');
        self.buttonLink.setAttribute('target', '_blank');
        self.buttonLink.setAttribute('style', 'display: block; height: 100%;');
        self.buttonImg = document.createElement('img');

        // Apply styles...
        var buttonClass= self.button.getAttribute('class');
        if (buttonClass) {
            if (/black/.test(buttonClass)) {
                self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/logo-button-black.png');
            } else if (/white/.test(buttonClass)) {
                self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/logo-button-white.png');
            } else if (/nobg/.test(buttonClass)) {
                self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/gs_button_nobg.png');
            } else if (/bg/.test(buttonClass)) {
                self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/gs_button_bg.png');
            } else {
                self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/gs_button_nobg.png');
            }
        } else {
            self.buttonImg.setAttribute('src', 'https://www.giftstarter.co/assets/gs_button_nobg.png');
        }
        self.buttonImg.setAttribute('style', 'max-height: 92%; margin-top: 3%; padding: 0 8px;');
        self.button.setAttribute('style', 'display: none;');
        self.button.setAttribute('title', 'Gift this together with friends and family!');


        // Put onto the dom...
        self.buttonLink.appendChild(self.buttonImg);
        self.button.appendChild(self.buttonLink);
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

})();