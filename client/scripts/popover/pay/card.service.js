/**
 * Created by Stuart on 11/11/14.
 */

angular.module('GiftStarterApp').service('CardService', ['$rootScope',
    '$http', 'UserService', 'Analytics', cardService]);

function cardService($rootScope, $http, UserService, Analytics) {
    var cards = [],
        brandImgMap = {
        'Visa': '/assets/visa_card.png',
        'American Express': '/assets/amex_card.png',
        'MasterCard': '/assets/mastercard_card.png',
        'Discover': '/assets/discover_card.png',
        'JCB': '/assets/jcb_card.png',
        'Diners Club': '/assets/dinersclub_card.png',
        'Unknown': '/assets/unknown_card.png'
    };

    handleCardResponse(JSON.stringify([
        {lastFour: '1234', brand: 'Visa'},
        {lastFour: '3234', brand: 'American Express'},
        {lastFour: '4324', brand: 'MasterCard'}]));

    function fetchCards() {
        Analytics.track('client', 'user cards fetch started');
        return $http({method: 'GET', url: '/users/' + UserService.uid +
            '/cards.json'})
            .success(handleCardResponse)
            .error(function(reason) {
                Analytics.track('client', 'user cards fetch failed');
            });
    }

    function addCardImage(card) {
        var newCard = card;
        newCard.brandImage = brandImgMap[card.brand];
        return newCard;
    }

    function handleCardResponse(data) {
        Analytics.track('client', 'user cards fetch succeeded');
        if (typeof data == 'string') {
            cards = JSON.parse(data).map(addCardImage);
        } else {
            cards = data.map(addCardImage);
        }
        $rootScope.$broadcast('cards-fetch-success');
        return cards;
    }

    return {
        cards: cards
    }
}
