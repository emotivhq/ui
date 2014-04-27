/**
 * Created by stuart on 4/26/14.
 */


describe('Usage Flow', function() {

    var $httpBackend, productLinkScope, $rootScope, productController, $location, giftStartScope, GiftStartService,
        giftStartController;

    beforeEach(module('GiftStarterApp'));
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        GiftStartService = $injector.get('GiftStartService');

        var $controller = $injector.get('$controller');

        productLinkScope = $rootScope.$new();
        productController = $controller('ProductLinkController', {'$scope': productLinkScope});
        giftStartScope = $rootScope.$new();
        giftStartController = $controller('GiftStartController', {'$scope': giftStartScope});
    }));


    it('should request the product page from the server', function() {
        productLinkScope.product.link = 'link';
        productLinkScope.product.price = 0.02;

        function containsProductDetails(data) {
            var dataObject = JSON.parse(data);
            return (dataObject.url == 'link' && dataObject.price == 0.02);
        }
        $httpBackend.expect('POST', '/product', containsProductDetails)
            .respond(200, {'product': {'link': 'url', 'img': 'img', 'title': 'title', 'price': 'price',
                'description': 'desc'}});
        productLinkScope.submitLink();
        $httpBackend.flush();
    });

    it('should create a giftstart campaign from a submitted product', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.giftstart();
        expect($location.path()).toBe('/giftstart');

    });

    it('should properly count selected parts of product', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        expect($location.path()).toBe('/giftstart');

        expect(GiftStartService.giftStart.totalSelection).toBe(0);
        expect(GiftStartService.giftStart.parts[0][1].selected).toBe(false);
        GiftStartService.giftStart.parts[0][1].toggle();
        expect(GiftStartService.giftStart.parts[0][1].selected).toBe(true);
        expect(GiftStartService.giftStart.totalSelection).toBe(5);
        expect(GiftStartService.giftStart.parts[1][1].selected).toBe(false);
        GiftStartService.giftStart.parts[1][1].toggle();
        expect(GiftStartService.giftStart.parts[1][1].selected).toBe(true);
        expect(GiftStartService.giftStart.totalSelection).toBe(10);
    });

    it('should show the login popover when they pitch in', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        GiftStartService.giftStart.parts[0][1].toggle();
        GiftStartService.giftStart.parts[1][1].toggle();

        giftStartScope.pitchIn();
        expect($location.hash()).toBe('login');


    });
});