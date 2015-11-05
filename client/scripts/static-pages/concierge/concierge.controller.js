/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('ConciergeController', ['$scope', '$http',
    ConciergeController]);

function ConciergeController($scope, $http) {

    var resetForm = function() {
        $scope.email = "";
        $scope.title = "";
        $scope.budget = "";
        $scope.url = "";
        $scope.comments = ""; 
        $scope.conciergeform.$setUntouched();
    };

	jQuery('.menu .item').tab();

    $scope.sendMsg = function() {

        $http({
            method: "POST",
            dataType: 'jsonp',
            url: 'https://docs.google.com/forms/d/13cnJDPtW0plkxXi3cgBu844ETrtzbw9JgWWaeqj-0UY/formResponse',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            params: {
                'entry_1538055563': $scope.email,
                'entry_1003504959': $scope.title, 
                'entry_727663111': $scope.budget, 
                'entry_1647489740': $scope.url, 
                'entry_1284484267': $scope.comments
            }
        })
        .then(function () {
        },        
        function (res) {
            if (res.status === 0) {
                resetForm();
                $scope.msg = "Thank you! We'll do our best to respond on the same day, definitely within 24 hours. Please add giftconcierge@giftstarter.com to your address book to make sure you'll receive the reply."
            } else {
                $scope.msg = res['error'];
            }
        });
    }
}

