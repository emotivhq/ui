/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('GiftStartService', [
    '$http','$location','UserService','$rootScope', 'PopoverService','$window',
    'Analytics','AppStateService','$resource', '$timeout',
     GiftStartService]);

function GiftStartService($http,  $location,  UserService,  $rootScope,
                          PopoverService,  $window,  Analytics,
                          AppStateService, $resource, $timeout) {

    var GiftStart = $resource('/giftstart/:key.json');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    newPitchIns;

    this.giftStart = {};

    this.payment = {
        gsid: -1,
        parts: [],
        note: '',
        stripeResponse: {},
        emailAddress: '',
        subscribe: false
    };

    this.pitchIns = [];
    this.pitchInsInitialized = false;

    this.lastCheckedMilliseconds = new Date().getTime();
    this.updateInterval = 3*1000;

    // Shipping/Contact Info
    this.shippingName = '';
    this.shippingEmail = '';
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
    this.coupon = '';
    this.specialNotes = '';
    this.productImgUrl = '';
    this.productTitle = '';
    this.retailerLogo = '';
    this.rows = 3;
    this.columns = 3;
    this.productPrice = 0;
    this.salesTax = 0;
    this.shipping = 0;
    this.serviceFee = 0;
    this.totalPrice = 0;
    this.campaignLength = 0;

    // Thanks data
    this.thanks_img = {};

    // Restore from state
    this.preselectedParts = [];
    if (AppStateService.get('selectedParts')) {
        this.preselectedParts = AppStateService.get('selectedParts');
        AppStateService.remove('selectedParts');
    }
    $rootScope.$on('giftstart-loaded', restartPitchin);

    var self = this;

    var linkReplacerRegex = /(https?:\/\/(([-\w\.]+)+(:\d+)?(\/([-\w\/_\.]*(\?\S+)?)?)?))/g;

    this.makeLinks = function() {
        jQuery('.makelinks').each(function() {
            var thishtml=jQuery(this).html();
            if(thishtml.indexOf('<a')<0) {
                jQuery(this).html(thishtml.replace(linkReplacerRegex, "<a href=\"$1\" title=\"\" target=\"_blank\">$1</a>"));
            }
        })
    };

    this.createGiftStart = function() {
        console&&console.log&&console.log("createGiftStart");
        Analytics.track('campaign', 'created');
        // Check to see that name is populated (for fb-login it is not yet)
        if (!self.gcName) {self.gcName = UserService.name}

        self.giftStart = self.buildGiftStart();
        self.pitchInsInitialized = false;
        return $http({method: 'POST', url: '/giftstart/create.json',
            data: self.giftStart})
            .success(function(data) {
                self.inflateGiftStart(data);
            })
            .error(function(reason) {
                console && console.log && console.log(reason);
                Analytics.track('campaign', 'campaign create failed');
            });
    };

    this.buildGiftStart = function() {
        return {
            title: self.title,
            description: self.description,
            coupon: self.coupon,
            special_notes: self.specialNotes,
            gift_champion_uid: UserService.uid,
            product_price: self.productPrice,
            sales_tax: self.salesTax,
            shipping: self.shipping,
            service_fee: self.serviceFee,
            total_price: self.totalPrice,
            campaign_length: self.campaignLength,
            product_img_url: self.productImgUrl,
            product_url: self.productUrl,
            product_title: self.productTitle,
            retailer_logo: self.retailerLogo,
            totalSelection: 0,
            funded: 0,
            parts: self.makeParts(self.rows * self.columns, self.totalPrice),
            rows: self.rows,
            columns: self.columns,
            gc_phone_number: self.gcPhoneNumber,
            gc_email: self.gcEmail,
            gc_name: self.gcName,
            shipping_name: self.shippingName,
            shipping_email: self.shippingEmail,
            shipping_address: self.shippingAddress,
            shipping_city: self.shippingCity,
            shipping_state: self.shippingState,
            shipping_zip: self.shippingZip,
            shipping_phone_number: self.shippingPhoneNumber
        };
    };

    this.makeParts = function(numParts, totalPrice) {
        function injectPartToggles(parts) {
            function makePartToggle(i) {
                var ti = i;
                return function () {
                    if (!parts[ti].bought && !parts[ti].disabled) {
                        // If selected is none, this will force it into a bool
                        parts[ti].selected = (parts[ti].selected == false);
                        Analytics.track('campaign', 'overlay part toggled');
                        self.updateSelected();
                    }
//                        if (parts[ti].bought) {
//                            Analytics.track('client',
//                                'go to user page from overlay');
//                            self.goToUserPage(parts[ti].uid);
//                        }
                }
            }

            for (var i = 0; i < parts.length; i++) {
                parts[i].toggle = makePartToggle(i);
            }
        }

        var tempParts = [];
        for (var i = 0; i < numParts; i++) {
            var selected = self.preselectedParts.indexOf(i) > -1;
            tempParts.push({
                bought: false,
                disabled: false,
                selected: selected,
                part_id: i,
                value: Math.floor(totalPrice/numParts)
            });
        }

        injectPartToggles(tempParts);

        return tempParts;
    };

    this.disableParts = function() {
        function disablePart(part) {part.disabled = !part.bought;}
        self.giftStart.parts.map(disablePart);
    };

    function getSelectedParts() {
        var selected = [];
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                selected.push(i);
            }
        }
        return selected;
    }

    this.updateSelected = function() {
        self.giftStart.totalSelection = 0;
        self.giftStart.remaining = 0;
        self.giftStart.funded = 0;
        self.giftStart.parts.map(function(part) {
            self.giftStart.totalSelection += part.value * part.selected;
            self.giftStart.remaining += part.value *
                !(part.selected || part.bought);
            self.giftStart.funded += part.value * part.bought;
        });
        AppStateService.overlayState(getSelectedParts());
        $rootScope.$broadcast('selection-changed');
    };

    this.fetchGiftStart = function(url_title) {
        console && console.log && console.log("fetchGiftStart: "+url_title);
        function fetchSuccess(data) {self.inflateGiftStart(data)}
        function fetchError(reason) {Analytics.track('campaign',
            'campaign fetch failed')}
        $http({method: 'GET', url: '/giftstart/' + url_title + '.json'})
            .success(function(data) {self.inflateGiftStart(data)})
            .error(function(){Analytics.track('campaign',
                'campaign fetch failed')});
    };

    this.inflateGiftStart = function(giftstart) {
        console && console.log && console.log("inflateGiftStart "+giftstart.giftstart_url_title);
        Analytics.track('campaign', 'campaign enabled');

        self.giftStart = giftstart;

        self.giftStart.parts = self.makeParts(self.giftStart.rows *
                self.giftStart.columns,
            self.giftStart.total_price);
        self.updateSelected();

        if (!(/\/giftstart\//.test($location.path()))) {
            console && console.log && console.log(location.pathname);
            $location.path('/giftstart/' + giftstart.giftstart_url_title);
        }

        self.syncPitchIns('GiftStartService');

        setTimeout(self.makeLinks,2000);

        $rootScope.$broadcast('giftstart-loaded');
    };

    this.saveNote = function(noteText) {
        self.payment.note = noteText;
        var data = {payment: self.payment, action: 'pitch-in-note-update',
            uid: UserService.uid};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.saveImage = function(imageUrl) {
        var data = {payment: self.payment, action: 'pitch-in-img-update',
            uid: UserService.uid, imgurl:imageUrl};
        return $http({method: 'POST', url: '/pay', data: data})
    };

    this.uploadImage = function(imageData) {
        var contentType = imageData.split(';')[0].replace('data:', '');
        var data = {payment: self.payment, action: 'pitch-in-img-upload',
            uid: UserService.uid, contenttype: contentType, imgdata: imageData};
        return $http({method: 'POST', url: '/pay', data: data})
    };

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

    this.attachCardData = function(number,cvc,expiry,addressZip) {
        console.log(number+"|"+cvc+"|"+expiry+"|"+addressZip)
        self.payment.cardData = {number:number,cvc:cvc,expiry:expiry,zip:addressZip};
        self.payment.gsid = self.giftStart.gsid;
        self.payment.parts = [];
        for (var i=0; i < self.giftStart.parts.length; i++) {
            if (self.giftStart.parts[i].selected) {
                self.payment.parts.push(self.giftStart.parts[i].part_id);
            }
        }
    };

    this.sendPayment = function(callback) {
        var data = {payment: self.payment, action: 'pitch-in',
            uid: UserService.uid};
        if (self.payment.subscribe) {
            Analytics.track('pitchin', 'subscribed to mailing list');
        }
        if (self.payment.saveCreditCard) {
            Analytics.track('pitchin', 'save credit card');
        }
        $http({method: 'POST', url: '/pay',
            data: data})
            .success(function(data) {
                self.paymentSuccess(data);
                if (callback) {callback(data)}
            })
            .error(function(data) {
                self.paymentFailure(data);
                if (callback) {callback(data)}
            });
    };

    this.payWithFingerprint = function(fingerprint) {
        self.attachStripeResponse('');
        return $http({method: 'POST', url: '/pay',
            data: {fingerprint: fingerprint, action: 'pitch-in',
                subscribe: self.payment.subscribe, payment: self.payment,
                uid: UserService.uid}})
            .success(self.paymentSuccess)
            .error(self.paymentFailure);
    };

    this.showOverlay = function() {$rootScope.$broadcast('show-overlay');};
    this.hideOverlay = function() {$rootScope.$broadcast('hide-overlay');};

    this.paymentSuccess = function(data) {
        if (!data['payment-error']) {
            self.syncPitchIns('GiftStartService');
            self.updateSelected();
            $rootScope.$broadcast('payment-success');
        }
    };

    this.paymentFailure = function(data) {console && console.log && console.log("Pitch-in failed!: "+data)};

    this.updateCampaign = function(newTitle, newDescription, newImage,
                                   newGcName) {
        if (newTitle || newDescription || newImage) {
            var newgs = {};
            if (newTitle) {
                newgs.title = newTitle;
            }
            if (newDescription) {
                newgs.description = newDescription;
            }
            if (newImage) {
                newgs.image = newImage;
            }
            if (newGcName) {
                newgs.gc_name = newGcName;
            }
        }
        Analytics.track('campaign', 'campaign update sent');

        $http({method: 'POST', url: '/giftstart/' +
            self.giftStart.giftstart_url_title + '.json', data: newgs})
            .success(function(response) {
                Analytics.track('campaign', 'campaign update succeeded');
                if (response.title) {
                    self.giftStart.title = response.title;
                }
                if (response.description) {
                    self.giftStart.description = response.description;
                }
                if (response.product_img_url) {
                    self.giftStart.product_img_url =
                        response.product_img_url + '#' +
                        new Date().getTime();
                }
                if (response.gc_name) {
                    self.giftStart.gc_name = response.gc_name;
                }
                $rootScope.$broadcast('giftstart-updated');
            })
            .error(function() {Analytics.track('campaign', 'campaign update failed')})
    };

    this.setThanksImage = function(img) {self.thanksImage = img};

    this.updateThanks = function(message) {
        var url = '/thanks';
        if ($location.search().thanks) {
            url += '-' + $location.search().thanks;
        }

        var data = {
            message: message, img: self.thanksImage, gsid: self.giftStart.gsid,
            url_title: self.giftStart.giftstart_url_title
        };
        if (UserService.uid != -1) {data.uid = UserService.uid;}

        return $http({method: 'PUT', url: url, data: data});
    };

    this.goToUserPage = function(uid) {
        $location.path('u').search('').search('uid', uid);
    };

    this.pitchIn = function() {
        // Ensure they have selected more than $0 of the gift to pitch in
        if (self.giftStart.totalSelection > 0) {
            Analytics.track('pitchin', 'pitchin button clicked');
            PopoverService.contributeLogin = true;
            AppStateService.set('contributeLogin', true);
            PopoverService.setPopover('login');
        } else {console && console.log && console.log("Nothing selected!")}
    };

    function restartPitchin() {
        if (AppStateService.get('contributeLogin')) {
            AppStateService.remove('contributeLogin');
            self.pitchIn();
        }
    }

    function checkForSync() {
        $http({
            method: 'POST',
            url: '/pay',
            data: {action: 'get-pitch-ins', gsid: self.giftStart.gsid}
        })
            .success(syncCheckCallback)
            .error(function() {console && console.log && console.log("Failed to contact part sync.")})
    }

    function syncCheckCallback(pitchins) {
        updatePartsFromPitchIns(pitchins);
        formatPitchIns(pitchins);
        $rootScope.$broadcast('pitch-ins-updated');
    }

    function formatPitchIns(pitchins) {
        newPitchIns = pitchins;
        var i, len, date;
        for (i = 0, len = newPitchIns.length; i < len; i++) {
            date = new Date(1000 * pitchins[i].timestamp);
            newPitchIns[i].timestampString = months[date.getMonth()] +
                " " + date.getDate() + ", " +
                ((date.getHours() - 1) % 12) + ":" +
                ('0' + date.getMinutes()).slice(-2) + " " +
                (date.getHours() >= 12 ? 'PM' : 'AM');
        }
        newPitchIns.sort(function(a, b) {return b.timestamp - a.timestamp});
        if (self.pitchIns.length === 0) {
            angular.forEach(newPitchIns, function(newPitchIn) {
                this.push(newPitchIn);
            }, self.pitchIns);
        }
        else if(newPitchIns.length > self.pitchIns.length) {
            self.pitchIns.push(newPitchIns[0]);
        }
    }

    function updatePartsFromPitchIns(pitchins) {
        for (var i = 0; i < self.giftStart.parts.length; i++) {
            self.giftStart.parts[i].bought = false;
            self.giftStart.parts[i].img = '';
            self.giftStart.parts[i].uid = '';
        }
        for (i = 0; i < pitchins.length; i++) {
            for (var j = 0; j < pitchins[i].parts.length; j++) {
                var partId = pitchins[i].parts[j];
                self.giftStart.parts[partId].bought = true;
                self.giftStart.parts[partId].selected = false;
                self.giftStart.parts[partId].img = pitchins[i].img;
                self.giftStart.parts[partId].uid = pitchins[i].uid;
            }
        }
        if (!Boolean(self.pitchInsInitialized)) {
            self.pitchInsInitialized = true;
            $rootScope.$broadcast('pitch-ins-initialized');
        }
        self.updateSelected();
    }

    function updateLastChecked() {
        self.lastCheckedMilliseconds = new Date().getTime();
    }

    this.syncPitchIns = function(source) {
        console&&console.log&&console.log("syncPitchIns: "+source);
        if (self.giftStart.gsid) {
            if (source == 'pitch-in-hover' || source == 'GiftStartService') {
                // User hovered pitch-in button, need to update immediately
                checkForSync();
                updateLastChecked();
            } else if (!self.pitchInsInitialized) {
                checkForSync();
                updateLastChecked();
             }
        }
    };

    // Sync pitchins on route change (navigation, back, etc.)
    $rootScope.$on('$routeChangeSuccess', function() {
        AppStateService.setPath($location.path());
        self.pitchInsInitialized = false;
        var path = $location.path();
        if (path.indexOf("/giftstart/")>=0) {
            var urlTitle = path.split('/')[2];
            if (urlTitle != undefined) {
                self.fetchGiftStart(urlTitle);
            }
        }
    });

    // Check if giftstart was sent with page on init load
    if ($window.GIFTSTART) {
        self.inflateGiftStart($window.GIFTSTART);
        $rootScope.$broadcast('giftstart-loaded');
    }

}
