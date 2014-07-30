/**
 * Created by stuart on 4/16/14.
 */

describe("ProductService", function() {

    var $httpBackend, ProductService;

    beforeEach(module('GiftStarterApp'));
    beforeEach(inject(function($injector) {
        console.log("Hello!");
        console.log($injector);
        $httpBackend = $injector.get('$httpBackend');
        ProductService = $injector.get('ProductService');
    }));

    it('should request a product when user submits a link', function() {
        console.log("yp testing");
        var success = jasmine.createSpy(), fail = jasmine.createSpy();

        $httpBackend.when('POST', '/product')
            .respond({product:
                {link: 'link', img: 'img', title: 'title', price: 'price', description: 'description'}});
        ProductService.submitLink('testurl', 1234, success, fail);
        $httpBackend.flush();
        expect(success).toHaveBeenCalled();
        expect(fail).not.toHaveBeenCalled();

    });
});
