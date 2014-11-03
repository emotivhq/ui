/**
 * Created by Stuart on 10/19/14.
 */

GiftStarterApp.run(['$http', '$templateCache', '$timeout', cacheTemplates]);

function cacheTemplates($http, $templateCache, $timeout) {
    $timeout(downloadTemplates, 300);

    function downloadTemplates() {
        // Cache templates!
        $http.get('/scripts/home/home.html', {cache: $templateCache});
        $http.get('/scripts/giftstart/create/giftstart-create.html', {cache: $templateCache});
        $http.get('/scripts/giftstart/giftstart.html', {cache: $templateCache});
        $http.get('/scripts/user/profile.html', {cache: $templateCache});
        $http.get('/scripts/popover/popover.html', {cache: $templateCache});
        $http.get('/scripts/popover/email-share/email-share-popover.html', {cache: $templateCache});
        $http.get('/scripts/popover/login/login-popover.html', {cache: $templateCache});
        $http.get('/scripts/popover/note/note-popover.html', {cache: $templateCache});
        $http.get('/scripts/popover/pay/pay-popover.html', {cache: $templateCache});
        $http.get('/scripts/popover/thanks/thanks-popover.html', {cache: $templateCache});
        $http.get('/scripts/giftstart/overlay/overlay.html', {cache: $templateCache});
        $http.get('/scripts/menu/menu.ng.html', {cache: $templateCache});
    }
}
