/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http',
    function() {

        function initiateGiftStart() {
            alert("GIFTSTART BITCHES!");
        }

        return {
            initiateGiftStart: initiateGiftStart
        };

    }]);

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['GiftStartService',
    function() {

}]);