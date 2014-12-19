/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.directive('gsImageUpload', gsImageUpload);

function gsImageUpload($timeout, $window) {

    function link(scope, element, attrs) {

        var inputEle = element.children()[0].children[1].children[0];
        var canvasEle = element.children()[0].children[0];
        var ctx = canvasEle.getContext('2d');
        var aspect = attrs.aspect;

        scope.openImageDialog = function () {
            inputEle.click()
        };

        // Size canvas to container
        canvasEle.width = element[0].parentElement.offsetWidth * 2;
        if (aspect) {
            canvasEle.height = element[0].offsetWidth * 2 / aspect;
        } else {
            canvasEle.height = element[0].offsetHeight * 2;
        }

        // Initialize image from localStorage
        if ($window.localStorage.getItem('thank-you-image')) {
            reader = {result: $window.localStorage.getItem('thank-you-image')};
            $window.localStorage.removeItem('thank-you-image');
            makeImage(reader.result);
        }

        // Callback for uploading file
        var reader;
        var binaryReader;
        scope.putImage = function putImage(file) {
            reader = new FileReader();
            reader.onloadend = fileLoaded;
            reader.readAsDataURL(file);
        };

        function setImageRot(orientation) {
            switch (orientation) {
                case 8:
                    ctx.rotate(90 * Math.PI / 180);
                    break;
                case 3:
                    ctx.rotate(180 * Math.PI / 180);
                    break;
                case 6:
                    ctx.rotate(-90 * Math.PI / 180);
                    break;
            }
        }

        function makeImage(imageData) {
            var tempImg = new Image();
            tempImg.src = imageData;

            tempImg.onload = function imageLoaded() {
                var imageW = tempImg.width;
                var imageH = tempImg.height;
                var rotation = 0;

                if (imageW > imageH) {
                    imageW *= canvasEle.width / imageH;
                    imageH = canvasEle.height;
                } else {
                    imageH *= canvasEle.height / imageW;
                    imageW = canvasEle.width;
                }

                var imageContext = this;
                ctx.drawImage(this, 0, 0, imageW, imageH);
                scope.imageUpdated(canvasEle.toDataURL());

                scope.rotateImage = function rotateImage() {
                    ctx.translate(canvasEle.width / 2, canvasEle.height / 2);
                    rotation = (rotation + 1) % 4;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(-canvasEle.width / 2, -canvasEle.height / 2);
                    ctx.drawImage(imageContext, imgX, imgY,
                        imageW, imageH);
                    scope.imageUpdated(canvasEle.toDataURL());
                };

                var dragReady = true;
                var dragPrevX = 0;
                var dragPrevY = 0;
                var imgX = 0;
                var imgY = 0;
                var dragNextX = 0;
                var dragNextY = 0;
                var dragging = false;
                angular.element(canvasEle)
                    .bind('mousedown touchstart', function (event) {
                        if (dragReady) {
                            dragReady = false;
                            $timeout(function () {
                                dragReady = true;
                            }, 100);

                            dragging = true;
                            dragPrevX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragNextX = dragPrevX;
                            dragPrevY = event.screenY ||
                                event.touches.item(0).screenY;
                            dragNextY = dragPrevY;
                        }
                    });
                angular.element(canvasEle)
                    .bind('mouseup touchend mouseleave touchleave',
                    function (event) {
                        dragging = false;
                        scope.imageUpdated(canvasEle.toDataURL());
                    });
                angular.element(canvasEle)
                    .bind('mousemove touchmove', function (event) {
                        if (dragging) {
                            event.preventDefault();
                            // Transform drag based on rotation
                            switch (rotation) {
                                case 0:
                                    imgX += dragNextX - dragPrevX;
                                    imgY += dragNextY - dragPrevY;
                                    break;
                                case 1:
                                    if (imageW > imageH) {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    } else {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    }
                                    break;
                                case 2:
                                    imgX -= dragNextX - dragPrevX;
                                    imgY -= dragNextY - dragPrevY;
                                    break;
                                case 3:
                                    if (imageW > imageH) {
                                        imgX -= dragNextY - dragPrevY;
                                        imgY -= dragNextX - dragPrevX;
                                    } else {
                                        imgX += dragNextY - dragPrevY;
                                        imgY += dragNextX - dragPrevX;
                                    }
                                    break;
                            }

                            dragPrevX = dragNextX;
                            dragNextX = event.screenX ||
                                event.touches.item(0).screenX;
                            dragPrevY = dragNextY;
                            dragNextY = event.screenY ||
                                event.touches.item(0).screenY;
                            if (imgX > 0) {
                                imgX = 0
                            }
                            if (imgY > 0) {
                                imgY = 0
                            }
                            if (imageH + imgY < canvasEle.height) {
                                imgY = canvasEle.height - imageH;
                                dragPrevY = dragNextY;
                            }
                            if (imageW + imgX < canvasEle.width) {
                                imgX = canvasEle.width - imageW;
                                dragPrevX = dragNextX;
                            }

                            ctx.drawImage(imageContext, imgX, imgY,
                                imageW, imageH);
                        }
                    });

            };
        }


        function fileLoaded() {
            // Cache thank-you image
            try {
                $window.localStorage.setItem('thank-you-image', reader.result);
            } catch (exception) {
                console && console.log && console.log("Unable to store image in localStorage",
                    exception);
            }
            makeImage(reader.result);
        }

        function fileChanged() {scope.putImage(inputEle.files[0])}
        angular.element(inputEle).bind('change', fileChanged);
    }

    return {
        restrict: 'E',
        scope: {imageUpdated: '=onImageUpdated', imageData: '=newImageData'},
        link: link,
        templateUrl: '/scripts/utilities/image-upload/image-upload.html'
    };
}
