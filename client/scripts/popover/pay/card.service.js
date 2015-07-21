/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

angular.module('GiftStarterApp').service('CardService', ['$rootScope',
    '$http', 'UserService', 'Analytics', cardService]);

function cardService($rootScope, $http, UserService, Analytics) {
    var self = this;

    var brandImgMap = {
        'Visa': '/assets/visa_card.png',
        'visa': '/assets/visa_card.png',
        'American Express': '/assets/amex_card.png',
        'amex': '/assets/amex_card.png',
        'MasterCard': '/assets/mastercard_card.png',
        'mastercard': '/assets/mastercard_card.png',
        'Discover': '/assets/discover_card.png',
        'discover': '/assets/discover_card.png',
        'JCB': '/assets/jcb_card.png',
        'jcb': '/assets/jcb_card.png',
        'Diners Club': '/assets/dinersclub_card.png',
        'diners': '/assets/dinersclub_card.png',
        'Unknown': '/assets/unknown_card.png',
        'unknown': '/assets/unknown_card.png'
    };

    this.cards = [];
    this.fetch = fetchCards;
    this.deleteCard = deleteCard;

    function fetchCards() {
        if(UserService.uid!=-1) {
            Analytics.track('client', 'user cards fetch started');
            return $http({method: 'GET', url: '/users/' + UserService.uid +
                '/cards.json'})
                .success(handleCardResponse)
                .error(function(reason) {
                    $rootScope.$broadcast('cards-fetch-failure');
                    Analytics.track('client', 'user cards fetch failed');

                });
        }
    }

    function deleteCard(fingerprint) {
        Analytics.track('client', 'user card deleted');
        var deleteIndex = -1;
        for (var i = 0; i < this.cards.length; i++) {
            if(this.cards[i].fingerprint == fingerprint) {deleteIndex=i;}
        }
        if(deleteIndex>=0) {this.cards.splice(deleteIndex, 1);}
        return $http({method: 'POST', url: '/users/' + UserService.uid +
            '/cards.json', data: {action: 'delete-card', fingerprint: fingerprint}});
    }

    function addCardImage(card) {
        var newCard = card;
        newCard.brandImage = brandImgMap[card.brand];
        return newCard;
    }

    function handleCardResponse(data) {
        Analytics.track('client', 'user cards fetch succeeded');
        if (typeof data == 'string') {
            self.cards = JSON.parse(data).map(addCardImage);
        } else {
            self.cards = data.map(addCardImage);
        }
        $rootScope.$broadcast('cards-fetch-success');
        return self.cards;
    }

    return this;
}
