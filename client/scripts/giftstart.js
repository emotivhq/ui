/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('GiftStartService', [
            '$http','$location','FacebookService','$rootScope','$filter','PopoverService','$window',
    function($http,  $location,  FacebookService,  $rootScope,  $filter,  PopoverService,  $window) {

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

        this.stagedGiftStart = {};

        this.lastCheckedMilliseconds = new Date().getTime();
        this.updateInterval = 3*1000;

        var self = this;

//        this.initiateGiftStart = function(title, description, productImgUrl, imageHeight, productPrice, productUrl,
//                                          numRows, numCols, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
//                                          shippingCity, shippingState, shippingZip, shippingPhoneNumber) {
//            var x = numRows, y = numCols;
//            var tempParts = [];
//            for (var j = 0; j < y; j++) {
//                var newParts = [];
//                for (var i = 0; i < x; i++) {
//                    newParts.push({
//                        bought: false,
//                        selected: false,
//                        part_id: j*x+i,
//                        value: productPrice/x/y
//                    });
//                }
//                tempParts.push(newParts);
//            }
//            self.giftStart = buildGiftStart(title, description, FacebookService.uid, productImgUrl, imageHeight,
//                productPrice, productUrl, tempParts, y, x, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
//                shippingCity, shippingState, shippingZip, shippingPhoneNumber);
//            self.updateSelected();
//            $location.path('/giftstart');
//            self.createGiftStart();
//        };

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

        this.stageGiftStart = function(title, description, productImgUrl, imageHeight, productPrice, productUrl,
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
            self.stagedGiftStart = buildGiftStart(title, description, -1, productImgUrl, imageHeight, productPrice,
                productUrl, tempParts, numRows, numCols, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                shippingCity, shippingState, shippingZip, shippingPhoneNumber);
        };

        this.fireGiftStartCreate = function() {
            self.giftStart = self.stagedGiftStart;
            self.giftStart.gift_champion_uid = FacebookService.uid;
            self.updateSelected();
            $location.path('/giftstart');
            self.createGiftStart();
        };

        this.createGiftStart = function() {
            $http({method: 'POST', url: '/giftstart/api',
                data: {giftstart: self.giftStart, action: 'create'}})
                .success(this.createSuccess)
                .error(this.createFailure);
        };

        this.createSuccess = function(data) {
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

        this.createFailure = function() {console.log("Failed to create GiftStart.")};

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
            self.giftStart.remaining = 0;
            self.giftStart.totalSelection = 0;
            for (var j=0; j < self.giftStart.parts.length; j++) {
                for (var i=0; i < self.giftStart.parts[j].length; i++) {
                    if (self.giftStart.parts[j][i].selected) {
                        self.giftStart.totalSelection += self.giftStart.parts[j][i].value;
                    } else if (!self.giftStart.parts[j][i].bought) {
                        self.giftStart.remaining += self.giftStart.parts[j][i].value;
                    }
                }
            }
        };

        this.fetchGiftStart = function(gsid) {
            $http({method: 'POST', url: '/giftstart/api',
                data: {giftstart_id: gsid, action: 'get'}})
                .success(this.fetchSuccess)
                .error(function (){console.log("Failed to fetch GiftStart.");});
        };

        this.fetchSuccess = function(data) {
            console.log(data);
            self.giftStart = data['giftstart'];
            self.updateSelected();
            self.prepareComments();
            injectPartToggles(self.giftStart);
            $rootScope.$broadcast('giftstart-loaded');
            $location.search('gs-id', self.giftStart.gsid);
        };

        this.prepareComments = function() {
            for (var i = 0; i < self.giftStart.comments.length; i++) {
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var date = new Date(1000 * self.giftStart.comments[i].timestamp);
                self.giftStart.comments[i].timestampString = months[date.getMonth()] + " " + date.getDate() + ", " +
                    ((date.getHours() - 1) % 12) + ":" + ('0' + date.getMinutes()).slice(-2) + " " +
                    (date.getHours() >= 12 ? 'PM' : 'AM');
            }
        };


        this.saveNote = function(noteText) {
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

        // Check if giftstart was sent with page on init load
        if ($window.GIFTSTART) {
            self.giftStart = $window.GIFTSTART.giftstart;
            $rootScope.$broadcast('giftstart-loaded');
            self.updateSelected();
            injectPartToggles(self.giftStart);
        }

    }
]);

GiftStarterApp.controller('GiftStartController', [
            '$scope','GiftStartService','$location','$interval','FacebookService',
    function($scope,  GiftStartService,  $location,  $interval,  FacebookService) {

        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = 0;

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            if (GiftStartService.giftStart.gsid == undefined) {
                console.log("fetching giftstart");
                GiftStartService.fetchGiftStart($location.search()['gs-id']);
            }
        }

        // Update this giftstart when the service updates it
        $scope.$on('giftstart-loaded', function() {
            $scope.giftStart = GiftStartService.giftStart;
            $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
            $interval($scope.updateSecondsLeft, 1000);
        });
        $scope.$on('giftstart-updated', function() {$scope.giftStart = GiftStartService.giftStart});

        // Synchronize parts on mouse activity
        $scope.mouseActivityCallback = function(source) {GiftStartService.syncParts(source)};
        $scope.pitchInHoverCallback = function() {GiftStartService.syncParts('pitch-in-hover')};

        $scope.pitchIn = GiftStartService.pitchIn;

        $scope.updateSecondsLeft = function() {
            if ($scope.secondsLeft > 0) {
                $scope.secondsLeft -= 1;

                var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
                var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);
                var minutes = Math.floor(($scope.secondsLeft / 60) % 60).toFixed(0);
                var seconds = Math.floor($scope.secondsLeft % 60).toFixed(0);

                $scope.countdown = days + "days, " + hours + " hours" ;//+ ":" + minutes + ":" + seconds;
            }
        };
        $scope.updateSecondsLeft();

        $scope.facebookSend = function() {FacebookService.inviteFriends()};

}]);
