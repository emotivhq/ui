/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

ngAB.config(['$httpProvider', ngABConfig]);

function ngABConfig($httpProvider) {
    $httpProvider.interceptors.push('ABInterceptor');
}