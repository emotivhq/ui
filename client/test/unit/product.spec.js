/**
 * Created by stuart on 4/16/14.
 */

describe("ProductService", function() {

    var $httpBackend, ProductService;

    beforeEach(module('GiftStarterApp'));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        ProductService = $injector.get('ProductService');
    }));

    beforeEach(function() {
        console.log("setting up get watcher");
        $httpBackend.when('GET', function(url) {
            console.log(url);
            return url.indexOf('/templates/') > -1;
        }).respond('');
        $httpBackend.flush();
    });

    it('should request a product when user submits a link', function() {
        var success = jasmine.createSpy(), fail = jasmine.createSpy();

        $httpBackend.when('POST', '/product')
            .respond({product:
                {link: 'link', img: 'img', title: 'title', price: 'price', description: 'description'}});
        ProductService.submitLink('testurl', success, fail);
        $httpBackend.flush();
        expect(success).toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();

    });
});
