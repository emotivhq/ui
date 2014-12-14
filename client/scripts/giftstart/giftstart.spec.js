/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

describe('GiftStartCreateController', GiftStartControllerSpec);

function GiftStartControllerSpec() {
    var scope, exampleGiftStart, createController, $httpBackend,
        ProductService, AppStateService, $window, $location, GiftStartService,
        UserService;

    beforeEach(angular.mock.module('GiftStarterApp'));
    beforeEach(angular.mock.module('ngAB'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector) {
        $window = $injector.get('$window');
        $window.loginDeets = ["f1234", "https://storage.googleapis.com/giftst"+
            "arter-pictures/dev/u/f27213779.jpg", "CAAEyEaErFYMBAPxUxiYMiFJnB"+
            "JjzkIJoZApIkC2N53B2UjEppIhrjsZALusyZBZAJkqgNZCOGZCLDIugZBT698DY5"+
            "L73VQWXZB7XazN6FWuellhmeL43SG9wi1Mj6vMZBlhipVoZCC8hbVWHaS4h0giZB"+
            "pvYrFOC4yrZCb9IVWMWqOShxvZA5Kp4dvyUkZAQhLJW3T3O7ZCuYUpqsnBeI2lyY"+
            "Fx6fKZA", "False", btoa("Stuart Axel Owen"), "False"];

        $httpBackend = $injector.get('$httpBackend');
        var $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        ProductService = $injector.get('ProductService');
        AppStateService = $injector.get('AppStateService');
        GiftStartService = $injector.get('GiftStartService');
        UserService = $injector.get('UserService');
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
            'gc_email': 'test@giftstarter.co',
            'gift_champion_uid': 'f1234'
        };

        scope = $rootScope.$new();
        createController = function() {
            return $controller('GiftStartController',
                {'$scope' : scope});
        };
    }

    it('should allow the creator of the giftstart to edit it',
        giftstartEditable);
    function giftstartEditable() {
        GiftStartService.giftStart = exampleGiftStart;
        var ctrl = createController();
        expect(scope.campaignEditable).toBe(true);
    }

}
