/**
 * Created by stuart on 9/5/14.
 */

(function GiftStarterButton() {
    // For use with the Shopify GiftStarter Button on product pages
    // Button tag and script source shoul be:
    // <script src="https://www.giftstarter.co/scripts/shopify/button.js"></script>
    // <gs-button id="gsbutton"></gs-button>

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
        xhr.open('get', document.location.href.split('?')[0] + '.json', true);
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
        var urlParams = {
            product_url: document.location.href,
            title: self.productObject.title,
            price: (self.product.compare_at_price | self.product.price)* 100,
            img_url: self.product.imgUrl,
            source: 'shopify/' + window.Shopify.shop
        };
        var url = 'http://localhost:8080/create?' + self.urlSerialize(urlParams);
        self.buttonLink.setAttribute('href', url);
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
        self.buttonDiv = document.createElement('div');
        self.buttonDiv.innerHTML = "GiftStart!";

        // Apply styles...
        self.buttonDiv.setAttribute('style', ' border-radius: 2px;background: #df484b;color: #fff; display: inline-block; padding: 7.5px 20px; font-weight: 700;');

        // Put onto the dom...
        self.buttonLink.appendChild(self.buttonDiv);
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