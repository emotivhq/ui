/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
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
