/**
 * Created by Stuart on 10/16/14.
 */


GiftStarterApp.directive('gsTopCampaign', gsTopCampaign);

function gsTopCampaign(Analytics, $location) {
    function link(scope, element, attrs) {
        scope.goToUrl = function() {
            Analytics.track("client", "hot campaigns clicked");
            $location.path('giftstart').search('').search('gs-id',
                scope.campaign.giftstart.gsid)
        };
    }

    return {
        restrict: 'E',
        scope: {campaign: '=', pitchins: '=', index: '=', fadeIn: '='},
        link: link,
        templateUrl: '/scripts/home/top-campaign.html'
    };
}
