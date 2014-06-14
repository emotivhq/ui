/**
 * Created by stuart on 4/9/14.
 */

GiftStarterApp.service('ProductService', [
            '$http',
    function($http) {

        this.product = {
            product_url: '',
            imgs: [],
            imageWidth: 0,
            imageHeight: 0
        };

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
                    onSuccess(self.product);
                }
            }).error(function(data) {
                console.log("Fetched failed!");
                onFail(data);
            });
        };

}]);


GiftStarterApp.directive('gsProductLink',
    function(ProductService, $location) {
        function link(scope) {
            scope.loading = false;
            scope.failed = false;
            scope.product_url = "http://www.rei.com/product/868340/camelbak-spire-22-lr-hydration-pack-100-fl-oz-womens";

            function onSuccess(product) {
                scope.loading = false;
                ProductService.product.url = scope.product_url;
                ProductService.product.imgs = product.imgs;
                $location.path("shipping-contact");
            }
            function onFailure(reason) {
                scope.loading = false;
                scope.failed = true;
                console.log("Product service failed to fetch product:");
                console.log(reason);
            }

            scope.submitLink = function() {
                mixpanel.track('Product submitted');
                ga('send', 'event', 'product', 'submitted');

                scope.loading = true;
                scope.failed = false;
                ProductService.product.product_url = scope.product_url;
                ProductService.submitLink(scope.product_url, onSuccess, onFailure);
            };
        }

        return {
            restrict: 'E',
            link: link,
            templateUrl: '/templates/angular/product-link.html'
        }
});
