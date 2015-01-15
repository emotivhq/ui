module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    remove: {
      fileList: ['../client/scripts/out/*.js']
    },
    ngtemplates:  {
      GiftStarterApp:        {
        options: {
          prefix: '/'
        },
        cwd:      '../client',
        src:      'scripts/**/*.html',
        dest:     '../client/scripts/out/angular-template.js'
      }
    },
    concat: {
      build: {
        src: [
          '../client//bower_components/jquery/dist/jquery.min.js',
          '../client//bower_components/jquery-ui/jquery-ui.min.js',
          '../client//bower_components/angular/angular.min.js',
          '../client//bower_components/angucomplete/angucomplete.js',
          '../client//bower_components/angular-route/angular-route.min.js',
          '../client//bower_components/angular-touch/angular-touch.min.js',
          '../client//bower_components/angular-easyfb/angular-easyfb.min.js',
          '../client//bower_components/angular-payments/lib/angular-payments.min.js',
          '../client//bower_components/angular-cookies/angular-cookies.min.js',
          '../client//bower_components/angular-sanitize/angular-sanitize.min.js',
          '../client//bower_components/angular-resource/angular-resource.min.js',
          '../client//bower_components/devicejs/lib/device.min.js',
          '../client//bower_components/angular-ui-date/src/date.js',
          '../client//bower_components/bootstrap/dist/bootstrap.min..js',
          '../client//scripts/utilities/ng-ab/ng-ab.module.js',
          '../client//scripts/utilities/ng-ab/ng-ab.service.js',
          '../client//scripts/utilities/ng-ab/ng-ab.factory.js',
          '../client//scripts/utilities/ng-ab/ng-ab.config.js',
          '../client//scripts/app.module.js',
          '../client//scripts/app.config.js',
          '../client//scripts/app.run.js',
          '../client/scripts/out/angular-template.js',
          '../client//scripts/frame/gs-view.directive.js',
          '../client//scripts/frame/gs-focus.directive.js',
          '../client//scripts/menu/menu.directive.js',
          '../client//scripts/home/scroll-play.directive.js',
          '../client//scripts/static-pages/about/about.controller.js',
          '../client//scripts/static-pages/faq/faq.controller.js',
          '../client//scripts/static-pages/partners/partners.controller.js',
          '../client//scripts/static-pages/what-is-it/what-is-it.controller.js',
          '../client//scripts/home/home.js',
          '../client//scripts/giftstart/thanks/thanked-campaigns.directive.js',
          '../client//scripts/header/header.controller.js',
          '../client//scripts/utilities/toast.service.js',
          '../client//scripts/utilities/toast.directive.js',
          '../client//scripts/utilities/analytics.service.js',
          '../client//scripts/utilities/head.controller.js',
          '../client//scripts/user/user.service.js',
          '../client//scripts/user/profile.controller.js',
          '../client//scripts/login/facebook.service.js',
          '../client//scripts/login/twitter.service.js',
          '../client//scripts/login/googleplus.service.js',
          '../client//scripts/login/email.service.js',
          '../client//scripts/giftstart/giftstart.service.js',
          '../client//scripts/giftstart/giftstart.controller.js',
          '../client//scripts/giftstart/thanks/thanks.directive.js',
          '../client//scripts/giftstart/create/giftstart-create.controller.js',
          '../client//scripts/product/product.service.js',
          '../client//scripts/product/product.directive.js',
          '../client//scripts/giftstart/overlay/overlay.directive.js',
          '../client//scripts/popover/popover.service.js',
          '../client//scripts/popover/popover.directive.js',
          '../client//scripts/giftstart/funding-bar/funding-bar.directive.js',
          '../client//scripts/popover/login/login-popover.controller.js',
          '../client//scripts/popover/login/login-popover.directive.js',
          '../client//scripts/popover/note/note-popover.controller.js',
          '../client//scripts/popover/note/note-popover.directive.js',
          '../client//scripts/popover/pay/pay-popover.controller.js',
          '../client//scripts/popover/pay/pay-popover.directive.js',
          '../client//scripts/popover/pay/card.service.js',
          '../client//scripts/popover/thanks/thanks-popover.controller.js',
          '../client//scripts/popover/thanks/thanks-popover.directive.js',
          '../client//scripts/popover/email-share/email-share-popover.controller.js',
          '../client//scripts/popover/email-share/email-share-popover.directive.js',
          '../client//scripts/utilities/image-upload/image-upload.directive.js',
          '../client//scripts/utilities/local-storage.service.js',
          '../client//scripts/utilities/uservoice.js',
          '../client//scripts/button/campaign-giftstart-it.directive.js',
          '../client//scripts/header/giftstart-it-header.directive.js',
          '../client//scripts/header/subscribe-header.directive.js'
        ],
        dest: '../client/scripts/out/app.js'
      },
      build2: {
        src: '../client//bower_components/jquery/dist/jquery.min.map',
        dest: '../client/scripts/out/jquery.min.map'
      }
    },
    uglify: {
      build: {
        src: '../client/scripts/out/app.js',
        dest: '../client/scripts/out/app.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-remove');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');

  // Default task(s).
  grunt.registerTask('default', ['remove', 'ngtemplates', 'concat']);

};
