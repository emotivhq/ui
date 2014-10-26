/**
 * Created by Stuart on 10/24/14.
 */

describe('GiftStartCreateController', GiftStartCreateControllerSpec);

function GiftStartCreateControllerSpec() {
    var scope, exampleGiftStart, createController, $httpBackend,
        ProductService, AppStateService;

    beforeEach(angular.mock.module('GiftStarterApp'));
    beforeEach(angular.mock.module('ngAB'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector) {
        $httpBackend = $injector.get('$httpBackend');
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        ProductService = $injector.get('ProductService');
        AppStateService = $injector.get('AppStateService');

        exampleGiftStart = {
            'title': 'Example giftstart',
            'description': 'I will just say this is in honor of Marion',
            'product_url': 'http://yo.momma.com',
            'product_img_url': 'http://yo.momma.com/assets/venus.png',
            'product_price': 12300,
            'product_title': '$1.23 venus!',
            'sales_tax': 11,
            'shipping': 23,
            'service_fee': 9,
            'total_price': 12343,
            'columns': 3,
            'rows': 3,
            'shipping_state': 'WA',
            'shipping_zip': '98109',
            'gc_email': 'test@giftstarter.co'
        };

        scope = $rootScope.$new();
        createController = function() {
            return $controller('GiftStartCreateController',
                {'$scope' : scope});
        };
    }


    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should fetch shipping/tax when shipping is changed',
        shippingChanged);
    function shippingChanged() {
        $httpBackend
            .expectPOST('/product', {
                "action":"get-tax-and-shipping","shipping_address":"street",
                "shipping_city":"city","shipping_state":"WA",
                "shipping_zip":"98109"
            })
            .respond(200, {tax: 0.098});
        var controller = createController();
        scope.shippingZip = '98109';
        scope.shippingState = 'WA';
        scope.shippingChanged();
        $httpBackend.flush();
    }

    it('should send giftstart for staging when on next if not logged in',
        stageGiftStart);
    function stageGiftStart() {
        var uuidGiftStart = exampleGiftStart;
        uuidGiftStart.staging_uuid = 'a6e645e3-ca0a-4873-aea2-d7a9c25f3ff2';
        var controller = createController();
        ProductService.product = {product_url: 'http://yo.momma.com',
            title: '$1.23 venus!'};
        scope.makeUUID = function() {return uuidGiftStart.staging_uuid};

        var setSpy = spyOn(AppStateService, 'set');

        // mock form validity
        scope.campaignForm = {$valid: true};

        $httpBackend
            .expectPOST('/giftstart/create.json', uuidGiftStart)
            .respond(200, exampleGiftStart);

        scope.shippingZip = exampleGiftStart.shipping_zip;
        scope.shippingState = exampleGiftStart.shipping_state;
        scope.title = exampleGiftStart.title;
        scope.description = exampleGiftStart.description;
        scope.product_url = exampleGiftStart.product_url;
        scope.product_title = exampleGiftStart.product_title;
        scope.inputPrice = exampleGiftStart.product_price/100;
        scope.selectedImg = exampleGiftStart.product_img_url;
        scope.y = exampleGiftStart.rows;
        scope.x = exampleGiftStart.columns;
        scope.salesTax = exampleGiftStart.sales_tax;
        scope.shipping = exampleGiftStart.shipping;
        scope.serviceFee = exampleGiftStart.service_fee;
        scope.totalPrice = exampleGiftStart.total_price;
        scope.gcEmail = exampleGiftStart.gc_email;

        scope.next();

        // It should have sent request here!
        $httpBackend.flush();

        expect(setSpy).toHaveBeenCalled();
    }


}