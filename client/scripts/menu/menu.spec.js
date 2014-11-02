/**
 * Created by Stuart on 10/31/14.
 */

describe('menu', menuSpec);

function menuSpec() {

    var UserService,
        $compile,
        $rootScope,
        scope,
        createDirective,
        isMobile = true;

    beforeEach(angular.mock.module('GiftStarterApp'));

    beforeEach(inject(angularSetup));
    function angularSetup($injector, $window) {
        $window.loginDeets = null;
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        UserService = $injector.get('UserService');
        scope = $rootScope.$new();

        device = {
            mobile: function() {return isMobile}
        };
    }

    it('should know when the user is logged in', loggedInTest);
    function loggedInTest() {
        UserService.loggedIn = true;
        var elm = $compile('<gs-menu></gs-menu>')(scope);
        expect(UserService.loggedIn).toBe(true);
        expect(scope.loggedIn).toBe(true);
    }

    it('should update login status when user logs out',
        logInStatusChangedTest);
    function logInStatusChangedTest() {
        UserService.loggedIn = true;
        var elm = $compile('<gs-menu></gs-menu>')(scope);
        expect(scope.loggedIn).toBe(true);
        UserService.registerLogout();
        expect(scope.loggedIn).toBe(false);
    }
}
