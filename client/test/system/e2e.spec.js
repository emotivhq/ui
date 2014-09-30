/**
 * Created by stuart on 9/8/14.
 */


describe('e2e home page', function() {

    var ptor;

    var googleLogin;

    beforeEach(function() {
        browser.get('http://localhost:8080');
        ptor = protractor.getInstance();

        googleLogin = function() {
            // Login! Wooh!
            ptor.sleep(300);

            element.all(by.id('Email')).get(0).sendKeys('test@giftstarter.co');
            element.all(by.id('Passwd')).get(0).sendKeys('bemygiftchampion');
            element.all(by.id('signIn')).get(0).click();

            ptor.sleep(1500);
            element.all(by.id('submit_approve_access')).get(0).click();
            ptor.sleep(3000);
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
//        element.all(by.id('Email')).get(0).sendKeys('test@giftstarter.co');
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
            .sendKeys('test@giftstarter.co');
        // Submit campaign
        element.all(by.id('giftstart-create-submit')).get(0).click();

        browser.ignoreSynchronization = true;
        element.all(by.css('div.login-popover')).get(0)
            .all(by.css('div.login-button.googleplus')).get(0).click();
        googleLogin();

        // Verify the title/description!
        var resultTitle = element.all(by.css("h1.title")).get(0).getText();
        var resultDescription = element.all(by.css("span.description")).get(1).getText();

        expect(resultTitle).toEqual(gsTitle);
        expect(resultDescription).toEqual(gsDescription);

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
        expect(element.all(by.css('textarea.note')).length).toEqual(1);

        // Add a note!
        element.all(by.css('textarea.note')).get(0).sendKeys('test note');
        element.all(by.css('button.white-border.large')).get(0).click();
        ptor.sleep(100);

        element.all(by.id('card-number')).get(0).sendKeys('4242424242424242');
        element.all(by.css('card-cvc')).get(1).sendKeys('123');
        element.all(by.css('card-expiry')).get(2).sendKeys('12/17');
        element.all(by.css('card-zip')).get(3).sendKeys('12345');
        element.all(by.css('card-email')).get(4).sendKeys(
            'test@giftstarter.co');

        element.all(by.css('button.white-border.large')).get(0).click();

        ptor.sleep(3000);

        element.all(by.css('p.cancel-button')).get(0).click();

        ptor.sleep(300000);


    });

});