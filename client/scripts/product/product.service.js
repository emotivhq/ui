/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('ProductService', ['$http','$rootScope','Analytics',
    '$location', ProductService]);

function ProductService($http,  $rootScope,  Analytics,  $location) {

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
                console.log("Fetched failed!");
                onFail(data);
            } else {
                self.product.imgs = data.product.imgs;
                self.product.price = data.product.price;
                self.product.title = data.product.title;
                self.logo = data.product.logo;
                onSuccess(self.product);
            }
        }).error(function(data) {
            console.log("Fetched failed!");
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

    this.searchProducts = function(search) {
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
