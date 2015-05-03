/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope','$http','$location', "ProductService", "UserService",
    GiftideasController]);

function GiftideasController($scope, $http, $location, ProductService, UserService) {

    $scope.productMessage = '';
    $scope.location = $location;
    $scope.path = $location.path();
    $scope.isSavingForLater = false;
    var pathParts = $scope.path.replace('//','/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length>2?pathParts[2]:false;
    var product = pathParts.length>3?pathParts[3]:false;

    // hack for mailing list error where we linked to the wrong category
    if(category && !product && (category=="lunarnewyear"||category=="farewell"||category=="pisces") && $location.search()['utm_campaign']=="18f05bc479-Weekly_Email_Lunar_New_Year_Pisces_2_19_2015") {
        category=false;
    }


    $scope.saveGiftIdeaForLater = function(product) {
        $scope.isSavingForLater = true;
        var saver = ProductService.saveForLater(
            "GiftIdeas",
            product.giftStartLink,
            parseInt(product.productPrice*100),
            product.productName,
            product.productDescription,
            product.productImage.indexOf('http')==0?product.productImage:('/assets/giftideas/category'+product.productImage)
        );
        if(saver) {
            saver.success(function (response) {
                $scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>."
                $scope.isSavingForLater = false;
            })
            .error(function (response) {
                $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                $scope.isSavingForLater = false;
            });
        } else {
            $scope.isSavingForLater = false;
        }
    };

    function setMeta(metatitle, metadesc) {
        metatitle = "GiftStarter: "+metatitle;
        $('html head title').text(metatitle);
        $('html head meta[property="og:title"]').attr("content", metatitle);
        $('html head meta[name=description]').attr("content", metadesc);
        $('html head meta[property="og:description"]').attr("content", metadesc);
    }

    if(category) {
        $http({method: 'GET', url: '/assets/giftideas/'+category+'.json'}).success(function (data) {
            $scope.groups = [];
            $scope.category = data;
            $scope.category.categoryAudio = ($scope.category.categorySlug=="Baby"&&!product)?"/assets/allie.mp3":"";
            $scope.categoryPath = $scope.basePath+'/'+category;
            var prior=null;
            var setmeta=false;
            angular.forEach(data.productList, function (value, key) {
                value.productNameStripped = String(value.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
                value.hasPrice = /^\d.*/.test(value.productPrice);
                value.productDescription=value.productDescription.replace(/<\/p>\s*(<br\s*\/>)*(<p>\s*&nbsp;\s*<\/p>)*(<br\s*\/>)*\s*<p>/g,'</p><p>');
                value.productDescription=value.productDescription.replace(/&quot;/g,'"');
                value.productDescription=value.productDescription.replace(/<a /g,'<a target="_new" ');
                if(prior!=null) {
                    $scope.groups.push([prior,value]);
                    prior=null;
                } else {
                    prior=value;
                }
                if(product && value.productSlug==product) {
                    $scope.product=value;
                    var metatitle=value.productName.replace(/&[a-zA-Z0-9]{1,5};/g,'');
                    var metadesc=value.productMetaDescription&&value.productMetaDescription.trim()!=""?value.productMetaDescription:value.productDescription;
                    setMeta(metatitle, metadesc);
                    setmeta=true;
                }
                $scope.lastProduct=value;
            });
            if(!setmeta) {
                var metatitle=data.categoryName;
                var metadesc=data.categoryMetaDescription&&data.categoryMetaDescription.trim()!=""?data.categoryMetaDescription:data.categoryBlurb;
                setMeta(metatitle, metadesc);
            }
            if(prior!=null) {
                $scope.groups.push([prior]);
            }
        });
    }

}
