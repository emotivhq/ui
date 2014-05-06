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
                product_url: ''
            },
            parts: [],
            rows: -1,
            columns: -1
        };

        this.payment = {
            gsid: -1,
            parts: [],
            note: '',
            stripeResponse: {}
        };

        this.lastCheckedMilliseconds = new Date().getTime();
        this.updateInterval = 3*1000;

        var self = this;

        this.initiateGiftStart = function(title, description, productImgUrl, imageHeight, productPrice, productUrl,
                                          numRows, numCols, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                                          shippingCity, shippingState, shippingZip, shippingPhoneNumber) {
            var x = numRows, y = numCols;
            var tempParts = [];
            for (var j = 0; j < y; j++) {
                var newParts = [];
                for (var i = 0; i < x; i++) {
                    newParts.push({
                        bought: false,
                        selected: false,
                        part_id: j*x+i,
                        value: productPrice/x/y
                    });
                }
                tempParts.push(newParts);
            }
            self.giftStart = buildGiftStart(title, description, FacebookService.uid, productImgUrl, imageHeight,
                productPrice, productUrl, tempParts, y, x, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                shippingCity, shippingState, shippingZip, shippingPhoneNumber);
            $location.path('/giftstart');
        };

        function buildGiftStart(title, description, championUid, productImgUrl, imageHeight, productPrice, productUrl,
                                parts, rows, columns, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                                shippingCity, shippingState, shippingZip, shippingPhoneNumber) {
            var gs = {
                title: title,
                description: description,
                gift_champion_uid: championUid,
                product: {
                    price: 100*productPrice,
                    img_url: productImgUrl,
                    img_height: imageHeight,
                    product_url: productUrl
                },
                totalSelection: 0,
                parts: parts,
                rows: rows,
                columns: columns,
                gc_phone_number: gcPhoneNumber,
                gc_email: gcEmail,
                shipping_name: shippingName,
                shipping_address: shippingAddress,
                shipping_city: shippingCity,
                shipping_state: shippingState,
                shipping_zip: shippingZip,
                shipping_phone_number: shippingPhoneNumber
            };
            injectPartToggles(gs);
            return gs;
        }

        this.createGiftStart = function() {
            $http({method: 'POST', url: '/giftstart',
                data: {giftstart: self.giftStart, action: 'create'}})
                .success(this.createSuccess)
                .error(this.createFailure);
        };

        this.createSuccess = function(data, status, headers, config) {
            // TODO: need to save which parts are selected across server giftstart return
            var parts = JSON.parse(JSON.stringify(self.giftStart.parts));
            console.log(data);
            self.giftStart = data['giftstart'];
            self.giftStart.parts = parts;
            injectPartToggles(self.giftStart);
            self.updateSelected();
            $rootScope.$broadcast('giftstart-loaded');
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
                        giftstart.parts[tj][ti].selected = (giftstart.parts[tj][ti].selected == false);
                        self.updateSelected();
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
            self.payment.note = noteText;
        };

        this.attachStripeResponse = function(response) {
            self.payment.stripeResponse = response;
            self.payment.gsid = self.giftStart.gsid;
            self.payment.parts = [];
            for (var j=0; j < self.giftStart.parts.length; j++) {
                for (var i=0; i < self.giftStart.parts[j].length; i++) {
                    if (self.giftStart.parts[j][i].selected) {
                        self.payment.parts.push(self.giftStart.parts[j][i].part_id);
                    }
                }
            }
        };

        this.sendPayment = function() {
            var data = {payment: self.payment, action: 'pitch-in', uid: FacebookService.uid};
            console.log(data);
            $http({method: 'POST', url: '/pay',
                data: data})
                .success(self.paymentSuccess)
                .error(self.paymentFailure);
        };

        this.paymentSuccess = function(data) {
            var purchasedParts = data['purchased-parts'];
            for (var i = 0; i < purchasedParts.length; i++) {
                var x = purchasedParts[i] % self.giftStart.columns;
                var y = Math.floor(purchasedParts[i] / self.giftStart.columns);
                self.giftStart.parts[y][x]['bought'] = true;
                self.giftStart.parts[y][x]['selected'] = false;
                self.giftStart.parts[y][x]['img'] = 'http://storage.googleapis.com/giftstarter-pictures/u/' +
                    FacebookService.uid + '.jpg';
            }
            self.updateSelected();
        };

        this.paymentFailure = function() {
            console.log("Pitch-in failed!");
        };

        this.pitchIn = function() {
            // Ensure they have selected more than $0 of the gift to pitch in
            if (self.giftStart.totalSelection > 0) {
                PopoverService.nextPopover();
            } else {console.log("Nothing selected!")}
        };

        this.syncParts = function(source) {
            function checkForSync() {
                $http({
                    method: 'POST',
                    url: '/giftstart/sync',
                    data: {action: 'sync', gsid: self.giftStart.gsid, parts: self.giftStart.parts}
                })
                    .success(syncCheckCallback)
                    .error(function() {console.log("Failed to contact part sync service.")})
            }

            function syncCheckCallback(parts) {
                if (parts != []) {
                    // Parts need to be updated!
                    updateFromParts(parts);
                }
            }

            function updateFromParts(parts) {
                for (var j = 0; j < parts.length; j++) {
                    for (var i = 0; i < parts[j].length; i++) {
                        if (self.giftStart.parts[j][i].bought != parts[j][i].bought) {
                            self.giftStart.parts[j][i].bought = parts[j][i].bought;
                            if (parts[j][i].bought) {
                                self.giftStart.parts[j][i].selected = false;
                                self.giftStart.parts[j][i].img = parts[j][i].img;
                            }
                        }
                    }
                }
                self.updateSelected();
            }

            function updateLastChecked() {self.lastCheckedMilliseconds = new Date().getTime();}

            if (self.giftStart.gsid) {
                if (source == 'pitch-in-hover') {
                    // User hovered pitch-in button, need to update immediately
                    checkForSync();
                    updateLastChecked();
                } else {
                    // Update every N seconds upon user activity
                    var currentTime = new Date().getTime();
                    if (currentTime - self.lastCheckedMilliseconds > self.updateInterval) {
                        checkForSync();
                        updateLastChecked();
                    }
                }
            }
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

        // Synchronize parts on mouse activity
        $scope.mouseActivityCallback = function(source) {GiftStartService.syncParts(source)};
        $scope.pitchInHoverCallback = function() {GiftStartService.syncParts('pitch-in-hover')};

        $scope.pitchIn = GiftStartService.pitchIn;

}]);
