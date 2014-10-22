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
    // Ensure inputs are valid before continuing
    function inputValid(prev, input) {return input != null && input != undefined && prev;}
    var inputsValid = [productUrl, title, price, imgUrl].reduce(inputValid, true);
    if (!inputsValid) {return}

    if (buttonId == undefined || buttonId == null) {
        buttonId = '';
    }
    var gs_domain = 'https://www.giftstarter.co';
    var source = 'butterLONDON';
    var button = document.querySelector('#gsbutton' + buttonId);
    var buttonLink, buttonImg;

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
        buttonLink = document.createElement('a');
        buttonLink.setAttribute('target', '_blank');
        buttonLink.setAttribute('style', 'display: block; height: 100%;');
        buttonImg = document.createElement('img');

        // Apply styles...
        if (!button) {return;}
        var buttonClass = button.getAttribute('class');
        if (buttonClass) {
            if (buttonClass.indexOf('bg') > 0) {
                buttonImg.setAttribute('src',
                        gs_domain + '/assets/gs_button_bg.png');
            } else {
                buttonImg.setAttribute('src',
                        gs_domain + '/assets/gs_button_nobg.png');
            }
        } else {
            buttonImg.setAttribute('src',
                    gs_domain + '/assets/gs_button_nobg.png');
        }
        buttonImg.setAttribute('style',
            'max-height: 100%;');
        button.setAttribute('title',
            'Gift this together with friends and family!');


        // Put onto the dom...
        buttonLink.appendChild(buttonImg);
        button.appendChild(buttonLink);
    }

    var url = gs_domain + '/create?' + urlSerialize({
        product_url: productUrl,
        title: title,
        price: price * 100,
        img_url: imgUrl,
        source: source
    });

    setTimeout(function() {
        initializeButton();
        buttonLink.setAttribute('href', url);
        if (price > 40) {
            button.setAttribute('style',
                ' display: inline-block; text-align: center;');
        }
    }, 1);

    return self;
})();
