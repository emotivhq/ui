/**
 * Created by stuart on 4/28/14.
 */

describe('GiftStart Overlay', function() {

    var scope, element, rows, cols;

    beforeEach(module('GiftStarterApp'));
    beforeEach(inject(function($injector) {
        var $rootScope, $compile;
        var template = '<gs-overlay class="product-overlay" giftstart="giftStart"></gs-overlay>';
        var GiftStartService = $injector.get('GiftStartService');
        var $templateCache = $injector.get('$templateCache');
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        rows = 3;
        cols = 3;
        // TODO: this should read from disk - very unDRY
        $templateCache.put('/templates/angular/overlay.html',
            '<img ng-src="{{giftstart.product.img_url}}"/>\n<table class="overlay"></table>');
        GiftStartService.initiateGiftStart('title', 'description', 'productImgUrl', 500, 650, 'productUrl', rows, cols);

        scope = $rootScope.$new();
        element = $compile(template)(scope);
        scope.$digest();
    }));

    it('should populate the table with x*y tds, given y rows and x columns', function() {
        var numTds = element.find('td').length;
        expect(numTds).toBe(rows*cols);
    });

});
