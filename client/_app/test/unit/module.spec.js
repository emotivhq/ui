/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

describe('Module imports', function() {

    var injector, GiftStartService, ProductService, $httpBackend, $rootScope, $location, FacebookService, PopoverService, $controller;

    beforeEach(module('GiftStarterApp'));

    beforeEach(inject(function($injector) {
        injector = $injector;
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        GiftStartService = $injector.get('GiftStartService');
        FacebookService = $injector.get('FacebookService');
        PopoverService = $injector.get('PopoverService');
        ProductService = $injector.get('ProductService');
        $controller = $injector.get('$controller');
    }));

    it('should come up properly', function() {
        expect(true).toBe(true);
    });

    it('GiftStarterApp should exist', function() {
        expect(Boolean(GiftStarterApp)).toBe(true);
    });

    it('should properly inject $injector', function() {
        expect(Boolean(injector)).toBe(true);
    });

    it('should be able to instantiate giftstart service', function() {
        expect(Boolean(GiftStartService)).toBe(true);
    });

    it('should be able to instantiate product service', function() {
        expect(Boolean(ProductService)).toBe(true);
    });

});