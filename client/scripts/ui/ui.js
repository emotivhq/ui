/**
 * Created with GiftStarter Platform-Upgrade.
 * User: thinq4yourself
 * Date: 2015-09-29
 * Time: 11:22 PM
 * To change this template use Tools | Templates.
 */
$(document).ready(function () {
    // fix main menu to page on passing
    $('.main.menu').visibility({
        type: 'fixed'
    });
    $('.overlay').visibility({
        type: 'fixed',
        offset: 80
    });
    // lazy load images
    $('.load').visibility({
        type: 'image',
        transition: 'vertical flip in',
        duration: 500
    });
    // show dropdown on hover
    $('.main.menu  .ui.dropdown').dropdown({
        on: 'click'
    });
    // create mobile menu sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
    $('.ui.sidebar a.item').on('click', function() {
        $('.ui.sidebar').sidebar('hide');
    });
    // close message container
    $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade');
    });
    // search results logged in user menu
    var content = [
        {
            title: 'Apple'
        },
        {
            title: 'Bose'
        },
        {
            title: 'butter LONDON'
        },
        {
            title: 'Cuisinart'
        },
        {
            title: 'Dyson'
        },
        {
            title: 'Fat Cork'
        },
        {
            title: 'Frends'
        },
        {
            title: 'iCPooch'
        },
        {
            title: 'Samsung'
        },
        {
            title: 'Sturtevant\'s Sports'
        },
        {
            title: 'Baby Crib'
        },
        {
            title: 'Bassinet'
        },
        {
            title: 'Cradle'
        },
        {
            title: 'Crib Bedding'
        },
        {
            title: 'Diaper Bag'
        },
        {
            title: 'High Chair'
        },
        {
            title: 'Playard'
        },
        {
            title: 'Rocking Chair'
        },
        {
            title: 'Stroller'
        }
    ];
    $('.ui.search').search({
        source: content
    });
    Pace.once('done', function () {
        $('.icon.notification').transition({
            animation: 'tada',
            duration: '2s'
        });
    })
});