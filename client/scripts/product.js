/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('ProductService', [
            '$http','$rootScope','Analytics','$location',
    function($http,  $rootScope,  Analytics,  $location) {

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
                method: 'POST', url: '/product', data: {action: 'get', product_url: url}
            }).success(function(data) {
                if (data.error) {
                    console.log("Fetched failed!");
                    onFail(data);
                } else {
                    self.product.imgs = data.product.imgs;
                    self.product.price = data.product.price;
                    self.title = data.product.title;
                    self.logo = data.product.logo;
                    onSuccess(self.product);
                }
            }).error(function(data) {
                console.log("Fetched failed!");
                onFail(data);
            });
        };

        this.createCampaignFromProduct = function(index) {
            Analytics.track('product', 'campaign create from search');
            self.product.product_url = self.products[index].url;
            self.product.price = self.products[index].price;
            self.product.title = self.products[index].title;
            self.logo = '';
            self.product.imgs = [self.products[index].imgUrl];
            $location.path("campaign-create");

        };

        this.searchProducts = function(search) {
            var query = '?search=' + encodeURIComponent(search);
            Analytics.track('product', 'search submitted');
            $http({method: 'GET', url: 'http://product.dev.giftstarter.co' + query})
                .success(self.fetchSuccess)
                .error(function() {
                    Analytics.track('product', 'search error');});
        };

        this.fetchSuccess = function (result) {
            Analytics.track('product', 'search success');
            self.products = result;
            console.log(result);
            $rootScope.$broadcast('products-fetched');
        };

}]);


GiftStarterApp.directive('gsProductSearch',
    function(ProductService, $location, Analytics) {
        function link(scope) {
            scope.loading = false;
            scope.failed = false;
            scope.product_url = "";

            function onSuccess(product) {
                Analytics.track('product', 'link submission succeeded');
                scope.loading = false;
                ProductService.product.url = scope.product_url;
                ProductService.product.imgs = product.imgs;
                $location.path("campaign-create");
            }
            function onFailure(reason) {
                Analytics.track('product', 'link submission failed');
                scope.loading = false;
                scope.failed = true;
            }

            scope.submit = function() {
                // Determine if url or search term
                var isUrl = (scope.product_url.indexOf('http://') == 0) | (scope.product_url.indexOf('https://') == 0);

                if (isUrl) {
                    scope.submitLink();
                } else {
                    scope.submitSearch();
                }
            };

            scope.submitSearch = function() {
                ProductService.searchProducts(scope.product_url);
            };

            scope.submitLink = function() {
                Analytics.track('product', 'link submitted');

                // Fix urls if they don't start with http://
                if (scope.product_url.slice(0, 7) !== "http://" && scope.product_url.slice(0, 8) !== "https://") {
                    scope.product_url = "http://" + scope.product_url;
                }

                scope.loading = true;
                scope.failed = false;
                ProductService.product.product_url = scope.product_url;
                ProductService.submitLink(scope.product_url, onSuccess, onFailure);
            };

            scope.createCampaignFromProduct = ProductService.createCampaignFromProduct;

            scope.$on('products-fetched', function() {
                scope.products = ProductService.products;
            });
        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/product-search.html'
        }
    }
);