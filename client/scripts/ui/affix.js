(function ($) {
    var $affixSearch = $('#header'),
        $topBreakElement = $affixSearch.next(),
        $bottomBreakElement = $affixSearch,
        $affixPlaceholder = $('#affix-placeholder'),
        topBreakPoint = ($topBreakElement.position().top + $affixSearch.outerHeight(true)),
        bottomBreakPoint = $bottomBreakElement.position().top;
    $affixSearch.affix({
        offset: {
            top: topBreakPoint,
            bottom: function () {
                return(this.top = bottomBreakPoint);
            }
        }
    }).on('affix.bs.affix', function (e) { // in the process of affixing
        $affixPlaceholder.css({
            height: $affixSearch.outerHeight(true)
        });
    }).on('affixed.bs.affix', function (e) { // affixed
        $(this).css({
            top: -$affixSearch.height()
        }).animate({
            top: '0'
        }, 500);;
    }).on('affix-top.bs.affix', function (e) { // no longer affixed
        $affixPlaceholder.css({
            height: 0
        });
    });
})(jQuery);