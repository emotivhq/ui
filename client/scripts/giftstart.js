/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http', '$location',
    function($http, $location) {

        var giftStart = {};

        function initiateGiftStart(product) {
            $http({method: 'POST', url: '/giftstart',
                data: {product: product, action: 'new', user:{name: 'test'}}})
                .success(function (data, status, headers, config){
                    giftStart = data['giftstart'];
                    $location.path('/giftstart');
                    $location.search('id', giftStart.id);
                    console.log("Successfully created GiftStart:");
                    console.log(giftStart);
                }).error(function (data, status, headers, config){
                    console.log("Failed to make GiftStart.");
            });
        }

        function getGiftStart() {return giftStart;}

        return {
            initiateGiftStart: initiateGiftStart,
            getGiftStart: getGiftStart
        };

    }]);

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['$scope', 'GiftStartService',
    function($scope, GiftStartService) {

        $scope.giftStart = GiftStartService.getGiftStart();

        $scope.pitchIn = function() {
            alert("Pitch in!");
        };

}]);
