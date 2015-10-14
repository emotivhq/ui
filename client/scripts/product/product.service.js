/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.service('ProductService', ['$http','$rootScope','Analytics',
    'UserService', 'PopoverService', '$location', ProductService]);

function ProductService($http,  $rootScope,  Analytics, UserService, PopoverService, $location) {

    this.product = {
        product_url: '',
        imgs: [],
        title: '',
        logo: '',
        imageWidth: 0,
        imageHeight: 0
    };

    this.products = [];

    var self = this;

    this.submitLink = function(url, onSuccess, onFail) {
        $http({
            method: 'GET',
            url: '/products/urls/' + encodeURIComponent(url) + '.json'
        }).success(function(data) {
            if (data.error) {
                console && console.log && console.log("Fetched failed!");
                onFail(data);
            } else {
                self.product.imgs = data.product.imgs;
                self.product.price = data.product.price;
                self.product.title = data.product.title;
                self.logo = data.product.logo;
                onSuccess(self.product);
            }
        }).error(function(data) {
            console && console.log && console.log("Fetched failed!");
            onFail(data);
        });
    };

    this.createCampaignFromProduct = function(url, price, title, imgUrl) {
        Analytics.track('product', 'campaign create from search');
        self.product.product_url = url;
        self.product.price = price;
        self.product.title = title;
        self.logo = '';
        self.product.imgs = [imgUrl];
        $location.path("create");
    };

    this.saveForLater = function(retailer, url, price, title, description, imgUrl) {
        if(!UserService.loggedIn) {
            $rootScope.$broadcast('header-show-login');
        } else {
            Analytics.track('product', 'save for later');
            return $http.post('/users', {
                'uid': UserService.uid,
                'action': 'save-for-later',
                'url': url,
                'retailer': retailer,
                'price': price,
                'title': title,
                'description': description,
                'imgUrl': imgUrl
            });
        }
    };

    this.searchProducts = function(search) {
        if(window.history) {window.history.replaceState({},'GiftStarter Search: '+search,'/discover/'+encodeURIComponent(search));}
        Analytics.track('product', 'search submitted');
        $http({method: 'GET',
            url: '/products/' + encodeURIComponent(search) + '.json'})
            .success(self.fetchSuccess);
    };

    this.fetchSuccess = function (result) {
        Analytics.track('product', 'search succeeded');
        self.products = result;
        if (self.products.length) {
            $rootScope.$broadcast('products-fetched');
        } else {
            $rootScope.$broadcast('products-empty');
        }
    };
}
