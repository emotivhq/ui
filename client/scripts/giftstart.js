/**
 * Created by stuart on 4/9/14.
 */

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['GiftStartService',
    function() {

}]);

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http',
    function() {

        function initiateGiftStart() {

        }

        return {
          initiateGiftStart: initiateGiftStart
        };

}]);