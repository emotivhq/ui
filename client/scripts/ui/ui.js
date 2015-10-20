/**
 * Created with GiftStarter Platform-Upgrade.
 * User: thinq4yourself
 * Date: 2015-09-29
 * Time: 11:22 PM
 * To change this template use Tools | Templates.
 */
$(document).ready(function () {
    // overlay
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
    $('.ui.sidebar').sidebar('attach events', '.toc.item', 'overlay');
    $('.ui.sidebar a.item').on('click', function () {
        $('.ui.sidebar').sidebar('hide');
    });
    // close message container
    $('.message .close').on('click', function () {
        $(this).closest('.message').transition('fade');
    });
    // TODO: replace 'content' with real search results
    //     $('.ui.search').search({
    //         source: content
    //     });
    Pace.once('done', function () {
        $('.icon.notification').transition({
            animation: 'tada',
            duration: '2s'
        });
    })
    /* Semantic mdal initial globals
		Even though these get fired off from the controller or directive, 
		we're setting some globals after since bugginess was found in testing semantic ui's modal.
	    Frankly it sucks, and will be replaced with something more native and less websity. Meantime, 
		let's hack some style into it.
    */
    /*$('.modal').modal({
        inverted: true,
        blurring: true
    });*/
});