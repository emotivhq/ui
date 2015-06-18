/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

describe('e2e home page', function() {

    var ptor;

    var googleLogin;

    beforeEach(function() {
        browser.get('http://localhost:8080?TESTING_OMG');
        ptor = protractor.getInstance();

        googleLogin = function() {
            // Login! Wooh!
            ptor.sleep(300);

            element.all(by.id('Email')).get(0).sendKeys('test@giftstarter.com');
            element.all(by.id('Passwd')).get(0).sendKeys('bemygiftchampion');
            element.all(by.id('signIn')).get(0).click();

            ptor.sleep(1500);
            element.all(by.id('submit_approve_access')).get(0).click();
            ptor.sleep(1000);
        }
    });

//    it('should log in', function() {
//        element.all(by.css('h2.navitem.login')).click();
//
//        element.all(by.css('div.login-popover')).get(0)
//            .all(by.css('div.login-button.googleplus')).get(0).click();
//        browser.ignoreSynchronization = true;
//        ptor.sleep(300);
//
//        element.all(by.id('Email')).get(0).sendKeys('test@giftstarter.com');
//        element.all(by.id('Passwd')).get(0).sendKeys('bemygiftchampion');
//        element.all(by.id('signIn')).get(0).click();
//
//        ptor.sleep(1500);
//        element.all(by.id('submit_approve_access')).get(0).click();
//        browser.ignoreSynchronization = false;
//
//    });

    it('should do everything', function() {
        // Flush intervals/timeouts

        // Input search terms, submit
        element.all(by.id('product-search-input')).get(0).sendKeys('bike');
        element.all(by.id('product-search-button')).get(0).click();

        // Expand product, giftstart it!
        var firstProduct = element.all(by.css('.product-container')).get(0);
        firstProduct.click();
        firstProduct.all(by.css('button.giftstart')).get(0).click();

        // Input deets for campaign
        var gsTitle = 'this is my title.';
        var gsDescription = 'this is my description!';
        element.all(by.cssContainingText('option', 'WA')).get(0).click();
        element.all(by.css('input.zip')).get(0).sendKeys('98109');
        element.all(by.id('campaign-title')).get(0)
            .sendKeys(gsTitle);
        element.all(by.id('campaign-description')).get(0)
            .sendKeys(gsDescription);
        element.all(by.id('contact-email')).get(0)
            .sendKeys('test@giftstarter.com');

        var moreButton = element.all(by.id('more-parts')).get(0);
        var lessButton = element.all(by.id('less-parts')).get(0);
        // Change number of parts
        for (var i = 0; i < 30; i++) {moreButton.click()}
        lessButton.click();
        lessButton.click();

        // There should be 36 parts
        element.all(by.css('div.part-cell')).then(function(items) {
            expect(items.length).toBe(36);
        });

        // Submit campaign
        element.all(by.id('giftstart-create-submit')).get(0).click();

        browser.ignoreSynchronization = true;
        element.all(by.css('div.login-popover')).get(0)
            .all(by.css('div.login-button.googleplus')).get(0).click();
        googleLogin();
        ptor.sleep(3000);

        // Verify the title/description!
        var resultTitle = element.all(by.css("h1.title")).get(0).getText();
        var resultDescription = element.all(by.css("span.description")).get(1).getText();

        expect(resultTitle).toEqual(gsTitle);
        expect(resultDescription).toEqual(gsDescription);

        // There should be 36 parts
        element.all(by.css('div.part-cell')).then(function(items) {
            expect(items.length).toBe(36);
        });

        // Log out first...
        element.all(by.css('h2.navitem.logout')).click();

        // Pitch in!
        element.all(by.css('div.part-cell')).get(0).click();
        element.all(by.css('div.part-cell')).get(1).click();
        element.all(by.css('div.part-cell')).get(1).click();
        element.all(by.css('div.part-cell')).get(2).click();

        // Click pitch in
        element.all(by.css('button.pitch-in.button')).get(0).click();

        // Log in with google
        ptor.sleep(100);
        element.all(by.css('div.login-popover')).get(0)
            .all(by.css('div.login-button.googleplus')).get(0).click();

        // Expect to be at the note popup
        ptor.sleep(1500);
//        expect(element.all(by.css('textarea.note')).length).toEqual(1);

        // Add a note!
        element.all(by.css('textarea.note')).get(0).sendKeys('test note');
        element.all(by.css('button.white-border.large')).get(0).click();
        ptor.sleep(100);

        element.all(by.id('card-number')).get(0).sendKeys('4242424242424242');
        element.all(by.id('card-cvc')).get(0).sendKeys('123');
        element.all(by.id('card-expiry')).get(0).sendKeys('12/17');
        element.all(by.id('card-zip')).get(0).sendKeys('12345');
        element.all(by.id('card-email')).get(0).sendKeys(
            'test@giftstarter.com');

        element.all(by.css('button.white-border.large')).get(0).click();

        ptor.sleep(5000);

        element.all(by.css('p.cancel-button')).get(0).click();

        // Verify that the pitchin happened
        element.all(by.css('div.part-cell')).get(0).getAttribute('class').then(
            function(result) {expect(/bought/.test(result)).toBe(true)}
        );
        element.all(by.css('div.part-cell')).get(2).getAttribute('class').then(
            function(result) {expect(/bought/.test(result)).toBe(true)}
        );
        element.all(by.css('div.part-cell')).get(1).getAttribute('class').then(
            function(result) {expect(/bought/.test(result)).toBe(false)}
        );
        element.all(by.css('div.part-cell')).get(3).getAttribute('class').then(
            function(result) {expect(/bought/.test(result)).toBe(false)}
        );
        ptor.sleep(100);

        // Go to user page, go to campaign
        element.all(by.css('img.giver')).get(0).click();
        ptor.sleep(100);




    });

});