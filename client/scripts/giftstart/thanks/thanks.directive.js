/**
 * Created by Stuart on 10/17/14.
 */

GiftStarterApp.directive('gsThanks', gsThanks);

function gsThanks() {

    controller.$inject = ['$scope', 'UserService', '$location',
        'GiftStartService', 'Analytics'];
    function controller($scope, UserService, $location, GiftStartService,
                        Analytics) {
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

        $scope.$on('login-success', updateEditable);
        $scope.$on('logout-success', updateEditable);

        function updateEditable() {
            thanks.profileImageUrl = UserService.profileImageUrl;
            thanks.editable = GiftStartService.giftStart.thanks_uid ==
                UserService.uid;
        }

        function showLogin() {
            cacheNewMessage();
            $location.hash('login');
        }

        function cacheNewMessage() {
            var thisThanksURI = '/giftstart/' +
                GiftStartService.giftStart.giftstart_url_title +
                '/thanks/edit/';
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
                    console.log(response);
                    thanks.message = response.giftstart.thanks_message;
                    thanks.newMessage = thanks.message;
                    thanks.imgUrl = response.giftstart.thanks_img_url;
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
