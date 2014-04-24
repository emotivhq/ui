/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('GiftStartService', [
            '$http','$location','FacebookService','$rootScope','$filter','PopoverService',
    function($http,  $location,  FacebookService,  $rootScope,  $filter,  PopoverService) {

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

        var payment = {
            parts: [],
            note: '',
            stripeResponse: {}
        };

        function initiateGiftStart(title, description, productImgUrl, imageHeight, productPrice, numRows, numCols) {
            var x = numRows, y = numCols;
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
            console.log(giftStart);
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
                    // TODO: need to save which parts are selected across server giftstart return
                    var parts = JSON.parse(JSON.stringify(giftStart.parts));
                    giftStart = data['giftstart'];
                    giftStart.parts = parts;
                    injectPartToggles(giftStart);
                    $rootScope.$broadcast('giftstart-loaded');
//                    $location.path('/giftstart');
                    $location.search('gs-id', giftStart.gsid);
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
            // TODO: not secure
            if (parts) {giftStart.parts = parts;}

            giftStart.totalSelection = 0;
            for (var j=0; j < giftStart.parts.length; j++) {
                for (var i=0; i < giftStart.parts[j].length; i++) {
                    if (giftStart.parts[j][i].selected) {
                        giftStart.totalSelection += giftStart.parts[j][i].value;
                    }
                }
            }

            return giftStart.totalSelection;
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
            var parts = JSON.parse(JSON.stringify(giftStart.parts));
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: giftStart, action: 'update'}})
                .success(function (data, status, headers, config){
                    // TODO: need to save which parts are selected across server giftstart return
                    console.log(parts);
                    giftStart = data['giftstart'];
                    giftStart.parts = parts;
                    updateSelected();
                    injectPartToggles(giftStart);
                    $rootScope.$broadcast('giftstart-loaded');
                }).error(function (data, status, headers, config){
                    console.log("Failed to update GiftStart.");
                });
        }

        function saveNote(noteText) {
            // TODO: This should be added to something sent to the server
            payment.note = noteText;
        }

        function attachStripeResponse(response) {
            payment.stripeResponse = response;
        }

        function pitchIn() {
            // Ensure they have selected more than $0 of the gift to pitch in
            if (giftStart.totalSelection > 0) {
                PopoverService.setPopoverFromTemplate('<gs-login-popover></gs-login-popover>');
                PopoverService.showPopover();
            } else {console.log("Nothing selected!")}

            // Update or create, depending on whether it came from the server
            if (giftStart.gsid) {
                updateGiftStart();
            } else {
                createGiftStart();
            }
        }

        return {
            initiateGiftStart: initiateGiftStart,
            createGiftStart: createGiftStart,
            getGiftStart: getGiftStart,
            updateSelected: updateSelected,
            fetchGiftStart: fetchGiftStart,
            updateGiftStart: updateGiftStart,
            saveNote: saveNote,
            attachStripeResponse: attachStripeResponse,
            pitchIn: pitchIn
        };

    }]);

GiftStarterApp.controller('GiftStartController', [
            '$scope','GiftStartService','$location','PopoverService',
    function($scope,  GiftStartService,  $location,  PopoverService) {

        $scope.totalSelection = 0;

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            GiftStartService.fetchGiftStart($location.search()['gs-id']);
        }

        // Update this giftstart when the service updates it
        $scope.$on('giftstart-loaded', function() {$scope.giftStart = GiftStartService.getGiftStart()});
        $scope.$on('giftstart-updated', function() {$scope.giftStart = GiftStartService.getGiftStart()});


        $scope.pitchIn = function() {GiftStartService.pitchIn()};

        $scope.selectionUpdated = function() {
            $scope.totalSelection = GiftStartService.updateSelected($scope.giftStart.parts);
            $scope.giftStart = GiftStartService.getGiftStart();
        }

}]);
