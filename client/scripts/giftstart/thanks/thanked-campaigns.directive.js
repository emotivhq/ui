/**
 * Created by Stuart on 11/2/14.
 */

angular.module('GiftStarterApp').directive('gsThankedCampaigns', ['$http',
    'Analytics', gsThankedCampaigns]);

function gsThankedCampaigns($http, Analytics) {
    var $scope;

    function link(scope, elm, attrs) {
        $scope = scope;
        $scope.campaigns = [];

        // Get thanked campaigns
        $http({method: 'GET',
            url: '/giftstarts?thanked=true&num=' + attrs.gsNum})
            .success(thankedCampaignsFetched)
            .error(thankedCampaignsFailed);
    }

    function thankedCampaignsFetched(data) {
        Analytics.track('client', 'thanked campaigns fetch success');
        $scope.campaigns = data;
    }

    function thankedCampaignsFailed(reason) {
        console.error('thanked campaigns fetch failed');
        Analytics.track('client', 'thanked campaigns fetch failed');
    }

    return {
        link: link,
        templateUrl: '/scripts/giftstart/thanks/thanked-campaigns.ng.html',
        restrict: 'E'
    }
}
