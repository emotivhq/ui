/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('GiftStartService', [
            '$http','$location','UserService','$rootScope','$filter','PopoverService','$window',
    function($http,  $location,  UserService,  $rootScope,  $filter,  PopoverService,  $window) {

        this.giftStart = {};

        this.payment = {
            gsid: -1,
            parts: [],
            note: '',
            stripeResponse: {},
            emailAddress: ''
        };

        this.pitchIns = [];
        this.pitchInsInitialized = false;

        this.lastCheckedMilliseconds = new Date().getTime();
        this.updateInterval = 3*1000;

        // Shipping/Contact Info
        this.shippingName = '';
        this.shippingAddress = '';
        this.shippingCity = '';
        this.shippingState = '';
        this.shippingZip = '';
        this.shippingPhoneNumber = '';
        this.shippingEmail = '';
        this.gcName = '';
        this.gcPhoneNumber = '';
        this.gcEmail = '';

        // Campaign Details
        this.title = '';
        this.description = '';
        this.specialNotes = '';
        this.productImgUrl = '';
        this.rows = 3;
        this.columns = 3;
        this.productPrice = 0;
        this.salesTax = 0;
        this.shipping = 0;
        this.serviceFee = 0;
        this.totalPrice = 0;

        var self = this;

        function buildGiftStart() {
            return {
                title: self.title,
                description: self.description,
                special_notes: self.specialNotes,
                gift_champion_uid: UserService.uid,
                product: {
                    price: self.productPrice,
                    sales_tax: self.salesTax,
                    shipping: self.shipping,
                    service_fee: self.serviceFee,
                    total_price: self.totalPrice,
                    img_url: self.productImgUrl,
                    product_url: self.productUrl
                },
                totalSelection: 0,
                parts: makeParts(self.rows * self.columns, self.totalPrice),
                rows: self.rows,
                columns: self.columns,
                gc_phone_number: self.gcPhoneNumber,
                gc_email: self.gcEmail,
                shipping_name: self.shippingName,
                shipping_address: self.shippingAddress,
                shipping_city: self.shippingCity,
                shipping_state: self.shippingState,
                shipping_zip: self.shippingZip,
                shipping_phone_number: self.shippingPhoneNumber
            };
        }

        function makeParts(numParts, totalPrice) {
            function injectPartToggles(parts) {
                function makePartToggle(i) {
                    var ti = i;
                    return function () {
                        if (!parts[ti].bought && !parts[ti].disabled) {
                            // If selected is none, this will force it into a bool
                            parts[ti].selected = (parts[ti].selected == false);
                            self.updateSelected();
                        }
                    }
                }

                for (var i = 0; i < parts.length; i++) {
                    parts[i].toggle = makePartToggle(i);
                }
            }

            var tempParts = [];
            for (var i = 0; i < numParts; i++) {
                tempParts.push({
                    bought: false,
                    disabled: false,
                    selected: false,
                    part_id: i,
                    value: totalPrice/numParts
                });
            }

            injectPartToggles(tempParts);

            return tempParts;
        }

        this.disableParts = function() {
            function disablePart(part) {part.disabled = !part.bought;}
            self.giftStart.parts.map(disablePart);
        };

        this.createGiftStart = function() {
            mixpanel.track("GiftStart created");
            ga('send', 'event', 'campaign', 'created');
            self.giftStart = buildGiftStart();
            $location.path('/giftstart');
            self.pitchInsInitialized = false;
            $http({method: 'POST', url: '/giftstart/api',
                data: {giftstart: self.giftStart, action: 'create'}})
                .success(self.fetchSuccess)
                .error(self.createFailure);
        };

        this.enableGiftStart = function() {
            console.log("Enabling GiftStart");
            self.giftStart.parts = makeParts(self.giftStart.rows * self.giftStart.columns,
                self.giftStart.product.total_price);
            console.log("Updating selected");
            self.updateSelected();
            console.log("Parts made");
            self.syncPitchIns('GiftStartService');
            console.log("Current GSID: " + self.giftStart.gsid);
            console.log("Pitchins synced");
        };

        this.createFailure = function() {console.log("Failed to create GiftStart.")};

        this.updateSelected = function() {
            self.giftStart.totalSelection = 0;
            self.giftStart.remaining = 0;
            self.giftStart.parts.map(function(part) {
                self.giftStart.totalSelection += part.value * part.selected;
                self.giftStart.remaining += part.value * !(part.selected || part.bought);
            });
        };

        this.fetchGiftStart = function(gsid) {
            $http({method: 'POST', url: '/giftstart/api',
                data: {gsid: gsid, action: 'get'}})
                .success(self.fetchSuccess)
                .error(function (){console.log("Failed to fetch GiftStart.");});
        };

        this.fetchSuccess = function(data) {
            mixpanel.track("GiftStart fetched");
            ga('send', 'event', 'campaign', 'fetched');
            self.giftStart = data['giftstart'];
            self.enableGiftStart();
            $rootScope.$broadcast('giftstart-loaded');
            $location.search('gs-id', self.giftStart.gsid);
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

        this.sendPayment = function(callback) {
            var data = {payment: self.payment, action: 'pitch-in', uid: UserService.uid};
            $http({method: 'POST', url: '/pay',
                data: data})
                .success(self.paymentSuccess)
                .error(self.paymentFailure);
        };

        this.paymentSuccess = function() {
            self.syncPitchIns('GiftStartService');
            self.updateSelected();
            $rootScope.$broadcast('payment-success');
        };

        this.paymentFailure = function() {console.log("Pitch-in failed!")};

        this.pitchIn = function() {
            // Ensure they have selected more than $0 of the gift to pitch in
            if (self.giftStart.totalSelection > 0) {
                mixpanel.track("Pitch in started");
                ga('send', 'event', 'pitch-in', 'started');
                PopoverService.contributeLogin = true;
                PopoverService.nextPopover();
            } else {console.log("Nothing selected!")}
        };

        function checkForSync() {
            console.log("check for sync");
            $http({
                method: 'POST',
                url: '/pay',
                data: {action: 'get-pitch-ins', gsid: self.giftStart.gsid}
            })
                .success(syncCheckCallback)
                .error(function() {console.log("Failed to contact part sync service.")})
        }

        function syncCheckCallback(pitchins) {
            console.log("syncCheckCallback");
            updatePartsFromPitchIns(pitchins);
            formatPitchIns(pitchins);
            $rootScope.$broadcast('pitch-ins-updated');
        }

        function formatPitchIns(pitchins) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var newPitchIns = pitchins;
            for (var i = 0; i < newPitchIns.length; i++) {
                var date = new Date(1000 * pitchins[i].timestamp);
                newPitchIns[i].img = 'http://storage.googleapis.com/giftstarter-pictures/u/' +
                    pitchins[i].uid + '.jpg';
                newPitchIns[i].timestampString = months[date.getMonth()] + " " + date.getDate() + ", " +
                    ((date.getHours() - 1) % 12) + ":" + ('0' + date.getMinutes()).slice(-2) + " " +
                    (date.getHours() >= 12 ? 'PM' : 'AM');
            }
            newPitchIns.sort(function(a, b) {return b.timestamp - a.timestamp});
            self.pitchIns = newPitchIns;
        }

        function updatePartsFromPitchIns(pitchins) {
            console.log("updatePartsFromPitchIns");
            for (var i = 0; i < pitchins.length; i++) {
                for (var j = 0; j < pitchins[i].parts.length; j++) {
                    var partId = pitchins[i].parts[j];
                    if (!self.giftStart.parts[partId].bought) {
                        self.giftStart.parts[partId].bought = true;
                        self.giftStart.parts[partId].selected = false;
                        self.giftStart.parts[partId].img = 'http://storage.googleapis.com/giftstarter-pictures/u/' +
                            pitchins[i].uid + '.jpg';
                    }
                }
            }
            if (!self.pitchInsInitialized) {
                console.log("Pitchins initialized!!!!!");
                self.pitchInsInitialized = true;
                $rootScope.$broadcast('pitch-ins-initialized');
            }
            self.updateSelected();
        }

        function updateLastChecked() {self.lastCheckedMilliseconds = new Date().getTime();}

        this.syncPitchIns = function(source) {
            console.log("syncPitchIns");
            if (self.giftStart.gsid) {
                console.log("if self.giftstart.gsid");
                if (source == 'pitch-in-hover' || source == 'GiftStartService') {
                    // User hovered pitch-in button, need to update immediately
                    checkForSync();
                    updateLastChecked();
                } else if (!self.pitchInsInitialized) {
                    console.log("!self.pitchInsInitialized");
                    checkForSync();
                    updateLastChecked();
                } else {
                    console.log("else pitch in init");
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
            '$scope','GiftStartService','$location','$timeout','FacebookService',
    function($scope,  GiftStartService,  $location,  $timeout,  FacebookService) {

        $scope.giftStart = GiftStartService.giftStart;
        $scope.pitchIns = GiftStartService.pitchIns;
        $scope.secondsLeft = 0;

        $scope.mailSubject = "Check out this awesome GiftStarter campaign!";
        $scope.mailBody= "Seriously, it's the bee's knees.%0D%0A%0D%0Ahttp://www.giftstarter.co/giftstart?gs-id="
            + GiftStartService.giftStart.gsid;

        if(typeof($location.search()['gs-id']) === typeof("string")) {
            if (GiftStartService.giftStart.gsid == undefined) {
                GiftStartService.fetchGiftStart($location.search()['gs-id']);
            }
        }

        $scope.$on('pitch-ins-initialized', function() {$scope.pitchInsInitialized = true});

        $scope.$on('pitch-ins-updated', function() {$scope.pitchIns = GiftStartService.pitchIns});

        if (GiftStartService.giftStart.gsid != undefined) {
            $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
            $timeout($scope.updateSecondsLeft, 1000);
        } else {
            // Update this giftstart when the service updates it
            $scope.$on('giftstart-loaded', function() {
                $scope.giftStart = GiftStartService.giftStart;
                $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
                $timeout($scope.updateSecondsLeft, 1000);
            });
            $scope.$on('giftstart-updated', function() {$scope.giftStart = GiftStartService.giftStart});
        }

        // Synchronize parts on mouse activity
        $scope.mouseActivityCallback = function(source) {GiftStartService.syncPitchIns(source)};
        $scope.pitchInHoverCallback = function() {GiftStartService.syncPitchIns('pitch-in-hover')};

        $scope.pitchIn = GiftStartService.pitchIn;

        $scope.updateSecondsLeft = function() {
            if ($scope.secondsLeft > 0) {
                $scope.secondsLeft -= 1;

                var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
                var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);

                $scope.countdown = days + " days, " + hours + " hours" ;//+ ":" + minutes + ":" + seconds;
                $timeout($scope.updateSecondsLeft, 1000);
            } else {
                $scope.countdown = "Campaign Complete";
                GiftStartService.disableParts();
            }
        };

        $scope.updateSecondsLeft();

        $scope.facebookSend = function() {FacebookService.inviteFriends()};

}]);
