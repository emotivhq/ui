/**
 * Created by Stuart on 10/16/14.
 */

ngAB.config(['$httpProvider', ngABConfig]);

function ngABConfig($httpProvider) {
    $httpProvider.interceptors.push('ABInterceptor');
}