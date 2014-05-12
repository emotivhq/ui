/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('GiftStartService', [
            '$http','$location','FacebookService','$rootScope','$filter','PopoverService','$window',
    function($http,  $location,  FacebookService,  $rootScope,  $filter,  PopoverService,  $window) {

        this.giftStart = {};

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

        function buildGiftStart(title, description, championUid, productImgUrl, productPrice, productUrl,
                                parts, rows, columns, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                                shippingCity, shippingState, shippingZip, shippingPhoneNumber) {
            var gs = {
                title: title,
                description: description,
                gift_champion_uid: championUid,
                product: {
                    price: 100*productPrice,
                    img_url: productImgUrl,
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
            return gs;
        }

        function injectPartToggles(giftstart) {
            function makePartToggle(i) {
                var ti = i;
                return function () {
                    if (!giftstart.parts[ti].bought) {
                        // If selected is none, this will force it into a bool
                        giftstart.parts[ti].selected = (giftstart.parts[ti].selected == false);
                        self.updateSelected();
                    }
                }
            }

            for (var i = 0; i < giftstart.parts.length; i++) {
                giftstart.parts[i].toggle = makePartToggle(i);
            }
        }

        this.stageGiftStart = function(title, description, productImgUrl, productPrice, productUrl,
                                       numRows, numCols, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                                       shippingCity, shippingState, shippingZip, shippingPhoneNumber) {
            var x = numRows, y = numCols;
            var tempParts = [];
            for (var i = 0; i < x*y; i++) {
                tempParts.push({
                    bought: false,
                    selected: false,
                    part_id: i,
                    value: productPrice/x/y
                });
            }
            self.stagedGiftStart = buildGiftStart(title, description, -1, productImgUrl, productPrice,
                productUrl, tempParts, numRows, numCols, gcPhoneNumber, gcEmail, shippingName, shippingAddress,
                shippingCity, shippingState, shippingZip, shippingPhoneNumber);
        };

        this.fireGiftStartCreate = function() {
            self.giftStart = self.stagedGiftStart;
            self.giftStart.gift_champion_uid = FacebookService.uid;
            $location.path('/giftstart');
            self.createGiftStart();
        };

        this.enableGiftStart = function() {
            injectPartToggles(self.giftStart);
            self.updateSelected();
            self.prepareComments();
        };

        this.createGiftStart = function() {
            $http({method: 'POST', url: '/giftstart/api',
                data: {giftstart: self.giftStart, action: 'create'}})
                .success(this.fetchSuccess)
                .error(this.createFailure);
        };

        this.createFailure = function() {console.log("Failed to create GiftStart.")};

        this.updateSelected = function() {
            self.giftStart.remaining = 0;
            self.giftStart.totalSelection = 0;
            for (var i=0; i < self.giftStart.parts.length; i++) {
                if (self.giftStart.parts[i].selected) {
                    self.giftStart.totalSelection += self.giftStart.parts[i].value;
                } else if (!self.giftStart.parts[i].bought) {
                    self.giftStart.remaining += self.giftStart.parts[i].value;
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
            self.giftStart = data['giftstart'];
            self.enableGiftStart();
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

        this.saveNote = function(noteText) {self.payment.note = noteText};

        this.attachStripeResponse = function(response) {
            self.payment.stripeResponse = response;
            self.payment.gsid = self.giftStart.gsid;
            self.payment.parts = [];
            for (var i=0; i < self.giftStart.parts.length; i++) {
                if (self.giftStart.parts[i].selected) {
                    self.payment.parts.push(self.giftStart.parts[i].part_id);
                }
            }
        };

        this.sendPayment = function() {
            var data = {payment: self.payment, action: 'pitch-in', uid: FacebookService.uid};
            $http({method: 'POST', url: '/pay',
                data: data})
                .success(self.paymentSuccess)
                .error(self.paymentFailure);
        };

        this.paymentSuccess = function(data) {
            var purchasedParts = data['purchased-parts'];
            for (var i = 0; i < purchasedParts.length; i++) {
                var index = purchasedParts[i] % self.giftStart.columns;
                self.giftStart.parts[index]['bought'] = true;
                self.giftStart.parts[index]['selected'] = false;
                self.giftStart.parts[index]['img'] = 'http://storage.googleapis.com/giftstarter-pictures/u/' +
                    FacebookService.uid + '.jpg';
            }
            self.updateSelected();
        };

        this.paymentFailure = function() {console.log("Pitch-in failed!")};

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

            function syncCheckCallback(data) {
                if (data.parts.length > 0) {
                    // Parts need to be updated!
                    updateFromParts(data.parts);
                    self.giftStart.comments = data.comments;
                    self.prepareComments();
                }
            }

            function updateFromParts(parts) {
                for (var i = 0; i < parts.length; i++) {
                    if (self.giftStart.parts[i].bought != parts[i].bought) {
                        self.giftStart.parts[i].bought = parts[i].bought;
                        if (parts[i].bought) {
                            self.giftStart.parts[i].selected = false;
                            self.giftStart.parts[i].img = parts[i].img;
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
        };

        // Check if giftstart was sent with page on init load
        if ($window.GIFTSTART) {
            self.giftStart = $window.GIFTSTART.giftstart;
            $rootScope.$broadcast('giftstart-loaded');
            self.enableGiftStart();
        }

    }
]);

GiftStarterApp.controller('GiftStartController', [
            '$scope','GiftStartService','$location','$interval','FacebookService',
    function($scope,  GiftStartService,  $location,  $interval,  FacebookService) {

        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = 0;

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.\n\nhttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            if (GiftStartService.giftStart.gsid == undefined) {
                GiftStartService.fetchGiftStart($location.search()['gs-id']);
            }
        }


        if (GiftStartService.giftStart.gsid != undefined) {
            $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
            $interval($scope.updateSecondsLeft, 1000);
        } else {
            // Update this giftstart when the service updates it
            $scope.$on('giftstart-loaded', function() {
                $scope.giftStart = GiftStartService.giftStart;
                $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
                $interval($scope.updateSecondsLeft, 1000);
            });
            $scope.$on('giftstart-updated', function() {$scope.giftStart = GiftStartService.giftStart});
        }

        // Synchronize parts on mouse activity
        $scope.mouseActivityCallback = function(source) {GiftStartService.syncParts(source)};
        $scope.pitchInHoverCallback = function() {GiftStartService.syncParts('pitch-in-hover')};

        $scope.pitchIn = GiftStartService.pitchIn;

        $scope.updateSecondsLeft = function() {
            if ($scope.secondsLeft > 0) {
                $scope.secondsLeft -= 1;

                var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
                var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);

                $scope.countdown = days + " days, " + hours + " hours" ;//+ ":" + minutes + ":" + seconds;
            }
        };
        $scope.updateSecondsLeft();

        $scope.facebookSend = function() {FacebookService.inviteFriends()};

}]);
