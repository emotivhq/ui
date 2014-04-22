/**
 * Created by stuart on 4/9/14.
 */

var GiftStartService = GiftStarterApp.service('GiftStartService', [
            '$http','$location','FacebookService','$rootScope','$filter',
    function($http,  $location,  FacebookService,  $rootScope,  $filter) {

        var giftStart = {
            title: '',
            description: '',
            gift_champion_uid: '',
            product: {
                price: -1,
                img_url: '',
                img_height: -1
            },
            parts: [],
            rows: -1,
            columns: -1
        };

        var purchase = {
            parts: [],
            note: ''
        };

        function initiateGiftStart(title, description, productImgUrl, imageHeight, productPrice) {
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
            giftStart = buildGiftStart(title, description, FacebookService.getUid(), productImgUrl, imageHeight,
                productPrice, tempParts, y, x);
            $location.path('/giftstart');
            setTimeout(function() {
                $rootScope.$broadcast('giftstart-loaded');
            }, 100);
        }

        function buildGiftStart(title, description, championUid, productImgUrl, imageHeight, productPrice, parts, rows,
                                columns) {
            var gs = {
                title: title,
                description: description,
                gift_champion_uid: championUid,
                product: {
                    price: productPrice,
                    img_url: productImgUrl,
                    img_height: imageHeight
                },
                totalSelection: 0,
                parts: parts,
                rows: rows,
                columns: columns
            };
            injectPartToggles(gs);
            return gs;
        }

        function createGiftStart() {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: giftStart, action: 'create'}})
                .success(function (data, status, headers, config){
                    giftStart = data['giftstart'];
                    injectPartToggles(giftStart);
                    $rootScope.$broadcast('giftstart-loaded');
//                    $location.path('/giftstart');
                    $location.search('gs-id', giftStart.id);
                }).error(function (data, status, headers, config){
                    console.log("Failed to create GiftStart.");
            });
        }

        function injectPartToggles(giftstart) {
            function makePartToggle(i, j) {
                var ti = i;
                var tj = j;
                return function () {
                    if (!giftstart.parts[tj][ti].bought) {
                        // If selected is none, this will force it into a bool
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

            // Limit selected parts to 2 decimal places (cents)
            giftStart.totalSelection = $filter('number')(giftStart.totalSelection, 2);

            return giftStart;
        }

        function fetchGiftStart(gsid) {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart_id: gsid, action: 'get'}})
                .success(function (data, status, headers, config){
                    giftStart = data['giftstart'];
                    giftStart.totalSelection = 0;
                    injectPartToggles(giftStart);
                    $rootScope.$broadcast('giftstart-loaded');
//                    $location.path('/giftstart');
//                    $location.search('gs-id', giftStart.id);
                }).error(function (data, status, headers, config){
                    console.log("Failed to fetch GiftStart.");
            });
        }

        function updateGiftStart() {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: giftStart, action: 'update'}})
                .success(function (data, status, headers, config){
                    giftStart = data['giftstart'];
                    giftStart.totalSelection = 0;
                    injectPartToggles(giftStart);
                    $rootScope.$broadcast('giftstart-loaded');
                }).error(function (data, status, headers, config){
                    console.log("Failed to update GiftStart.");
                });
        }

        function saveNote(noteText) {
            // TODO: This should be added to something sent to the server
            purchase.note = noteText;
        }

        return {
            initiateGiftStart: initiateGiftStart,
            createGiftStart: createGiftStart,
            getGiftStart: getGiftStart,
            updateSelected: updateSelected,
            fetchGiftStart: fetchGiftStart,
            updateGiftStart: updateGiftStart,
            saveNote: saveNote
        };

    }]);

var GiftStartController = GiftStarterApp.controller('GiftStartController', ['$scope', 'GiftStartService', '$location', 'PopoverService',
    function($scope, GiftStartService, $location, PopoverService) {

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            GiftStartService.fetchGiftStart($location.search()['gs-id']);
        }
        $scope.$on('giftstart-loaded', function() {
            $scope.giftStart = GiftStartService.getGiftStart();
        });


        $scope.pitchIn = function() {
            if (GiftStartService.getGiftStart().gsid) {
                // GiftStarter exists server-side, just update
//                GiftStartService.updateGiftStart();

                // BEGIN TEMP CODE - convert selected to bought
                (function selectedToBought(gs) {
                    for (var j=0; j < gs.parts.length; j++) {
                        for (var i=0; i < gs.parts[j].length; i++) {
                            if (gs.parts[j][i].selected) {
                                gs.parts[j][i].bought = true;
                                gs.parts[j][i].selected = false;
                            }
                        }
                    }
                })($scope.giftStart);

                // END TEMP CODE

                // Ensure they have selected more than $0 of the gift to pitch in
                if (GiftStartService.getGiftStart().totalSelection > 0) {
                    PopoverService.setPopoverFromTemplate('<gs-login-popover></gs-login-popover>');
                    PopoverService.showPopover();
                }

            } else {
                // GiftStarter doesn't exist server-side, create it
                GiftStartService.createGiftStart();
            }
        };

        $scope.selectionUpdated = function() {
            $scope.giftStart = GiftStartService.updateSelected($scope.giftStart.parts);
        }

}]);
