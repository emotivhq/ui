/**
* Created with GiftStarter Platform-Upgrade.
* User: thinq4yourself
* Date: 2015-09-29
* Time: 11:22 PM
* To change this template use Tools | Templates.
*/
$(document)
    .ready(function() {

      // fix main menu to page on passing
      $('.main.menu').visibility({
        type: 'fixed'
      });
      $('.overlay').visibility({
        type: 'fixed',
        offset: 80
      });

      // lazy load images
      $('.image').visibility({
        type: 'image',
        transition: 'vertical flip in',
        duration: 500
      });

      // show dropdown on hover
      $('.main.menu  .ui.dropdown').dropdown({
        on: 'click'
      });
	  
	  // create mobile menu sidebar and attach to menu open
      $('.ui.sidebar')
        .sidebar('attach events', '.toc.item')
      ;
	  $('.button.social').click(function(){
  		$('.ui.social.modal').modal('show');
	  });

$('.create_action.ui.form')
  .form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid e-mail'
          }
        ]
      },
      name     : 'empty',
      surname   : 'empty',
      password : ['minLength[6]', 'empty']
    }
  })
;	
    })
  ;