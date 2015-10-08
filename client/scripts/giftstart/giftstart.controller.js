/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */
GiftStarterApp.controller('GiftStartController', [
            '$scope', '$rootScope', 'GiftStartService', '$location', '$interval', '$timeout',
            'FacebookService', 'TwitterService', 'GooglePlusService', 'Analytics',
            'ProductService', 'UserService', 'AppStateService', '$window', '$document', '$http', 'PopoverService', 'LocalStorage',
    GiftStartController]);

function GiftStartController($scope, $rootScope, GiftStartService, $location, $interval, $timeout, FacebookService, TwitterService, GooglePlusService, Analytics, ProductService, UserService, AppStateService, $window, $document, $http, PopoverService, LocalStorage) {
    //alert('TBD: functionality and left-hand side (see Screen Shot 2015-05-29 at 11.14.12 PM')
    Analytics.track('campaign', 'controller created');
    $scope.giftStart = GiftStartService.giftStart;
    $scope.pitchIns = [];
    $scope.secondsLeft = 0;
    $scope.newTitle = $scope.giftStart.title;
    $scope.newDescription = $scope.giftStart.description;
    $scope.editingTitle = false;
    $scope.editingDescription = false;
    $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    $scope.pitchInsInitialized = false;
    $scope.pitchinButtonHoverMessage = 'Click on some grid pieces first!';
    $scope.isMobile = device.mobile();
    $scope.newUser = !UserService.hasPitchedIn;
    $scope.loggedIn = UserService.loggedIn;
    $scope.imageUpdated = imageUpdated;
    $scope.picEdit = false;
    $scope.picUploading = false;
    var currentComment;
    $scope.userId = UserService.uid;
    $scope.commentEditing = []; //keeping as array for one day when we can upload multiple images
    var imageData, commentName, commentImg, commentTxt;
    $scope.productMessage = '';
    $scope.isSavingForLater = false;
    $scope.showLoginBox = false;
    $scope.showPayBox = false;
    $scope.showSignBox = false;
    $scope.showShareBox = false;
    $scope.showShare = UserService.loggedIn && $location.hash() == "share-panel";

    function imageUpdated(data) {
        imageData = data;
    }
    $scope.showSharePanel = function (show) {
        $scope.showShareBox = false;
        $scope.showShare = show;
    };
    $scope.editingComment = function (comment, editing) {
        if(editing) { //edit mode on
            $scope.commentEditing.push(comment);
            commentName = comment.name;
            commentTxt = comment.note;
            commentImg = comment.img;
            currentComment = comment;
        } else if(!editing) { //saving edit
            $scope.picEdit = false;
            $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
            GiftStartService.updateComment(comment);
            currentComment = null;
        }
    };
    $scope.cancelEditComment = function (comment) {
        $scope.commentEditing.splice($scope.commentEditing.indexOf(comment), 1);
        comment.name = commentName;
        comment.note = commentTxt;
        comment.img = commentImg;
        $scope.picEdit = false;
    };
    $scope.isEditing = function (comment) {
        return $scope.commentEditing.indexOf(comment) != -1;
    };
    $scope.picSubmit = function () {
        $scope.picUploading = true;
        if(imageData) {
            currentComment.img = imageData;
            GiftStartService.updateCommentImage(currentComment, imageData).success(function (response) {
                console && console.log && console.log("pitchin image changed");
                Analytics.track('campaign', 'pitchin image update succeeded');
                currentComment.img = response;
                $rootScope.$broadcast('pitchin-image-changed', response);
                $scope.picUploading = false;
                imageData = null;
                var data = {
                    payment: currentComment,
                    action: 'pitch-in-img-update',
                    uid: currentComment.uid,
                    imgurl: currentComment.img
                };
                $http({
                    method: 'POST',
                    url: '/pay',
                    data: data
                });
            }).error(function () {
                Analytics.track('campaign', 'pitchin image update failed');
                $scope.picUploading = false;
                imageData = null;
            });
        }
        $scope.picEdit = false;
    };
    $scope.setPicEdit = function (edit) {
        $scope.picEdit = edit;
    };
    $scope.getTileCost = function () {
        return Math.floor($scope.giftStart.total_price / ($scope.giftStart.rows * $scope.giftStart.columns));
    };
    $rootScope.$on('paybox-hidden', function () {
        $scope.showPayBox = false;
        $scope.showSignBox = true;
    });
    $rootScope.$on('paybox-hidden-cancel', function () {
        $scope.showPayBox = false;
    });
    $rootScope.$on('signbox-hidden', function () {
        $scope.showSignBox = false;
        $scope.showShare = false;
        $scope.showShareBox = true;
    });
    $scope.shareBox = function (show) {
        $scope.showShareBox = show;
    };
    if($scope.giftStart.gc_name) {
        $scope.newGcName = $scope.giftStart.gc_name;
    } else {
        $scope.newGcName = UserService.name;
    }
    // Remove old giftstart scheme if present (it messes up login)
    if($location.search()['gs-id']) {
        $location.search('gs-id', null);
    }
    $scope.mailSubject = encodeURIComponent("Join us on a gift together");
    $scope.mailBody = function () {
        $location.search('re', btoa(JSON.stringify({
            type: 'consumer',
            uid: UserService.uid,
            channel: 'email',
            uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        })));
        var url = encodeURIComponent("I thought you might be interested in pitching in on this GiftStarter campaign:\n\n" + $location.absUrl());
        $location.search('re', null);
        return url;
    };
    // Check if we should fetch a giftstart
    if($location.path().length > 11) {
        if(GiftStartService.giftStart.gsid == undefined) {
            var url_title = $location.path().split('/')[2];
            GiftStartService.fetchGiftStart(url_title);
        }
    }
    $scope.fundingBarProgress = function () {
        return(GiftStartService.giftStart.funded / GiftStartService.giftStart.total_price * 100).toString() + '%';
    };
    $scope.pitchinBarProgress = function () {
        return((GiftStartService.giftStart.funded + GiftStartService.giftStart.totalSelection) / GiftStartService.giftStart.total_price * 100).toString() + '%';
    };
    $document.bind('keyup keydown', function (event) {
        if(event.ctrlKey && event.keyCode === 80) {
            window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
            event.preventDefault();
            return false;
        }
    });
    $scope.$on('pitch-ins-initialized', function () {
        $scope.pitchInsInitialized = true;
    });
    $scope.$on('note-saved', function () {
        $scope.pitchIns.shift();
        $scope.pitchIns.unshift(GiftStartService.newPitchIn);
    });
    $scope.$on('pitch-ins-updated', function () {
        $http({
            method: 'POST',
            url: '/pay',
            data: {
                action: 'get-pitch-ins',
                gsid: $scope.giftStart.gsid
            }
        }).success(function (pitchIns) {
            var currentPids = [];
            angular.forEach($scope.pitchIns, function (pitchIn) {
                currentPids.unshift(pitchIn.parts.join('_'));
            });
            angular.forEach(pitchIns, function (pitchIn) {
                if(currentPids.indexOf(pitchIn.parts.join('_')) < 0) {
                    $scope.pitchIns.unshift(pitchIn);
                }
            });
            //if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
            //    $scope.pitchIns.unshift(pitchIn);
            //}
            //});
            //    angular.forEach(pitchIns, function(pitchIn) {
            //    if ($scope.pitchIns.length < pitchIns.length && pitchIn.gsid === $scope.giftStart.gsid) {
            //        this.unshift(pitchIn);
            //    }
            //}, $scope.pitchIns);
        }).error(function () {
            console && console.log && console.log("Failed to contact part sync.")
        })
    });
    $scope.$on('selection-changed', function () {
        if(GiftStartService.giftStart.totalSelection > 0) {
            $scope.pitchinButtonHoverMessage = '';
        } else {
            $scope.pitchinButtonHoverMessage = 'Click on some parts first!';
        }
    });
    var syncPitchInsTimerIsFast = true;
    var syncPitchInsTimer = $interval(function () {
        GiftStartService.syncPitchIns("GiftStartService");
        if(syncPitchInsTimerIsFast && ($scope.secondsLeft <= 0 || $scope.campaignComplete())) {
            $interval.cancel(syncPitchInsTimer);
            syncPitchInsTimerIsFast = false;
            syncPitchInsTimer = $interval(function () {
                GiftStartService.syncPitchIns("GiftStartService");
            }, 60000, false);
        }
    }, 1000, false);
    // Synchronize parts on mouse activity
    $scope.mouseActivityCallback = function (source) {
        GiftStartService.syncPitchIns(source);
    };
    $scope.pitchInHoverCallback = function () {
        GiftStartService.syncPitchIns('pitch-in-hover')
    };
    $scope.pitchIn = function () {
        // Ensure they have selected more than $0 of the gift to pitch in
        if(GiftStartService.giftStart.totalSelection > 0) {
            Analytics.track('pitchin', 'pitchin button clicked');
            if(UserService.loggedIn) {
                AppStateService.set('contributeLogin', false);
                //PopoverService.setPopover('pay');
                $scope.showPayBox = true;
                $rootScope.$broadcast('paybox-shown');
            } else {
                //PopoverService.contributeLogin = true;
                AppStateService.set('contributeLogin', true);
                //PopoverService.setPopover('login');
                $rootScope.$broadcast('loginbox-show-login');
                $scope.showLoginBox = true;
            }
        } else {
            console && console.log && console.log("Nothing selected!")
        }
    };

    function restartPitchin() {
        if(AppStateService.get('contributeLogin')) {
            AppStateService.remove('contributeLogin');
            $scope.pitchIn();
        }
    }
    $scope.campaignComplete = function () {
        return(GiftStartService.giftStart.funded / GiftStartService.giftStart.total_price > 0.9975);
    };
    $scope.updateSecondsLeft = function () {
        if(($scope.secondsLeft < 0) || ($scope.campaignComplete())) {
            $scope.countdown = "Campaign Complete";
            GiftStartService.disableParts();
        } else {
            $scope.secondsLeft -= 1;
            var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
            var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);
            $scope.countdown = days + " days, " + hours + " hours";
        }
    };

    function startSecondsLeftTimer() {
        $scope.secondsLeftTimer = $interval($scope.updateSecondsLeft, 1000);
    }

    function stopSecondsLeftTime() {
        $scope.secondsLeftTimer.cancel();
        $scope.secondsLeftTimer = null;
    }
    $scope.saveProdForLater = function () {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater('GiftStartService', GiftStartService.giftStart.product_url, GiftStartService.giftStart.price, GiftStartService.giftStart.product_title, '', GiftStartService.giftStart.product_img_url);
        if(saver) {
            saver.success(function (response) {
                $scope.productMessage = "The gift has been saved to your <a href='/users/" + UserService.uid + "'>profile</a>."
                $scope.isSavingForLater = false;
            }).error(function (response) {
                $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };
    var colorMap = [];
    $scope.randomColor = function (index) {
        if(colorMap[index] == null) {
            var colors = ["red", "green", "orange", "teal"];
            colorMap[index] = colors[Math.floor(Math.random() * colors.length)];
        }
        return colorMap[index];
    };
    $scope.campaignUrl = function () {
        if($location.path().length > 11) {
            return "http://giftstart.it/g/" + $location.path().slice(11); //$location.absUrl().split(/[#\?]/)[0];
        } else {
            return "";
        }
    };
    $scope.giftstartThisUrl = function () {
        return '/create?' + urlSerialize({
            product_url: GiftStartService.giftStart.product_url,
            title: GiftStartService.giftStart.product_title,
            price: GiftStartService.giftStart.price,
            img_url: GiftStartService.giftStart.product_img_url,
            source: 'GiftStarter'
        });
    };
    var urlSerialize = function (obj) {
        var str = [];
        for(var p in obj)
            if(obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    };
    $scope.emailShare = function () {
        Analytics.track('campaign', 'email share from campaign');
        if(device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject + "&body=" + $scope.mailBody();
        }
    };
    $scope.facebookMsg = function () {
        Analytics.track('campaign', 'facebook share from campaign');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.facebookShare = function () {
        Analytics.track('campaign', 'facebook share from campaign');
        //FacebookService.inviteFriends(UserService.uid, 'share');
        FB.ui({
            method: 'share',
            href: $location.absUrl()
        }, function (response) {});
        FB.Canvas.setAutoGrow();
    };
    $scope.twitterShare = function () {
        Analytics.track('campaign', 'twitter share from campaign');
        TwitterService.share(UserService.uid);
    };
    $scope.googlePlusShare = function () {
        Analytics.track('campaign', 'googleplus share from campaign');
        GooglePlusService.share(UserService.uid);
    };
    $scope.productLinkClicked = function () {
        Analytics.track('campaign', 'product link clicked');
    };
    $scope.goToUserPage = function (uid) {
        Analytics.track('client', 'go to user page from comments');
        GiftStartService.goToUserPage(uid);
    };
    $scope.toPDFPage = function () {
        window.open('/pdfify?page=' + $location.path().slice(1) + '/print');
    };
    $scope.$on('login-success', function () {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
        $scope.newUser = !UserService.hasPitchedIn;
        $scope.showLoginBox = false;
        restartPitchin();
    });
    $scope.$on('logout-success', function () {
        $scope.campaignEditable = UserService.uid === $scope.giftStart.gift_champion_uid;
    });
    $scope.showOverlay = GiftStartService.showOverlay;
    $scope.hideOverlay = GiftStartService.hideOverlay;
    var imageInput = angular.element(document.getElementById('campaign-image-input'));
    $scope.updateImage = function () {
        var maxImageSize = 2 * 1024 * 1024; // 2 MB
        var acceptableFileTypes = ['image/jpeg', 'image/png'];
        if(imageInput[0].files[0]) {
            if(imageInput[0].files[0].size > maxImageSize) {
                alert("Oops!  Images must be smaller than 2 MB.");
            } else if(acceptableFileTypes.indexOf(imageInput[0].files[0].type) == -1) {
                alert("Oops!  Only jpeg and png images are allowed!  You chose a " + imageInput[0].files[0].type + ".");
            } else {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var img_data = event.target.result;
                    $scope.newImage = {
                        data: img_data,
                        filename: imageInput[0].files[0].name
                    };
                };
                reader.readAsDataURL(imageInput[0].files[0]);
            }
        }
    };
    $scope.updateCampaign = function () {
        GiftStartService.updateCampaign($scope.newTitle, $scope.newDescription, $scope.newImage, $scope.newGcName);
        $scope.editMode = false;
    };
    if(GiftStartService.giftStart.gsid != undefined) {
        // Start timer update ticker
        $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime() / 1000;
        startSecondsLeftTimer();
    }
    // Update this giftstart when the service updates it
    $scope.$on('giftstart-loaded', function () {
        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime() / 1000;
        startSecondsLeftTimer();
    });
    $scope.$on('giftstart-updated', function () {
        $scope.giftStart = GiftStartService.giftStart;
        startSecondsLeftTimer();
    });

    function loginChanged() {
        $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    }

    function loggedIn() {
        $scope.loggedIn = true;
        loginChanged();
    }

    function loggedOut() {
        $scope.loggedIn = false;
        $scope.showShare = false;
        $scope.showShareBox = false;
        loginChanged();
    }
    $scope.$on('login-success', loggedIn);
    $scope.$on('logout-success', loggedOut);
    $scope.$on('giftstart-loaded', restartPitchin);
    imageInput.bind('change', $scope.updateImage);
    $scope.$on("$destroy", function () {
        if(syncPitchInsTimer) {
            $interval.cancel(syncPitchInsTimer);
        }
    });
}