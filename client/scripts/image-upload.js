/**
 * Created by Stuart on 10/13/14.
 */

GiftStarterApp.directive('gsImageUpload', function($timeout,
                                                   GiftStartService) {

    function link(scope, element, attrs) {

        window.me = element;

        var inputEle = element.children()[0].children[1].children[0];
        window.ie = inputEle;
        var canvasEle = element.children()[0].children[0];
        window.ce = canvasEle;

        var aspect = attrs.aspect;

        // Size canvas to container
        canvasEle.width = element[0].parentElement.offsetWidth;
        if (aspect) {
            canvasEle.height = element[0].parentElement.offsetWidth / aspect;
        } else {
            canvasEle.height = element[0].parentElement.offsetHeight;
        }

        // Callback for uploading file
        var reader;
        scope.putImage = function putImage(file) {
            reader = new FileReader();
            reader.onloadend = fileLoaded;
            reader.readAsDataURL(file);
        };

        function fileLoaded() {
            var tempImg = new Image();
            tempImg.src = reader.result;
            tempImg.onload = function imageLoaded() {
            var imageW = tempImg.width;
            var imageH = tempImg.height;

            if (imageW > imageH) {
                if (imageW > canvasEle.width) {
                    imageW *= canvasEle.width / imageH;
                    imageH = canvasEle.height;
                }
            } else {
                if (imageH > canvasEle.height) {
                    imageH *= canvasEle.height / imageW;
                    imageW = canvasEle.width;
                }
            }

            var imageContext = this;
            var ctx = canvasEle.getContext('2d');
            ctx.drawImage(this, 0, 0, imageW, imageH);
            GiftStartService.setThanksImage(canvasEle.toDataURL());
            console.log(canvasEle.toDataURL());

            var dragReady = true;
            var dragPrevX = 0;
            var dragPrevY = 0;
            var imgX = 0;
            var imgY = 0;
            var dragNextX = 0;
            var dragNextY = 0;
            var dragging = false;
            angular.element(canvasEle)
                .bind('mousedown touchstart', function(event) {
                    if (dragReady) {
                        dragReady = false;
                        $timeout(function() {dragReady = true;}, 100);

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
                .bind('mouseup touchend mouseleave touchleave', function(event) {
                    dragging = false;
                    GiftStartService.setThanksImage(canvasEle.toDataURL());
                });
            angular.element(canvasEle)
                .bind('mousemove touchmove', function(event) {
                    if (dragging) {
                        imgX += dragNextX - dragPrevX;
                        imgY += dragNextY - dragPrevY;
                        dragPrevX = dragNextX;
                        dragNextX = event.screenX ||
                            event.touches.item(0).screenX;
                        dragPrevY = dragNextY;
                        dragNextY = event.screenY ||
                            event.touches.item(0).screenY;
                        if (imgX > 0) {imgX = 0}
                        if (imgY > 0) {imgY = 0}
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

        function fileChanged() {scope.putImage(inputEle.files[0])}
        angular.element(inputEle).bind('change', fileChanged);
    }

    return {
        restrict: 'E',
        scope: {giftstart: '='},
        link: link,
        templateUrl: '/templates/angular/image-upload.html'
    };
});
