/**
 * Created by Stuart on 11/11/14.
 */

angular.module('GiftStarterApp').service('CardService', ['$http',
    cardService]);

function cardService($http) {
    var cards = [{
        lastFour: '1234', brand: 'Visa', brandImage: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/payment-card.png'
    },{
        lastFour: '3234', brand: 'Visa', brandImage: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/payment-card.png'
    },{
        lastFour: '4324', brand: 'Visa', brandImage: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/payment-card.png'
    }];

    return {
        cards: cards
    }
}
