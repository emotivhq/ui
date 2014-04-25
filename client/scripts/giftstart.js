/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('GiftStartService', [
            '$http','$location','FacebookService','$rootScope','$filter','PopoverService',
    function($http,  $location,  FacebookService,  $rootScope,  $filter,  PopoverService) {

        this.giftStart = {
            title: '',
            description: '',
            gift_champion_uid: '',
            product: {
                price: -1,
                img_url: '',
                img_height: -1,
                url: ''
            },
            parts: [],
            rows: -1,
            columns: -1
        };

        this.payment = {
            parts: [],
            note: '',
            stripeResponse: {}
        };

        var self = this;

        this.initiateGiftStart = function(title, description, productImgUrl, imageHeight, productPrice, productUrl,
                                          numRows, numCols) {
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
            self.giftStart = buildGiftStart(title, description, FacebookService.uid, productImgUrl, imageHeight,
                productPrice, productUrl, tempParts, y, x);
            console.log(self.giftStart);
            $location.path('/giftstart');
            setTimeout(function() {
                $rootScope.$broadcast('giftstart-loaded');
            }, 100);
        };

        function buildGiftStart(title, description, championUid, productImgUrl, imageHeight, productPrice, productUrl,
                                parts, rows, columns) {
            var gs = {
                title: title,
                description: description,
                gift_champion_uid: championUid,
                product: {
                    price: productPrice,
                    img_url: productImgUrl,
                    img_height: imageHeight,
                    url: productUrl
                },
                totalSelection: 0,
                parts: parts,
                rows: rows,
                columns: columns
            };
            injectPartToggles(gs);
            return gs;
        }

        this.createGiftStart = function() {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: this.giftStart, action: 'create'}})
                .success(this.createSuccess)
                .error(this.createFailure);
        };

        this.createSuccess = function(data, status, headers, config) {
            // TODO: need to save which parts are selected across server giftstart return
            var parts = JSON.parse(JSON.stringify(self.giftStart.parts));
            self.giftStart = data['giftstart'];
            self.giftStart.parts = parts;
            injectPartToggles(self.giftStart);
            self.updateSelected();
            $rootScope.$broadcast('giftstart-loaded');
            console.log(self.giftStart);
            $location.search('gs-id', self.giftStart.gsid);
        };

        this.createFailure = function(data, status, headers, config) {console.log("Failed to create GiftStart.")};

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

        this.updateSelected = function() {
            self.giftStart.totalSelection = 0;
            for (var j=0; j < self.giftStart.parts.length; j++) {
                for (var i=0; i < self.giftStart.parts[j].length; i++) {
                    if (self.giftStart.parts[j][i].selected) {
                        self.giftStart.totalSelection += self.giftStart.parts[j][i].value;
                    }
                }
            }
        };

        this.fetchGiftStart = function(gsid) {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart_id: gsid, action: 'get'}})
                .success(this.fetchSuccess)
                .error(function (data, status, headers, config){console.log("Failed to fetch GiftStart.");});
        };

        this.fetchSuccess = function(data, status, headers, config) {
            console.log(data);
            self.giftStart = data['giftstart'];
            self.giftStart.totalSelection = 0;
            injectPartToggles(self.giftStart);
            $rootScope.$broadcast('giftstart-loaded');
            $location.search('gs-id', self.giftStart.gsid);
        };

        this.updateGiftStart = function() {
            var parts = JSON.parse(JSON.stringify(this.giftStart.parts));
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: this.giftStart, action: 'update'}})
                .success(self.updateSuccess)
                .error(function (data, status, headers, config){console.log("Failed to update GiftStart.");});
        };

        this.updateSuccess = function(data, status, headers, config) {
            // TODO: need to save which parts are selected across server giftstart return
            self.giftStart = data['giftstart'];
            self.giftStart.parts = parts;
            self.updateSelected();
            injectPartToggles(self.giftStart);
            $rootScope.$broadcast('giftstart-loaded');
        };

        this.saveNote = function(noteText) {
            // TODO: This should be added to something sent to the server
            this.payment.note = noteText;
        };

        this.attachStripeResponse = function(response) {
            this.payment.stripeResponse = response;
        };

        this.pitchIn = function() {
            // Ensure they have selected more than $0 of the gift to pitch in
            if (self.giftStart.totalSelection > 0) {
                PopoverService.nextPopover();
            } else {console.log("Nothing selected!")}

            // Update or create, depending on whether it came from the server
//            if (this.giftStart.gsid) {
//                this.updateGiftStart();
//            } else {
//                this.createGiftStart();
//            }
        }

    }]);

GiftStarterApp.controller('GiftStartController', [
            '$scope','GiftStartService','$location',
    function($scope,  GiftStartService,  $location) {

        $scope.giftStart = GiftStartService.giftStart;

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            GiftStartService.fetchGiftStart($location.search()['gs-id']);
        }

        // Update this giftstart when the service updates it
        $scope.$on('giftstart-loaded', function() {$scope.giftStart = GiftStartService.giftStart});
        $scope.$on('giftstart-updated', function() {$scope.giftStart = GiftStartService.giftStart});


        $scope.pitchIn = function() {GiftStartService.pitchIn()};

        $scope.selectionUpdated = function() {GiftStartService.updateSelected()}

}]);
