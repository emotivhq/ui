/**
 * Created by Stuart on 10/31/14.
 */

describe('user', userSpec);

function userSpec() {

    var UserService;

    beforeEach(angular.mock.module('GiftStarterApp'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector, $window) {
        $window.loginDeets = null;
        UserService = $injector.get('UserService');
    }

    it('should be able to inject UserService', injectTest);
    function injectTest() {
        expect(UserService).not.toBe(undefined);
    }

}
