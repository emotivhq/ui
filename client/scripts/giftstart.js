/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', ['$http', '$location', 'FacebookService',
    function($http, $location, FacebookService) {

        var giftStart = {
            title: '',
            description: '',
            gift_champion_uid: '',
            product: {
                price: -1,
                img_url: ''
            },
            parts: [],
            rows: -1,
            columns: -1
        };

        function initiateGiftStart(title, description, productImgUrl, productPrice) {
            var x = 5, y = 5;
            var tempParts = [];
            for (var j = 0; j < y; j++) {
                var newParts = [];
                for (var i = 0; i < x; i++) {
                    newParts.push({
                        bought: false,
                        value: productPrice/x/y
                    });
                }
                tempParts.push(newParts);
            }
            giftStart = buildGiftStart(title, description, FacebookService.getUid(), productImgUrl, productPrice, tempParts, y, x);
            console.log(giftStart);
            $location.path('/giftstart');
        }

        function buildGiftStart(title, description, championUid, productImgUrl, productPrice, parts, rows, columns) {
            var gs = {
                title: title,
                description: description,
                gift_champion_uid: championUid,
                product: {
                    price: productPrice,
                    img_url: productImgUrl
                },
                parts: parts,
                rows: rows,
                columns: columns
            };
            injectPartToggles(gs);
            return gs;
        }

        function createGiftStart(giftstart) {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: giftstart, action: 'create', uid: FacebookService.getUid()}})
                .success(function (data, status, headers, config){
                    giftStart = data['giftstart'];
                    injectPartToggles(giftStart);
                    $location.path('/giftstart');
                    $location.search('id', giftStart.id);
                }).error(function (data, status, headers, config){
                    console.log("Failed to make GiftStart.");
            });
        }

        function injectPartToggles(giftstart) {
            function makePartToggle(i, j) {
                var ti = i;
                var tj = j;
                return function () {
                    if (!giftstart.parts[tj][ti].bought) {
                        if (giftstart.parts[tj][ti].selected) {
                            giftstart.parts[tj][ti].selected = false;
                        } else {
                            giftstart.parts[tj][ti].selected = true;
                        }
                    }
                }
            }

            for (var j = 0; j < giftstart.parts.length; j++) {
                for (var i = 0; i < giftstart.parts[j].length; i++) {
                    giftstart.parts[j][i].toggle = makePartToggle(i, j);
                }
            }
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
