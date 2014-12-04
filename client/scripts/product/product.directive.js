/**
 * Created by Stuart on 10/16/14.
 */

GiftStarterApp.directive('gsProductSearch', gsProductSearch);

function gsProductSearch(ProductService, $location, Analytics, $window,
                         $timeout) {
    function link(scope, element) {
        scope.loading = false;
        scope.failed = false;
        scope.results_empty = false;
        scope.product_url = "";
        scope.currentProductLink = '';
        scope.selectedProduct = -1;

        scope.giftConciergeClicked = function() {Analytics.track('client',
            'gift concierge email clicked')};

        function onSuccess(product) {
            Analytics.track('product', 'link submission succeeded');
            scope.loading = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.product.imgs = product.imgs;
            $location.path("create");
        }
        function onFailure(reason) {
            Analytics.track('product', 'link submission failed');
            scope.loading = false;
            scope.failed = true;
        }

        scope.submit = function() {
            // Determine if url or search term
            var isUrl = (scope.product_url.indexOf('http://') == 0) |
                (scope.product_url.indexOf('https://') == 0);

            if (isUrl) {
                scope.submitLink();
            } else {
                scope.submitSearch();
            }
        };

        scope.submitSearch = function() {
            Analytics.track('product', 'search submitted');
            ProductService.searchProducts(scope.product_url);
            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            scope.selectedProducts = [];
        };

        scope.submitLink = function() {
            Analytics.track('product', 'link submitted');

            // Fix urls if they don't start with http://
            if (scope.product_url.slice(0, 7) !== "http://" &&
                scope.product_url.slice(0, 8) !== "https://") {
                scope.product_url = "http://" + scope.product_url;
            }

            scope.loading = true;
            scope.failed = false;
            scope.results_empty = false;
            ProductService.product.product_url = scope.product_url;
            ProductService.submitLink(scope.product_url, onSuccess,
                onFailure);
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

        scope.$on('products-empty', function() {
            scope.loading = false;
            scope.results_empty = true;
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
            scope.selectedProducts = scope.products.slice(
                    (scope.selectedPage - 1) * scope.pageSize,
                    scope.selectedPage * scope.pageSize);
            scope.hideProductDetails();
            element[0].scrollIntoView();
        };

        scope.showProductDetails = function(index) {
            Analytics.track('product', 'show product details');
            scope.hideProductDetails();
            scope.selectedProduct = index;
            scope.selectedProducts[index].selected = true;

            var root = angular.element(document.querySelector(
                '#search-products-section'))[0];

            // Product div animates as it expands, so need to infer height
            // from initial state (2x height/width)
            var height = root.children[index].offsetHeight;
            $timeout(function (){
                var offset = root.children[index].offsetTop;
                var scrollOffset = offset - ($window.innerHeight -
                    2 * height) / 2;
                $window.scrollTo(0, scrollOffset);
            }, 100);
        };

        scope.hideProductDetails = function() {
            scope.selectedProduct = -1;
            scope.selectedProducts.map(function(p) {
                p.selected = false;
                return p;
            });
        };

        scope.goToProduct = function($index, $event) {
            if (scope.selectedProduct == $index) {
                $window.open(scope.selectedProducts[$index].url, '_blank');
                $event.stopPropagation();
            }
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
        templateUrl: '/scripts/product/product-search.html'
    }
}
