/**
 * Created by stuart on 4/21/14.
 */

GiftStarterApp.controller('PayPopoverController', [
            '$scope','GiftStartService',
    function($scope,  GiftStartService) {

        $scope.gs = GiftStartService.getGiftStart();

        $scope.currentCharge = function() {
            return $scope.gs.totalSelection;
        }
    }
]);

GiftStarterApp.directive('gsPayPopover',
    function() {return {restrict: 'E', templateUrl: '/templates/angular/pay-popover.html'}});
