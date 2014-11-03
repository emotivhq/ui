/**
 * Created by Stuart on 11/3/14.
 */

describe('image-update', imageUpdateSpec);

function imageUpdateSpec() {

    var $compile, $rootScope, scope;

    beforeEach(angular.mock.module('GiftStarterApp'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        scope = $rootScope.$new();
    }

    it('should change to editing mode when edit triggered', testEditMode);
    function testEditMode() {
        var elm = $compile('<gs-image-update src="abcd"></gs-image-update>')
            (scope);

        expect(scope.editing).toBe(false);
        scope.startEdit();
        expect(scope.editing).toBe(true);
        scope.cancel();
        expect(scope.editing).toBe(false);
    }

    it('should ')
}
