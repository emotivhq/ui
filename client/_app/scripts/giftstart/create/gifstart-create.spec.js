/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

describe('GiftStartCreateController', GiftStartCreateControllerSpec);

function GiftStartCreateControllerSpec() {
    var scope, exampleGiftStart, createController, $httpBackend,
        ProductService, AppStateService, $window, $location;

    beforeEach(angular.mock.module('GiftStarterApp'));
    beforeEach(angular.mock.module('ngAB'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector) {
        $httpBackend = $injector.get('$httpBackend');
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        ProductService = $injector.get('ProductService');
        AppStateService = $injector.get('AppStateService');
        $window = $injector.get('$window');
        $location = $injector.get('$location');

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
            'campaign_length': 10,
            'columns': 3,
            'rows': 3,
            'shipping_state': 'WA',
            'shipping_zip': '98109',
            'gc_email': 'test@giftstarter.com'
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
                "shipping_zip":"98109","title": ""
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
        scope.campaignLength = exampleGiftStart.campaign_length;
        scope.gcEmail = exampleGiftStart.gc_email;

        scope.next();

        // It should have sent request here!
        $httpBackend.flush();

        expect(setSpy).toHaveBeenCalled();
    }

    it('should build creation from refferal data', fromReferral);
    function fromReferral() {
        $location.search('product_url=http%3A%2F%2Fstore.icpooch.com'+
            '%2Ficpooch-internet-pet-treat-dispenser-u-s-canada-model-include'+
            's-6oz-of-icpooch-cookies%2F&title=ICPOOCH%20-%20INTERNET%20PET%2'+
            '0TREAT%20DISPENSER%20-%20U.S.%20%26%20CANADA%20MODEL%20-%20INCLU'+
            'DES%206OZ%20OF%20ICPOOCH%20COOKIES&price=12999&img_url=http%3A%2'+
            'F%2Fcdn3.bigcommerce.com%2Fs-al2q69%2Fproducts%2F76%2Fimages%2F2'+
            '75%2FMain_tablet_cookies__02336.1403226511.1280.1280__70484.1403'+
            '226960.1280.1280.jpg%3Fc%3D2&source=icpooch');

        var controller = createController();

        // it should have moved that data into the scope
        expect(ProductService.product.product_url)
            .toBe(decodeURIComponent('http%3A%2F%2Fstore.icpooch.com%2Ficpooc'+
                'h-internet-pet-treat-dispenser-u-s-canada-model-includes-6oz'+
                '-of-icpooch-cookies%2F'));
        expect(ProductService.product.title)
            .toBe(decodeURIComponent('ICPOOCH%20-%20INTERNET%20PET%20TREAT%20'+
                'DISPENSER%20-%20U.S.%20%26%20CANADA%20MODEL%20-%20INCLUDES%2'+
                '06OZ%20OF%20ICPOOCH%20COOKIES'));
        expect(ProductService.product.imgs)
            .toEqual([decodeURIComponent('http%3A%2F%2Fcdn3.bigcommerce.com%2'+
                'Fs-al2q69%2Fproducts%2F76%2Fimages%2F275%2FMain_tablet_cooki'+
                'es__02336.1403226511.1280.1280__70484.1403226960.1280.1280.j'+
                'pg%3Fc%3D2')]);
        expect(scope.selectedImg)
            .toBe(decodeURIComponent('http%3A%2F%2Fcdn3.bigcommerce.com%2Fs-a'+
                'l2q69%2Fproducts%2F76%2Fimages%2F275%2FMain_tablet_cookies__'+
                '02336.1403226511.1280.1280__70484.1403226960.1280.1280.jpg%3'+
                'Fc%3D2'));
        expect(scope.inputPrice).toBe(129.99);
        expect(scope.showIntroCopy).toBe(true);
        expect(scope.fromReferral).toBe(true);

        // It should have removed data form the search
        expect($window.location.search).toBe('');
    }


}
