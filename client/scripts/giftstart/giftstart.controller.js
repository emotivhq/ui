/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.controller('GiftStartController', [
            '$scope','GiftStartService','$location','$timeout',
            'FacebookService','TwitterService','GooglePlusService','Analytics',
            'UserService','$window', 'PopoverService',
    GiftStartController]);

function GiftStartController($scope,  GiftStartService,  $location,  $timeout,
         FacebookService,  TwitterService,  GooglePlusService,  Analytics,
         UserService,  $window, PopoverService) {

    Analytics.track('campaign', 'controller created');

    $scope.giftStart = GiftStartService.giftStart;
    $scope.pitchIns = GiftStartService.pitchIns;
    $scope.secondsLeft = 0;

    $scope.newTitle = $scope.giftStart.title;
    $scope.newDescription = $scope.giftStart.description;
    $scope.editingTitle = false;
    $scope.editingDescription = false;
    $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    $scope.pitchInsInitialized = false;
    $scope.pitchinButtonHoverMessage = 'Click on some grid pieces first!';

    $scope.newUser = !UserService.hasPitchedIn;
    $scope.loggedIn = UserService.loggedIn;

    if ($scope.giftStart.gc_name) {
        $scope.newGcName = $scope.giftStart.gc_name;
    } else {
        $scope.newGcName = UserService.name;
    }

    // Remove old giftstart scheme if present (it messes up login)
    if ($location.search()['gs-id']) {
        $location.search('gs-id', null);
    }

    $scope.mailSubject = encodeURIComponent("Check out this awesome GiftStarter!");
    $scope.mailBody= function() {
        $location.search('re', btoa(JSON.stringify({
            type: 'consumer',
            uid: UserService.uid,
            channel: 'email',
            uuid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
        })));
        var url = encodeURIComponent("Seriously, it's the bee's knees.\n\n" + $location.absUrl());
        $location.search('re', null);
        return url;
    };

    $scope.period = [
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true},
        {passed: true}
    ];

    if(typeof($location.path().length > 11)) {
        if (GiftStartService.giftStart.gsid == undefined) {
            var url_title = $location.path().split('/')[2];
            GiftStartService.fetchGiftStart(url_title);
        }
    }

    $scope.updateFundingBar = function() {
        $scope.fundingBarProgress =  (GiftStartService.giftStart.funded / GiftStartService.giftStart.product.total_price *
            100).toString() + '%';
        $scope.pitchinBarProgress =  ((GiftStartService.giftStart.funded +
            GiftStartService.giftStart.totalSelection) / GiftStartService.giftStart.product.total_price *
            100).toString() + '%';
    };

    $scope.$on('pitch-ins-initialized', function() {
        $scope.pitchInsInitialized = true;
        $scope.updateFundingBar();
    });

    $scope.$on('pitch-ins-updated', function() {
        $scope.pitchIns = GiftStartService.pitchIns;
        $scope.updateFundingBar();
    });

    $scope.$on('selection-changed', function() {
        $scope.updateFundingBar();
        if (GiftStartService.giftStart.totalSelection > 0) {
            $scope.pitchinButtonHoverMessage = '';
        } else {
            $scope.pitchinButtonHoverMessage = 'Click on some grid pieces first!';
        }
    });

    // Synchronize parts on mouse activity
    $scope.mouseActivityCallback = function(source) {
        GiftStartService.syncPitchIns(source);
    };
    $scope.pitchInHoverCallback = function() {
        GiftStartService.syncPitchIns('pitch-in-hover')};

    $scope.pitchIn = GiftStartService.pitchIn;

    $scope.campaignComplete = function() {
        return (GiftStartService.giftStart.funded / GiftStartService.giftStart.product.total_price > 0.9975);
    };

    $scope.updateSecondsLeft = function() {
        if (($scope.secondsLeft < 0) || ($scope.campaignComplete())) {
            $scope.countdown = "Campaign Complete";
            GiftStartService.disableParts();
            $scope.updateTimeLeftBar(-1);
        } else {
            $scope.secondsLeft -= 1;

            var days = Math.floor($scope.secondsLeft / 86400).toFixed(0);
            var hours = Math.floor(($scope.secondsLeft / 3600) % 24).toFixed(0);

            $scope.countdown = days + " days, " + hours + " hours";
            $scope.updateTimeLeftBar(days);
            $timeout($scope.updateSecondsLeft, 1000);
        }
    };

    $scope.updateTimeLeftBar = function(daysLeft) {
        for (var i = 0; i < $scope.period.length; i++) {
            $scope.period[$scope.period.length - i - 1].passed = ($scope.period.length - i - 1) > daysLeft;
        }
    };

    $scope.emailShare = function() {
        Analytics.track('campaign', 'email share from campaign');
        if (device.desktop()) {
            PopoverService.setPopover('email-share');
        } else {
            $window.location.href = "mailto:?subject=" + $scope.mailSubject +
                "&body=" + $scope.mailBody();
        }
    };

    $scope.facebookShare = function() {
        Analytics.track('campaign', 'facebook share from campaign');
        FacebookService.inviteFriends(UserService.uid);
    };
    $scope.twitterShare = function() {
        Analytics.track('campaign', 'twitter share from campaign');
        TwitterService.share(UserService.uid);
    };
    $scope.googlePlusShare = function() {
        Analytics.track('campaign', 'googleplus share from campaign');
        GooglePlusService.share(UserService.uid);
    };

    $scope.productLinkClicked = function() {
        Analytics.track('campaign', 'product link clicked');
    };

    $scope.goToUserPage = function(uid) {
        Analytics.track('client', 'go to user page from comments');
        GiftStartService.goToUserPage(uid);
    };

    $scope.$on('login-success', function() {
        $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
        $scope.newUser = !UserService.hasPitchedIn;
    });
    $scope.$on('logout-success', function() {
        $scope.campaignEditable = UserService.uid == $scope.giftStart.gift_champion_uid;
    });

    $scope.showOverlay = GiftStartService.showOverlay;
    $scope.hideOverlay = GiftStartService.hideOverlay;

    var imageInput = angular.element(document.getElementById('campaign-image-input'));
    $scope.updateImage = function() {
        var maxImageSize = 2*1024*1024; // 2 MB
        var acceptableFileTypes = ['image/jpeg', 'image/png'];
        if (imageInput[0].files[0]) {
            if (imageInput[0].files[0].size > maxImageSize) {
                alert("Oops!  Images must be smaller than 2 MB.");
            } else if (acceptableFileTypes.indexOf(imageInput[0].files[0].type) == -1) {
                alert("Oops!  Only jpeg and png images are allowed!  You chose a " + imageInput[0].files[0].type + ".");
            } else {
                var reader = new FileReader();
                reader.onload = function (event) {
                    var img_data = event.target.result;
                    $scope.newImage = {data: img_data,
                        filename: imageInput[0].files[0].name};
                };
                reader.readAsDataURL(imageInput[0].files[0]);
            }
        }
    };

    $scope.updateCampaign = function() {
        GiftStartService.updateCampaign($scope.newTitle, $scope.newDescription, $scope.newImage, $scope.newGcName);
        $scope.editMode = false;
    };

    if (GiftStartService.giftStart.gsid != undefined) {
        $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
        $timeout($scope.updateSecondsLeft, 0);
    }

    // Update this giftstart when the service updates it
    $scope.$on('giftstart-loaded', function() {
        $scope.giftStart = GiftStartService.giftStart;
        $scope.secondsLeft = GiftStartService.giftStart.deadline - (new Date()).getTime()/1000;
        $timeout($scope.updateSecondsLeft, 0);
    });
    $scope.$on('giftstart-updated', function() {
        $scope.giftStart = GiftStartService.giftStart;
        $scope.updateSecondsLeft();
    });

    function loginChanged() {
        $scope.campaignEditable =
            UserService.uid == $scope.giftStart.gift_champion_uid;
    }

    function loggedIn() {
        $scope.loggedIn = true;
        loginChanged();
    }

    function loggedOut() {
        $scope.loggedIn = false;
        loginChanged();
    }

    $scope.$on('login-success', loggedIn);
    $scope.$on('logout-success', loggedOut);

    imageInput.bind('change', $scope.updateImage);
}