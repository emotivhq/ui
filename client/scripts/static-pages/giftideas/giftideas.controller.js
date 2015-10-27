'use strict';

/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('GiftideasController', ['$scope', '$http', '$location', 'ProductService', 'UserService', GiftideasController]);

function GiftideasController($scope, $http, $location, ProductService, UserService) {
    $scope.productMessage = '';
    $scope.location = $location;
    $scope.path = $location.path();
    $scope.isSavingForLater = false;
    var pathParts = $scope.path.replace('//', '/').split('/');
    $scope.basePath = pathParts[1];
    var category = pathParts.length > 2 ? pathParts[2] : false;
    var product = pathParts.length > 3 ? pathParts[3] : false;
	// lazy load images
     jQuery('.load').visibility({
        type: 'image',
        transition: 'vertical flip in',
        duration: 500
      });

    // hack for mailing list error where we linked to the wrong category
    if(category && !product && (category === 'lunarnewyear' || category === 'farewell' || category === 'pisces') && $location.search()['utm_campaign'] === '18f05bc479-Weekly_Email_Lunar_New_Year_Pisces_2_19_2015') {
        category = false;
    }

    $scope.saveGiftIdeaForLater = function(product) {
        $scope.isSavingForLater = true;
        if(UserService.loggedIn) {
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
                    $scope.productMessage = "The gift has been saved to your <a href='/users/"+UserService.uid+"'>profile</a>.";
                    $scope.isSavingForLater = false;
                })
                .error(function (response) {
                    $scope.productMessage = "An error occurred while saving the product: " + response['error'];
                    $scope.isSavingForLater = false;
                });
            } else {
                $scope.isSavingForLater = false;
            }
        } else {
            $location.path('/login');
        }
    };

    function setMeta(metatitle, metadesc) {
        metatitle = 'GiftStarter: ' + metatitle;
        $('html head title').text(metatitle);
        $('html head meta[property=\'og:title\']').attr('content', metatitle);
        $('html head meta[name=description]').attr('content', metadesc);
        $('html head meta[property="og:description"]').attr('content', metadesc);
    }

    var prior,
        setMetaFlag;

    function productInit (productValue) {
        productValue.productNameStripped = String(productValue.productName).replace(/<[^>]+>/g, '').replace(/&([a-zA-Z0-9#]{2,7});/g, '');
        productValue.hasPrice = /^\d.*/.test(productValue.productPrice);
        productValue.productDescription = productValue.productDescription.replace(/<\/p>\s*(<br\s*\/>)*(<p>\s*&nbsp;\s*<\/p>)*(<br\s*\/>)*\s*<p>/g, '</p><p>');
        productValue.productDescription = productValue.productDescription.replace(/&quot;/g, '"');
        productValue.productDescription = productValue.productDescription.replace(/<a /g, '<a target="_new" ');
    }

    function fillProductData (productValue, productKey) {

        productInit(productValue);

        if(prior != null) {
            $scope.groups.push([prior, productValue]);
            prior = null;
        } else {
            prior = productValue;
        }

        if(product && productValue.productSlug === product) {
            $scope.product = productValue;
            var metatitle = productValue.productName.replace(/&[a-zA-Z0-9]{1,5};/g, '');
            var metadesc = productValue.productMetaDescription && productValue.productMetaDescription.trim() !== '' ? productValue.productMetaDescription : productValue.productDescription;
            setMeta(metatitle, metadesc);
            setMetaFlag = true;
        }
        $scope.lastProduct = productValue;
    }

    function shuffle(groupsArr) {
        var currentIndex = groupsArr.length, temporaryValue, randomIndex ;

        while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = groupsArr[currentIndex];
        groupsArr[currentIndex] = groupsArr[randomIndex];
        groupsArr[randomIndex] = temporaryValue;
      }

      return groupsArr;
    }

    if(category) {
        $http.get('/assets/giftideas/' + category + '.json').then( function (response) {
            $scope.groups = [];
            $scope.category = response.data;
            $scope.categoryPath = $scope.basePath + '/' + category;
            prior = null;
            setMetaFlag = false;
            angular.forEach(response.data.productList, fillProductData);
            shuffle($scope.groups)
            if(!setMetaFlag) {
                var metatitle = response.data.categoryName;
                var metadesc = response.data.categoryMetaDescription && response.data.categoryMetaDescription.trim() !== '' ? response.data.categoryMetaDescription : response.data.categoryBlurb;
                setMeta(metatitle, metadesc);
            }
            if(prior != null) {
                $scope.groups.push([prior]);
            }
        });
    }
    
    $http.get('/assets/giftideas/giftideas.json').then( function (response) {
        $scope.giftideas = [];
        angular.forEach(response.data, function(value, key) {
            if (value.enabled) $scope.giftideas.push(value);
        });
    });

    $scope.goToLink = function(destination) {
        window.location.href = destination;
    };
}