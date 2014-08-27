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

        this.createCampaignFromProduct = function(url, price, title, imgUrl) {
            Analytics.track('product', 'campaign create from search');
            self.product.product_url = url;
            self.product.price = price;
            self.product.title = title;
            self.logo = '';
            self.product.imgs = [imgUrl];
            $location.path("campaign-create");

        };

        this.searchProducts = function(search, retailer) {
            var query = '?search=' + encodeURIComponent(search) + '&retailer=' + retailer;
            Analytics.track('product', 'search submitted');
            $http({method: 'GET', url: 'http://product.dev.giftstarter.co' + query})
                .success(self.fetchSuccess)
                .error(function() {
                    Analytics.track('product', 'search error');
                    $rootScope.$broadcast('products-fetch-fail');
                });
        };

        this.fetchSuccess = function (result) {
            Analytics.track('product', 'search succeeded');
            self.products = result;
            $rootScope.$broadcast('products-fetched');
        };
    }
]);


GiftStarterApp.directive('gsProductSearch',
    function(ProductService, $location, Analytics) {
        function link(scope, element) {
            scope.loading = false;
            scope.failed = false;
            scope.product_url = "";
            scope.currentProductLink = '';
            scope.selectedProduct = -1;

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
                Analytics.track('product', 'search submitted');
                ProductService.searchProducts(scope.product_url, scope.retailer);
                scope.loading = true;
                scope.failed = false;
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

            scope.$on('products-fetched', function() {
                scope.loading = false;
                scope.failed = false;
                scope.products = ProductService.products.filter(function(product) {
                    return product.imgUrl != '' && product.price > 3998;
                });
                scope.pageNumbers = [];
                scope.numPages = Math.floor(scope.products.length / scope.pageSize);
                for (var i = 1; i <= scope.numPages; i++) {
                    scope.pageNumbers.push(i);
                }
                scope.selectPage(1);
            });

            scope.$on('products-fetch-fail', function() {
                scope.loading = false;
                scope.failed = true;
            });

            scope.selectedPage = 1;
            scope.pageSize = 10;
            scope.numPages = 0;
            scope.pageNumbers = [];

            scope.incrementPage = function() {
                if (scope.selectedPage < scope.pageNumbers.length) {
                    Analytics.track('product', 'increment page');
                    scope.selectPage(scope.selectedPage + 1);
                }
            };

            scope.decrementPage = function() {
                if (scope.selectedPage > 1) {
                    Analytics.track('product', 'decrement page');
                    scope.selectPage(scope.selectedPage - 1);
                }
            };

            scope.selectPage = function(page) {
                scope.selectedPage = page;
                scope.selectedProducts = scope.products.slice((scope.selectedPage - 1) * scope.pageSize,
                    scope.selectedPage * scope.pageSize);
                scope.hideProductDetails();
                element[0].scrollIntoView();
            };

            scope.showProductDetails = function(index) {
                Analytics.track('product', 'show product details');
                scope.hideProductDetails();
                scope.selectedProducts[index].selected = true;
            };

            scope.hideProductDetails = function() {
                scope.selectedProducts.map(function(p) {
                    p.selected = false;
                    return p;
                });
            };

            scope.startCampaignFrom = function(index) {
                ProductService.createCampaignFromProduct(
                    scope.selectedProducts[index].url,
                    scope.selectedProducts[index].price,
                    scope.selectedProducts[index].title,
                    scope.selectedProducts[index].imgUrl
                );
            };
        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/product-search.html'
        }
    }
);