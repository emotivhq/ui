/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsProductSearch', gsProductSearch);

function gsProductSearch(UserService, ProductService, $location, Analytics, UserService, $window, $timeout, $rootScope) {
    function link(scope, element, attrs) {
        scope.loading = false;
        scope.failed = false;
        scope.results_empty = false;
        scope.product_url = "";
        scope.currentProductLink = '';
        scope.selectedProduct = -1;
        scope.productMessage = '';
        scope.isSavingForLater = false;
		scope.loggedIn = UserService.loggedIn;
		this.loggedIn = UserService.loggedIn;
		scope.searchMenu = scope.$eval(attrs.menu) || false;
		scope.homeMenu = scope.$eval(attrs.home) || false;
		scope.searchResults = scope.$eval(attrs.results) || false;

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
			//Close any semantic ui elements
			jQuery('.ui.sidebar')
  				.sidebar('hide')
			;		
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
        scope.pageSize = 8;
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
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
        };

        scope.showProductDetails = function(index) {
            Analytics.track('product', 'show product details');
            scope.hideProductDetails();
            scope.productMessage = '';
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

        scope.fixImage = function(img) {
            var jImg = $(img);
            if(jImg.width()<250) {
                var newSrc = jImg.attr('src').replace('500x500', '250x250');
                jImg.attr('src', newSrc);
                scope.products[jImg.attr('index')].imgUrl=newSrc;
            }
        };

        scope.goToProduct = function($index, $event) {
            if (scope.selectedProduct == $index) {
                //$window.open(scope.selectedProducts[$index].url, '_blank');
                scope.startCampaignFrom($index);
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

        scope.saveForLater = function(index) {
            scope.isSavingForLater = true;
		  if(UserService.loggedIn) {
				var saver = ProductService.saveForLater(
                scope.selectedProducts[index].retailer,
                scope.selectedProducts[index].url,
                scope.selectedProducts[index].price,
                scope.selectedProducts[index].title,
                scope.selectedProducts[index].description,
                scope.selectedProducts[index].imgUrl
            );
            if(saver) {
                saver.success(function (response) {
                    scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                    scope.isSavingForLater = false;
                })
                .error(function (response) {
                    scope.productMessage = "An error occurred while saving the product: " + response['error'];
                    scope.isSavingForLater = false;
                });
            } else {
                scope.isSavingForLater = false;
            }
		  } else {
             	$location.path('/login');
          }
        };

        var performHeadSearch = function () {
            scope.submit();
            $('html, body').animate({
                scrollTop: $('#search-products-section').offset().top-300
                //$('#product-search-anchor').offset().top
            }, 200);
            $window.sessionStorage.setItem('fromSearch', null);
        };

        $rootScope.$on('performSearchFromHeader', function () {
            scope.product_url = $('#product-search-input-head').val();
            performHeadSearch();
        });

        $rootScope.$on('performSearchFromUrl', function () {
            scope.product_url = $window.sessionStorage.getItem('searchTermFromUrl');
            performHeadSearch();
        });
    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/scripts/product/product-search.html',
        scope: true
    }
}
