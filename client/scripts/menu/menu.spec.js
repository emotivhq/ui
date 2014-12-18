/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
describe('menu', menuSpec);

function menuSpec() {

    var UserService,
        $compile,
        $rootScope,
        scope,
        isMobile = true;

    beforeEach(module('GiftStarterApp'));
    beforeEach(module('htmlTemplates'));

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
        console.log(elm);
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

    it('should start closed', initTest);
    function initTest() {
        var elm = $compile('<gs-menu></gs-menu>')(scope);
        expect(scope.open).toBe(false);
    }

    it('should open', openTest);
    function openTest() {
        var elm = $compile('<gs-menu></gs-menu>')(scope);
        expect(scope.expanded).toBe(false);
        $rootScope.$broadcast('menu-open');
        expect(scope.expanded).toBe(true);
    }

    it('should open', closeTest);
    function closeTest() {
        var elm = $compile('<gs-menu></gs-menu>')(scope);
        expect(scope.expanded).toBe(false);
        $rootScope.$broadcast('menu-open');
        expect(scope.expanded).toBe(true);
        scope.close();
        expect(scope.expanded).toBe(false);
    }


}
