/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http', '$location',
    function($http, $location) {

        var giftstart = {};

        function initiateGiftStart(product) {
            $http({method: 'POST', url: '/giftstart',
                data: {product: product, action: 'new', user:{name: 'test'}}})
                .success(function (data, status, headers, config){
                    giftstart = data['giftstart'];
                    $location.path('/giftstart');
                    $location.search('id', giftstart.id);
                    console.log("Successfully created GiftStart:");
                    console.log(giftstart);
                }).error(function (data, status, headers, config){
                    console.log("Failed to make GiftStart.");
            });
        }

        function getGiftStart() {return giftstart;}

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
