/**
 * Created by stuart on 4/26/14.
 */


describe('Usage Flow', function() {

    var $httpBackend, productLinkScope, $rootScope, productController, $location, giftStartScope, GiftStartService,
        giftStartController, FacebookService, loginPopoverScope, loginPopoverController, notePopoverScope,
        notePopoverController, ezfbMock, PopoverService, $controller, payPopoverScope, payPopoverController,
        invitePopoverScope, invitePopoverController, thanksPopoverScope, thanksPopoverController;

    beforeEach(module('GiftStarterApp'));
    beforeEach(function() {
        // Mock service dependencies (like ezfb)
        module(function ($provide) {
            $provide.value('ezfb', ezfbMock);
        });
    });
    beforeEach(function () {
        ezfbMock = {
            loggedIn: false,
            login: function(callback, scopeObject) {
                this.loggedIn = true;
                callback({
                    authResponse: {
                        userID: 2
                    },
                    status: this.loggedIn ? 'connected' : 'disconnected?'
                });
            },
            logout: function(callback) {
                this.loggedIn = false;
                callback({status: this.loggedIn ? 'connected' : 'disconnected?'});
            },
            getLoginStatus: function(callback) {
                callback({
                    authResponse: {
                        userID: 2
                    },
                    status: this.loggedIn ? 'connected' : 'disconnected?'
                });
            },
            api: function(url, callback) {
                callback({data: [
                    {birthday: '', id: '', name: '0', picture: {data: {is_silhouette: false, url: ''}}},
                    {birthday: '', id: '', name: '1', picture: {data: {is_silhouette: false, url: ''}}},
                    {birthday: '', id: '', name: '2', picture: {data: {is_silhouette: false, url: ''}}},
                    {birthday: '', id: '', name: '3', picture: {data: {is_silhouette: false, url: ''}}},
                    {birthday: '', id: '', name: '4', picture: {data: {is_silhouette: false, url: ''}}}
                ]});
            }
        };
    });
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        GiftStartService = $injector.get('GiftStartService');
        FacebookService = $injector.get('FacebookService');
        PopoverService = $injector.get('PopoverService');
        $controller = $injector.get('$controller');

        // Mock controller scopes
        productLinkScope = $rootScope.$new();
        productController = $controller('ProductLinkController', {'$scope': productLinkScope});
        giftStartScope = $rootScope.$new();
        giftStartController = $controller('GiftStartController', {'$scope': giftStartScope});
        loginPopoverScope = $rootScope.$new();
        loginPopoverController = $controller('LoginPopoverController', {'$scope': loginPopoverScope});
        notePopoverScope = $rootScope.$new();
        payPopoverScope = $rootScope.$new();
        payPopoverController = $controller('PayPopoverController', {'$scope': payPopoverScope});
        invitePopoverScope = $rootScope.$new();
        thanksPopoverScope = $rootScope.$new();
        thanksPopoverController = $controller('ThanksPopoverController', {'$scope': thanksPopoverScope});
    }));
    afterEach(function() {
    });

    it('should request the product page from the server', function() {
        productLinkScope.product.product_url = 'link';
        productLinkScope.product.price = 0.02;

        function containsProductDetails(data) {
            var dataObject = JSON.parse(data);
            return (dataObject.url == 'link' && dataObject.price == 0.02);
        }
        $httpBackend.expect('POST', '/product', containsProductDetails)
            .respond(200, {'product': {'link': 'url', 'img': 'img', 'title': 'title', 'price': 'price',
                'description': 'desc'}});
        productLinkScope.submitLink();
        $httpBackend.flush();
    });

    it('should create a giftstart campaign from a submitted product', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.giftstart();
        expect($location.path()).toBe('/giftstart');
    });

    it('should properly count selected parts of product', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        expect($location.path()).toBe('/giftstart');

        expect(GiftStartService.giftStart.totalSelection).toBe(0);
        expect(GiftStartService.giftStart.parts[0][1].selected).toBe(false);
        GiftStartService.giftStart.parts[0][1].toggle();
        expect(GiftStartService.giftStart.parts[0][1].selected).toBe(true);
        expect(GiftStartService.giftStart.totalSelection).toBe(5);
        expect(GiftStartService.giftStart.parts[1][1].selected).toBe(false);
        GiftStartService.giftStart.parts[1][1].toggle();
        expect(GiftStartService.giftStart.parts[1][1].selected).toBe(true);
        expect(GiftStartService.giftStart.totalSelection).toBe(10);
    });

    it('should show the login popover when they pitch in', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        GiftStartService.giftStart.parts[0][0].toggle();
        GiftStartService.giftStart.parts[1][1].toggle();

        giftStartScope.pitchIn();
        expect($location.hash()).toBe('login');

        $httpBackend.expect('POST', '/giftstart')
            .respond(200, {giftstart: {
                title: 'title',
                description: 'desc',
                gift_champion_uid: 2,
                product: {
                    price: 20,
                    img_url: 'img',
                    img_height: -1,
                    url: 'url'
                },
                parts: [],
                rows: 2,
                columns: 2
            }});

        loginPopoverScope.login();
        notePopoverController = $controller('NotePopoverController', {'$scope': notePopoverScope});
        $httpBackend.flush();
        expect($location.hash()).toBe('note');
    });

    it('should let the user add a special note', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        GiftStartService.giftStart.parts[0][0].toggle();
        GiftStartService.giftStart.parts[1][1].toggle();

        giftStartScope.pitchIn();
        expect($location.hash()).toBe('login');

        $httpBackend.expect('POST', '/giftstart')
            .respond(200, {giftstart: {
                title: 'title',
                description: 'desc',
                gift_champion_uid: 2,
                product: {
                    price: 20,
                    img_url: 'img',
                    img_height: -1,
                    url: 'url'
                },
                parts: [],
                rows: 2,
                columns: 2
            }});

        loginPopoverScope.login();
        notePopoverController = $controller('NotePopoverController', {'$scope': notePopoverScope});
        $httpBackend.flush();
        expect($location.hash()).toBe('note');

        expect(GiftStartService.payment.note).toBe('');
        notePopoverScope.noteText = 'Ah fuck.  I can\'t believe you\'ve done this.';
        notePopoverScope.submit();

        expect(GiftStartService.payment.note).toBe('Ah fuck.  I can\'t believe you\'ve done this.');
        expect($location.hash()).toBe('pay');
    });

    it('should let the user pay with card', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        GiftStartService.giftStart.parts[0][0].toggle();
        GiftStartService.giftStart.parts[1][1].toggle();
        giftStartScope.pitchIn();

        $httpBackend.expect('POST', '/giftstart')
            .respond(200, {giftstart: {
                title: 'title',
                description: 'desc',
                gift_champion_uid: 2,
                product: {
                    price: 20,
                    img_url: 'img',
                    img_height: -1,
                    url: 'url'
                },
                parts: [],
                rows: 2,
                columns: 2
            }});

        loginPopoverScope.login();
        notePopoverController = $controller('NotePopoverController', {'$scope': notePopoverScope});
        $httpBackend.flush();
        notePopoverScope.noteText = 'Ah fuck.  I can\'t believe you\'ve done this.';
        notePopoverScope.submit();

        payPopoverScope.stripeSubmit('', {response: 'yeas'});
        expect(JSON.stringify(GiftStartService.payment.stripeResponse)).toBe(JSON.stringify({response: 'yeas'}));
        expect($location.hash()).toBe('invite');
    });

    it('should let the user invite friends', function() {
        productLinkScope.product = {
            link: 'Link',
            img: 'http://i.imgur.com/oIsgW1S.jpg',
            title: 'Title',
            description: 'Description',
            price: 20,
            imageWidth: -1,
            imageHeight: -1
        };
        productLinkScope.x = 2;
        productLinkScope.y = 2;
        productLinkScope.giftstart();
        GiftStartService.giftStart.parts[0][0].toggle();
        GiftStartService.giftStart.parts[1][1].toggle();
        giftStartScope.pitchIn();

        $httpBackend.expect('POST', '/giftstart')
            .respond(200, {giftstart: {
                title: 'title',
                description: 'desc',
                gift_champion_uid: 2,
                product: {
                    price: 20,
                    img_url: 'img',
                    img_height: -1,
                    url: 'url'
                },
                parts: [],
                rows: 2,
                columns: 2
            }});

        loginPopoverScope.login();
        notePopoverController = $controller('NotePopoverController', {'$scope': notePopoverScope});
        $httpBackend.flush();
        notePopoverScope.noteText = 'Ah fuck.  I can\'t believe you\'ve done this.';
        notePopoverScope.submit();
        payPopoverScope.stripeSubmit('', {response: 'yeas'});

        invitePopoverController = $controller('InvitePopoverController', {'$scope': invitePopoverScope});

        invitePopoverScope.friends[0].toggle();
        invitePopoverScope.friends[3].toggle();
        invitePopoverScope.friends[4].toggle();
        invitePopoverScope.inviteMessage = 'come one come all';

        spyOn(FacebookService, 'inviteFriends');
        invitePopoverScope.inviteFriends();
        expect(FacebookService.inviteFriends).toHaveBeenCalledWith([invitePopoverScope.friends[0], invitePopoverScope.friends[3], invitePopoverScope.friends[4]], 'come one come all');
        expect($location.hash()).toBe('thanks');

        thanksPopoverScope.close();
        expect($location.hash()).toBe('');

    });

});