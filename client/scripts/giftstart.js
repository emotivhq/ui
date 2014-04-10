/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http', '$location',
    function($http, $location) {

        function initiateGiftStart(giftstartId) {
            $location.path('/giftstart');
            $location.search('id', giftstartId);
        }

        return {
            initiateGiftStart: initiateGiftStart
        };

    }]);

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['GiftStartService',
    function() {

}]);
