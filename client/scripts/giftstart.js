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
                    for (var j = 0; j < giftStart.parts.length; j++) {
                        for (var i = 0; i < giftStart.parts[j].length; i++) {
                            giftStart.parts[j][i].toggle = function() {
                                var x = i;
                                var y = j;
                                return function () {
                                    if (!giftStart.parts[y][x].bought) {
                                        if (giftStart.parts[y][x].selected) {
                                            giftStart.parts[y][x].selected = false;
                                        } else {
                                            giftStart.parts[y][x].selected = true;
                                        }
                                    }
                                }
                            }();
                        }
                    }
                    $location.path('/giftstart');
                    $location.search('id', giftStart.id);
                }).error(function (data, status, headers, config){
                    console.log("Failed to make GiftStart.");
            });
        }

        function getGiftStart() {return giftStart;}

        function updateSelected(parts) {
            giftStart.parts = parts;

            giftStart.totalSelection = 0;
            for (var j=0; j < parts.length; j++) {
                for (var i=0; i < parts[j].length; i++) {
                    if (parts[j][i].selected) {
                        giftStart.totalSelection += parts[j][i].value;
                    }
                }
            }

            return giftStart;
        }

        return {
            initiateGiftStart: initiateGiftStart,
            getGiftStart: getGiftStart,
            updateSelected: updateSelected
        };

    }]);

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['$scope', 'GiftStartService',
    function($scope, GiftStartService) {

        $scope.giftStart = GiftStartService.getGiftStart();

        $scope.pitchIn = function() {
            alert("Pitch in!");
        };

        $scope.selectionUpdated = function() {
            $scope.giftStart = GiftStartService.updateSelected($scope.giftStart.parts);
            console.log('Updating part selection... ' + $scope.giftStart.totalSelection);
        }

}]);
