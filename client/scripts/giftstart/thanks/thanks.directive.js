/**
 * Created by Stuart on 10/17/14.
 */

GiftStarterApp.directive('gsThanks', gsThanks);

function gsThanks() {

    controller.$inject = ['$scope', 'UserService', '$location',
        'GiftStartService', 'Analytics', 'PopoverService','$window',
        'AppStateService'];
    function controller($scope, UserService, $location, GiftStartService,
                        Analytics, PopoverService, $window, AppStateService) {
        var thanks = this;

        thanks.message = GiftStartService.giftStart.thanks_message;
        thanks.newMessage = getNewMessage() ||
            GiftStartService.giftStart.thanks_message;

        thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
        thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
        thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
            || $location.search().thanks;

        thanks.showLogin = showLogin;
        thanks.update = update;
        thanks.profileImageUrl = UserService.profileImageUrl;

        if ($location.search().thanks == undefined) {
            $location.search('thanks', AppStateService.get('thanks-code'));
            AppStateService.remove('thanks-code');
        }

        $scope.$on('login-success', loginChanged);
        $scope.$on('logout-success', loginChanged);
        $scope.$on('giftstart-loaded', giftstartChanged);

        function loginChanged() {
            thanks.profileImageUrl = UserService.profileImageUrl;
            thanks.editable = GiftStartService.giftStart.thanks_uid ==
                UserService.uid;
        }

        function showLogin() {
            cacheNewMessage();
            PopoverService.setPopover('login');
        }

        function giftstartChanged() {
            thanks.message = GiftStartService.giftStart.thanks_message;
            thanks.newMessage = getNewMessage() ||
                GiftStartService.giftStart.thanks_message;

            thanks.imgUrl = GiftStartService.giftStart.thanks_img_url;
            thanks.edit = Boolean(/\/thanks\/edit/.test($location.path()));
            thanks.editable = $scope.giftStart.thanks_uid == UserService.uid
                || $location.search().thanks;
        }

        function cacheNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            AppStateService.set('thanks-code', $location.search().thanks);
            // TODO: Replace with data layer
            localStorage.setItem(thisThanksURI + 'message', thanks.newMessage);
        }

        function getNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
            // TODO: Replace with data layer
            return localStorage.getItem(thisThanksURI + 'message');
        }

        function update() {
            var req = GiftStartService.updateThanks(thanks.newMessage);
            req.success(
                function(response) {
                    thanks.message = response.thanks_message;
                    thanks.newMessage = thanks.message;
                    thanks.imgUrl = response.thanks_img_url;
                    $location.path('/giftstart/' +
                        GiftStartService.giftStart.giftstart_url_title);
                })
                .error(function(reason) {
                    Analytics.track('campaign', 'thanks failed');
                    $window.alert('Thanking failed!  Did you get the link ' +
                        'right?');
                });
            thanks.edit = false;
        }
    }

    return {
        restrict: 'E',
        controller: controller,
        controllerAs: 'thanks',
        templateUrl: '/scripts/giftstart/thanks/thanks.html'
    }
}
